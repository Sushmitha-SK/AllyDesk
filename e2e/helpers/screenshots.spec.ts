import { test } from "@playwright/test";
import { reseed } from "./db";
import { openInbox, openTicket, SUBJECTS } from "./ui";


test.skip(!process.env.SCREENSHOTS, "Run with: npm run screenshots");
test.beforeAll(reseed); // fresh relative timestamps

const VARIANTS = [
    { name: "desktop-light", colorScheme: "light", viewport: { width: 1440, height: 900 } },
    { name: "desktop-dark", colorScheme: "dark", viewport: { width: 1440, height: 900 } },
    { name: "mobile-light", colorScheme: "light", viewport: { width: 390, height: 844 } },
] as const;

for (const variant of VARIANTS) {
    test.describe(variant.name, () => {
        test.use({ colorScheme: variant.colorScheme, viewport: variant.viewport });

        test("capture", async ({ page }) => {
            await openInbox(page);
            await page.screenshot({ path: `docs/screenshots/${variant.name}-inbox.png` });

            await openTicket(page, SUBJECTS.login);
            await page.getByRole("region", { name: "AI draft" }).waitFor();
            await page.screenshot({ path: `docs/screenshots/${variant.name}-ticket.png` });
        });
    });
}