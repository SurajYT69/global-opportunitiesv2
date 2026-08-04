"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { DUR, EASE, VIEWPORT_ONCE } from "@/lib/motion";

/* ===========================================================================
   THE REGISTER — REVEAL
   ---------------------------------------------------------------------------
   The register's only motion. A once-only opacity + y24 rise on
   IntersectionObserver (`whileInView`), staggered by an explicit per-item
   delay so the children can stay Server Components — the sixty-eight
   institution names never enter the client bundle.

   Transform and opacity only. Zero ScrollTrigger, zero infinite animation.
   <MotionConfig reducedMotion="user"> at the app root drops the transform and
   lands every item on its final, fully visible state.
   ======================================================================== */

export interface RevealProps {
  /** Element to render. `li` keeps `ul > li` semantics intact. */
  as?: "div" | "li" | "p";
  /** Seconds. Pass `index * STAGGER.tight` for a column stagger. */
  delay?: number;
  className?: string;
  children: ReactNode;
}

export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
}: RevealProps) {
  const props = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_ONCE,
    transition: { duration: DUR.d5, ease: EASE.quart, delay },
    className,
  };

  if (as === "li") return <motion.li {...props}>{children}</motion.li>;
  if (as === "p") return <motion.p {...props}>{children}</motion.p>;
  return <motion.div {...props}>{children}</motion.div>;
}
