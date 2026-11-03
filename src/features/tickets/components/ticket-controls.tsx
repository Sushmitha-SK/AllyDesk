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
import { cn } from "@/lib/utils";
import { updateTicketAction } from "../actions";
import {
    PRIORITIES,
    PRIORITY_LABELS,
    STATUS_LABELS,
    TICKET_STATUSES,
    type PriorityValue,
    type TicketStatusValue,
} from "../constants";

const STATUS_DOT: Record<TicketStatusValue, string> = {
    OPEN: "bg-status-open",
    PENDING: "bg-status-pending",
    RESOLVED: "bg-status-resolved",
    CLOSED: "bg-status-closed",
};

const PRIORITY_DOT: Record<PriorityValue, string> = {
    LOW: "bg-priority-low",
    MEDIUM: "bg-priority-medium",
    HIGH: "bg-priority-high",
    URGENT: "bg-priority-urgent",
};

const UNASSIGNED = "unassigned"; // Radix Select doesn't allow an empty-string value

type Props = {
    ticketId: string;
    status: TicketStatusValue;
    priority: PriorityValue;
    assigneeId: string | null;
    agents: { id: string; name: string }[];
    currentAgentId: string;
};

type State = Pick<Props, "status" | "priority" | "assigneeId">;

function Dot({ className }: { className: string }) {
    return <span aria-hidden className={cn("size-2 shrink-0 rounded-full", className)} />;
}

function ControlSelect({
    label,
    value,
    onValueChange,
    children,
}: {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode;
}) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger size="sm" aria-label={label} className="min-w-32 text-xs">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>{children}</SelectContent>
        </Select>
    );
}

export function TicketControls({
    ticketId,
    status,
    priority,
    assigneeId,
    agents,
    currentAgentId,
}: Props) {
    const [, startTransition] = useTransition();
    const [current, setOptimistic] = useOptimistic<State, Partial<State>>(
        { status, priority, assigneeId },
        (state, patch) => ({ ...state, ...patch }),
    );

    function change(patch: Partial<State>) {
        startTransition(async () => {
            setOptimistic(patch);
            const result = await updateTicketAction({ ticketId, ...patch });
            if (!result.ok) toast.error(result.error); // the optimistic value reverts on its own
        });
    }

    return (
        <div className="flex flex-wrap items-center gap-1.5">
            <ControlSelect
                label="Status"
                value={current.status}
                onValueChange={(v) => change({ status: v as TicketStatusValue })}
            >
                {TICKET_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                        <Dot className={STATUS_DOT[s]} />
                        {STATUS_LABELS[s]}
                    </SelectItem>
                ))}
            </ControlSelect>

            <ControlSelect
                label="Priority"
                value={current.priority}
                onValueChange={(v) => change({ priority: v as PriorityValue })}
            >
                {PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>
                        <Dot className={PRIORITY_DOT[p]} />
                        {PRIORITY_LABELS[p]}
                    </SelectItem>
                ))}
            </ControlSelect>

            <ControlSelect
                label="Assignee"
                value={current.assigneeId ?? UNASSIGNED}
                onValueChange={(v) => change({ assigneeId: v === UNASSIGNED ? null : v })}
            >
                <SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
                {agents.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                        {a.name}
                        {a.id === currentAgentId ? " (you)" : ""}
                    </SelectItem>
                ))}
            </ControlSelect>
        </div>
    );
}