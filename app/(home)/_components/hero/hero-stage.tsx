"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { DUR, GSAP_EASE, MQ, STAGGER } from "@/lib/motion";

/* ===========================================================================
   THE BOOT SEQUENCE  ·  one-shot, <=1400ms, fires once, never loops
   ---------------------------------------------------------------------------
   stats-bar rule draws  ->  badge pill  ->  H1 rises behind line masks
   ->  sub-line  ->  CTA row  ->  no-cost qualifier  ->  the departure card
   (v5, one plate — its interior `.reveal` marks are force-set visible so
   the card never staggers station by station)  ->  the accreditation
   lockup at the right end of the stats bar, last.

   Hooks live in app/(home)/_components/hero.tsx; every selector below resolves
   to exactly one element there. Nothing here may reference an element the
   current hero does not render (the departure card is guarded, since it is
   the one piece a future revision might drop again).

   THE H1 IS THE LCP ELEMENT. It is never `opacity: 0` in CSS and is never
   gated on JavaScript. It paints at its final size and colour on first paint;
   SplitText then applies the hidden state in JS and animates out of it.

   Everything else carries `.reveal` (opacity:0 in CSS, forced visible under
   prefers-reduced-motion and inside <noscript>).

   No scroll triggers. No ambient loop. transform + opacity only.
   ======================================================================== */

const T = {
  rule: 0,
  eyebrow: 0.05,
  headline: 0.1,
  deck: 0.55,
  actions: 0.7,
  proof: 0.8,
  card: 0.82, /* + DUR.d4 -> lands at 1.30s, inside the 1400ms cap */
  accreditation: 0.88,
} as const;

export interface HeroStageProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function HeroStage({ children, className, style }: HeroStageProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const container = root.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      /* `base` always matches, so the callback runs for EVERY visitor — a
         conditions object whose only query is `reduce` would never fire for
         the majority who have no preference set, and `.reveal` would stay
         hidden. `reduce` re-runs the branch when the preference flips. */
      mm.add({ base: "(min-width: 0px)", reduce: MQ.reduce }, (ctx) => {
        if (ctx.conditions?.reduce) {
          // Reduced motion lands on the FINAL, fully visible state. Nothing
          // is hidden, nothing is scrambled, nothing moves.
          gsap.set(".reveal", { opacity: 1, y: 0, yPercent: 0, scale: 1 });
          return;
        }

        const headline =
          container.querySelector<HTMLElement>("[data-hero-headline]");

        /* THE HEADLINE RISE. 900ms, stagger 0.08, expo.out — CANON.
           SplitText 3.13+: `mask:"lines"` builds the overflow-hidden wrappers
           for us and maintains its own aria-label/aria-hidden pair — never
           override it. `autoSplit` re-splits when the display face finishes
           swapping in, and the animation is created INSIDE `onSplit` (and
           returned, so GSAP disposes of it on the next split) — the
           documented pattern. Once the rise has completed, later re-splits
           (a resize) land straight on the final state: one shot, never a
           loop, and never a hidden headline. */
        let risen = false;
        const split = headline
          ? SplitText.create(headline, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit(self: SplitText) {
                if (risen) return gsap.set(self.lines, { yPercent: 0 });
                return gsap.fromTo(
                  self.lines,
                  { yPercent: 110 },
                  {
                    yPercent: 0,
                    duration: DUR.hero,
                    ease: GSAP_EASE.expo,
                    stagger: STAGGER.base,
                    delay: T.headline,
                    onComplete: () => {
                      risen = true;
                    },
                  },
                );
              },
            })
          : null;

        const tl = gsap.timeline({ defaults: { ease: GSAP_EASE.quart } });

        tl.fromTo(
          "[data-hero-rule]",
          { drawSVG: "0% 0%" },
          { drawSVG: "0% 100%", duration: DUR.d5, ease: GSAP_EASE.inout },
          T.rule,
        )
          .fromTo(
            "[data-hero-eyebrow]",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: DUR.d4 },
            T.eyebrow,
          )
          .fromTo(
            "[data-hero-deck]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: DUR.d5 },
            T.deck,
          )
          .fromTo(
            "[data-hero-actions]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: DUR.d4 },
            T.actions,
          )
          .fromTo(
            "[data-hero-proof]",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: DUR.d3 },
            T.proof,
          )
          .fromTo(
            "[data-hero-accreditation]",
            { opacity: 0 },
            { opacity: 1, duration: DUR.d3, ease: GSAP_EASE.quad },
            T.accreditation,
          );

        /* The departure card (v5) animates as ONE plate. Its interior
           `.reveal` marks (stations, stamp) are force-set visible first —
           a station-by-station stagger would blow the 1400ms budget. */
        if (container.querySelector("[data-departure-card]")) {
          gsap.set("[data-departure-card] .reveal", { opacity: 1 });
          tl.fromTo(
            "[data-departure-card]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: DUR.d4 },
            T.card,
          );
        }

        return () => {
          split?.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="hero"
      data-chapter="dream"
      className={className}
      style={style}
    >
      {children}
    </section>
  );
}
