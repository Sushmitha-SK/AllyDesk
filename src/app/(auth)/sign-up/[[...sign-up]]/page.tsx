
import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { authAppearance } from "@/components/auth/clerk-appearance";

export const metadata: Metadata = {
    title: "Create account",
    description: "Create your account securely and get started.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function SignUpPage() {
    return (
        <AuthShell variant="sign-up">
            <Suspense
                fallback={
                    <div
                        className="flex flex-col items-center justify-center space-y-4 py-12 text-muted-foreground"
                        role="status"
                        aria-live="polite"
                        aria-label="Loading sign up form"
                    >
                        <div
                            className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent motion-reduce:animate-none"
                            aria-hidden="true"
                        />
                        <p className="text-sm font-medium">
                            Loading sign up...
                        </p>
                    </div>
                }
            >
                <SignUp appearance={authAppearance} />
            </Suspense>
        </AuthShell>
    );
}
