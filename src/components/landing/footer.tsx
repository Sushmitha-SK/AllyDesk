import { GithubMark } from './sectionElements'

import Image from 'next/image'
import { assets } from '@/app/assets/assets'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="border-t border-border bg-muted/30 px-4 py-14 sm:px-8">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <div>
                    <Link href="/" className="flex shrink-0 items-center gap-2">
                        <Image
                            src={assets.logoIcon.src}
                            alt="AllyDesk"
                            width={32}
                            height={28}
                            className="h-6 w-7 sm:h-7 sm:w-8"
                        />
                        <span className="text-base font-leagueSpartan font-bold tracking-tight text-foreground">
                            AllyDesk
                        </span>
                    </Link>

                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                        A support inbox where AI drafts from your help articles and your team stays in charge.
                    </p>
                </div>

                {[
                    {
                        title: "Product",
                        links: [
                            { label: "Features", href: "#features" },
                            { label: "How it works", href: "#how-it-works" },
                            { label: "Workspace", href: "#workspace" },
                        ],
                    },
                    {
                        title: "Trust",
                        links: [
                            { label: "Security", href: "#security" },
                            { label: "FAQ", href: "#faq" },
                        ],
                    },
                    {
                        title: "Account",
                        links: [
                            { label: "Sign in", href: "/sign-in" },
                            { label: "Create an account", href: "/sign-up" },
                            { label: "Open workspace", href: "/inbox" },
                        ],
                    },
                ].map((col) => (
                    <nav key={col.title} aria-label={col.title}>
                        <p className="text-sm font-semibold text-foreground">{col.title}</p>
                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                            {col.links.map((l) => (
                                <li key={l.label}>
                                    {l.href.startsWith("#") ? (
                                        <a href={l.href} className="transition-colors hover:text-foreground">
                                            {l.label}
                                        </a>
                                    ) : (
                                        <Link href={l.href} className="transition-colors hover:text-foreground">
                                            {l.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>

            <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
                <p>&copy; {new Date().getFullYear()} AllyDesk</p>
                <a
                    href="https://github.com/Sushmitha-SK/AllyDesk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                    <GithubMark className="size-4" /> GitHub
                </a>
            </div>
        </footer>
    )
}
