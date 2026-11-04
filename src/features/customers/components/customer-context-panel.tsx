import Link from "next/link";
import { Building2, CalendarDays, Mail } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TicketStatusBadge } from "@/features/tickets/components/ticket-status-badge";
import { formatDateTime, formatRelativeTime, getInitials } from "@/lib/format";
import { getCustomerContext } from "../queries";
import { LocalTime } from "@/components/layout/ui-helpers/local-time";

type Props = {
    customerId: string;
    currentTicketId: string;
    queryString: string; // keeps inbox filters when jumping between a customer's tickets
};

export async function CustomerContextPanel({ customerId, currentTicketId, queryString }: Props) {
    const context = await getCustomerContext(customerId, currentTicketId);
    if (!context) return <p className="p-4 text-sm text-muted-foreground">Customer not found.</p>;

    const { customer, totalTickets, activeTickets, recentTickets } = context;
    const now = new Date();

    return (
        <div className="space-y-5 p-4">
            <div className="flex items-center gap-3">
                <Avatar className="size-10">
                    {customer.avatarUrl && <AvatarImage src={customer.avatarUrl} alt="" />}
                    <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold">{customer.name}</h2>
                    <Badge variant="secondary" className="mt-1">
                        {customer.plan}
                    </Badge>
                </div>
            </div>

            <dl className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <dt className="sr-only">Email</dt>
                    <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    <dd className="truncate">{customer.email}</dd>
                </div>
                {customer.company && (
                    <div className="flex items-center gap-2">
                        <dt className="sr-only">Company</dt>
                        <Building2 className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                        <dd className="truncate">{customer.company}</dd>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <dt className="sr-only">Customer since</dt>
                    <CalendarDays className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    <dd>
                        Since <LocalTime date={customer.createdAt} variant="date" />
                    </dd>
                </div>
            </dl>

            <p className="text-xs text-muted-foreground">
                {totalTickets} ticket{totalTickets === 1 ? "" : "s"} total · {activeTickets} active
            </p>

            {customer.notes && (
                <section aria-labelledby="customer-notes">
                    <h3 id="customer-notes" className="mb-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Notes
                    </h3>
                    <p className="rounded-md bg-muted p-3 text-sm whitespace-pre-wrap">{customer.notes}</p>
                </section>
            )}

            {recentTickets.length > 0 && (
                <section aria-labelledby="customer-history">
                    <h3 id="customer-history" className="mb-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Other tickets
                    </h3>
                    <ul className="-mx-2 space-y-0.5">
                        {recentTickets.map((t) => (
                            <li key={t.id}>
                                <Link
                                    href={`/inbox/${t.id}${queryString ? `?${queryString}` : ""}`}
                                    className="block space-y-1 rounded-md px-2 py-1.5 transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                >
                                    <span className="line-clamp-1 text-sm">{t.subject}</span>
                                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="font-mono">#{t.number}</span>
                                        <TicketStatusBadge status={t.status} className="px-1.5 py-0 text-[10px]" />
                                        <span className="ml-auto">{formatRelativeTime(t.lastMessageAt, now)}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}