"use client";

import { Avatar, AvatarFallback } from "@auth-provider/ui/components/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@auth-provider/ui/components/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@auth-provider/ui/components/sidebar";
import { useQueryClient } from "@tanstack/react-query";
import {
	LogOutIcon,
	MonitorCogIcon,
	MoonIcon,
	Settings2Icon,
	SunIcon,
	UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { useSession } from "@/components/auth-guard";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/errors";
import { routes } from "@/lib/routes";

const getInitials = (name: string) =>
	name
		.split(/\s+/)
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

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
			router.push(routes.signIn);
		} catch (error) {
			toast.error(getErrorMessage(error));
		}
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton size="lg">
								<Avatar className="size-8 rounded-none">
									<AvatarFallback>{getInitials(user.name)}</AvatarFallback>
								</Avatar>
								<span>{user.name}</span>
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent side="top" align="end" className="w-64">
						<DropdownMenuLabel>
							<div className="flex flex-col gap-1">
								<p className="font-medium text-foreground">{user.name}</p>
								<p className="truncate">{user.email}</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuGroup>
							<DropdownMenuItem render={<Link href={routes.settings} />}>
								<UserIcon />
								个人资料
							</DropdownMenuItem>
							<DropdownMenuItem render={<Link href={routes.settings} />}>
								<Settings2Icon />
								账号设置
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuGroup>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<MonitorCogIcon />
									主题
								</DropdownMenuSubTrigger>
								<DropdownMenuSubContent>
									<DropdownMenuItem onClick={() => setTheme("light")}>
										<SunIcon />
										浅色
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setTheme("dark")}>
										<MoonIcon />
										深色
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setTheme("system")}>
										<MonitorCogIcon />
										跟随系统
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuSub>
						</DropdownMenuGroup>
						<DropdownMenuGroup>
							<DropdownMenuItem
								variant="destructive"
								onClick={() => void signOut()}
							>
								<LogOutIcon />
								退出登录
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
