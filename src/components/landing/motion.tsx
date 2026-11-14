"use client";

import Link from "next/link";
import {
    MotionConfig,
    animate,
    motion,
    useInView,
    useMotionTemplate,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    type Variants,
} from "motion/react";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Wrap the page once. Users with "reduce motion" turned on skip movement. */
export function MotionRoot({ children }: { children: ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}


/** Fade, rise and un-blur when scrolled into view. */
export function Reveal({
    children,
    className,
    delay = 0,
    y = 24,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay, ease }}
        >
            {children}
        </motion.div>
    );
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease } },
};

/** Parent that reveals its StaggerItem children one after another. */
export function Stagger({
    children,
    className,
    as = "div",
}: {
    children: ReactNode;
    className?: string;
    as?: "div" | "ul" | "ol" | "dl";
}) {
    const Comp = motion[as] as typeof motion.div;
    return (
        <Comp
            className={className}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
        >
            {children}
        </Comp>
    );
}

export function StaggerItem({
    children,
    className,
    as = "div",
}: {
    children: ReactNode;
    className?: string;
    as?: "div" | "li";
}) {
    const Comp = motion[as] as typeof motion.div;
    return (
        <Comp className={className} variants={item}>
            {children}
        </Comp>
    );
}

/** Number that counts up once when it appears. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });

    useEffect(() => {
        const node = ref.current;
        if (!inView || !node) return;
        const controls = animate(0, to, {
            duration: 1.6,
            ease,
            onUpdate: (v) => {
                node.textContent = `${Math.round(v)}${suffix}`;
            },
        });
        return () => controls.stop();
    }, [inView, to, suffix]);

    return <span ref={ref}>{`0${suffix}`}</span>;
}

/** Card with a soft glow that follows the cursor and a small lift on hover. */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
    const x = useMotionValue(-300);
    const y = useMotionValue(-300);
    const glow = useMotionTemplate`radial-gradient(340px circle at ${x}px ${y}px, color-mix(in srgb, var(--primary) 18%, transparent), transparent 70%)`;

    function onMove(e: MouseEvent<HTMLDivElement>) {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
    }

    return (
        <motion.div
            onMouseMove={onMove}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className={`group relative overflow-hidden ${className}`}
        >
            <motion.div
                aria-hidden
                style={{ background: glow }}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative h-full">{children}</div>
        </motion.div>
    );
}

/** Product screenshot that tilts up and settles flat as it scrolls into place. */
export function ScrollFloat({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
    const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

    return (
        <div ref={ref} style={{ perspective: 1400 }}>
            <motion.div style={{ rotateX, scale, y, opacity, transformOrigin: "50% 100%" }}>{children}</motion.div>
        </div>
    );
}

/** Staggered entrance for hero content on page load. */
export function HeroStagger({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } } }}
        >
            {children}
        </motion.div>
    );
}

export function HeroItem({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <motion.div className={className} variants={item}>
            {children}
        </motion.div>
    );
}

/** Slowly drifting colour blob for dark panels. */
export function FloatingGlow({ className = "" }: { className?: string }) {
    return (
        <motion.div
            aria-hidden
            className={className}
            animate={{ x: [0, 60, -30, 0], y: [0, 30, -20, 0], scale: [1, 1.15, 0.95, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}

/** next/link with a springy hover and press. */
export const MotionLink = motion.create(Link);