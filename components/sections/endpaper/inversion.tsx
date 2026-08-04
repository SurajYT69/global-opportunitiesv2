"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { MQ, SCRUB } from "@/lib/motion";

/* ===========================================================================
   THE ENDPAPER INVERSION
   ---------------------------------------------------------------------------
   The paper turns to the endpapers. NO ELEMENT MOVES.

   Two coordinated layers, both inside this section — nothing outside it is
   touched:

   1. A 30vh band carrying `--grad-endpaper-turn` (#FBF8F2 -> #1B3240 ->
      #0E2029). Pure CSS: with JavaScript off, or under reduced motion, the
      inversion still lands as a clean turn into a dark chapter.

   2. One scrubbed `background-color` tween on the section's backdrop,
      #1B3240 -> #0E2029, across the band's traversal. Colour only —
      no transform, no opacity on content, no parallax.

   ScrollTrigger budget: 1.
   ======================================================================== */

const MARINE_MID = "#16334F";
const ENDPAPER = "#0E2A47";

export function Inversion() {
  const root = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const band = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const backdropEl = backdrop.current;
      const bandEl = band.current;
      if (!backdropEl || !bandEl) return;

      const mm = gsap.matchMedia();

      // `always` is required: gsap.matchMedia() only invokes the callback when
      // at least one condition matches, so a lone `reduce` condition would
      // never run for the (overwhelming) majority who have not set it.
      mm.add({ always: "(min-width: 0px)", reduce: MQ.reduce }, (ctx) => {
        // Reduced motion: the gradient band already carries the turn. Land the
        // backdrop on its final colour and do nothing else.
        if (ctx.conditions?.reduce) {
          gsap.set(backdropEl, { backgroundColor: ENDPAPER });
          return;
        }

        gsap.fromTo(
          backdropEl,
          { backgroundColor: MARINE_MID },
          {
            backgroundColor: ENDPAPER,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: bandEl,
              start: "top bottom",
              end: "bottom top",
              scrub: SCRUB,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* The backdrop. Absolute, behind everything in the section, painted
          --endpaper by default so a JS failure is invisible. */}
      <div
        ref={backdrop}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-endpaper"
      />
      {/* The turn. 30vh, exactly as canon specifies, and only here. */}
      <div
        ref={band}
        aria-hidden="true"
        className="relative h-[30vh] w-full"
        style={{ backgroundImage: "var(--grad-endpaper-turn)" }}
      />
    </div>
  );
}
