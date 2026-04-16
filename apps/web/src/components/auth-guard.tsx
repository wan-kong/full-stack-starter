"use client";

import { Spinner } from "@auth-provider/ui/components/spinner";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

import { authClient } from "@/lib/auth-client";
import type { AppSession } from "@/lib/auth-utils";
import { routes, withRedirect } from "@/lib/routes";

const SessionContext = createContext<AppSession | null>(null);

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const pathname = usePathname();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (!isPending && !session) {
			router.replace(withRedirect(routes.signIn, pathname) as never);
		}
	}, [isPending, pathname, router, session]);

	if (isPending || !session) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Spinner className="size-5" />
			</div>
		);
	}

	return (
		<SessionContext.Provider value={session}>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = () => {
	const session = useContext(SessionContext);

	if (!session) {
		throw new Error("useSession must be used within AuthGuard.");
	}

	return session;
};
