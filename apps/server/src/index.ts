import { env } from "@auth-provider/env/server";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { betterAuth, OpenAPI } from "./libs/auth";

const app = new Elysia()
	.use(
		openapi({
			documentation: {
				components: await OpenAPI.components,
				paths: await OpenAPI.getPaths(),
			},
		})
	)
	.use(
		cors({
			origin: env.CORS_ORIGIN,
			methods: ["GET", "POST", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization"],
			credentials: true,
		})
	)
	.use(betterAuth)
	.get("/", () => "OK, this Page is working with Elysia!")
	.get(
		"/me",
		({ user }) => {
			return user;
		},
		{
			auth: true,
			detail: {
				summary: "Get current user info",
				description: "Returns the current authenticated user's information.",
				tags: ["User"],
			},
		}
	)
	.listen(3000, () => {
		console.log("Server is running on http://localhost:3000");
	});

export type App = typeof app;
