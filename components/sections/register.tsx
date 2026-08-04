import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Rule } from "@/components/ui/rule";
import { FootnoteDetails, footnoteId, getSource, sourceNumber } from "@/components/ui/footnote";
import type { SourceId } from "@/components/ui/footnote";
import { Icon } from "@/components/ui/icon";
import { STAGGER } from "@/lib/motion";
import { Reveal } from "./register/reveal";

/* ===========================================================================
   5 · register — THE REGISTER
   ---------------------------------------------------------------------------
   Chapter II EXPLORE · surface --paper-laid · motion: one staggered reveal.

   Seven hundred-plus partner agreements set as a typeset list with named
   institutions and a country breakdown, because to a parent a recognisable
   name outweighs any testimonial. This replaces the category's greyscale logo
   wall on purpose: a name in type claims exactly what it is — a partner
   agreement — where a crest in greyscale implies more.

   THE MONO LAW: the counts are mono because they are verified fact. The
   institution names are NOT mono — they are nouns, set in the editorial voice.

   v2 COMPACTION (client note: "reads like a blog"): the eight country groups
   ran three-up in tall, loosely-leaded columns — 2,370px of unbroken list. The
   register is now a four-up gazetteer of tight name columns under one wide
   photographic banner, so the section reads as a directory rather than an
   article. Every one of the sixty-eight named institutions is still here, in
   the server HTML, in the same order, with the same counts and the same
   reconciliation line.

   This file is a Server Component. Every institution name is in the server
   HTML; only the reveal wrapper is client-side.
   ======================================================================== */

interface PartnerCountry {
  country: string;
  /** GO's published count, as displayed. */
  count: string;
  /** Named institutions, as they publish their own names. */
  named: string[];
  /** Remainder beyond the named list, as displayed. */
  more: string;
}

/**
 * Country split, verbatim from Sources & Methods note 3:
 * USA 150+, UK 80+, Canada 60+, Australia 45+, Germany 30+, New Zealand 30+,
 * Ireland 20+, Singapore 7. Sixty-eight institutions named across the eight.
 */
const REGISTER: PartnerCountry[] = [
  {
    country: "United States",
    count: "150+",
    more: "+140 more",
    named: [
      "Duke University",
      "Syracuse University",
      "Northeastern University",
      "Arizona State University",
      "University of Arizona",
      "Washington State University",
      "Indiana State University",
      "Southeast Missouri State University",
      "University of Cincinnati",
      "Medical University of South Carolina",
    ],
  },
  {
    country: "United Kingdom",
    count: "80+",
    more: "+68 more",
    named: [
      "Queen Mary University of London",
      "University of Exeter",
      "University of Glasgow",
      "University of Manchester",
      "University of Bristol",
      "Newcastle University",
      "Cranfield University",
      "Heriot-Watt University",
      "Queen's University Belfast",
      "University of Reading",
      "University of Sussex",
      "Cardiff Metropolitan University",
    ],
  },
  {
    country: "Canada",
    count: "60+",
    more: "+48 more",
    named: [
      "University of Alberta",
      "University of Guelph",
      "University of Victoria",
      "Brock University",
      "Thompson Rivers University",
      "Wilfrid Laurier University",
      "University of Windsor",
      "Sheridan College",
      "Centennial College",
      "Langara College",
      "Douglas College",
      "University Canada West",
    ],
  },
  {
    country: "Australia",
    count: "45+",
    more: "+34 more",
    named: [
      "Monash University",
      "University of Sydney",
      "University of Queensland",
      "Macquarie University",
      "RMIT University",
      "Deakin University",
      "Griffith University",
      "Swinburne University of Technology",
      "University of Western Australia",
      "Victoria University, Melbourne",
      "Western Sydney University",
    ],
  },
  {
    country: "Germany",
    count: "30+",
    more: "+25 more",
    named: [
      "Munich Business School",
      "Constructor University",
      "EBS University",
      "GISMA Business School",
      "ISM International School of Management",
    ],
  },
  {
    country: "New Zealand",
    count: "30+",
    more: "+21 more",
    named: [
      "University of Auckland",
      "University of Otago",
      "Victoria University of Wellington",
      "University of Canterbury",
      "Massey University",
      "University of Waikato",
      "Lincoln University",
      "Auckland University of Technology",
      "Western Institute of Technology at Taranaki",
    ],
  },
  {
    country: "Ireland",
    count: "20+",
    more: "+15 more",
    named: [
      "University College Dublin",
      "Dublin City University",
      "University of Limerick",
      "Maynooth University",
      "National College of Ireland",
    ],
  },
  {
    country: "Singapore",
    count: "7",
    more: "+3 more",
    named: [
      "Nanyang Institute of Management",
      "Kaplan Higher Education Singapore",
      "PSB Academy",
      "SP Jain School of Global Management",
    ],
  },
];

const NAMED_TOTAL = REGISTER.reduce((sum, entry) => sum + entry.named.length, 0);

/**
 * A repeat footnote marker.
 *
 * `<Footnote>` stamps `id="fnref-…"` on its anchor, which is correct exactly
 * once per page. The register cites note 3 nine times, so it uses this marker
 * instead: identical type, identical target, no duplicated element id. The
 * canonical back-link anchor stays with `colophon-strip` / `colophon`.
 */
function SourceMark({ id }: { id: SourceId }) {
  const source = getSource(id);
  const n = sourceNumber(id);
  return (
    <sup className="align-super leading-none">
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

/** One headline figure. Mono, server-rendered at its final value. */
function Figure({
  value,
  label,
  sourceId,
}: {
  value: string;
  label: string;
  sourceId?: SourceId;
}) {
  return (
    <p className="flex items-baseline gap-3">
      <span data-figure className="font-mono text-figure text-ink">
        {value}
        {sourceId ? <SourceMark id={sourceId} /> : null}
      </span>
      <span className="font-ui text-label uppercase text-ink-muted">
        {label}
      </span>
    </p>
  );
}

export default function Register() {
  return (
    <section
      id="register"
      data-chapter="explore"
      aria-labelledby="register-h2"
      className="scroll-mt-24 bg-paper-laid py-section-y"
    >
      <Container>
        {/* --- Chapter opener ------------------------------------------------
            Headline left, deck right from 1280px. Same copy, same type; the
            opener stops being four stacked paragraphs and starts being a
            masthead. */}
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-grid-gap">
          <SectionHeading
            id="register-h2"
            chapter="II"
            chapterName="EXPLORE"
            eyebrow="The register of partner institutions"
          >
            700+ partner universities for study abroad
          </SectionHeading>

          <p className="mt-6 max-w-deck font-display text-deck text-ink-muted lg:mt-0">
            Seven hundred-plus formal partner agreements across fifteen
            destinations. Sixty-eight of the institutions on the other side of
            them are named here, with the published count for each country.
          </p>
        </div>

        {/* --- The headline figures, and why the register is set as type -----
            Server-rendered at their final values; the note sits alongside
            rather than beneath. */}
        <Reveal className="mt-8 flex flex-col gap-6 border-t border-rule-strong pt-6 lg:flex-row lg:items-baseline lg:justify-between lg:gap-12">
          <div className="flex flex-wrap items-baseline gap-x-10 gap-y-4">
            <Figure
              value="700+"
              label="Partner universities"
              sourceId="partner-universities"
            />
            <Figure value="15" label="Destinations" sourceId="destinations" />
            <Figure value={String(NAMED_TOTAL)} label="Named below" />
          </div>

          <p className="max-w-prose font-ui text-body-sm text-ink-muted lg:max-w-[44ch]">
            Set as type, not as crests. A name states a partner agreement, which
            is what it is; a greyscale logo implies more.
          </p>
        </Reveal>

        {/* --- The banner plate ----------------------------------------------
            One wide photograph, keylined and captioned like every other plate
            in the system. Lazy — it is well below the fold and is never the
            LCP element. `fill` + a locked box means zero layout shift. */}
        <figure className="m-0 mt-8">
          <div className="relative aspect-[16/9] max-h-[420px] w-full overflow-hidden rounded-1 border border-rule-strong bg-paper-tracing">
            <Image
              src="/images/plates/campus-library.jpg"
              alt="A university campus library reading room."
              fill
              loading="lazy"
              sizes="(min-width: 1280px) 1085px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 font-mono text-caption uppercase text-ink-muted tabular-figures">
            The register · 700+ partner institutions on record
          </figcaption>
        </figure>

        {/* --- The register proper -------------------------------------------
            Four columns of country blocks at >=1280px, three at 1024px, two at
            768px. Country name and its published count share one line; the
            named institutions run beneath in a tight column; the remainder is
            stated in mono. Nothing is hidden and nothing is truncated. */}
        <ul className="mt-8 grid list-none grid-cols-1 gap-x-grid-gap gap-y-8 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {REGISTER.map((entry, index) => (
            <Reveal
              key={entry.country}
              as="li"
              delay={Math.min(index, 5) * STAGGER.tight}
              className="flex flex-col border-t border-rule-strong pt-3"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-ui text-h4 text-ink">{entry.country}</h3>
                <span
                  data-figure
                  className="font-mono text-data text-marine tabular-figures"
                >
                  {entry.count}
                  <SourceMark id="partner-universities" />
                  <span className="sr-only"> partner universities</span>
                </span>
              </div>

              <ul className="m-0 mt-2 flex list-none flex-col p-0">
                {entry.named.map((institution) => (
                  <li
                    key={institution}
                    className="font-ui text-body-sm leading-snug text-ink"
                  >
                    {institution}
                  </li>
                ))}
              </ul>

              <p className="mt-2 font-mono text-caption uppercase text-ink-muted tabular-figures">
                {entry.more}
              </p>
            </Reveal>
          ))}
        </ul>

        {/* --- The honest reconciliation -------------------------------------
            422 counted at the published minimum against a 700+ headline. The
            gap is stated, not smoothed over. */}
        <footer className="mt-8">
          <Rule weight="chapter" />
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <p className="max-w-prose font-ui text-body text-ink-muted">
              Eight countries,{" "}
              <span className="font-mono tabular-figures">422</span> agreements
              counted at the published minimum. The balance of the{" "}
              <span className="font-mono tabular-figures">700+</span> sits
              across Dubai, Europe, France, Italy, Malaysia, Spain and
              Switzerland, and is not yet broken out by country. Partner counts
              last verified{" "}
              <span className="font-mono tabular-figures">Aug 2026</span>.
            </p>
            <p className="shrink-0">
              <a
                href="#"
                className="inline-flex min-h-12 w-fit items-center gap-2 rounded-0 font-ui text-body font-semibold text-ink underline decoration-rule-strong decoration-1 underline-offset-[0.3em] transition-colors duration-200 ease-quad hover:decoration-2 hover:decoration-sienna"
              >
                See the full list
                <Icon as={ArrowRight} size="sm" />
              </a>
            </p>
          </div>
          <FootnoteDetails id="partner-universities" className="mt-4" />
        </footer>
      </Container>
    </section>
  );
}
