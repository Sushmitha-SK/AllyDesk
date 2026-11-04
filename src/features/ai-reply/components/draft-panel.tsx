"use client";

import { Eye, Loader2, Pencil, RefreshCw, Send, Sparkles, Square, Trash2 } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendReplyAction } from "@/features/conversation/actions";
import { discardDraftAction } from "../actions";
import { findCitations } from "../citations";
import { streamDraft } from "../stream-draft";
import type { DraftSource, InitialDraft } from "../types";
import { DraftPreview } from "./draft-preview";
import { SourceReferences } from "./source-references";

type Phase = "idle" | "generating" | "ready";
type View = "edit" | "preview";

type Props = { ticketId: string; initialDraft: InitialDraft | null };

/**
 * After mount this component owns its state. `initialDraft` is read once, so a
 * background revalidation can never overwrite what the agent is editing.
 */
export function DraftPanel({ ticketId, initialDraft }: Props) {
    const [phase, setPhase] = useState<Phase>(initialDraft ? "ready" : "idle");
    const [draftId, setDraftId] = useState<string | null>(initialDraft?.id ?? null);
    const [body, setBody] = useState(initialDraft?.body ?? "");
    const [sources, setSources] = useState<DraftSource[]>(initialDraft?.sources ?? []);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<View>("edit");
    const [active, setActive] = useState<number | null>(null);
    const [isPending, startTransition] = useTransition();
    const abortRef = useRef<AbortController | null>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => () => abortRef.current?.abort(), []);

    const focusReply = () => document.getElementById("reply-body")?.focus();
    const cited = findCitations(body);

    function reset() {
        setPhase("idle");
        setDraftId(null);
        setBody("");
        setSources([]);
        setError(null);
        setView("edit");
        setActive(null);
    }

    async function generate() {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setPhase("generating");
        setError(null);
        setDraftId(null);
        setBody("");
        setSources([]);
        setView("edit");
        setActive(null);

        try {
            const result = await streamDraft(
                ticketId,
                { onSources: setSources, onDelta: (text) => setBody((prev) => prev + text) },
                controller.signal,
            );
            setDraftId(result.draftId);
            setBody(result.body); // canonical text: validated markers, trimmed
            setPhase("ready");
            bodyRef.current?.focus();
        } catch (e) {
            if (controller.signal.aborted) return; // stopped by the agent, or a newer run took over
            setPhase("idle");
            setBody("");
            setSources([]);
            setError(e instanceof Error ? e.message : "Couldn't generate a draft.");
        }
    }

    function stop() {
        abortRef.current?.abort();
        reset();
        focusReply();
    }

    function approve() {
        const text = body.trim();
        if (!text || !draftId) return;
        startTransition(async () => {
            // Markers are sent along; the server strips them because a draftId is present
            const result = await sendReplyAction({ ticketId, body: text, draftId });
            if (result.ok) {
                toast.success("Reply sent");
                reset();
                focusReply();
            } else {
                toast.error(result.error); // keep the draft so nothing is lost
            }
        });
    }

    function discard() {
        const id = draftId;
        reset();
        focusReply();
        if (!id) return;
        startTransition(async () => {
            const result = await discardDraftAction(id);
            if (result.ok) toast.success("Draft discarded");
            else toast.error(result.error);
        });
    }

    if (phase === "idle") {
        return (
            <div className="space-y-2">
                <Button type="button" variant="outline" size="sm" onClick={generate}>
                    <Sparkles className="size-4" aria-hidden /> Draft a reply with AI
                </Button>
                {error && (
                    <p role="alert" className="text-xs text-destructive">
                        {error}
                    </p>
                )}
            </div>
        );
    }

    const generating = phase === "generating";
    const showPreview = view === "preview" && !generating;

    return (
        <section aria-label="AI draft" className="space-y-2.5 rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" aria-hidden />
                <h3 className="text-sm font-medium">AI draft</h3>
                {generating && (
                    <>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground" role="status">
                            <Loader2 className="size-3 animate-spin" aria-hidden /> Writing…
                        </span>
                        <Button type="button" variant="ghost" size="sm" onClick={stop} className="ml-auto h-7">
                            <Square className="size-3" aria-hidden /> Stop
                        </Button>
                    </>
                )}
            </div>

            {(sources.length > 0 || !generating) && (
                <SourceReferences sources={sources} cited={cited} active={active} onActiveChange={setActive} />
            )}

            {sources.length > 0 && !generating && (
                <div role="group" aria-label="Draft view" className="flex gap-1">
                    <Button
                        type="button"
                        size="sm"
                        variant={view === "edit" ? "secondary" : "ghost"}
                        aria-pressed={view === "edit"}
                        onClick={() => setView("edit")}
                        className="h-7"
                    >
                        <Pencil className="size-3" aria-hidden /> Edit
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant={view === "preview" ? "secondary" : "ghost"}
                        aria-pressed={view === "preview"}
                        onClick={() => setView("preview")}
                        className="h-7"
                    >
                        <Eye className="size-3" aria-hidden /> Preview
                    </Button>
                </div>
            )}

            {showPreview ? (
                <DraftPreview text={body} sources={sources} onCite={setActive} />
            ) : (
                <>
                    <label htmlFor="draft-body" className="sr-only">
                        AI draft (editable)
                    </label>
                    <Textarea
                        ref={bodyRef}
                        id="draft-body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        readOnly={generating}
                        aria-busy={generating}
                        rows={6}
                        maxLength={5000}
                        className="max-h-60 resize-none"
                    />
                </>
            )}

            {!generating && (
                <>
                    <p className="text-xs text-muted-foreground">
                        Edit as needed. AI can get details wrong, so review it before sending.
                        {cited.length > 0 && " Markers like [1] tie a sentence to its source and are removed when you send."}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button type="button" size="sm" onClick={approve} disabled={!body.trim() || isPending}>
                            {isPending ? (
                                <Loader2 className="size-4 animate-spin" aria-hidden />
                            ) : (
                                <Send className="size-4" aria-hidden />
                            )}
                            Approve &amp; send
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={generate} disabled={isPending}>
                            <RefreshCw className="size-4" aria-hidden /> Retry
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={discard}
                            disabled={isPending}
                            className="ml-auto"
                        >
                            <Trash2 className="size-4" aria-hidden /> Discard
                        </Button>
                    </div>
                </>
            )}
        </section>
    );
}