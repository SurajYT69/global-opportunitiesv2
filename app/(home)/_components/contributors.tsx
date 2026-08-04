import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Footnote, FootnoteDetails } from "@/components/ui/footnote";
import { Icon } from "@/components/ui/icon";
import { Rule } from "@/components/ui/rule";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContributorsClient } from "./contributors/contributors-client";
import { CITED_COUNSELLORS, COUNSELLORS } from "./contributors/counsellors";

/* ===========================================================================
   9 · CONTRIBUTORS — "The Contributors' Page"
   Chapter III TRUST · surface --paper (canon section table, row 9)

   Counsellors typeset the way an atlas typesets its contributors: a plate, a
   name in the editorial face, and one mono credential line. Named, credentialed
   humans is one of the eight unclaimed positions in this category — GO already
   has named counsellors in its own testimonials and nobody in the Indian mass
   market surfaces them.

   Motion ownership (canon): Motion owns the card -> drawer shared-element
   morph (`layoutId`). `tel:` and `wa.me` inside the drawer are real anchors
   that work with JavaScript disabled.
   ======================================================================== */

export function Contributors() {
  return (
    <section
      id="contributors"
      data-chapter="trust"
      className="scroll-mt-28 bg-paper py-section-y"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading
          chapter="III"
          chapterName="TRUST"
          eyebrow="THE COUNSELLORS"
          deck="Six counsellors, named, with the desk they sit at and the countries they handle. Ask for one of them when you call."
        >
          You do not book a service. You book a person.
        </SectionHeading>

        {/* ---------------------------------------------------------------
            THE OPENING PLATE — the desk itself, before the six people who
            sit at one. Held to 30rem so the cartouche grid below stays the
            focus of the chapter. Locked 3:2 box, lazy, keyline +
            registration offset + mono caption, exactly as <Plate> sets them.
            ------------------------------------------------------------ */}
        <figure className="m-0 flex w-full max-w-[30rem] flex-col">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-1 border border-rule-strong bg-paper-tracing shadow-reg-marine">
            <Image
              src="/images/plates/counsellor-desk.jpg"
              alt="A counsellor's desk at a Global Opportunities branch — student files stacked beside a desk phone and an open notebook."
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 font-mono text-caption uppercase text-ink-muted tabular-figures">
            THE DESK · FILES, PHONE, AND A NAME YOU&rsquo;LL KNOW
          </figcaption>
        </figure>

        <div className="flex flex-col gap-3">
          {/* The badge is the same glyph the three cited cards carry below, so
              the count and the cards read as one claim. Inline, not a flex row:
              the <Footnote> marker is superscript and must stay in the text
              flow. `data-figure` stays exactly where it was; globals.css keys
              the tabular-figure rule to it and animation selects on it. */}
          <p
            data-figure
            className="font-mono text-data uppercase text-ink tabular-figures"
          >
            <Icon as={BadgeCheck} size="sm" className="mr-2 align-text-bottom" />
            {`${CITED_COUNSELLORS} OF THESE ${COUNSELLORS.length} COUNSELLORS ARE NAMED BY A STUDENT IN A PUBLISHED TESTIMONIAL`}
            <Footnote id="testimonials" />
          </p>
          <FootnoteDetails id="testimonials" />
        </div>

        <Rule weight="chapter" />

        <ContributorsClient />

        <Rule weight="hairline" />

        <p className="max-w-prose font-display text-footnote text-ink-muted">
          Every name on this page is published by Global Opportunities in its
          own student testimonials. Desk, destinations handled and years shown
          are representative of a counsellor&rsquo;s current allocation, and
          allocations change — ask for the counsellor by name when you call, and
          we will tell you who is on the file today. No per-counsellor placement
          count is published, so none is printed here.
        </p>
      </Container>
    </section>
  );
}

export default Contributors;
