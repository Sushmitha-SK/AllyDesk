import { getLatestDraft } from "../queries";
import { DraftPanel } from "./draft-panel";

export async function AiDraftSection({ ticketId }: { ticketId: string }) {
    const initialDraft = await getLatestDraft(ticketId);
    return <DraftPanel key={ticketId} ticketId={ticketId} initialDraft={initialDraft} />;
}