import {
    CustomerPanelSkeleton,
    MessageThreadSkeleton,
    TicketHeaderSkeleton,
} from "@/features/tickets/components/ticket-detail-skeletons";

export default function TicketLoading() {
    return (
        <div className="flex h-full min-h-0 flex-col">
            <TicketHeaderSkeleton />
            <div className="min-h-0 flex-1 overflow-hidden lg:grid lg:grid-cols-[minmax(0,1fr)_300px]">
                <div className="p-4 md:p-6">
                    <MessageThreadSkeleton />
                </div>
                <div className="hidden border-l lg:block">
                    <CustomerPanelSkeleton />
                </div>
            </div>
        </div>
    );
}