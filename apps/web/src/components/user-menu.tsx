"use client";

import {
	Menu,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuPanel,
	MenuSeparator,
	MenuSubmenu,
	MenuSubmenuPanel,
	MenuSubmenuTrigger,
	MenuTrigger,
} from "@repo/ui/components/animate-ui/components/base/menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { useQueryClient } from "@tanstack/react-query";
import {
	ChevronsUpDownIcon,
	LogOutIcon,
	MonitorCogIcon,
	MoonIcon,
	Settings2Icon,
	SunIcon,
	UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { useSession } from "@/components/auth-guard";
import { UserMenuProfile } from "@/components/user-menu-profile";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/errors";
import { routes } from "@/lib/routes";

export const UserMenu = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { setTheme } = useTheme();
	const { user } = useSession();

	const signOut = async () => {
		try {
			await authClient.signOut();
			queryClient.clear();
			toast.success("已退出登录");
			router.push(routes.home);
		} catch (error) {
			toast.error(getErrorMessage(error));
		}
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<Menu>
					<MenuTrigger
						render={
							<SidebarMenuButton
								size="lg"
								className="data-[popup-open=true]:bg-sidebar-accent data-[popup-open=true]:text-sidebar-accent-foreground"
							/>
						}
					>
						<UserMenuProfile
							name={user.name}
							email={user.email}
							className="flex-1"
						/>
						<ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
					</MenuTrigger>
					<MenuPanel side="right" align="end" className="w-64">
						<MenuGroup>
							<MenuGroupLabel className="px-2 py-2">
								<UserMenuProfile name={user.name} email={user.email} />
							</MenuGroupLabel>
						</MenuGroup>
						<MenuSeparator />
						<MenuGroup>
							<MenuItem onClick={() => router.push(routes.settings)}>
								<UserIcon />
								个人资料
							</MenuItem>
							<MenuItem onClick={() => router.push(routes.settings)}>
								<Settings2Icon />
								账号设置
							</MenuItem>
						</MenuGroup>
						<MenuGroup>
							<MenuSubmenu>
								<MenuSubmenuTrigger className="gap-2">
									<MonitorCogIcon className="size-4 text-muted-foreground" />
									主题
								</MenuSubmenuTrigger>
								<MenuSubmenuPanel>
									<MenuItem onClick={() => setTheme("light")}>
										<SunIcon />
										浅色
									</MenuItem>
									<MenuItem onClick={() => setTheme("dark")}>
										<MoonIcon />
										深色
									</MenuItem>
									<MenuItem onClick={() => setTheme("system")}>
										<MonitorCogIcon />
										跟随系统
									</MenuItem>
								</MenuSubmenuPanel>
							</MenuSubmenu>
						</MenuGroup>
						<MenuSeparator />
						<MenuGroup>
							<MenuItem variant="destructive" onClick={() => void signOut()}>
								<LogOutIcon />
								退出登录
							</MenuItem>
						</MenuGroup>
					</MenuPanel>
				</Menu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
