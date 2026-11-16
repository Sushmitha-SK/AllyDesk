// import { SectionHeading } from './sectionElements'
// import { Reveal } from './motion'
// import { WorkspaceTabs } from './interactive'

// export default function Workspace() {
//     return (
//         <section id="workspace" className="scroll-mt-8 px-4 py-24 sm:px-8 sm:py-32">
//             <div className="mx-auto max-w-6xl">
//                 <SectionHeading pill="Workspace" title="A workspace your team will actually enjoy">
//                     Pick a tab to see how each part of AllyDesk looks.
//                 </SectionHeading>
//                 <div className="mt-14">
//                     <Reveal>
//                         <WorkspaceTabs />
//                     </Reveal>
//                 </div>
//             </div>
//         </section>
//     )
// }


import { SectionHeading } from './sectionElements'
import { Reveal } from './motion'
import { WorkspaceTabs } from './interactive'
import Image from 'next/image'
import { assets } from '@/app/assets/assets'

export default function Workspace() {
    return (
        <section id="workspace" className="scroll-mt-8 px-4 py-24 sm:px-8 sm:py-32">
            <div className="mx-auto max-w-6xl">
                <SectionHeading pill="Workspace" title="A workspace your team will actually enjoy">
                    Pick a tab to see how each part of AllyDesk looks.
                </SectionHeading>

                {/* 1. Added isolate to isolate the stacking context so -z-10 works correctly */}
                {/* 2. Added explicit min-height so the div isn't 0px tall */}
                <div className="relative isolate mt-14 min-h-[550px] overflow-hidden rounded-3xl p-6 sm:p-12">
                    {/* Background Image - removed .src and kept the import object */}
                    <Image
                        src={assets.poster}
                        alt="Workspace background"
                        fill
                        priority
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <Reveal className="relative z-10">
                        <WorkspaceTabs />
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

