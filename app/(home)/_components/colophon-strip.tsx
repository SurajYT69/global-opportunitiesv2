"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Footnote, type SourceId } from "@/components/ui/footnote";
import { fadeUp, staggerChildrenTight, VIEWPORT_ONCE } from "@/lib/motion";

/* ===========================================================================
   SECTION 3 · `colophon-strip` · THE COLOPHON STRIP · Chapter I DREAM
   ---------------------------------------------------------------------------
   SUPERSEDED CANON (Aug 2026): "Colophon strip runs as one line of set text,
   not a stat bar." It is now a keylined figures card — five figures at
   display scale over their labels, two columns on a phone, five at lg.

   The old line read:

     EST. 2001, AMRITSAR¹ · 40,000+ STUDENTS PLACED² ·
     700+ PARTNER UNIVERSITIES³ · 15 DESTINATIONS⁴ ·
     18 OFFICES ACROSS INDIA⁵ · 47 TESTIMONIALS⁶

   Two things changed and both were client decisions, not drift. The offices
   entry is GONE — see the note on the STATS array. And the strip became a
   card because the homepage split left it as the first thing under the hero,
   carrying the page's whole evidence claim in 11px caption type. Everything
   below about the mono law, the figure/label colour split and the footnote
   anchors still holds; only the layout changed.

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
  /* The offices figure is REMOVED, not restyled (Aug 2026). Four different
     counts were in circulation — 18 here, 20 on the old hero, 16 pins on the
     atlas, 23 GBP listings — and the auditable definition (a branch with a
     physical address AND a live GBP listing) has not been run yet. An office
     numeral is banned site-wide until it has. Restore this entry, with its
     source, once the count is verified; `/offices` carries the map meanwhile. */
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
      className="bg-paper py-10 md:py-14"
    >
      <Container>
        {/* THE FIGURES CARD (Aug 2026). This was a single dot-separated line of
            caption type running between two rules. It is now the keylined card
            the body opens on: the figures are the first thing under the hero
            and they have to carry that position, which 11px caption type set
            in a row could not.

            The figure is display-scale mono; the label sits beneath it rather
            than beside it, so nothing has to stay on one line and the grid can
            reflow to two columns on a phone without breaking a pair apart.

            Every footnote marker is unchanged and still `primary` — these are
            the canonical `fnref-*` anchors the colophon's sources table
            back-links to. Moving or dropping one silently breaks the return
            journey from the sources table. */}
        <motion.ul
          variants={staggerChildrenTight}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-8 rounded-1 border border-rule-strong bg-paper p-6 md:grid-cols-3 md:p-8 lg:grid-cols-5"
        >
          {STATS.map((stat) => (
            <motion.li
              key={stat.id}
              variants={fadeUp}
              className="flex flex-col gap-1"
            >
              <span
                data-figure
                className="min-w-0 font-mono text-d2 font-medium break-words text-marine tabular-figures"
              >
                {stat.figure}
                {stat.source && <Footnote id={stat.source} primary />}
              </span>
              <span className="font-ui text-label uppercase text-ink-muted">
                {stat.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
