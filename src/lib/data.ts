import { BookOpen, FileCheck2Icon, Gauge, KeyRound, LucideIcon, ShieldCheck, Signature, UserRound, Users } from "lucide-react";

export const NAV_LINKS = [
    { label: "Features", href: "#features" },
    { label: "Workspace", href: "#workspace" },
    { label: "Security", href: "#security" },
    { label: "FAQ", href: "#faq" },
] as const;

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
        body: "Admins manage the workspace, Agents handle tickets. Everyone gets only the access needed.",
    },
    {
        icon: ShieldCheck,
        title: "Checked before it runs",
        body: "Automated connections to your account are verified before they do anything.",
    },
];

export const FAQ = [
    {
        q: "Does the AI send replies on its own?",
        a: "No. It only writes a draft. A person on your team reads it, edits it if needed and sends it. Each draft keeps a status, so you can see what was approved and what was discarded.",
    },
    {
        q: "What if my help articles don’t cover the question?",
        a: "The draft doesn’t guess. It tells the customer you’re looking into it and will follow up, and it never promises refunds, credits or deadlines you haven’t published.",
    },
    {
        q: "Do I need to write articles first?",
        a: "AllyDesk answers from your help articles, so the more you publish, the more it can cite. Without a match it falls back to a safe holding reply for your agent to finish.",
    },
    {
        q: "Can each person turn AI drafts off?",
        a: "Yes. Every team member has an AI drafts switch in their own preferences, next to their signature and the option to move tickets to Pending after replying.",
    },
    {
        q: "Who can get into my workspace?",
        a: "Only people who sign in. Apart from the landing page and sign-in screens, every page asks for a signed-in user, and team members are either Admins or Agents.",
    },
];

export const FOOTER_COLUMNS = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Workspace", href: "#workspace" },
        ],
    },
    {
        title: "Trust",
        links: [
            { label: "Security", href: "#security" },
            { label: "FAQ", href: "#faq" },
        ],
    },
    {
        title: "Account",
        links: [
            { label: "Sign in", href: "/sign-in" },
            { label: "Create an account", href: "/sign-up" },
            { label: "Open workspace", href: "/inbox" },
        ],
    },
] as const;