import { ArrowRight, Sparkles } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function CTA() {
    return (
        <section className="relative  bg-white  p-10 sm:p-16 text-center overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <div className="inline-flex size-12 rounded-2xl bg-primary/20 text-primary items-center justify-center mb-1">
                    <Sparkles className="size-6" />
                </div>
                <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to transform your support workflow?</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Join elite engineering teams delivering lightning-fast customer support with absolute precision.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Button size="lg" asChild className="w-full sm:w-auto h-12 px-8 text-base shadow-xl shadow-primary/25 rounded-full font-medium">
                        <Link href="/inbox">
                            Open Workspace Now <ArrowRight className="size-4 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}


