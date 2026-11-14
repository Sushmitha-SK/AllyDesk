import React from 'react'
import { SectionHeading } from './sectionElements'
import { Keyboard } from 'lucide-react'
import { Reveal } from './motion'
import { WorkspaceTabs } from './interactive'

export default function Workspace() {
    return (
        <section id="workspace" className="scroll-mt-8 px-4 py-24 sm:px-8 sm:py-32">
            <div className="mx-auto max-w-6xl">
                <SectionHeading pill="Workspace" icon={Keyboard} title="A workspace your team will actually enjoy">
                    Pick a tab to see how each part of AllyDesk looks.
                </SectionHeading>
                <div className="mt-14">
                    <Reveal>
                        <WorkspaceTabs />
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
