import { FloatingGlow, MotionLink, Reveal } from './motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
    return (
        <section className="px-4 pb-24 sm:px-8 sm:pb-32">
            <Reveal>
                <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#1c1917] px-6 py-20 text-center text-stone-50 sm:px-12">
                    <div
                        aria-hidden
                        className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                            maskImage: "radial-gradient(ellipse 60% 70% at 50% 0%, #000, transparent 80%)",
                            WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 50% 0%, #000, transparent 80%)",
                        }}
                    />
                    <FloatingGlow className="absolute left-1/2 top-0 size-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/30 blur-3xl" />
                    <div className="relative">
                        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.08]">
                            Open a ticket and see the first draft with its sources
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-stone-300 sm:text-lg">
                            Sign in, pick any ticket and let AllyDesk draft the reply. You’ll see exactly which
                            articles it used before you send anything.
                        </p>
                        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <MotionLink
                                href="/inbox"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="group inline-flex items-center gap-3 rounded-full bg-amber-500 py-2.5 pl-6 pr-2 text-sm font-medium text-stone-950 shadow-lg shadow-amber-500/20"
                            >
                                Open the workspace
                                <span className="flex size-7 items-center justify-center rounded-full bg-black/10 transition-transform group-hover:translate-x-0.5">
                                    <ArrowRight className="size-4" aria-hidden />
                                </span>
                            </MotionLink>
                            <MotionLink
                                href="/sign-up"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-stone-50 backdrop-blur"
                            >
                                Create an account
                            </MotionLink>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    )
}
