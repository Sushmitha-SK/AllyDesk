import type { DraftSource, StreamEvent } from "./types";

type Handlers = {
    onSources: (sources: DraftSource[]) => void;
    onDelta: (text: string) => void;
};

/** Streams a draft from /api/ai/reply. Resolves with the saved draft's id. */
export async function streamDraft(
    ticketId: string,
    handlers: Handlers,
    signal: AbortSignal,
): Promise<{ draftId: string; body: string }> {

    const res = await fetch("/api/ai/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId }),
        signal,
    });

    if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Couldn't generate a draft.");
    }

    let result: { draftId: string; body: string } | null = null;
    let streamedBody = "";


    function handleLine(line: string) {
        if (!line.trim()) return;
        const event = JSON.parse(line) as StreamEvent;
        switch (event.type) {
            case "sources":
                handlers.onSources(event.sources);
                break;
            case "delta":
                streamedBody += event.text;
                handlers.onDelta(event.text);
                break;
            case "done":
                result = {
                    draftId: event.draftId,
                    body: "body" in event ? event.body : streamedBody,
                };
                break;
            case "error":
                throw new Error(event.message);
        }
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? ""; // keep the incomplete trailing line
        lines.forEach(handleLine);
    }
    handleLine(buffer + decoder.decode());

    if (!result) throw new Error("The draft was interrupted. Please try again.");
    return result;
}