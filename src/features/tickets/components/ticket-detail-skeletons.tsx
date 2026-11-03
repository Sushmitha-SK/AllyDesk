import { Skeleton } from "@/components/ui/skeleton";

export function TicketHeaderSkeleton() {
    return (
        <div className="shrink-0 space-y-3 border-b px-4 py-3 md:px-6">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
            <div className="flex gap-1.5">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
            </div>
        </div>
    );
}

export function MessageThreadSkeleton() {
    return (
        <div role="status" aria-label="Loading conversation" className="space-y-5">
            {[false, true, false].map((fromAgent, i) => (
                <div key={i} className={`flex gap-3 ${fromAgent ? "flex-row-reverse" : ""}`}>
                    <Skeleton className="size-8 shrink-0 rounded-full" />
                    <div className="w-3/4 space-y-2">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                </div>
            ))}
            <span className="sr-only">Loading conversation…</span>
        </div>
    );
}

export function CustomerPanelSkeleton() {
    return (
        <div className="space-y-4 p-4" aria-hidden>
            <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-14" />
                </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-20 w-full" />
        </div>
    );
}