"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Footnote, type SourceId } from "@/components/ui/footnote";
import { Rule } from "@/components/ui/rule";
import { fadeUp, staggerChildrenTight, VIEWPORT_ONCE } from "@/lib/motion";

/* ===========================================================================
   SECTION 2 · `colophon-strip` · THE COLOPHON STRIP · Chapter I DREAM
   ---------------------------------------------------------------------------
   THE FIGURES, AS A COLOPHON OF FIGURES (redesign 2026-08-20, client: "this
   doesn't feel right").

   WHAT WAS WRONG. Every word in here — figure and label alike — was set at
   `text-caption`, 12px, separated only by colour and weight, and
   squeezed between TWO chapter rules directly under a full-bleed cinematic
   hero. Six provable numbers had no more presence than a legal line. The old
   note in this file called that "a dense rail rather than another airy band";
   arriving off the film it read as a caption someone forgot to style.

   WHAT IT IS NOW. Six columns, each a figure stacked over its qualifier. The
   figure carries real size and the tabular/lining numerals the mono role
   still owns; the qualifier stays in the small tracked-caps label voice. Same
   six entries, same order, same string content — the hierarchy is the change,
   not the copy.

   ONE RULE, NOT TWO. The top rule marks the seam where the film ends and the
   paper starts, which is a real transition and worth a mark. The bottom rule
   marked nothing — the section's own padding already ended it — and the pair
   of them read as a box drawn around the numbers.

   THE SIX SUPERSCRIPTS ARE LOAD-BEARING. Every entry is still a PRIMARY
   anchor into the Sources & Methods registry in `components/ui/footnote.tsx`;
   the `fnref-*` ids the Sources table back-links to live HERE. Do not remove a
   `<Footnote … primary />` from this file — you would break the back-link at
   the foot of the page, silently.

   ONE CANON DEVIATION, RECORDED. The founding entry used to read
   "Est. 2001, Amritsar" with "Est. 2001," as the figure. Stacked, that put a
   word and a comma on the figure line. It is now the numeral "2001" over
   "Established · Amritsar" — same fact, same source id, same superscript.

   THE MONO LAW: every figure here is set in the mono role because every
   figure here can be proved. Since the single-family retheme that role is
   Geist plus `tabular-figures`, so the request is explicit on the figure.

   No heading — this strip is an `aria-label`led region, not a chapter.
   Motion: one once-only reveal on enter, opacity + y24, tight stagger. No
   count-up: "Est. 2001" cannot be counted to, and an odometer on the other
   five is the SaaS stat-bar tell this section has always been written against.
   ======================================================================== */

interface Stat {
  id: string;
  /** The provable quantity. Display size, tabular figures. */
  figure: string;
  /** The words that qualify it. Small tracked caps. */
  label: string;
  source?: SourceId;
}

const STATS: Stat[] = [
  { id: "founded", figure: "2001", label: "Established · Amritsar", source: "founded" },
  {
    id: "students",
    figure: "40,000+",
    label: "Students placed",
    source: "students-placed",
  },
  {
    id: "partners",
    figure: "700+",
    label: "Partner universities",
    source: "partner-universities",
  },
  {
    id: "destinations",
    figure: "15",
    label: "Destinations",
    source: "destinations",
  },
  {
    id: "offices",
    figure: "18",
    label: "Offices across India",
    source: "offices",
  },
  {
    id: "testimonials",
    figure: "47",
    label: "Testimonials",
    source: "testimonials",
  },
];

export default function ColophonStrip() {
  return (
    <section
      id="colophon-strip"
      data-chapter="dream"
      aria-label="Global Opportunities in figures, with sources"
      className="bg-paper-laid py-10 md:py-14"
    >
      <Container>
        <Rule weight="chapter" />

        {/* Two columns on a phone, three at sm, all six in a row at md+.
            The divider is a left hairline on every column except the first in
            its row — cheaper than rendering separator elements, and it
            disappears correctly when the grid rewraps. */}
        <motion.dl
          variants={staggerChildrenTight}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="m-0 mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-3 md:mt-10 md:grid-cols-6 md:gap-y-0"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.id}
              variants={fadeUp}
              className={[
                // flex-col-reverse: <dt> must precede <dd> in the DOM for a
                // valid description list, but the figure reads first.
                "flex flex-col-reverse px-4 first:pl-0 md:px-6",
                // even columns on mobile, every 3rd at sm, every 6th at md
                i % 2 === 0 ? "" : "border-l border-rule",
                i % 3 === 0 ? "sm:border-l-0" : "sm:border-l sm:border-rule",
                i % 6 === 0 ? "md:border-l-0 md:pl-0" : "md:border-l md:border-rule",
              ].join(" ")}
            >
              <dt className="mt-3 font-mono text-mono-label uppercase text-ink-muted">
                {stat.label}
                {stat.source && <Footnote id={stat.source} primary />}
              </dt>
              <dd
                data-figure
                className="m-0 font-ui text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-none tracking-[-0.02em] text-marine tabular-figures"
              >
                {stat.figure}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
