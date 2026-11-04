"use client";

import { ErrorState } from "@/components/layout/error-state";

export default function TicketListError(props: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <ErrorState
            {...props}
            title="Couldn't load tickets"
            description="The ticket list failed to load. Your open conversation isn't affected."
        />
    );
}