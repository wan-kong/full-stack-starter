import { apiKey } from "@better-auth/api-key";
import { dash } from "@better-auth/infra";
import { createPrismaClient } from "@repo/db";
import { env } from "@repo/env/server";
import { sendEmail } from "@repo/mail";
import { sendMagicLinkEmail, sendVerificationEmail } from "@repo/mail/template";
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
				const { html } = await sendVerificationEmail({
					to: user.email,
					url: `${env.BETTER_AUTH_URL}/verify-email?token=${token}`,
				});
				await sendEmail({
					to: user.email,
					subject: "验证您的邮箱地址",
					html: html,
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
					const { html } = await sendMagicLinkEmail({
						to: email,
						url,
					});
					await sendEmail({
						to: email,
						subject: "您的登录链接",
						html: html,
					});
				},
			}),
			openAPI(),
		],
	});
}

export const auth = createAuth();
