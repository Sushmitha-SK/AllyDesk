
import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import { authAppearance } from "@/components/auth/clerk-appearance";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
    title: "Sign in",
    description: "Sign in securely to your account.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function SignInPage() {
    return (
        <AuthShell variant="sign-in">
            <Suspense
                fallback={
                    <div
                        className="flex flex-col items-center justify-center space-y-4 py-12 text-muted-foreground"
                        role="status"
                        aria-live="polite"
                        aria-label="Loading sign in form"
                    >
                        <div
                            className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent motion-reduce:animate-none"
                            aria-hidden="true"
                        />
                        <p className="text-sm font-medium">
                            Loading sign in...
                        </p>
                    </div>
                }
            >
                <SignIn appearance={authAppearance} />
            </Suspense>
        </AuthShell>
    );
}
