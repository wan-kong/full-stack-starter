import { treaty } from "@elysiajs/eden";
import { env } from "@repo/env/server";
import type { App } from "@repo/server/server";

export const fetch = treaty<App>(env.BETTER_AUTH_URL);
