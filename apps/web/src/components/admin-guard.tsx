"use client";

import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@repo/ui/components/empty";
import { ShieldAlertIcon } from "lucide-react";
import { isAdminUser } from "@/lib/auth-client";
import { useSession } from "./auth-guard";

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
	const { user } = useSession();

	if (!isAdminUser(user)) {
		return (
			<div className="p-6">
				<Empty className="min-h-80 border border-border border-dashed">
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<ShieldAlertIcon />
						</EmptyMedia>
						<EmptyTitle>无权访问</EmptyTitle>
						<EmptyDescription>
							当前账号没有管理员权限，无法查看此区域。
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			</div>
		);
	}

	return children;
};
