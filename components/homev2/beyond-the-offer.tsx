import Image from "next/image";
import { Banknote, HeartPulse, Landmark, Wallet } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { STAGGER } from "@/lib/motion";
import { Reveal } from "@/app/(home)/_components/register/reveal";

/* ===========================================================================
   homev2 · BEYOND THE OFFER LETTER
   ---------------------------------------------------------------------------
   Plate left, text right, cream ground. The one section on the page arguing
   from what happens AFTER the acceptance, because that is where the category
   usually stops and where a departure actually gets blocked.

   Four items, named as what they are. No claim about outcomes, no promise
   about approval — the compliance kill-list governs this section as hard as
   any other, and "handled in-house" is a statement about who does the work,
   not about what the bank or the insurer decides.

   THE YELLOW CHIP is the only ochre in this file and the only one this
   section is allowed. It reads NO FEE — three characters of fact, in mono,
   inline with the sentence it qualifies rather than floating beside it.
   (`what-we-do.tsx` already carries a "Free from GO" ochre chip on the navy
   band; that one predates this file and belongs to a section this build does
   not touch.)

   SERVER COMPONENT. `Reveal` is imported, not reimplemented. Zero
   ScrollTrigger.
   ======================================================================== */

const BLOCKERS = [
  {
    glyph: Banknote,
    title: "Education loan",
    blurb:
      "Collateral and non-collateral, with the sanction letter timed to the university deadline rather than to the bank's.",
  },
  {
    glyph: Wallet,
    title: "Forex",
    blurb:
      "The transfer itself, at the telegraphic rate, with the A2 form completed before you reach the counter.",
  },
  {
    glyph: Landmark,
    title: "GIC account",
    blurb:
      "The Guaranteed Investment Certificate a Canadian study permit asks for, opened before the file is filed.",
  },
  {
    glyph: HeartPulse,
    title: "Medical insurance",
    blurb:
      "The cover the destination requires, bought against its published minimum and not above it.",
  },
] as const;

export default function BeyondTheOffer() {
  return (
    <section
      id="beyond-the-offer"
      data-chapter="trust"
      aria-labelledby="beyond-the-offer-h2"
      className="scroll-mt-24 bg-paper-tracing py-section-y"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-x-grid-gap gap-y-10 lg:grid-cols-2">
          {/* --- The plate ------------------------------------------------
              Papers and a pen, not a passport and not a suitcase. The two
              obvious pictures for this section are both on the banned list. */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-1 border border-rule-strong bg-paper-tracing">
              <Image
                src="/images/plates/beyond-offer-papers.jpg"
                alt="Hands spreading financial documents across a desk with a pen."
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 font-mono text-caption uppercase text-ink-muted tabular-figures">
              The four things that actually delay a departure
            </p>
          </Reveal>

          <Reveal>
            <SectionHeading id="beyond-the-offer-h2" eyebrow="AFTER THE ACCEPTANCE">
              Most consultants stop at the offer letter.
            </SectionHeading>

            <p className="mt-6 max-w-prose font-ui text-body text-ink">
              The offer is the part that feels like the end. It is not. Four
              things stand between an acceptance and a boarding pass, all four
              run on their own timetables, and all four are handled here rather
              than passed to someone you then have to chase.{" "}
              <span className="inline-flex items-center rounded-2 bg-ochre px-2 py-1 align-middle font-mono text-caption uppercase text-endpaper tabular-figures">
                No fee
              </span>{" "}
              for any of it — where a bank, an insurer or a government charges,
              you pay them directly and we add nothing.
            </p>

            <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-0 p-0 border-t border-rule">
              {BLOCKERS.map((item, index) => (
                <Reveal
                  key={item.title}
                  as="li"
                  delay={index * STAGGER.tight}
                  className="flex gap-4 border-b border-rule py-4"
                >
                  {/* Decorative: the title beside it names the item. */}
                  <Icon
                    as={item.glyph}
                    size="md"
                    className="mt-0.5 shrink-0 text-marine"
                  />
                  <div className="min-w-0">
                    <h4 className="font-ui text-h4 text-ink">{item.title}</h4>
                    <p className="mt-1 max-w-prose font-ui text-body-sm text-ink-muted">
                      {item.blurb}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>

            {/* The block's one CTA. Secondary, not primary — red is the
                enquiry form's alone, and this is an exit link into depth. */}
            <div className="mt-8">
              <Button href="/services" variant="secondary">
                All fifteen services
              </Button>
            </div>

            <p className="mt-6 max-w-prose font-mono text-caption uppercase text-ink-muted tabular-figures">
              No admission is guaranteed and no visa outcome is promised. Loan,
              insurance and permit decisions rest with the lender, the insurer
              and the destination.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
