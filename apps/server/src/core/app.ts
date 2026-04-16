import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { betterAuthPlugin } from "../plugins/auth";
import { loggerPlugin } from "../plugins/logger";
import { createOpenAPIPlugin } from "../plugins/openapi";

/**
 * Base app with all common plugins
 * Can be reused across multiple services/routes
 */
export const createBaseApp = () =>
	new Elysia({ name: "base-app" })
		.use(loggerPlugin)
		.use(createOpenAPIPlugin)
		.use(
			cors({
				origin: true,
				methods: "*",
				allowedHeaders: ["Content-Type", "Authorization"],
				credentials: true,
			}),
		)
		.use(betterAuthPlugin);

export type BaseApp = ReturnType<typeof createBaseApp>;
