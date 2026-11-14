import { ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { Reveal } from "./motion";


interface SectionHeadingProps {
    pill: string;
    icon: LucideIcon;
    title: React.ReactNode;
    children?: ReactNode;
    align?: "center" | "left";
}

export function SectionHeading({
    pill,
    icon: Icon,
    title,
    children,
    align = "center",
}: SectionHeadingProps) {
    return (
        <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                <Icon className="size-4" aria-hidden />
                {pill}
            </span>
            <h2 className="mt-5 text-balance bg-linear-to-b from-foreground to-foreground/65 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-5xl sm:leading-[1.08]">
                {title}
            </h2>
            {children && (
                <p
                    className={`mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg ${align === "center" ? "mx-auto max-w-xl" : ""}`}
                >
                    {children}
                </p>
            )}
        </Reveal>
    );
}

export function IconTile({ icon: Icon }: { icon: LucideIcon }) {
    return (
        <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/25 to-primary/5 text-primary ring-1 ring-primary/20">
            <Icon className="size-5" aria-hidden />
        </span>
    );
}

export const gridMask = {
    backgroundImage:
        "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
    backgroundSize: "56px 56px",
    maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 30%, transparent 75%)",
    WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 30%, transparent 75%)",
} as const;


export function GithubMark({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
    );
}

export function Pill({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Icon className="size-3.5" aria-hidden />
            {children}
        </span>
    );
}
