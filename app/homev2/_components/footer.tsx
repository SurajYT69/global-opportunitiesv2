import { Container } from "@/components/ui/container";
import { FootnoteList } from "@/components/ui/footnote";
import {
  CITY_COUNT,
  CITY_NAMES,
  NATIONAL_LINE,
  TOLL_FREE_LINE,
} from "@/app/(home)/_components/branch-atlas/branches";

/* ===========================================================================
   FOOTER — minimal, but the sources table stays
   ---------------------------------------------------------------------------
   The canon colophon is 481 lines: contact points, hours, eighteen branch
   numbers, a contents index, accreditations, and the Sources & Methods table.
   Most of that is furniture on a page this short. What is NOT optional is the
   sources table — every footnote marker in the proof strip and the offices
   heading resolves into it, and a 404ing footnote does more damage than no
   footnote at all.

   `<FootnoteList />` IS the sources surface. It renders every registered
   source in marker order, each `<li>` carrying the `fn-*` id the markers point
   at and a back-link to the `fnref-*` anchor. The plan called for extracting
   the colophon's <table> into a shared component; that turned out to be
   unnecessary — this primitive already existed and does the job.

   It has a second advantage. The colophon's table prints `source.claim`, and
   those strings are written ALL-CAPS in the registry (Known issue #2 in
   CLAUDE.md: literal caps that CSS cannot reach). FootnoteList prints `note`
   and `origin` instead, so nothing shouts and no copy edit is needed.

   Server Component. Zero JavaScript.
   ======================================================================== */

export default function Footer() {
  return (
    <footer className="bg-background py-section-y">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <h2 className="text-h4 text-ink">Global Opportunities</h2>
            <p className="text-body-sm text-muted-foreground">
              Global Opportunities Private Limited. Overseas education
              consultants since 2001. Registered office in New Delhi.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-caption text-muted-foreground">
              Contact
            </h3>
            {/* Numbers stay visible TEXT and stay mono — they are verified
                fact, and the mono law carries that, not a different colour. */}
            <ul className="flex list-none flex-col gap-2 p-0">
              <li className="font-mono text-body-sm tabular-figures">
                <a href={TOLL_FREE_LINE.href} className="text-ink no-underline hover:underline">
                  {TOLL_FREE_LINE.display}
                </a>
                <span className="text-muted-foreground"> · toll-free</span>
              </li>
              <li className="font-mono text-body-sm tabular-figures">
                <a href={NATIONAL_LINE.href} className="text-ink no-underline hover:underline">
                  {NATIONAL_LINE.display}
                </a>
              </li>
              <li className="font-mono text-body-sm text-muted-foreground tabular-figures">
                9 AM – 9 PM IST. We do not call between 9 PM and 9 AM.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-caption text-muted-foreground">
              {`Offices · ${CITY_COUNT} cities`}
            </h3>
            <p className="text-body-sm text-muted-foreground">
              {CITY_NAMES.join(" · ")}
            </p>
          </div>
        </div>

        {/* --- the audit surface ------------------------------------------ */}
        <section
          aria-labelledby="sources-heading"
          className="flex flex-col gap-4 rounded-2 bg-muted p-6 md:p-8"
        >
          <h3 id="sources-heading" className="text-h4 text-ink">
            Sources and last verified
          </h3>
          <p className="max-w-prose text-body-sm text-muted-foreground">
            Every figure on this page carries a superscript that resolves here,
            with where it came from and when it was last checked. Where Global
            Opportunities publishes no figure, this page prints an em-dash — never
            a zero and never a placeholder.
          </p>
          {/* SCOPED to the sources this page cites. FootnoteList defaults to
              the whole registry, which would print note 6 (testimonials) with
              no marker anywhere on the page pointing at it — a dangling row in
              an audit surface is worse than a shorter table. Add an id here in
              the same commit as any new <Footnote> on this route. */}
          <FootnoteList
            className="max-w-prose"
            ids={[
              "founded",
              "students-placed",
              "partner-universities",
              "destinations",
              "offices",
            ]}
          />
        </section>

        <p className="text-footnote text-muted-foreground">
          Nothing on this page is a quotation, and none of it is a promise about
          a visa or an admission. Visa decisions belong to governments.
        </p>
      </Container>
    </footer>
  );
}
