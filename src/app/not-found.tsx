import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="grid min-h-screen place-items-center p-6 text-center">
            <div className="space-y-3">
                <FileQuestion className="mx-auto size-10 text-muted-foreground" aria-hidden />
                <h1 className="text-lg font-semibold">Page not found</h1>
                <p className="text-sm text-muted-foreground">That page doesn't exist or was moved.</p>
                <Button asChild>
                    <Link href="/inbox">Go to inbox</Link>
                </Button>
            </div>
        </main>
    );
}