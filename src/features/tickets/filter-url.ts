import { DEFAULT_FILTERS } from "./constants";
import type { TicketFilters } from "./schemas"; // type-only: Zod is not bundled

/** Query string (no leading "?") containing only non-default values. */
export function serializeFilters(filters: TicketFilters): string {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.status !== DEFAULT_FILTERS.status) params.set("status", filters.status);
    if (filters.priority !== DEFAULT_FILTERS.priority) params.set("priority", filters.priority);
    if (filters.assignee !== DEFAULT_FILTERS.assignee) params.set("assignee", filters.assignee);
    if (filters.sort !== DEFAULT_FILTERS.sort) params.set("sort", filters.sort);
    return params.toString();
}

/** Sort is a preference, not a filter, so it doesn't count. */
export function hasActiveFilters(filters: TicketFilters): boolean {
    return (
        filters.q !== "" ||
        filters.status !== DEFAULT_FILTERS.status ||
        filters.priority !== DEFAULT_FILTERS.priority ||
        filters.assignee !== DEFAULT_FILTERS.assignee
    );
}