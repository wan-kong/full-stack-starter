"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@auth-provider/ui/components/sidebar";
import { ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/components/auth-guard";
import { NavAdmin } from "@/components/nav-admin";
import { NavMain } from "@/components/nav-main";
import { UserMenu } from "@/components/user-menu";
import { isAdminUser } from "@/lib/auth-utils";
import { routes } from "@/lib/routes";

export const AppSidebar = () => {
	const { user } = useSession();

	return (
		<Sidebar variant="inset" collapsible="icon">
			<SidebarHeader>
				<Link
					href={routes.dashboard}
					className="flex items-center gap-3 rounded-none border border-sidebar-border bg-sidebar-accent px-3 py-3"
				>
					<div className="flex size-8 items-center justify-center rounded-none bg-sidebar-primary text-sidebar-primary-foreground">
						<ShieldCheckIcon className="size-4" />
					</div>
					<div className="grid flex-1 text-left group-data-[collapsible=icon]:hidden">
						<span className="font-medium text-sidebar-foreground text-sm">
							Auth Provider
						</span>
						<span className="text-sidebar-foreground/70 text-xs">
							统一身份控制台
						</span>
					</div>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
				{isAdminUser(user) ? <NavAdmin /> : null}
			</SidebarContent>
			<SidebarFooter>
				<UserMenu />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};
