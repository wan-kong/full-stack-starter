import type { Metadata } from "next";

import { SignInForm } from "@/components/forms/sign-in-form";

export const metadata: Metadata = {
	title: "登录",
};

export default function SignInPage() {
	return <SignInForm />;
}
