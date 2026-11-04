"use client";

import { ErrorState } from "@/components/layout/error-state";

export default function WorkspaceError(props: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorState {...props} className="h-full justify-center py-0" />;
}