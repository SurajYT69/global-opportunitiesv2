import { Container } from "@/components/ui/container";
import { Locator } from "./offices/locator";
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
      <Container className="flex flex-col gap-8">
        <header className="flex max-w-prose flex-col gap-3">
          <p className="text-caption text-muted-foreground">
            Offices
          </p>
          <h2 className="text-d2 text-ink">
            {`${BRANCH_COUNT} offices across India`}
          </h2>
          <p className="text-body text-muted-foreground">
            {`${BRANCH_COUNT} branches in ${CITY_COUNT} cities, across ${STATE_COUNT} states and union territories. Each one has an address, a number, and a door that opens tomorrow at eleven. Tap a marker, or a row, for the branch.`}
          </p>
        </header>

        {/* <Locator/> REPLACES <AtlasClient/> ON THIS ROUTE ONLY (2026-08-21).

            AtlasClient is a single copy that `/` also imports, and CLAUDE.md
            allows a second LAYOUT its own directory but forbids a variant flag
            inside a shared component. So `/` keeps its crosshair plate and
            this route gets app/homev2/_components/offices/. The data — the
            outline, the station register, the drawer — is still imported from
            the shared files and is NOT duplicated.

            The old `-mx-gutter overflow-x-auto px-gutter` wrapper is gone with
            it. It existed because AtlasClient's index column is a hard
            `max-w-[26rem]` that will not shrink, which pushed the document
            13px sideways at 360px. The locator's index is `w-full` with the
            cap applied only from lg, so it shrinks and there is nothing left
            to scroll. */}
        <Locator />

        <div className="flex max-w-prose flex-col gap-2">
          <p className="text-footnote text-muted-foreground">
            Branch names are Global Opportunities&rsquo; own published list. We
            print a street address only where the company publishes one, and a
            direct line only where the company publishes one. Every other
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
