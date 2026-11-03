"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/lib/action-result";
import { getCurrentAgent } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendReplySchema, type SendReplyInput } from "./schemas";

export async function sendReplyAction(input: SendReplyInput): Promise<ActionResult> {
    const agent = await getCurrentAgent();

    const parsed = sendReplySchema.safeParse(input);
    if (!parsed.success) {
        return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid reply." };
    }
    const { ticketId, body } = parsed.data;

    try {
        const ticket = await db.ticket.findUnique({
            where: { id: ticketId },
            select: { status: true },
        });
        if (!ticket) return { ok: false, error: "Ticket not found." };
        if (ticket.status === "CLOSED") {
            return { ok: false, error: "This ticket is closed. Reopen it to reply." };
        }

        await db.$transaction([
            db.message.create({
                data: { ticketId, authorType: "AGENT", agentId: agent.id, body },
            }),
            db.ticket.update({ where: { id: ticketId }, data: { lastMessageAt: new Date() } }),
        ]);
    } catch (error) {
        console.error("sendReplyAction failed", error);
        return { ok: false, error: "Couldn't send your reply. Please try again." };
    }

    revalidatePath("/inbox", "layout");
    return { ok: true };
}