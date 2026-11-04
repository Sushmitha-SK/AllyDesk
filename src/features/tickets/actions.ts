"use server";

import { revalidatePath } from "next/cache";

import type { Prisma } from "@/generated/prisma/client";
import type { ActionResult } from "@/lib/action-result";
import { getCurrentAgent } from "@/lib/auth";
import { db } from "@/lib/db";
import { PRIORITY_LABELS, STATUS_LABELS } from "./constants";
import { updateTicketSchema, type UpdateTicketInput } from "./schemas";

import { z } from "zod";
import { searchTicketsForPalette } from "./queries";

export async function updateTicketAction(input: UpdateTicketInput): Promise<ActionResult> {
    const agent = await getCurrentAgent(); // redirects to /sign-in if the session is gone

    const parsed = updateTicketSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Invalid update." };
    const { ticketId, status, priority, assigneeId } = parsed.data;

    try {
        const ticket = await db.ticket.findUnique({
            where: { id: ticketId },
            select: { status: true, priority: true, assigneeId: true },
        });
        if (!ticket) return { ok: false, error: "Ticket not found." };

        const data: Prisma.TicketUncheckedUpdateInput = {};
        const events: string[] = [];

        if (status && status !== ticket.status) {
            data.status = status;
            events.push(
                `${agent.name} changed status from ${STATUS_LABELS[ticket.status]} to ${STATUS_LABELS[status]}`,
            );
        }

        if (priority && priority !== ticket.priority) {
            data.priority = priority;
            events.push(
                `${agent.name} changed priority from ${PRIORITY_LABELS[ticket.priority]} to ${PRIORITY_LABELS[priority]}`,
            );
        }

        if (assigneeId !== undefined && assigneeId !== ticket.assigneeId) {
            if (assigneeId === null) {
                data.assigneeId = null;
                events.push(`${agent.name} unassigned this ticket`);
            } else {
                const target = await db.agent.findUnique({
                    where: { id: assigneeId },
                    select: { id: true, name: true },
                });
                if (!target) return { ok: false, error: "That agent no longer exists." };

                data.assigneeId = target.id;
                events.push(
                    target.id === agent.id
                        ? `${agent.name} assigned this ticket to themselves`
                        : `${agent.name} assigned this ticket to ${target.name}`,
                );
            }
        }

        if (events.length === 0) return { ok: true }; // nothing changed

        await db.$transaction([
            db.ticket.update({ where: { id: ticketId }, data }),
            db.message.createMany({
                data: events.map((body) => ({ ticketId, authorType: "SYSTEM" as const, body })),
            }),
        ]);
    } catch (error) {
        console.error("updateTicketAction failed", error);
        return { ok: false, error: "Couldn't update the ticket. Please try again." };
    }

    revalidatePath("/inbox", "layout");
    return { ok: true };
}

export async function searchTicketsAction(query: string) {
    await getCurrentAgent();

    const parsed = z.string().max(100).safeParse(query);
    if (!parsed.success) return [];

    try {
        return await searchTicketsForPalette(parsed.data);
    } catch (error) {
        console.error("searchTicketsAction failed", error);
        return [];
    }
}