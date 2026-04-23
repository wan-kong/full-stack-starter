import { env } from "@repo/env/server";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail({
	to,
	subject,
	html,
}: {
	to: string;
	subject: string;
	html: string;
}) {
	const { error } = await resend.emails.send({
		from: env.RESEND_SEND_EMAIL || "FullStackStarter<welcome@wankong.top>",
		to,
		html,
		subject,
	});

	if (error) {
		console.error("Failed to send email:", error);
		throw error;
	}
}
