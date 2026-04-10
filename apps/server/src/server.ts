import { env } from "@auth-provider/env/server";
import { createBaseApp } from "@/core/app";

export const startServer = () => {
	const app = createBaseApp()
		.get("/", () => {
			return "OK, this Page is working with Elysia!";
		})
		.get(
			"/me",
			({ user, store: { logger }, request }) => {
				logger.info(request, "user", user);
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
		.listen(env.SERVER_PORT);

	console.log(`🦊 Server is running at http://localhost:${env.SERVER_PORT}`);
	return app;
};

if (import.meta.main) {
	startServer();
}

export type App = ReturnType<typeof startServer>;
