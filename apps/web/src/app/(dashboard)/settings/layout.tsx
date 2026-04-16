"use client";

import { Tabs, TabsList, TabsTrigger } from "@auth-provider/ui/components/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { settingsTabs } from "@/lib/nav-config";

export default function SettingsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();

	return (
		<div className="flex flex-1 flex-col">
			<PageHeader
				title="设置"
				description="在这里管理个人资料、安全能力与 API 密钥。"
			/>
			<div className="flex flex-col gap-6 p-4 sm:p-6">
				<Tabs value={pathname}>
					<TabsList>
						{settingsTabs.map((tab) => (
							<TabsTrigger
								key={tab.href}
								value={tab.href}
								render={<Link href={tab.href} />}
							>
								<tab.icon />
								{tab.title}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
				{children}
			</div>
		</div>
	);
}
