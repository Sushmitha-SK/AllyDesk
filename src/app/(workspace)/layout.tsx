import { SidebarContent } from "@/components/layout/sidebar-content";
import { Topbar } from "@/components/layout/topbar";
import { ShortcutsRoot } from "@/features/shortcuts/components/shortcuts-root";
import { getCurrentAgent } from "@/lib/auth";

export default async function WorkspaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const agent = await getCurrentAgent();

    return (
        <div className="flex h-dvh overflow-hidden">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
            >
                Skip to content
            </a>
            <aside className="hidden w-60 shrink-0 border-r border-sidebar-border bg-sidebar md:block">
                <SidebarContent agent={agent} />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar agent={agent} />
                <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
            </div>

            <ShortcutsRoot currentAgentId={agent.id} />
        </div>




    );
}