"use client";

import { Kbd } from "@auth-provider/ui/components/kbd";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@auth-provider/ui/components/sidebar";
import { SearchIcon } from "lucide-react";
import { useSession } from "@/components/auth-guard";
import { NavAdmin } from "@/components/nav-admin";
import { NavMain } from "@/components/nav-main";
import { UserMenu } from "@/components/user-menu";
import { isAdminUser } from "@/lib/auth-client";
import { getMetaKey } from "@/lib/utils";
import { Logo } from "./base/logo/logo";
import { LogoText } from "./base/logo/logo-text";

export const AppSidebar = () => {
	const { user } = useSession();
	const metaKey = getMetaKey();

	return (
		<Sidebar variant="sidebar" collapsible="icon">
			<SidebarHeader>
				<div className="mb-2 flex h-12 items-center justify-between gap-2 px-2 group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0">
					<div className="flex items-center gap-2 text-primary group-data-[state=collapsed]:hidden">
						<Logo />
						<LogoText />
					</div>
					<SidebarTrigger />
				</div>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip={`Search ${metaKey}+K`}
							variant="outline"
							className="flex items-center justify-between gap-2"
							onClick={() => {}}
						>
							<span className="flex items-center gap-2">
								<SearchIcon className="h-4 w-4" /> Search
							</span>
							<Kbd className="whitespace-nowrap">{metaKey} K</Kbd>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
				{isAdminUser(user) ? <NavAdmin /> : null}
			</SidebarContent>
			<SidebarFooter>
				<UserMenu />
			</SidebarFooter>
		</Sidebar>
	);
};
