import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, CalendarDays, Mail } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomerNotesForm } from "@/features/customers/components/customer-notes-form";
import { serializeCustomerFilters } from "@/features/customers/filter-url";
import { getCustomerDetail } from "@/features/customers/queries";
import { parseCustomerFilters } from "@/features/customers/schemas";
import { TicketPriorityBadge } from "@/features/tickets/components/ticket-priority-badge";
import { TicketStatusBadge } from "@/features/tickets/components/ticket-status-badge";
import type { SearchParams } from "@/features/tickets/schemas";
import { formatRelativeTime, getInitials } from "@/lib/format";
import { LocalTime } from "@/components/layout/ui-helpers/local-time";

type Props = {
    params: Promise<{ customerId: string }>;
    searchParams: Promise<SearchParams>;
};

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
    const { customerId } = await params;
    const customer = await getCustomerDetail(customerId); // deduped with the page via cache()
    return { title: customer?.name ?? "Customer not found" };
}

export default async function CustomerPage({ params, searchParams }: Props) {
    const { customerId } = await params;
    const customer = await getCustomerDetail(customerId);
    if (!customer) notFound();

    const qs = serializeCustomerFilters(parseCustomerFilters(await searchParams));
    const now = new Date();

    return (
        <div className="mx-auto max-w-8xl space-y-6 p-4 md:p-6">
            <Button variant="ghost" size="sm" asChild className="-ml-2">
                <Link href={qs ? `/customers?${qs}` : "/customers"}>
                    <ArrowLeft className="size-4" aria-hidden /> All customers
                </Link>
            </Button>

            <header className="flex items-center gap-4">
                <Avatar className="size-14">
                    {customer.avatarUrl && <AvatarImage src={customer.avatarUrl} alt="" />}
                    <AvatarFallback className="text-lg">{getInitials(customer.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-xl font-semibold tracking-tight">{customer.name}</h1>
                        <Badge variant="secondary">{customer.plan}</Badge>
                    </div>
                    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                            <Mail className="size-4" aria-hidden /> {customer.email}
                        </span>
                        {customer.company && (
                            <span className="inline-flex items-center gap-1.5">
                                <Building2 className="size-4" aria-hidden /> {customer.company}
                            </span>
                        )}
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="size-4" aria-hidden /> Since{" "}
                            <LocalTime date={customer.createdAt} variant="date" />
                        </span>
                    </p>
                </div>
            </header>

            <section aria-labelledby="notes-heading" className="space-y-2">
                <h2 id="notes-heading" className="text-sm font-medium">
                    Notes
                </h2>
                <CustomerNotesForm key={customer.id} customerId={customer.id} initialNotes={customer.notes} />
            </section>

            <section aria-labelledby="tickets-heading" className="space-y-2">
                <h2 id="tickets-heading" className="text-sm font-medium">
                    Tickets ({customer.tickets.length})
                </h2>
                {customer.tickets.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No tickets yet.</p>
                ) : (
                    <ul className="divide-y rounded-lg border">
                        {customer.tickets.map((t) => (
                            <li key={t.id}>
                                <Link
                                    href={`/inbox/${t.id}`}
                                    className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 transition-colors hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring focus-visible:outline-none"
                                >
                                    <span className="font-mono text-xs text-muted-foreground">#{t.number}</span>
                                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{t.subject}</span>
                                    <TicketStatusBadge status={t.status} />
                                    <TicketPriorityBadge priority={t.priority} />
                                    <span className="text-xs text-muted-foreground">
                                        {formatRelativeTime(t.lastMessageAt, now)}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}