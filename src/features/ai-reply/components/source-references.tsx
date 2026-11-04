"use client";

import { cn } from "@/lib/utils";
import type { DraftSource } from "../types";

type Props = {
    sources: DraftSource[];
    cited: number[]; // markers currently present in the draft text
    active: number | null;
    onActiveChange: (position: number | null) => void;
};

export function SourceReferences({ sources, cited, active, onActiveChange }: Props) {
    if (sources.length === 0) {
        return (
            <p className="text-xs text-muted-foreground">
                No knowledge-base articles matched, so check every detail before sending.
            </p>
        );
    }

    return (
        <div className="space-y-1.5">
            <h4 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Sources</h4>
            <ul className="space-y-1">
                {sources.map((source) => {
                    const isActive = active === source.position;
                    return (
                        <li key={source.articleId}>
                            <details
                                open={isActive}
                                onToggle={(e) => {
                                    const open = e.currentTarget.open;
                                    if (open && !isActive) onActiveChange(source.position);
                                    if (!open && isActive) onActiveChange(null);
                                }}
                                className={cn(
                                    "rounded-md border bg-background px-2.5 py-1.5 text-xs",
                                    isActive && "ring-1 ring-primary",
                                )}
                            >
                                <summary className="flex cursor-pointer items-center gap-2">
                                    <span className="grid size-4 shrink-0 place-items-center rounded bg-muted font-mono text-[10px]">
                                        {source.position}
                                    </span>
                                    <span className="truncate font-medium">{source.title}</span>
                                    <span className="ml-auto shrink-0 text-muted-foreground">
                                        {cited.includes(source.position) ? "Cited" : "Not cited"} ·{" "}
                                        {Math.round(source.relevance * 100)}% match
                                    </span>
                                </summary>
                                <p className="mt-1.5 text-muted-foreground">“{source.snippet}”</p>
                            </details>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}