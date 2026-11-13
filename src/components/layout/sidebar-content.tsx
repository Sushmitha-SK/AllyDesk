import Link from "next/link";
import { Sparkles, LogOut, ChevronUp } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

import { Badge } from "@/components/ui/badge";
import type { Agent } from "@/generated/prisma/client";
import { NavLinks } from "./nav-links";
import { env } from "@/lib/env";

type Props = { agent: Pick<Agent, "name" | "email" | "role"> };

export function SidebarContent({ agent }: Props) {
    // Generate agent initials for a sleek fallback avatar
    const initials = agent.name
        ? agent.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()
        : "AD";

    return (
        <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground select-none">
            {/* Brand Header */}
            <div className="flex h-16 shrink-0 items-center px-6 border-b border-sidebar-border/60">
                <Link
                    href="/inbox"
                    className="flex items-center gap-3 font-bold tracking-tight text-foreground group transition-opacity hover:opacity-90"
                >
                    <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20 transition-transform group-hover:scale-105">
                        <Sparkles className="size-4" />
                    </span>
                    <span className="text-lg bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                        AllyDesk
                    </span>
                </Link>
            </div>

            {/* Navigation Links Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
                <NavLinks />
            </div>

            {/* Demo Reset Notice (If enabled) */}
            {env.DEMO_RESET === "true" && (
                <div className="mx-4 mb-3 p-2.5 rounded-lg bg-secondary/50 border border-border/50 text-[11px] text-muted-foreground text-center">
                    ✨ Demo data resets daily at <span className="font-semibold text-foreground">03:00 UTC</span>.
                </div>
            )}

            {/* Agent Profile & Actions Footer */}
            <div className="shrink-0 border-t border-sidebar-border p-4 bg-sidebar/50">
                <div className="flex items-center justify-between gap-3 p-2 rounded-xl border border-sidebar-border/80 bg-card shadow-xs">
                    <div className="flex items-center gap-3 min-w-0">
                        {/* Avatar */}
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs border border-primary/20">
                            {initials}
                        </div>
                        {/* Name & Email */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-card-foreground">
                                {agent.name}
                            </p>
                            <p className="truncate text-[11px] text-muted-foreground">
                                {agent.email}
                            </p>
                        </div>
                    </div>

                    {/* Quick Sign Out Action */}
                    <SignOutButton>
                        <button
                            title="Sign Out"
                            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                        >
                            <LogOut className="size-4" />
                        </button>
                    </SignOutButton>
                </div>

                {/* Role Badge Indicator */}
                <div className="flex items-center justify-between mt-3 px-1">
                    <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                        Access Level
                    </span>
                    <Badge
                        variant={agent.role === "ADMIN" ? "default" : "secondary"}
                        className="text-[10px] px-2 py-0.5 font-medium tracking-wide shadow-none"
                    >
                        {agent.role === "ADMIN" ? "Administrator" : "Support Agent"}
                    </Badge>
                </div>
            </div>
        </div>
    );
}