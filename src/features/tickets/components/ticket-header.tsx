import Link from "next/link";
import { ArrowLeft, FileText, Mail, MessageCircle, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { CHANNEL_LABELS, type ChannelValue } from "../constants";
import type { TicketDetail } from "../queries";
import { TicketPriorityBadge } from "./ticket-priority-badge";
import { TicketStatusBadge } from "./ticket-status-badge";

const CHANNEL_ICONS: Record<ChannelValue, typeof Mail> = {
    EMAIL: Mail,
    CHAT: MessageCircle,
    WEB_FORM: FileText,
};

type Props = { ticket: TicketDetail; backHref: string };

export function TicketHeader({ ticket, backHref }: Props) {
    const ChannelIcon = CHANNEL_ICONS[ticket.channel];

    return (
        <header className="shrink-0 space-y-2 border-b bg-background px-4 py-3 md:px-6">
            <div className="flex items-start gap-2">
                <Button variant="ghost" size="icon" asChild className="-ml-2 shrink-0 md:hidden">
                    <Link href={backHref} aria-label="Back to inbox">
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>
                <div className="min-w-0 space-y-1">
                    <h1 className="text-lg leading-snug font-semibold tracking-tight text-balance">
                        {ticket.subject}
                    </h1>
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        <span className="font-mono">#{ticket.number}</span>
                        <span aria-hidden>·</span>
                        <span className="inline-flex items-center gap-1">
                            <ChannelIcon className="size-3" aria-hidden />
                            {CHANNEL_LABELS[ticket.channel]}
                        </span>
                        <span aria-hidden>·</span>
                        <span>Opened {formatDateTime(ticket.createdAt)}</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
                <TicketStatusBadge status={ticket.status} />
                <TicketPriorityBadge priority={ticket.priority} />
                <Badge variant="outline" className="gap-1 font-normal">
                    <UserRound className="size-3" aria-hidden />
                    {ticket.assignee?.name ?? "Unassigned"}
                </Badge>
                {ticket.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                    </Badge>
                ))}
            </div>
        </header>
    );
}