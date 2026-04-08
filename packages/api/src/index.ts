import { env } from "@auth-provider/env/server";
import type { App } from "@auth-provider/server";
import { treaty } from "@elysiajs/eden";

export const fetch = treaty<App>(env.BETTER_AUTH_URL);
