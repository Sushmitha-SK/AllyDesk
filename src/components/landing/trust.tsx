import { Stagger, StaggerItem } from './motion'
import { TRUST } from '@/lib/data'

export default function Trust() {
    return (
        <section
            id="security"
            aria-labelledby="security-heading"
            className="scroll-mt-8 bg-background px-4 py-16 sm:px-8 sm:py-24"
        >
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12 text-center lg:text-left">
                    <div>
                        <p className="mb-4 text-sm font-medium text-secondary-foreground dark:text-primary">
                            Security
                        </p>
                        <h2
                            id="security-heading"
                            className="mt-5 text-balance bg-linear-to-b from-foreground to-foreground/65 bg-clip-text text-3xl font-semibold tracking-tight text-transparent forced-colors:bg-none forced-colors:text-foreground sm:text-5xl sm:leading-[1.08]"
                        >
                            Private by default
                        </h2>
                    </div>
                    <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg md:text-right">
                        Customer conversations are sensitive, so everything behind the landing page needs a sign-in.
                    </p>
                </div>

                <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
                    {TRUST.map(({ icon: Icon, title, body }) => (
                        <StaggerItem key={title}>
                            <div className="h-full min-w-0 rounded-3xl border border-border/70 bg-card p-6 sm:p-7 md:p-5 lg:p-7">
                                <div className="flex items-center gap-4">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background shadow-sm ring-1 ring-foreground/5">
                                        <Icon className="size-4.5 text-primary" aria-hidden />
                                    </span>
                                    <h3 className="min-w-0 wrap-break-word text-xl font-medium tracking-tight text-foreground">
                                        {title}
                                    </h3>
                                </div>
                                <p className="mt-9 text-sm leading-8 text-muted-foreground">{body}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    )
}