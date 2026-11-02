import { Inbox } from "lucide-react";

export default function InboxIndexPage() {
    return (
        <div className="grid h-full place-items-center p-6 text-center">
            <div className="space-y-2">
                <Inbox className="mx-auto size-10 text-muted-foreground" />
                <h2 className="font-medium">Select a ticket</h2>
                <p className="text-sm text-muted-foreground">
                    Choose a conversation from the list to see its details.
                </p>
            </div>
        </div>
    );
}