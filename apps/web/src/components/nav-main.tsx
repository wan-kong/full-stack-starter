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

import { mainNavItems } from "@/lib/nav-config";

export const NavMain = () => {
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>工作区</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{mainNavItems.map((item) => {
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
