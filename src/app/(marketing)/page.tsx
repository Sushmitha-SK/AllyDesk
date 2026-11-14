
'use client'
import { LandingNavbar } from "@/components/landing/landingNavbar";
import { HeroVideo } from "@/components/landing/heroVideo";
import InboxPreview from "@/components/landing/inboxPreview";
import Hero from "@/components/landing/hero";
import {
    MotionRoot,
    ScrollFloat,
} from "@/components/landing/motion";
import Stats from "@/components/landing/stats";
import Features from "@/components/landing/features";
import HowItWorks from "@/components/landing/howItWorks";
import Workspace from "@/components/landing/workspace";
import Trust from "@/components/landing/trust";
import FrequentlyAskedQuestions from "@/components/landing/faq"
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
import Guardrails from "@/components/landing/gaurdRails";

export default function LandingPage() {
    return (
        <MotionRoot>
            <div className="relative min-h-screen overflow-x-clip bg-background font-sans text-foreground selection:text-primary">
                <section className="w-full overflow-hidden">
                    <div className="relative w-full overflow-hidden bg-[#d9d9d9] pb-16">
                        <HeroVideo />
                        <div className="relative z-10">
                            <LandingNavbar />
                            <Hero />
                            <ScrollFloat>
                                <InboxPreview />
                            </ScrollFloat>
                        </div>
                    </div>
                </section>
                <Stats />
                <Features />
                <Guardrails />
                <HowItWorks />
                <Workspace />
                <Trust />
                <FrequentlyAskedQuestions />
                <CTA />
                <Footer />
            </div>
        </MotionRoot>
    );
}