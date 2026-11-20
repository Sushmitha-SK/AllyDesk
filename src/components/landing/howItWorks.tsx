import { SectionHeading } from './sectionElements'
import { Steps } from './interactive'

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            aria-labelledby="how-it-works-heading"
            className="scroll-mt-8 px-4 py-24 sm:px-8 sm:py-32"
        >
            <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
                    <SectionHeading
                        id="how-it-works-heading"
                        pill="How it works"
                        title="From new ticket to sent reply in four steps"
                        align="left"
                    >
                        Most of the work happens before your agent even opens the ticket.
                    </SectionHeading>
                </div>
                <div className="min-w-0">
                    <Steps />
                </div>
            </div>
        </section>
    )
}