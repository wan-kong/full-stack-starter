import {
	BookUserIcon,
	Building2Icon,
	HomeIcon,
	KeyRoundIcon,
	LockKeyholeIcon,
	Settings2Icon,
	ShieldIcon,
	UsersIcon,
} from "lucide-react";

import { routes } from "@/lib/routes";

export const mainNavItems = [
	{ title: "仪表盘", href: routes.dashboard, icon: HomeIcon },
	{ title: "设置", href: routes.settings, icon: Settings2Icon },
	{ title: "安全设置", href: routes.security, icon: ShieldIcon },
	{ title: "API 密钥", href: routes.apiKeys, icon: KeyRoundIcon },
] as const;

export const adminNavItems = [
	{
		title: "用户管理",
		href: routes.adminUsers,
		icon: UsersIcon,
		role: "admin",
	},
	{
		title: "组织管理",
		href: routes.adminOrganizations,
		icon: Building2Icon,
		role: "admin",
	},
] as const;

export const settingsTabs = [
	{ title: "个人资料", href: routes.settings, icon: BookUserIcon },
	{ title: "安全设置", href: routes.security, icon: LockKeyholeIcon },
	{ title: "API 密钥", href: routes.apiKeys, icon: KeyRoundIcon },
] as const;
