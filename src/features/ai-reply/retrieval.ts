import "server-only";

import { db } from "@/lib/db";
import type { DraftContext } from "./queries";

const STOPWORDS = new Set(
    (
        "the and for you your with that this have has are was were not but can could would please " +
        "hello thanks thank from they them our out any all get got just how what when why who will " +
        "about into then than there their been being its after before again still need want help " +
        "hi dear best regards"
    ).split(" "),
);

const MIN_SCORE = 3; // one title hit, or three body hits

// Crude but consistent on both sides: "charged" and "charges" both become "charg".
const stem = (t: string) => (t.length > 4 ? t.replace(/(ing|ed|es|s)$/, "") : t);

function tokens(text: string): string[] {
    return text
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((t) => t.length > 2 && !STOPWORDS.has(t))
        .map(stem);
}

function bestSentence(content: string, queryTokens: Set<string>): string {
    const sentences = content.split(/(?<=[.!?])\s+/);
    let best = sentences[0] ?? content;
    let bestHits = -1;
    for (const sentence of sentences) {
        const hits = tokens(sentence).filter((t) => queryTokens.has(t)).length;
        if (hits > bestHits) {
            best = sentence;
            bestHits = hits;
        }
    }
    return best.slice(0, 220);
}

export type RetrievedArticle = {
    articleId: string;
    slug: string;
    title: string;
    content: string;
    snippet: string;
    relevance: number;
};

/** Customer's latest messages plus the subject. This is what we search with. */
export function buildRetrievalQuery(context: DraftContext): string {
    const customerText = context.messages
        .filter((m) => m.authorType === "CUSTOMER")
        .slice(-3)
        .map((m) => m.body)
        .join("\n");
    return `${context.subject}\n${customerText}`;
}

/**
 * Keyword scoring over the knowledge base. Fine for a few hundred articles.
 * Swap the body for pgvector or embeddings later; the signature stays the same.
 */
export async function retrieveArticles(query: string, limit = 3): Promise<RetrievedArticle[]> {
    const queryTokens = new Set(tokens(query));
    if (queryTokens.size === 0) return [];

    const articles = await db.knowledgeArticle.findMany({
        select: { id: true, slug: true, title: true, content: true },
    });

    return articles
        .map((article) => {
            const titleTokens = new Set(tokens(article.title));
            const bodyTokens = new Set(tokens(article.content));
            let score = 0;
            for (const t of queryTokens) {
                if (titleTokens.has(t)) score += 3;
                if (bodyTokens.has(t)) score += 1;
            }
            return { article, score };
        })
        .filter(({ score }) => score >= MIN_SCORE)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ article, score }) => ({
            articleId: article.id,
            slug: article.slug,
            title: article.title,
            content: article.content,
            snippet: bestSentence(article.content, queryTokens),
            relevance: Math.min(1, Math.round((score / 10) * 100) / 100),
        }));
}