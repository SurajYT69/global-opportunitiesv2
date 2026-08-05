import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

import { Icon } from "@/components/ui/icon";

import StickyNav from "@/app/(home)/_components/sticky-nav";
import Colophon from "@/app/(home)/_components/colophon";
import MobileBar from "@/app/(home)/_components/mobile-bar";
import { Container } from "@/components/ui/container";
import { Rule } from "@/components/ui/rule";
import {
  allSources,
  footnoteId,
  footnoteRefId,
} from "@/components/ui/footnote";
import { PageHeader, PageFoot } from "@/components/homev2/page-shell";
import Reckoning from "@/app/(home)/_components/reckoning";
import StillPage from "@/app/(home)/_components/still-page";

/* ===========================================================================
   /costs
   ---------------------------------------------------------------------------
   Split off the homepage, Aug 2026. The homepage carried fifteen topics and
   ranked for none of them; this page carries one.

   The section below is RELOCATED, not rewritten — it is the same component
   the homepage rendered, imported unchanged. If it needs editing, edit it
   where it lives.
   ======================================================================== */

export const metadata: Metadata = {
  title: "What studying abroad costs | Global Opportunities",
  description:
    "The cost of studying abroad itemised — tuition bands, deposits, the maintenance figure a visa asks you to show, and what we charge for our part of it.",
  alternates: { canonical: "/costs" },
};

export default function CostsPage() {
  /* One row per registered source. Same call the colophon used to make. */
  const sources = allSources();

  return (
    <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">      <StickyNav />
      <main id="main" className="pt-14 md:pt-16">
        <PageHeader
          eyebrow="THE COST LEDGER"
          deck="Two arguments that belong together: what the whole thing actually costs, and what we take out of it. Both are here because the answer to the second is easier to trust beside the first."
        >
          What it costs, itemised.
        </PageHeader>

        <Reckoning />
        <StillPage />


        {/* ── SOURCES & LAST VERIFIED ─────────────────────────────────────
            Relocated from the colophon (Aug 2026), where it was repeated at
            the foot of every page and was the largest thing on the site.

            It belongs here: this is the page about what things cost and what
            we take, and the audit surface is the same argument. Every
            `Footnote` marker anywhere on the site now targets `/costs#fn-*`,
            so the row ids below are live cross-page anchor targets. Renaming
            or removing one breaks a citation on a page you are not editing. */}
        <section
          id="sources"
          aria-labelledby="costs-sources"
          className="scroll-mt-24 bg-paper py-section-y"
        >
          <Container>
            <Rule weight="chapter" />
            <h2
              id="costs-sources"
              className="mt-10 font-display text-d2 opsz-32 text-ink text-balance"
            >
              Sources &amp; last verified
            </h2>
            <p className="mt-4 max-w-prose font-ui text-body text-ink-muted">
              Every number printed anywhere on this site carries a superscript,
              and every superscript lands in this table. Each entry names where
              the figure came from, who inside Global Opportunities is
              accountable for it, and the month it was last checked.
            </p>
        <table className="mt-6 w-full border-collapse text-left">
          <caption className="sr-only">
            Sources and last-verified dates for every figure on this page
          </caption>
          <thead>
            <tr className="hairline-strong-b">
              <th
                scope="col"
                className="w-8 pb-2 font-ui text-label uppercase text-ink-muted"
              >
                No.
              </th>
              <th
                scope="col"
                className="pb-2 font-ui text-label uppercase text-ink-muted"
              >
                Claim, and where it comes from
              </th>
              <th
                scope="col"
                className="hidden w-32 pb-2 font-ui text-label uppercase text-ink-muted sm:table-cell"
              >
                Last verified
              </th>
            </tr>
          </thead>
          <tbody>
            {sources.map(({ id, n, source }) => (
              <tr key={id} id={footnoteId(id)} className="hairline-b">
                <th
                  scope="row"
                  className="py-4 pr-2 align-top font-mono text-data font-normal tabular-figures"
                >
                  <a
                    href={`#${footnoteRefId(id)}`}
                    aria-label={`Back to reference ${n} in the page`}
                    className="text-sienna-press no-underline hover:underline"
                  >
                    {n}
                  </a>
                </th>
                <td className="py-4 pr-4 align-top">
                  <p className="font-mono text-mono-label uppercase text-ink tabular-figures">
                    {source.claim}
                  </p>
                  <p className="mt-2 max-w-prose font-display text-footnote opsz-8 text-ink-muted">
                    {source.note}
                  </p>
                  <p className="mt-1 font-mono text-caption uppercase text-ink-muted tabular-figures">
                    {source.origin} · owner {source.owner}
                    <span className="sm:hidden">
                      {" "}
                      · verified {source.lastVerified}
                    </span>
                  </p>
                  {source.href && (
                    /* The one place on the page that leaves it. The glyph
                       trails the URL and stays inline — `inline-flex` here
                       would stop a long href from wrapping inside its
                       table cell. */
                    <a
                      href={source.href}
                      rel="noopener"
                      className="mt-1 inline-block font-mono text-caption uppercase text-marine underline decoration-rule-strong decoration-1 underline-offset-4 tabular-figures hover:decoration-sienna"
                    >
                      {source.href}
                      <Icon
                        as={ExternalLink}
                        size="sm"
                        className="ml-1.5 align-middle"
                      />
                    </a>
                  )}
                </td>
                <td className="hidden py-4 align-top font-mono text-data text-ink tabular-figures sm:table-cell">
                  {source.lastVerified}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </Container>
        </section>

        <PageFoot
          related={[
          { href: "/services", label: "Every service, priced" },
          { href: "/for-parents", label: "Written for the person who pays" },
          ]}
        />
      </main>
      <Colophon />
      <MobileBar />
    </div>
  );
}
