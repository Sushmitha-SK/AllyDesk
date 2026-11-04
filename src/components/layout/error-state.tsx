"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
    error: Error & { digest?: string };
    reset: () => void;
    title?: string;
    description?: string;
    className?: string;
    children?: React.ReactNode; // extra actions, e.g. a back link
};

export function ErrorState({
    error,
    reset,
    title = "Something went wrong",
    description = "An unexpected error occurred. You can try again.",
    className,
    children,
}: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        console.error(error);
    }, [error]);

    // reset() alone re-renders with the same failed server data, so refresh first
    function retry() {
        startTransition(() => {
            router.refresh();
            reset();
        });
    }

    return (
        <div
            role="alert"
            className={cn("flex flex-col items-center gap-3 px-6 py-16 text-center", className)}
        >
            <AlertTriangle className="size-10 text-destructive" aria-hidden />
            <h2 className="font-medium">{title}</h2>
            <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
            {error.digest && (
                <p className="font-mono text-xs text-muted-foreground">Reference: {error.digest}</p>
            )}
            <div className="flex gap-2 pt-1">
                <Button size="sm" onClick={retry} disabled={isPending}>
                    {isPending && <Loader2 className="size-4 animate-spin" aria-hidden />}
                    Try again
                </Button>
                {children}
            </div>
        </div>
    );
}