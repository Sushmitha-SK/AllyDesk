import { Skeleton } from "@/components/ui/skeleton";

export function TicketListSkeleton() {
    return (
        <div role="status" aria-label="Loading tickets">
            <ul className="divide-y border-t" aria-hidden>
                {Array.from({ length: 8 }).map((_, i) => (
                    <li key={i} className="space-y-2 px-4 py-3">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-3 w-full" />
                        <div className="flex gap-1.5">
                            <Skeleton className="h-5 w-14 rounded-full" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                    </li>
                ))}
            </ul>
            <span className="sr-only">Loading tickets…</span>
        </div>
    );
}