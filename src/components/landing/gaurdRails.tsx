import { ShieldCheck } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/landing/motion";
import { IconTile, SectionHeading } from "@/components/landing/sectionElements";
import { PRINCIPLES } from "@/lib/data";

export default function Guardrails() {
    return (
        <section className="px-4 pb-24 sm:px-8 sm:pb-32">
            <div className="mx-auto max-w-6xl">
                {/* Header Section: Centered */}
                <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
                    <SectionHeading
                        pill="Guardrails"
                        icon={ShieldCheck}
                        title="Helpful, but never in charge"
                        align="center"
                    >
                        The AI is a fast first draft, with limits that keep your team in control.
                    </SectionHeading>

                    <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-foreground" aria-hidden />
                        <p className="text-sm leading-relaxed text-foreground">
                            Nothing is sent to a customer until a person on your team approves it.
                        </p>
                    </div>
                </div>

                {/* 3-Column Feature Cards Grid */}
                <Stagger className="grid gap-6 md:grid-cols-3">
                    {PRINCIPLES.map((p) => (
                        <StaggerItem key={p.title} className="h-full">
                            <div className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-8">
                                <div>
                                    <div className="mb-12">
                                        <IconTile icon={p.icon} />
                                    </div>
                                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                                        {p.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                        {p.body}
                                    </p>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}