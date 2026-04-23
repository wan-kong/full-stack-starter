import Link from "next/link";

export default function DocsPage() {
	return (
		<div className="space-y-6">
			<h1 className="font-bold text-3xl">Documentation</h1>
			<p className="text-muted-foreground">
				Welcome to the FullStackStarter documentation. Choose a topic below to
				get started.
			</p>
			<div className="grid gap-4 sm:grid-cols-2">
				<Link
					href="/docs/getting-started"
					className="rounded-lg border p-6 transition-colors hover:bg-muted"
				>
					<h2 className="font-semibold text-xl">Getting Started</h2>
					<p className="mt-2 text-muted-foreground text-sm">
						Set up your project and make your first API call.
					</p>
				</Link>
				<Link
					href="/docs/api-reference"
					className="rounded-lg border p-6 transition-colors hover:bg-muted"
				>
					<h2 className="font-semibold text-xl">API Reference</h2>
					<p className="mt-2 text-muted-foreground text-sm">
						Explore the full API endpoints and authentication methods.
					</p>
				</Link>
			</div>
		</div>
	);
}
