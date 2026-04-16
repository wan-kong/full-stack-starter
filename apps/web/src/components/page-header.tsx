"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@auth-provider/ui/components/breadcrumb";
import { Separator } from "@auth-provider/ui/components/separator";
import { SidebarTrigger } from "@auth-provider/ui/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavItems, mainNavItems, settingsTabs } from "@/lib/nav-config";
import { routes } from "@/lib/routes";

const staticEntries: Array<[string, string]> = [
	[routes.dashboard, "仪表盘"],
	[routes.settings, "个人资料"],
	[routes.security, "安全设置"],
	[routes.apiKeys, "API 密钥"],
	[routes.adminUsers, "用户管理"],
	[routes.adminOrganizations, "组织管理"],
];

const titleMap = new Map<string, string>([
	...staticEntries,
	...mainNavItems.map((item) => [item.href, item.title] as [string, string]),
	...adminNavItems.map((item) => [item.href, item.title] as [string, string]),
	...settingsTabs.map((item) => [item.href, item.title] as [string, string]),
]);

export const PageHeader = ({
	title,
	description,
	actions,
}: {
	title: string;
	description?: string;
	actions?: React.ReactNode;
}) => {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);
	const crumbs = segments.map(
		(_, index) => `/${segments.slice(0, index + 1).join("/")}`,
	);

	return (
		<header className="border-border/70 border-b bg-background/80 px-4 py-4 backdrop-blur sm:px-6">
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-3">
					<SidebarTrigger />
					<Separator orientation="vertical" className="h-5" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink render={<Link href={routes.dashboard} />}>
									控制台
								</BreadcrumbLink>
							</BreadcrumbItem>
							{crumbs.map((crumb, index) => {
								const isLast = index === crumbs.length - 1;
								const label =
									titleMap.get(crumb) ?? crumb.split("/").at(-1) ?? crumb;
								return (
									<BreadcrumbItem key={crumb}>
										<BreadcrumbSeparator />
										{isLast ? (
											<BreadcrumbPage>{label}</BreadcrumbPage>
										) : (
											<BreadcrumbLink render={<Link href={crumb as never} />}>
												{label}
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
								);
							})}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div className="space-y-1">
						<h1 className="font-semibold text-2xl tracking-tight">{title}</h1>
						{description ? (
							<p className="max-w-3xl text-muted-foreground text-sm leading-6">
								{description}
							</p>
						) : null}
					</div>
					{actions ? (
						<div className="flex items-center gap-2">{actions}</div>
					) : null}
				</div>
			</div>
		</header>
	);
};
