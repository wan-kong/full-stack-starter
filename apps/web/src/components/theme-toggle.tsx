"use client";

import { Button } from "@repo/ui/components/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button variant="outline" size="icon-sm" aria-label="切换主题">
				<SunIcon />
			</Button>
		);
	}

	const isDark = resolvedTheme === "dark";

	return (
		<Button
			variant="outline"
			size="icon-sm"
			aria-label="切换主题"
			onClick={() => setTheme(isDark ? "light" : "dark")}
		>
			{isDark ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
};
