import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Rule } from "@/components/ui/rule";
import { Icon } from "@/components/ui/icon";
import { INDEX_DESTINATIONS } from "@/components/sections/gazetteer/data";

/* ===========================================================================
   /destinations — PLACEHOLDER
   ---------------------------------------------------------------------------
   The landing page's gazetteer now shows only the four anchors; the other
   eleven destinations belong here. This is a deliberate placeholder until the
   full index page (ruled rows, micro-spreads, plates) is built out — the row
   component already exists at `components/sections/gazetteer/rows.tsx` and
   moves here when that happens.

   noindex while placeholder: a page of names with no facts should not be what
   a search engine serves for "GO destinations".
   ======================================================================== */

export const metadata: Metadata = {
  title: "Destinations | Global Opportunities",
  description:
    "The full index of GO's fifteen study destinations. Page in preparation.",
  robots: { index: false, follow: true },
};

export default function DestinationsPage() {
  return (
    <main id="main" className="min-h-dvh bg-paper py-section-y">
      <Container>
        <Link
          href="/#gazetteer"
          className="inline-flex min-h-12 w-fit items-center gap-2 rounded-0 font-ui text-body-sm text-ink-muted underline decoration-rule-strong decoration-1 underline-offset-[0.3em] transition-colors duration-200 ease-quad hover:decoration-sienna hover:text-ink"
        >
          <Icon as={ArrowLeft} size="sm" />
          Back to the four anchors
        </Link>

        <SectionHeading
          id="destinations-h1"
          as="h2"
          chapter="II"
          chapterName="EXPLORE"
          eyebrow="Eleven more destinations"
          deck="This page is in preparation. The full index — intakes, tuition bands, work rights and partner counts on the same four axes — arrives here; for now, these are the eleven it will cover."
          className="mt-10"
        >
          The rest of the index.
        </SectionHeading>

        <Rule weight="chapter" className="mt-10" />

        <ul className="mt-8 list-none columns-1 p-0 sm:columns-2 lg:columns-3">
          {INDEX_DESTINATIONS.map(({ destination }) => (
            <li
              key={destination.slug}
              className="border-b border-rule py-4 break-inside-avoid"
            >
              <span className="font-ui text-h4 text-ink">
                {destination.name}
              </span>
              <span className="mt-1 block font-mono text-mono-label uppercase text-ink-muted">
                {destination.city} · {destination.utc}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-prose font-ui text-body-sm text-ink-muted">
          Until this page is ready, a GO counsellor can answer for any of the
          eleven —{" "}
          <Link
            href="/#enquiry"
            className="text-ink underline decoration-rule-strong decoration-1 underline-offset-[0.3em] hover:decoration-sienna"
          >
            book a session from the main page
            {/* Inline in a sentence, so the glyph is nudged onto the x-height
                rather than flexed — the full stop still follows the link. */}
            <Icon as={ArrowRight} size="sm" className="ml-1 align-[-0.15em]" />
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
