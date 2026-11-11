"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/lib/action-result";
import { getCurrentAgent } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendReplySchema, type SendReplyInput } from "./schemas";

import { stripCitations } from "@/features/ai-reply/citations";

export async function sendReplyAction(input: SendReplyInput): Promise<ActionResult> {
    const agent = await getCurrentAgent();

    const parsed = sendReplySchema.safeParse(input);
    if (!parsed.success) {
        return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid reply." };
    }
    const { ticketId, draftId } = parsed.data;
    const body = draftId ? stripCitations(parsed.data.body).trim() : parsed.data.body;
    if (!body) return { ok: false, error: "Write a reply before sending." };

    try {
        const ticket = await db.ticket.findUnique({
            where: { id: ticketId },
            select: { status: true },
        });
        if (!ticket) return { ok: false, error: "Ticket not found." };
        if (ticket.status === "CLOSED") {
            return { ok: false, error: "This ticket is closed. Reopen it to reply." };
        }

        const autoPending =
            (agent as typeof agent & { pendingAfterReply?: boolean }).pendingAfterReply === true &&
            ticket.status === "OPEN";


        await db.$transaction(async (tx) => {
            const message = await tx.message.create({
                data: { ticketId, authorType: "AGENT", agentId: agent.id, body },
                select: { id: true },
            });
            await tx.ticket.update({
                where: { id: ticketId },
                data: { lastMessageAt: new Date(), ...(autoPending ? { status: "PENDING" as const } : {}) },
            });
            if (autoPending) {
                await tx.message.create({
                    data: {
                        ticketId,
                        authorType: "SYSTEM",
                        body: `${agent.name} replied, so the ticket was set to Pending`,
                    },
                });
            }

            if (draftId) {
                await tx.aiDraft.updateMany({
                    where: { id: draftId, ticketId, status: "GENERATED" },
                    data: { status: "APPROVED", sentMessageId: message.id },
                });
            }
        });
    } catch (error) {
        console.error("sendReplyAction failed", error);
        return { ok: false, error: "Couldn't send your reply. Please try again." };
    }

    revalidatePath("/inbox", "layout");
    return { ok: true };
}