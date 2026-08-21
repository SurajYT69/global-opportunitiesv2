"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* ===========================================================================
   COUNTER — count-up figure
   ---------------------------------------------------------------------------
   Ported 2026-08-21 from the sibling repo (global-oppertunities-nextjs,
   `stats/counter.tsx`). It was the most self-contained file there: React only,
   no animation library, IntersectionObserver + rAF with a cubic ease-out.

   TWO CHANGES FROM THE ORIGINAL.

   1. It initialised `display` to 0, which meant the server rendered a literal
      "0" and any visitor whose JavaScript failed was told this company has
      placed 0 students. It now renders the REAL figure on the server and only
      drops to zero on the client, in a layout effect — i.e. after hydration
      but before the browser paints, so there is no flash of the final number.
      A broken count now degrades to the correct number rather than to a lie.

   2. Reduced motion is honoured as before (snap straight to the value), and
      because of change 1 the reduced-motion path is now also the no-JS path.

   The animation is `requestAnimationFrame` over 1600ms. It fires ONCE, at 40%
   visibility, and disconnects itself immediately — it is not a scroll-linked
   effect and costs nothing after it has run.
   ======================================================================== */

/** `useLayoutEffect` warns when it runs during SSR, and there is no layout to
    read on the server anyway. This is the standard isomorphic guard. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  /* Seeded with the final value so SSR and no-JS both show the truth. */
  const [display, setDisplay] = useState(value);
  const started = useRef(false);
  const armed = useRef(false);

  /* Client-only, pre-paint: reset to zero so the count has somewhere to run
     from. Skipped under reduced motion, which leaves the figure at its final
     value and never animates at all. */
  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    armed.current = true;
    setDisplay(0);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || !armed.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
