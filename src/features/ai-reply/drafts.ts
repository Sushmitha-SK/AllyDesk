import "server-only";

import { db } from "@/lib/db";
import type { RetrievedArticle } from "./retrieval";

/** Saves a finished draft and supersedes any older active draft on the ticket. */
export async function saveDraft({
    ticketId,
    agentId,
    body,
    model,
    articles,
}: {
    ticketId: string;
    agentId: string;
    body: string;
    model: string;
    articles: RetrievedArticle[];
}) {
    const [, draft] = await db.$transaction([
        db.aiDraft.updateMany({
            where: { ticketId, status: "GENERATED" },
            data: { status: "DISCARDED" },
        }),
        db.aiDraft.create({
            data: {
                ticketId,
                createdById: agentId,
                body,
                model,
                sources: {
                    create: articles.map((a, i) => ({
                        articleId: a.articleId,
                        snippet: a.snippet,
                        relevance: a.relevance,
                        position: i + 1,
                    })),
                },
            },
            select: { id: true },
        }),
    ]);
    return draft;
}