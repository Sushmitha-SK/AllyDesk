import { LandingNavbar } from "@/components/landing/landingNavbar";
import { HeroVideo } from "@/components/landing/heroVideo";
import InboxPreview from "@/components/landing/inboxPreview";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
import SocialProof from "@/components/landing/socialProof";


export default function LandingPage() {
    return (
        <div className="relative min-h-screen bg-white text-foreground selection:text-primary">
            <section className="w-full bg-white overflow-hidden font-sans">
                <div className="relative w-full overflow-hidden bg-[#d9d9d9] pb-16">
                    <HeroVideo />
                    <div className="relative z-10">
                        <LandingNavbar />
                        <Hero />
                        <InboxPreview />
                    </div>
                </div>
            </section>
            <SocialProof />
            <Features />
            <CTA />
            <Footer />
        </div>
    );
}