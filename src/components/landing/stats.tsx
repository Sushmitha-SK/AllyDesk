import { CountUp, Reveal } from './motion'
import { STATS } from '@/lib/data'

export default function Stats() {
    return (
        <section aria-labelledby="stats-heading" className="px-4 pt-16 sm:px-8">
            <h2 id="stats-heading" className="sr-only">
                AllyDesk at a glance
            </h2>
            <Reveal>
                <dl className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4 md:divide-x md:divide-border">
                    {STATS.map((s, i) => (
                        <div
                            key={s.label}
                            className={`flex min-w-0 flex-col p-4 text-center min-[380px]:p-6 sm:p-8 ${i < 2 ? "border-b border-border md:border-b-0" : ""} ${i % 2 === 0 ? "border-r border-border md:border-r-0" : ""}`}
                        >
                            <dt className="order-2 mt-2 text-sm font-medium text-foreground wrap-anywhere">
                                {s.label}
                            </dt>
           
                            <dd className="order-1 text-3xl font-semibold tracking-tight text-primary min-[380px]:text-4xl sm:text-5xl">
                                <span className="sr-only">
                                    {s.to}
                                    {s.suffix}
                                </span>
                                <span aria-hidden>
                                    <CountUp to={s.to} suffix={s.suffix} />
                                </span>
                            </dd>
                            <dd className="order-3 mt-0.5 text-xs text-muted-foreground wrap:anywhere">
                                {s.sub}
                            </dd>
                        </div>
                    ))}
                </dl>
            </Reveal>
        </section>
    )
}