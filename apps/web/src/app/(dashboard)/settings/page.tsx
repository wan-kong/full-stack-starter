"use client";

import {
	Tabs,
	TabsList,
	TabsPanel,
	TabsPanels,
	TabsTab,
} from "@repo/ui/components/animate-ui/components/base/tabs";
import { BookUserIcon, KeyRoundIcon, LockKeyholeIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { PageHeader } from "@/components/page-header";
import ApiKey from "@/components/settings/api-keys/api-keys";
import Profile from "@/components/settings/profile/profile";
import SettingsSecurityPage from "@/components/settings/security/security";

const settingsTabs = [
	{
		title: "个人资料",
		key: "profile",
		icon: BookUserIcon,
		panel: Profile,
	},
	{
		title: "安全设置",
		key: "security",
		icon: LockKeyholeIcon,
		panel: SettingsSecurityPage,
	},
	{
		title: "API 密钥",
		key: "apikey",
		icon: KeyRoundIcon,
		panel: ApiKey,
	},
] as const;

export default function SettingsPage() {
	const [tab, setTab] = useQueryState("tab", {
		defaultValue: "profile",
	});

	return (
		<div className="flex flex-1 flex-col">
			<PageHeader title="设置" />
			<div className="p-4">
				<Tabs value={tab} onValueChange={(val) => setTab(val)}>
					<TabsList>
						{settingsTabs.map((tab) => (
							<TabsTab key={tab.key} value={tab.key}>
								{tab.title}
							</TabsTab>
						))}
					</TabsList>
					<TabsPanels>
						{settingsTabs.map((tab) => {
							const Panel = tab.panel;

							return (
								<TabsPanel key={tab.key} value={tab.key}>
									<Panel />
								</TabsPanel>
							);
						})}
					</TabsPanels>
				</Tabs>
			</div>
		</div>
	);
}
