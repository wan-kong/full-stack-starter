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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/errors";
import { routes } from "@/lib/routes";

const signUpSchema = z.object({
	name: z.string().min(2, "请输入姓名"),
	email: z.email("请输入有效的邮箱地址"),
	username: z.string().min(3, "用户名至少需要 3 位"),
	password: z.string().min(8, "密码至少需要 8 位"),
});

export const SignUpForm = () => {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			username: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			const parsed = signUpSchema.safeParse(value);
			if (!parsed.success) {
				throw parsed.error;
			}

			await authClient.signUp.email({
				...parsed.data,
				callbackURL: routes.dashboard,
			});

			toast.success("请查收验证邮件");
			router.replace(routes.signIn);
		},
	});

	return (
		<Card className="w-full max-w-lg border-border/70 bg-background/95 shadow-sm">
			<CardHeader className="gap-2">
				<CardTitle className="text-xl">创建账号</CardTitle>
				<CardDescription>
					几分钟内完成接入，统一管理登录、组织与安全策略。
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					className="flex flex-col gap-5"
					onSubmit={(event) => {
						event.preventDefault();
						event.stopPropagation();
						void form.handleSubmit().catch((error) => {
							const message =
								error instanceof z.ZodError
									? error.issues[0]?.message
									: getErrorMessage(error);
							toast.error(message ?? "注册失败");
						});
					}}
				>
					<FieldGroup>
						{(["name", "email", "username", "password"] as const).map(
							(name) => (
								<form.Field key={name} name={name}>
									{(field) => (
										<Field data-invalid={field.state.meta.errors.length > 0}>
											<FieldLabel htmlFor={field.name}>
												{
													{
														name: "姓名",
														email: "邮箱",
														username: "用户名",
														password: "密码",
													}[name]
												}
											</FieldLabel>
											<FieldContent>
												<Input
													id={field.name}
													name={field.name}
													type={
														name === "password"
															? "password"
															: name === "email"
																? "email"
																: "text"
													}
													autoComplete={
														name === "password"
															? "new-password"
															: name === "email"
																? "email"
																: "off"
													}
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
							),
						)}
					</FieldGroup>

					<Button type="submit" disabled={form.state.isSubmitting}>
						{form.state.isSubmitting ? <Spinner className="size-4" /> : null}
						注册
					</Button>

					<p className="text-center text-muted-foreground text-xs">
						已经有账号？{" "}
						<Link
							className="text-foreground underline underline-offset-4"
							href={routes.signIn}
						>
							去登录
						</Link>
					</p>
				</form>
			</CardContent>
		</Card>
	);
};
