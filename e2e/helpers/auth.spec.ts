import { expect, test } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } }); // signed out

test("signed-out visitors are sent to sign-in", async ({ page }) => {
    await page.goto("/inbox");
    await expect(page).toHaveURL(/\/sign-in/);
});

test("the landing page is public", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Answer customers faster");
});

test("the AI route never answers anonymous callers", async ({ request }) => {
    const res = await request.post("/api/ai/reply", {
        data: { ticketId: "x" },
        maxRedirects: 0,
    });
    expect(res.ok()).toBe(false);
});