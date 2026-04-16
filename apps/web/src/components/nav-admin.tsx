"use client";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@auth-provider/ui/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavItems } from "@/lib/nav-config";

export const NavAdmin = () => {
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>管理</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{adminNavItems.map((item) => {
						const isActive =
							pathname === item.href || pathname.startsWith(`${item.href}/`);
						return (
							<SidebarMenuItem key={item.href}>
								<SidebarMenuButton
									isActive={isActive}
									tooltip={item.title}
									render={<Link href={item.href} />}
								>
									<item.icon />
									<span>{item.title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
