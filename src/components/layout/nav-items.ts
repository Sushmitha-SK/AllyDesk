import { Inbox, Settings, Users } from "lucide-react";

export const NAV_ITEMS = [
    { href: "/inbox", label: "Inbox", icon: Inbox },
    { href: "/customers", label: "Customers", icon: Users },
    { href: "/settings", label: "Settings", icon: Settings },
] as const;