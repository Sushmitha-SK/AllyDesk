"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUIStore } from "@/stores/ui-store";
import { Kbd } from "./kbd";

type Shortcut = { keys: string[]; label: string; sequence?: boolean };

const GROUPS: { title: string; items: Shortcut[] }[] = [
    {
        title: "General",
        items: [
            { keys: ["Ctrl/⌘", "K"], label: "Open command palette" },
            { keys: ["?"], label: "Show keyboard shortcuts" },
            { keys: ["g", "i"], label: "Go to Inbox", sequence: true },
            { keys: ["g", "c"], label: "Go to Customers", sequence: true },
            { keys: ["g", "s"], label: "Go to Settings", sequence: true },
        ],
    },
    {
        title: "Inbox",
        items: [
            { keys: ["/"], label: "Focus ticket search" },
            { keys: ["j"], label: "Next ticket" },
            { keys: ["k"], label: "Previous ticket" },
        ],
    },
    {
        title: "Ticket",
        items: [
            { keys: ["r"], label: "Focus the reply box" },
            { keys: ["Ctrl/⌘", "Enter"], label: "Send reply" },
        ],
    },
];

export function ShortcutsDialog() {
    const open = useUIStore((s) => s.shortcutsDialogOpen);
    const setOpen = useUIStore((s) => s.setShortcutsDialogOpen);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Keyboard shortcuts</DialogTitle>
                    <DialogDescription>
                        Shortcuts are paused while you type in a field or have a menu open.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5">
                    {GROUPS.map((group) => (
                        <section key={group.title} aria-label={group.title}>
                            <h3 className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                {group.title}
                            </h3>
                            <dl className="space-y-2">
                                {group.items.map((item) => (
                                    <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
                                        <dt>{item.label}</dt>
                                        <dd className="flex items-center gap-1">
                                            {item.keys.map((key, i) => (
                                                <span key={key} className="flex items-center gap-1">
                                                    {i > 0 && (
                                                        <span className="text-xs text-muted-foreground">
                                                            {item.sequence ? "then" : "+"}
                                                        </span>
                                                    )}
                                                    <Kbd>{key}</Kbd>
                                                </span>
                                            ))}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </section>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}