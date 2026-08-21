import { Container } from "@/components/ui/container";
import { Counter } from "./stats/counter";

/* ===========================================================================
   PROOF — four figures, each footnoted
   ---------------------------------------------------------------------------
   The canon strip on `/` runs SIX (it adds 15 destinations and 47
   testimonials). Six figures in a row is a wall: nobody reads the fifth. These
   are the four that answer "are these people real and have they done this
   before", which is the only question a proof strip gets to answer.

   COMPLIANCE, not decoration: every figure carries a superscript resolving to
   the Sources & Methods list in the footer, with an owner and a last-verified
   date. `primary` puts the `fnref-*` anchor here so the footer's back-links
   land on this section — only ONE marker per source may be primary or the page
   ships duplicate DOM ids.

   NEVER print "100,000+ students" — unverified and withdrawn. 40,000+ is the
   auditable figure and the one GO publishes most consistently.

   THE MONO LAW: the figures are mono for its tabular / lining / slashed-zero
   numerals. The labels beneath them are prose, so they are not.

   No borders — separation is a tint (`bg-secondary`), per the tint-not-lines
   rule. Server Component; ships no JavaScript.
   ======================================================================== */

/* `count: false` means render the string as-is. 2001 is a YEAR, not a
   quantity — counting up to it from zero reads as a stat and is nonsense. The
   other three are quantities and animate. */
const FIGURES = [
  {
    value: 2001,
    suffix: "",
    count: false,
    label: "Established in Amritsar",
    source: "founded",
  },
  {
    value: 40000,
    suffix: "+",
    count: true,
    label: "Students placed",
    source: "students-placed",
  },
  {
    value: 700,
    suffix: "+",
    count: true,
    label: "Partner universities",
    source: "partner-universities",
  },
  {
    value: 18,
    suffix: "",
    count: true,
    label: "Offices across India",
    source: "offices",
  },
] as const;

export default function Proof() {
  return (
    <section aria-label="Global Opportunities in figures" className="bg-secondary py-section-y">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {FIGURES.map(({ value, suffix, count, label, source }) => (
            /* flex-col-REVERSE is deliberate. A <dl> pairs a term with its
               value, so the DOM order must be <dt>label</dt><dd>figure</dd> —
               but the figure has to sit ABOVE the label visually. Reversing in
               CSS gets both. The earlier version kept DOM order and hid a
               duplicate label in an sr-only <dt>, which made a screen reader
               read every stat twice ("Established in Amritsar, 2001,
               Established in Amritsar"). */
            <div key={source} className="flex flex-col-reverse gap-1.5">
              <dt className="text-body-sm text-muted-foreground">{label}</dt>
              <dd
                data-figure
                className="m-0 font-mono text-figure text-marine tabular-figures"
              >
                {/* `tabular-figures` is doing real work here: the counter
                    re-renders a different number every frame, and without
                    tabular numerals the whole row would jitter horizontally
                    while it ran. */}
                {count ? (
                  <Counter value={value} suffix={suffix} />
                ) : (
                  `${value}${suffix}`
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
