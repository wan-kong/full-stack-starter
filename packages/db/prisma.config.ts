import dotenv from "dotenv";

import { defineConfig } from "prisma/config";

dotenv.config({
	path: "../../apps/server/.env",
});

export default defineConfig({
	schema: "./src/prisma/schema",
	migrations: {
		path: "./src/prisma/migrations",
	},
	datasource: {
		url: process.env.DATABASE_URL,
	},
});
