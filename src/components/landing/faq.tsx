// import React from 'react'
// import { SectionHeading } from './sectionElements'
// import { BookOpen } from 'lucide-react'
// import { Reveal } from './motion'
// import { Faq } from './interactive'

// export default function FrequentlyAskedQuestions() {
//     return (
//         <section id="faq" className="scroll-mt-8 px-4 py-24 sm:px-8 sm:py-32">
//             <div className="mx-auto max-w-3xl">
//                 <SectionHeading pill="FAQ" title="Questions teams ask first" />
//                 <Reveal className="mt-14">
//                     <Faq />
//                 </Reveal>
//             </div>
//         </section>
//     )
// }


import { SectionHeading } from './sectionElements'
import { Reveal } from './motion'
import { Faq } from './interactive'
import { FAQ } from '@/lib/data'

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.filter((f) => typeof f.a === 'string').map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
}

export default function FrequentlyAskedQuestions() {
    return (
        <section
            id="faq"
            aria-labelledby="faq-heading"
            className="scroll-mt-8 px-4 py-24 sm:px-8 sm:py-32"
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
            />
            <div className="mx-auto max-w-3xl">
                <SectionHeading id="faq-heading" pill="FAQ" title="Questions teams ask first" />
                <Reveal className="mt-14">
                    <Faq />
                </Reveal>
            </div>
        </section>
    )
}