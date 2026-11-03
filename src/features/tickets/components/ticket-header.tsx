import Link from "next/link";
import { ArrowLeft, FileText, Mail, MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { CHANNEL_LABELS, type ChannelValue } from "../constants";
import type { TicketDetail } from "../queries";
import { TicketControls } from "./ticket-controls";

const CHANNEL_ICONS: Record<ChannelValue, typeof Mail> = {
    EMAIL: Mail,
    CHAT: MessageCircle,
    WEB_FORM: FileText,
};

type Props = {
    ticket: TicketDetail;
    backHref: string;
    agents: { id: string; name: string }[];
    currentAgentId: string;
};

export function TicketHeader({ ticket, backHref, agents, currentAgentId }: Props) {
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

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <TicketControls
                    ticketId={ticket.id}
                    status={ticket.status}
                    priority={ticket.priority}
                    assigneeId={ticket.assigneeId}
                    agents={agents}
                    currentAgentId={currentAgentId}
                />
                {ticket.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
                        {ticket.tags.map((tag) => (
                            <li key={tag}>
                                <Badge variant="secondary" className="font-normal">
                                    {tag}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </header>
    );
}