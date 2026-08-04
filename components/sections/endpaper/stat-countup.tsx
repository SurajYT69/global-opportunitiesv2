"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { DUR_MS, VIEWPORT_ONCE } from "@/lib/motion";

/* ===========================================================================
   THE COUNT-UP
   ---------------------------------------------------------------------------
   CANON BUILD NOTE 5 — server-render every final value. The number below is in
   the server HTML at its final figure. JavaScript only ever animates TOWARD
   what is already in the DOM, and only across the last 8%. GO's current
   render-a-literal-zero bug is structurally impossible here.

   Anime.js owns tabular odometers (library ownership law). Imported
   dynamically at the section boundary, run inside createScope({ root }) with
   scope.revert() on cleanup, and never given a DOM property to animate — it
   drives a plain object and writes text into a tabular cell, so nothing
   reflows.

   ZERO ScrollTriggers: entry is an IntersectionObserver via Motion's useInView.
   Reduced motion: no animation at all; the final value simply stands.
   ======================================================================== */

/** Deterministic thousands grouping — identical on server and client. */
function group(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Counters start at 92% of final (canon build note 5). */
const START_FRACTION = 0.92;

export interface StatCountUpProps {
  /** The final value, exactly as it must read. Server-rendered. */
  display: string;
  /** The numeric target. */
  value: number;
  className?: string;
}

export function StatCountUp({ display, value, className }: StatCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT_ONCE);
  const prefersReducedMotion = useReducedMotion();
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || prefersReducedMotion || played.current) return;
    played.current = true;

    let cancelled = false;
    let scope: { revert: () => void } | null = null;

    void (async () => {
      const { animate, createScope } = await import("animejs");
      if (cancelled) return;

      const state = { n: Math.round(value * START_FRACTION) };
      const write = (n: number) => {
        el.textContent = group(n);
      };
      write(state.n);

      scope = createScope({ root: el }).add(() => {
        animate(state, {
          n: value,
          duration: DUR_MS.d5,
          ease: "outQuad",
          onUpdate: () => write(Math.round(state.n)),
          onComplete: () => {
            el.textContent = display;
          },
        });
      });
    })();

    return () => {
      cancelled = true;
      scope?.revert();
      // The odometer never owns the truth — restore the server value.
      el.textContent = display;
    };
  }, [display, inView, prefersReducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
