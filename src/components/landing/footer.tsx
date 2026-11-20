"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { assets } from "@/app/assets/assets";
import { FOOTER_COLUMNS } from "@/lib/data";

export default function Footer() {
    const handleScrollTop = () => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main-content")?.focus({ preventScroll: true });
    };

    return (
        <footer className="border-t border-border bg-muted/30 px-4 py-14 sm:px-8">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <div className="col-span-2 min-w-0 sm:col-span-3 md:col-span-1">
                    <Link
                        href="/"
                        aria-label="AllyDesk home"
                        className="inline-flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <Image
                            src={assets.logoIcon.src}
                            alt=""
                            width={32}
                            height={28}
                            className="h-6 w-7 object-contain sm:h-7 sm:w-8"
                        />
                        <span className="font-leagueSpartan text-base font-bold tracking-tight text-foreground">
                            AllyDesk
                        </span>
                    </Link>

                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                        A support inbox where AI drafts from your help articles and your team stays in charge.
                    </p>
                </div>

                {FOOTER_COLUMNS.map((col) => (
                    <nav key={col.title} aria-label={col.title} className="min-w-0">
                        <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                        <ul className="mt-3.5 space-y-2.5 text-sm text-muted-foreground">
                            {col.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="wrap-break-word rounded-sm transition-colors hover:text-secondary-foreground focus-visible:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none dark:hover:text-primary dark:focus-visible:text-primary">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>

            <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
                <p>&copy; {new Date().getFullYear()} AllyDesk. All rights reserved.</p>

                <button
                    type="button"
                    onClick={handleScrollTop}
                    className="group inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                >
                    <span>Back to top</span>
                    <ArrowUp
                        aria-hidden
                        className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                    />
                </button>
            </div>
        </footer>
    );
}