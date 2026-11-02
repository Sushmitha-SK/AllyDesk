import { Skeleton } from "@/components/ui/skeleton";

export function TicketListPlaceholder() {
    return (
        <div>
            <div className="flex h-14 items-center border-b px-4">
                <h1 className="font-semibold tracking-tight">Inbox</h1>
            </div>
            <ul className="divide-y">
                {Array.from({ length: 8 }).map((_, i) => (
                    <li key={i} className="space-y-2 p-4">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-full" />
                    </li>
                ))}
            </ul>
        </div>
    );
}