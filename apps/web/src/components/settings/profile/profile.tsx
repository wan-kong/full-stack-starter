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
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@auth-provider/ui/components/field";
import { Input } from "@auth-provider/ui/components/input";
import { Spinner } from "@auth-provider/ui/components/spinner";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { useSession } from "@/components/auth-guard";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/errors";

const profileSchema = z.object({
	name: z.string().min(2, "请输入姓名"),
	username: z.string().min(3, "用户名至少需要 3 位"),
	image: z.union([z.url("请输入有效链接"), z.literal("")]),
});

export default function SettingsProfilePage() {
	const { user } = useSession();

	const form = useForm({
		defaultValues: {
			name: user.name ?? "",
			username: user.username ?? "",
			image: user.image ?? "",
		},
		onSubmit: async ({ value }) => {
			const parsed = profileSchema.safeParse(value);
			if (!parsed.success) {
				throw parsed.error;
			}

			await authClient.updateUser({
				name: parsed.data.name,
				username: parsed.data.username,
				image: parsed.data.image || null,
			});

			toast.success("保存成功");
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>个人资料</CardTitle>
				<CardDescription>
					更新昵称、头像链接和用户名，这些信息会显示在侧边栏与管理界面。
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					className="flex max-w-2xl flex-col gap-5"
					onSubmit={(event) => {
						event.preventDefault();
						event.stopPropagation();
						void form.handleSubmit().catch((error) => {
							const message =
								error instanceof z.ZodError
									? error.issues[0]?.message
									: getErrorMessage(error);
							toast.error(message ?? "保存失败");
						});
					}}
				>
					<FieldGroup>
						{(["name", "username", "image"] as const).map((name) => (
							<form.Field key={name} name={name}>
								{(field) => (
									<Field data-invalid={field.state.meta.errors.length > 0}>
										<FieldLabel htmlFor={field.name}>
											{
												{ name: "姓名", username: "用户名", image: "头像链接" }[
													name
												]
											}
										</FieldLabel>
										<FieldContent>
											<Input
												id={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(event) =>
													field.handleChange(event.target.value)
												}
												aria-invalid={field.state.meta.errors.length > 0}
											/>
											<FieldError errors={field.state.meta.errors} />
										</FieldContent>
									</Field>
								)}
							</form.Field>
						))}
					</FieldGroup>

					<Button
						type="submit"
						className="w-fit"
						disabled={form.state.isSubmitting}
					>
						{form.state.isSubmitting ? <Spinner className="size-4" /> : null}
						保存
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
