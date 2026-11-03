import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ReplyComposer } from "@/features/conversation/components/reply-composer";
import { MessageThread } from "@/features/conversation/components/message-thread";
import { CustomerContextPanel } from "@/features/customers/components/customer-context-panel";
import { serializeFilters } from "@/features/tickets/filter-url";
import { TicketHeader } from "@/features/tickets/components/ticket-header";
import {
    CustomerPanelSkeleton,
    MessageThreadSkeleton,
} from "@/features/tickets/components/ticket-detail-skeletons";
import { getAssignableAgents, getTicketById } from "@/features/tickets/queries";
import { parseTicketFilters, type SearchParams } from "@/features/tickets/schemas";
import { getCurrentAgent } from "@/lib/auth";

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

    const [agent, ticket, agents] = await Promise.all([
        getCurrentAgent(),
        getTicketById(ticketId),
        getAssignableAgents(),
    ]);
    if (!ticket) notFound();

    const qs = serializeFilters(parseTicketFilters(await searchParams));
    const backHref = qs ? `/inbox?${qs}` : "/inbox";

    return (
        <div className="flex h-full min-h-0 flex-col">
            <TicketHeader
                ticket={ticket}
                backHref={backHref}
                agents={agents}
                currentAgentId={agent.id}
            />

            {/* Mobile: one scroll area. Desktop: two independently scrolling columns. */}
            <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden">
                <section aria-label="Conversation" className="flex min-h-0 flex-col lg:overflow-hidden">
                    <div className="flex-1 p-4 md:p-6 lg:overflow-y-auto">
                        <Suspense fallback={<MessageThreadSkeleton />}>
                            <MessageThread ticketId={ticket.id} customerName={ticket.customer.name} />
                        </Suspense>
                    </div>

                    <div className="sticky bottom-0 shrink-0 border-t bg-background p-3 lg:static">
                        {/* Step 9: the AI draft panel renders here, above the composer */}
                        <ReplyComposer key={ticket.id} ticketId={ticket.id} />
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