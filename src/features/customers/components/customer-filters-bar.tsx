"use client";


import { Loader2, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useOptimistic, useRef, useState, useTransition } from "react";

import { FilterSelect } from "@/features/tickets/components/ticket-filters-bar";
import { Input } from "@/components/ui/input";
import {
    CUSTOMER_SORT_LABELS,
    CUSTOMER_SORTS,
    PLAN_FILTERS,
    PLAN_LABELS,
} from "../constants";
import { serializeCustomerFilters } from "../filter-url";
import type { CustomerFilters } from "../schemas";

export function CustomerFiltersBar({ filters }: { filters: CustomerFilters }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [current, setOptimistic] = useOptimistic(filters);
    const [text, setText] = useState(filters.q);
    const [syncedQ, setSyncedQ] = useState(filters.q);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    // Same back/forward sync as the inbox search box
    if (!isPending && filters.q !== syncedQ) {
        setSyncedQ(filters.q);
        setText(filters.q);
    }

    function push(next: CustomerFilters) {
        const qs = serializeCustomerFilters(next);
        setSyncedQ(next.q);
        startTransition(() => {
            setOptimistic(next);
            router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
        });
    }

    function update(patch: Partial<CustomerFilters>) {
        push({ ...current, ...patch });
    }

    function onSearchChange(value: string) {
        setText(value);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => update({ q: value.trim() }), 300);
    }

    return (
        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_10rem_12rem]">
            <div className="relative">
                <label htmlFor="customer-search" className="sr-only">
                    Search customers
                </label>
                {isPending ? (
                    <Loader2 className="absolute top-2.5 left-2.5 size-4 animate-spin text-muted-foreground" aria-hidden />
                ) : (
                    <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" aria-hidden />
                )}
                <Input
                    id="customer-search"
                    type="search"
                    value={text}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search name, email or company…"
                    autoComplete="off"
                    className="pl-8"
                />
            </div>
            <FilterSelect
                label="Plan"
                value={current.plan}
                options={PLAN_FILTERS}
                labels={PLAN_LABELS}
                onChange={(plan) => update({ plan })}
            />
            <FilterSelect
                label="Sort by"
                value={current.sort}
                options={CUSTOMER_SORTS}
                labels={CUSTOMER_SORT_LABELS}
                onChange={(sort) => update({ sort })}
            />
        </div>
    );
}


