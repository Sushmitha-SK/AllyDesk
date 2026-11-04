"use client";

import { Loader2, RefreshCw, Send, Sparkles, Square, Trash2 } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendReplyAction } from "@/features/conversation/actions";
import { discardDraftAction } from "../actions";
import { streamDraft } from "../stream-draft";
import type { DraftSource, InitialDraft } from "../types";
import { SourceReferences } from "./source-references";

type Phase = "idle" | "generating" | "ready";

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
    const [isPending, startTransition] = useTransition();
    const abortRef = useRef<AbortController | null>(null);

    const bodyRef = useRef<HTMLTextAreaElement>(null);
    const focusReply = () => document.getElementById("reply-body")?.focus();


    useEffect(() => () => abortRef.current?.abort(), []);

    function reset() {
        setPhase("idle");
        setDraftId(null);
        setBody("");
        setSources([]);
        setError(null);
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
        // setDraftId(id);
        setDraftId(null);
        setPhase("ready");
        bodyRef.current?.focus();

        try {
            const id = await streamDraft(
                ticketId,
                { onSources: setSources, onDelta: (text) => setBody((prev) => prev + text) },
                controller.signal,
            );
            setDraftId(id);
            setPhase("ready");
        } catch (e) {
            if (controller.signal.aborted) return; // the agent stopped it, or a newer run took over
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
            const result = await sendReplyAction({ ticketId, body: text, draftId });
            if (result.ok) {
                toast.success("Reply sent");
                reset();
                focusReply()
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

            {(sources.length > 0 || !generating) && <SourceReferences sources={sources} />}

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

            {!generating && (
                <>
                    <p className="text-xs text-muted-foreground">
                        Edit as needed. AI can get details wrong, so review it before sending.
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