import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Docs",
	description: "Documentation for Auth Provider",
};

export default function DocsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="prose mx-auto prose-headings:mt-8 min-h-screen max-w-4xl px-6 py-12 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-headings:text-black dark:prose-headings:text-white">
			{children}
		</div>
	);
}
