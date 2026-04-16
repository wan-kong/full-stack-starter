import {
	SidebarInset,
	SidebarProvider,
} from "@auth-provider/ui/components/sidebar";
import { cookies } from "next/headers";

import { AppSidebar } from "@/components/app-sidebar";
import { AuthGuard } from "@/components/auth-guard";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();
	const sidebarState = cookieStore.get("sidebar_state")?.value;

	return (
		<AuthGuard>
			<SidebarProvider defaultOpen={sidebarState !== "false"}>
				<AppSidebar />
				<SidebarInset className="min-h-screen bg-muted/30">
					{children}
				</SidebarInset>
			</SidebarProvider>
		</AuthGuard>
	);
}
