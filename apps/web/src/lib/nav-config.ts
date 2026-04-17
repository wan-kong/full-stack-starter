import {
	Building2Icon,
	HomeIcon,
	Settings2Icon,
	UsersIcon,
} from "lucide-react";

import { routes } from "@/lib/routes";

export const mainNavItems = [
	{ title: "仪表盘", href: routes.dashboard, icon: HomeIcon },
	{ title: "设置", href: routes.settings, icon: Settings2Icon },
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
