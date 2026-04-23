import { Badge } from "@repo/ui/components/badge";
import { Button, buttonVariants } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";
import {
	ArrowRightIcon,
	Building2Icon,
	KeyRoundIcon,
	LockKeyholeIcon,
	ShieldCheckIcon,
	SparklesIcon,
	UsersRoundIcon,
} from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { routes } from "@/lib/routes";

const features = [
	{
		title: "安全认证",
		description: "邮箱密码、GitHub OAuth、Magic Link 与跨域 Cookie 一次接好。",
		icon: ShieldCheckIcon,
	},
	{
		title: "团队管理",
		description: "组织、成员、角色权限和管理入口全部集中在一个后台里。",
		icon: UsersRoundIcon,
	},
	{
		title: "双因素认证",
		description: "开关、验证和恢复流程都为真实业务场景准备完成。",
		icon: LockKeyholeIcon,
	},
	{
		title: "API 密钥管理",
		description: "创建、复制、删除和权限控制，适合服务间接入与内部工具。",
		icon: KeyRoundIcon,
	},
	{
		title: "组织管理",
		description: "支持多组织能力，为 B2B SaaS 或内部协作平台打底。",
		icon: Building2Icon,
	},
	{
		title: "管理员控制台",
		description: "管理员用户可查看用户列表、封禁账号并管理组织数据。",
		icon: SparklesIcon,
	},
] as const;

const testimonials = [
	{
		quote: "从空白 Web 到可用后台的速度非常快，团队不用再重复造认证页面。",
		name: "林晨",
		title: "产品负责人",
	},
	{
		quote: "组织、权限和安全设置都在同一个系统里，交付节奏明显更稳了。",
		name: "余安",
		title: "全栈工程师",
	},
	{
		quote: "中文界面很贴合我们内部使用场景，新成员第一次登录也不会迷路。",
		name: "周然",
		title: "运维经理",
	},
] as const;

const tiers = [
	{
		name: "免费版",
		price: "¥0",
		description: "适合原型验证和个人项目。",
		features: ["邮箱密码登录", "GitHub OAuth", "基础用户设置"],
	},
	{
		name: "专业版",
		price: "¥199 / 月",
		description: "适合正在快速增长的产品团队。",
		features: ["双因素认证", "API 密钥", "组织与角色管理", "管理员面板"],
	},
	{
		name: "企业版",
		price: "联系我们",
		description: "适合复杂权限与内部平台场景。",
		features: ["自定义接入支持", "上线协助", "安全审计建议", "优先支持"],
	},
] as const;

export default function Home() {
	return (
		<div className="min-h-screen bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.3)),radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_38%)]">
			<div className="mx-auto flex max-w-7xl flex-col px-6 py-6">
				<header className="flex items-center justify-between rounded-none border border-border/60 bg-background/70 px-4 py-3 backdrop-blur">
					<div className="flex items-center gap-3">
						<div className="flex size-9 items-center justify-center rounded-none bg-foreground text-background">
							<Image
								src="/next.svg"
								alt="FullStackStarter"
								width={22}
								height={22}
								priority
							/>
						</div>
						<div>
							<p className="font-semibold text-sm">FullStackStarter</p>
							<p className="text-muted-foreground text-xs">
								现代身份与后台管理平台
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<ThemeToggle />
						<Button
							variant="ghost"
							render={<Link href={routes.signIn as Route} />}
						>
							登录
						</Button>
						<Button render={<Link href={routes.signUp as Route} />}>
							注册
						</Button>
					</div>
				</header>

				<main className="flex flex-col gap-24 pt-20 pb-16">
					<section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
						<div className="flex flex-col gap-8">
							<Badge
								variant="outline"
								className="w-fit rounded-none px-3 py-1 text-xs"
							>
								适用于认证、组织与后台一体化交付
							</Badge>
							<div className="flex flex-col gap-5">
								<h1 className="max-w-3xl font-semibold text-5xl leading-tight tracking-tight sm:text-6xl">
									把登录、安全和管理后台，一次性做成你产品里的可靠基础设施。
								</h1>
								<p className="max-w-2xl text-base text-muted-foreground leading-8 sm:text-lg">
									现成的 Better Auth 能力、Next.js 16 Web
									前台和中文化后台体验，帮助团队从第一天就拥有像样的身份系统。
								</p>
							</div>
							<div className="flex flex-col gap-3 sm:flex-row">
								<Link
									href={routes.signUp}
									className={cn(
										buttonVariants({
											size: "lg",
										}),
										"min-w-40",
									)}
								>
									立即开始
									<ArrowRightIcon />
								</Link>
								<Link
									href="#features"
									className={cn(
										buttonVariants({
											size: "lg",
											variant: "outline",
										}),
										"min-w-40",
									)}
								>
									了解更多
									<ArrowRightIcon />
								</Link>
							</div>
						</div>
						<Card className="border-border/70 bg-background/85 shadow-sm">
							<CardHeader className="gap-3">
								<CardTitle>内建的产品级能力</CardTitle>
								<CardDescription>
									不是示例页面，而是为真实认证流程准备的完整起点。
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-4 sm:grid-cols-2">
								{features.slice(0, 4).map((feature) => (
									<div
										key={feature.title}
										className="rounded-none border border-border/70 bg-muted/30 p-4"
									>
										<feature.icon className="mb-3 size-5" />
										<p className="font-medium text-sm">{feature.title}</p>
										<p className="mt-2 text-muted-foreground text-xs leading-6">
											{feature.description}
										</p>
									</div>
								))}
							</CardContent>
						</Card>
					</section>

					<section id="features" className="flex flex-col gap-8">
						<div className="max-w-2xl">
							<p className="mb-3 text-muted-foreground text-xs uppercase tracking-[0.3em]">
								核心能力
							</p>
							<h2 className="font-semibold text-3xl">
								从落地页到受保护后台，一套结构贯穿到底。
							</h2>
						</div>
						<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
							{features.map((feature) => (
								<Card
									key={feature.title}
									className="border-border/70 bg-background/80"
								>
									<CardHeader>
										<feature.icon className="size-5" />
										<CardTitle className="mt-4">{feature.title}</CardTitle>
										<CardDescription>{feature.description}</CardDescription>
									</CardHeader>
								</Card>
							))}
						</div>
					</section>

					<section className="grid gap-4 lg:grid-cols-3">
						{testimonials.map((item) => (
							<Card
								key={item.name}
								className="border-border/70 bg-background/85"
							>
								<CardContent className="flex h-full flex-col gap-6 p-6">
									<p className="text-sm leading-7">“{item.quote}”</p>
									<div className="mt-auto">
										<p className="font-medium text-sm">{item.name}</p>
										<p className="text-muted-foreground text-xs">
											{item.title}
										</p>
									</div>
								</CardContent>
							</Card>
						))}
					</section>

					<section className="flex flex-col gap-8">
						<div className="max-w-2xl">
							<p className="mb-3 text-muted-foreground text-xs uppercase tracking-[0.3em]">
								方案与价格
							</p>
							<h2 className="font-semibold text-3xl">
								从验证想法到团队协作，都有合适的起步方式。
							</h2>
						</div>
						<div className="grid gap-4 lg:grid-cols-3">
							{tiers.map((tier) => (
								<Card
									key={tier.name}
									className="border-border/70 bg-background/85"
								>
									<CardHeader>
										<CardTitle>{tier.name}</CardTitle>
										<CardDescription>{tier.description}</CardDescription>
									</CardHeader>
									<CardContent className="flex flex-col gap-4">
										<p className="font-semibold text-3xl">{tier.price}</p>
										<div className="flex flex-col gap-2 text-sm">
											{tier.features.map((feature) => (
												<div
													key={feature}
													className="flex items-center gap-2 text-muted-foreground"
												>
													<span className="size-1.5 rounded-full bg-foreground/70" />
													{feature}
												</div>
											))}
										</div>
									</CardContent>
									<CardFooter>
										<Button
											variant={tier.name === "专业版" ? "default" : "outline"}
											className="w-full"
											render={<Link href={routes.signUp as Route} />}
										>
											选择 {tier.name}
										</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					</section>
				</main>

				<footer className="flex flex-col gap-4 border-border/70 border-t py-8 text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="font-medium text-foreground">FullStackStarter</p>
						<p>© {new Date().getFullYear()} 专注于安全认证与后台交付体验。</p>
					</div>
					<div className="flex gap-4">
						<Link href={routes.signIn}>登录</Link>
						<Link href={routes.signUp}>注册</Link>
						<a href="https://better-auth.com" target="_blank" rel="noopener">
							Better Auth
						</a>
					</div>
				</footer>
			</div>
		</div>
	);
}
