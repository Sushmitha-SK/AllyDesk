import { z } from "zod";

import {
    ASSIGNEE_FILTERS,
    DEFAULT_FILTERS,
    PRIORITY_FILTERS,
    SORT_OPTIONS,
    STATUS_FILTERS,
} from "./constants";

export const ticketFiltersSchema = z.object({
    q: z.string().trim().max(100).catch(DEFAULT_FILTERS.q),
    status: z.enum(STATUS_FILTERS).catch(DEFAULT_FILTERS.status),
    priority: z.enum(PRIORITY_FILTERS).catch(DEFAULT_FILTERS.priority),
    assignee: z.enum(ASSIGNEE_FILTERS).catch(DEFAULT_FILTERS.assignee),
    sort: z.enum(SORT_OPTIONS).catch(DEFAULT_FILTERS.sort),
});

export type TicketFilters = z.infer<typeof ticketFiltersSchema>;
export type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

/** Never throws: invalid or missing params fall back to defaults. */
export function parseTicketFilters(raw: SearchParams): TicketFilters {
    return ticketFiltersSchema.parse({
        q: first(raw.q),
        status: first(raw.status),
        priority: first(raw.priority),
        assignee: first(raw.assignee),
        sort: first(raw.sort),
    });
}