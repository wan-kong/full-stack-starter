"use client";

import { Button } from "@auth-provider/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@auth-provider/ui/components/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@auth-provider/ui/components/dialog";
import {
	Field,
	FieldContent,
	FieldGroup,
	FieldLabel,
} from "@auth-provider/ui/components/field";
import { Input } from "@auth-provider/ui/components/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@auth-provider/ui/components/input-otp";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@auth-provider/ui/components/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CopyIcon, ShieldCheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useSession } from "@/components/auth-guard";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage, unwrapResult } from "@/lib/errors";

export default function SettingsSecurityPage() {
	const { user } = useSession();
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [twoFactorPassword, setTwoFactorPassword] = useState("");
	const [totpCode, setTotpCode] = useState("");
	const [setupData, setSetupData] = useState<{
		backupCodes: string[];
		totpURI: string;
	} | null>(null);

	const sessionsQuery = useQuery({
		queryKey: ["sessions"],
		queryFn: async () => unwrapResult(await authClient.listSessions()),
	});

	const changePassword = useMutation({
		mutationFn: () =>
			authClient.changePassword({
				currentPassword,
				newPassword,
				revokeOtherSessions: true,
			}),
		onSuccess: () => {
			setCurrentPassword("");
			setNewPassword("");
			toast.success("密码已更新");
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});

	const startSetup = useMutation({
		mutationFn: () =>
			authClient.twoFactor.enable({
				password: twoFactorPassword || undefined,
				issuer: "Auth Provider",
			}),
		onSuccess: (data) => {
			setSetupData(unwrapResult(data));
			toast.success("请使用验证器录入密钥并完成校验");
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});

	const verifySetup = useMutation({
		mutationFn: () =>
			authClient.twoFactor.verifyTotp({
				code: totpCode,
			}),
		onSuccess: () => {
			setSetupData(null);
			setTotpCode("");
			toast.success("双因素认证已启用");
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});

	const disableTwoFactor = useMutation({
		mutationFn: () =>
			authClient.twoFactor.disable({
				password: twoFactorPassword || undefined,
			}),
		onSuccess: () => {
			toast.success("双因素认证已关闭");
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});

	const revokeSession = useMutation({
		mutationFn: (token: string) => authClient.revokeSession({ token }),
		onSuccess: async () => {
			await sessionsQuery.refetch();
			toast.success("会话已撤销");
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});

	return (
		<div className="grid gap-6">
			<Card>
				<CardHeader>
					<CardTitle>修改密码</CardTitle>
					<CardDescription>
						更新当前账号密码，并自动撤销其他设备上的会话。
					</CardDescription>
				</CardHeader>
				<CardContent className="flex max-w-2xl flex-col gap-5">
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="current-password">当前密码</FieldLabel>
							<FieldContent>
								<Input
									id="current-password"
									type="password"
									value={currentPassword}
									onChange={(event) => setCurrentPassword(event.target.value)}
								/>
							</FieldContent>
						</Field>
						<Field>
							<FieldLabel htmlFor="new-password">新密码</FieldLabel>
							<FieldContent>
								<Input
									id="new-password"
									type="password"
									value={newPassword}
									onChange={(event) => setNewPassword(event.target.value)}
								/>
							</FieldContent>
						</Field>
					</FieldGroup>
					<Button
						className="w-fit"
						disabled={
							!currentPassword || !newPassword || changePassword.isPending
						}
						onClick={() => changePassword.mutate()}
					>
						保存新密码
					</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>双因素认证</CardTitle>
					<CardDescription>
						建议为重要账号启用额外验证步骤，提升安全性。
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex items-center justify-between rounded-none border border-border px-4 py-3">
						<div className="flex items-center gap-3">
							<ShieldCheckIcon className="size-5 text-muted-foreground" />
							<div>
								<p className="font-medium text-sm">
									{user.twoFactorEnabled ? "当前已启用" : "当前未启用"}
								</p>
								<p className="text-muted-foreground text-xs">
									使用验证器 App 扫描密钥后输入 6 位验证码完成绑定。
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Input
								type="password"
								className="w-44"
								placeholder="输入密码"
								value={twoFactorPassword}
								onChange={(event) => setTwoFactorPassword(event.target.value)}
							/>
							{user.twoFactorEnabled ? (
								<Button
									variant="outline"
									onClick={() => disableTwoFactor.mutate()}
								>
									关闭
								</Button>
							) : (
								<Button onClick={() => startSetup.mutate()}>开启</Button>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>活跃会话</CardTitle>
					<CardDescription>
						查看当前账号的所有登录设备，并随时撤销不需要的会话。
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>设备</TableHead>
								<TableHead>IP 地址</TableHead>
								<TableHead>过期时间</TableHead>
								<TableHead className="text-right">操作</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sessionsQuery.data?.map((session) => (
								<TableRow key={session.id}>
									<TableCell>{session.userAgent ?? "未知设备"}</TableCell>
									<TableCell>{session.ipAddress ?? "未知"}</TableCell>
									<TableCell>
										{new Intl.DateTimeFormat("zh-CN", {
											dateStyle: "medium",
											timeStyle: "short",
										}).format(new Date(session.expiresAt))}
									</TableCell>
									<TableCell className="text-right">
										<Button
											variant="outline"
											size="sm"
											onClick={() => revokeSession.mutate(session.token)}
										>
											撤销
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Dialog
				open={Boolean(setupData)}
				onOpenChange={(open) => !open && setSetupData(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>完成双因素认证设置</DialogTitle>
						<DialogDescription>
							将下方密钥录入验证器应用，然后输入一次性验证码完成绑定。
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-4">
						<div className="break-all rounded-none border border-border bg-muted/40 p-3 text-xs">
							{setupData?.totpURI}
						</div>
						<Button
							variant="outline"
							onClick={async () => {
								if (!setupData?.totpURI) {
									return;
								}
								await navigator.clipboard.writeText(setupData.totpURI);
								toast.success("密钥已复制");
							}}
						>
							<CopyIcon />
							复制密钥
						</Button>
						<div className="rounded-none border border-border bg-muted/30 p-3 text-xs">
							<p className="mb-2 font-medium text-foreground">备用恢复码</p>
							<div className="grid grid-cols-2 gap-2">
								{setupData?.backupCodes.map((code) => (
									<span key={code}>{code}</span>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<p className="text-xs">输入验证器中的 6 位验证码</p>
							<InputOTP maxLength={6} value={totpCode} onChange={setTotpCode}>
								<InputOTPGroup>
									{Array.from({ length: 6 }).map((_, index) => (
										<InputOTPSlot key={index} index={index} />
									))}
								</InputOTPGroup>
							</InputOTP>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setSetupData(null)}>
							取消
						</Button>
						<Button
							disabled={totpCode.length !== 6}
							onClick={() => verifySetup.mutate()}
						>
							确认启用
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
