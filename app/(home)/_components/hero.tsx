import { ArrowDown, BadgeCheck, CalendarCheck, Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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

   v5 (client directive: one fold, more presence). Three moves:
     1. THE FRAME IS THE FOLD. At >=1024px the section is hard-capped to
        100svh minus the masthead, with a 620px floor for short landscape
        viewports. Below `md` it keeps a min-height and may run long — a
        phone fold cannot hold four stats and two CTAs honestly.
     2. THE HEADLINE IS A HAND-BROKEN TWO-LINE LOCKUP — "Step out" /
        "without doubt." — with "doubt." picked out in GO Yellow. Legal:
        ochre is banned as text ON PAPER (1.5:1); on the navy plate it
        clears 8:1. The size steps down from --text-d0's 7.5rem cap to a
        6.5rem cap so line two never wraps and the fold never overflows.
        Block spans force the breaks; SplitText treats each as a line.
     3. THE DEPARTURE CARD RETURNED at lg+ as the right-hand accent —
        then left again the same day (see v6). Its boot hook survives,
        guarded, in hero-stage.tsx.

   v6 (client-supplied art, 2026-08-04, same day as v5). The client supplied
   a horizon banner — globe, landmark cards, aircraft with dotted path,
   passport in a student's hand — and directed it in as the hero plate.
   That art contains most of the banned-imagery list; the ban is OVERRIDDEN
   FOR THIS ONE PLATE by explicit client direction, the same mechanism that
   admitted Lucide. The rule still stands everywhere else on the page: no
   UI element, icon, or illustration we author may use those motifs. The
   departure card went back to the archive because the banner's right edge
   is the subject and an opaque card would cover it.

   WHAT WENT in v4: the "I · DREAM" chapter rail, the plate coordinates, the
   italic serif deck, the italic <em> in the H1, the six-mark accreditation
   list in the copy column. Those were the newspaper devices.

   WHAT ARRIVED: THE STATS BAR — the new signature. A full-bleed strip flush
   to the bottom edge of the hero, one navy step lighter than the scrim
   (--endpaper-2) so it reads as its own plate. At lg+ each cell is a
   HORIZONTAL lockup — Bebas figure left, tracked caps label beside it on a
   narrow measure so it wraps to two short lines — which keeps the band low
   and open instead of stacking two rows of type in a 72px strip. Floor
   figures carry an ochre "+" (the band's one accent); the accreditation
   lockup rides the right end (never a fifth stat). Below `lg` it folds to
   a 2x2 grid of stacked cells with the lockup on its own row.

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
     ([data-departure-card] is guarded in hero-stage and absent since v6)

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
  /** "+" where the figure is a floor, set in GO Yellow. Never part of
      `value` — the ochre plus is the band's one accent and must not
      inherit plate-white. */
  suffix?: string;
  /** Tracked caps, beneath the figure. */
  label: string;
}

/* FOOTNOTE MARKERS REMOVED 2026-08-04 by client direction — the superscript
   ²/³ reading as stray digits in the band. The 40,000+ and 700+ claims are
   still the conservative published values and remain documented, with owners
   and last-verified dates, in the colophon's Sources & Methods table; only
   the visible markers left this band. If the ads-compliance reviewer asks,
   this is the paragraph to point at. */
const STATS: Stat[] = [
  { value: "40,000", suffix: "+", label: "Students placed" },
  { value: "700", suffix: "+", label: "Partner universities" },
  { value: "18", label: "Offices across India" },
  { value: "2001", label: "Established" },
];

/** The three marks that carry weight with parents. Not a fifth stat. */
const ACCREDITATION = "AIRC · ICEF · British Council";

export default function Hero() {
  return (
    <HeroStage className="relative isolate flex min-h-[calc(100svh_-_3.5rem)] flex-col overflow-hidden bg-endpaper md:h-[calc(100svh_-_4rem)] md:min-h-[620px]">
      {/* ---- Plate I, full bleed — the hero IS the picture ---------------
          v6 (2026-08-04): client-supplied horizon banner replaces the
          departure-hall photograph. The right edge is the subject (student,
          globe, destination cards), so the crop pins RIGHT and sacrifices
          the empty navy left — which is exactly where the copy scrim sits.
          The image's own left field is already deep navy, so the scrims
          step down from v4's 95/70 to 85/45; they only need to steady the
          type, not manufacture darkness. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/images/plates/hero-horizon.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] md:object-right"
        />
        {/* Baked navy scrims — never backdrop-filter. Copy side + foot. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A47]/85 via-[#0E2A47]/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0E2A47]/90 to-transparent" />
      </div>

      {/* ================= THE COPY COLUMN ============================== */}
      <div className="flex min-h-0 flex-1 items-center px-gutter pt-8 pb-10 md:py-4">
        <div className="mx-auto flex w-full max-w-frame items-center gap-12 xl:gap-20">
          <div className="min-w-0 flex-1 md:max-w-3xl">
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

            {/* -- THE MOBILE LCP. Visible in CSS at all times. ---------
                Hand-broken two-line lockup: block spans force the breaks,
                SplitText treats each block as its own line. The size is a
                fold-safe step down from --text-d0 (6.5rem cap, not 7.5) so
                "without doubt." never wraps and the frame never overflows;
                weight, leading and tracking mirror the d0 token. "doubt."
                rides in GO Yellow — highlight role, dark plate only. */}
            <h1
              data-hero-headline
              className="mt-4 font-display text-[clamp(2.75rem,6vw,5.75rem)] leading-none font-semibold tracking-[-0.03em] text-plate-white md:mt-5"
            >
              <span className="block">Step out</span>
              <span className="block">
                without <span className="text-ochre-on-dark">doubt.</span>
              </span>
            </h1>

            {/* Two lines at the 2xl measure — "since 2001" lives in the
                stats band below, so the deck no longer repeats it. */}
            <p
              data-hero-deck
              className="reveal mt-4 max-w-2xl font-ui text-body text-plate-grey md:mt-5 md:text-[1.1875rem] md:leading-[1.6]"
            >
              We&rsquo;ve placed students in 700+ partner universities across
              15 countries — admissions, education loans, GIC and forex
              handled in-house.
            </p>

            <div
              data-hero-actions
              className="reveal mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
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
              className="reveal mt-3 flex items-start gap-2 font-mono text-caption text-plate-grey"
            >
              <Icon as={Clock} size="sm" className="mt-px" />
              <span>
                No cost, no obligation · 30–45 minutes with an admissions
                counsellor
              </span>
            </p>
          </div>

          {/* v6: no right-hand card. The banner's own right edge — student,
              globe, destination cards — IS the right-hand accent now; an
              opaque paper card here would sit directly on the subject.
              The departure card returns to the archive; hero-stage's
              [data-departure-card] hook is guarded and simply no-ops. */}
        </div>
      </div>

      {/* ================= THE STATS BAR =============================== */}
      {/* Flush to the foot of the frame, edge to edge. The band sits one
          navy step LIGHTER than the scrim above it (--endpaper-2, a canon
          token) so it reads as its own plate, not more scrim. Each floor
          figure carries an ochre "+" — the band's single accent. */}
      <div className="relative z-10 w-full bg-endpaper-2">
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
                  // Stacked below lg; a horizontal figure+label lockup at
                  // lg+ so the band stays low and open.
                  "flex min-h-14 flex-col justify-center border-white/15 py-3 pr-4",
                  "lg:min-h-16 lg:flex-1 lg:flex-row lg:items-center lg:justify-start lg:gap-3.5 lg:py-0",
                  // 2x2 below lg: vertical hairline down the middle,
                  // horizontal hairline between the rows.
                  i % 2 === 1 && "border-l pl-4",
                  i >= 2 && "border-t lg:border-t-0",
                  // A single row of four at lg: hairline before each cell
                  // except the first.
                  i > 0 && "lg:border-l lg:pl-6",
                )}
              >
                <span className="font-bebas text-[1.75rem] leading-none tracking-[0.02em] text-plate-white tabular-figures lg:text-[2.5rem]">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-ochre-on-dark">{stat.suffix}</span>
                  )}
                </span>
                {/* Narrow measure at lg+ wraps the label to two short
                    lines BESIDE the figure — never under it. */}
                <span className="mt-1.5 font-ui text-[11px] leading-[1.35] font-semibold tracking-[0.14em] text-plate-grey uppercase lg:mt-0 lg:max-w-[8.5rem]">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>

          {/* The lockup rides the right end. Never a fifth stat. */}
          <p
            data-hero-accreditation
            className="reveal m-0 flex min-h-12 items-center gap-2 border-t border-white/15 font-mono text-mono-label uppercase text-plate-grey lg:min-h-16 lg:border-t-0 lg:border-l lg:pl-6"
          >
            <Icon as={BadgeCheck} size="sm" />
            {ACCREDITATION}
          </p>
        </div>
      </div>
    </HeroStage>
  );
}
