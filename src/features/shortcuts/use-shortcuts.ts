"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { NAV_ITEMS } from "@/components/layout/nav-items";
import { useUIStore } from "@/stores/ui-store";

// "g" then the first letter of a nav item: g i = Inbox, g c = Customers, g s = Settings
const GO_TO: Record<string, string> = Object.fromEntries(
    NAV_ITEMS.map((item) => [item.label[0]!.toLowerCase(), item.href]),
);
const SEQUENCE_TIMEOUT_MS = 1000;

function isTyping(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return false;
    return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

function overlayOpen() {
    return !!document.querySelector(
        '[role="dialog"], [role="alertdialog"], [role="menu"], [role="listbox"]',
    );
}

/** Focuses an element only if it is actually rendered (not display:none). */
function focusById(id: string) {
    const el = document.getElementById(id);
    if (el && el.getClientRects().length > 0) {
        el.focus();
        return true;
    }
    return false;
}

export function useGlobalShortcuts() {
    const router = useRouter();

    useEffect(() => {
        let gPressedAt = 0;

        function moveSelection(direction: 1 | -1) {
            const rows = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-ticket-row]"));
            if (rows.length === 0) return;

            const current = rows.findIndex((row) => row.getAttribute("aria-current") === "page");
            const next =
                current === -1 ? rows[direction === 1 ? 0 : rows.length - 1] : rows[current + direction];
            const href = next?.getAttribute("href");
            if (!next || !href) return;

            router.push(href);
            next.scrollIntoView({ block: "nearest" });
        }

        function onKeyDown(e: KeyboardEvent) {
            if (e.defaultPrevented || e.isComposing) return;

            // Command palette works everywhere, including inside inputs
            if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === "k") {
                e.preventDefault();
                const ui = useUIStore.getState();
                ui.setShortcutsDialogOpen(false);
                ui.setCommandPaletteOpen(!ui.commandPaletteOpen);
                return;
            }

            if (e.metaKey || e.ctrlKey || e.altKey) return;
            if (isTyping(e.target) || overlayOpen()) return;

            const key = e.key.toLowerCase();

            // Second key of a "g" sequence
            if (gPressedAt && Date.now() - gPressedAt < SEQUENCE_TIMEOUT_MS) {
                gPressedAt = 0;
                const destination = GO_TO[key];
                if (destination) {
                    e.preventDefault();
                    router.push(destination);
                    return;
                }
            }

            switch (key) {
                case "?":
                    e.preventDefault();
                    useUIStore.getState().setShortcutsDialogOpen(true);
                    break;
                case "/":
                    e.preventDefault(); // don't type "/" into the field we're about to focus
                    if (!focusById("ticket-search")) router.push("/inbox");
                    break;
                case "r":
                    e.preventDefault();
                    focusById("reply-body");
                    break;
                case "j":
                    moveSelection(1);
                    break;
                case "k":
                    moveSelection(-1);
                    break;
                case "g":
                    gPressedAt = Date.now();
                    break;
            }
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [router]);
}