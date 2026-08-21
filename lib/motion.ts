/**
 * Shared motion constants — THE DEPARTURE ATLAS.
 *
 * Client-safe plain data: importable from Server or Client Components.
 * Every value here is canon. SPLIT-B must not author new easings, durations
 * or staggers.
 *
 * Library ownership (CANON):
 *   GSAP + ScrollTrigger — anything measured against scroll position
 *   Motion (framer-motion) — React state and pointer
 *   Anime.js — SVG stroke draws and tabular odometers only
 *   Lenis — scroll feel; skipped entirely under reduced motion
 *
 * Motion budget: ONE one-shot hero sequence (<=1.4s), ONE user-triggered
 * interaction per chapter, ONE scroll-scrubbed pinned chapter, reveals that
 * fire once. ZERO infinite animations anywhere on the page.
 */

import type { Transition, Variants } from "framer-motion";

type Bezier = [number, number, number, number];

/** Framer Motion cubic-bezier arrays. */
export const EASE = {
  /** Colour, opacity, hover. */
  quad: [0.25, 0.46, 0.45, 0.94] as Bezier,
  /** Small reveals, chip states. */
  cubic: [0.215, 0.61, 0.355, 1] as Bezier,
  /** Plate wipes, drawer open. */
  quart: [0.165, 0.84, 0.44, 1] as Bezier,
  /** Headline / SplitText reveals. */
  expo: [0.19, 1, 0.22, 1] as Bezier,
  /** Rule draws, map draws. */
  inout: [0.65, 0, 0.35, 1] as Bezier,
  /** Status pill flip, button press ONLY. */
  press: [0.34, 1.4, 0.64, 1] as Bezier,
} as const;

/** The same curves as CSS strings (inline styles, Web Animations, keyframes). */
export const EASE_CSS = {
  quad: "cubic-bezier(0.25,0.46,0.45,0.94)",
  cubic: "cubic-bezier(0.215,0.61,0.355,1)",
  quart: "cubic-bezier(0.165,0.84,0.44,1)",
  expo: "cubic-bezier(0.19,1,0.22,1)",
  inout: "cubic-bezier(0.65,0,0.35,1)",
  press: "cubic-bezier(0.34,1.4,0.64,1)",
} as const;

/** GSAP ease strings. `scrub` is `none` — all scrubbed timelines are linear. */
export const GSAP_EASE = {
  quad: "power1.out",
  cubic: "power2.out",
  quart: "power3.out",
  expo: "expo.out",
  inout: "power2.inOut",
  press: "back.out(1.4)",
  scrub: "none",
} as const;

/** Canonical scrub value for the one pinned chapter. */
export const SCRUB = 0.6;

/** Duration scale, in SECONDS (GSAP + Framer). */
export const DUR = {
  /** 120ms — press feedback. */
  d1: 0.12,
  /** 200ms — hover, colour, focus ring. */
  d2: 0.2,
  /** 320ms — small reveal, chip, accordion. */
  d3: 0.32,
  /** 480ms — plate wipe, drawer, rule draw. */
  d4: 0.48,
  /** 700ms — chapter reveal. HARD CAP for all non-hero motion. */
  d5: 0.7,
  /**
   * 900ms — hero headline only. Full hero sequence <=1400ms.
   *
   * That cap does NOT govern the home page's GlobeReveal intro (promoted
   * from /homev2 on 2026-08-20), which runs 3000ms by client direction
   * (2026-08-04) and owns its
   * timing in components/GlobeReveal.tsx — this token is not imported there.
   * Recorded as an exception rather than raised, so the cap keeps binding
   * every hero that has not been individually signed off.
   */
  hero: 0.9,
} as const;

/** Duration scale, in MILLISECONDS (Anime.js, Web Animations, CSS-in-JS). */
export const DUR_MS = {
  d1: 120,
  d2: 200,
  d3: 320,
  d4: 480,
  d5: 700,
  hero: 900,
} as const;

/** Stagger scale, in SECONDS. */
export const STAGGER = {
  tight: 0.045,
  base: 0.08,
  loose: 0.12,
} as const;

/**
 * Default `whileInView` viewport config. Reveals fire ONCE — IntersectionObserver
 * costs nothing on ScrollTrigger.refresh(), which is O(n) and fires on every
 * mobile address-bar resize.
 */
export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;

const revealTransition: Transition = {
  duration: DUR.d5,
  ease: EASE.quart,
};

/** Opacity + y24 rise. The default chapter reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

/** Opacity only. Use in the lowest-motion chapters (trust, for-parents). */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DUR.d4, ease: EASE.quad },
  },
};

/** Container for `fadeUp`/`fadeIn` children. Canonical stagger. */
export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.base,
      delayChildren: 0,
    },
  },
};

/** Tighter container — the colophon strip and other dense running lines. */
export const staggerChildrenTight: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER.tight, delayChildren: 0 },
  },
};

/** Step transition for the three-step enquiry form: x +/-16px + opacity. */
export const stepTransition: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction >= 0 ? 16 : -16 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.d3, ease: EASE.cubic },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -16 : 16,
    transition: { duration: DUR.d3, ease: EASE.cubic },
  }),
};

/** Media query strings, keyed to the canonical breakpoints. */
export const MQ = {
  xs: "(min-width: 480px)",
  sm: "(min-width: 768px)",
  /** Pinning, the marginalia rail and the desktop nav all start here. */
  md: "(min-width: 1024px)",
  lg: "(min-width: 1280px)",
  xl: "(min-width: 1600px)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;
