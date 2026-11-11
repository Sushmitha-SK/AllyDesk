import "server-only";

import { db } from "@/lib/db";

export async function getTeam() {
    return db.agent.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true, email: true, role: true, avatarUrl: true },
    });
}

export type TeamMember = Awaited<ReturnType<typeof getTeam>>[number];