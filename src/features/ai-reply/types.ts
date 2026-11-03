export type DraftSource = {
    articleId: string;
    slug: string;
    title: string;
    snippet: string;
    relevance: number; // 0..1
};

export type InitialDraft = {
    id: string;
    body: string;
    sources: DraftSource[];
};

/** One JSON object per line (NDJSON) on the /api/ai/reply stream. */
export type StreamEvent =
    | { type: "sources"; sources: DraftSource[] }
    | { type: "delta"; text: string }
    | { type: "done"; draftId: string }
    | { type: "error"; message: string };