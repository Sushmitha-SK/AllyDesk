export const STATUS_FILTERS = ["all", "OPEN", "PENDING", "RESOLVED", "CLOSED"] as const;
export const PRIORITY_FILTERS = ["all", "LOW", "MEDIUM", "HIGH", "URGENT"] as const;
export const ASSIGNEE_FILTERS = ["all", "me", "unassigned"] as const;
export const SORT_OPTIONS = ["latest", "oldest", "priority", "created"] as const;

export type StatusFilter = (typeof STATUS_FILTERS)[number];
export type PriorityFilter = (typeof PRIORITY_FILTERS)[number];
export type AssigneeFilter = (typeof ASSIGNEE_FILTERS)[number];
export type SortOption = (typeof SORT_OPTIONS)[number];
export type TicketStatusValue = Exclude<StatusFilter, "all">;
export type PriorityValue = Exclude<PriorityFilter, "all">;

export const STATUS_LABELS: Record<StatusFilter, string> = {
    all: "All statuses",
    OPEN: "Open",
    PENDING: "Pending",
    RESOLVED: "Resolved",
    CLOSED: "Closed",
};

export const PRIORITY_LABELS: Record<PriorityFilter, string> = {
    all: "All priorities",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    URGENT: "Urgent",
};

export const ASSIGNEE_LABELS: Record<AssigneeFilter, string> = {
    all: "Anyone",
    me: "Assigned to me",
    unassigned: "Unassigned",
};

export const SORT_LABELS: Record<SortOption, string> = {
    latest: "Latest activity",
    oldest: "Oldest activity",
    priority: "Highest priority",
    created: "Newest created",
};

export const DEFAULT_FILTERS = {
    q: "",
    status: "all",
    priority: "all",
    assignee: "all",
    sort: "latest",
} as const;

export type ChannelValue = "EMAIL" | "CHAT" | "WEB_FORM";

export const CHANNEL_LABELS: Record<ChannelValue, string> = {
    EMAIL: "Email",
    CHAT: "Live chat",
    WEB_FORM: "Web form",
};