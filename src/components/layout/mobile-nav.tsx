"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Open state is tied to the pathname it was opened on, so navigating closes it.
    const [openedOn, setOpenedOn] = useState<string | null>(null);
    const open = openedOn === pathname;

    return (
        <Sheet open={open} onOpenChange={(next) => setOpenedOn(next ? pathname : null)}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
                    <Menu className="size-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 gap-0 bg-sidebar p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
                {children}
            </SheetContent>
        </Sheet>
    );
}