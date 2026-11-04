import "server-only";

import { db } from "@/lib/db";
import type { InitialDraft } from "./types";

const CONTEXT_MESSAGES = 12;

/** Everything the model needs about a ticket. System events are excluded. */
export async function getDraftContext(ticketId: string) {
    const ticket = await db.ticket.findUnique({
        where: { id: ticketId },
        select: {
            subject: true,
            priority: true,
            channel: true,
            customer: { select: { name: true, company: true, plan: true, notes: true } },
            messages: {
                where: { authorType: { not: "SYSTEM" } },
                orderBy: { createdAt: "desc" },
                take: CONTEXT_MESSAGES,
                select: { authorType: true, body: true },
            },
        },
    });
    if (!ticket) return null;

    return { ...ticket, messages: ticket.messages.reverse() }; // oldest first
}

export type DraftContext = NonNullable<Awaited<ReturnType<typeof getDraftContext>>>;

/** The ticket's active (not yet sent or discarded) draft, if any. */
export async function getLatestDraft(ticketId: string): Promise<InitialDraft | null> {
    const draft = await db.aiDraft.findFirst({
        where: { ticketId, status: "GENERATED" },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            body: true,
            sources: {
                orderBy: [{ position: "asc" }, { relevance: "desc" }],
                select: {
                    position: true,
                    snippet: true,
                    relevance: true,
                    article: { select: { id: true, slug: true, title: true } },
                },
            },
        },
    });
    if (!draft) return null;

    return {
        id: draft.id,
        body: draft.body,
        sources: draft.sources.map((s, i) => ({
            articleId: s.article.id,
            slug: s.article.slug,
            title: s.article.title,
            snippet: s.snippet,
            relevance: s.relevance,
            position: s.position || i + 1,
        })),
    };
}