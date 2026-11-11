import { z } from "zod";

export const updateProfileSchema = z.object({
    name: z.string().trim().min(1, "Enter a display name.").max(60, "Names are limited to 60 characters."),
});
export type UpdateProfileInput = z.input<typeof updateProfileSchema>;

export const updatePreferencesSchema = z.object({
    signature: z.string().trim().max(200, "Signatures are limited to 200 characters."),
    pendingAfterReply: z.boolean(),
    aiDraftsEnabled: z.boolean(),
});
export type UpdatePreferencesInput = z.input<typeof updatePreferencesSchema>;

export const updateRoleSchema = z.object({
    agentId: z.string().min(1),
    role: z.enum(["ADMIN", "AGENT"]),
});
export type UpdateRoleInput = z.input<typeof updateRoleSchema>;