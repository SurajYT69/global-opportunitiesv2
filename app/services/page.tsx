import type { Metadata } from "next";

import StickyNav from "@/app/(home)/_components/sticky-nav";
import Colophon from "@/app/(home)/_components/colophon";
import MobileBar from "@/app/(home)/_components/mobile-bar";
import { PageHeader, PageFoot } from "@/components/homev2/page-shell";
import WhatWeDo from "@/app/(home)/_components/what-we-do";

/* ===========================================================================
   /services
   ---------------------------------------------------------------------------
   Split off the homepage, Aug 2026. The homepage carried fifteen topics and
   ranked for none of them; this page carries one.

   The section below is RELOCATED, not rewritten — it is the same component
   the homepage rendered, imported unchanged. If it needs editing, edit it
   where it lives.
   ======================================================================== */

export const metadata: Metadata = {
  title: "Our services and what each one costs | Global Opportunities",
  description:
    "Every service Global Opportunities provides, in the order it happens, with the price of each printed next to it and who else gets paid along the way.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">      <StickyNav />
      <main id="main" className="pt-14 md:pt-16">
        <PageHeader
          eyebrow="THE SERVICE LEDGER"
          deck="Set out in the order it actually happens. Where a bank, an insurer or a government charges, you pay them directly and we add nothing to it."
        >
          Everything we do, with the price next to it.
        </PageHeader>

        <WhatWeDo />

        <PageFoot
          related={[
          { href: "/costs", label: "The full cost ledger" },
          { href: "/how-it-works", label: "The eleven-month timeline" },
          ]}
        />
      </main>
      <Colophon />
      <MobileBar />
    </div>
  );
}
