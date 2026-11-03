import { TicketListPane } from "@/features/tickets/components/ticket-list-pane";
import type { SearchParams } from "@/features/tickets/schemas";

export default function TicketListSlot({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    return <TicketListPane searchParams={searchParams} />;
}