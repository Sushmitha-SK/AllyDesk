"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { assets } from "@/app/assets/assets";
import { MotionLink } from "./motion";
import { NAV_LINKS } from "@/lib/data";

const springTransition = {
    type: "spring" as const,
    stiffness: 450,
    damping: 32,
    mass: 0.8,
};


const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card";

const ctaClasses =
    "group inline-flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-primary text-white transition-colors duration-200 hover:bg-primary dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 motion-reduce:transition-none " +
    focusRing;

function RollingLabel({ text }: { text: string }) {
    return (
        <span className="relative inline-flex overflow-hidden leading-tight">
            <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[120%] group-focus-visible:-translate-y-[120%] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0">
                {text}
            </span>
            <span
                aria-hidden
                className="absolute inset-0 inline-block translate-y-[120%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:hidden"
            >
                {text}
            </span>
        </span>
    );
}

function CtaArrow() {
    return (
        <span
            aria-hidden
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 motion-reduce:transition-none dark:bg-black/15"
        >
            <ChevronRight className="h-3.5 w-3.5" />
        </span>
    );
}

export function LandingNavbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);

    const close = () => setOpen(false);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

 
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        const onPointerDown = (event: PointerEvent) => {
            if (!headerRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("pointerdown", onPointerDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [open]);

    return (
        <div className="sticky top-0 z-30 flex justify-center px-3 pt-4 sm:px-4 sm:pt-6">
            <a
                href="#main-content"
                className="sr-only rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                Skip to main content
            </a>

            <header
                ref={headerRef}
                onBlur={(event) => {
                    if (open && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        setOpen(false);
                    }
                }}
                className="relative flex w-full max-w-215 items-center rounded-full border border-border bg-card/95 py-2 pl-3 pr-2 shadow-sm backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-card"
            >
                <Link
                    href="/"
                    onClick={close}
                    aria-label="AllyDesk home"
                    className={`flex shrink-0 items-center gap-2 rounded-full pr-2 ${focusRing}`}
                >
                    <Image
                        src={assets.logoIcon.src}
                        alt=""
                        width={32}
                        height={28}
                        priority
                        className="h-6 w-7 object-contain sm:h-7 sm:w-8"
                    />
                    <span className="font-leagueSpartan text-base font-bold tracking-tight text-foreground">
                        AllyDesk
                    </span>
                </Link>

                <nav
                    aria-label="Primary"
                    className="ml-6 hidden items-center gap-1 text-[14px] md:flex lg:ml-8 lg:gap-2"
                >
                    {NAV_LINKS.map((link) => {
                        const isCurrent = link.href === pathname;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={isCurrent ? "page" : undefined}
                                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-foreground/85  transition-colors hover:text-primary dark:hover:text-primary motion-reduce:transition-none ${isCurrent ? "font-medium text-foreground" : ""
                                    } ${focusRing}`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
                    <ThemeToggle />

                    <Link
                        href="/sign-in"
                        className={`hidden min-h-10 items-center whitespace-nowrap rounded-full px-3 text-[14px] font-medium text-foreground/85 transition-colors hover:bg-muted hover:text-foreground motion-reduce:transition-none sm:inline-flex ${focusRing}`}
                    >
                        Sign in
                    </Link>

                    <MotionLink
                        href="/inbox"
                        whileTap={{ scale: 0.98 }}
                        transition={springTransition}
                        className={`${ctaClasses} hidden min-h-10 py-1.5 pl-4 pr-1.5 text-[13px] font-medium min-[400px]:inline-flex sm:pl-5 sm:text-[14px]`}
                    >
                        <RollingLabel text="Get Started" />
                        <CtaArrow />
                    </MotionLink>

                    <button
                        ref={toggleRef}
                        type="button"
                        onClick={() => setOpen((prev) => !prev)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-nav-menu"
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted motion-reduce:transition-none md:hidden ${focusRing}`}
                    >
                        {open ? (
                            <X aria-hidden className="size-5" />
                        ) : (
                            <Menu aria-hidden className="size-5" />
                        )}
                    </button>
                </div>

                <nav
                    id="mobile-nav-menu"
                    aria-label="Mobile"
                    className={`absolute left-0 right-0 top-full z-20 mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-3xl border border-border bg-card p-2 text-card-foreground shadow-lg md:hidden ${open ? "block" : "hidden"
                        }`}
                >
                    <ul className="flex flex-col gap-0.5">
                        {NAV_LINKS.map((link) => {
                            const isCurrent = link.href === pathname;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={close}
                                        aria-current={isCurrent ? "page" : undefined}
                                        className={`flex min-h-11 items-center justify-between rounded-2xl px-3 text-[15px] font-medium text-foreground transition-colors hover:bg-muted motion-reduce:transition-none ${isCurrent ? "bg-muted" : ""
                                            } ${focusRing}`}
                                    >
                                        <span>{link.label}</span>
                                        <ChevronRight
                                            aria-hidden
                                            className="h-4 w-4 text-muted-foreground"
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="mt-1 border-t border-border pt-2 sm:hidden">
                            <Link
                                href="/sign-in"
                                onClick={close}
                                className={`flex min-h-11 items-center rounded-2xl px-3 text-[15px] font-medium text-foreground transition-colors hover:bg-muted motion-reduce:transition-none ${focusRing}`}
                            >
                                Sign in
                            </Link>
                        </li>
                        <li className="px-1 pb-1 pt-1 min-[400px]:hidden">
                            <Link
                                href="/inbox"
                                onClick={close}
                                className={`${ctaClasses} flex min-h-11 w-full justify-center px-5 text-[15px] font-medium`}
                            >
                                Get Started
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}