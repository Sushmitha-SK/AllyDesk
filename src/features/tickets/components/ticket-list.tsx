import Link from "next/link";
import { Inbox, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCurrentAgent } from "@/lib/auth";
import { hasActiveFilters, serializeFilters } from "../filter-url";
import { getTickets } from "../queries";
import type { TicketFilters } from "../schemas";
import { TicketRow } from "./ticket-row";

type Props = { filters: TicketFilters; activeId?: string };

export async function TicketList({ filters, activeId }: Props) {
    const agent = await getCurrentAgent(); // cached per request
    const { tickets, total } = await getTickets(filters, agent.id);

    if (tickets.length === 0) {
        const filtered = hasActiveFilters(filters);
        const Icon = filtered ? SearchX : Inbox;

        return (
            <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
                <Icon className="size-10 text-muted-foreground" />
                <h2 className="font-medium">{filtered ? "No tickets match" : "Inbox zero"}</h2>
                <p className="text-sm text-muted-foreground">
                    {filtered
                        ? "Try a different search or clear your filters."
                        : "New tickets will show up here."}
                </p>
                {filtered && (
                    <Button variant="outline" size="sm" asChild className="mt-2">
                        <Link href={activeId ? `/inbox/${activeId}` : "/inbox"}>Clear filters</Link>
                    </Button>
                )}
            </div>
        );
    }

    const qs = serializeFilters(filters);
    const now = new Date();

    return (
        <>
            <p className="px-4 py-2 text-xs text-muted-foreground" aria-live="polite">
                {total > tickets.length
                    ? `Showing ${tickets.length} of ${total} tickets`
                    : `${total} ticket${total === 1 ? "" : "s"}`}
            </p>
            <ul className="divide-y border-t">
                {tickets.map((ticket) => (
                    <li key={ticket.id}>
                        <TicketRow
                            ticket={ticket}
                            href={`/inbox/${ticket.id}${qs ? `?${qs}` : ""}`}
                            active={ticket.id === activeId}
                            now={now}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}