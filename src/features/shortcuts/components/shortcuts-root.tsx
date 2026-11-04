"use client";

import { useGlobalShortcuts } from "../use-shortcuts";
import { CommandPalette } from "./command-palette";
import { ShortcutsDialog } from "./shortcuts-dialog";

export function ShortcutsRoot({ currentAgentId }: { currentAgentId: string }) {
    useGlobalShortcuts();

    return (
        <>
            <CommandPalette currentAgentId={currentAgentId} />
            <ShortcutsDialog />
        </>
    );
}