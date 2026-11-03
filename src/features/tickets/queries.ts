import "server-only";
import type { Prisma } from "@/generated/prisma/client";

import { db } from "@/lib/db";
import type { SortOption } from "./constants";
import type { TicketFilters } from "./schemas";

export const PAGE_SIZE = 50;

// Postgres sorts enums by declaration order (LOW < MEDIUM < HIGH < URGENT)
const ORDER_BY: Record<SortOption, Prisma.TicketOrderByWithRelationInput[]> = {
    latest: [{ lastMessageAt: "desc" }],
    oldest: [{ lastMessageAt: "asc" }],
    priority: [{ priority: "desc" }, { lastMessageAt: "desc" }],
    created: [{ createdAt: "desc" }],
};

function buildWhere(filters: TicketFilters, agentId: string): Prisma.TicketWhereInput {
    const { q, status, priority, assignee } = filters;
    const where: Prisma.TicketWhereInput = {};

    if (status !== "all") where.status = status;
    if (priority !== "all") where.priority = priority;
    if (assignee === "me") where.assigneeId = agentId;
    if (assignee === "unassigned") where.assigneeId = null;

    if (q) {
        const contains = { contains: q, mode: "insensitive" as const };
        const asNumber = /^#?\d+$/.test(q) ? Number(q.replace("#", "")) : null;

        where.OR = [
            { subject: contains },
            { customer: { name: contains } },
            { customer: { email: contains } },
            { customer: { company: contains } },
            { messages: { some: { body: contains } } },
            // "#12" or "12" jumps to ticket number 12 (guard Int32 overflow)
            ...(asNumber !== null && asNumber <= 2_147_483_647 ? [{ number: asNumber }] : []),
        ];
    }

    return where;
}

export async function getTickets(filters: TicketFilters, agentId: string) {
    const where = buildWhere(filters, agentId);

    const [tickets, total] = await Promise.all([
        db.ticket.findMany({
            where,
            orderBy: ORDER_BY[filters.sort],
            take: PAGE_SIZE,
            select: {
                id: true,
                number: true,
                subject: true,
                status: true,
                priority: true,
                lastMessageAt: true,
                customer: { select: { name: true, company: true } },
                assignee: { select: { name: true } },
                messages: {
                    select: { body: true, authorType: true },
                    orderBy: { createdAt: "desc" },
                    take: 1,
                },
            },
        }),
        db.ticket.count({ where }),
    ]);

    return { tickets, total };
}

export type TicketListItem = Awaited<ReturnType<typeof getTickets>>["tickets"][number];