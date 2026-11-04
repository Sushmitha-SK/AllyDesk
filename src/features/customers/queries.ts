import "server-only";

import { db } from "@/lib/db";
import { cache } from "react";
import { CustomerSort } from "./constants";
import { Prisma } from "@/generated/prisma/client";
import { CustomerFilters } from "./schemas";

export async function getCustomerContext(customerId: string, currentTicketId: string) {
    const [customer, totalTickets, activeTickets, recentTickets] = await Promise.all([
        db.customer.findUnique({
            where: { id: customerId },
            select: {
                name: true,
                email: true,
                company: true,
                plan: true,
                notes: true,
                avatarUrl: true,
                createdAt: true,
            },
        }),
        db.ticket.count({ where: { customerId } }),
        db.ticket.count({ where: { customerId, status: { in: ["OPEN", "PENDING"] } } }),
        db.ticket.findMany({
            where: { customerId, id: { not: currentTicketId } },
            orderBy: { lastMessageAt: "desc" },
            take: 5,
            select: { id: true, number: true, subject: true, status: true, lastMessageAt: true },
        }),
    ]);

    if (!customer) return null;
    return { customer, totalTickets, activeTickets, recentTickets };
}

const CUSTOMER_PAGE_SIZE = 50;

const ORDER_BY: Record<CustomerSort, Prisma.CustomerOrderByWithRelationInput> = {
    name: { name: "asc" },
    newest: { createdAt: "desc" },
    tickets: { tickets: { _count: "desc" } },
};

export async function getCustomers(filters: CustomerFilters) {
    const where: Prisma.CustomerWhereInput = {};
    if (filters.plan !== "all") where.plan = filters.plan;
    if (filters.q) {
        const contains = { contains: filters.q, mode: "insensitive" as const };
        where.OR = [{ name: contains }, { email: contains }, { company: contains }];
    }

    const [rows, total] = await Promise.all([
        db.customer.findMany({
            where,
            orderBy: [ORDER_BY[filters.sort], { name: "asc" }],
            take: CUSTOMER_PAGE_SIZE,
            select: {
                id: true,
                name: true,
                email: true,
                company: true,
                plan: true,
                avatarUrl: true,
                _count: { select: { tickets: true } },
            },
        }),
        db.customer.count({ where }),
    ]);

    const activeCounts = await db.ticket.groupBy({
        by: ["customerId"],
        where: { customerId: { in: rows.map((c) => c.id) }, status: { in: ["OPEN", "PENDING"] } },
        _count: { _all: true },
    });
    const active = new Map(activeCounts.map((r) => [r.customerId, r._count._all]));

    const customers = rows.map(({ _count, ...c }) => ({
        ...c,
        ticketCount: _count.tickets,
        activeCount: active.get(c.id) ?? 0,
    }));

    return { customers, total };
}

export type CustomerListItem = Awaited<ReturnType<typeof getCustomers>>["customers"][number];

export const getCustomerDetail = cache(async (id: string) => {
    return db.customer.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            company: true,
            plan: true,
            notes: true,
            avatarUrl: true,
            createdAt: true,
            tickets: {
                orderBy: { lastMessageAt: "desc" },
                take: 50,
                select: { id: true, number: true, subject: true, status: true, priority: true, lastMessageAt: true },
            },
        },
    });
});