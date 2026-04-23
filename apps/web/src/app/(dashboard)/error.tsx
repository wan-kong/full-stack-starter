"use client";

import { Button } from "@repo/ui/components/button";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@repo/ui/components/empty";
import { useEffect } from "react";

export default function DashboardError({
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
		<div className="p-6">
			<Empty className="min-h-80 border border-border border-dashed">
				<EmptyHeader>
					<EmptyTitle>仪表盘暂时不可用</EmptyTitle>
					<EmptyDescription>
						页面加载过程中出现问题，请重试一次。
					</EmptyDescription>
				</EmptyHeader>
				<Button onClick={reset}>重新加载</Button>
			</Empty>
		</div>
	);
}
