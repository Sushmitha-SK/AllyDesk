import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PRIORITY_LABELS, type PriorityValue } from "../constants";

const STYLES: Record<PriorityValue, string> = {
    LOW: "bg-priority-low/15 text-priority-low",
    MEDIUM: "bg-priority-medium/15 text-priority-medium",
    HIGH: "bg-priority-high/15 text-priority-high",
    URGENT: "bg-priority-urgent/15 text-priority-urgent",
};

export function TicketPriorityBadge({
    priority,
    className,
}: {
    priority: PriorityValue;
    className?: string;
}) {
    return (
        <Badge variant="outline" className={cn("border-transparent", STYLES[priority], className)}>
            {PRIORITY_LABELS[priority]}
        </Badge>
    );
}