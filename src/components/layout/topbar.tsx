import { UserButton } from "@clerk/nextjs";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import type { Agent } from "@/generated/prisma/client";
import { MobileNav } from "./mobile-nav";
import { SidebarContent } from "./sidebar-content";
import { CommandPaletteTrigger } from "@/features/shortcuts/components/command-palette-trigger";

type Props = { agent: Pick<Agent, "name" | "email" | "role"> };

export function Topbar({ agent }: Props) {
    return (
        <header className="flex h-15.5 shrink-0 items-center gap-2 border-b bg-background px-3 md:px-4">
            <MobileNav>
                <SidebarContent agent={agent} />
            </MobileNav>
            <CommandPaletteTrigger />
            <div className="flex-1" />
            <ThemeToggle />
            <UserButton />
        </header>
    );
}