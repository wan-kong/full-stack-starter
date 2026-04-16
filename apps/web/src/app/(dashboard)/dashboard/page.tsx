"use client";

import { buttonVariants } from "@auth-provider/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@auth-provider/ui/components/card";
import { cn } from "@auth-provider/ui/lib/utils";
import {
	CalendarDaysIcon,
	KeyRoundIcon,
	MoveRightIcon,
	ShieldCheckIcon,
	VerifiedIcon,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "@/components/auth-guard";
import { PageHeader } from "@/components/page-header";
import type { AppUser } from "@/lib/auth-utils";
import { routes } from "@/lib/routes";

const formatDate = (value: Date | string | undefined) => {
	if (!value) {
		return "暂无";
	}

	return new Intl.DateTimeFormat("zh-CN", {
		dateStyle: "medium",
	}).format(new Date(value));
};

export default function DashboardPage() {
	const { user } = useSession();
	const lastLoginMethod = (
		user as AppUser & { lastLoginMethod?: string | null }
	).lastLoginMethod;

	const cards = [
		{
			title: "注册时间",
			value: formatDate(user.createdAt),
			description: "账号创建日期",
			icon: CalendarDaysIcon,
		},
		{
			title: "最近登录方式",
			value: lastLoginMethod ?? "未记录",
			description: "用于识别回流入口",
			icon: MoveRightIcon,
		},
		{
			title: "双因素认证",
			value: user.twoFactorEnabled ? "已启用" : "未启用",
			description: "建议在安全设置中开启",
			icon: ShieldCheckIcon,
		},
		{
			title: "邮箱状态",
			value: user.emailVerified ? "已验证" : "待验证",
			description: user.email,
			icon: VerifiedIcon,
		},
	];

	return (
		<div className="flex flex-1 flex-col">
			<PageHeader
				title={`你好，${user.name}`}
				description="这里汇总了账号状态、安全能力与管理入口，方便你快速进入下一步操作。"
				actions={
					<Link className={cn(buttonVariants())} href={routes.settings}>
						前往设置
					</Link>
				}
			/>
			<div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
					{cards.map((card) => (
						<Card key={card.title}>
							<CardHeader className="flex flex-row items-start justify-between">
								<div className="space-y-2">
									<CardDescription>{card.title}</CardDescription>
									<CardTitle className="text-xl">{card.value}</CardTitle>
								</div>
								<card.icon className="size-5 text-muted-foreground" />
							</CardHeader>
							<CardContent className="text-muted-foreground text-xs">
								{card.description}
							</CardContent>
						</Card>
					))}
				</div>

				<div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
					<Card>
						<CardHeader>
							<CardTitle>快速操作</CardTitle>
							<CardDescription>
								常用的安全与管理操作可以从这里直接进入。
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-3 sm:grid-cols-2">
							<Link
								href={routes.security}
								className={cn(
									buttonVariants({
										variant: "outline",
									}),
									"justify-between",
								)}
							>
								管理双因素认证
								<ShieldCheckIcon />
							</Link>
							<Link
								href={routes.apiKeys}
								className={cn(
									buttonVariants({
										variant: "outline",
									}),
									"justify-between",
								)}
							>
								查看 API 密钥
								<KeyRoundIcon />
							</Link>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>账户提示</CardTitle>
							<CardDescription>
								推荐优先完成以下项目，保证使用体验更稳定。
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-3 text-sm">
							<p>1. 补充个人资料与用户名，方便组织内识别。</p>
							<p>2. 启用双因素认证，降低账户被盗风险。</p>
							<p>3. 为自动化脚本创建独立 API 密钥。</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
