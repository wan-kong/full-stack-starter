"use client";

import { Avatar, AvatarFallback } from "@auth-provider/ui/components/avatar";
import { cn } from "@auth-provider/ui/lib/utils";

type UserMenuProfileProps = {
	name: string;
	email: string;
	className?: string;
};

const getInitials = (name: string) =>
	name
		.split(/\s+/)
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

export const UserMenuProfile = ({
	name,
	email,
	className,
}: UserMenuProfileProps) => {
	return (
		<div className={cn("flex min-w-0 items-center gap-2", className)}>
			<Avatar className="size-8 rounded-none">
				<AvatarFallback>{getInitials(name)}</AvatarFallback>
			</Avatar>
			<div className="grid min-w-0 flex-1 text-left text-xs leading-tight">
				<span className="truncate font-medium text-foreground">{name}</span>
				<span className="truncate text-muted-foreground">{email}</span>
			</div>
		</div>
	);
};
