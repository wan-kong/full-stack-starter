import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import { AuthGuard } from "@/components/auth-guard";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthGuard>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset className="min-h-screen bg-muted/30">
					{children}
				</SidebarInset>
			</SidebarProvider>
		</AuthGuard>
	);
}
