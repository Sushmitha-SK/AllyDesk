import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { reseed } from "./db";
import { openInbox, openTicket, SUBJECTS } from "./ui";



const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

async function scan(page: Page) {
    const results = await new AxeBuilder({ page })
        .withTags(TAGS)
        .exclude(".cl-rootBox") // Clerk's own UserButton markup isn't ours to fix
        .analyze();
    expect(results.violations).toEqual([]);
}

for (const scheme of ["light", "dark"] as const) {
    test.describe(`accessibility (${scheme})`, () => {
        test.use({ colorScheme: scheme });
        test.beforeAll(reseed);

        test("landing page", async ({ page }) => {
            await page.goto("/");
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await scan(page);
        });

        test("inbox", async ({ page }) => {
            await openInbox(page);
            await scan(page);
        });

        test("ticket detail", async ({ page }) => {
            await openTicket(page, SUBJECTS.login);
            await expect(page.getByRole("list", { name: "Conversation" })).toBeVisible();
            await expect(page.getByRole("region", { name: "AI draft" })).toBeVisible();
            await scan(page);
        });
    });
}