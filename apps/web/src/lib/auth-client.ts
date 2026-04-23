import { apiKeyClient } from "@better-auth/api-key/client";
import { env } from "@repo/env/web";
import {
	adminClient,
	lastLoginMethodClient,
	magicLinkClient,
	organizationClient,
	twoFactorClient,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_SERVER_URL,
	plugins: [
		twoFactorClient(),
		organizationClient(),
		usernameClient(),
		adminClient(),
		apiKeyClient(),
		lastLoginMethodClient(),
		magicLinkClient(),
	],
});

export type AppSession = typeof authClient.$Infer.Session;
export type AppUser = AppSession["user"];

export const isAdminUser = (user: { role?: string | null }) =>
	user.role === "admin";
