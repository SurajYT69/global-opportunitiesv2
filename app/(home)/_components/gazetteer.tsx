import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Rule } from "@/components/ui/rule";
import { FootnoteDetails } from "@/components/ui/footnote";
import { Icon } from "@/components/ui/icon";
import { AnchorCards } from "./gazetteer/cards";

/* ===========================================================================
   4 · gazetteer — THE GAZETTEER
   ---------------------------------------------------------------------------
   Chapter II EXPLORE · surface --paper · motion owner: Motion · zero ScrollTrigger.

   The gazetteer replaces the category's flag grid with an index you read.
   On this page, ONLY the four anchors render:

   THE FOUR ANCHORS — UK, USA, Canada, Australia — as a 2x2 photographic
   bento. These carry the traffic and the partnerships, and an all-text list
   gave a first-time visitor nothing to look at. Each card is a plate: keyline
   frame, registration offset, mono caption strip, three verified facts and
   one link into the form.

   THE OTHER ELEVEN moved to `/destinations` — a placeholder page for now.
   This section closes with a link there instead of the ruled index rows; the
   rows component (`./gazetteer/rows`) is kept for that page's full build-out.

   What is still banned: flags, globes, aircraft, passports, cap-tosses, and
   fifteen identical tiles with "Explore →" on them. Four photographs where the
   decision actually gets made is not a tile grid.

   This file is a Server Component, and so are the cards: the entire index,
   including every figure, every caption and every destination name, exists in
   the server HTML. Only the row disclosure behaviour is client-side.
   ======================================================================== */

export default function Gazetteer() {
  return (
    <section
      id="gazetteer"
      data-chapter="explore"
      aria-labelledby="gazetteer-h2"
      className="scroll-mt-24 bg-paper py-section-y"
    >
      <Container>
        <SectionHeading
          id="gazetteer-h2"
          chapter="II"
          chapterName="EXPLORE"
          eyebrow="The four anchor destinations"
          deck="The four countries that carry most of GO's traffic and partnerships, four facts each, on the same four axes. The partner counts are ours; the intakes, tuition bands and work rights are the destination's own."
        >
          Four places, up close.
        </SectionHeading>

        <Rule weight="chapter" className="mt-10" />

        <div className="mt-12">
          <AnchorCards />
        </div>

        {/* The other eleven destinations live on their own page. Placeholder
            destination for now — the full index page is in preparation. */}
        <div className="mt-16 flex flex-col gap-3 border-t border-rule-strong pt-8">
          <p className="font-mono text-mono-label uppercase text-ink-muted">
            Eleven more destinations
          </p>
          <p className="max-w-prose font-ui text-body text-ink-muted">
            Dubai, Europe, France, Germany, Ireland, Italy, Malaysia, New
            Zealand, Singapore, Spain and Switzerland have an index page of
            their own.
          </p>
          <Link
            href="/destinations"
            className="inline-flex min-h-12 w-fit items-center gap-2 rounded-0 font-ui text-body font-semibold text-ink underline decoration-rule-strong decoration-1 underline-offset-[0.3em] transition-colors duration-200 ease-quad hover:decoration-2 hover:decoration-sienna"
          >
            See the other eleven destinations
            <Icon as={ArrowRight} size="sm" />
          </Link>
        </div>

        <footer className="mt-8 flex flex-col gap-3">
          <p className="max-w-prose font-ui text-body-sm text-ink-muted">
            Partner counts last verified{" "}
            <span className="font-mono tabular-figures">Aug 2026</span>. Intake
            windows, tuition bands and work rights are the destination&rsquo;s
            own published figures; each carries its source and date in the sources
            table at the foot of this page.
          </p>
          <FootnoteDetails id="partner-universities" className="mt-1" />
        </footer>
      </Container>
    </section>
  );
}
