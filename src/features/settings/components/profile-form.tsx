"use client";

import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/format";
import { updateProfileAction } from "../actions";

type Props = {
    initialName: string;
    email: string;
    role: "ADMIN" | "AGENT";
    avatarUrl: string | null;
};

export function ProfileForm({ initialName, email, role, avatarUrl }: Props) {
    const [name, setName] = useState(initialName);
    const [saved, setSaved] = useState(initialName);
    const [isPending, startTransition] = useTransition();
    const dirty = name.trim() !== saved;

    function save() {
        startTransition(async () => {
            const result = await updateProfileAction({ name });
            if (result.ok) {
                setSaved(name.trim());
                setName(name.trim());
                toast.success("Profile saved");
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
            className="space-y-4"
        >
            <div className="flex items-center gap-3">
                <Avatar className="size-12">
                    {avatarUrl && <AvatarImage src={avatarUrl} alt="" />}
                    <AvatarFallback>{getInitials(saved)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{email}</p>
                    <Badge variant="secondary" className="mt-1">
                        {role === "ADMIN" ? "Admin" : "Agent"}
                    </Badge>
                </div>
            </div>

            <div className="space-y-1.5">
                <label htmlFor="display-name" className="text-sm font-medium">
                    Display name
                </label>
                <Input
                    id="display-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    readOnly={isPending}
                    maxLength={60}
                    autoComplete="name"
                    className="max-w-sm"
                />
                <p className="text-xs text-muted-foreground">
                    Shown on your replies, in assignee lists and in the audit trail.
                </p>
            </div>

            <Button type="submit" size="sm" disabled={!dirty || !name.trim() || isPending}>
                {isPending && <Loader2 className="size-4 animate-spin" aria-hidden />}
                Save profile
            </Button>
        </form>
    );
}