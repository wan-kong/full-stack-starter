import { Button } from "@auth-provider/ui/components/button";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@auth-provider/ui/components/empty";
import Link from "next/link";

import { routes } from "@/lib/routes";

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center px-6">
			<Empty className="max-w-lg border border-border border-dashed">
				<EmptyHeader>
					<EmptyTitle>页面未找到</EmptyTitle>
					<EmptyDescription>
						这个地址不存在，可能已经被移动，或者链接输入有误。
					</EmptyDescription>
				</EmptyHeader>
				<Button render={<Link href={routes.home} />}>返回首页</Button>
			</Empty>
		</div>
	);
}
