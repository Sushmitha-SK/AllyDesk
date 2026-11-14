"use client";

import { ArrowRight, ChevronRight, PlayCircle, ShieldCheck } from "lucide-react";

import { HeroItem, HeroStagger, MotionLink } from "./motion";

export default function Hero() {
    return (
        <HeroStagger className="flex flex-col items-center px-4 pb-8 pt-10 text-center sm:pb-12 sm:pt-16">
            <HeroItem>
                <a
                    href="#features"
                    className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/90 px-4 py-1.5 text-[13px] font-medium text-neutral-900 shadow-sm backdrop-blur-md transition-all hover:border-black/10"
                >
                    <span className="flex size-2 animate-pulse rounded-full bg-primary" />
                    <span>AI replies that show their sources</span>
                    <ChevronRight className="size-3 text-neutral-500" />
                </a>
            </HeroItem>

            <HeroItem>
                <h1
                    className="mt-5 max-w-4xl tracking-tight text-neutral-900 sm:mt-6"
                    style={{ fontSize: "clamp(32px, 8vw, 66px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.02em" }}
                >
                    Support faster with an AI that <br />
                    <span
                        className="text-primary"
                        style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}
                    >
                        always shows its sources.
                    </span>
                </h1>
            </HeroItem>

            <HeroItem>
                <p
                    className="mt-4 max-w-2xl px-2 font-normal leading-relaxed text-neutral-700 sm:mt-6"
                    style={{ fontSize: "clamp(15px, 3.5vw, 18px)" }}
                >
                    AllyDesk is the shared inbox where AI drafts every reply from your own help articles, points to
                    the ones it used, and your team has the final say before anything is sent.
                </p>
            </HeroItem>

            <HeroItem className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row">
                <MotionLink
                    href="/inbox"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center gap-3 rounded-full bg-[#0b0f1a] py-2.5 pl-6 pr-2 text-[14px] font-medium text-white shadow-xl shadow-black/10"
                >
                    Open live workspace
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
                        <ArrowRight className="size-4" aria-hidden />
                    </span>
                </MotionLink>
                <MotionLink
                    href="#how-it-works"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-6 py-3 text-[14px] font-medium text-neutral-900 shadow-sm"
                >
                    <PlayCircle className="size-4 text-neutral-500" aria-hidden /> See how it works
                </MotionLink>
            </HeroItem>

            <HeroItem>
                <p className="flex items-center gap-2 pt-5 text-xs font-medium text-neutral-600">
                    <ShieldCheck className="size-4 text-emerald-600" aria-hidden />
                    Your team approves every reply
                    <span aria-hidden>•</span>
                    Answers come only from your articles
                </p>
            </HeroItem>
        </HeroStagger>
    );
}