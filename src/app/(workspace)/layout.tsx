import { SidebarContent } from "@/components/layout/sidebar-content";
import { Topbar } from "@/components/layout/topbar";
import { getCurrentAgent } from "@/lib/auth";

export default async function WorkspaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const agent = await getCurrentAgent();

    return (
        <div className="flex h-dvh overflow-hidden">
            <aside className="hidden w-60 shrink-0 border-r border-sidebar-border bg-sidebar md:block">
                <SidebarContent agent={agent} />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar agent={agent} />
                <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}