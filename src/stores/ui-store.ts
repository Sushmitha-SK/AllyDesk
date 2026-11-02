import { create } from "zustand";

type UIState = {
    commandPaletteOpen: boolean;
    shortcutsDialogOpen: boolean;
    setCommandPaletteOpen: (open: boolean) => void;
    setShortcutsDialogOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
    commandPaletteOpen: false,
    shortcutsDialogOpen: false,
    setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
    setShortcutsDialogOpen: (open) => set({ shortcutsDialogOpen: open }),
}));