import React from 'react'
import { gridMask, SectionHeading } from './sectionElements'
import { Sparkles } from 'lucide-react'
import { DraftDemo } from './interactive'

export default function Features() {
    return (
        <section id="features" className="relative scroll-mt-8 px-4 py-24 sm:px-8 sm:py-32">
            <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-130" style={gridMask} />
            <div className="mx-auto max-w-6xl">
                <SectionHeading pill="Grounded AI" icon={Sparkles} title="Every fact in a draft points back to an article">
                    AllyDesk writes the first reply from your own help articles, then shows which ones it used.
                    Your team checks a claim at a glance instead of taking the AI’s word for it.
                </SectionHeading>

                <div className="mt-16">
                    <DraftDemo />
                </div>
            </div>
        </section>

    )
}


