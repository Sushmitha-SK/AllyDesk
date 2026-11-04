import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Agent } from "@/generated/prisma/client";
import { NavLinks } from "./nav-links";
import { env } from "@/lib/env";

type Props = { agent: Pick<Agent, "name" | "email" | "role"> };

export function SidebarContent({ agent }: Props) {
    return (
        <div className="flex h-full flex-col">
            <div className="flex h-14 shrink-0 items-center px-4">
                <Link href="/inbox" className="flex items-center gap-2 font-semibold tracking-tight">
                    <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
                        <Sparkles className="size-4" />
                    </span>
                    AllyDesk
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-2">
                <NavLinks />
            </div>

            <div className="shrink-0 border-t border-sidebar-border p-4">
                <p className="truncate text-sm font-medium">{agent.name}</p>
                <p className="truncate text-xs text-muted-foreground">{agent.email}</p>
                <Badge variant="secondary" className="mt-2">
                    {agent.role === "ADMIN" ? "Admin" : "Agent"}
                </Badge>
            </div>

            {env.DEMO_RESET === "true" && (
                <p className="mt-3 text-xs text-muted-foreground">Demo data resets daily at 03:00 UTC.</p>
            )}
        </div>
    );
}