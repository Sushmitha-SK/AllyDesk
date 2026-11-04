import { DEFAULT_CUSTOMER_FILTERS } from "./constants";
import type { CustomerFilters } from "./schemas"; // type-only: Zod stays out of the client bundle

export function serializeCustomerFilters(f: CustomerFilters): string {
    const params = new URLSearchParams();
    if (f.q) params.set("q", f.q);
    if (f.plan !== DEFAULT_CUSTOMER_FILTERS.plan) params.set("plan", f.plan);
    if (f.sort !== DEFAULT_CUSTOMER_FILTERS.sort) params.set("sort", f.sort);
    return params.toString();
}

export function hasActiveCustomerFilters(f: CustomerFilters): boolean {
    return f.q !== "" || f.plan !== DEFAULT_CUSTOMER_FILTERS.plan;
}