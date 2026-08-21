"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Plate } from "@/components/ui/plate";
import { fadeUp, staggerChildren, VIEWPORT_ONCE } from "@/lib/motion";
import { OUTCOMES } from "./data";

/* ===========================================================================
   THE PLATE SECTION — named students, named universities, named counsellors.
   Plate C cartouches: no face, an initials monogram, and the data block that a
   photograph would never have carried anyway.

   Every quote is a verbatim excerpt of a testimonial GO has already published,
   with a link to the page it came from and a last-verified stamp. Nothing here
   is paraphrased, and no intake year is asserted, because GO's own published
   testimonials do not carry one.

   Motion: one once-only whileInView stagger. ZERO ScrollTriggers.

   The one glyph here rides the provenance line, not the quotation. A quote mark
   beside a quotation already wrapped in curly quotes is decoration; a tick
   beside "published testimonial · verified" is the claim this section makes.
   ======================================================================== */

export function Outcomes() {
  return (
    <motion.ol
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="m-0 flex list-none flex-col gap-12 p-0"
    >
      {OUTCOMES.map((outcome) => (
        <motion.li
          key={outcome.id}
          variants={fadeUp}
          className="grid grid-cols-1 gap-8 border-t border-plate-rule pt-10 md:grid-cols-[minmax(0,13rem)_1fr] md:gap-12"
        >
          {/* Plate C. The data block lives in the figcaption beside it (and
              beneath it below 1024px), so it is set once, not twice. */}
          <Plate
            variant="cartouche"
            tone="dark"
            initials={outcome.initials}
            registration="sienna"
          />

          <figure className="m-0 flex flex-col justify-center">
            <blockquote
              cite={outcome.href}
              className="m-0 font-display text-quote opsz-32 text-plate-white text-balance"
            >
              &ldquo;{outcome.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex flex-col gap-1">
              <span className="font-ui text-label uppercase text-plate-white">
                {outcome.name}
              </span>
              <span className="font-mono text-caption text-plate-grey tabular-figures">
                {outcome.programme} · {outcome.place} · counsellor:{" "}
                {outcome.counsellor}
              </span>
              <span className="flex items-start gap-1.5 font-mono text-caption text-plate-grey tabular-figures">
                <Icon as={BadgeCheck} size="sm" className="mt-px" />
                {/* The link and the stamp stay inside one inline run so the
                    line still wraps as prose rather than as flex items. */}
                <span>
                  <a
                    href={outcome.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-sienna-on-dark underline decoration-plate-rule underline-offset-2 hover:decoration-sienna-on-dark"
                  >
                    {outcome.source}
                  </a>{" "}
                  · published testimonial · verified {outcome.lastVerified}
                </span>
              </span>
            </figcaption>
          </figure>
        </motion.li>
      ))}
    </motion.ol>
  );
}
