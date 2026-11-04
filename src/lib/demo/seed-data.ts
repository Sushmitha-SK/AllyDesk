import type { Agent, Customer, KnowledgeArticle, Prisma, Ticket } from "../../generated/prisma/client";

export type SeedOptions = {
    /** Email for the admin agent (so "Assigned to me" has data for you). */
    adminEmail?: string;
    /** CLI seeding wipes agents too. The demo reset keeps real signed-in agents. */
    wipeAgents?: boolean;
};

const minsAgo = (m: number) => new Date(Date.now() - m * 60_000);

// ...agentsData, customersData, articlesData, Msg, TicketSeed, ticketsData: unchanged from Step 3...
const agentsData = [
    { clerkId: "seed_agent_priya", name: "Priya Nair", email: "priya@yopmail.com", role: "ADMIN" as const },
    { clerkId: "seed_agent_marcus", name: "Marcus Lee", email: "marcus@supportflow.dev", role: "AGENT" as const },
    { clerkId: "seed_agent_elena", name: "Elena Rossi", email: "elena@supportflow.dev", role: "AGENT" as const },
];

const customersData = [
    { name: "Daniel Foster", email: "daniel@northwind.io", company: "Northwind", plan: "Business", notes: "Long-time customer. Prefers email." },
    { name: "Aisha Khan", email: "aisha@brightlabs.co", company: "BrightLabs", plan: "Pro", notes: null },
    { name: "Tom Becker", email: "tom@becker-design.com", company: "Becker Design", plan: "Free", notes: null },
    { name: "Sofia Alvarez", email: "sofia@lumenhealth.org", company: "Lumen Health", plan: "Enterprise", notes: "Enterprise SLA: first response within 1 hour." },
    { name: "Kenji Watanabe", email: "kenji@tokyocraft.jp", company: "Tokyo Craft", plan: "Pro", notes: null },
    { name: "Grace O'Neill", email: "grace@oneillco.com", company: "O'Neill & Co", plan: "Business", notes: null },
    { name: "Ravi Menon", email: "ravi@kochiworks.in", company: "Kochi Works", plan: "Pro", notes: null },
    { name: "Hannah Müller", email: "hannah@alpinesoft.de", company: "AlpineSoft", plan: "Business", notes: "GDPR-sensitive; escalate data requests." },
];

const articlesData = [
    {
        slug: "reset-password",
        title: "How to reset your password",
        category: "Account",
        content:
            "Go to Settings > Security and choose Reset password. A reset link is emailed and stays valid for 30 minutes. If the email does not arrive, check spam and confirm the address on your account.",
    },
    {
        slug: "refund-policy",
        title: "Refund policy",
        category: "Billing",
        content:
            "Annual plans can be refunded in full within 14 days of purchase. Monthly plans are not refunded for the current period, but you can cancel at any time. Refunds return to the original payment method in 5 to 10 business days.",
    },
    {
        slug: "invoice-and-vat",
        title: "Invoices and VAT details",
        category: "Billing",
        content:
            "Invoices are available under Billing > History. To add a VAT ID or change the billing address, update it under Billing > Details, then regenerate the invoice. Past invoices can be reissued by support on request.",
    },
    {
        slug: "api-rate-limits",
        title: "API rate limits",
        category: "Developers",
        content:
            "Pro plans allow 600 requests per minute, Business 3,000, and Enterprise is custom. Exceeding the limit returns HTTP 429 with a Retry-After header. Use exponential backoff and batch endpoints where possible.",
    },
    {
        slug: "export-your-data",
        title: "Exporting and deleting your data",
        category: "Privacy",
        content:
            "Admins can export all workspace data as a ZIP from Settings > Data. Deletion requests are processed within 30 days and confirmed by email. Deleted data cannot be recovered.",
    },
];

type Msg = { from: "c" | "a"; body: string; ago: number };

type TicketSeed = {
    subject: string;
    customer: number;
    status: "OPEN" | "PENDING" | "RESOLVED" | "CLOSED";
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    channel: "EMAIL" | "CHAT" | "WEB_FORM";
    assignee: number | null;
    tags: string[];
    msgs: Msg[];
};


const ticketsData: TicketSeed[] = [
    {
        subject: "Can't log in after changing my email",
        customer: 2, status: "OPEN", priority: "HIGH", channel: "EMAIL", assignee: 0, tags: ["login", "account"],
        msgs: [
            { from: "c", ago: 95, body: "Hi, I changed my email address yesterday and now I can't sign in. The password reset email never arrives either. I have a client demo this afternoon, please help." },
        ],
    },
    {
        subject: "Charged twice for the annual plan",
        customer: 0, status: "OPEN", priority: "URGENT", channel: "EMAIL", assignee: 1, tags: ["billing", "refund"],
        msgs: [
            { from: "c", ago: 240, body: "I see two charges of $480 on my card for the annual Business plan. Please refund the duplicate as soon as possible." },
            { from: "a", ago: 200, body: "Hi Daniel, sorry about that. I can see both charges on our side and I'm checking with billing now." },
            { from: "c", ago: 30, body: "Any update? My finance team is asking." },
        ],
    },
    {
        subject: "Need VAT ID on last three invoices",
        customer: 7, status: "PENDING", priority: "MEDIUM", channel: "EMAIL", assignee: 2, tags: ["billing", "invoice"],
        msgs: [
            { from: "c", ago: 1500, body: "Our accounting needs our VAT ID (DE123456789) on the invoices from July to September. Can you reissue them?" },
            { from: "a", ago: 1380, body: "Hello Hannah, happy to help. I've added the VAT ID to your billing details. Could you confirm the company name should read 'AlpineSoft GmbH'?" },
        ],
    },
    {
        subject: "API returns 429 during nightly sync",
        customer: 1, status: "OPEN", priority: "HIGH", channel: "WEB_FORM", assignee: 0, tags: ["api", "rate-limit"],
        msgs: [
            { from: "c", ago: 400, body: "Our nightly sync started failing with HTTP 429 about a week ago. We're on the Pro plan and haven't changed volume. Did limits change?" },
        ],
    },
    {
        subject: "Enterprise SSO setup question",
        customer: 3, status: "OPEN", priority: "URGENT", channel: "EMAIL", assignee: 1, tags: ["sso", "enterprise"],
        msgs: [
            { from: "c", ago: 50, body: "We're rolling out SAML SSO to 400 users on Monday. Our IdP is Okta. Do you need our metadata XML before then, and is there a test mode?" },
        ],
    },
    {
        subject: "How do I export my workspace data?",
        customer: 4, status: "RESOLVED", priority: "LOW", channel: "CHAT", assignee: 2, tags: ["export"],
        msgs: [
            { from: "c", ago: 3000, body: "Is there a way to export everything from my workspace?" },
            { from: "a", ago: 2980, body: "Yes! Admins can go to Settings > Data and choose Export. You'll get a ZIP by email within a few minutes." },
            { from: "c", ago: 2960, body: "Found it, thank you!" },
        ],
    },
    {
        subject: "Dark mode flickers on page load",
        customer: 2, status: "PENDING", priority: "LOW", channel: "WEB_FORM", assignee: null, tags: ["bug", "ui"],
        msgs: [
            { from: "c", ago: 5000, body: "When I open the dashboard in dark mode there's a white flash for about half a second. Chrome 130 on macOS." },
        ],
    },
    {
        subject: "Request: bulk assign tickets",
        customer: 5, status: "OPEN", priority: "MEDIUM", channel: "EMAIL", assignee: null, tags: ["feature-request"],
        msgs: [
            { from: "c", ago: 700, body: "Our team handles 200+ tickets a day. It would help a lot to select multiple tickets and assign them in one go. Is this on the roadmap?" },
        ],
    },
    {
        subject: "Please delete my account and data",
        customer: 7, status: "OPEN", priority: "HIGH", channel: "EMAIL", assignee: 0, tags: ["privacy", "gdpr"],
        msgs: [
            { from: "c", ago: 180, body: "Under GDPR I'm requesting deletion of all personal data associated with hannah@alpinesoft.de. Please confirm once complete." },
        ],
    },
    {
        subject: "Webhook delivery delayed by several minutes",
        customer: 6, status: "OPEN", priority: "MEDIUM", channel: "CHAT", assignee: 2, tags: ["webhooks", "api"],
        msgs: [
            { from: "c", ago: 120, body: "Our webhook events are arriving 5 to 10 minutes late since this morning." },
            { from: "a", ago: 100, body: "Thanks Ravi, I'm looking at delivery logs for your endpoint. Can you share one event ID that was delayed?" },
            { from: "c", ago: 60, body: "Sure: evt_8f3a21c9." },
        ],
    },
    {
        subject: "Refund request for monthly plan",
        customer: 2, status: "CLOSED", priority: "LOW", channel: "EMAIL", assignee: 1, tags: ["billing", "refund"],
        msgs: [
            { from: "c", ago: 9000, body: "I forgot to cancel and was charged for October. Could I get a refund?" },
            { from: "a", ago: 8900, body: "Hi Tom, monthly plans aren't refunded for the current period, but I've cancelled your renewal so you won't be charged again. Sorry for the hassle." },
        ],
    },
    {
        subject: "Mobile app crashes when attaching photos",
        customer: 4, status: "OPEN", priority: "HIGH", channel: "WEB_FORM", assignee: null, tags: ["bug", "mobile"],
        msgs: [
            { from: "c", ago: 20, body: "On Android 15 the app closes immediately when I tap the attachment icon and pick a photo. Started after the latest update." },
        ],
    },
];


export async function seedDemoData(
    db: Prisma.TransactionClient,
    { adminEmail, wipeAgents = false }: SeedOptions = {},
) {
    await db.draftSource.deleteMany();
    await db.aiDraft.deleteMany();
    await db.message.deleteMany();
    await db.ticket.deleteMany();
    await db.knowledgeArticle.deleteMany();
    await db.customer.deleteMany();
    if (wipeAgents) await db.agent.deleteMany();

    // Upsert by email: an agent already linked to a real Clerk account is kept as is
    const agents: Agent[] = [];
    for (const a of agentsData) {
        const email = a.clerkId === "seed_agent_priya" && adminEmail ? adminEmail : a.email;
        agents.push(await db.agent.upsert({ where: { email }, update: {}, create: { ...a, email } }));
    }

    const customers: Customer[] = [];
    for (const data of customersData) customers.push(await db.customer.create({ data }));

    const articles: KnowledgeArticle[] = [];
    for (const data of articlesData) articles.push(await db.knowledgeArticle.create({ data }));
    const article = (slug: string) => articles.find((a) => a.slug === slug)!;

    const tickets: Ticket[] = [];
    for (const t of ticketsData) {
        const first = t.msgs[0]!;
        const last = t.msgs[t.msgs.length - 1]!;
        const assignee = t.assignee === null ? null : agents[t.assignee]!;

        tickets.push(
            await db.ticket.create({
                data: {
                    subject: t.subject,
                    status: t.status,
                    priority: t.priority,
                    channel: t.channel,
                    tags: t.tags,
                    customerId: customers[t.customer]!.id,
                    assigneeId: assignee?.id ?? null,
                    createdAt: minsAgo(first.ago),
                    lastMessageAt: minsAgo(last.ago),
                    messages: {
                        create: t.msgs.map((m) => ({
                            authorType: m.from === "c" ? ("CUSTOMER" as const) : ("AGENT" as const),
                            agentId: m.from === "a" ? (assignee?.id ?? null) : null,
                            body: m.body,
                            createdAt: minsAgo(m.ago),
                        })),
                    },
                },
            }),
        );
    }

    const byTitle = (s: string) => tickets.find((t) => t.subject.startsWith(s))!;
    const admin = agents[0]!;

    // Seeded drafts now carry citation markers and numbered sources
    await db.aiDraft.create({
        data: {
            ticketId: byTitle("Can't log in").id,
            createdById: admin.id,
            body: "Hi Tom,\n\nSorry about the trouble, and good luck with the demo. Password reset links go to the email currently on your account and stay valid for 30 minutes. [1] Since you changed your address yesterday, please check that the new one is verified under Settings > Security. If the email still doesn't arrive, check your spam folder and reply here, and I'll send a manual reset right away.\n\nBest,\nPriya",
            sources: {
                create: [
                    { articleId: article("reset-password").id, snippet: "A reset link is emailed and stays valid for 30 minutes.", relevance: 0.93, position: 1 },
                ],
            },
        },
    });

    await db.aiDraft.create({
        data: {
            ticketId: byTitle("API returns 429").id,
            createdById: admin.id,
            body: "Hi Aisha,\n\nThanks for the details. On the Pro plan the limit is 600 requests per minute, and requests above it receive HTTP 429 with a Retry-After header. [1] I'd recommend adding exponential backoff to the nightly sync and using our batch endpoints to cut the request count. [1] I'm also checking your account's usage history to see whether the volume crossed the threshold last week, and I'll follow up with what I find.\n\nBest,\nPriya",
            sources: {
                create: [
                    { articleId: article("api-rate-limits").id, snippet: "Pro plans allow 600 requests per minute… Use exponential backoff and batch endpoints.", relevance: 0.97, position: 1 },
                ],
            },
        },
    });

    await db.aiDraft.create({
        data: {
            ticketId: byTitle("Please delete").id,
            createdById: admin.id,
            body: "Hello Hannah,\n\nWe've received your deletion request. Requests are processed within 30 days, and we'll confirm by email as soon as it's complete. [1] Please note that deleted data cannot be recovered. [1] If you'd like a copy first, an admin can export your workspace data from Settings > Data. [1]\n\nKind regards,\nPriya",
            sources: {
                create: [
                    { articleId: article("export-your-data").id, snippet: "Deletion requests are processed within 30 days and confirmed by email.", relevance: 0.95, position: 1 },
                ],
            },
        },
    });

    return {
        agents: agents.length,
        customers: customers.length,
        articles: articles.length,
        tickets: tickets.length,
    };
}