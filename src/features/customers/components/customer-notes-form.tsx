"use client";

import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateCustomerNotesAction } from "../actions";

export function CustomerNotesForm({
    customerId,
    initialNotes,
}: {
    customerId: string;
    initialNotes: string | null;
}) {
    const [notes, setNotes] = useState(initialNotes ?? "");
    const [saved, setSaved] = useState(initialNotes ?? "");
    const [isPending, startTransition] = useTransition();
    const dirty = notes.trim() !== saved.trim();

    function save() {
        startTransition(async () => {
            const result = await updateCustomerNotesAction({ customerId, notes });
            if (result.ok) {
                setSaved(notes);
                toast.success("Notes saved");
            } else {
                toast.error(result.error); // the text stays so nothing is lost
            }
        });
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (dirty && !isPending) save();
            }}
            className="space-y-2"
        >
            <label htmlFor="customer-notes" className="sr-only">
                Customer notes
            </label>
            <Textarea
                id="customer-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                readOnly={isPending}
                rows={4}
                maxLength={2000}
                placeholder="Internal notes about this customer. Agents see these on every ticket."
            />
            <Button type="submit" size="sm" disabled={!dirty || isPending}>
                {isPending && <Loader2 className="size-4 animate-spin" aria-hidden />}
                Save notes
            </Button>
        </form>
    );
}