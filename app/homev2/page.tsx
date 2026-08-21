import type { Metadata } from "next";
import HomeShell from "./_components/home-shell";

/* ---------------------------------------------------------------------------
   /homev2 — THE CLEAN REBUILD (2026-08-21)

   WHAT CHANGED, AND WHY THIS IS NOW A FORK

   This route used to render `<PageShell v3 />` — literally the same ten-section
   tree as `/`, differing only by a `data-v3` attribute that switched on four
   CSS overrides in globals.css §9. That arrangement existed to prove a point
   about clutter without duplicating a component, and CLAUDE.md forbade forking
   PageShell because an earlier comparison route was a stale COPY of sticky-nav
   that shipped a months-old masthead when it was promoted.

   That rule is deliberately broken here, with the client's sign-off. The body
   below is not a copy of `/` that can drift out of date — it is a different
   page: eight sections built on shadcn/ui primitives instead of thirteen built
   on the editorial system. A copy drifts; a redesign does not.

   The ONE thing that must never diverge — the hero — is still a shared import
   (`components/GlobeReveal.tsx`), as are every data file, the footnote
   registry and the CTA primitive. Only the layout is new.

   globals.css §9 was deleted along with the `v3` prop, because nothing renders
   them any more.

   NOINDEX stays. The copy overlaps `/` heavily and, left crawlable, this would
   compete with the page the ad spend points at. Delete the `robots` key if and
   when this becomes the real home.
   ------------------------------------------------------------------------ */

/* METADATA IS FULLY RE-DECLARED, INCLUDING openGraph AND keywords.

   app/layout.tsx currently ships the phrase "free counselling" in its
   `keywords`, `og:title` and `og:description` — ten occurrences on every page
   of this site. CLAUDE.md bans that phrase SITE-WIDE as a hard constraint from
   the ads-cleanup review; the canonical CTA is "Book a free guidance session".
   Route metadata merges field-by-field, so setting only `title` and
   `description` here would leave the layout's Open Graph block leaking the
   banned phrase into every share card for this route.

   `/` is still affected and was deliberately left alone — fixing it changes
   the search snippet and social card that live ad spend points at, which is a
   call for the client, not a drive-by edit. Raised in the handover. */
export const metadata: Metadata = {
  title: "Study abroad with Global Opportunities",
  description:
    "Overseas education consultants since 2001. 18 offices across India, 700+ partner universities. Book a free guidance session. No cost, no obligation.",
  keywords: [
    "study abroad consultants",
    "overseas education consultants India",
    "student visa guidance",
    "partner universities",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Global Opportunities",
    title: "Study Abroad Consultants in India | Global Opportunities",
    description:
      "A free guidance session with a named GO counsellor. 700+ partner universities, 15 countries, 18 offices across India. Real costs in rupees, real intake deadlines, no visa guarantees. Since 2001.",
  },
  twitter: {
    card: "summary",
    title: "Study Abroad Consultants in India | Global Opportunities",
    description:
      "A free guidance session with a named GO counsellor. 700+ partner universities, 15 countries, 18 offices across India. Since 2001.",
  },
  robots: { index: false, follow: false },
};

export default function HomeV2() {
  return <HomeShell />;
}
