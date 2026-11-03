import "server-only";

import { db } from "@/lib/db";

export async function getMessages(ticketId: string) {
    return db.message.findMany({
        where: { ticketId },
        orderBy: { createdAt: "asc" },
        select: {
            id: true,
            authorType: true,
            body: true,
            createdAt: true,
            agent: { select: { name: true, avatarUrl: true } },
        },
    });
}

export type MessageItem = Awaited<ReturnType<typeof getMessages>>[number];