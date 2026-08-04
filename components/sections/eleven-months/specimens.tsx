"use client";

import { motion } from "framer-motion";
import { Plate } from "@/components/ui/plate";
import { fadeUp, staggerChildren, VIEWPORT_ONCE } from "@/lib/motion";
import { SPECIMENS } from "./data";

/* ===========================================================================
   PLATE B — the tipped-in specimen sheets.
   Typeset HTML facsimiles of the three documents the eleven months produce.
   Zero photography, zero DPDP exposure; an atlas reproduces facsimiles.

   Motion: one once-only whileInView stagger (IntersectionObserver).
   ZERO ScrollTriggers — ScrollTrigger.refresh() is O(n) and fires on every
   mobile address-bar resize.
   ======================================================================== */

export function Specimens() {
  return (
    <motion.ul
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="m-0 grid list-none grid-cols-1 gap-grid-gap p-0 sm:grid-cols-3"
    >
      {SPECIMENS.map((specimen) => (
        <motion.li key={specimen.id} variants={fadeUp} className="flex flex-col">
          <Plate
            variant="specimen"
            plateNumber={specimen.plateNumber}
            fields={specimen.fields}
            stamp={specimen.stamp}
            caption={specimen.caption}
            captionMeta={specimen.captionMeta}
            registration="rule"
          />
          {/* The ochre annotation leader, drawn to the one clause that matters. */}
          {/* Absorbs the caption-height difference so every annotation well
              sits on the same baseline across the row. */}
          <div aria-hidden="true" className="grow" />
          <p className="mt-4 flex gap-3 bg-ochre-tint p-3 font-ui text-body-sm text-ink">
            <span
              aria-hidden="true"
              className="mt-1 h-4 w-px shrink-0 bg-ochre"
            />
            {specimen.annotation}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
