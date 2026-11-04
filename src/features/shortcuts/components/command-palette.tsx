"use client";

import {
    Archive,
    CheckCircle2,
    Clock,
    Keyboard,
    Loader2,
    Monitor,
    Moon,
    RotateCcw,
    Sun,
    UserCheck,
    type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { NAV_ITEMS } from "@/components/layout/nav-items";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { searchTicketsAction, updateTicketAction } from "@/features/tickets/actions";
import { TicketStatusBadge } from "@/features/tickets/components/ticket-status-badge";
import type { TicketSearchHit } from "@/features/tickets/queries";
import type { UpdateTicketInput } from "@/features/tickets/schemas";
import { useUIStore } from "@/stores/ui-store";

type Patch = Pick<UpdateTicketInput, "status" | "assigneeId">;
type TicketAction = { label: string; icon: LucideIcon; patch: Patch; done: string };

const THEMES = [
    { label: "Light theme", value: "light", icon: Sun },
    { label: "Dark theme", value: "dark", icon: Moon },
    { label: "System theme", value: "system", icon: Monitor },
] as const;

function PaletteContent({
    currentAgentId,
    close,
}: {
    currentAgentId: string;
    close: () => void;
}) {
    const router = useRouter();
    const { ticketId } = useParams<{ ticketId?: string }>();
    const { setTheme } = useTheme();
    const setShortcutsOpen = useUIStore((s) => s.setShortcutsDialogOpen);

    const [query, setQuery] = useState("");
    const [hits, setHits] = useState<TicketSearchHit[]>([]);
    const [searching, startSearch] = useTransition();
    const [, startRun] = useTransition();

    // Debounced server search; `cancelled` drops stale responses
    useEffect(() => {
        let cancelled = false;
        const timer = setTimeout(
            () => {
                startSearch(async () => {
                    const result = await searchTicketsAction(query);
                    if (!cancelled) setHits(result);
                });
            },
            query ? 200 : 0,
        );
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [query]);

    const needle = query.trim().toLowerCase();
    const matches = (label: string) => !needle || label.toLowerCase().includes(needle);

    const ticketActions: TicketAction[] = ticketId
        ? [
            { label: "Mark as resolved", icon: CheckCircle2, patch: { status: "RESOLVED" as const }, done: "Ticket resolved" },
            { label: "Set to pending", icon: Clock, patch: { status: "PENDING" as const }, done: "Ticket set to pending" },
            { label: "Reopen ticket", icon: RotateCcw, patch: { status: "OPEN" as const }, done: "Ticket reopened" },
            { label: "Close ticket", icon: Archive, patch: { status: "CLOSED" as const }, done: "Ticket closed" },
            { label: "Assign to me", icon: UserCheck, patch: { assigneeId: currentAgentId }, done: "Assigned to you" },
        ].filter((a) => matches(a.label))
        : [];

    const navItems = NAV_ITEMS.filter((item) => matches(item.label));
    const themes = THEMES.filter((t) => matches(t.label));
    const showHelp = matches("Keyboard shortcuts");

    function go(href: string) {
        close();
        router.push(href);
    }

    function run(action: TicketAction) {
        if (!ticketId) return;
        close();
        startRun(async () => {
            const result = await updateTicketAction({ ticketId, ...action.patch });
            if (result.ok) toast.success(action.done);
            else toast.error(result.error);
        });
    }

    return (
        <Command shouldFilter={false} className="**:[[cmdk-group-heading]]:px-2">
            <CommandInput
                value={query}
                onValueChange={setQuery}
                placeholder="Search tickets or type a command…"
            />
            <CommandList>
                {searching && (
                    <p
                        role="status"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground"
                    >
                        <Loader2 className="size-3 animate-spin" aria-hidden /> Searching…
                    </p>
                )}
                <CommandEmpty>No results found.</CommandEmpty>

                {hits.length > 0 && (
                    <CommandGroup heading={needle ? "Tickets" : "Recent tickets"}>
                        {hits.map((t) => (
                            <CommandItem
                                key={t.id}
                                value={`ticket-${t.id}`}
                                onSelect={() => go(`/inbox/${t.id}`)}
                            >
                                <span className="font-mono text-xs text-muted-foreground">#{t.number}</span>
                                <span className="truncate">{t.subject}</span>
                                <span className="ml-auto hidden shrink-0 text-xs text-muted-foreground sm:inline">
                                    {t.customer.name}
                                </span>
                                <TicketStatusBadge status={t.status} className="shrink-0 px-1.5 py-0 text-[10px]" />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                {ticketActions.length > 0 && (
                    <CommandGroup heading="This ticket">
                        {ticketActions.map((action) => (
                            <CommandItem key={action.label} value={action.label} onSelect={() => run(action)}>
                                <action.icon aria-hidden />
                                {action.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                {navItems.length > 0 && (
                    <CommandGroup heading="Go to">
                        {navItems.map(({ href, label, icon: Icon }) => (
                            <CommandItem key={href} value={`go-${href}`} onSelect={() => go(href)}>
                                <Icon aria-hidden />
                                {label}
                                <CommandShortcut>G {label[0]}</CommandShortcut>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                {(themes.length > 0 || showHelp) && (
                    <CommandGroup heading="Preferences">
                        {themes.map(({ label, value, icon: Icon }) => (
                            <CommandItem
                                key={value}
                                value={`theme-${value}`}
                                onSelect={() => {
                                    setTheme(value);
                                    close();
                                }}
                            >
                                <Icon aria-hidden />
                                {label}
                            </CommandItem>
                        ))}
                        {showHelp && (
                            <CommandItem
                                value="shortcuts-help"
                                onSelect={() => {
                                    close();
                                    setShortcutsOpen(true);
                                }}
                            >
                                <Keyboard aria-hidden />
                                Keyboard shortcuts
                                <CommandShortcut>?</CommandShortcut>
                            </CommandItem>
                        )}
                    </CommandGroup>
                )}
            </CommandList>
        </Command>
    );
}

export function CommandPalette({ currentAgentId }: { currentAgentId: string }) {
    const open = useUIStore((s) => s.commandPaletteOpen);
    const setOpen = useUIStore((s) => s.setCommandPaletteOpen);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="top-[20%] translate-y-0 overflow-hidden p-0 sm:max-w-xl" showCloseButton={false}>
                <DialogHeader className="sr-only">
                    <DialogTitle>Command palette</DialogTitle>
                    <DialogDescription>Search tickets, run actions on the open ticket, or jump to a page.</DialogDescription>
                </DialogHeader>
                {/* Mounted only while open, so the query and results reset every time */}
                <PaletteContent currentAgentId={currentAgentId} close={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}