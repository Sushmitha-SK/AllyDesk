"use client";

import { Loader2, Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useOptimistic, useRef, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ASSIGNEE_FILTERS,
    ASSIGNEE_LABELS,
    DEFAULT_FILTERS,
    PRIORITY_FILTERS,
    PRIORITY_LABELS,
    SORT_LABELS,
    SORT_OPTIONS,
    STATUS_FILTERS,
    STATUS_LABELS,
} from "../constants";
import { hasActiveFilters, serializeFilters } from "../filter-url";
import type { TicketFilters } from "../schemas";

export function FilterSelect<T extends string>({
    label,
    value,
    options,
    labels,
    onChange,
}: {
    label: string;
    value: T;
    options: readonly T[];
    labels: Record<T, string>;
    onChange: (value: T) => void;
}) {
    return (
        <Select value={value} onValueChange={(v) => onChange(v as T)}>
            <SelectTrigger size="sm" className="w-full" aria-label={label}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {labels[option]}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export function TicketFiltersBar({ filters }: { filters: TicketFilters }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [current, setOptimistic] = useOptimistic(filters);
    const [text, setText] = useState(filters.q);
    // The q value the text box currently reflects (typed by the agent or taken from the URL)
    const [syncedQ, setSyncedQ] = useState(filters.q);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    if (!isPending && filters.q !== syncedQ) {
        setSyncedQ(filters.q);
        setText(filters.q);
    }

    function push(next: TicketFilters) {
        const qs = serializeFilters(next);
        setSyncedQ(next.q);
        startTransition(() => {
            setOptimistic(next);
            router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
        });
    }

    function update(patch: Partial<TicketFilters>) {
        push({ ...current, ...patch });
    }

    function onSearchChange(value: string) {
        setText(value);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => update({ q: value.trim() }), 300);
    }

    function clearAll() {
        clearTimeout(timer.current);
        setText("");
        push({ ...DEFAULT_FILTERS, sort: current.sort });
    }

    return (
        <div className="space-y-2">
            <div className="relative">
                <label htmlFor="ticket-search" className="sr-only">
                    Search tickets
                </label>
                {isPending ? (
                    <Loader2
                        className="absolute top-2.5 left-2.5 size-4 animate-spin text-muted-foreground"
                        aria-hidden
                    />
                ) : (
                    <Search
                        className="absolute top-2.5 left-2.5 size-4 text-muted-foreground"
                        aria-hidden
                    />
                )}
                <Input
                    id="ticket-search"
                    type="search"
                    value={text}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search subject, customer or message…"
                    autoComplete="off"
                    className="pl-8"
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <FilterSelect
                    label="Status"
                    value={current.status}
                    options={STATUS_FILTERS}
                    labels={STATUS_LABELS}
                    onChange={(status) => update({ status })}
                />
                <FilterSelect
                    label="Priority"
                    value={current.priority}
                    options={PRIORITY_FILTERS}
                    labels={PRIORITY_LABELS}
                    onChange={(priority) => update({ priority })}
                />
                <FilterSelect
                    label="Assignee"
                    value={current.assignee}
                    options={ASSIGNEE_FILTERS}
                    labels={ASSIGNEE_LABELS}
                    onChange={(assignee) => update({ assignee })}
                />
                <FilterSelect
                    label="Sort by"
                    value={current.sort}
                    options={SORT_OPTIONS}
                    labels={SORT_LABELS}
                    onChange={(sort) => update({ sort })}
                />
            </div>

            {hasActiveFilters(current) && (
                <Button variant="ghost" size="sm" onClick={clearAll} className="-ml-2 h-7 text-xs">
                    <X className="size-3" /> Clear filters
                </Button>
            )}
        </div>
    );
}