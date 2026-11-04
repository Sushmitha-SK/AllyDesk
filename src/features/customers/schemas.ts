import { z } from "zod";

import type { SearchParams } from "@/features/tickets/schemas";
import { CUSTOMER_SORTS, DEFAULT_CUSTOMER_FILTERS, PLAN_FILTERS } from "./constants";

export const customerFiltersSchema = z.object({
    q: z.string().trim().max(100).catch(DEFAULT_CUSTOMER_FILTERS.q),
    plan: z.enum(PLAN_FILTERS).catch(DEFAULT_CUSTOMER_FILTERS.plan),
    sort: z.enum(CUSTOMER_SORTS).catch(DEFAULT_CUSTOMER_FILTERS.sort),
});

export type CustomerFilters = z.infer<typeof customerFiltersSchema>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function parseCustomerFilters(raw: SearchParams): CustomerFilters {
    return customerFiltersSchema.parse({
        q: first(raw.q),
        plan: first(raw.plan),
        sort: first(raw.sort),
    });
}

export const updateNotesSchema = z.object({
    customerId: z.string().min(1),
    notes: z.string().trim().max(2000, "Notes are limited to 2,000 characters."),
});

export type UpdateNotesInput = z.input<typeof updateNotesSchema>;