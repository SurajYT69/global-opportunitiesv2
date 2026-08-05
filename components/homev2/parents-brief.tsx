import Image from "next/image";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { DualClock } from "@/app/(home)/_components/for-parents/dual-clock";

/* ===========================================================================
   home · FOR PARENTS (BRIEF)
   ---------------------------------------------------------------------------
   The condensed parents block. Deck, the dual clock, and a link to the full
   page.

   WHY THIS SURVIVED THE SPLIT. The homepage was cut to six sections, and this
   was the one addition to that list. The audience is Indian students AND their
   parents; the conversion is a decision a parent signs off. Six sections
   addressed only to a nineteen-year-old would have removed the half of the
   audience that pays, so the position is held here at a fraction of the
   height and the argument itself moves to `/for-parents`.

   `DualClock` is IMPORTED from the full section, not copied. It is the one
   part of the 524-line original that reads as a complete thought on its own —
   the time in India against the time where your child will be — and it needs
   no surrounding argument to land.

   SERVER COMPONENT. `DualClock` owns whatever client behaviour it has.
   ======================================================================== */

export default function ParentsBrief() {
  return (
    <section
      id="for-parents"
      data-chapter="trust"
      aria-labelledby="for-parents-h2"
      className="scroll-mt-24 bg-endpaper py-section-y"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-x-grid-gap gap-y-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading
              id="for-parents-h2"
              tone="dark"
              eyebrow="For the person who pays"
              deck="The seven questions parents actually put to us — money, safety, whether the degree counts at home, and who we answer to. Nothing here promises a visa or an admission."
            >
              A page written for you, not for your child.
            </SectionHeading>

            <p className="mt-8 max-w-serif font-display text-serif-body opsz-16 text-plate-white">
              Most of this site is written for someone who is nineteen and
              impatient. This page is not. You are the one signing the loan,
              and you are owed plain answers first.
            </p>

            {/* The block's one CTA. `secondary` is a --marine outline, which
                is invisible on --endpaper, so the plate tokens come in through
                className. Not a new variant: this is the only navy block on
                the page and one override is smaller than one more variant. */}
            <div className="mt-8">
              <Button
                href="/for-parents"
                variant="secondary"
                className="border-plate-grey/70 text-plate-white hover:bg-white hover:text-endpaper"
              >
                All seven questions, answered
              </Button>
            </div>

            {/* The clock sits UNDER the argument, not opposite it. The block's
                one image is the photograph; giving the clock the facing column
                as well would put two focal points in a block whose whole job
                is to alternate against the one above it. */}
            <div className="mt-10">
              <DualClock />
            </div>
          </div>

          {/* Image RIGHT — the flip against beyond-the-offer above, which puts
              its plate on the left. `kitchen-table.jpg` is the photograph the
              full section uses on /for-parents; the same picture on both is
              deliberate continuity, not an oversight. */}
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-1 border border-plate-rule bg-endpaper-2 lg:sticky lg:top-28">
            <Image
              src="/images/plates/kitchen-table.jpg"
              alt="A family talking across a kitchen table."
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
