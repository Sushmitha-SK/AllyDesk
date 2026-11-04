import Link from "next/link";
import { SearchX, Users } from "lucide-react";

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
            <div className="flex flex-col items-center gap-2 py-16 text-center">
                <Icon className="size-10 text-muted-foreground" aria-hidden />
                <h2 className="font-medium">{filtered ? "No customers match" : "No customers yet"}</h2>
                {filtered && (
                    <Button variant="outline" size="sm" asChild className="mt-2">
                        <Link href="/customers">Clear filters</Link>
                    </Button>
                )}
            </div>
        );
    }

    const qs = serializeCustomerFilters(filters);

    return (
        <div className="space-y-2">
            <p className="text-xs text-muted-foreground" aria-live="polite">
                {total > customers.length
                    ? `Showing ${customers.length} of ${total} customers`
                    : `${total} customer${total === 1 ? "" : "s"}`}
            </p>
            <div className="rounded-lg border">
                <Table>
                    <TableCaption className="sr-only">Customers</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden sm:table-cell">Company</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead className="text-right">Tickets</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.map((c) => (
                            <TableRow key={c.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-8 shrink-0">
                                            {c.avatarUrl && <AvatarImage src={c.avatarUrl} alt="" />}
                                            <AvatarFallback className="text-xs">{getInitials(c.name)}</AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0">
                                            <Link
                                                href={`/customers/${c.id}${qs ? `?${qs}` : ""}`}
                                                className="block truncate font-medium hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                            >
                                                {c.name}
                                            </Link>
                                            <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden text-muted-foreground sm:table-cell">
                                    {c.company ?? "—"}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{c.plan}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {c.ticketCount}
                                    {c.activeCount > 0 && (
                                        <span className="block text-xs text-muted-foreground">{c.activeCount} active</span>
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