import { expect, test } from "@playwright/test";
import { reseed } from "./db";
import { openInbox, SUBJECTS, ticketRows } from "./ui";

test.describe("inbox", () => {
    test.beforeAll(reseed); // read-only tests: seed once

    test("lists every seeded ticket", async ({ page }) => {
        await openInbox(page);
        await expect(ticketRows(page)).toHaveCount(12);
    });

    test("filters by status and keeps the filter in the URL", async ({ page }) => {
        await openInbox(page);
        await page.getByRole("combobox", { name: "Status" }).click();
        await page.getByRole("option", { name: "Open", exact: true }).click();

        await expect(page).toHaveURL(/status=OPEN/);
        await expect(ticketRows(page)).toHaveCount(8);

        // Filters survive opening a ticket
        await ticketRows(page).first().click();
        await expect(page).toHaveURL(/\/inbox\/.+\?.*status=OPEN/);
    });

    test("'Assigned to me' shows the adopted agent's tickets", async ({ page }) => {
        await openInbox(page);
        await page.getByRole("combobox", { name: "Assignee" }).click();
        await page.getByRole("option", { name: "Assigned to me" }).click();
        await expect(ticketRows(page)).toHaveCount(3);
    });

    test("sorts by highest priority", async ({ page }) => {
        await openInbox(page);
        await page.getByRole("combobox", { name: "Sort by" }).click();
        await page.getByRole("option", { name: "Highest priority" }).click();
        await expect(page).toHaveURL(/sort=priority/);
        await expect(ticketRows(page).first()).toContainText("Urgent");
    });

    test("searches subject and message bodies", async ({ page }) => {
        await openInbox(page);
        await page.getByRole("searchbox", { name: "Search tickets" }).fill("refund");
        await expect(page).toHaveURL(/q=refund/);
        await expect(ticketRows(page)).toHaveCount(2);
    });

    test("shows an empty state with a way out", async ({ page }) => {
        await page.goto("/inbox?q=zzzznomatch");
        await expect(page.getByText("No tickets match")).toBeVisible();
        await page.getByRole("link", { name: "Clear filters" }).click();
        await expect(ticketRows(page)).toHaveCount(12);
    });

    test("falls back to defaults for garbage URL params", async ({ page }) => {
        await page.goto("/inbox?status=banana&sort=nope");
        await expect(ticketRows(page)).toHaveCount(12);
    });

    test("'/' focuses the search box", async ({ page }) => {
        await openInbox(page);
        await page.keyboard.press("/");
        await expect(page.getByRole("searchbox", { name: "Search tickets" })).toBeFocused();
    });

    test("j and k move through tickets", async ({ page }) => {
        await openInbox(page);
        await page.keyboard.press("j");
        await expect(page).toHaveURL(/\/inbox\/.+/);
        await expect(page.locator('[data-ticket-row][aria-current="page"]')).toHaveCount(1);
        const first = page.url();

        await page.keyboard.press("j");
        await expect(page).not.toHaveURL(first);
        await expect(page.locator('[data-ticket-row][aria-current="page"]')).toHaveCount(1);

        await page.keyboard.press("k");
        await expect(page).toHaveURL(first);
    });

    test("the command palette finds and opens a ticket", async ({ page }) => {
        await openInbox(page);
        await page.keyboard.press("Control+k");

        const dialog = page.getByRole("dialog", { name: "Command palette" });
        await expect(dialog).toBeVisible();
        await dialog.getByPlaceholder("Search tickets or type a command…").fill("SSO");
        await dialog.getByRole("option", { name: new RegExp(SUBJECTS.sso) }).click();

        await expect(page).toHaveURL(/\/inbox\/.+/);
        await expect(dialog).toBeHidden();
    });
});