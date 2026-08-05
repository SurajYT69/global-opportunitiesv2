import type { Metadata } from "next";
import Home from "../(home)/page";

/* ===========================================================================
   /homev2 — ALIAS, PENDING RETIREMENT
   ---------------------------------------------------------------------------
   This route existed to run the GlobeReveal hero beside the old one for
   comparison. That comparison is over: as of the Aug 2026 split the hero, the
   masthead and the whole homev2 composition were PROMOTED INTO `/`, which is
   the URL that carries the ranking history the split exists to recover.

   So this file renders `/`'s page component directly. It is not a copy and it
   cannot drift — there is one homepage, and this is a second door onto it,
   kept only so QA bookmarks and shared review links do not 404. Delete the
   route once sign-off is done.

   STAYS NOINDEX. Two URLs serving one page is duplicate content, and this is
   the one that should lose.
   ======================================================================== */

export const metadata: Metadata = {
  title: "Global Opportunities",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default Home;
