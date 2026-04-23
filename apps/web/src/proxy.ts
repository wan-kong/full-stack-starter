import { getSessionCookie } from "better-auth/cookies";
import type { Route } from "next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routes, withRedirect } from "@/lib/routes";

const publicAuthPaths = new Set([routes.signIn, routes.signUp, routes.home]);
const protectedPrefixes = ["/dashboard", "/admin", "/settings"];

export function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname as Route;
	const hasSession = Boolean(getSessionCookie(request));

	if (hasSession && publicAuthPaths.has(pathname)) {
		return NextResponse.redirect(new URL(routes.dashboard, request.url));
	}

	const requiresAuth = protectedPrefixes.some(
		(prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
	);

	if (!hasSession && requiresAuth) {
		return NextResponse.redirect(
			new URL(withRedirect(routes.signIn, pathname), request.url),
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/settings/:path*",
		"/admin/:path*",
		"/sign-in",
		"/sign-up",
		"/",
	],
};
