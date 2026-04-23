import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "../index.css";

import { Toaster } from "@repo/ui/components/sonner";
import { TooltipProvider } from "@repo/ui/components/tooltip";
import { cn } from "@repo/ui/lib/utils";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { queryClient } from "@/lib/query-client";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

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
		default: "FullStackStarter",
		template: "%s | FullStackStarter",
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
			className={cn(
				"h-full",
				"antialiased",
				geistSans.variable,
				geistMono.variable,
				"font-mono",
				jetbrainsMono.variable,
			)}
		>
			<body className="flex min-h-full flex-col">
				<NuqsAdapter>
					<QueryClientProvider client={queryClient}>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<TooltipProvider>
								{children}
								<Toaster richColors position="top-right" />
							</TooltipProvider>
						</ThemeProvider>
					</QueryClientProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
