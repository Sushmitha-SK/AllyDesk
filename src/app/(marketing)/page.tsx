import Link from "next/link";
import { ArrowRight, BookOpen, Command, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";

const FEATURES = [
    {
        icon: Sparkles,
        title: "AI reply drafts",
        text: "Streaming drafts you can edit, retry or discard. Nothing sends without an agent's approval.",
    },
    {
        icon: BookOpen,
        title: "Grounded in your help center",
        text: "Each draft shows the knowledge-base articles it was given, so agents can verify before sending.",
    },
    {
        icon: Command,
        title: "Built for the keyboard",
        text: "Command palette, j/k navigation and quick actions keep agents out of the mouse.",
    },
] as const;

export default function LandingPage() {
    return (
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-6">
            <header className="flex h-16 items-center justify-between">
                <span className="flex items-center gap-2 font-semibold tracking-tight">
                    <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
                        <Sparkles className="size-4" aria-hidden />
                    </span>
                    AllyDesk
                </span>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button variant="ghost" asChild>
                        <Link href="/sign-in">Sign in</Link>
                    </Button>
                </div>
            </header>

            <main className="flex flex-1 flex-col justify-center gap-12 py-16">
                <div className="max-w-2xl space-y-5">
                    <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                        Answer customers faster, with an AI that shows its sources.
                    </h1>
                    <p className="text-lg text-muted-foreground text-pretty">
                        A support workspace with a server-rendered inbox, live ticket controls and AI-assisted
                        replies that agents always review.
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/inbox">
                            Open the workspace <ArrowRight className="size-4" aria-hidden />
                        </Link>
                    </Button>
                </div>

                <ul className="grid gap-4 sm:grid-cols-3">
                    {FEATURES.map(({ icon: Icon, title, text }) => (
                        <li key={title} className="space-y-2 rounded-lg border bg-card p-4">
                            <Icon className="size-5 text-primary" aria-hidden />
                            <h2 className="font-medium">{title}</h2>
                            <p className="text-sm text-muted-foreground">{text}</p>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}