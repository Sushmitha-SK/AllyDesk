import { gridMask } from './sectionElements'
import { Sparkles } from 'lucide-react'
import { DraftDemo } from './interactive'
import Image from 'next/image'
import { assets } from '@/app/assets/assets'

export default function Features() {
    return (
        <section id="features" className="relative scroll-mt-8 px-4 py-24 sm:px-8 sm:py-32">
            <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-130" style={gridMask} />
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
                    <div className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 text-primary font-medium text-sm mb-4">
                            <span>Grounded AI</span>
                        </div>
                        <h2 className="mt-5 text-balance bg-linear-to-b from-foreground to-foreground/65 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-5xl sm:leading-[1.08]">
                            Every fact in a draft points back to an article
                        </h2>
                    </div>

                    <div className="lg:col-span-5 lg:pb-2">
                        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                            AllyDesk writes the first reply from your own help articles, then shows which ones it used.
                            Your team checks a claim at a glance instead of taking the AI’s word for it.
                        </p>

                    </div>
                </div>

                <div className="relative rounded-3xl border border-border/80 bg-muted/20 p-6 sm:p-12 shadow-xl backdrop-blur-md mt-10">
                    <Image
                        src={assets.poster.src}
                        alt="Background poster"
                        fill
                        priority={false}
                        sizes="(max-width: 640px) 100vw, 1152px"
                        className="pointer-events-none object-cover object-center rounded-3xl shadow-xl backdrop-blur-md"
                    />
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-b from-stone-950/50 via-stone-950/30 to-stone-950/60 backdrop-blur-[2px] pointer-events-none rounded-3xl"/>

                    <div className="mt-16">
                        <DraftDemo />
                    </div>
                </div>
            </div>
        </section>
    )
}

