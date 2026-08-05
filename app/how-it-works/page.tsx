import type { Metadata } from "next";

import StickyNav from "@/app/(home)/_components/sticky-nav";
import Colophon from "@/app/(home)/_components/colophon";
import MobileBar from "@/app/(home)/_components/mobile-bar";
import { PageHeader, PageFoot } from "@/components/homev2/page-shell";
import ElevenMonths from "@/app/(home)/_components/eleven-months";

/* ===========================================================================
   /how-it-works
   ---------------------------------------------------------------------------
   Split off the homepage, Aug 2026. The homepage carried fifteen topics and
   ranked for none of them; this page carries one.

   The section below is RELOCATED, not rewritten — it is the same component
   the homepage rendered, imported unchanged. If it needs editing, edit it
   where it lives.
   ======================================================================== */

export const metadata: Metadata = {
  title: "The eleven-month rule — how the process runs | Global Opportunities",
  description:
    "How a study abroad application actually runs, month by month, from first conversation to departure, and what has to be true at each step.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">      <StickyNav />
      <main id="main" className="pt-14 md:pt-16">
        <PageHeader
          eyebrow="THE ELEVEN-MONTH RULE"
          deck="The intake you can realistically make is decided by the calendar, not by ambition. This is the sequence, with what has to be finished before the next thing can start."
        >
          How eleven months of it actually runs.
        </PageHeader>

        <ElevenMonths />

        <PageFoot
          related={[
          { href: "/services", label: "Every service, priced" },
          { href: "/destinations", label: "All fifteen destinations" },
          ]}
        />
      </main>
      <Colophon />
      <MobileBar />
    </div>
  );
}
