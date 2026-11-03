import { getMessages } from "../queries";
import { MessageBubble } from "./message-bubble";
import { ScrollAnchor } from "./scroll-anchor";

type Props = { ticketId: string; customerName: string };

export async function MessageThread({ ticketId, customerName }: Props) {
    const messages = await getMessages(ticketId);

    if (messages.length === 0) {
        return <p className="py-10 text-center text-sm text-muted-foreground">No messages yet.</p>;
    }

    return (
        <>
            <ol aria-label="Conversation" className="space-y-5">
                {messages.map((message) => (
                    <li key={message.id}>
                        <MessageBubble message={message} customerName={customerName} />
                    </li>
                ))}
            </ol>
            <ScrollAnchor key={messages[messages.length - 1]!.id} />
        </>
    );
}