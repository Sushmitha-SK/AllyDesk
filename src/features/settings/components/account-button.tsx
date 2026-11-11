"use client";

import { useClerk } from "@clerk/nextjs";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AccountButton() {
    const { openUserProfile } = useClerk();

    return (
        <Button type="button" variant="outline" size="sm" onClick={() => openUserProfile()}>
            <ShieldCheck className="size-4" aria-hidden /> Manage email, password and security
        </Button>
    );
}