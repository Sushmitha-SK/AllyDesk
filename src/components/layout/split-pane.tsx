"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
    clampListWidth,
    LIST_WIDTH_COOKIE,
    LIST_WIDTH_DEFAULT,
    LIST_WIDTH_MAX,
    LIST_WIDTH_MIN,
    LIST_WIDTH_STEP,
} from "./split-pane-config";

type Props = {
    list: React.ReactNode;
    detail: React.ReactNode;
    initialListWidth: number;
};

function persist(px: number) {
    document.cookie = `${LIST_WIDTH_COOKIE}=${px}; path=/; max-age=31536000; samesite=lax`;
}

export function SplitPane({ list, detail, initialListWidth }: Props) {
    const segment = useSelectedLayoutSegment(); // "ticketId" when a ticket is open, else null
    const hasSelection = segment !== null;

    const containerRef = useRef<HTMLDivElement>(null);
    const latest = useRef(initialListWidth);
    const [width, setWidth] = useState(initialListWidth);
    const [dragging, setDragging] = useState(false);

    function update(px: number) {
        const next = clampListWidth(px);
        latest.current = next;
        setWidth(next);
    }

    function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
        if (e.button !== 0) return;
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
    }

    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (!dragging) return;
        const left = containerRef.current?.getBoundingClientRect().left ?? 0;
        update(e.clientX - left);
    }

    function endDrag() {
        if (!dragging) return;
        setDragging(false);
        persist(latest.current);
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        const step = e.shiftKey ? LIST_WIDTH_STEP * 3 : LIST_WIDTH_STEP;
        let next: number;
        switch (e.key) {
            case "ArrowLeft":
                next = latest.current - step;
                break;
            case "ArrowRight":
                next = latest.current + step;
                break;
            case "Home":
                next = LIST_WIDTH_MIN;
                break;
            case "End":
                next = LIST_WIDTH_MAX;
                break;
            default:
                return;
        }
        e.preventDefault();
        update(next);
        persist(latest.current);
    }

    function reset() {
        update(LIST_WIDTH_DEFAULT);
        persist(LIST_WIDTH_DEFAULT);
    }

    return (
        <div
            ref={containerRef}
            style={{ "--list-w": `${width}px` } as React.CSSProperties}
            className={cn(
                "relative grid h-full grid-rows-[minmax(0,1fr)] md:grid-cols-[min(var(--list-w),50%)_minmax(0,1fr)]",
                dragging && "select-none",
            )}
        >
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

            {/* Desktop only: a window-splitter handle on the pane boundary */}
            <div
                role="separator"
                aria-orientation="vertical"
                aria-label="Resize ticket list"
                aria-valuemin={LIST_WIDTH_MIN}
                aria-valuemax={LIST_WIDTH_MAX}
                aria-valuenow={width}
                tabIndex={0}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onKeyDown={onKeyDown}
                onDoubleClick={reset}
                style={{ left: "min(var(--list-w), 50%)" }}
                className="group absolute inset-y-0 z-20 hidden w-3 -translate-x-1/2 cursor-col-resize touch-none justify-center focus-visible:outline-none md:flex"
            >
                <span
                    aria-hidden
                    className={cn(
                        "w-0.5 transition-colors group-hover:bg-primary/40 group-focus-visible:bg-primary",
                        dragging && "bg-primary",
                    )}
                />
            </div>
        </div>
    );
}