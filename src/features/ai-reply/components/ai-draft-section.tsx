import Link from "next/link";

import { getCurrentAgent } from "@/lib/auth";
import { getLatestDraft } from "../queries";
import { DraftPanel } from "./draft-panel";

export async function AiDraftSection({ ticketId }: { ticketId: string }) {
    const agent = await getCurrentAgent(); // cached for the request

    if ("aiDraftsEnabled" in agent && !agent.aiDraftsEnabled) {
        return (
            <p className="text-xs text-muted-foreground">
                AI drafts are turned off.{" "}
                <Link href="/settings" className="underline underline-offset-2">
                    Turn them on in Settings
                </Link>
                .
            </p>
        );
    }

    const initialDraft = await getLatestDraft(ticketId);
    return <DraftPanel key={ticketId} ticketId={ticketId} initialDraft={initialDraft} />;
}