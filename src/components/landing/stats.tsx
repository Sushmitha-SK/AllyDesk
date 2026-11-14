import React from 'react'
import { CountUp, Reveal } from './motion'
import { STATS } from '@/lib/data'

export default function Stats() {
    return (
        <section aria-label="At a glance" className="px-4 pt-16 sm:px-8">
            <Reveal>
                <dl className={` mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4 md:divide-x md:divide-border`}>
                    {STATS.map((s, i) => (
                        <div
                            key={s.label}
                            className={`p-6 text-center sm:p-8 ${i < 2 ? "border-b border-border md:border-b-0" : ""} ${i % 2 === 0 ? "border-r border-border md:border-r-0" : ""}`}
                        >
                            <dd className="bg-primary bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                                <CountUp to={s.to} suffix={s.suffix} />
                            </dd>
                            <dt className="mt-2 text-sm font-medium text-foreground">{s.label}</dt>
                            <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
                        </div>
                    ))}
                </dl>
            </Reveal>
        </section>
    )
}
