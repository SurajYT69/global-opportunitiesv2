"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { VIEWPORT_ONCE, fadeIn } from "@/lib/motion";

/**
 * The ONLY motion in the For-Parents chapter: one 480ms opacity fade, once.
 *
 * Opacity only — no transform, no stagger, no scroll scrub. Canon calls this
 * the lowest-motion chapter on the page after `still-page`, because a parent
 * reading about money should not be watching anything move.
 *
 * Children arrive from the Server Component as RSC payload, so wrapping the
 * whole chapter costs one small client module, not the chapter's markup.
 *
 * `.reveal` is carried deliberately, against the manifest's general advice for
 * Motion-driven elements, because this wrapper animates OPACITY and therefore
 * server-renders `opacity: 0`. Without the class, the entire chapter would be
 * invisible with JavaScript disabled. `.reveal` costs nothing when JS is on —
 * Motion's inline opacity beats the non-important class rule — and buys two
 * backstops: the `<noscript>` override in `layout.tsx`, and the reduced-motion
 * `!important` rule that lands the chapter fully visible with no fade at all.
 */
export function QuietFade({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={cn("reveal", className)}
    >
      {children}
    </motion.div>
  );
}
