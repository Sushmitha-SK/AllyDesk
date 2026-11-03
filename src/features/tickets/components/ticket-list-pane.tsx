import { Suspense } from "react";

import { serializeFilters } from "../filter-url";
import { parseTicketFilters, type SearchParams } from "../schemas";
import { TicketFiltersBar } from "./ticket-filters-bar";
import { TicketList } from "./ticket-list";
import { TicketListSkeleton } from "./ticket-list-skeleton";

type Props = {
    searchParams: Promise<SearchParams>;
    activeId?: string;
};

export async function TicketListPane({ searchParams, activeId }: Props) {
    const filters = parseTicketFilters(await searchParams);

    return (
        <div>
            <header className="sticky top-0 z-10 space-y-3 border-b bg-background p-3">
                <h1 className="text-base font-semibold tracking-tight">Inbox</h1>
                <TicketFiltersBar filters={filters} />
            </header>

            {/* Keyed by filters: new filters show the skeleton, opening a ticket does not */}
            <Suspense key={serializeFilters(filters)} fallback={<TicketListSkeleton />}>
                <TicketList filters={filters} activeId={activeId} />
            </Suspense>
        </div>
    );
}