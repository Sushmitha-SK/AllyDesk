import "server-only";
import { db } from "@/lib/db";

type SyncInput = {
    clerkId: string;
    email: string;
    name: string;
    avatarUrl?: string | null;
};

/**
 * Links a Clerk user to an Agent row.
 * 1. Match by clerkId -> refresh profile
 * 2. Match by email   -> adopt the seeded agent by linking its clerkId
 * 3. Otherwise        -> create a new agent
 */
export async function syncAgent({ clerkId, email, name, avatarUrl }: SyncInput) {
    const byClerkId = await db.agent.findUnique({ where: { clerkId } });
    if (byClerkId) {
        return db.agent.update({
            where: { id: byClerkId.id },
            data: { name, avatarUrl: avatarUrl ?? null },
        });
    }

    const byEmail = await db.agent.findUnique({ where: { email } });
    if (byEmail) {
        return db.agent.update({
            where: { id: byEmail.id },
            data: { clerkId, name, avatarUrl: avatarUrl ?? null },
        });
    }

    try {
        return await db.agent.create({
            data: { clerkId, email, name, avatarUrl: avatarUrl ?? null },
        });
    } catch (error) {
        // Two requests can race on first sign-in; the loser just reads the winner's row.
        const existing = await db.agent.findUnique({ where: { clerkId } });
        if (existing) return existing;
        throw error;
    }
}