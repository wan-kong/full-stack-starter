"use client";

import { AdminGuard } from "@/components/admin-guard";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <AdminGuard>{children}</AdminGuard>;
}
