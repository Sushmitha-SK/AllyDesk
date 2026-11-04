import { execSync } from "node:child_process";
import { Client, type QueryResultRow } from "pg";

/** Seeding wipes every table, so refuse to touch anything that isn't a *_test database. */
export function assertTestDatabase() {
    const url = process.env.DATABASE_URL;
    const name = url ? new URL(url).pathname.slice(1) : "";
    if (!name.endsWith("_test")) {
        throw new Error(
            `Refusing to run e2e tests: DATABASE_URL must point at a database whose name ends in "_test" (got "${name}").`,
        );
    }
}

/** Wipes and re-seeds the test database. Takes a couple of seconds. */
export function reseed() {
    assertTestDatabase();
    execSync("npx tsx prisma/seed.ts", { stdio: "pipe", env: process.env });
}

/** Read-only SQL for assertions that can't be made through the UI. */
export async function query<T extends QueryResultRow>(sql: string, params: unknown[] = []) {
    assertTestDatabase();
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    try {
        return (await client.query<T>(sql, params)).rows;
    } finally {
        await client.end();
    }
}