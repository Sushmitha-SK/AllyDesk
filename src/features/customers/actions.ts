"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/lib/action-result";
import { getCurrentAgent } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateNotesSchema, type UpdateNotesInput } from "./schemas";

export async function updateCustomerNotesAction(input: UpdateNotesInput): Promise<ActionResult> {
    await getCurrentAgent();

    const parsed = updateNotesSchema.safeParse(input);
    if (!parsed.success) {
        return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid notes." };
    }
    const { customerId, notes } = parsed.data;

    try {
        await db.customer.update({ where: { id: customerId }, data: { notes: notes || null } });
    } catch (error) {
        console.error("updateCustomerNotesAction failed", error);
        return { ok: false, error: "Couldn't save the notes. Please try again." };
    }

    revalidatePath("/customers", "layout");
    revalidatePath("/inbox", "layout"); // the ticket's customer panel shows notes too
    return { ok: true };
}