"use client";

import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60_000,
				refetchOnWindowFocus: false,
			},
		},
	});

export const queryClient = createQueryClient();
