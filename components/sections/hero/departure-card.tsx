import { Footnote, type SourceId } from "@/components/ui/footnote";
import { Rule } from "@/components/ui/rule";
import { cn } from "@/lib/cn";

/* ===========================================================================
   THE DEPARTURE CARD  ·  hero verso  ·  Chapter I DREAM
   ---------------------------------------------------------------------------
   CANON: the hero's centrepiece is NOT a photographic carousel. It is a
   typeset readiness form — six stations, mono labels left, tabular values,
   status marks far right — that boots on load, resolves its values out of
   scramble, flips its statuses, and settles on
   `STATUS: GO · SEPTEMBER 2027 INTAKE`.

   Re-set as PRINT: 1px --rule-strong keyline, 3px sienna registration offset
   (--shadow-reg-sienna), --paper-tracing form bed, radius <=2px. No glass,
   no backdrop-filter, no elevation shadow.

   LAYERING: at >=1024px this card is positioned OVER the lower-left corner of
   Plate I (see hero.tsx). Its bed is fully opaque, so legibility never
   depends on the photograph beneath it. Its padding steps down one notch
   between 1024px and 1280px, where the column is at its tightest; nothing
   else about it changes, and the boot sequence hooks — [data-departure-card],
   [data-station], [data-station-value], [data-station-status],
   [data-card-status], [data-card-stamp] — are untouched.

   HONESTY: every value below is server-rendered at its FINAL value — GSAP
   only animates toward what is already in the DOM, so the card renders
   complete and cleared on first paint and under reduced motion. The card is
   an illustrative facsimile and says so, in a stamp, at the foot. The one
   checkable fact on it — a named counsellor at a named, addressed office —
   is the one that carries a footnote.
   ======================================================================== */

interface Station {
  id: string;
  /** Mono, tracked caps. The station name. CANON order. */
  label: string;
  /** Tabular value. Server-rendered final; ScrambleText resolves TO this. */
  value: string;
  /** Status mark. Flips to --verdigris last in the boot sequence. */
  status: string;
  /** Resolves to the Sources & Methods registry. */
  source?: SourceId;
}

const STATIONS: Station[] = [
  { id: "shortlist", label: "Course shortlist", value: "12 SHORTLISTED", status: "Cleared" },
  { id: "finance", label: "Finance plan", value: "RANGE AGREED", status: "Cleared" },
  { id: "english", label: "English test", value: "BOOKED 12 MAR", status: "Cleared" },
  { id: "documents", label: "Documents", value: "9 OF 9 FILED", status: "Cleared" },
  { id: "visa", label: "Visa file", value: "LODGED 14 JUN", status: "Cleared" },
  {
    id: "counsellor",
    label: "Your counsellor",
    value: "AVINASH · DELHI SOUTH",
    status: "Verified",
    source: "offices",
  },
];

/* Fixed-width status cell — the mark flips, the column never moves. It
   narrows one step between 1024px and 1280px, where the card is laid over
   the lower-left of Plate I and has less room than it used to. */
const PILL =
  "inline-flex w-20 lg:w-24 items-center justify-center rounded-2 bg-verdigris-tint " +
  "px-2 py-1 font-mono text-mono-label uppercase text-verdigris";

/* The hero's full-bleed rewrite uses the card as a compact boarding-pass
   accent, not a co-star: `compact` keeps four stations (shortlist, finance,
   visa, counsellor) so the photograph — not the form — carries the hero. */
const COMPACT_IDS = ["shortlist", "finance", "visa", "counsellor"];

export function DepartureCard({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const stations = compact
    ? STATIONS.filter((s) => COMPACT_IDS.includes(s.id))
    : STATIONS;

  return (
    <figure
      data-departure-card
      aria-label="The Departure Card — a specimen readiness form"
      className={cn("reveal m-0 flex flex-col", className)}
    >
      <div className="rounded-1 border border-rule-strong bg-paper-tracing shadow-reg-sienna">
        {/* ---- head ------------------------------------------------------ */}
        <div className="flex items-baseline justify-between gap-4 px-4 pt-4 pb-3 lg:px-6">
          <span className="font-mono text-mono-label uppercase text-ink">
            Plate I · Departure card
          </span>
          <span className="font-mono text-mono-label uppercase text-ink-muted tabular-figures">
            {compact ? "Four stations" : "Six stations"}
          </span>
        </div>
        <Rule weight="chapter" />

        {/* ---- stations --------------------------------------------------- */}
        <dl className="m-0 px-4 lg:px-6">
          {stations.map((station) => (
            <div
              key={station.id}
              data-station
              className="reveal grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-rule py-2.5 last:border-b-0"
            >
              <dt className="col-start-1 row-start-1 font-mono text-mono-label uppercase text-ink-muted">
                {station.label}
              </dt>
              <dd className="col-start-2 row-span-2 row-start-1 m-0 self-center">
                <span data-station-status className={PILL}>
                  {station.status}
                </span>
              </dd>
              <dd className="col-start-1 row-start-2 m-0 mt-1 font-mono text-data text-ink tabular-figures">
                <span data-station-value>{station.value}</span>
                {station.source && <Footnote id={station.source} />}
              </dd>
            </div>
          ))}
        </dl>

        {/* ---- the resolving bar ----------------------------------------- */}
        <div
          data-card-status
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-rule-strong bg-verdigris-tint px-4 py-3 lg:px-6"
        >
          <span className="font-mono text-caption tracking-mono-label uppercase text-verdigris">
            Status: GO
          </span>
          <span className="font-mono text-caption tracking-mono-label uppercase text-verdigris tabular-figures">
            September 2027 intake
          </span>
        </div>
      </div>

      {/* ---- the stamp: honest about what this is ------------------------ */}
      <figcaption className="mt-3">
        <span
          data-card-stamp
          className="reveal inline-block -rotate-2 border border-clay px-2 py-1 font-mono text-mono-label uppercase text-clay"
        >
          Specimen · Illustrative · Not a student record
        </span>
      </figcaption>
    </figure>
  );
}
