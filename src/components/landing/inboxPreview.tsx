import { Globe2, Inbox, Search, Send, Settings, Sparkles, Users } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

export default function InboxPreview() {
    return (
        <>
            <div className="px-3 sm:px-6 pb-6">
                <div className="mx-auto w-full max-w-255 rounded-3xl bg-[#f5f2ee]/95 backdrop-blur-xl p-3 sm:p-5 shadow-2xl border border-white/40">
                    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl text-left">
                        {/* App Top Toolbar */}
                        <div className="flex h-11 items-center justify-between border-b border-border/60 bg-muted/40 px-4">
                            <div className="flex items-center gap-2">
                                <div className="size-3 rounded-full bg-red-500/80" />
                                <div className="size-3 rounded-full bg-yellow-500/80" />
                                <div className="size-3 rounded-full bg-emerald-500/80" />
                            </div>
                            <div className="hidden sm:flex items-center gap-2 rounded-md border border-border/40 bg-background/80 px-3 py-1 font-mono text-xs text-muted-foreground shadow-2xs">
                                <Globe2 className="size-3 text-muted-foreground/60" /> https://ally-desk-ai.vercel.app/inbox/cmw24wcgsdsf125gftn
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                <span className="size-2 rounded-full bg-white-500 " />
                            </div>
                        </div>

                        {/* App Main Layout Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 min-h-125 bg-background text-xs">
                            {/* Column 1: App Sidebar */}
                            <div className="hidden md:flex md:col-span-2 flex-col border-r border-border/60 bg-sidebar p-3 justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 px-2 pt-1">
                                        <div className="size-6 rounded bg-primary flex items-center justify-center text-white font-bold text-[10px]">AD</div>
                                        <span className="font-semibold text-foreground text-sm tracking-tight">AllyDesk</span>
                                    </div>
                                    <div className="space-y-1 pt-2">
                                        <div className="flex items-center gap-2 rounded-md bg-primary/15 text-primary font-medium px-2.5 py-1.5">
                                            <Inbox className="size-3.5" /> Inbox
                                        </div>
                                        <div className="flex items-center gap-2 rounded-md text-muted-foreground hover:bg-muted/50 px-2.5 py-1.5 transition-colors">
                                            <Users className="size-3.5" /> Customers
                                        </div>
                                        <div className="flex items-center gap-2 rounded-md text-muted-foreground hover:bg-muted/50 px-2.5 py-1.5 transition-colors">
                                            <Settings className="size-3.5" /> Settings
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-border/40 pt-3 flex items-center gap-2 px-1">
                                    <div className="size-6 rounded-full bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold text-[10px]">PS</div>
                                    <div className="overflow-hidden">
                                        <p className="font-medium text-foreground truncate">Priya S</p>
                                        <p className="text-[10px] text-muted-foreground truncate">priya@yopmail.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2: Inbox Ticket List */}
                            <div className="hidden md:flex md:col-span-4 flex-col border-r border-border/60 bg-muted/10">
                                <div className="p-3 border-b border-border/40 space-y-2">
                                    <div className="font-semibold text-foreground text-sm">Inbox</div>
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2 size-3.5 text-muted-foreground" />
                                        <div className="w-full rounded-md border border-border/60 bg-background py-1.5 pl-8 pr-3 text-[11px] text-muted-foreground">
                                            Search subject, customer or message...
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 pt-1 text-[10px] text-muted-foreground">
                                        <span className="rounded bg-muted px-1.5 py-0.5 border">All statuses</span>
                                        <span className="rounded bg-muted px-1.5 py-0.5 border">All priorities</span>
                                    </div>
                                </div>
                                <div className="divide-y divide-border/40 overflow-y-auto max-h-110">
                                    {/* Selected Ticket */}
                                    <div className="p-3 bg-primary/10 border-l-2 border-primary space-y-1.5 cursor-pointer">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-foreground text-xs truncate">Mobile app crashes when attaching photos</span>
                                            <span className="text-[10px] text-muted-foreground">yesterday</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                            <span>#108</span>
                                            <span>•</span>
                                            <span>Kenji Watanabe</span>
                                            <span>•</span>
                                            <span>Tokyo Craft</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 pt-1">
                                            <span className="rounded bg-amber-500/15 text-amber-700 px-1.5 py-0.2 font-medium text-[9px]">Open</span>
                                            <span className="rounded bg-orange-500/15 text-orange-700 px-1.5 py-0.2 font-medium text-[9px]">High</span>
                                            <span className="rounded bg-muted px-1.5 py-0.2 text-[9px] text-muted-foreground">bug</span>
                                            <span className="rounded bg-muted px-1.5 py-0.2 text-[9px] text-muted-foreground">mobile</span>
                                        </div>
                                    </div>
                                    {/* Other Tickets in List */}
                                    <div className="p-3 hover:bg-muted/30 transition-colors opacity-75 space-y-1.5 cursor-pointer">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-foreground text-xs truncate">Charged twice for the annual plan</span>
                                            <span className="text-[10px] text-muted-foreground">8 days ago</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                            <span>#98</span>
                                            <span>•</span>
                                            <span>Daniel Foster</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 pt-1">
                                            <span className="rounded bg-amber-500/15 text-amber-700 px-1.5 py-0.2 font-medium text-[9px]">Open</span>
                                            <span className="rounded bg-red-500/15 text-red-700 px-1.5 py-0.2 font-medium text-[9px]">Urgent</span>
                                        </div>
                                    </div>
                                    <div className="p-3 hover:bg-muted/30 transition-colors opacity-75 space-y-1.5 cursor-pointer">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-foreground text-xs truncate">Enterprise SSO setup question</span>
                                            <span className="text-[10px] text-muted-foreground">8 days ago</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                            <span>#101</span>
                                            <span>•</span>
                                            <span>Sofia Alvarez</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 pt-1">
                                            <span className="rounded bg-amber-500/15 text-amber-700 px-1.5 py-0.2 font-medium text-[9px]">Open</span>
                                            <span className="rounded bg-red-500/15 text-red-700 px-1.5 py-0.2 font-medium text-[9px]">Urgent</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Column 3 & 4 Combined: Active Ticket Thread & Customer Profile */}
                            <div className="col-span-1 md:col-span-6 flex flex-col justify-between bg-background">
                                {/* Ticket Header & Messages */}
                                <div className="p-3 border-b border-border/40 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-foreground text-xs sm:text-sm">Mobile app crashes when attaching photos</h3>
                                            <p className="text-[11px] text-muted-foreground pt-0.5">#108 • Web form • Opened Nov 4, 2026, 6:20 PM</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="rounded bg-amber-500/15 text-amber-700 px-2 py-0.5 text-[10px] font-medium">Open</span>
                                            <span className="rounded bg-orange-500/15 text-orange-700 px-2 py-0.5 text-[10px] font-medium">High</span>
                                        </div>
                                    </div>

                                    {/* Customer message */}
                                    <div className="flex gap-2.5 pt-2">
                                        <div className="size-7 rounded bg-neutral-200 text-neutral-800 font-semibold flex items-center justify-center shrink-0 text-[11px]">KW</div>
                                        <div className="space-y-1 bg-muted/30 p-2.5 rounded-lg border border-border/40 w-full">
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="font-semibold text-foreground">Kenji Watanabe</span>
                                                <span className="text-muted-foreground text-[10px]">Nov 4, 2026, 6:20 PM</span>
                                            </div>
                                            <p className="text-foreground/90 text-xs">On Android 15 the app closes immediately when I tap the attachment icon and pick a photo. Started after the latest update.</p>
                                        </div>
                                    </div>

                                    {/* Agent reply */}
                                    <div className="flex gap-2.5">
                                        <div className="size-7 rounded bg-primary/20 text-primary font-semibold flex items-center justify-center shrink-0 text-[11px]">PS</div>
                                        <div className="space-y-1 bg-primary/5 p-2.5 rounded-lg border border-primary/20 w-full">
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="font-semibold text-foreground">Priya S</span>
                                                <span className="text-muted-foreground text-[10px]">Nov 11, 2026, 11:13 AM</span>
                                            </div>
                                            <p className="text-foreground/90 text-xs">Hi Kenji,<br /><br />I am sorry to hear that the mobile app is crashing when you try to attach photos on Android 15.<br /><br />I am checking into this issue with our technical team and will follow up with you as soon as I have an update or troubleshooting steps to share.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Reply & Input Box */}
                                <div className="p-3 space-y-2 bg-muted/10">
                                    <div className="rounded-lg border border-primary/40 bg-linear-to-br from-primary/10 via-primary/[02%] to-transparent p-2.5 space-y-2 shadow-2xs">
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                                                <Sparkles className="size-3.5 text-primary animate-pulse" /> Draft a reply with AI
                                            </span>
                                            <span className="font-mono text-[9px] text-muted-foreground bg-background px-1.5 py-0.5 rounded border">Grounded in 3 KB docs</span>
                                        </div>
                                        <div className="text-[11px] text-foreground/80 bg-background/80 p-2 rounded border border-border/60">
                                            "Hi Kenji, our engineering team has identified the Android 15 photo picker memory leak in v2.4.1. A hotfix (v2.4.2) is now live on Google Play..."
                                        </div>
                                        <div className="flex items-center justify-end gap-2 pt-1">
                                            <Button variant="ghost" size="xs" className="h-6 text-[10px]">Discard</Button>
                                            <Button size="xs" className="h-6 text-[10px] bg-primary text-primary-foreground hover:bg-primary/90 gap-1">
                                                <Send className="size-3" /> Send reply <span className="font-mono text-[9px] opacity-75">⌘⏎</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
