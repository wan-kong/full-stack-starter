"use client";

export const PageHeader = ({
	title,
	actions,
}: {
	title: string;
	actions?: React.ReactNode;
}) => {
	return (
		<header className="flex flex-col gap-3 border-border/70 border-b bg-background/80 px-4 py-4 backdrop-blur sm:flex-row sm:items-end sm:justify-between sm:px-6">
			<div className="space-y-1">
				<h1 className="font-semibold text-2xl tracking-tight">{title}</h1>
			</div>
			{actions ? (
				<div className="flex items-center gap-2">{actions}</div>
			) : null}
		</header>
	);
};
