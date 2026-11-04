import type { Metadata } from "next";
import { Suspense } from "react";

import { CustomerFiltersBar } from "@/features/customers/components/customer-filters-bar";
import { CustomerResults } from "@/features/customers/components/customer-results";
import { CustomerTableSkeleton } from "@/features/customers/components/customer-table-skeleton";
import { serializeCustomerFilters } from "@/features/customers/filter-url";
import { parseCustomerFilters } from "@/features/customers/schemas";
import type { SearchParams } from "@/features/tickets/schemas";

export const metadata: Metadata = { title: "Customers" };

export default async function CustomersPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const filters = parseCustomerFilters(await searchParams);

    return (
        <div className="mx-auto max-w-5xl space-y-4 p-4 md:p-6">
            <header>
                <h1 className="text-xl font-semibold tracking-tight">Customers</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Everyone who has contacted support, with their ticket history.
                </p>
            </header>

            <CustomerFiltersBar filters={filters} />

            <Suspense key={serializeCustomerFilters(filters)} fallback={<CustomerTableSkeleton />}>
                <CustomerResults filters={filters} />
            </Suspense>
        </div>
    );
}