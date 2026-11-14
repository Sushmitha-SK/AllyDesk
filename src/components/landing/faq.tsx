import React from 'react'
import { SectionHeading } from './sectionElements'
import { BookOpen } from 'lucide-react'
import { Reveal } from './motion'
import { Faq } from './interactive'

export default function FrequentlyAskedQuestions() {
    return (
        <section id="faq" className="scroll-mt-8 px-4 py-24 sm:px-8 sm:py-32">
            <div className="mx-auto max-w-3xl">
                <SectionHeading pill="FAQ" icon={BookOpen} title="Questions teams ask first" />
                <Reveal className="mt-14">
                    <Faq />
                </Reveal>
            </div>
        </section>
    )
}
