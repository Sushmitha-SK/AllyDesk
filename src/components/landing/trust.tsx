import React from 'react'
import { IconTile, SectionHeading } from './sectionElements'
import { ShieldCheck } from 'lucide-react'
import { SpotlightCard, Stagger, StaggerItem } from './motion'
import { TRUST } from '@/lib/data'

export default function Trust() {
    return (
        <section id="security" className="scroll-mt-8 border-y border-border bg-muted/30 px-4 py-24 sm:px-8 sm:py-32">
            <div className="mx-auto max-w-6xl">
                <SectionHeading pill="Security" icon={ShieldCheck} title="Private by default">
                    Customer conversations are sensitive, so everything behind the landing page needs a sign-in.
                </SectionHeading>

                <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
                    {TRUST.map((s) => (
                        <StaggerItem key={s.title}>
                            <SpotlightCard className={`surfaceCard h-full p-6 transition-colors hover:border-primary/40`}>
                                <IconTile icon={s.icon} />
                                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                            </SpotlightCard>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    )
}
