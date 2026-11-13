import { ExternalLink, HelpCircle, Lock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className="border-t border-border/40 py-12 bg-muted/20">
            <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                    <span className="flex size-2 rounded-full bg-primary" />
                    AllyDesk · AI Customer Support Workspace
                </div>
                <div className="flex items-center gap-6 font-medium">
                    <Link href="/privacy" className="hover:text-foreground transition-colors flex items-center gap-1">
                        <Lock className="size-3" /> Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-foreground transition-colors flex items-center gap-1">
                        <HelpCircle className="size-3" /> Terms of Service
                    </Link>
                    <Link href="https://github.com" target="_blank" className="hover:text-foreground transition-colors flex items-center gap-1">
                        GitHub <ExternalLink className="size-3" />
                    </Link>
                </div>
                <div className="font-mono text-[11px]">
                    © {new Date().getFullYear()} AllyDesk Inc. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
