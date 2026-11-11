import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { syncAgent } from "@/lib/agents";

/**
 * The signed-in support agent. Wrapped in cache() so layouts, pages and
 * actions in one request share a single lookup.
 */
export const getCurrentAgent = cache(async () => {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    // Fast path: no Clerk API call once the agent is linked
    const existing = await db.agent.findUnique({ where: { clerkId: userId } });
    if (existing) return existing;

    const user = await currentUser();
    const email =
        user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses[0]?.emailAddress;
    if (!user || !email) redirect("/sign-in");

    return syncAgent({
        clerkId: userId,
        email,
        name: [user.firstName, user.lastName].filter(Boolean).join(" ") || email.split("@")[0]!,
        avatarUrl: user.imageUrl,
        signature: "",
        pendingAfterReply: false,
        aiDraftsEnabled: false
    });
});