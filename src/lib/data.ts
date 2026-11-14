import { BookOpen, FileCheck2Icon, Gauge, KeyRound, LucideIcon, ShieldCheck, Signature, UserRound, Users } from "lucide-react";

export const STATS = [
    { to: 3, suffix: "", label: "Channels", sub: "Email, chat and web form" },
    { to: 4, suffix: "", label: "Ticket statuses", sub: "Open to Closed" },
    { to: 4, suffix: "", label: "Priority levels", sub: "Low to Urgent" },
    { to: 100, suffix: "%", label: "Human-sent", sub: "Your team approves every reply" },
];


export const PRINCIPLES: { icon: LucideIcon; title: string; body: string; wide?: boolean }[] = [
    {
        icon: FileCheck2Icon,
        title: "You send it, never the AI",
        body: "Every draft is saved as generated, approved or discarded. Nothing reaches a customer until a person on your team sends it.",
        wide: true,
    },
    {
        icon: BookOpen,
        title: "No article, no invented policy",
        body: "Prices, limits and timelines come only from your help articles. No match means the draft says you’re checking.",
    },
    {
        icon: UserRound,
        title: "Knows who it’s writing to",
        body: "Name, company, plan and your private notes go into each draft, so replies never read like a template.",
    },
    {
        icon: ShieldCheck,
        title: "Customer messages can’t give orders",
        body: "A customer writing “ignore your rules” is just a message to answer, not an instruction the AI will follow.",
        wide: true,
    },
    {
        icon: Signature,
        title: "Ends the way you do",
        body: "Set your signature once and every draft closes with it, line breaks included.",
    },
    {
        icon: Gauge,
        title: "Capped, so it can’t run away",
        body: "Up to 10 drafts per person every 10 minutes, and anyone can switch AI drafts off.",
    },
];

export const TRUST: { icon: LucideIcon; title: string; body: string }[] = [
    {
        icon: KeyRound,
        title: "Private by default",
        body: "Only the landing page and sign-in screens are public. Everything else needs a signed-in user.",
    },
    {
        icon: Users,
        title: "Roles for your team",
        body: "Admins manage the workspace and Agents answer tickets, so people only get the access they need.",
    },
    {
        icon: ShieldCheck,
        title: "Checked before it runs",
        body: "Automated connections to your account are verified before they do anything.",
    },
];