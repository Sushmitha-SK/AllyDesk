import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { MessageThread } from "@/features/conversation/components/message-thread";
import { CustomerContextPanel } from "@/features/customers/components/customer-context-panel";
import { serializeFilters } from "@/features/tickets/filter-url";
import { TicketHeader } from "@/features/tickets/components/ticket-header";
import {
    CustomerPanelSkeleton,
    MessageThreadSkeleton,
} from "@/features/tickets/components/ticket-detail-skeletons";
import { getTicketById } from "@/features/tickets/queries";
import { parseTicketFilters, type SearchParams } from "@/features/tickets/schemas";

type Props = {
    params: Promise<{ ticketId: string }>;
    searchParams: Promise<SearchParams>;
};

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
    const { ticketId } = await params;
    const ticket = await getTicketById(ticketId); // deduped with the page via cache()
    return { title: ticket ? `#${ticket.number} ${ticket.subject}` : "Ticket not found" };
}

export default async function TicketPage({ params, searchParams }: Props) {
    const { ticketId } = await params;
    const ticket = await getTicketById(ticketId);
    if (!ticket) notFound();

    const qs = serializeFilters(parseTicketFilters(await searchParams));
    const backHref = qs ? `/inbox?${qs}` : "/inbox";

    return (
        <div className="flex h-full min-h-0 flex-col">
            <TicketHeader ticket={ticket} backHref={backHref} />

            {/* Mobile: one scroll area. Desktop: two independently scrolling columns. */}
            <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden">
                <section aria-label="Conversation" className="flex min-h-0 flex-col lg:overflow-hidden">
                    <div className="flex-1 p-4 md:p-6 lg:overflow-y-auto">
                        <Suspense fallback={<MessageThreadSkeleton />}>
                            {/* <MessageThread ticketId={ticket.id} customerName={ticketCustomerName(ticket)} /> */}
                            <MessageThread ticketId={ticket.id} customerName={ticket.customer.name} />
                        </Suspense>
                    </div>

                    {/* Step 8: reply composer. Step 9: AI draft panel above it. */}
                    <div className="sticky bottom-0 shrink-0 border-t bg-background p-3 text-center text-xs text-muted-foreground lg:static">
                        The reply composer and AI drafts arrive in Steps 8 and 9.
                    </div>
                </section>

                <aside
                    aria-label="Customer details"
                    className="border-t bg-muted/20 lg:overflow-y-auto lg:border-t-0 lg:border-l"
                >
                    <Suspense fallback={<CustomerPanelSkeleton />}>
                        <CustomerContextPanel
                            customerId={ticket.customerId}
                            currentTicketId={ticket.id}
                            queryString={qs}
                        />
                    </Suspense>
                </aside>
            </div>
        </div>
    );
}