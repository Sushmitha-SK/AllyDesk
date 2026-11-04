import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CustomerNotFound() {
    return (
        <div className="grid h-full place-items-center p-6 text-center">
            <div className="space-y-3">
                <FileQuestion className="mx-auto size-10 text-muted-foreground" aria-hidden />
                <h2 className="font-medium">Customer not found</h2>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/customers">Back to customers</Link>
                </Button>
            </div>
        </div>
    );
}