import { env } from "@auth-provider/env/server";
import { render } from "emailmd";

interface EmailOptions {
	baseUrl?: string;
	brandColor?: string;
	name?: string;
	siteName?: string;
	subject?: string;
	to: string;
	url?: string;
}

const DEFAULT_INFO: Omit<EmailOptions, "to" | "url"> = {
	siteName: "Auth Provider",
	baseUrl: env.BETTER_AUTH_URL || "http://localhost:3000",
	brandColor: "#2563eb",
};

interface RenderedEmail {
	html: string;
	meta: Record<string, unknown>;
	text: string;
}

const mergeConfig = <T extends Partial<EmailOptions>>(options: T): T => {
	return { ...DEFAULT_INFO, ...options };
};

function renderEmail(markdown: string, brandColor?: string): RenderedEmail {
	return render(markdown, {
		theme: {
			brandColor: brandColor || DEFAULT_INFO.brandColor,
		},
	});
}

/**
 * Send verification email when user signs up
 */
export function sendVerificationEmail(
	options: Omit<EmailOptions, "url"> & {
		url: string;
	}
): string {
	const { to, name, url, brandColor, siteName, baseUrl } = mergeConfig(options);
	const displayName = name || to.split("@")[0];

	const markdown = `---
preheader: "验证您的邮箱地址"
brand_color: "${brandColor}"
---

# 验证您的邮箱

你好 **${displayName}**,

感谢您注册 ${siteName}！请点击下方按钮验证您的邮箱地址。

[验证邮箱](${url}){button}

此链接将在 24 小时后过期。如果您没有注册账户，请忽略此邮件。

::: footer
**${siteName}** · [访问网站](${baseUrl || "https://axure.wankong.top"})
:::
`;

	return renderEmail(markdown).html;
}

/**
 * Send magic link for passwordless login
 */
export function sendMagicLinkEmail(options: EmailOptions): string {
	const { to, name, url, brandColor, siteName, baseUrl } = mergeConfig(options);
	const displayName = name || to.split("@")[0];

	const markdown = `---
preheader: "您的登录链接"
brand_color: "${brandColor}"
---

# 登录链接

你好 **${displayName}**,

点击下方按钮即可登录您的 ${siteName} 账户。

[立即登录](${url}){button}

此链接将在 15 分钟后过期。如果您没有请求此链接，请忽略此邮件。

::: footer
**${siteName}** · [访问网站](${baseUrl || "https://axure.wankong.top"})
:::
`;

	return renderEmail(markdown).html;
}

/**
 * Send password reset email
 */
export function sendPasswordResetEmail(options: EmailOptions): string {
	const { to, name, url, brandColor, siteName, baseUrl } = mergeConfig(options);
	const displayName = name || to.split("@")[0];

	const markdown = `---
preheader: "重置您的密码"
brand_color: "${brandColor}"
---

# 重置密码

你好 **${displayName}**,

我们收到了重置您 ${siteName} 账户密码的请求。点击下方按钮设置新密码。

[重置密码](${url}){button}

此链接将在 1 小时后过期。如果您没有请求重置密码，请忽略此邮件，您的密码将保持不变。

::: footer
**${siteName}** · [访问网站](${baseUrl || "https://axure.wankong.top"})
:::
`;

	return renderEmail(markdown).html;
}

/**
 * Send welcome email after email verification
 */
export function sendWelcomeEmail(options: EmailOptions): string {
	const { to, name, brandColor, siteName, baseUrl } = mergeConfig(options);
	const displayName = name || to.split("@")[0];

	const markdown = `---
preheader: "欢迎加入 ${siteName}"
brand_color: "${brandColor}"
---

# 欢迎加入 ${siteName}！

你好 **${displayName}**,

您的邮箱已验证成功，欢迎加入 ${siteName}！

现在您可以：

- **管理原型项目** - 上传和管理您的 Axure 原型
- **团队协作** - 邀请团队成员共同协作
- **版本管理** - 追踪原型版本变更

[开始使用](${baseUrl || "https://axure.wankong.top"}/dashboard){button}

如有任何问题，请随时联系我们的支持团队。

::: footer
**${siteName}** · [访问网站](${baseUrl || "https://axure.wankong.top"})
:::
`;

	return renderEmail(markdown).html;
}

/**
 * Send organization invitation email
 */
export function sendOrganizationInviteEmail(
	options: EmailOptions & {
		organizationName: string;
		inviterName: string;
	}
): string {
	const {
		to,
		name,
		url,
		organizationName,
		inviterName,
		brandColor,
		siteName,
		baseUrl,
	} = mergeConfig(options);
	const displayName = name || to.split("@")[0];

	const markdown = `---
preheader: "您收到了组织邀请"
brand_color: "${brandColor}"
---

# 组织邀请

你好 **${displayName}**,

**${inviterName}** 邀请您加入组织 **${organizationName}**。

[接受邀请](${url}){button}

此邀请将在 7 天后过期。如果您不接受此邀请，可以忽略此邮件。

::: footer
**${siteName}** · [访问网站](${baseUrl || "https://axure.wankong.top"})
:::
`;

	return renderEmail(markdown).html;
}

/**
 * Send email change notification
 */
export function sendEmailChangeNotification(options: EmailOptions): string {
	const { to, name, url, brandColor, siteName, baseUrl } = mergeConfig(options);
	const displayName = name || to.split("@")[0];

	const markdown = `---
preheader: "确认更改邮箱"
brand_color: "${brandColor}"
---

# 更改邮箱地址

你好 **${displayName}**,

我们收到了更改您账户邮箱地址的请求。点击下方按钮确认更改。

[确认更改](${url}){button}

如果您没有请求此更改，请立即保护您的账户并联系我们的支持团队。

::: footer
**${siteName}** · [访问网站](${baseUrl || "https://axure.wankong.top"})
:::
`;

	return renderEmail(markdown).html;
}

/**
 * Send account deletion confirmation email
 */
export function sendAccountDeletionEmail(options: EmailOptions): string {
	const { to, name, url, siteName, baseUrl } = mergeConfig(options);
	const displayName = name || to.split("@")[0];

	const markdown = `---
preheader: "确认删除账户"
brand_color: "#dc2626"
---

# 删除账户

你好 **${displayName}**,

我们收到了删除您 ${siteName} 账户的请求。此操作不可逆，所有数据将被永久删除。

[确认删除](${url}){button danger}

如果您没有请求删除账户，请忽略此邮件。

::: footer
**${siteName}** · [访问网站](${baseUrl || "https://axure.wankong.top"})
:::
`;

	return renderEmail(markdown, "#dc2626").html;
}

/**
 * Send two-factor authentication setup email
 */
export function sendTwoFactorSetupEmail(options: EmailOptions): string {
	const { to, name, siteName, baseUrl } = mergeConfig(options);
	const displayName = name || to.split("@")[0];

	const markdown = `---
preheader: "两步验证已启用"
brand_color: "#16a34a"
---

# 两步验证已启用

你好 **${displayName}**,

您的账户已成功启用两步验证。从现在起，登录时您需要输入验证器应用生成的代码。

如果这不是您本人的操作，请立即更改密码并联系我们的支持团队。

[管理账户安全](${baseUrl || "https://axure.wankong.top"}/settings/security){button}

::: footer
**${siteName}** · [访问网站](${baseUrl || "https://axure.wankong.top"})
:::
`;

	return renderEmail(markdown, "#16a34a").html;
}

/**
 * Send security alert email
 */
export function sendSecurityAlertEmail(
	options: EmailOptions & {
		alertType: string;
		details?: string;
	}
): string {
	const { to, name, alertType, details, siteName, baseUrl } =
		mergeConfig(options);
	const displayName = name || to.split("@")[0];

	const markdown = `---
preheader: "安全提醒"
brand_color: "#f59e0b"
---

# 安全提醒

你好 **${displayName}**,

我们检测到您的账户发生了以下安全事件：

**${alertType}**

${details ? details : ""}

如果这是您本人的操作，可以忽略此邮件。如果不是，请立即保护您的账户。

[检查账户活动](${baseUrl || "https://axure.wankong.top"}/settings/security){button}

::: footer
**${siteName}** · [访问网站](${baseUrl || "https://axure.wankong.top"})
:::
`;

	return renderEmail(markdown, "#f59e0b").html;
}
