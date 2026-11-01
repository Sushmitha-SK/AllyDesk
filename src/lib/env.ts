import "server-only";
import { z } from "zod";

const schema = z.object({
    DATABASE_URL: z.string().url(),
    CLERK_SECRET_KEY: z.string().min(1).optional(), // required from Step 4
    CLERK_WEBHOOK_SIGNING_SECRET: z.string().min(1).optional(),
    GEMINI_API_KEY: z.string().min(1).optional(), // required from Step 9
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid environment variables:", z.flattenError(parsed.error).fieldErrors);
    throw new Error("Invalid environment variables");
}

export const env = parsed.data;