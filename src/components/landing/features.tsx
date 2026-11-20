import { gridMask } from './sectionElements'
import { DraftDemo } from './interactive'
import Image from 'next/image'
import { assets } from '@/app/assets/assets'

export default function Features() {
    return (
        <section
            id="features"
            aria-labelledby="features-heading"
            className="relative scroll-mt-8 px-4 py-24 sm:px-8 sm:py-32"
        >
            <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-130" style={gridMask} />
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
                    <div className="text-center lg:col-span-7 lg:text-left">
                        <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-secondary-foreground dark:text-primary">
                            <span>Grounded AI</span>
                        </div>
                        <h2
                            id="features-heading"
                            className="mt-5 text-balance bg-linear-to-b from-foreground to-foreground/65 bg-clip-text text-3xl font-semibold tracking-tight text-transparent forced-colors:bg-none forced-colors:text-foreground sm:text-5xl sm:leading-[1.08]">
                            Every fact in a draft points back to an article
                        </h2>
                    </div>

                    <div className="lg:col-span-5 lg:pb-2 text-center lg:text-left">
                        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                            AllyDesk writes the first reply from your own help articles, then shows which ones it used.
                            Your team checks a claim at a glance instead of taking the AI’s word for it.
                        </p>
                    </div>
                </div>

                <div className="relative mt-10 rounded-3xl border border-border/80 bg-muted/20 p-6 shadow-xl backdrop-blur-md sm:p-12">
                    <Image
                        src={assets.poster.src}
                        alt=""
                        aria-hidden
                        fill
                        priority={false}
                        sizes="(max-width: 640px) 100vw, 1152px"
                        className="pointer-events-none rounded-3xl object-cover object-center shadow-xl backdrop-blur-md"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-b from-foreground/50 via-foreground/30 to-foreground/60 backdrop-blur-[2px] dark:from-background/50 dark:via-background/30 dark:to-background/60"/>

                    <div role="group" aria-label="Interactive demo: AI draft with cited sources" className="mt-16">
                        <DraftDemo />
                    </div>
                </div>
            </div>
        </section>
    )
}