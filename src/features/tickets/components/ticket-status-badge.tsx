import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { STATUS_LABELS, type TicketStatusValue } from "../constants";

const STYLES: Record<TicketStatusValue, string> = {
    OPEN: "bg-status-open/15 text-status-open",
    PENDING: "bg-status-pending/15 text-status-pending",
    RESOLVED: "bg-status-resolved/15 text-status-resolved",
    CLOSED: "bg-status-closed/15 text-status-closed",
};

export function TicketStatusBadge({
    status,
    className,
}: {
    status: TicketStatusValue;
    className?: string;
}) {
    return (
        <Badge variant="outline" className={cn("border-transparent", STYLES[status], className)}>
            {STATUS_LABELS[status]}
        </Badge>
    );
}