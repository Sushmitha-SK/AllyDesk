"use client";

import { useSyncExternalStore } from "react";

const OPTIONS = {
    datetime: { dateStyle: "medium", timeStyle: "short" },
    date: { dateStyle: "medium" },
} as const satisfies Record<string, Intl.DateTimeFormatOptions>;

type Variant = keyof typeof OPTIONS;

const make = (variant: Variant, timeZone?: string) =>
    new Intl.DateTimeFormat("en", { ...OPTIONS[variant], timeZone });

const local = { datetime: make("datetime"), date: make("date") };
const utc = { datetime: make("datetime", "UTC"), date: make("date", "UTC") };

const subscribe = () => () => { }; // the timezone never changes while the page is open

/**
 * Server render and hydration use UTC (getServerSnapshot), then React swaps in
 * the viewer's local time. Strings are primitives, so snapshots are stable.
 */
export function LocalTime({
    date,
    variant = "datetime",
}: {
    date: Date;
    variant?: Variant;
}) {
    const text = useSyncExternalStore(
        subscribe,
        () => local[variant].format(date),
        () => utc[variant].format(date),
    );

    return <time dateTime={date.toISOString()}>{text}</time>;
}