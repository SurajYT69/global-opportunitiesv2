"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Footnote, type SourceId } from "@/components/ui/footnote";
import { Rule } from "@/components/ui/rule";
import { fadeUp, staggerChildrenTight, VIEWPORT_ONCE } from "@/lib/motion";

/* ===========================================================================
   SECTION 3 · `colophon-strip` · THE COLOPHON STRIP · Chapter I DREAM
   ---------------------------------------------------------------------------
   CANON: "Colophon strip runs as one line of set text, not a stat bar."

     EST. 2001, AMRITSAR¹ · 25 YEARS · 40,000+ STUDENTS PLACED² ·
     700+ PARTNER UNIVERSITIES³ · 15 DESTINATIONS⁴ ·
     18 OFFICES, NAMED AND ADDRESSED⁵ · 47 PUBLISHED TESTIMONIALS⁶

   Six canonical stats, six superscripts, every one of them resolving into the
   Sources & Methods registry in `components/ui/footnote.tsx`. Evidence before
   any further ask — the page is telling you, immediately, that it can be
   audited.

   THE MONO LAW: every figure here is set in IBM Plex Mono because every
   figure here can be proved. Tabular figures come from the base layer.

   UI WEIGHT (2026-08-03): the strip used to set the whole line at one colour
   and one weight, which read as prose. Each entry is now split into its
   FIGURE and its words: the figure takes --marine (the token's documented
   role is "numerals") at mono 500, the words take --ink-muted at 400. The
   line is still one line of running text — the same string, the same order,
   the same separators — it simply now has a typographic hierarchy, so the
   numbers register as data instead of as sentence. Vertical padding is cut
   roughly a third so the strip sits under the hero as a dense rail rather
   than another airy band.

   ICONS (2026-08-04): none, deliberately, and this is the one file in the
   chrome where that is the answer. Lucide is now canon site-wide, but the
   strip has no affordances to mark — nothing here is a control. The only
   interactive things in it are the `Footnote` superscripts, and those are
   owned by `components/ui/footnote.tsx`. Putting a glyph on each of the
   seven figures would give the line a repeating leading mark per entry,
   which is precisely the "stat bar" the CANON line above forbids. The
   evidence here is carried by the mono figures and their superscripts.

   No heading — this strip is an `aria-label`led region, not a chapter.
   Motion: one once-only reveal on enter, opacity + y24, tight stagger.
   The footnote DEFINITIONS live once, in the colophon footer; these markers
   are anchors into that table, and they work with JavaScript disabled.
   ======================================================================== */

interface Stat {
  id: string;
  /** The provable quantity. Mono 500, --marine. Carries its own punctuation. */
  figure: string;
  /** The words that qualify it. Mono 400, --ink-muted. */
  label: string;
  source?: SourceId;
}

/* `figure` + " " + `label` reproduces the CANON string verbatim. */
const STATS: Stat[] = [
  { id: "founded", figure: "Est. 2001,", label: "Amritsar", source: "founded" },
  { id: "years", figure: "25", label: "years" },
  {
    id: "students",
    figure: "40,000+",
    label: "students placed",
    source: "students-placed",
  },
  {
    id: "partners",
    figure: "700+",
    label: "partner universities",
    source: "partner-universities",
  },
  {
    id: "destinations",
    figure: "15",
    label: "destinations",
    source: "destinations",
  },
  {
    id: "offices",
    figure: "18",
    label: "offices, named and addressed",
    source: "offices",
  },
  {
    id: "testimonials",
    figure: "47",
    label: "published testimonials",
    source: "testimonials",
  },
];

export default function ColophonStrip() {
  return (
    <section
      id="colophon-strip"
      data-chapter="dream"
      aria-label="Global Opportunities in figures, with sources"
      className="bg-paper-laid py-8 md:py-10"
    >
      <Container>
        <Rule weight="chapter" />

        <motion.p
          variants={staggerChildrenTight}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-2 py-5 font-mono text-caption uppercase"
        >
          {STATS.map((stat, i) => (
            <motion.span
              key={stat.id}
              variants={fadeUp}
              className="inline-flex items-baseline gap-3 whitespace-nowrap"
            >
              <span className="text-ink-muted">
                <span data-figure className="font-medium text-marine">
                  {stat.figure}
                </span>{" "}
                {stat.label}
                {stat.source && <Footnote id={stat.source} primary />}
              </span>
              {i < STATS.length - 1 && (
                <span aria-hidden="true" className="text-rule-strong">
                  ·
                </span>
              )}
            </motion.span>
          ))}
        </motion.p>

        <Rule weight="chapter" />
      </Container>
    </section>
  );
}
