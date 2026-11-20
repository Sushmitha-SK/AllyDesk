"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
    ArrowLeft,
    BookOpen,
    Check,
    Database,
    ShieldCheck,
    Sparkles,
    type LucideIcon,
} from "lucide-react";

import { assets } from "@/app/assets/assets";
import { FloatingGlow, HeroItem, HeroStagger, MotionRoot } from "@/components/landing/motion";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type Variant = "sign-in" | "sign-up";

const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const COPY: Record<
    Variant,
    { eyebrow: string; title: string; accent: string; body: string }
> = {
    "sign-in": {
        eyebrow: "Welcome back",
        title: "Pick up where",
        accent: "your team left off.",
        body: "Sign in to review AI drafts, check the articles behind them, and send replies your customers can trust.",
    },
    "sign-up": {
        eyebrow: "Create your workspace",
        title: "Faster replies,",
        accent: "with every answer sourced.",
        body: "Set up AllyDesk and let AI draft from your own help articles. Nothing reaches a customer until your team approves it.",
    },
};

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
    {
        icon: BookOpen,
        title: "Add your help articles",
        body: "They are the only source the AI is allowed to use.",
    },
    {
        icon: Sparkles,
        title: "AI drafts with sources",
        body: "Every draft points to the articles it came from.",
    },
    {
        icon: ShieldCheck,
        title: "Your team approves",
        body: "A person on your team sends it, never the AI.",
    },
];

function BrandMark({ className = "" }: { className?: string }) {
    return (
        <Link
            href="/"
            aria-label="AllyDesk home"
            className={`flex w-fit items-center gap-2 rounded-full ${focusRing} ${className}`}
        >
            <Image
                src={assets.logoIcon.src}
                alt=""
                width={32}
                height={28}
                priority
                className="h-7 w-8 object-contain"
            />
            <span className="font-leagueSpartan text-lg font-bold tracking-tight text-foreground">
                AllyDesk
            </span>
        </Link>
    );
}

/** Static preview of what AllyDesk does: an AI draft, its sources, and the approval step. */
function DraftPreview() {
    return (
        <div aria-hidden className="relative">
            {/* stacked card behind, for depth */}
            <div className="absolute inset-x-5 -bottom-3 top-3 -z-10 rounded-2xl border border-border bg-card/60" />

            <div className="surfaceCard p-4 text-left sm:p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="font-mono text-[11px] text-muted-foreground">#108 · Tokyo Craft</p>
                        <p className="mt-0.5 truncate text-sm font-semibold text-card-foreground">
                            Mobile app crashes when attaching photos
                        </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                        <span className="rounded-full bg-status-open/15 px-2 py-0.5 text-[11px] font-medium text-status-open">
                            Open
                        </span>
                        <span className="rounded-full bg-priority-high/15 px-2 py-0.5 text-[11px] font-medium text-priority-high">
                            High
                        </span>
                    </div>
                </div>

                <div className="mt-4 rounded-xl border border-border bg-secondary/60 p-3.5">
                    <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary-foreground">
                            <Sparkles className="size-3.5 text-primary" />
                            AI draft
                        </span>
                        <span className="text-[11px] text-muted-foreground">Generated just now</span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-card-foreground">
                        Hi Kenji, sorry about the crash. Attaching photos needs the latest version of the app, so
                        please update it from the store and try again. If it still happens, reply here and we’ll
                        dig in.
                    </p>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-medium text-muted-foreground">Sources</span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 text-[11px] text-card-foreground">
                        <BookOpen className="size-3 text-primary" />
                        Attaching photos on mobile
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 text-[11px] text-card-foreground">
                        <BookOpen className="size-3 text-primary" />
                        Updating the app
                    </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5">
                    <span className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="size-2 rounded-full bg-status-pending" />
                        Waiting for your review
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground">
                        <Check className="size-3.5" />
                        Approve &amp; send
                    </span>
                </div>
            </div>
        </div>
    );
}

function Steps() {
    return (
        <ol className="space-y-3">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
                <li
                    key={title}
                    className="flex items-start gap-3.5 rounded-2xl border border-border bg-card/80 p-3.5 backdrop-blur-sm"
                >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                        <Icon className="size-4.5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-card-foreground">
                            <span className="mr-1.5 font-mono text-xs text-muted-foreground">0{i + 1}</span>
                            {title}
                        </p>
                        <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                </li>
            ))}
        </ol>
    );
}

function TrustRow() {
    return (
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-foreground/80">
            <ShieldCheck className="size-4 shrink-0 text-status-resolved" aria-hidden />
            <span>Your team approves every reply</span>
            <Database className="ml-2 size-4 shrink-0 text-status-resolved" aria-hidden />
            <span>Answers come only from your articles</span>
        </p>
    );
}

export function AuthShell({ variant, children }: { variant: Variant; children: ReactNode }) {
    const copy = COPY[variant];

    return (
        <MotionRoot>
            <div className="grid min-h-dvh bg-background lg:grid-cols-[1.05fr_1fr] font-sans">
                <aside className="relative hidden overflow-hidden border-r border-border bg-secondary/40 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-between lg:p-10 xl:p-14">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(color-mix(in_srgb,var(--primary)_28%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
                    />
                    <FloatingGlow className="pointer-events-none absolute -left-24 -top-32 size-96 rounded-full bg-primary/20 blur-3xl" />
                    <FloatingGlow className="pointer-events-none absolute -bottom-32 -right-24 size-96 rounded-full bg-primary/15 blur-3xl" />

                    <div className="relative z-10">
                        <BrandMark />
                    </div>

                    <HeroStagger className="relative z-10 my-auto w-full max-w-lg space-y-7 py-8">
                        <HeroItem>
                            <div className="inline-flex min-h-8 items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-1.5 text-[13px] font-medium text-card-foreground shadow-sm backdrop-blur-md">
                                <span
                                    aria-hidden
                                    className="size-2 animate-pulse rounded-full bg-primary motion-reduce:animate-none"
                                />
                                {copy.eyebrow}
                            </div>
                        </HeroItem>

                        <HeroItem>
                            <h1 className="text-balance text-[clamp(2rem,3.2vw,2.75rem)] font-medium leading-[1.08] tracking-tight text-foreground">
                                {copy.title} <span className="text-primary">{copy.accent}</span>
                            </h1>
                            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-foreground/80">
                                {copy.body}
                            </p>
                        </HeroItem>

                        <HeroItem>{variant === "sign-in" ? <DraftPreview /> : <Steps />}</HeroItem>

                        {variant === "sign-in" && (
                            <HeroItem>
                                <TrustRow />
                            </HeroItem>
                        )}
                    </HeroStagger>

                    <p className="relative z-10 text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} AllyDesk. All rights reserved.
                    </p>
                </aside>

                <section className="relative flex min-h-dvh flex-col px-5 py-5 sm:px-10 lg:min-h-0 lg:px-12">
                    <div className="flex items-center justify-between">
                        <BrandMark className="lg:hidden" />
                        <Link
                            href="/"
                            className={`hidden items-center gap-1.5 rounded-full px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground lg:inline-flex ${focusRing}`}
                        >
                            <ArrowLeft className="size-4" aria-hidden />
                            Back to home
                        </Link>
                        <ThemeToggle />
                    </div>

                    <div className="flex flex-1 items-center justify-center py-10">
                        <div className="w-full max-w-104">{children}</div>
                    </div>

                    <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                        <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
                        Customer conversations are sensitive, so the workspace stays behind sign-in.
                    </p>
                </section>
            </div>
        </MotionRoot>
    );
}
