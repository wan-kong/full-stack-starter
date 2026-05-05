import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
	path: "../../apps/server/.env",
});

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL is required to run Drizzle Kit.");
}

export default defineConfig({
	schema: "./src/schema.ts",
	out: "./src/drizzle/migrations",
	dialect: "mysql",
	dbCredentials: {
		url: databaseUrl,
	},
	strict: true,
	verbose: true,
});
