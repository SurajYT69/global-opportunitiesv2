import { ArrowDown, BadgeCheck, CalendarCheck, Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Footnote, type SourceId } from "@/components/ui/footnote";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { HeroStage } from "./hero/hero-stage";

/* ===========================================================================
   SECTION 2 · `hero` · FULL-BLEED PLATE I · Chapter I DREAM
   ---------------------------------------------------------------------------
   v4 (client directive: no more "newspaper"). The reference is the 21st.dev
   Responsive Hero Banner — a full-screen cinematic photograph, a small badge
   pill above the headline, a two-line display headline, one short paragraph,
   dual CTAs, and a trust row welded to the base of the frame.

   WHAT WENT: the "I · DREAM" chapter rail, the plate coordinates, the italic
   serif deck, the italic <em> in the H1, the six-mark accreditation list in
   the copy column. Those were the newspaper devices.

   WHAT ARRIVED: THE STATS BAR — the new signature. A solid GO Navy strip
   flush to the bottom edge of the hero, full bleed, four figures set in Bebas
   with tracked caps labels beneath, hairline-separated at white/20, with the
   accreditation lockup riding the right end (never a fifth stat). Below the
   `lg` breakpoint it folds to a 2x2 grid with the lockup on its own row.

     +---------------------------------------------------------------+
     |  ( September 2027 intake · Admissions open )                   |
     |                                                                |
     |  STEP OUT WITHOUT DOUBT.          (photograph, whole frame,    |
     |  sub-line                          two baked navy scrims)      |
     |  [Book a free guidance session]  [Explore 15 destinations]     |
     |  no cost, no obligation · 30-45 minutes                        |
     |                                                                |
     +----------------------------------------------------------------+
     | 40,000+ | 700+ | 18 | 2001 |            AIRC · ICEF · BRITISH  |
     +---------------------------------------------------------------+

   LCP: the photograph is the desktop LCP (priority, never animated, never
   opacity-0). The H1 is the mobile LCP and is never hidden in CSS; SplitText
   applies its hidden state in JS only.

   Every boot-sequence hook from hero-stage.tsx is present exactly once:
     [data-hero-rule]           the stats-bar top hairline (DrawSVG)
     [data-hero-eyebrow]        the badge pill
     [data-hero-headline]       the H1 (SplitText line rise)
     [data-hero-deck]           the sub-line
     [data-hero-actions]        the CTA row
     [data-hero-proof]          the no-cost qualifier under the CTAs
     [data-hero-accreditation]  the lockup at the right end of the stats bar

   FIGURES: only claims that resolve in the Sources registry are printed, and
   only at the conservative published value. 40,000+ is the verified number of
   students placed — larger claims are withdrawn pending audit.

   COMPLIANCE: the phrase "free counselling" is banned across the site. The
   primary CTA reads "Book a free guidance session".

   ICONS: Lucide, only ever through <Icon>. Four functional marks and no more —
   a calendar on the booking CTA, a down-arrow on the in-page jump to the
   gazetteer, a clock on the 30-45 minute qualifier, and an accreditation tick
   at the right end of the stats bar. THE FOUR FIGURES STAY BARE. A 38px Bebas
   numeral does not need a glyph to explain that it is a number, and one set
   beside it is decoration, which is how this page starts looking like every
   other one. Nothing replaces the ochre dot in the badge pill either — that
   dot is a typographic mark, not a placeholder for an icon.

   CONTRAST: copy renders over the left scrim, which floors at 70% GO Navy
   over an already-navy photograph — plate-white (12.2:1 on flat navy) and
   plate-grey (5.7:1) both hold. The secondary CTA is hand-styled light
   (Button's `secondary` variant is ink-on-paper and would vanish here).
   ======================================================================== */

interface Stat {
  /** The figure itself. Set in Bebas, tabular. */
  value: string;
  /** Tracked caps, beneath the figure. */
  label: string;
  /** Resolves in the Sources & Methods registry. */
  source?: SourceId;
}

const STATS: Stat[] = [
  { value: "40,000+", label: "Students placed", source: "students-placed" },
  {
    value: "700+",
    label: "Partner universities",
    source: "partner-universities",
  },
  { value: "18", label: "Offices across India" },
  { value: "2001", label: "Established" },
];

/** The three marks that carry weight with parents. Not a fifth stat. */
const ACCREDITATION = "AIRC · ICEF · British Council";

export default function Hero() {
  return (
    <HeroStage className="relative isolate flex min-h-[calc(100svh_-_4rem)] flex-col overflow-hidden bg-endpaper">
      {/* ---- Plate I, full bleed — the hero IS the photograph ------------ */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/images/plates/hero-departure.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_38%] md:object-[center_40%]"
        />
        {/* Baked navy scrims — never backdrop-filter. Copy side + foot. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A47]/95 via-[#0E2A47]/70 to-[#0E2A47]/25" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0E2A47]/90 to-transparent" />
      </div>

      {/* ================= THE COPY COLUMN ============================== */}
      <div className="flex flex-1 items-center px-gutter pt-14 pb-16 md:pt-20 md:pb-20">
        <div className="mx-auto w-full max-w-frame">
          <div className="md:max-w-3xl">
            {/* -- the badge pill -------------------------------------- */}
            <p
              data-hero-eyebrow
              className="reveal m-0 inline-flex items-center gap-2.5 rounded-pill border border-plate-rule bg-endpaper/60 px-4 py-2 font-mono text-mono-label uppercase text-plate-white"
            >
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-pill bg-ochre"
              />
              September 2027 intake · Admissions open
            </p>

            {/* -- THE MOBILE LCP. Visible in CSS at all times. --------- */}
            <h1
              data-hero-headline
              className="mt-6 font-display text-d0 text-balance text-plate-white md:mt-8"
            >
              Step out without doubt.
            </h1>

            <p
              data-hero-deck
              className="reveal mt-6 max-w-2xl font-ui text-body text-plate-grey md:text-[1.1875rem] md:leading-[1.6]"
            >
              Overseas education consultants since 2001. We&rsquo;ve placed
              students in 700+ partner universities across 15 countries —
              admissions, education loans, GIC and forex handled in-house.
            </p>

            <div
              data-hero-actions
              className="reveal mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-10"
            >
              <Button href="#enquiry" size="lg">
                <Icon as={CalendarCheck} />
                Book a free guidance session
              </Button>
              {/* The arrow points DOWN because #gazetteer is further down this
                  page. A right-pointing arrow would promise a navigation. */}
              <a
                href="#gazetteer"
                className="inline-flex min-h-15 items-center justify-center gap-2 rounded-pill border border-plate-grey/70 px-8 font-ui text-body font-semibold text-plate-white no-underline transition-colors duration-200 ease-quad hover:border-plate-white hover:bg-white/10"
              >
                Explore 15 destinations
                <Icon as={ArrowDown} />
              </a>
            </div>

            <p
              data-hero-proof
              className="reveal mt-4 flex items-start gap-2 font-mono text-caption text-plate-grey"
            >
              <Icon as={Clock} size="sm" className="mt-px" />
              <span>
                No cost, no obligation · 30–45 minutes with an admissions
                counsellor
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ================= THE STATS BAR =============================== */}
      {/* Flush to the foot of the frame, edge to edge, solid GO Navy. */}
      <div className="relative z-10 w-full bg-endpaper">
        {/* The one rule left on the page — drawn once by the boot sequence. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 1"
          preserveAspectRatio="none"
          className="block h-px w-full"
        >
          <line
            data-hero-rule
            x1="0"
            y1="0.5"
            x2="1000"
            y2="0.5"
            stroke="var(--plate-rule)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="flex flex-col px-gutter lg:flex-row lg:items-stretch">
          <ul className="grid list-none grid-cols-2 p-0 lg:flex lg:flex-1">
            {STATS.map((stat, i) => (
              <li
                key={stat.label}
                className={cn(
                  "flex min-h-16 flex-col justify-center border-white/20 py-3 pr-4 lg:min-h-20 lg:flex-1 lg:py-0",
                  // 2x2 below lg: vertical hairline down the middle,
                  // horizontal hairline between the rows.
                  i % 2 === 1 && "border-l pl-4",
                  i >= 2 && "border-t lg:border-t-0",
                  // A single row of four at lg: hairline before each cell
                  // except the first.
                  i > 0 && "lg:border-l lg:pl-5",
                )}
              >
                <span className="font-bebas text-[1.75rem] leading-none tracking-[0.02em] text-plate-white tabular-figures lg:text-[2.375rem]">
                  {stat.value}
                  {stat.source && (
                    <Footnote
                      id={stat.source}
                      className="[&>a]:text-sienna-on-dark"
                    />
                  )}
                </span>
                <span className="mt-1.5 font-ui text-[11px] leading-tight font-semibold tracking-[0.14em] text-plate-grey uppercase">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>

          {/* The lockup rides the right end. Never a fifth stat. */}
          <p
            data-hero-accreditation
            className="reveal m-0 flex min-h-14 items-center gap-2 border-t border-white/20 font-mono text-mono-label uppercase text-plate-grey lg:min-h-20 lg:border-t-0 lg:border-l lg:pl-6"
          >
            <Icon as={BadgeCheck} size="sm" />
            {ACCREDITATION}
          </p>
        </div>
      </div>
    </HeroStage>
  );
}
