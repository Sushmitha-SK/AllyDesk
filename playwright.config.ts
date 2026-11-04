import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

import { AUTH_FILE } from "./e2e/helpers/paths";

dotenv.config({ path: ".env.test" }); // never overrides variables already set (CI)

const PORT = 3100;

export default defineConfig({
    testDir: "./e2e",
    globalSetup: "./e2e/helpers/global-setup.ts",
    fullyParallel: false,
    workers: 1, // all tests share one database
    retries: process.env.CI ? 2 : 0,
    forbidOnly: !!process.env.CI,
    reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
    use: {
        baseURL: `http://localhost:${PORT}`,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    projects: [
        { name: "setup", testMatch: /auth\.setup\.ts/ },
        {
            name: "chromium",
            testMatch: /.*\.spec\.ts/,
            dependencies: ["setup"],
            use: { ...devices["Desktop Chrome"], storageState: AUTH_FILE },
        },
    ],
    webServer: {
        command: `npm run build && npx next start -p ${PORT}`,
        url: `http://localhost:${PORT}`,
        timeout: 240_000,
        // Opt-in only: a reused server might be pointed at the wrong database
        reuseExistingServer: !!process.env.E2E_REUSE_SERVER,
        env: { ...process.env } as Record<string, string>,
    },
});