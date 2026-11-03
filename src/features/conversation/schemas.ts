import { z } from "zod";

export const sendReplySchema = z.object({
  ticketId: z.string().min(1),
  draftId: z.string().min(1).optional(),
  body: z
    .string()
    .trim()
    .min(1, "Write a reply before sending.")
    .max(5000, "Replies are limited to 5,000 characters."),
});

export type SendReplyInput = z.input<typeof sendReplySchema>;