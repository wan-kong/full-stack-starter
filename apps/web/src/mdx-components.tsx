import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
	children: ReactNode;
	className?: string;
}

async function CodeBlock({ children, className }: CodeBlockProps) {
	const lang = className?.replace("language-", "") as BundledLanguage;
	const code = String(children).replace(/\n$/, "");

	if (!lang) {
		return (
			<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
				{children}
			</code>
		);
	}

	const html = await codeToHtml(code, {
		lang,
		themes: {
			light: "github-light",
			dark: "github-dark",
		},
	});

	return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function useMDXComponents(): MDXComponents {
	return {
		pre: ({ children }) => (
			<pre className="overflow-x-auto rounded-lg border bg-muted/50 px-4 py-3 text-sm leading-relaxed">
				{children}
			</pre>
		),
		code: CodeBlock,
	};
}
