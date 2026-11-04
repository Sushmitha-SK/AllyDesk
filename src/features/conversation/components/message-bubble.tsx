import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateTime, getInitials } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { MessageItem } from "../queries";
import { LocalTime } from "@/components/layout/ui-helpers/local-time";

type Props = { message: MessageItem; customerName: string };

export function MessageBubble({ message, customerName }: Props) {
    if (message.authorType === "SYSTEM") {
        return (
            <p className="py-1 text-center text-xs text-muted-foreground">
                {message.body} · <LocalTime date={message.createdAt} />
            </p>
        );
    }

    const fromAgent = message.authorType === "AGENT";
    const name = fromAgent ? (message.agent?.name ?? "Support agent") : customerName;

    return (
        <article className={cn("flex gap-3", fromAgent && "flex-row-reverse")}>
            <Avatar className="size-8 shrink-0">
                {fromAgent && message.agent?.avatarUrl && <AvatarImage src={message.agent.avatarUrl} alt="" />}
                <AvatarFallback className="text-xs">{getInitials(name)}</AvatarFallback>
            </Avatar>

            <div className={cn("flex min-w-0 max-w-[85%] flex-col gap-1", fromAgent && "items-end")}>
                <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{name}</span>
                    {" · "}
                    <LocalTime date={message.createdAt} />
                </p>
                <div
                    className={cn(
                        "rounded-lg px-3 py-2 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap",
                        fromAgent ? "rounded-tr-sm bg-primary/10" : "rounded-tl-sm bg-muted",
                    )}
                >
                    {message.body}
                </div>
            </div>
        </article>
    );
}