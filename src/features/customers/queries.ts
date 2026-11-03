import "server-only";

import { db } from "@/lib/db";

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