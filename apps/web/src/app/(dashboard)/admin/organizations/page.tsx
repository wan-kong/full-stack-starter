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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/page-header";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage, unwrapResult } from "@/lib/errors";

type Organization = {
	id: string;
	name: string;
	slug: string;
	createdAt: string | Date;
};

const slugify = (value: string) =>
	value
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "");

export default function AdminOrganizationsPage() {
	const queryClient = useQueryClient();
	const [name, setName] = useState("");
	const [open, setOpen] = useState(false);

	const organizationsQuery = useQuery({
		queryKey: ["organizations"],
		queryFn: async () => unwrapResult(await authClient.organization.list()),
	});

	const createOrganization = useMutation({
		mutationFn: () =>
			authClient.organization.create({
				name,
				slug: slugify(name),
			}),
		onSuccess: async () => {
			setName("");
			setOpen(false);
			await queryClient.invalidateQueries({ queryKey: ["organizations"] });
			toast.success("组织已创建");
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});

	const deleteOrganization = useMutation({
		mutationFn: (organizationId: string) =>
			authClient.organization.delete({
				organizationId,
			}),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["organizations"] });
			toast.success("组织已删除");
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});

	return (
		<div className="flex flex-1 flex-col">
			<PageHeader
				title="组织管理"
				actions={
					<Button onClick={() => setOpen(true)}>
						<PlusIcon />
						新建组织
					</Button>
				}
			/>
			<div className="p-4 sm:p-6">
				<Card>
					<CardHeader>
						<CardTitle>组织列表</CardTitle>
						<CardDescription>
							已接入 Better Auth 组织能力，可用于成员和权限协作。
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>名称</TableHead>
									<TableHead>Slug</TableHead>
									<TableHead>创建时间</TableHead>
									<TableHead className="text-right">操作</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{organizationsQuery.data?.map((organization: Organization) => (
									<TableRow key={organization.id}>
										<TableCell>{organization.name}</TableCell>
										<TableCell>{organization.slug}</TableCell>
										<TableCell>
											{new Intl.DateTimeFormat("zh-CN", {
												dateStyle: "medium",
											}).format(new Date(organization.createdAt))}
										</TableCell>
										<TableCell className="text-right">
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													deleteOrganization.mutate(organization.id)
												}
											>
												<Trash2Icon />
												删除
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>创建组织</DialogTitle>
					</DialogHeader>
					<Field>
						<FieldLabel htmlFor="organization-name">组织名称</FieldLabel>
						<FieldContent>
							<Input
								id="organization-name"
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
						</FieldContent>
					</Field>
					<DialogFooter>
						<Button variant="outline" onClick={() => setOpen(false)}>
							取消
						</Button>
						<Button
							disabled={!name.trim()}
							onClick={() => createOrganization.mutate()}
						>
							创建
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
