"use client";

import { Toaster } from "@auth-provider/ui/components/sonner";
import { TooltipProvider } from "@auth-provider/ui/components/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useState } from "react";

import { createQueryClient } from "@/lib/query-client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(createQueryClient);

	return (
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
	);
};
