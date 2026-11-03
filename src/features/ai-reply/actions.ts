"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import type { ActionResult } from "@/lib/action-result";
import { getCurrentAgent } from "@/lib/auth";
import { db } from "@/lib/db";

export async function discardDraftAction(draftId: string): Promise<ActionResult> {
    await getCurrentAgent();

    const parsed = z.string().min(1).safeParse(draftId);
    if (!parsed.success) return { ok: false, error: "Invalid draft." };

    try {
        await db.aiDraft.updateMany({
            where: { id: parsed.data, status: "GENERATED" },
            data: { status: "DISCARDED" },
        });
    } catch (error) {
        console.error("discardDraftAction failed", error);
        return { ok: false, error: "Couldn't discard the draft." };
    }

    revalidatePath("/inbox", "layout");
    return { ok: true };
}