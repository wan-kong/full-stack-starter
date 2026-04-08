/** biome-ignore-all lint/suspicious/noExplicitAny: the type of operation is too complex to be inferred */
import { auth } from "@auth-provider/auth";
import { Elysia } from "elysia";

// user middleware (compute user and session and pass to routes)
export const betterAuth = new Elysia({ name: "better-auth" })
	.mount(auth.handler)
	.macro({
		auth: {
			async resolve({ status, request: { headers } }) {
				const session = await auth.api.getSession({
					headers,
				});
				if (!session) {
					return status(401);
				}
				return {
					user: session.user,
					session: session.session,
				};
			},
		},
	});

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());
export const OpenAPI = {
	getPaths: (prefix = "/api") =>
		getSchema().then(({ paths }) => {
			const reference: typeof paths = Object.create(null);
			for (const path of Object.keys(paths)) {
				const key = prefix + path;
				// biome-ignore lint/style/noNonNullAssertion: it's guaranteed by the type of paths
				reference[key] = paths[path]!;
				// biome-ignore lint/style/noNonNullAssertion: it's guaranteed by the type of paths
				for (const method of Object.keys(paths[path]!)) {
					const operation = (reference[key] as any)[method];
					operation.tags = ["Better Auth"];
				}
			}
			return reference;
		}) as Promise<any>,
	components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;
