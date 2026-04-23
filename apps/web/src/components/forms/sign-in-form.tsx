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
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@auth-provider/ui/components/field";
import { Input } from "@auth-provider/ui/components/input";
import { Separator } from "@auth-provider/ui/components/separator";
import { Spinner } from "@auth-provider/ui/components/spinner";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/errors";
import { routes } from "@/lib/routes";

const signInSchema = z.object({
	email: z.email("请输入有效的邮箱地址"),
	password: z.string().min(8, "密码至少需要 8 位"),
});

export const SignInForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get("redirect") ?? routes.dashboard;
	const lastMethod = authClient.getLastUsedLoginMethod();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			const parsed = signInSchema.safeParse(value);
			if (!parsed.success) {
				throw parsed.error;
			}

			await authClient.signIn.email({
				email: parsed.data.email,
				password: parsed.data.password,
				callbackURL: redirectTo,
			});

			toast.success("登录成功");
			router.replace(redirectTo as never);
		},
	});

	const sendMagicLink = async () => {
		const parsed = signInSchema.pick({ email: true }).safeParse({
			email: form.state.values.email,
		});

		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "请输入邮箱地址");
			return;
		}

		try {
			await authClient.signIn.magicLink({
				email: parsed.data.email,
				callbackURL: redirectTo,
			});
			toast.success("登录链接已发送，请查收邮箱");
		} catch (error) {
			toast.error(getErrorMessage(error));
		}
	};

	return (
		<Card className="w-full max-w-lg border-border/70 bg-background/95 shadow-sm">
			<CardHeader className="gap-2">
				<CardTitle className="text-xl">欢迎回来</CardTitle>
				<CardDescription>
					使用邮箱密码登录，或继续使用 GitHub 与邮箱登录链接。
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
							toast.error(message ?? "登录失败");
						});
					}}
				>
					<FieldGroup>
						<form.Field name="email">
							{(field) => (
								<Field data-invalid={field.state.meta.errors.length > 0}>
									<FieldLabel htmlFor={field.name}>邮箱</FieldLabel>
									<FieldContent>
										<Input
											id={field.name}
											name={field.name}
											type="email"
											autoComplete="email"
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
						<form.Field name="password">
							{(field) => (
								<Field data-invalid={field.state.meta.errors.length > 0}>
									<FieldLabel htmlFor={field.name}>密码</FieldLabel>
									<FieldContent>
										<Input
											id={field.name}
											name={field.name}
											type="password"
											autoComplete="current-password"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(event) =>
												field.handleChange(event.target.value)
											}
											aria-invalid={field.state.meta.errors.length > 0}
										/>
										<FieldDescription>
											若已开启双因素认证，登录后会继续验证。
										</FieldDescription>
										<FieldError errors={field.state.meta.errors} />
									</FieldContent>
								</Field>
							)}
						</form.Field>
					</FieldGroup>

					<Button type="submit" disabled={form.state.isSubmitting}>
						{form.state.isSubmitting ? <Spinner className="size-4" /> : null}
						登录
					</Button>
					<div className="flex flex-col gap-3">
						<Button
							type="button"
							variant={lastMethod === "github" ? "default" : "outline"}
							onClick={() =>
								authClient.signIn.social({
									provider: "github",
									callbackURL: redirectTo,
								})
							}
						>
							使用 GitHub 登录
						</Button>
						<Button
							type="button"
							variant={lastMethod === "magic-link" ? "default" : "outline"}
							onClick={() => void sendMagicLink()}
						>
							发送登录链接
						</Button>
					</div>

					<Separator />

					<p className="text-center text-muted-foreground text-xs">
						还没有账号？{" "}
						<Link
							className="text-foreground underline underline-offset-4"
							href={routes.signUp}
						>
							立即注册
						</Link>
					</p>
				</form>
			</CardContent>
		</Card>
	);
};
