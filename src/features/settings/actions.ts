"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/lib/action-result";
import { getCurrentAgent } from "@/lib/auth";
import { db } from "@/lib/db";
import {
    updatePreferencesSchema,
    updateProfileSchema,
    updateRoleSchema,
    type UpdatePreferencesInput,
    type UpdateProfileInput,
    type UpdateRoleInput,
} from "./schemas";

export async function updateProfileAction(input: UpdateProfileInput): Promise<ActionResult> {
    const agent = await getCurrentAgent();

    const parsed = updateProfileSchema.safeParse(input);
    if (!parsed.success) {
        return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid name." };
    }

    try {
        await db.agent.update({ where: { id: agent.id }, data: { name: parsed.data.name } });
    } catch (error) {
        console.error("updateProfileAction failed", error);
        return { ok: false, error: "Couldn't save your profile. Please try again." };
    }

    revalidatePath("/", "layout"); 
    return { ok: true };
}

export async function updatePreferencesAction(input: UpdatePreferencesInput): Promise<ActionResult> {
    const agent = await getCurrentAgent();

    const parsed = updatePreferencesSchema.safeParse(input);
    if (!parsed.success) {
        return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid preferences." };
    }
    const { signature, pendingAfterReply, aiDraftsEnabled } = parsed.data;

    try {
        await db.agent.update({
            where: { id: agent.id },
            data: { signature: signature || null, pendingAfterReply, aiDraftsEnabled },
        });
    } catch (error) {
        console.error("updatePreferencesAction failed", error);
        return { ok: false, error: "Couldn't save your preferences. Please try again." };
    }

    revalidatePath("/", "layout");
    return { ok: true };
}

export async function updateAgentRoleAction(input: UpdateRoleInput): Promise<ActionResult> {
    const agent = await getCurrentAgent();

    // Authorization lives here, not in the UI: a Server Action is a public POST endpoint
    if (agent.role !== "ADMIN") return { ok: false, error: "Only admins can change roles." };

    const parsed = updateRoleSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Invalid role change." };
    const { agentId, role } = parsed.data;

    // Nobody can change their own role, so at least one admin always remains
    if (agentId === agent.id) return { ok: false, error: "You can't change your own role." };

    try {
        const { count } = await db.agent.updateMany({ where: { id: agentId }, data: { role } });
        if (count === 0) return { ok: false, error: "That agent no longer exists." };
    } catch (error) {
        console.error("updateAgentRoleAction failed", error);
        return { ok: false, error: "Couldn't change the role. Please try again." };
    }

    revalidatePath("/settings");
    return { ok: true };
}