"use client";

import { useEffect, useRef } from "react";

/** Scrolls the conversation to its latest message when it mounts. */
export function ScrollAnchor() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current?.scrollIntoView({ block: "end" });
    }, []);

    return <div ref={ref} aria-hidden />;
}