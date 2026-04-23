"use client";

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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Field, FieldContent, FieldLabel } from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@repo/ui/components/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/page-header";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage, unwrapResult } from "@/lib/errors";

type AdminUser = {
	id: string;
	name: string;
	email: string;
	username?: string | null;
	role?: string | null;
	banned?: boolean | null;
	createdAt: string | Date;
};

export default function AdminUsersPage() {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");
	const [offset, setOffset] = useState(0);
	const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
	const [banReason, setBanReason] = useState("");
	const limit = 10;

	const usersQuery = useQuery({
		queryKey: ["admin", "users", search, offset],
		queryFn: async () =>
			unwrapResult(
				await authClient.admin.listUsers({
					query: {
						limit,
						offset,
						searchField: "email",
						searchValue: search || undefined,
						sortBy: "createdAt",
						sortDirection: "desc",
					},
				}),
			),
	});

	const runAction = useMutation({
		mutationFn: async ({
			action,
			user,
		}: {
			action:
				| "make-admin"
				| "make-user"
				| "ban"
				| "unban"
				| "impersonate"
				| "delete";
			user: AdminUser;
		}) => {
			switch (action) {
				case "make-admin":
					return authClient.admin.setRole({ userId: user.id, role: "admin" });
				case "make-user":
					return authClient.admin.setRole({ userId: user.id, role: "user" });
				case "ban":
					return authClient.admin.banUser({
						userId: user.id,
						banReason: banReason || undefined,
					});
				case "unban":
					return authClient.admin.unbanUser({ userId: user.id });
				case "impersonate":
					return authClient.admin.impersonateUser({ userId: user.id });
				case "delete":
					return authClient.admin.removeUser({ userId: user.id });
			}
		},
		onSuccess: async (_, variables) => {
			setSelectedUser(null);
			setBanReason("");
			await queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
			toast.success(`已完成${variables.user.name}的操作`);
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});

	const total = usersQuery.data?.total ?? 0;
	const canPrev = offset > 0;
	const canNext = offset + limit < total;

	return (
		<div className="flex flex-1 flex-col">
			<PageHeader
				title="用户管理"
				actions={
					<Input
						className="w-64"
						placeholder="按邮箱搜索"
						value={search}
						onChange={(event) => {
							setOffset(0);
							setSearch(event.target.value);
						}}
					/>
				}
			/>
			<div className="p-4 sm:p-6">
				<Card>
					<CardHeader>
						<CardTitle>全部用户</CardTitle>
						<CardDescription>
							共 {total} 位用户，支持基础角色与封禁管理。
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>姓名</TableHead>
									<TableHead>邮箱</TableHead>
									<TableHead>用户名</TableHead>
									<TableHead>角色</TableHead>
									<TableHead>状态</TableHead>
									<TableHead>创建时间</TableHead>
									<TableHead className="text-right">操作</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{usersQuery.data?.users.map((user: AdminUser) => (
									<TableRow key={user.id}>
										<TableCell>{user.name}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.username ?? "—"}</TableCell>
										<TableCell>{user.role ?? "user"}</TableCell>
										<TableCell>{user.banned ? "已封禁" : "正常"}</TableCell>
										<TableCell>
											{new Intl.DateTimeFormat("zh-CN", {
												dateStyle: "medium",
											}).format(new Date(user.createdAt))}
										</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger
													render={<Button variant="outline" size="icon-sm" />}
												>
													<MoreHorizontalIcon />
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() =>
															runAction.mutate({ action: "make-admin", user })
														}
													>
														设为管理员
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															runAction.mutate({ action: "make-user", user })
														}
													>
														设为普通用户
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => setSelectedUser(user)}
													>
														封禁用户
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															runAction.mutate({ action: "unban", user })
														}
													>
														解除封禁
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															runAction.mutate({ action: "impersonate", user })
														}
													>
														模拟登录
													</DropdownMenuItem>
													<DropdownMenuItem
														variant="destructive"
														onClick={() =>
															runAction.mutate({ action: "delete", user })
														}
													>
														删除用户
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										text="上一页"
										href="#"
										onClick={(event) => {
											event.preventDefault();
											if (canPrev) {
												setOffset((value) => Math.max(0, value - limit));
											}
										}}
									/>
								</PaginationItem>
								<PaginationItem>
									<PaginationNext
										text="下一页"
										href="#"
										onClick={(event) => {
											event.preventDefault();
											if (canNext) {
												setOffset((value) => value + limit);
											}
										}}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</CardContent>
				</Card>
			</div>

			<Dialog
				open={Boolean(selectedUser)}
				onOpenChange={(open) => !open && setSelectedUser(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>封禁用户</DialogTitle>
					</DialogHeader>
					<Field>
						<FieldLabel htmlFor="ban-reason">原因</FieldLabel>
						<FieldContent>
							<Input
								id="ban-reason"
								value={banReason}
								onChange={(event) => setBanReason(event.target.value)}
								placeholder="例如：异常登录行为"
							/>
						</FieldContent>
					</Field>
					<DialogFooter>
						<Button variant="outline" onClick={() => setSelectedUser(null)}>
							取消
						</Button>
						<Button
							onClick={() => {
								if (selectedUser) {
									runAction.mutate({ action: "ban", user: selectedUser });
								}
							}}
						>
							确认封禁
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
