import { BookOpen } from "lucide-react";

import type { DraftSource } from "../types";

export function SourceReferences({ sources }: { sources: DraftSource[] }) {
    if (sources.length === 0) {
        return (
            <p className="text-xs text-muted-foreground">
                No knowledge-base articles matched, so check every detail before sending.
            </p>
        );
    }

    return (
        <div className="space-y-1.5">
            <h4 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Sources
            </h4>
            <ul className="space-y-1">
                {sources.map((source) => (
                    <li key={source.articleId}>
                        <details className="rounded-md border bg-background px-2.5 py-1.5 text-xs">
                            <summary className="flex cursor-pointer items-center gap-2">
                                <BookOpen className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                                <span className="truncate font-medium">{source.title}</span>
                                <span className="ml-auto shrink-0 text-muted-foreground">
                                    {Math.round(source.relevance * 100)}% match
                                </span>
                            </summary>
                            <p className="mt-1.5 text-muted-foreground">“{source.snippet}”</p>
                        </details>
                    </li>
                ))}
            </ul>
        </div>
    );
}