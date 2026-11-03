import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function TicketNotFound() {
    return (
        <div className="grid h-full place-items-center p-6 text-center">
            <div className="space-y-3">
                <FileQuestion className="mx-auto size-10 text-muted-foreground" />
                <h2 className="font-medium">Ticket not found</h2>
                <p className="text-sm text-muted-foreground">
                    It may have been deleted, or the link is wrong.
                </p>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/inbox">Back to inbox</Link>
                </Button>
            </div>
        </div>
    );
}