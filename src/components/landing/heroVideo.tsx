"use client";

import { assets } from "@/app/assets/assets";
import { useEffect, useRef } from "react";

const VIDEO_SRC =
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261029_084140_553c4785-d33c-496e-9702-45247fa2fcf3.mp4";
const POSTER = assets.poster;

const extraAttrs = {
    "webkit-playsinline": "true",
    "x5-playsinline": "true",
    disableRemotePlayback: true,
} as Record<string, unknown>;

export function HeroVideo() {
    const ref = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const v = ref.current;
        if (!v) return;
        v.muted = true;

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () => {
            if (mq.matches) {
                v.pause();
                v.currentTime = 0;
            } else {
                v.play().catch(() => { });
            }
        };

        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    return (
        <>
            <video
                ref={ref}
                aria-hidden="true"
                tabIndex={-1}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                src={VIDEO_SRC}
                poster={POSTER.src}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                {...extraAttrs}
            />
            <div aria-hidden className="absolute inset-0 bg-background/10 dark:bg-background/80" />
        </>
    );
}