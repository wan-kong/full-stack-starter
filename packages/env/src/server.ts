import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().min(1),
		// BetterAuth
		BETTER_AUTH_SECRET: z.string().min(32),
		BETTER_AUTH_URL: z.url(),
		BETTER_AUTH_API_KEY: z.string().min(1).optional(),

		CORS_ORIGIN: z.url(),
		// Resend
		RESEND_SEND_EMAIL: z.string().min(1),
		RESEND_API_KEY: z.string().min(1),

		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),

		// GitHub OAuth
		GITHUB_CLIENT_ID: z.string().min(1),
		GITHUB_CLIENT_SECRET: z.string().min(1),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
