import { env } from "@auth-provider/env/server";
import openapi from "@elysiajs/openapi";
import type Elysia from "elysia";
import { OpenAPI } from "@/plugins/auth";

export const createOpenAPIPlugin = async (app: Elysia) => {
	if (env.NODE_ENV === "production") {
		// product env, don't generate openapi doc
		return app;
	}
	const components = await OpenAPI.components;
	const paths = await OpenAPI.getPaths();

	app.use(
		openapi({
			documentation: {
				components,
				paths,
			},
		}),
	);
	return app;
};
