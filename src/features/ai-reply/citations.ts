const MARKER = /[ \t]*\[(\d{1,2})\]/g; // swallows the space before a marker

export type DraftPart = { type: "text"; value: string } | { type: "cite"; number: number };

/** Unique marker numbers present in the text, ascending. */
export function findCitations(text: string): number[] {
    return [...new Set([...text.matchAll(MARKER)].map((m) => Number(m[1])))].sort((a, b) => a - b);
}

/** Removes every marker. Run before anything is sent to a customer. */
export function stripCitations(text: string): string {
    return text.replace(MARKER, "");
}

/** Drops markers that don't point at one of the `max` retrieved articles. */
export function keepValidCitations(text: string, max: number): string {
    return text.replace(MARKER, (match, n: string) => {
        const num = Number(n);
        return num >= 1 && num <= max ? match : "";
    });
}

export function splitCitations(text: string): DraftPart[] {
    const parts: DraftPart[] = [];
    let last = 0;
    for (const m of text.matchAll(MARKER)) {
        const index = m.index ?? 0;
        if (index > last) parts.push({ type: "text", value: text.slice(last, index) });
        parts.push({ type: "cite", number: Number(m[1]) });
        last = index + m[0].length;
    }
    if (last < text.length) parts.push({ type: "text", value: text.slice(last) });
    return parts;
}