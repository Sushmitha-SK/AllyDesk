import {
    Bot,
    BookOpen,
    Workflow,
    Keyboard,
    Lock,
    FileText,
    Check,
    Sparkles,
    Zap,
    ShieldCheck,
    Activity,
    Inbox,
    Search,
    CornerDownLeft,
    UserRound,
    Tag,
} from "lucide-react";

const METRICS = [
    { label: "Average first response", value: "1.4m", sub: "Down from 42m", icon: Zap },
    { label: "Answers grounded in your KB", value: "99.4%", sub: "Checked against sources", icon: ShieldCheck },
    { label: "Time saved per agent", value: "3.8 hrs", sub: "Every day", icon: Activity },
];

const TICKETS = [
    { name: "Maya R.", subject: "Can I move my booking?", time: "2m", initials: "MR", active: true },
    { name: "Daniel K.", subject: "Invoice shows wrong amount", time: "9m", initials: "DK" },
    { name: "Priya S.", subject: "Do you offer weekend slots?", time: "21m", initials: "PS" },
];

const SOURCES = [
    { title: "Rescheduling a booking", match: 96 },
    { title: "Cancellation policy", match: 81 },
    { title: "Refund timelines", match: 42 },
];

const KEYS = [
    { k: "R", l: "Reply" },
    { k: "A", l: "Assign" },
    { k: "E", l: "Resolve" },
    { k: "/", l: "Search" },
];

const card =
    "relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_1px_2px_rgba(28,25,23,0.04),0_12px_32px_-16px_rgba(28,25,23,0.12)]";

export default function Features() {
    return (
        <section id="features" className="relative w-full overflow-hidden bg-white py-24 px-4 md:px-8 ">
           

            <div className="relative max-w-6xl mx-auto">
                {/* Heading */}
                <div className="max-w-2xl mx-auto text-center mb-14">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        Features
                    </span>
                    <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-balance">
                        Support that answers before you finish your coffee
                    </h2>
                    <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
                        AI writes the reply from your own help articles. Your team checks it, edits it and sends it.
                        Nothing goes out that your knowledge base can’t back up.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                    {/* 1. Inbox + AI draft */}
                    <div className={`${card} md:col-span-4 p-2`}>
                        <div className="px-5 pt-5 pb-4">
                            <div className="flex items-center gap-2 text-primary mb-2">
                                <Bot className="w-4 h-4" />
                                <span className="text-sm font-semibold">AI reply drafts</span>
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">A ready-to-send answer on every ticket</h3>
                            <p className="mt-1.5 text-sm text-muted-foreground max-w-md leading-relaxed">
                                Open a conversation and the draft is already there, in your tone, linked to the article it came from.
                            </p>
                        </div>

                        {/* App window */}
                        <div className="mx-3 mb-3 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                            <div className="flex items-center gap-1.5 border-b border-border bg-card px-3 py-2.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                                <div className="ml-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Inbox className="w-3.5 h-3.5" /> Inbox
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-5">
                                {/* Ticket list */}
                                <ul className="hidden sm:block sm:col-span-2 border-r border-border bg-card divide-y divide-border">
                                    {TICKETS.map((t) => (
                                        <li
                                            key={t.name}
                                            className={`flex items-start gap-2.5 px-3 py-3 ${t.active ? "bg-secondary/70" : ""}`}
                                        >
                                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-foreground">
                                                {t.initials}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="truncate text-xs font-semibold text-foreground">{t.name}</span>
                                                    <span className="text-[10px] text-muted-foreground">{t.time}</span>
                                                </div>
                                                <p className="truncate text-xs text-muted-foreground">{t.subject}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Draft panel */}
                                <div className="sm:col-span-3 p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-medium text-muted-foreground">Reply to Maya R.</span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                                            <Sparkles className="w-3 h-3 text-primary" /> AI draft
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-foreground">
                                        Hi Maya, you can change your booking up to 24 hours before the appointment using the link
                                        in your confirmation email. If it’s closer than that, reply here and we’ll move it for you.
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-[11px] text-muted-foreground">
                                            <FileText className="w-3 h-3" /> Rescheduling a booking
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-[11px] text-muted-foreground">
                                            <FileText className="w-3 h-3" /> Cancellation policy
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-[11px] text-muted-foreground">Edit before sending</span>
                                        <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm">
                                            Send reply
                                            <kbd className="inline-flex items-center rounded bg-white/20 px-1 py-0.5">
                                                <CornerDownLeft className="w-3 h-3" />
                                            </kbd>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Knowledge base */}
                    <div className={`${card} md:col-span-2 p-6 flex flex-col`}>
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm font-semibold">Knowledge base</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Only says what you’ve published</h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                            No matching article? The AI says so and hands the ticket to an agent.
                        </p>

                        <div className="mt-6 space-y-3 rounded-xl border border-border bg-background p-3">
                            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground">
                                <Search className="w-3.5 h-3.5" /> Matching articles
                            </div>
                            {SOURCES.map((s) => (
                                <div key={s.title}>
                                    <div className="mb-1 flex items-center justify-between text-xs">
                                        <span className="text-foreground">{s.title}</span>
                                        <span className="text-muted-foreground">{s.match}%</span>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-muted">
                                        <div
                                            className={`h-full rounded-full ${s.match > 60 ? "bg-primary" : "bg-border"}`}
                                            style={{ width: `${s.match}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. Routing */}
                    <div className={`${card} md:col-span-2 p-6`}>
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <Workflow className="w-4 h-4" />
                            <span className="text-sm font-semibold">Automatic routing</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Right person, first time</h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                            Set a rule once and every matching ticket follows it.
                        </p>

                        <div className="mt-5 relative pl-4">
                            <span aria-hidden className="absolute left-[7px] top-3 bottom-3 w-px bg-border" />
                            {[
                                { icon: Inbox, text: "New ticket arrives" },
                                { icon: Tag, text: "Mentions “refund”" },
                                { icon: UserRound, text: "Assign to Billing" },
                            ].map((n) => (
                                <div key={n.text} className="relative mb-2 last:mb-0 flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2 text-xs text-foreground">
                                    <span aria-hidden className="absolute -left-[13px] h-2 w-2 rounded-full bg-primary ring-4 ring-card" />
                                    <n.icon className="w-3.5 h-3.5 text-muted-foreground" />
                                    {n.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Keyboard */}
                    <div className={`${card} md:col-span-2 p-6`}>
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <Keyboard className="w-4 h-4" />
                            <span className="text-sm font-semibold">Keyboard first</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Never reach for the mouse</h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                            Reply, assign and close from the keys you already know.
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-2.5">
                            {KEYS.map((x) => (
                                <div key={x.k} className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-2.5 py-2">
                                    <kbd className="flex h-7 w-7 items-center justify-center rounded-md border border-border border-b-2 bg-card font-mono text-xs font-semibold text-foreground shadow-xs">
                                        {x.k}
                                    </kbd>
                                    <span className="text-xs text-muted-foreground">{x.l}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 5. Security */}
                    <div className={`${card} md:col-span-2 p-6`}>
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <Lock className="w-4 h-4" />
                            <span className="text-sm font-semibold">Security</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Your data stays yours</h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                            Customer conversations are never used to train models.
                        </p>

                        <ul className="mt-5 space-y-2">
                            {["SOC 2 Type II, audited yearly", "Encrypted in transit and at rest", "Role-based access"].map((t) => (
                                <li key={t} className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-2.5 py-2 text-xs text-foreground">
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-status-resolved/15">
                                        <Check className="w-3 h-3 text-status-resolved" />
                                    </span>
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 6. Metrics */}
                    <div className={`${card} md:col-span-6 p-8`}>
                       
                        <dl className="relative grid grid-cols-1 gap-8 sm:grid-cols-3 sm:divide-x sm:divide-border">
                            {METRICS.map((m) => (
                                <div key={m.label} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
                                    <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <m.icon className="w-4 h-4 text-primary" />
                                        {m.label}
                                    </dt>
                                    <dd className="mt-2 text-4xl font-semibold tracking-tight bg-linear-to-br from-foreground to-primary bg-clip-text text-transparent">
                                        {m.value}
                                    </dd>
                                    <p className="mt-1 text-xs text-muted-foreground">{m.sub}</p>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}