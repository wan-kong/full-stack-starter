import { env } from "@repo/env/server";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import {
	account,
	apikey,
	invitation,
	member,
	organization,
	session,
	twoFactor,
	user,
	verification,
} from "./schema";

export const authSchema = {
	user,
	session,
	account,
	verification,
	twoFactor,
	organization,
	member,
	invitation,
	apikey,
} as const;

export function createDbClient(databaseUrl = env.DATABASE_URL) {
	const pool = mysql.createPool(databaseUrl);

	return drizzle(pool, {
		schema,
		mode: "default",
	});
}

const db = createDbClient();

export { db, schema };
export default db;
