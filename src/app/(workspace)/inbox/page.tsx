import { UserButton } from "@clerk/nextjs";

import { getCurrentAgent } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme/theme-toggle";
export const instant = false;


export default async function InboxPage() {
    const agent = await getCurrentAgent();

    return (
        <main className="mx-auto max-w-2xl space-y-4 p-6">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Inbox</h1>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <UserButton />
                </div>
            </header>
            <p className="text-muted-foreground">
                Signed in as <span className="font-medium text-foreground">{agent.name}</span> ({agent.email}), role {agent.role}.
            </p>
        </main>
    );
}