import { ArrowRight, ChevronRight, Command, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
    return (
        <div className="flex flex-col items-center px-4 pb-8 pt-10 text-center sm:pb-12 sm:pt-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-[13px] font-medium text-neutral-900 shadow-sm border border-black/5 hover:border-black/10 transition-all">
                <span className="flex size-2 rounded-full bg-primary animate-pulse" />
                <span>Introducing Grounded AI Replies 2.0</span>
                <ChevronRight className="size-3 text-neutral-500" />
            </div>

            <h1
                className="mt-5 max-w-4xl text-neutral-900 sm:mt-6 tracking-tight"
                style={{
                    fontSize: "clamp(30px, 8vw, 65px)",
                    lineHeight: 1.05,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                }}
            >
                Support faster with an AI that <br />
                <span
                    className="text-primary inline-flex items-center gap-2"
                    style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}
                >
                    always shows its sources.
                </span>
            </h1>

            <p
                className="mt-4 max-w-2xl px-2 text-neutral-700 sm:mt-6 leading-relaxed font-normal"
                style={{ fontSize: "clamp(14px, 3.5vw, 17px)" }}
            >
                The ultimate workspace for modern support teams. Lightning-fast server-rendered inbox, real-time ticket triage, and human-in-the-loop AI drafts you can trust.
            </p>

            <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:mt-8 sm:w-auto sm:flex-row">
                <Link
                    href="/inbox"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#0b0f1a] py-2.5 pl-6 pr-2 text-[14px] font-medium text-white shadow-xl shadow-black/10 hover:bg-neutral-800 transition-all"
                >
                    Open Live Workspace
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
                        <ArrowRight className="size-4" aria-hidden />
                    </span>
                </Link>
                <Link
                    href="/sign-in"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-medium text-neutral-900 shadow-sm border border-black/5 hover:bg-neutral-50 transition-all"
                >
                    <Command className="size-4 text-neutral-500" aria-hidden /> Book a Demo
                </Link>
            </div>

            <p className="flex items-center gap-2 pt-5 text-xs text-neutral-600 font-medium">
                <ShieldCheck className="size-4 text-emerald-600" /> Enterprise-grade security • Zero training on your private data
            </p>
        </div>
    )
}
