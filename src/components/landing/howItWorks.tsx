import React from 'react'
import { SectionHeading } from './sectionElements'
import { Workflow } from 'lucide-react'
import { Steps } from './interactive'

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="scroll-mt-8 border-y border-border bg-muted/30 px-4 py-24 sm:px-8 sm:py-32">
            <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <SectionHeading pill="How it works" icon={Workflow} title="From new ticket to sent reply in four steps" align="left">
                        Most of the work happens before your agent even opens the ticket.
                    </SectionHeading>
                </div>
                <Steps />
            </div>
        </section>
    )
}
