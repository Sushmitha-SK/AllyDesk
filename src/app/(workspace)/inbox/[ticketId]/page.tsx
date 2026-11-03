import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { serializeFilters } from "@/features/tickets/filter-url";
import { parseTicketFilters, type SearchParams } from "@/features/tickets/schemas";

export default async function TicketPage({
    params,
    searchParams,
}: {
    params: Promise<{ ticketId: string }>;
    searchParams: Promise<SearchParams>;
}) {
    const { ticketId } = await params;
    const qs = serializeFilters(parseTicketFilters(await searchParams));

    return (
        <div className="p-4 md:p-6">
            <Button variant="ghost" size="sm" asChild className="mb-4 md:hidden">
                <Link href={qs ? `/inbox?${qs}` : "/inbox"}>
                    <ArrowLeft className="size-4" /> Back to inbox
                </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
                Ticket <code className="font-mono text-foreground">{ticketId}</code>. The conversation arrives in Step 7.
            </p>
        </div>
    );
}