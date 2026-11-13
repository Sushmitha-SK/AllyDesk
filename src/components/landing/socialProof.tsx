import { Building2, Coffee, Scissors, Star, Stethoscope } from 'lucide-react'
import React from 'react'

export default function SocialProof() {
    return (
        <section className="w-full bg-white py-16 px-4 md:px-8 border-b border-border">
            <div className="max-w-6xl mx-auto flex flex-col items-center">

                {/* Rating & Avatars Header */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-12 text-center sm:text-left">
                    <div className="flex -space-x-2 overflow-hidden">
                        <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" alt="User" />
                        <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" alt="User" />
                        <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" alt="User" />
                        <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces" alt="User" />
                        <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces" alt="User" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                            <span className="font-bold text-foreground text-sm ml-1.5">4.8 out of 5</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">from 1,200+ verified reviews</span>
                    </div>
                </div>

                {/* Four Highlight Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
                    <div className="bg-card rounded-t-2xl rounded-b-4xl p-6 shadow-xs border border-border/65 flex flex-col items-center text-center transition-all">
                        <span className="text-[11px] font-semibold tracking-wider text-foreground uppercase mb-2">Rated</span>
                        <h3 className="text-xl font-semibold text-foreground mb-1">Top rated</h3>
                        <p className="text-xs text-muted-foreground font-medium">4.8 average score</p>
                    </div>
                    <div className="bg-secondary rounded-t-2xl rounded-b-4xl p-6 shadow-xs border border-secondary flex flex-col items-center text-center transition-all">
                        <span className="text-[11px] font-semibold tracking-wider text-secondary-foreground uppercase mb-2">Support</span>
                        <h3 className="text-xl font-semibold text-foreground mb-1">Fastest replies</h3>
                        <p className="text-xs text-secondary-foreground font-medium">Under 10 seconds</p>
                    </div>
                    <div className="bg-secondary rounded-t-2xl rounded-b-4xl p-6 shadow-xs border border-secondary flex flex-col items-center text-center transition-all">
                        <span className="text-[11px] font-semibold tracking-wider text-secondary-foreground uppercase mb-2">Setup</span>
                        <h3 className="text-xl font-semibold text-foreground mb-1">Easiest setup</h3>
                        <p className="text-xs text-secondary-foreground font-medium">Live in 4 days</p>
                    </div>
                    <div className="bg-card rounded-t-2xl rounded-b-4xl p-6 shadow-xs border border-border/65 flex flex-col items-center text-center transition-all">
                        <span className="text-[11px] font-semibold tracking-wider text-foreground uppercase mb-2">Security</span>
                        <h3 className="text-xl font-semibold text-foreground mb-1">SOC 2 Type II</h3>
                        <p className="text-xs text-muted-foreground font-medium">Audited every year</p>
                    </div>
                </div>

                {/* Company Logos Row */}
                <div className="w-full pt-4 border-t border-emerald-900/10 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all">
                    <span className="font-serif tracking-tight text-lg font-semibold text-muted-foreground flex items-center gap-1.5">Northshore</span>
                    <div className="flex items-center gap-2 font-semibold text-muted-foreground"><Building2 className="w-5 h-5" /> Ledger & Co.</div>
                    <div className="flex items-center gap-2 font-semibold text-muted-foreground"><Scissors className="w-5 h-5" /> Studio Vela</div>
                    <div className="flex items-center gap-2 font-semibold text-muted-foreground"><Coffee className="w-5 h-5" /> Corner Brew</div>
                    <div className="flex items-center gap-2 font-semibold text-muted-foreground"><Stethoscope className="w-5 h-5" /> Brightside Dental</div>
                </div>

            </div>
        </section>
    )
}
