"use client";

import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateAgentRoleAction } from "../actions";

type Role = "ADMIN" | "AGENT";

export function RoleSelect({
    agentId,
    name,
    role,
    disabled,
}: {
    agentId: string;
    name: string;
    role: Role;
    disabled?: boolean;
}) {
    const [, startTransition] = useTransition();
    const [current, setOptimistic] = useOptimistic(role);

    function change(next: Role) {
        startTransition(async () => {
            setOptimistic(next);
            const result = await updateAgentRoleAction({ agentId, role: next });
            if (result.ok) toast.success(`${name} is now ${next === "ADMIN" ? "an admin" : "an agent"}`);
            else toast.error(result.error); // the optimistic value reverts on its own
        });
    }

    return (
        <Select value={current} onValueChange={(v) => change(v as Role)} disabled={disabled}>
            <SelectTrigger size="sm" aria-label={`Role for ${name}`} className="w-28">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="AGENT">Agent</SelectItem>
            </SelectContent>
        </Select>
    );
}