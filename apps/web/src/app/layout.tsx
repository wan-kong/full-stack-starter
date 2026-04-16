import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";

import { Providers } from "@/components/providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Auth Provider",
		template: "%s | Auth Provider",
	},
	description: "统一管理登录、组织、双因素认证与 API 密钥的现代化身份平台。",
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3000",
	),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="zh-CN"
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="flex min-h-full flex-col">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
