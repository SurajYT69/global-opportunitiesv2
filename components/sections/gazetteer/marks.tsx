import type { SourceId } from "@/components/ui/footnote";
import { footnoteId, getSource, sourceNumber } from "@/components/ui/footnote";
import { cn } from "@/lib/cn";
import type { TuitionBand } from "./data";

/* ===========================================================================
   THE GAZETTEER — SHARED DATA MARKS
   ---------------------------------------------------------------------------
   Three primitives shared by the anchor cards (Server Component) and the index
   rows (Client Component). No "use client" here on purpose: a plain module is
   legal in both trees, and the client bundle only pays for what `rows.tsx`
   actually pulls across the boundary.

   ALL THREE MARKS STAY AS TYPE UNDER THE LUCIDE CANON (2026-08-04). Every one
   of them sets inside a `tabular-figures` cell, on the same baseline as the
   numerals it stands in for or annotates. That is the whole point of them: the
   footnote numeral, the em-dash and the en-dash are figures in a column of
   figures, and a 16px stroked glyph dropped into that column would be the one
   object in it that is not on the type grid. `components/ui/icon.tsx` warns
   about exactly this weight mismatch. Icons went to the affordances instead —
   the row toggle, the link arrows, the card fact labels.
   ======================================================================== */

/**
 * A repeat footnote marker.
 *
 * `<Footnote>` stamps `id="fnref-…"` on its anchor, which is correct exactly
 * once per page. The gazetteer references note 3 fifteen times, so repeats use
 * this marker: identical type, identical target, no duplicated element id. The
 * canonical back-link anchor stays with `colophon-strip` / `colophon`.
 *
 * `className` exists for one reason: inside an anchor card a stretched link
 * covers the whole surface, and this marker has to be lifted above it or the
 * citation stops being clickable. A footnote you cannot reach is not a
 * footnote.
 */
export function SourceMark({
  id,
  className,
}: {
  id: SourceId;
  className?: string;
}) {
  const source = getSource(id);
  const n = sourceNumber(id);
  return (
    <sup className={cn("align-super leading-none", className)}>
      <a
        href={`#${footnoteId(id)}`}
        aria-label={`Footnote ${n}: ${source.note}`}
        className="font-mono text-[0.62em] text-sienna-press no-underline tabular-figures hover:underline"
      >
        {n}
      </a>
    </sup>
  );
}

/** An em-dash that never announces as "zero". */
export function NotPublished() {
  return (
    <>
      <span aria-hidden="true">—</span>
      <span className="sr-only">not yet published</span>
    </>
  );
}

/** A range that never announces as two separate numbers. */
export function Range({ band }: { band: TuitionBand }) {
  return (
    <>
      {band.prefix}
      {band.low}
      <span className="sr-only"> to </span>
      <span aria-hidden="true">–</span>
      {band.high}
    </>
  );
}
