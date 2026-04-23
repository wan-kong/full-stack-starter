"use client";

import { Button } from "@repo/ui/components/button";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@repo/ui/components/empty";
import { useEffect } from "react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html lang="zh-CN">
			<body className="flex min-h-screen items-center justify-center bg-background px-6">
				<Empty className="max-w-lg border border-border border-dashed">
					<EmptyHeader>
						<EmptyTitle>页面发生错误</EmptyTitle>
						<EmptyDescription>
							系统在渲染过程中遇到了问题，请稍后重试。
						</EmptyDescription>
					</EmptyHeader>
					<Button onClick={reset}>重新加载</Button>
				</Empty>
			</body>
		</html>
	);
}
