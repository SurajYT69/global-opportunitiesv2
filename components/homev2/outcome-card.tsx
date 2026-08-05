import Image from "next/image";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { OUTCOMES } from "@/app/(home)/_components/endpaper/data";

/* ===========================================================================
   home · ONE STUDENT OUTCOME
   ---------------------------------------------------------------------------
   A single case-study card. One, not two, and not the six-card endpaper.

   THE DATA IS NOT NEW. It is `OUTCOMES[0]` from the endpaper's own file —
   same name, same programme, same quote, same source URL, same last-verified
   date. Nothing is invented here and no testimonial is written; if this card
   is wrong, it is wrong in `endpaper/data.ts` and should be fixed there.

   THE SOURCE LINE IS NOT DECORATION. Every quoted student on this site
   resolves to a published page with a date on it, because an unattributed
   testimonial is exactly the kind of claim the ads review removed elsewhere.
   The link is external and says so.

   The full set moves to `/student-stories` when that page is written; until
   then the exit link points at the enquiry form rather than at a route that
   does not exist. A dead link is worse than no link.

   SERVER COMPONENT, zero JavaScript.
   ======================================================================== */

const OUTCOME = OUTCOMES[0];

export default function OutcomeCard() {
  return (
    <section
      id="outcome"
      data-chapter="trust"
      aria-labelledby="outcome-h2"
      className="scroll-mt-24 bg-paper py-section-y"
    >
      <Container>
        <SectionHeading
          id="outcome-h2"
          chapter="V"
          chapterName="TRUST"
          eyebrow="OUTCOMES"
        >
          One student, in their own words.
        </SectionHeading>

        {/* PHOTOGRAPH LEFT, TEXT RIGHT — the third flip in the body's
            alternation: plate left (beyond the offer), plate right (parents,
            now the navy band), plate left again here.

            The panel was briefly filled navy, when this was the page's only
            dark ground. It is not any more — for-parents took that role in the
            Aug 2026 visual pass — and two navy blocks two sections apart is
            the adjacency the ground rules rule out. White panel, keyline
            border, quote carries it. */}
        <figure className="m-0 mt-10 grid grid-cols-1 overflow-hidden rounded-1 border border-rule-strong lg:grid-cols-2">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src="/images/plates/resource-study.jpg"
              alt=""
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center bg-paper p-8 md:p-10">
            <blockquote className="m-0">
              <p className="font-display text-serif-body opsz-16 text-ink">
                &ldquo;{OUTCOME.quote}&rdquo;
              </p>
            </blockquote>

            <figcaption className="mt-8 border-t border-rule pt-6">
              <p className="font-ui text-h4 text-ink">{OUTCOME.name}</p>
              <p className="mt-1 font-ui text-body-sm text-ink-muted">
                {OUTCOME.programme} &middot; {OUTCOME.place} &middot; counsellor{" "}
                {OUTCOME.counsellor}
              </p>

              <p className="mt-4 font-mono text-caption uppercase text-ink-muted tabular-figures">
                <a
                  href={OUTCOME.href}
                  rel="nofollow noopener"
                  target="_blank"
                  className="text-sienna-press no-underline hover:underline"
                >
                  {OUTCOME.source}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>{" "}
                &middot; verified {OUTCOME.lastVerified}
              </p>
            </figcaption>
          </div>
        </figure>

        {/* The block's one CTA, matching the skeleton of the two above. */}
        <div className="mt-10">
          <Button href="/#enquiry" variant="secondary">
            Ask about a profile like this one
          </Button>
        </div>
      </Container>
    </section>
  );
}
