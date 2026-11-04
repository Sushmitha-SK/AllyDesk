import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

import { db } from "@/lib/db";
import { seedDemoData } from "@/lib/demo/seed-data";
import { env } from "@/lib/env";

export const maxDuration = 60;

function isAuthorized(req: NextRequest, secret: string) {
    const expected = Buffer.from(`Bearer ${secret}`);
    const actual = Buffer.from(req.headers.get("authorization") ?? "");
    return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function GET(req: NextRequest) {
    // This route wipes tickets, so it only exists on deployments that opt in
    if (env.DEMO_RESET !== "true") return new Response("Not found", { status: 404 });

    if (!env.CRON_SECRET) {
        console.error("DEMO_RESET is enabled but CRON_SECRET is not set.");
        return new Response("Server misconfigured", { status: 500 });
    }
    if (!isAuthorized(req, env.CRON_SECRET)) return new Response("Unauthorized", { status: 401 });

    const started = Date.now();
    try {
        // One transaction: visitors see the old data until the new data commits
        const counts = await db.$transaction(
            (tx) => seedDemoData(tx, { adminEmail: env.SEED_ADMIN_EMAIL, wipeAgents: false }),
            { timeout: 30_000, maxWait: 10_000 },
        );
        revalidatePath("/inbox", "layout");
        revalidatePath("/customers", "layout");
        return Response.json({ ok: true, ...counts, ms: Date.now() - started });
    } catch (error) {
        console.error("Demo reset failed", error);
        return Response.json({ ok: false }, { status: 500 });
    }
}