import "server-only";
import { GoogleGenAI } from "@google/genai";

import { env } from "@/lib/env";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

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