"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { useEffect, useState, type ReactNode } from "react";

/* Registered ONCE, at module scope, in the single "use client" provider that
   also owns Lenis. Never per-component. (CANON build note 15.) */
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Lenis owns scroll feel and nothing else.
 *
 * - `autoRaf: false` so Lenis never runs a second RAF loop; gsap.ticker drives it.
 * - `syncTouch: false` (default) — native Android/iOS inertia beats JS-smoothed touch.
 * - `lagSmoothing(0)` so a long task cannot desync ScrollTrigger from Lenis.
 * - Under `prefers-reduced-motion: reduce`, Lenis is NOT INITIALISED AT ALL.
 */
export function SmoothScroll({ children }: { children?: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Track the preference reactively so toggling it mid-session tears Lenis
  // down (or brings it up) without a reload.
  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    setPrefersReducedMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({ autoRaf: false, syncTouch: false });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33); // GSAP default
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
