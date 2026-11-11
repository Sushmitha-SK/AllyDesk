"use client";

import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updatePreferencesAction } from "../actions";

type Prefs = { signature: string; pendingAfterReply: boolean; aiDraftsEnabled: boolean };

function Toggle({
    id,
    label,
    description,
    checked,
    onChange,
}: {
    id: string;
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div className="space-y-0.5">
                <label htmlFor={id} className="text-sm font-medium">
                    {label}
                </label>
                <p id={`${id}-desc`} className="text-xs text-muted-foreground">
                    {description}
                </p>
            </div>
            <Switch id={id} checked={checked} onCheckedChange={onChange} aria-describedby={`${id}-desc`} />
        </div>
    );
}

export function PreferencesForm({ initial }: { initial: Prefs }) {
    const [prefs, setPrefs] = useState<Prefs>(initial);
    const [saved, setSaved] = useState<Prefs>(initial);
    const [isPending, startTransition] = useTransition();

    const dirty =
        prefs.signature.trim() !== saved.signature.trim() ||
        prefs.pendingAfterReply !== saved.pendingAfterReply ||
        prefs.aiDraftsEnabled !== saved.aiDraftsEnabled;

    function save() {
        startTransition(async () => {
            const result = await updatePreferencesAction(prefs);
            if (result.ok) {
                setSaved(prefs);
                toast.success("Preferences saved");
            } else {
                toast.error(result.error);
            }
        });
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (dirty && !isPending) save();
            }}
            className="space-y-5"
        >
            <div className="space-y-1.5">
                <label htmlFor="signature" className="text-sm font-medium">
                    Reply signature
                </label>
                <Textarea
                    id="signature"
                    value={prefs.signature}
                    onChange={(e) => setPrefs((p) => ({ ...p, signature: e.target.value }))}
                    readOnly={isPending}
                    rows={3}
                    maxLength={200}
                    placeholder={"Best,\nYour name, Support"}
                    className="max-w-md"
                />
                <p className="text-xs text-muted-foreground">
                    AI drafts end with this. Leave it empty to sign off with your display name.
                </p>
            </div>

            <Toggle
                id="pref-pending"
                label="Set tickets to Pending after I reply"
                description="Applies to open tickets only, and adds a line to the audit trail."
                checked={prefs.pendingAfterReply}
                onChange={(pendingAfterReply) => setPrefs((p) => ({ ...p, pendingAfterReply }))}
            />

            <Toggle
                id="pref-ai"
                label="Enable AI drafts"
                description="When off, the draft panel is hidden and no AI requests are made for you."
                checked={prefs.aiDraftsEnabled}
                onChange={(aiDraftsEnabled) => setPrefs((p) => ({ ...p, aiDraftsEnabled }))}
            />

            <Button type="submit" size="sm" disabled={!dirty || isPending}>
                {isPending && <Loader2 className="size-4 animate-spin" aria-hidden />}
                Save preferences
            </Button>
        </form>
    );
}