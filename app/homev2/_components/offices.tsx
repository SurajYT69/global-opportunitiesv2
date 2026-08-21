import { Container } from "@/components/ui/container";
import { Footnote } from "@/components/ui/footnote";
import { AtlasClient } from "@/app/(home)/_components/branch-atlas/atlas-client";
import {
  BRANCH_COUNT,
  CITY_COUNT,
  STATE_COUNT,
  TOLL_FREE_LINE,
} from "@/app/(home)/_components/branch-atlas/branches";

/* ===========================================================================
   OFFICES — the India plate, kept
   ---------------------------------------------------------------------------
   Kept at the client's explicit instruction when the rest of the body was cut.
   It earns it: "18 offices" is an abstract claim, and a map with a crosshair
   on your own city is a door you can walk through.

   <AtlasClient /> IS IMPORTED UNCHANGED. It owns the Anime.js stroke draw, the
   crosshair stagger and the Framer drawer. Only the chrome around it is new —
   the canon section wrapped it in a chapter number, an eyebrow, a deck, two
   drawn Rules and a mono stat line.

   DO NOT TOUCH `data-atlas-outline` / `data-atlas-mark` / `data-atlas-key`
   anywhere inside that component. They are the animation's selectors and
   renaming one breaks the draw SILENTLY.

   The plate keeps its crosshairs and gains no Lucide glyph inside the <svg>:
   drafted marks are structure, not decoration, and the icon adoption did not
   retire them.

   Note the count discrepancy worth knowing about: global-opportunities.net
   currently says "20+ offices", but its own branch selector lists eighteen.
   Eighteen is the number we can name and address, so eighteen is what we
   print — see the footnote.
   ======================================================================== */

export default function Offices() {
  return (
    <section
      id="offices"
      data-chapter="trust"
      className="scroll-mt-20 bg-secondary py-section-y"
    >
      <Container className="flex flex-col gap-10">
        <header className="flex max-w-prose flex-col gap-3">
          <p className="text-caption text-muted-foreground">
            Offices
          </p>
          <h2 className="text-d2 text-ink">
            {`${BRANCH_COUNT} offices across India`}
            <Footnote id="offices" />
          </h2>
          <p className="text-body text-muted-foreground">
            {`${BRANCH_COUNT} branches in ${CITY_COUNT} cities, across ${STATE_COUNT} states and union territories. Each one has an address, a number, and a door that opens tomorrow at eleven. Tap a marker for the branch.`}
          </p>
        </header>

        {/* THE WRAPPER IS THE FIX FOR MOBILE HORIZONTAL SCROLL.

            AtlasClient's inner column is `max-w-[26rem]` (416px) and does not
            shrink below it, so at 360px it runs 13px past the viewport and the
            whole DOCUMENT scrolls sideways — measured on `/`, where the same
            component overflows by 106px because more of the old page does it
            too. Wide content is allowed to scroll, but only inside its own
            box; the page body must never scroll horizontally.

            Scoped here rather than fixed inside AtlasClient because that
            component is shared with `/` and this route is not authorised to
            change how `/` renders. The same wrapper would fix `/` — raised in
            the handover. */}
        <div className="-mx-gutter overflow-x-auto px-gutter">
          <AtlasClient />
        </div>

        <div className="flex max-w-prose flex-col gap-2">
          <p className="text-footnote text-muted-foreground">
            Branch names are Global Opportunities&rsquo; own published list. We
            print a street address only where the company publishes one, and a
            direct line only where the company publishes one — every other
            branch is reachable on the national line, and the drawer says so.
          </p>
          <p className="font-mono text-caption text-muted-foreground tabular-figures">
            {`Toll-free ${TOLL_FREE_LINE.display} · 9 AM – 9 PM IST`}
          </p>
        </div>
      </Container>
    </section>
  );
}
