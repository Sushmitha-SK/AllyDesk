import { TicketListPane } from "@/features/tickets/components/ticket-list-pane";
import type { SearchParams } from "@/features/tickets/schemas";

export default async function TicketListSlot({
    params,
    searchParams,
}: {
    params: Promise<{ ticketId: string }>;
    searchParams: Promise<SearchParams>;
}) {
    const { ticketId } = await params;
    return <TicketListPane searchParams={searchParams} activeId={ticketId} />;
}