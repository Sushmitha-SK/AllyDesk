import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default async function TicketPage({
    params,
}: {
    params: Promise<{ ticketId: string }>;
}) {
    const { ticketId } = await params;

    return (
        <div className="p-4 md:p-6">
            <Button variant="ghost" size="sm" asChild className="mb-4 md:hidden">
                <Link href="/inbox">
                    <ArrowLeft className="size-4" /> Back to inbox
                </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
                Ticket <code className="font-mono text-foreground">{ticketId}</code>. The conversation arrives in Step 7.
            </p>
        </div>
    );
}