import "server-only";
import { GoogleGenAI } from "@google/genai";

import { env } from "@/lib/env";

if (env.GEMINI_STUB === "true" && process.env.VERCEL_ENV === "production") {
    throw new Error("GEMINI_STUB must never be enabled in production.");
}

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });


const STUB_CHUNKS = [
    "Hello,\n\n",
    "This is a stubbed AI draft ",
    "used by the end-to-end tests.\n\n",
    "The SupportFlow team",
];


export const GEMINI_MODEL = env.GEMINI_MODEL;

export async function* streamReply({
    system,
    prompt,
    signal,
}: {
    system: string;
    prompt: string;
    signal: AbortSignal;
}): AsyncGenerator<string> {
    if (env.GEMINI_STUB === "true") {
        for (const chunk of STUB_CHUNKS) {
            if (signal.aborted) return;
            await new Promise((resolve) => setTimeout(resolve, 25));
            yield chunk;
        }
        return;
    }
    const stream = await ai.models.generateContentStream({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
            systemInstruction: system,
            temperature: 0.4,
            maxOutputTokens: 1024,
            thinkingConfig: { thinkingBudget: 0 }, // otherwise hidden "thinking" tokens eat the output budget
            abortSignal: signal,
        },
    });

    for await (const chunk of stream) {
        const text = chunk.text;
        if (text) yield text;
    }
}