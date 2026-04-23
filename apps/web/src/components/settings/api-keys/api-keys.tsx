"use client";

import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@repo/ui/components/dialog";
import { Field, FieldContent, FieldLabel } from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CopyIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { getErrorMessage, unwrapResult } from "@/lib/errors";

export default function ApiKeysPage() {
	const [name, setName] = useState("");
	const [newKey, setNewKey] = useState<string | null>(null);

	const keysQuery = useQuery({
		queryKey: ["api-keys"],
		queryFn: async () => {
			const result = unwrapResult(await authClient.apiKey.list());
			return result?.apiKeys ?? [];
		},
	});

	const createKey = useMutation({
		mutationFn: () =>
			authClient.apiKey.create({
				name,
			}),
		onSuccess: async (data) => {
			setName("");
			setNewKey(unwrapResult(data)?.key ?? null);
			await keysQuery.refetch();
			toast.success("API 密钥已创建");
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});

	const deleteKey = useMutation({
		mutationFn: (id: string) =>
			authClient.apiKey.delete({
				keyId: id,
			}),
		onSuccess: async () => {
			await keysQuery.refetch();
			toast.success("API 密钥已删除");
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});

	return (
		<div className="grid gap-6">
			<Card>
				<CardHeader>
					<CardTitle>创建 API 密钥</CardTitle>
					<CardDescription>
						为自动化脚本或服务调用创建独立凭证，避免共享主账号密码。
					</CardDescription>
				</CardHeader>
				<CardContent className="flex max-w-2xl flex-col gap-4">
					<Field>
						<FieldLabel htmlFor="api-key-name">名称</FieldLabel>
						<FieldContent>
							<Input
								id="api-key-name"
								placeholder="例如：部署脚本"
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
						</FieldContent>
					</Field>
					<Button className="w-fit" onClick={() => createKey.mutate()}>
						<PlusIcon />
						创建密钥
					</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>已有密钥</CardTitle>
					<CardDescription>
						只展示前缀与元信息，请在创建时及时安全保存完整密钥。
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert>
						<AlertTitle>重要提示</AlertTitle>
						<AlertDescription>
							完整密钥只会在创建成功时显示一次，请立即复制并妥善保管。
						</AlertDescription>
					</Alert>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>名称</TableHead>
								<TableHead>前缀</TableHead>
								<TableHead>创建时间</TableHead>
								<TableHead className="text-right">操作</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{keysQuery.data?.map(
								(key: {
									id: string;
									name?: string | null;
									prefix?: string | null;
									createdAt: string | Date;
								}) => (
									<TableRow key={key.id}>
										<TableCell>{key.name ?? "未命名"}</TableCell>
										<TableCell>{key.prefix ?? "—"}</TableCell>
										<TableCell>
											{new Intl.DateTimeFormat("zh-CN", {
												dateStyle: "medium",
											}).format(new Date(key.createdAt))}
										</TableCell>
										<TableCell className="text-right">
											<Button
												variant="outline"
												size="sm"
												onClick={() => deleteKey.mutate(key.id)}
											>
												<Trash2Icon />
												删除
											</Button>
										</TableCell>
									</TableRow>
								),
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Dialog
				open={Boolean(newKey)}
				onOpenChange={(open) => !open && setNewKey(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>请立即复制新密钥</DialogTitle>
					</DialogHeader>
					<div className="break-all rounded-none border border-border bg-muted/30 p-3 font-mono text-xs">
						{newKey}
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={async () => {
								if (!newKey) {
									return;
								}
								await navigator.clipboard.writeText(newKey);
								toast.success("已复制到剪贴板");
							}}
						>
							<CopyIcon />
							复制
						</Button>
						<Button onClick={() => setNewKey(null)}>关闭</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
