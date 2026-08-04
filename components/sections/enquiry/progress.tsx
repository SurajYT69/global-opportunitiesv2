"use client";

import { motion } from "framer-motion";
import { Circle, CircleCheck, CircleDot } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { DUR, EASE } from "@/lib/motion";
import { TOTAL_STEPS } from "./state";

/**
 * Page-number progress. An atlas numbers its pages; this form numbers its
 * steps the same way — `1 / 3` set in Plex Mono, over a hairline that inks in
 * from the left. Progress indicators are worth ~28% on multi-step forms
 * (research-cro.md), and the page number is the bookish way to draw one.
 *
 * `scaleX` only — no animated width anywhere on this page.
 *
 * The three step marks are decoration: `1 / 3` is already spelled out for AT
 * in the sr-only span, so the marks carry no name and stay aria-hidden. Each
 * state has its OWN glyph as well as its own colour — cleared, here, still to
 * come — so the row never depends on colour to be read.
 */
export interface StepProgressProps {
  /** Zero-based. */
  step: number;
  title: string;
}

export function StepProgress({ step, title }: StepProgressProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-ui text-label uppercase text-ink-muted">{title}</p>
        <p className="shrink-0 font-mono text-mono-label uppercase text-marine tabular-figures">
          <span className="sr-only">{`Step ${step + 1} of ${TOTAL_STEPS}`}</span>
          <span aria-hidden="true">{`${step + 1} / ${TOTAL_STEPS}`}</span>
        </p>
      </div>

      <div aria-hidden="true" className="flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }, (_, index) => {
          if (index < step) {
            return (
              <Icon
                key={index}
                as={CircleCheck}
                size="sm"
                className="text-verdigris"
              />
            );
          }
          if (index === step) {
            return (
              <Icon
                key={index}
                as={CircleDot}
                size="sm"
                className="text-sienna-press"
              />
            );
          }
          return (
            <Icon
              key={index}
              as={Circle}
              size="sm"
              className="text-ink-faint"
            />
          );
        })}
      </div>

      <div aria-hidden="true" className="relative h-px w-full bg-rule">
        <motion.div
          className="absolute inset-0 origin-left bg-sienna-press"
          initial={false}
          animate={{ scaleX: (step + 1) / TOTAL_STEPS }}
          transition={{ duration: DUR.d4, ease: EASE.quart }}
        />
      </div>
    </div>
  );
}
