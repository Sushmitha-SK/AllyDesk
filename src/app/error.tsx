"use client";

import { ErrorState } from "@/components/layout/error-state";

export default function RootError(props: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <main className="grid min-h-screen place-items-center">
            <ErrorState {...props} />
        </main>
    );
}