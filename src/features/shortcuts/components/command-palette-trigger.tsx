"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/ui-store";
import { Kbd } from "./kbd";

export function CommandPaletteTrigger() {
    const setOpen = useUIStore((s) => s.setCommandPaletteOpen);

    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            aria-label="Open command palette"
            className="w-full max-w-64 justify-start gap-2 font-normal text-muted-foreground"
        >
            <Search className="size-4 shrink-0" aria-hidden />
            <span className="truncate">Search or jump to…</span>
            <Kbd className="ml-auto hidden md:inline-flex">Ctrl K</Kbd>
        </Button>
    );
}