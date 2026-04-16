import { Skeleton } from "@auth-provider/ui/components/skeleton";

export default function DashboardLoading() {
	return (
		<div className="flex min-h-screen flex-col">
			<div className="border-border/70 border-b px-6 py-5">
				<Skeleton className="mb-3 h-4 w-40" />
				<Skeleton className="h-9 w-72" />
			</div>
			<div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<Skeleton key={index} className="h-36 rounded-none" />
				))}
			</div>
		</div>
	);
}
