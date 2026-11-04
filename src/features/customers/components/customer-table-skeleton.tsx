import { Skeleton } from "@/components/ui/skeleton";

export function CustomerTableSkeleton() {
    return (
        <div role="status" aria-label="Loading customers" className="divide-y rounded-lg border">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3" aria-hidden>
                    <Skeleton className="size-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-56 max-w-full" />
                    </div>
                    <Skeleton className="h-5 w-14 rounded-full" />
                </div>
            ))}
            <span className="sr-only">Loading customers…</span>
        </div>
    );
}