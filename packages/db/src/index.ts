import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { env } from "@repo/env/server";
import { PrismaClient } from "./prisma/generated/client";

export function createPrismaClient() {
	const databaseUrl: string = env.DATABASE_URL;
	const url: URL = new URL(databaseUrl);
	const connectionConfig = {
		host: url.hostname,
		port: Number.parseInt(url.port || "3306", 10),
		user: url.username,
		password: url.password,
		database: url.pathname.slice(1),
	};

	const adapter = new PrismaMariaDb(connectionConfig);
	return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();
export default prisma;
