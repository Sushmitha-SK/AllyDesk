import { expect, type Page } from "@playwright/test";

// Ticket numbers keep climbing across reseeds, so tests identify tickets by subject.
export const SUBJECTS = {
    login: "Can't log in after changing my email", // has a seeded AI draft
    doubleCharge: "Charged twice for the annual plan", // urgent, assigned to someone else
    closedRefund: "Refund request for monthly plan", // CLOSED
    unassigned: "Dark mode flickers on page load",
    sso: "Enterprise SSO setup question",
} as const;

export const ticketRows = (page: Page) => page.locator("[data-ticket-row]");

export async function openInbox(page: Page) {
    await page.goto("/inbox");
    await expect(ticketRows(page).first()).toBeVisible();
}

export async function openTicket(page: Page, subject: string) {
    await openInbox(page);
    await ticketRows(page).filter({ hasText: subject }).click();
    await expect(page.getByTestId("ticket-controls")).toBeVisible();
}