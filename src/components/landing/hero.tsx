"use client";

import { ArrowRight, Database, PlayCircle, ShieldCheck } from "lucide-react";

import { HeroItem, HeroStagger, MotionLink } from "./motion";

const springTransition = {
    type: "spring" as const,
    stiffness: 450,
    damping: 32,
    mass: 0.8,
};

const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function RollingLabel({ text }: { text: string }) {
    return (
        <span className="relative inline-flex overflow-hidden leading-tight">
            <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[120%] group-focus-visible:-translate-y-[120%] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0">
                {text}
            </span>
            <span
                aria-hidden
                className="absolute inset-0 inline-block translate-y-[120%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:hidden"
            >
                {text}
            </span>
        </span>
    );
}

export default function Hero() {
    return (
        <HeroStagger className="flex flex-col items-center px-4 pb-8 pt-10 text-center sm:pb-12 sm:pt-16">
            <HeroItem>
                <div
                    className={`inline-flex min-h-8 max-w-full items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-1.5 text-[13px] font-medium text-card-foreground shadow-sm backdrop-blur-md transition-all `}
                >
                    <span
                        aria-hidden
                        className="flex size-2 shrink-0 animate-pulse rounded-full bg-primary motion-reduce:animate-none"
                    />
                    <span>AI replies that show their sources</span>
                </div>
            </HeroItem>

            <HeroItem>
                <h1
                    id="hero-heading"
                    className="mt-5 max-w-4xl text-balance tracking-tight text-foreground sm:mt-6"
                    style={{ fontSize: "clamp(2rem, 8vw, 4.125rem)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.02em" }}
                >
                    Support faster with an AI that <br className="hidden sm:block" />
                    <span
                        className="text-primary dark:text-primary"
                        style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}
                    >
                        always shows its sources.
                    </span>
                </h1>
            </HeroItem>

            <HeroItem>
                <p
                    className="mt-4 max-w-2xl px-2 font-normal leading-relaxed text-foreground/80 sm:mt-6"
                    style={{ fontSize: "clamp(0.9375rem, 3.5vw, 1.125rem)" }}
                >
                    AllyDesk is the shared inbox where AI drafts every reply from your own help articles, points to
                    the ones it used, and your team has the final say before anything is sent.
                </p>
            </HeroItem>

            <HeroItem className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row">
                <MotionLink
                    href="/inbox"
                    whileTap={{ scale: 0.98 }}
                    transition={springTransition}
                    className={`group inline-flex w-full max-w-xs items-center justify-center gap-3 overflow-hidden rounded-full bg-foreground py-2.5 pl-6 pr-2 text-[14px] font-medium text-background shadow-xl shadow-foreground/10 transition-colors duration-200 hover:bg-foreground/90 motion-reduce:transition-none dark:shadow-none sm:w-auto sm:max-w-none ${focusRing}`}
                >
                    <RollingLabel text="Open live workspace" />
                    <span
                        aria-hidden
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background/15 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 motion-reduce:transition-none"
                    >
                        <ArrowRight className="size-4" />
                    </span>
                </MotionLink>
                <MotionLink
                    href="#how-it-works"
                    whileTap={{ scale: 0.98 }}
                    transition={springTransition}
                    className={`group inline-flex w-full max-w-xs items-center justify-center gap-2 overflow-hidden rounded-full border border-border bg-card px-6 py-3 text-[14px] font-medium text-card-foreground shadow-sm transition-colors duration-200 hover:bg-muted motion-reduce:transition-none sm:w-auto sm:max-w-none ${focusRing}`}
                >
                    <PlayCircle
                        className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:transition-none"
                        aria-hidden
                    />
                    <RollingLabel text="See how it works" />
                </MotionLink>
            </HeroItem>

            <HeroItem>
                <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-5 text-xs font-medium text-foreground/80">
                    <ShieldCheck className="size-4 shrink-0 text-status-resolved" aria-hidden />
                    <span>Your team approves every reply</span>
                    <Database  className="size-4 shrink-0 text-status-resolved" aria-hidden />
                    <span>Answers come only from your articles</span>
                </p>
            </HeroItem>
        </HeroStagger>
    );
}