"use client";

import { useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@/lib/utils";

type Props = {
    list: React.ReactNode;
    detail: React.ReactNode;
};

export function SplitPane({ list, detail }: Props) {
    const segment = useSelectedLayoutSegment(); // "ticketId" when a ticket is open, else null
    const hasSelection = segment !== null;

    return (
        <div className="grid h-full grid-rows-[minmax(0,1fr)] md:grid-cols-[minmax(320px,380px)_minmax(0,1fr)]">
            <section
                aria-label="Tickets"
                className={cn("min-h-0 overflow-y-auto md:border-r", hasSelection && "hidden md:block")}
            >
                {list}
            </section>
            <section
                aria-label="Conversation"
                className={cn("min-h-0 overflow-y-auto", !hasSelection && "hidden md:block")}
            >
                {detail}
            </section>
        </div>
    );
}