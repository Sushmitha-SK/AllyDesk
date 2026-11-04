import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";
import { seedDemoData } from "../src/lib/demo/seed-data";

const db = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

seedDemoData(db, { adminEmail: process.env.SEED_ADMIN_EMAIL, wipeAgents: true })
    .then((c) =>
        console.log(`Seeded ${c.agents} agents, ${c.customers} customers, ${c.articles} articles, ${c.tickets} tickets.`),
    )
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => db.$disconnect());