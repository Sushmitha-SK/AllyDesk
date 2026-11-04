import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

import { saveDraft } from "@/features/ai-reply/drafts";
import { GEMINI_MODEL, streamReply } from "@/features/ai-reply/gemini";
import { buildPrompt } from "@/features/ai-reply/prompts";
import { getDraftContext } from "@/features/ai-reply/queries";
import { checkDraftRateLimit } from "@/features/ai-reply/rate-limit";
import { buildRetrievalQuery, retrieveArticles } from "@/features/ai-reply/retrieval";
import type { StreamEvent } from "@/features/ai-reply/types";
import { db } from "@/lib/db";
import { keepValidCitations } from "@/features/ai-reply/citations";


export const maxDuration = 60;

const bodySchema = z.object({ ticketId: z.string().min(1) });

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) return Response.json({ error: "Please sign in again." }, { status: 401 });

    const agent = await db.agent.findUnique({
        where: { clerkId: userId },
        select: { id: true, name: true },
    });
    if (!agent) return Response.json({ error: "Please sign in again." }, { status: 401 });

    const parsed = bodySchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return Response.json({ error: "Invalid request." }, { status: 400 });
    const { ticketId } = parsed.data;

    const limit = await checkDraftRateLimit(agent.id);
    if (!limit.ok) {
        return Response.json(
            {
                error: `Draft limit reached. Try again in ${Math.ceil(limit.retryAfter / 60)} min.`,
            },
            { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
        );
    }

    const context = await getDraftContext(ticketId);
    if (!context) return Response.json({ error: "Ticket not found." }, { status: 404 });

    const articles = await retrieveArticles(buildRetrievalQuery(context));
    const { system, prompt } = buildPrompt({ agentName: agent.name, context, articles });

    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
            // After a client abort the controller is already closed, so enqueue can throw
            const send = (event: StreamEvent) => {
                try {
                    controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
                } catch { }
            };

            try {
                send({
                    type: "sources",
                    // sources event: include the number
                    sources: articles.map(({ articleId, slug, title, snippet, relevance }, i) => ({
                        articleId, slug, title, snippet, relevance, position: i + 1,
                    })),
                });

                let text = "";
                for await (const delta of streamReply({ system, prompt, signal: req.signal })) {
                    text += delta;
                    send({ type: "delta", text: delta });
                }

                if (req.signal.aborted) return; // stopped by the agent: save nothing

                const body = keepValidCitations(text.trim(), articles.length).slice(0, 5000);
                if (!body) {
                    send({ type: "error", message: "The model returned an empty reply. Try again." });
                    return;
                }

                const draft = await saveDraft({
                    ticketId,
                    agentId: agent.id,
                    body,
                    model: GEMINI_MODEL,
                    articles,
                });
                send({ type: "done", draftId: draft.id, body }); // the canonical text replaces the streamed text
            } catch (error) {
                if (!req.signal.aborted) {
                    console.error("AI draft generation failed", error);
                    send({ type: "error", message: "Couldn't generate a draft. Please try again." });
                }
            } finally {
                try {
                    controller.close();
                } catch { }
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "application/x-ndjson; charset=utf-8",
            "Cache-Control": "no-store",
            "X-Accel-Buffering": "no", // stop proxies from buffering the stream
        },
    });
}