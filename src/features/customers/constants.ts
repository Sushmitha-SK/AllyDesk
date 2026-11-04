export const PLAN_FILTERS = ["all", "Free", "Pro", "Business", "Enterprise"] as const;
export const CUSTOMER_SORTS = ["name", "newest", "tickets"] as const;

export type PlanFilter = (typeof PLAN_FILTERS)[number];
export type CustomerSort = (typeof CUSTOMER_SORTS)[number];

export const PLAN_LABELS: Record<PlanFilter, string> = {
    all: "All plans",
    Free: "Free",
    Pro: "Pro",
    Business: "Business",
    Enterprise: "Enterprise",
};

export const CUSTOMER_SORT_LABELS: Record<CustomerSort, string> = {
    name: "Name (A–Z)",
    newest: "Newest customers",
    tickets: "Most tickets",
};

export const DEFAULT_CUSTOMER_FILTERS = { q: "", plan: "all", sort: "name" } as const;