
import Image from 'next/image'
import { assets } from '@/app/assets/assets'
import { MotionLink, Reveal } from './motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
    return (
        <section className="relative px-4 pb-16 sm:px-8 sm:pb-24 overflow-hidden">
            <Reveal>
                <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-6 py-12 text-center text-stone-50 sm:px-16 sm:py-16 shadow-xs">

                    <Image
                        src={assets.poster.src}
                        alt="Background poster"
                        fill
                        priority={false}
                        sizes="(max-width: 640px) 100vw, 1152px"
                        className="pointer-events-none object-cover object-center"
                    />

                    {/* Dark Overlay with Gradient Vignette for Readability */}
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-b from-stone-950/80 via-stone-950/70 to-stone-950/90 backdrop-blur-[2px] pointer-events-none"
                    />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Top Badge */}
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1 text-xs font-medium text-amber-300 shadow-inner backdrop-blur-md">
                            <Sparkles className="size-3.5" />
                            <span>AI-Powered Support Workspace</span>
                        </div>

                        <h2 className="mx-auto max-w-3xl text-balance text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl sm:leading-[1.15]">
                            Open a ticket and see the first draft with its sources
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-stone-300 sm:text-base">
                            Sign in, pick any ticket and let AllyDesk draft the reply. You’ll see exactly which
                            articles it used before you send anything.
                        </p>

                        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                            <MotionLink
                                href="/inbox"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative inline-flex items-center gap-3 rounded-full bg-primary py-2.5 pl-6 pr-3 text-sm font-semibold text-white shadow-xl shadow-primary/25 transition-all hover:bg-primary/95"
                            >
                                <span>Open the workspace</span>
                                <span className="flex size-6 items-center justify-center rounded-full bg-black/15 transition-transform duration-300 group-hover:translate-x-1">
                                    <ArrowRight className="size-3.5" aria-hidden />
                                </span>
                            </MotionLink>

                            <MotionLink
                                href="/sign-up"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-semibold text-stone-50 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/15"
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
