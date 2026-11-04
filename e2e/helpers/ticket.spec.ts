import { expect, test } from "@playwright/test";
import { reseed } from "./db";
import { openTicket, SUBJECTS } from "./ui";

test.describe("ticket detail", () => {
    test.beforeEach(reseed);

    test("shows the conversation and customer context", async ({ page }) => {
        await openTicket(page, SUBJECTS.doubleCharge);

        await expect(
            page.getByRole("list", { name: "Conversation" }).getByText("two charges of $480"),
        ).toBeVisible();
        await expect(page.getByRole("complementary", { name: "Customer details" })).toContainText(
            "Daniel Foster",
        );
    });

    test("changing status persists and leaves an audit line", async ({ page }) => {
        await openTicket(page, SUBJECTS.doubleCharge);
        const status = page.getByTestId("ticket-controls").getByRole("combobox", { name: "Status" });

        await status.click();
        await page.getByRole("option", { name: "Resolved" }).click();

        await expect(status).toContainText("Resolved");
        await expect(
            page.getByRole("list", { name: "Conversation" }).getByText(/changed status from Open to Resolved/),
        ).toBeVisible();

        await page.reload();
        await expect(status).toContainText("Resolved");
    });

    test("an unassigned ticket can be assigned to yourself", async ({ page }) => {
        await openTicket(page, SUBJECTS.unassigned);
        const assignee = page.getByTestId("ticket-controls").getByRole("combobox", { name: "Assignee" });
        await expect(assignee).toContainText("Unassigned");

        await assignee.click();
        await page.getByRole("option", { name: /\(you\)/ }).click();

        await expect(assignee).toContainText("(you)");
        await expect(
            page.getByRole("list", { name: "Conversation" }).getByText(/assigned this ticket to themselves/),
        ).toBeVisible();
    });

    test("sending a reply adds it to the thread and clears the box", async ({ page }) => {
        await openTicket(page, SUBJECTS.doubleCharge);
        const text = `Reply from e2e ${Date.now()}`;
        const box = page.getByLabel("Reply to customer");
        const send = page.getByRole("button", { name: "Send reply" });

        await expect(send).toBeDisabled(); // empty box
        await box.fill(text);
        await send.click();

        await expect(page.getByText("Reply sent").first()).toBeVisible();
        await expect(page.getByRole("list", { name: "Conversation" }).getByText(text)).toBeVisible();
        await expect(box).toHaveValue("");
    });

    test("Ctrl+Enter sends too", async ({ page }) => {
        await openTicket(page, SUBJECTS.doubleCharge);
        const text = `Shortcut reply ${Date.now()}`;
        await page.getByLabel("Reply to customer").fill(text);
        await page.keyboard.press("Control+Enter");
        await expect(page.getByRole("list", { name: "Conversation" }).getByText(text)).toBeVisible();
    });

    test("a closed ticket rejects replies and keeps the text", async ({ page }) => {
        await openTicket(page, SUBJECTS.closedRefund);
        const box = page.getByLabel("Reply to customer");

        await box.fill("Trying to reply");
        await page.getByRole("button", { name: "Send reply" }).click();

        await expect(page.getByText(/This ticket is closed/).first()).toBeVisible();
        await expect(box).toHaveValue("Trying to reply");
    });

    test("an unknown ticket id shows the not-found state", async ({ page }) => {
        await page.goto("/inbox/does-not-exist");
        await expect(page.getByText("Ticket not found")).toBeVisible();
    });
});