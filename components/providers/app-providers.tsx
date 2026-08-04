"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { SmoothScroll } from "./smooth-scroll";

/**
 * Layer 2 of the three-layer reduced-motion contract.
 *
 *   1. gsap.matchMedia() `reduce` branch  — per animated section
 *   2. <MotionConfig reducedMotion="user"> — here
 *   3. CSS backstop in globals.css        — zeroes durations, unhides .reveal
 *
 * `reducedMotion="user"` disables transform/layout animations while preserving
 * opacity and colour, so content always lands on its final, visible state.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
