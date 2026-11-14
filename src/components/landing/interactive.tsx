"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
    BookOpen,
    Check,
    FileText,
    Inbox,
    Keyboard,
    Plus,
    RotateCcw,
    Search,
    Settings,
    Sparkles,
    Users,
    type LucideIcon,
} from "lucide-react";


const ease = [0.22, 1, 0.36, 1] as const;

/* =========================================================================
   Live demo: the AI searching articles, then writing a cited draft
========================================================================= */

type Segment = { t: string } | { c: number };

const DRAFT: Segment[] = [
    { t: "You can change your booking up to 24 hours before the appointment, using the link in your confirmation email." },
    { c: 1 },
    { t: " Inside that window our team handles it, so reply here and we’ll sort it out together." },
    { c: 1 },
    { t: " If you’d rather cancel, the refund goes back to your original payment method in 5 business days." },
    { c: 2 },
    { t: "\n\nI’ll check whether a weekend slot is open and get back to you today." },
];

// Where each text segment begins in the full typed string, worked out once.
const OFFSETS: number[] = [];
let DRAFT_LENGTH = 0;
for (const seg of DRAFT) {
    OFFSETS.push(DRAFT_LENGTH);
    if ("t" in seg) DRAFT_LENGTH += seg.t.length;
}

const SOURCES = [
    { n: 1, title: "Rescheduling a booking", match: 96 },
    { n: 2, title: "Cancellation and refunds", match: 81 },
    { n: 0, title: "Weekend availability", match: 38 },
];

type Phase = "idle" | "searching" | "writing" | "done";

function DraftText({ count }: { count: number }) {
    return (
        <>
            {DRAFT.map((seg, i) => {
                const start = OFFSETS[i] ?? 0;
                if ("t" in seg) {
                    return <span key={i}>{seg.t.slice(0, Math.max(0, count - start))}</span>;
                }
                // A citation pops in once the sentence before it has finished typing
                if (count < start) return null;
                return (
                    <motion.sup
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 520, damping: 16 }}
                        className="mx-0.5 inline-flex size-4 -translate-y-0.5 items-center justify-center rounded bg-primary/15 align-baseline text-[10px] font-semibold text-primary"
                    >
                        {seg.c}
                    </motion.sup>
                );
            })}
        </>
    );
}

export function DraftDemo() {
    const [phase, setPhase] = useState<Phase>("idle");
    const [typed, setTyped] = useState(0);

    useEffect(() => {
        if (phase === "searching") {
            const t = setTimeout(() => setPhase("writing"), 1500);
            return () => clearTimeout(t);
        }
        if (phase === "writing") {
            let n = 0;
            const id = setInterval(() => {
                n += 2;
                setTyped(Math.min(n, DRAFT_LENGTH));
                if (n >= DRAFT_LENGTH) {
                    clearInterval(id);
                    setPhase("done");
                }
            }, 16);
            return () => clearInterval(id);
        }
    }, [phase]);

    function start() {
        setTyped(0);
        setPhase("searching");
    }

    const showSources = phase === "writing" || phase === "done";

    return (
        <motion.div
            className="relative mx-auto w-full max-w-4xl"
            onViewportEnter={() => phase === "idle" && start()}
            viewport={{ once: true, amount: 0.45 }}
        >
            <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/20 blur-3xl" />

            <div className={`surfaceCard overflow-hidden`}>
                {/* window bar */}
                <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                        <span className="size-2.5 rounded-full bg-border" />
                        <span className="size-2.5 rounded-full bg-border" />
                        <span className="size-2.5 rounded-full bg-border" />
                    </div>
                    <span className="truncate text-xs font-medium text-muted-foreground">Inbox · Can I move my booking?</span>
                    <button
                        type="button"
                        onClick={start}
                        disabled={phase === "searching" || phase === "writing"}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-40"
                    >
                        <RotateCcw className="size-3" aria-hidden /> Replay
                    </button>
                </div>

                <div className="grid md:grid-cols-[1.5fr_1fr]">
                    {/* conversation */}
                    <div className="space-y-5 p-6">
                        <div className="flex gap-3">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-foreground">
                                MR
                            </span>
                            <div className="rounded-2xl rounded-tl-sm border border-border bg-muted/40 px-4 py-3 text-sm leading-relaxed text-foreground">
                                Hi! Can I move my booking to next week? If not, I’d rather cancel.
                            </div>
                        </div>

                        <div className="rounded-2xl border border-primary/30 bg-linear-to-br from-primary/10 via-transparent to-transparent p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                                    <Sparkles className="size-3.5" aria-hidden />
                                    {phase === "searching" ? "Searching your articles…" : "AI draft"}
                                </span>
                                <AnimatePresence>
                                    {phase === "done" && (
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300"
                                        >
                                            <Check className="size-3" aria-hidden /> Ready to review
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="min-h-44 text-[15px] leading-relaxed text-foreground" aria-live="polite">
                                {phase === "searching" || phase === "idle" ? (
                                    <div className="space-y-2.5 pt-1" aria-label="Searching articles">
                                        {[100, 92, 64].map((w, i) => (
                                            <motion.div
                                                key={w}
                                                className="h-3 rounded-full bg-muted"
                                                style={{ width: `${w}%` }}
                                                animate={{ opacity: [0.35, 1, 0.35] }}
                                                transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.18 }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="whitespace-pre-wrap">
                                        Hi Maya,
                                        {"\n\n"}
                                        <DraftText count={typed} />
                                        {phase === "writing" && (
                                            <motion.span
                                                aria-hidden
                                                className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-primary"
                                                animate={{ opacity: [1, 0, 1] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                            />
                                        )}
                                    </p>
                                )}
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">You can edit before sending</span>
                                <motion.span
                                    animate={phase === "done" ? { opacity: 1, scale: [1, 1.06, 1] } : { opacity: 0.5, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm"
                                >
                                    Send reply
                                    <kbd className="rounded bg-white/20 px-1 font-mono text-[10px]">⌘↵</kbd>
                                </motion.span>
                            </div>
                        </div>
                    </div>

                    {/* sources */}
                    <div className="border-t border-border bg-muted/30 p-6 md:border-l md:border-t-0">
                        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                            <Search className="size-3.5" aria-hidden />
                            {showSources ? "Articles matched" : "Looking through your help articles"}
                        </p>

                        <ul className="mt-4 space-y-3">
                            {SOURCES.map((s, i) => (
                                <motion.li
                                    key={s.title}
                                    initial={false}
                                    animate={showSources ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                                    transition={{ duration: 0.5, delay: showSources ? i * 0.15 : 0, ease }}
                                    className="rounded-xl border border-border bg-background p-3"
                                >
                                    <div className="flex items-center gap-2 text-sm">
                                        {s.n > 0 ? (
                                            <span className="flex size-5 shrink-0 items-center justify-center rounded bg-primary/15 text-[11px] font-semibold text-primary">
                                                {s.n}
                                            </span>
                                        ) : (
                                            <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                                        )}
                                        <span className="min-w-0 flex-1 truncate text-foreground">{s.title}</span>
                                        <span className="text-xs tabular-nums text-muted-foreground">{s.match}%</span>
                                    </div>
                                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                                        <motion.div
                                            className={`h-full rounded-full ${s.n > 0 ? "bg-primary" : "bg-border"}`}
                                            initial={false}
                                            animate={{ width: showSources ? `${s.match}%` : "0%" }}
                                            transition={{ duration: 0.9, delay: showSources ? 0.25 + i * 0.15 : 0, ease }}
                                        />
                                    </div>
                                    {s.n === 0 && showSources && (
                                        <p className="mt-2 text-[11px] text-muted-foreground">Too weak a match, so it isn’t cited.</p>
                                    )}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* =========================================================================
   How it works: a timeline whose line draws as you scroll
========================================================================= */

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
    { icon: Inbox, title: "A ticket opens", body: "From email, chat or a web form, ready to triage by status, priority and tags." },
    { icon: BookOpen, title: "Your articles are searched", body: "The subject and the customer’s last three messages are matched against your help articles." },
    { icon: Sparkles, title: "A short draft is written", body: "Around 170 words, addressed by first name, with a numbered marker after every stated fact." },
    { icon: Check, title: "You edit and send", body: "Change anything, then Ctrl/⌘ + Enter. Optionally the ticket moves to Pending after you reply." },
];

export function Steps() {
    const ref = useRef<HTMLOListElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

    return (
        <ol ref={ref} className="relative space-y-10">
            <span aria-hidden className="absolute bottom-4 left-5 top-4 w-px bg-border" />
            <motion.span
                aria-hidden
                style={{ scaleY, transformOrigin: "top" }}
                className="absolute bottom-4 left-5 top-4 w-px bg-linear-to-b from-primary to-amber-300"
            />
            {STEPS.map((s, i) => (
                <motion.li
                    key={s.title}
                    className="relative flex gap-6"
                    initial={{ opacity: 0.25, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.9, margin: "-10% 0px -25% 0px" }}
                    transition={{ duration: 0.6, ease }}
                >
                    <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background text-primary ring-8 ring-background">
                        <s.icon className="size-4.5" aria-hidden />
                    </span>
                    <div className={`surfaceCard flex-1 p-5`}>
                        <p className="text-xs font-medium text-primary">Step {i + 1}</p>
                        <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    </div>
                </motion.li>
            ))}
        </ol>
    );
}

/* =========================================================================
   Workspace tabs
========================================================================= */

function Kbd({ children }: { children: ReactNode }) {
    return (
        <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-b-2 border-border bg-background px-1.5 font-mono text-[11px] font-medium text-foreground">
            {children}
        </kbd>
    );
}

function Chip({ tone, children }: { tone: "open" | "pending" | "resolved" | "urgent" | "high" | "muted"; children: ReactNode }) {
    const tones = {
        open: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
        pending: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
        resolved: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
        urgent: "bg-red-500/15 text-red-700 dark:text-red-300",
        high: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
        muted: "bg-muted text-muted-foreground",
    } as const;
    return <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${tones[tone]}`}>{children}</span>;
}

function InboxMock() {
    const rows = [
        { s: "Charged twice for the annual plan", n: "Daniel F.", st: "Open", p: "Urgent", active: true },
        { s: "Do you offer weekend slots?", n: "Priya S.", st: "Pending", p: "Medium" },
        { s: "Invoice shows the wrong amount", n: "Sofia A.", st: "Open", p: "High" },
        { s: "Thanks, that fixed it!", n: "Kenji W.", st: "Resolved", p: "Low" },
    ] as const;
    return (
        <ul className="divide-y divide-border">
            {rows.map((r, i) => (
                <motion.li
                    key={r.s}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4, ease }}
                    className={`flex items-center gap-3 px-4 py-3 ${"active" in r ? "bg-primary/10" : ""}`}
                >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-foreground">
                        {r.n.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{r.s}</p>
                        <p className="text-xs text-muted-foreground">{r.n}</p>
                    </div>
                    <Chip tone={r.st === "Open" ? "open" : r.st === "Pending" ? "pending" : "resolved"}>{r.st}</Chip>
                    <Chip tone={r.p === "Urgent" ? "urgent" : r.p === "High" ? "high" : "muted"}>{r.p}</Chip>
                </motion.li>
            ))}
        </ul>
    );
}

function CustomersMock() {
    const rows = [
        { n: "Daniel Foster", c: "Foster & Co", plan: "Pro", note: "Prefers email. Billing contact." },
        { n: "Sofia Alvarez", c: "Alvarez Studio", plan: "Team", note: "Asked about single sign-on." },
        { n: "Kenji Watanabe", c: "Tokyo Craft", plan: "Pro", note: "Reported the photo upload bug." },
    ];
    return (
        <ul className="divide-y divide-border">
            {rows.map((r, i) => (
                <motion.li
                    key={r.n}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease }}
                    className="flex items-center gap-3 px-4 py-3.5"
                >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
                        {r.n.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                            {r.n} <span className="font-normal text-muted-foreground">· {r.c}</span>
                        </p>
                        <p className="truncate text-xs text-muted-foreground">Note: {r.note}</p>
                    </div>
                    <Chip tone="muted">{r.plan}</Chip>
                </motion.li>
            ))}
        </ul>
    );
}

const SHORTCUTS: { keys: string[]; label: string }[] = [
    { keys: ["Ctrl/⌘", "K"], label: "Command palette" },
    { keys: ["/"], label: "Search tickets" },
    { keys: ["j", "k"], label: "Next and previous ticket" },
    { keys: ["r"], label: "Jump to the reply box" },
    { keys: ["Ctrl/⌘", "Enter"], label: "Send reply" },
    { keys: ["g", "i"], label: "Go to Inbox" },
];

function ShortcutsMock() {
    return (
        <dl className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0">
            {SHORTCUTS.map((s, i) => (
                <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 22 }}
                    className="flex items-center justify-between gap-4 px-4 py-3.5 text-sm sm:border-b sm:border-border"
                >
                    <dt className="text-foreground">{s.label}</dt>
                    <dd className="flex items-center gap-1">
                        {s.keys.map((k, j) => (
                            <span key={k} className="flex items-center gap-1">
                                {j > 0 && <span className="text-xs text-muted-foreground">+</span>}
                                <Kbd>{k}</Kbd>
                            </span>
                        ))}
                    </dd>
                </motion.div>
            ))}
        </dl>
    );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label={label}
            onClick={() => onChange(!on)}
            className={`flex h-6 w-10 shrink-0 items-center rounded-full p-0.5 transition-colors focus-visible:ring-2 focus-visible:ring-ring ${on ? "justify-end bg-primary" : "justify-start bg-muted-foreground/30"}`}
        >
            <motion.span layout transition={{ type: "spring", stiffness: 520, damping: 32 }} className="size-5 rounded-full bg-white shadow" />
        </button>
    );
}

function SettingsMock() {
    const [pending, setPending] = useState(true);
    const [ai, setAi] = useState(true);
    return (
        <div className="space-y-5 p-5">
            <div>
                <p className="text-sm font-medium text-foreground">Reply signature</p>
                <div className="mt-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground">
                    Priya
                    <br />
                    AllyDesk Support
                </div>
            </div>
            {[
                { label: "Set ticket to Pending after I reply", on: pending, set: setPending },
                { label: "Show AI drafts", on: ai, set: setAi },
            ].map((t) => (
                <div key={t.label} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-foreground">{t.label}</span>
                    <Toggle on={t.on} onChange={t.set} label={t.label} />
                </div>
            ))}
            <p className="text-xs text-muted-foreground">Try the switches. They’re yours alone, so your teammates keep their own.</p>
        </div>
    );
}

const TABS: {
    id: string;
    label: string;
    icon: LucideIcon;
    title: string;
    body: string;
    mock: () => ReactNode;
}[] = [
        {
            id: "inbox",
            label: "Inbox",
            icon: Inbox,
            title: "Every conversation in one place",
            body: "Tickets on the left, the conversation on the right. Filter by status and priority, or search by subject, customer or message.",
            mock: () => <InboxMock />,
        },
        {
            id: "customers",
            label: "Customers",
            icon: Users,
            title: "Know who you’re talking to",
            body: "See company and plan, and keep private notes that feed straight into AI drafts so replies sound informed.",
            mock: () => <CustomersMock />,
        },
        {
            id: "shortcuts",
            label: "Shortcuts",
            icon: Keyboard,
            title: "Fast without the mouse",
            body: "Move between tickets, jump to the reply box and send, all from the keyboard. Press ? in the app to see them all.",
            mock: () => <ShortcutsMock />,
        },
        {
            id: "settings",
            label: "Settings",
            icon: Settings,
            title: "Make it yours",
            body: "Set your signature, choose whether AI drafts show up, and let tickets move to Pending after you reply.",
            mock: () => <SettingsMock />,
        },
    ];

export function WorkspaceTabs() {
    const [active, setActive] = useState(TABS[0]!.id);
    const tab = TABS.find((t) => t.id === active) ?? TABS[0]!;

    return (
        <div className="mx-auto max-w-5xl">
            <div
                role="tablist"
                aria-label="Workspace areas"
                className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-border bg-card p-1 shadow-xs"
            >
                {TABS.map((t) => {
                    const selected = t.id === active;
                    return (
                        <button
                            key={t.id}
                            role="tab"
                            id={`tab-${t.id}`}
                            aria-selected={selected}
                            aria-controls={`panel-${t.id}`}
                            type="button"
                            onClick={() => setActive(t.id)}
                            className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring ${selected ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            {selected && (
                                <motion.span
                                    layoutId="workspace-tab"
                                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                    className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/30"
                                />
                            )}
                            <t.icon className="relative size-4" aria-hidden />
                            <span className="relative">{t.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab.id}
                        role="tabpanel"
                        id={`panel-${tab.id}`}
                        aria-labelledby={`tab-${tab.id}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease }}
                        className="grid items-center gap-8 lg:grid-cols-[1fr_1.35fr]"
                    >
                        <div>
                            <h3 className="text-2xl font-semibold tracking-tight text-foreground">{tab.title}</h3>
                            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{tab.body}</p>
                        </div>
                        <div className="relative">
                            <div aria-hidden className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
                            <div className={`surfcaeCard overflow-hidden`}>{tab.mock()}</div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

/* =========================================================================
   FAQ accordion
========================================================================= */

const FAQ = [
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

export function Faq() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="space-y-3">
            {FAQ.map((f, i) => {
                const isOpen = open === i;
                return (
                    <div
                        key={f.q}
                        className={`surfaceCard overflow-hidden transition-colors ${isOpen ? "border-primary/40" : ""}`}
                    >
                        <h3>
                            <button
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={`faq-${i}`}
                                onClick={() => setOpen(isOpen ? null : i)}
                                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                            >
                                {f.q}
                                <motion.span
                                    animate={{ rotate: isOpen ? 45 : 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                                    className={`flex size-6 shrink-0 items-center justify-center rounded-full ${isOpen ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}
                                >
                                    <Plus className="size-3.5" aria-hidden />
                                </motion.span>
                            </button>
                        </h3>
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    id={`faq-${i}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35, ease }}
                                >
                                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}