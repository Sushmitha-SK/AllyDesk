"use client";

import { splitCitations } from "../citations";
import type { DraftSource } from "../types";

type Props = {
    text: string;
    sources: DraftSource[];
    onCite: (position: number) => void;
};

export function DraftPreview({ text, sources, onCite }: Props) {
    const titleOf = (n: number) => sources.find((s) => s.position === n)?.title;

    return (
        <div className="max-h-60 overflow-y-auto rounded-md border bg-background px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap">
            {splitCitations(text).map((part, i) => {
                if (part.type === "text") return <span key={i}>{part.value}</span>;
                const title = titleOf(part.number);
                if (!title) {
                    return (
                        <span key={i} className="text-muted-foreground">
                            [{part.number}]
                        </span>
                    );
                }
                return (
                    <sup key={i}>
                        <button
                            type="button"
                            onClick={() => onCite(part.number)}
                            aria-label={`Show source ${part.number}: ${title}`}
                            className="mx-0.5 rounded px-1 font-mono text-[10px] text-primary hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                            {part.number}
                        </button>
                    </sup>
                );
            })}
        </div>
    );
}