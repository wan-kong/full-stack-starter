"use client";

import { Spinner } from "@repo/ui/components/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { routes } from "@/lib/routes";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (session) {
			router.replace(routes.dashboard);
		}
	}, [router, session]);

	if (isPending) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Spinner className="size-5" />
			</div>
		);
	}

	return (
		<div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_45%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.35))]">
			<div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6">
				<header className="flex items-center justify-between">
					<Link
						className="font-semibold text-sm uppercase tracking-[0.24em]"
						href={routes.home}
					>
						FullStackStarter
					</Link>
					<ThemeToggle />
				</header>
				<div className="flex flex-1 items-center justify-center py-10">
					{children}
				</div>
			</div>
		</div>
	);
}
