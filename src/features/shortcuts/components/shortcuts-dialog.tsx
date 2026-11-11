"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUIStore } from "@/stores/ui-store";
import { ShortcutList } from "./shortcut-list";

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
                <ShortcutList />
            </DialogContent>
        </Dialog>
    );
}