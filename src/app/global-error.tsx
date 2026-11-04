"use client";

import { Button } from "@/components/ui/button";
import "./globals.css";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className="grid min-h-screen place-items-center font-sans">
                <div role="alert" className="space-y-3 p-6 text-center">
                    <h1 className="text-lg font-semibold">SupportFlow hit a critical error</h1>
                    {error.digest && (
                        <p className="font-mono text-xs text-muted-foreground">Reference: {error.digest}</p>
                    )}
                    <Button onClick={reset}>Reload</Button>
                </div>
            </body>
        </html>
    );
}