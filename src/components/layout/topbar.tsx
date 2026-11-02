import { UserButton } from "@clerk/nextjs";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import type { Agent } from "@/generated/prisma/client";
import { MobileNav } from "./mobile-nav";
import { SidebarContent } from "./sidebar-content";

type Props = { agent: Pick<Agent, "name" | "email" | "role"> };

export function Topbar({ agent }: Props) {
    return (
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-3 md:px-4">
            <MobileNav>
                <SidebarContent agent={agent} />
            </MobileNav>

            {/* Step 10 adds the command palette trigger here */}
            <div className="flex-1" />

            <ThemeToggle />
            <UserButton />
        </header>
    );
}