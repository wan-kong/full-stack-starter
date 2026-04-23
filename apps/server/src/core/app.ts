import cors from "@elysiajs/cors";
import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { betterAuthPlugin, OpenAPI } from "../plugins/auth";
import { loggerPlugin } from "../plugins/logger";

/**
 * Base app with base plugins
 * Can be reused across multiple services/routes
 */
export const createBaseApp = async () =>
	new Elysia({ name: "base-app" })
		.use(loggerPlugin)
		.use(
			openapi({
				documentation: {
					components: await OpenAPI.components,
					paths: await OpenAPI.getPaths(),
				},
			}),
		)
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
