"use client";

import Link from "next/link";

import { ErrorState } from "@/components/layout/error-state";
import { Button } from "@/components/ui/button";

export default function TicketError(props: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <ErrorState
            {...props}
            title="Couldn't load this ticket"
            description="Something failed while loading the conversation."
        >
            <Button size="sm" variant="outline" asChild className="md:hidden">
                <Link href="/inbox">Back to inbox</Link>
            </Button>
        </ErrorState>
    );
}