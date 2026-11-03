"use client";

import { Loader2, Send } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendReplyAction } from "../actions";

const MAX_LENGTH = 5000;

export function ReplyComposer({ ticketId }: { ticketId: string }) {
    const [body, setBody] = useState("");
    const [isPending, startTransition] = useTransition();

    const trimmed = body.trim();
    const canSend = trimmed.length > 0 && !isPending;

    function send() {
        if (!canSend) return;
        startTransition(async () => {
            const result = await sendReplyAction({ ticketId, body: trimmed });
            if (result.ok) {
                setBody("");
                toast.success("Reply sent");
            } else {
                toast.error(result.error); // keep the text so nothing is lost
            }
        });
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                send();
            }}
            className="space-y-2"
        >
            <label htmlFor="reply-body" className="sr-only">
                Reply to customer
            </label>
            <Textarea
                id="reply-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                        e.preventDefault();
                        send();
                    }
                }}
                placeholder="Write a reply…"
                rows={3}
                maxLength={MAX_LENGTH}
                disabled={isPending}
                className="max-h-60 resize-none"
            />
            <div className="flex items-center justify-between gap-3">
                <p className="hidden text-xs text-muted-foreground sm:block">
                    <kbd className="font-mono">Ctrl</kbd>/<kbd className="font-mono">⌘</kbd> +{" "}
                    <kbd className="font-mono">Enter</kbd> to send
                </p>
                <Button type="submit" size="sm" disabled={!canSend} className="ml-auto">
                    {isPending ? (
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                    ) : (
                        <Send className="size-4" aria-hidden />
                    )}
                    Send reply
                </Button>
            </div>
        </form>
    );
}