import { Building2, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Footnote, FootnoteDetails } from "@/components/ui/footnote";
import { Icon } from "@/components/ui/icon";
import { Rule } from "@/components/ui/rule";
import { SectionHeading } from "@/components/ui/section-heading";
import { AtlasClient } from "./branch-atlas/atlas-client";
import {
  BRANCH_COUNT,
  CITY_COUNT,
  STATE_COUNT,
  TOLL_FREE_LINE,
} from "./branch-atlas/branches";

/* ===========================================================================
   8 · BRANCH ATLAS — "Eighteen Doors"
   Chapter III TRUST · surface --paper-still (canon section table, row 8)

   The atlas performs its oldest trick: the fold-out map. India draws itself in
   hairline and the offices ink in as crosshairs. Convert an abstract claim
   ("18 offices") into a door a parent can walk through.

   Motion ownership (canon): Anime.js owns the stroke draw and the crosshair
   stagger; Motion owns the drawer. Nothing here loops. Nothing here is pinned.
   ======================================================================== */

export function BranchAtlas() {
  return (
    <section
      id="branch-atlas"
      data-chapter="trust"
      className="scroll-mt-28 bg-paper-still py-section-y"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading
          chapter="III"
          chapterName="TRUST"
          eyebrow="OFFICES YOU CAN WALK INTO"
          deck="Eighteen branches in fifteen cities, across eight states and union territories. Each one has an address, a number, and a door that opens tomorrow at eleven."
        >
          18 offices across India
        </SectionHeading>

        <div className="flex flex-col gap-3">
          {/* The marks stay INLINE on both lines: the stat line carries a
              superscript footnote, and a flex row would tear it off its
              figure. `align-[-0.24em]` sits the glyph on the mono baseline. */}
          <p
            data-figure
            className="font-mono text-data uppercase text-ink tabular-figures"
          >
            <Icon as={Building2} size="sm" className="mr-2 align-[-0.24em]" />
            {`${BRANCH_COUNT} BRANCHES`}
            <Footnote id="offices" />
            <span className="text-ink-muted">
              {` · ${CITY_COUNT} CITIES · ${STATE_COUNT} STATES & UNION TERRITORIES`}
            </span>
          </p>
          <FootnoteDetails id="offices" />
        </div>

        <Rule weight="chapter" />

        <AtlasClient />

        <Rule weight="hairline" />

        <div className="flex flex-col gap-2">
          <p className="max-w-prose font-display text-footnote text-ink-muted">
            Branch names are Global Opportunities&rsquo; own published list. We
            print a street address only where the company publishes one, and a
            direct line only where the company publishes one — every other
            branch is reachable on the national line, and the drawer says so.
          </p>
          <p className="font-mono text-caption uppercase text-ink-muted tabular-figures">
            <Icon as={PhoneCall} size="sm" className="mr-2 align-[-0.24em]" />
            {`TOLL-FREE ${TOLL_FREE_LINE.display} · 9 AM – 9 PM IST`}
          </p>
        </div>
      </Container>
    </section>
  );
}

export default BranchAtlas;
