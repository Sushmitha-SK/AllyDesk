import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import { ShieldCheck, Sparkles, Zap, Layers } from "lucide-react"; // or your preferred icon library

export default function SignInPage() {
    return (
        <div className="flex min-h-screen w-full bg-white/70">
            {/* Left Column: Branded / Marketing Showcase */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-card border-r border-border relative overflow-hidden">
                {/* Decorative background glow matching your primary/amber theme */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/50 rounded-full blur-3xl pointer-events-none" />

                {/* Top: Brand Logo / Name */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                        <Layers className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-foreground">
                        AllyDesk
                    </span>
                </div>

                {/* Middle: Value Proposition */}
                <div className="my-auto max-w-md relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Next-Gen Support</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
                        Manage your workspace with speed and precision.
                    </h1>
                    <p className="text-muted-foreground text-base leading-relaxed">
                        Sign in to access your dashboard, track requests in real-time, and streamline your operational workflow.
                    </p>

                    {/* Feature bullets */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3 text-sm text-foreground/80">
                            <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                                <Zap className="h-3.5 w-3.5" />
                            </div>
                            <span>Lightning-fast performance and instant sync</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-foreground/80">
                            <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                                <ShieldCheck className="h-3.5 w-3.5" />
                            </div>
                            <span>Enterprise-grade security and authentication</span>
                        </div>
                    </div>
                </div>

                {/* Bottom: Footer note / copyright */}
                <div className="text-xs text-muted-foreground relative z-10">
                   &copy; {new Date().getFullYear()} AllyDesk. All rights reserved.
                </div>
            </div>

            {/* Right Column: Clerk Sign-In Component */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
                {/* Mobile top branding */}
                <div className="lg:hidden flex items-center gap-2 mb-8">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Layers className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-lg text-foreground">YourBrand</span>
                </div>

                <div className="w-full max-w-md flex flex-col items-center">
                    <Suspense fallback={
                        <div className="flex flex-col items-center justify-center py-12 space-y-4 text-muted-foreground">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                            <p className="text-sm font-medium">Loading sign in...</p>
                        </div>
                    }>
                        <SignIn
                            appearance={{

                                elements: {
                                    card: 'bg-card shadow-lg border border-border rounded-xl p-0 sm:p-6',
                                    headerTitle: 'text-foreground font-bold text-xl',
                                    headerSubtitle: 'text-muted-foreground text-sm',
                                    socialButtonsBlockButton: 'border border-border hover:bg-muted transition-colors',
                                    formButtonPrimary: 'bg-primary text-primary-foreground hover:opacity-90 transition-opacity',
                                    footerActionLink: 'text-primary hover:underline',
                                }
                            }}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}