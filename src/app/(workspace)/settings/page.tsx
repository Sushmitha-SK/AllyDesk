import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountButton } from "@/features/settings/components/account-button";
import { AppearancePicker } from "@/features/settings/components/appearance-picker";
import { PreferencesForm } from "@/features/settings/components/preferences-form";
import { ProfileForm } from "@/features/settings/components/profile-form";
import { TeamSection } from "@/features/settings/components/team-section";
import { getTeam } from "@/features/settings/queries";
import { ShortcutList } from "@/features/shortcuts/components/shortcut-list";
import { getCurrentAgent } from "@/lib/auth";

export const metadata: Metadata = { title: "Settings" };

function Section({
    id,
    title,
    description,
    children,
}: {
    id: string;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <Card aria-labelledby={id} role="region">
            <CardHeader>
                <CardTitle id={id} className="text-base">
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}

export default async function SettingsPage() {
    const agent = await getCurrentAgent();
    const team = agent.role === "ADMIN" ? await getTeam() : [];

    return (
        <div className="mx-auto max-w-8xl space-y-6 p-4 md:p-6">
            <header>
                <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
                <p className="mt-1 text-sm text-muted-foreground">Your profile, preferences and workspace.</p>
            </header>

            <Section id="s-profile" title="Profile" description="How you appear to teammates and customers.">
                <ProfileForm
                    initialName={agent.name}
                    email={agent.email}
                    role={agent.role}
                    avatarUrl={agent.avatarUrl}
                />
            </Section>

            <Section
                id="s-replies"
                title="Replies & AI"
                description="Applies to you only, on every device."
            >
                <PreferencesForm
                    initial={{
                        signature: agent.signature ?? "",
                        pendingAfterReply: agent.pendingAfterReply,
                        aiDraftsEnabled: agent.aiDraftsEnabled,
                    }}
                />
            </Section>

            <Section id="s-appearance" title="Appearance" description="Saved in this browser.">
                <AppearancePicker />
            </Section>

            <Section id="s-shortcuts" title="Keyboard shortcuts" description="Press ? anywhere to see these again.">
                <ShortcutList />
            </Section>

            {agent.role === "ADMIN" && (
                <Section
                    id="s-team"
                    title="Team"
                    description="Admins can change other agents' roles. You can't change your own."
                >
                    <TeamSection team={team} currentAgentId={agent.id} />
                </Section>
            )}

            <Section
                id="s-account"
                title="Account"
                description="Your sign-in email, password and sessions are managed by Clerk."
            >
                <AccountButton />
            </Section>
        </div>
    );
}