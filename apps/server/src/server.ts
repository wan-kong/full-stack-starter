import { createBaseApp } from "@/core/app";

export const startServer = async () => {
	const app = await createBaseApp();
	app
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
			},
		)
		.listen({});

	console.log(`🦊 Server is running at ${app.server?.url}`);
	return app;
};

if (import.meta.main) {
	startServer();
}

export type App = ReturnType<typeof startServer>;
