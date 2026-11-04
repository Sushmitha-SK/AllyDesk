import { clerk } from "@clerk/testing/playwright";
import { expect, test as setup } from "@playwright/test";
import { ticketRows } from "./ui";
import { AUTH_FILE } from "./paths";

setup("sign in as the test agent", async ({ page }) => {
    // Any page that loads Clerk will do
    await page.goto("/sign-in");

    await clerk.signIn({
        page,
        signInParams: {
            strategy: "password",
            identifier: process.env.E2E_CLERK_USER_EMAIL!,
            password: process.env.E2E_CLERK_USER_PASSWORD!,
        },
    });

    // First authenticated request: getCurrentAgent() adopts the seeded admin by email
    await page.goto("/inbox");
    await expect(ticketRows(page).first()).toBeVisible();

    await page.context().storageState({ path: AUTH_FILE });
});