"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

const OPTIONS = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
] as const;

const subscribe = () => () => { };

export function AppearancePicker() {
    const { theme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);

    return (
        <div role="group" aria-label="Theme" className="flex flex-wrap gap-2">
            {OPTIONS.map(({ value, label, icon: Icon }) => {
                const selected = mounted && theme === value;
                return (
                    <button
                        key={value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setTheme(value)}
                        className={cn(
                            "flex w-28 flex-col items-center gap-2 rounded-lg border p-3 text-sm transition-colors",
                            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                            selected ? "border-primary bg-primary/5" : "hover:bg-accent/60",
                        )}
                    >
                        <Icon className="size-5" aria-hidden />
                        {label}
                    </button>
                );
            })}
        </div>
    );
}