import Link from "next/link";
import { SearchX, Users, ArrowUpRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getInitials } from "@/lib/format";
import { hasActiveCustomerFilters, serializeCustomerFilters } from "../filter-url";
import { getCustomers } from "../queries";
import type { CustomerFilters } from "../schemas";

export async function CustomerResults({ filters }: { filters: CustomerFilters }) {
    const { customers, total } = await getCustomers(filters);

    if (customers.length === 0) {
        const filtered = hasActiveCustomerFilters(filters);
        const Icon = filtered ? SearchX : Users;
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/80 bg-card/50 py-20 text-center shadow-2xs">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Icon className="size-5" aria-hidden />
                </div>
                <div className="space-y-1">
                    <h2 className="font-semibold tracking-tight">{filtered ? "No customers match your filters" : "No customers added yet"}</h2>
                    <p className="text-sm text-muted-foreground">
                        {filtered ? "Try adjusting your search query or filter criteria." : "Get started by adding your first customer."}
                    </p>
                </div>
                {filtered && (
                    <Button variant="outline" size="sm" asChild className="mt-2 shadow-xs">
                        <Link href="/customers">Clear filters</Link>
                    </Button>
                )}
            </div>
        );
    }

    const qs = serializeCustomerFilters(filters);

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider" aria-live="polite">
                    {total > customers.length
                        ? `Showing ${customers.length} of ${total} customers`
                        : `${total} customer${total === 1 ? "" : "s"}`}
                </p>
            </div>

            <div className="overflow-hidden rounded-xl border bg-card shadow-2xs">
                <Table>
                    <TableCaption className="sr-only">Customers list</TableCaption>
                    <TableHeader className="bg-muted/40 py-4">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="font-semibold pl-5">Customer</TableHead>
                            <TableHead className="hidden font-semibold sm:table-cell">Company</TableHead>
                            <TableHead className="font-semibold">Plan</TableHead>
                            <TableHead className="text-right font-semibold">Tickets</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.map((c) => (
                            <TableRow key={c.id} className="group transition-colors hover:bg-muted/50">
                                <TableCell className="py-3.5">
                                    <div className="flex items-center gap-3.5">
                                        <Avatar className="size-9 shrink-0 ring-1 ring-border/50">
                                            {c.avatarUrl && <AvatarImage src={c.avatarUrl} alt="" />}
                                            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                                                {getInitials(c.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0">
                                            <Link
                                                href={`/customers/${c.id}${qs ? `?${qs}` : ""}`}
                                                className="inline-flex items-center gap-1 font-normal text-foreground transition-colors hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                            >
                                                <span className="truncate">{c.name}</span>
                                                <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground" />
                                            </Link>
                                            <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden text-muted-foreground sm:table-cell font-normal">
                                    {c.company ? (
                                        <span className="inline-flex items-center rounded-md bg-muted/60 px-2 py-1 text-xs text-foreground/80 font-normal">
                                            {c.company}
                                        </span>
                                    ) : (
                                        <span className="text-muted-foreground/50">—</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="font-normal px-2.5 py-0.5 capitalize shadow-none">
                                        {c.plan}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="font-semibold text-foreground">{c.ticketCount}</div>
                                    {c.activeCount > 0 ? (
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400">
                                            <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                                            {c.activeCount} active
                                        </span>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">0 active</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

