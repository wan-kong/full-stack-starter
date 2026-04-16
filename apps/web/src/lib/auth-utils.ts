import type { authClient } from "@/lib/auth-client";

export type AppSession = typeof authClient.$Infer.Session;
export type AppUser = AppSession["user"];

export const isAdminUser = (user: { role?: string | null }) =>
	user.role === "admin";
