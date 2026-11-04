import { clerkSetup } from "@clerk/testing/playwright";
import { execSync } from "node:child_process";
import { assertTestDatabase, reseed } from "./db";


export default async function globalSetup() {
    assertTestDatabase();
    await clerkSetup(); // fetches a Clerk testing token; workers inherit it
    execSync("npx prisma migrate deploy", { stdio: "inherit", env: process.env });
    reseed();
}