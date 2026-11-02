import type { NextRequest } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

import { db } from "@/lib/db";
import { syncAgent } from "@/lib/agents";

export async function POST(req: NextRequest) {
    let evt;
    try {
        evt = await verifyWebhook(req); // checks the Svix signature using CLERK_WEBHOOK_SIGNING_SECRET
    } catch {
        return new Response("Invalid webhook signature", { status: 400 });
    }

    switch (evt.type) {
        case "user.created":
        case "user.updated": {
            const user = evt.data;
            const email =
                user.email_addresses.find((e) => e.id === user.primary_email_address_id)
                    ?.email_address ?? user.email_addresses[0]?.email_address;
            if (!email) break;

            await syncAgent({
                clerkId: user.id,
                email,
                name: [user.first_name, user.last_name].filter(Boolean).join(" ") || email.split("@")[0]!,
                avatarUrl: user.image_url,
            });
            break;
        }
        case "user.deleted": {
            if (evt.data.id) {
                // Assigned tickets are kept; their assignee is set to null by the schema
                await db.agent.deleteMany({ where: { clerkId: evt.data.id } });
            }
            break;
        }
    }

    return new Response("OK", { status: 200 });
}