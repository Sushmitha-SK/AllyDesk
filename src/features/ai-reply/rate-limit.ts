import "server-only";

import { db } from "@/lib/db";

const WINDOW_MS = 10 * 60_000;
const MAX_DRAFTS = 10;

/** At most 10 drafts per agent per 10 minutes, counted from saved drafts. */
export async function checkDraftRateLimit(agentId: string) {
    const recent = await db.aiDraft.findMany({
        where: { createdById: agentId, createdAt: { gte: new Date(Date.now() - WINDOW_MS) } },
        orderBy: { createdAt: "asc" },
        take: MAX_DRAFTS,
        select: { createdAt: true },
    });

    if (recent.length < MAX_DRAFTS) return { ok: true } as const;

    // A slot frees up when the oldest draft in the window ages out
    const retryAfter = Math.max(
        1,
        Math.ceil((recent[0]!.createdAt.getTime() + WINDOW_MS - Date.now()) / 1000),
    );
    return { ok: false, retryAfter } as const;
}