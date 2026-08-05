import type { Metadata } from "next";

import StickyNav from "@/app/(home)/_components/sticky-nav";
import Colophon from "@/app/(home)/_components/colophon";
import MobileBar from "@/app/(home)/_components/mobile-bar";
import { PageHeader, PageFoot } from "@/components/homev2/page-shell";
import Register from "@/app/(home)/_components/register";
import { ForkInstitutions } from "@/components/homev2/audience-fork";

/* ===========================================================================
   /partners
   ---------------------------------------------------------------------------
   Split off the homepage, Aug 2026. The homepage carried fifteen topics and
   ranked for none of them; this page carries one.

   The section below is RELOCATED, not rewritten — it is the same component
   the homepage rendered, imported unchanged. If it needs editing, edit it
   where it lives.
   ======================================================================== */

export const metadata: Metadata = {
  title: "Partner universities — 700+ institutions | Global Opportunities",
  description:
    "Sixty-eight named partner institutions across eight countries, with the published count for each, and how to open a recruitment agreement with us.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">      <StickyNav />
      <main id="main" className="pt-14 md:pt-16">
        <PageHeader
          eyebrow="THE REGISTER"
          deck="Formal agreements across fifteen destinations, set as type rather than as crests, with the gap between the named list and the headline figure stated rather than smoothed over."
        >
          700+ partner universities, named where we can name them.
        </PageHeader>

        <Register />
        <ForkInstitutions />

        <PageFoot
          related={[
          { href: "/destinations", label: "All fifteen destinations" },
          { href: "/offices", label: "Our offices and counsellors" },
          ]}
        />
      </main>
      <Colophon />
      <MobileBar />
    </div>
  );
}
