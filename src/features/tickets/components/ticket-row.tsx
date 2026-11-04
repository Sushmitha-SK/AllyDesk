import Link from "next/link";

import { formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { TicketListItem } from "../queries";
import { TicketPriorityBadge } from "./ticket-priority-badge";
import { TicketStatusBadge } from "./ticket-status-badge";

type Props = {
    ticket: TicketListItem;
    href: string;
    active: boolean;
    now: Date;
};

export function TicketRow({ ticket, href, active, now }: Props) {
    const last = ticket.messages[0];
    const preview = last
        ? `${last.authorType === "AGENT" ? "Agent: " : ""}${last.body}`
        : "No messages yet";

    return (
        <Link
            href={href}
            data-ticket-row
            aria-current={active ? "page" : undefined}
            className={cn(
                "block space-y-1.5 px-4 py-3 transition-colors hover:bg-accent/60",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                active && "bg-accent",
            )}
        >
            <div className="flex items-baseline justify-between gap-3">
                <h2 className="truncate text-sm font-medium">{ticket.subject}</h2>
                <time
                    dateTime={ticket.lastMessageAt.toISOString()}
                    className="shrink-0 text-xs text-muted-foreground"
                >
                    {formatRelativeTime(ticket.lastMessageAt, now)}
                </time>
            </div>

            <p className="truncate text-xs text-muted-foreground">
                <span className="font-mono">#{ticket.number}</span> · {ticket.customer.name}
                {ticket.customer.company ? ` · ${ticket.customer.company}` : ""}
            </p>

            <p className="line-clamp-1 text-xs text-muted-foreground">{preview}</p>

            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <TicketStatusBadge status={ticket.status} />
                <TicketPriorityBadge priority={ticket.priority} />
                <span className="ml-auto truncate text-xs text-muted-foreground">
                    {ticket.assignee?.name ?? "Unassigned"}
                </span>
            </div>
        </Link>
    );
}