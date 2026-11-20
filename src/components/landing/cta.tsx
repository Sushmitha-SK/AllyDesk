import Image from 'next/image'
import { assets } from '@/app/assets/assets'
import { MotionLink, Reveal } from './motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const springTransition = {
    type: 'spring' as const,
    stiffness: 450,
    damping: 32,
    mass: 0.8,
}
const onScrim = 'text-background dark:text-foreground'
const onScrimMuted = 'text-background/80 dark:text-foreground/80'

const focusRing =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background dark:focus-visible:outline-foreground'

function RollingLabel({ text }: { text: string }) {
    return (
        <span className="relative inline-flex overflow-hidden leading-tight">
            <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[120%] group-focus-visible:-translate-y-[120%] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0">
                {text}
            </span>
            <span
                aria-hidden
                className="absolute inset-0 inline-block translate-y-[120%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:hidden"
            >
                {text}
            </span>
        </span>
    )
}

export default function CTA() {
    return (
        <section
            id="get-started"
            aria-labelledby="cta-heading"
            className="relative scroll-mt-8 overflow-hidden px-4 pb-16 sm:px-8 sm:pb-24"
        >
            <Reveal>
                <div className={`relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-6 py-12 text-center shadow-xs sm:px-16 sm:py-16 ${onScrim}`}>

                    {/* Decorative backdrop: empty alt keeps it out of the accessibility tree and image SEO */}
                    <Image
                        src={assets.poster.src}
                        alt=""
                        aria-hidden
                        fill
                        priority={false}
                        sizes="(max-width: 640px) 100vw, 1152px"
                        className="pointer-events-none object-cover object-center"
                    />

                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-linear-to-b from-foreground/80 via-foreground/70 to-foreground/90 backdrop-blur-[2px] dark:from-background/80 dark:via-background/70 dark:to-background/90"
                    />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-background/10 bg-background/10 px-3.5 py-1 text-xs font-medium text-secondary shadow-inner backdrop-blur-md dark:border-foreground/10 dark:bg-foreground/10 dark:text-secondary-foreground">
                            <Sparkles className="size-3.5 shrink-0" aria-hidden />
                            <span>AI-Powered Support Workspace</span>
                        </div>

                        <h2
                            id="cta-heading"
                            className="mx-auto max-w-3xl text-balance text-2xl font-bold tracking-tight sm:text-4xl sm:leading-[1.15] lg:text-5xl"
                        >
                            Open a ticket and see the first draft with its sources
                        </h2>

                        <p className={`mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed sm:text-base ${onScrimMuted}`}>
                            Sign in, pick any ticket and let AllyDesk draft the reply. You’ll see exactly which
                            articles it used before you send anything.
                        </p>

                        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                            <MotionLink
                                href="/inbox"
                                whileTap={{ scale: 0.98 }}
                                transition={springTransition}
                                className={`group relative inline-flex min-h-11 w-full max-w-xs items-center justify-center gap-3 overflow-hidden rounded-full bg-primary py-2.5 pl-6 pr-3 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-colors duration-200 hover:bg-primary/90 motion-reduce:transition-none dark:text-primary-foreground sm:w-auto sm:max-w-none ${focusRing}`}
                            >
                                <RollingLabel text="Open the workspace" />
                                <span
                                    aria-hidden
                                    className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground/15 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 motion-reduce:transition-none dark:bg-primary-foreground/15"
                                >
                                    <ArrowRight className="size-3.5" />
                                </span>
                            </MotionLink>

                            <MotionLink
                                href="/sign-up"
                                whileTap={{ scale: 0.98 }}
                                transition={springTransition}
                                className={`group relative inline-flex min-h-11 w-full max-w-xs items-center justify-center overflow-hidden rounded-full border border-background/20 bg-background/10 px-6 py-2.5 text-sm font-semibold backdrop-blur-md transition-colors duration-200 hover:border-background/35 hover:bg-background/15 motion-reduce:transition-none dark:border-foreground/20 dark:bg-foreground/10 dark:hover:border-foreground/35 dark:hover:bg-foreground/15 sm:w-auto sm:max-w-none ${onScrim} ${focusRing}`}
                            >
                                <RollingLabel text="Create an account" />
                            </MotionLink>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    )
}