import { expect, test } from "@playwright/test";
import { query, reseed } from "./db";
import { openTicket, SUBJECTS } from "./ui";



test.describe("AI drafts (Gemini stubbed)", () => {
    test.beforeEach(reseed);

    test("a seeded draft loads with its source", async ({ page }) => {
        await openTicket(page, SUBJECTS.login);
        const draft = page.getByRole("region", { name: "AI draft" });

        await expect(draft.getByLabel("AI draft (editable)")).toHaveValue(/30 minutes/);
        await expect(draft.getByText("How to reset your password")).toBeVisible();
    });

    test("generating a draft streams text and shows retrieved sources", async ({ page }) => {
        await openTicket(page, SUBJECTS.doubleCharge); // no seeded draft
        await page.getByRole("button", { name: "Draft a reply with AI" }).click();

        const draft = page.getByRole("region", { name: "AI draft" });
        await expect(draft.getByRole("button", { name: "Approve & send" })).toBeVisible(); // stream finished
        await expect(draft.getByLabel("AI draft (editable)")).toHaveValue(/stubbed AI draft/);
        await expect(draft.getByText("Refund policy")).toBeVisible();
    });

    test("approving an edited draft sends the edit and links the draft", async ({ page }) => {
        await openTicket(page, SUBJECTS.login);
        const draft = page.getByRole("region", { name: "AI draft" });

        await draft.getByRole("button", { name: "Retry" }).click();
        await expect(draft.getByRole("button", { name: "Approve & send" })).toBeVisible();

        const edited = `Edited by e2e ${Date.now()}`;
        await draft.getByLabel("AI draft (editable)").fill(edited);
        await draft.getByRole("button", { name: "Approve & send" }).click();

        await expect(page.getByText("Reply sent").first()).toBeVisible();
        await expect(page.getByRole("list", { name: "Conversation" }).getByText(edited)).toBeVisible();
        await expect(page.getByRole("button", { name: "Draft a reply with AI" })).toBeVisible();

        // Database: newest draft APPROVED and linked, original text preserved, seeded draft superseded
        const drafts = await query<{ status: string; body: string; sentMessageId: string | null }>(
            `SELECT d.status, d.body, d."sentMessageId"
         FROM "AiDraft" d JOIN "Ticket" t ON t.id = d."ticketId"
        WHERE t.subject = $1
        ORDER BY d."createdAt" DESC`,
            [SUBJECTS.login],
        );
        expect(drafts.map((d) => d.status)).toEqual(["APPROVED", "DISCARDED"]);

        const approved = drafts[0]!;
        expect(approved.body).toContain("stubbed AI draft");
        expect(approved.body).not.toContain("Edited by e2e");

        const [message] = await query<{ body: string }>(`SELECT body FROM "Message" WHERE id = $1`, [
            approved.sentMessageId,
        ]);
        expect(message?.body).toBe(edited);
    });

    test("discarding a draft removes it for good", async ({ page }) => {
        await openTicket(page, SUBJECTS.login);
        await page.getByRole("button", { name: "Discard" }).click();

        await expect(page.getByText("Draft discarded").first()).toBeVisible();
        await expect(page.getByRole("button", { name: "Draft a reply with AI" })).toBeVisible();

        await page.reload();
        await expect(page.getByRole("button", { name: "Draft a reply with AI" })).toBeVisible();
        await expect(page.getByRole("region", { name: "AI draft" })).toHaveCount(0);
    });
});