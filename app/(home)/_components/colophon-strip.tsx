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

     EST. 2001, AMRITSAR¹ · 40,000+ STUDENTS PLACED² ·
     700+ PARTNER UNIVERSITIES³ · 15 DESTINATIONS⁴ ·
     18 OFFICES ACROSS INDIA⁵ · 47 TESTIMONIALS⁶

   SINGLE ROW (2026-08-04, client pass). The old seven-entry string wrapped
   to two ragged lines inside the content column, which read as neither set
   text nor a designed bar. Three moves brought it to one literal line:
     - "25 YEARS" left — the only UNCITED entry (derived from Est. 2001,
       no footnote), so the audit surface lost nothing.
     - "named and addressed" -> "across India"; "published" dropped — the
       registry notes still carry both qualifiers.
     - At md+ the six entries DISTRIBUTE across the row (justify-between,
       no wrap) and the middle dots retire; below md the line wraps as
       dot-separated prose exactly as before.
   Six entries, six superscripts, every one still a PRIMARY anchor into the
   Sources & Methods registry in `components/ui/footnote.tsx` — the fnref-*
   ids the Sources table back-links to live HERE and must not be removed.
   Evidence before any further ask — the page is telling you, immediately,
   that it can be audited.

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
   six figures would give the line a repeating leading mark per entry,
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
    label: "offices across India",
    source: "offices",
  },
  {
    id: "testimonials",
    figure: "47",
    label: "testimonials",
    source: "testimonials",
  },
];

export default function ColophonStrip() {
  return (
    <section
      id="colophon-strip"
      data-chapter="dream"
      aria-label="Global Opportunities in figures, with sources"
      className="bg-paper-laid py-6 md:py-8"
    >
      <Container>
        <Rule weight="chapter" />

        {/* Wrapped dot-separated prose below md; one distributed line at
            md+, where the dots retire and the spacing does the setting. */}
        <motion.p
          variants={staggerChildrenTight}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-2 py-4 font-mono text-caption uppercase md:flex-nowrap md:justify-between md:gap-x-6 md:py-5"
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
                <span aria-hidden="true" className="text-rule-strong md:hidden">
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
