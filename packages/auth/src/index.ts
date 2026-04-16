import { createPrismaClient } from "@auth-provider/db";
import { env } from "@auth-provider/env/server";
import { sendEmail } from "@auth-provider/mail";
import {
	sendMagicLinkEmail,
	sendVerificationEmail,
} from "@auth-provider/mail/template";
import { apiKey } from "@better-auth/api-key";
import { dash } from "@better-auth/infra";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import {
	admin,
	lastLoginMethod,
	magicLink,
	openAPI,
	organization,
	twoFactor,
	username,
} from "better-auth/plugins";
export function createAuth() {
	const prisma = createPrismaClient();

	return betterAuth({
		database: prismaAdapter(prisma, {
			provider: "mysql",
		}),
		account: {
			skipStateCookieCheck: true,
		},
		socialProviders: {
			github: {
				clientId: env.GITHUB_CLIENT_ID,
				clientSecret: env.GITHUB_CLIENT_SECRET,
			},
		},
		emailAndPassword: {
			enabled: true,
		},
		emailVerification: {
			sendOnSignIn: true,
			async sendVerificationEmail({ user, token }) {
				await sendEmail({
					to: user.email,
					subject: "验证您的邮箱地址",
					html: sendVerificationEmail({
						to: user.email,
						url: `${env.BETTER_AUTH_URL}/verify-email?token=${token}`,
					}),
				});
			},
		},
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		advanced: {
			defaultCookieAttributes: {
				sameSite: "none",
				secure: true,
				httpOnly: true,
			},
		},
		plugins: [
			dash({
				apiKey: env.BETTER_AUTH_API_KEY,
			}),
			twoFactor(),
			organization(),
			username(),
			admin(),
			apiKey(),
			lastLoginMethod(),
			magicLink({
				async sendMagicLink({ email, url }) {
					await sendEmail({
						to: email,
						subject: "您的登录链接",
						html: sendMagicLinkEmail({
							to: email,
							url,
						}),
					});
				},
			}),
			openAPI(),
		],
	});
}

export const auth = createAuth();
