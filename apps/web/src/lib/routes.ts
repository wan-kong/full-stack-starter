import type { Route } from "next";

const route = <T extends string>(value: T) => value as Route<T>;

export const routes = {
	home: route("/"),
	signIn: route("/sign-in"),
	signUp: route("/sign-up"),
	dashboard: route("/dashboard"),
	settings: route("/settings"),
	adminUsers: route("/admin/users"),
	adminOrganizations: route("/admin/organizations"),
};

export const withRedirect = (href: string, redirectTo?: string | null) => {
	if (!redirectTo) {
		return href;
	}

	const params = new URLSearchParams({ redirect: redirectTo });
	return `${href}?${params.toString()}`;
};
