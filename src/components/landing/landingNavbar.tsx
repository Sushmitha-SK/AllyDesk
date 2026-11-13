"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import Image from "next/image";
import { assets } from "@/app/assets/assets";

const NAV_LINKS = [
    { label: "Features", href: "#features" },
    { label: "Workspace", href: "#workspace" },
    { label: "Security", href: "#security" },
    { label: "Pricing", href: "#pricing" },
];

function LogoMark({ className }: { className?: string }) {
    const petals = Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return { cx: 16 + 10 * Math.cos(a), cy: 16 + 10 * Math.sin(a) };
    });
    return (
        <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
            {petals.map((p, i) => (
                <circle key={i} cx={p.cx.toFixed(2)} cy={p.cy.toFixed(2)} r="3.5" />
            ))}
            <circle cx="16" cy="16" r="3.5" />
        </svg>
    );
}

export function LandingNavbar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex justify-center px-3 pt-4 sm:px-4 sm:pt-6">
            <header className="relative flex w-full max-w-215 items-center rounded-full border border-neutral-200 bg-card py-2 pl-3 pr-2 shadow-sm dark:border-border">
                {/* Logo */}
            
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

                {/* Desktop links */}
                <nav className="ml-8 hidden items-center gap-6 text-[14px] text-foreground md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} className="whitespace-nowrap transition-colors hover:text-primary">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right cluster */}
                <div className="ml-auto flex items-center gap-2 sm:gap-3">
                    <ThemeToggle />
                    <Link
                        href="/sign-in"
                        className="hidden whitespace-nowrap px-2 text-[14px] text-foreground transition-colors hover:text-primary sm:inline-flex"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/inbox"
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary py-1.5 pl-4 pr-1.5 text-[13px] font-medium text-primary-foreground sm:pl-5 sm:text-[14px]"
                    >
                        Get Started
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                            <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="menu"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-foreground md:hidden"
                    >
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>

                {/* Mobile dropdown */}
                {open && (
                    <div
                        id="menu"
                        className="absolute left-2 right-2 top-full z-20 mt-2 rounded-2xl border border-neutral-200 bg-card p-3 shadow-lg dark:border-border md:hidden"
                    >
                        <ul className="flex flex-col">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className="block rounded-lg px-3 py-2.5 text-[14px] text-foreground hover:bg-muted"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li className="sm:hidden">
                                <Link
                                    href="/sign-in"
                                    onClick={() => setOpen(false)}
                                    className="block rounded-lg px-3 py-2.5 text-[14px] text-foreground hover:bg-muted"
                                >
                                    Sign in
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </header>
        </div>
    );
}