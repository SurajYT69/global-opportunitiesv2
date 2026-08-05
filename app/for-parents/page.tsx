import type { Metadata } from "next";

import StickyNav from "@/app/(home)/_components/sticky-nav";
import Colophon from "@/app/(home)/_components/colophon";
import MobileBar from "@/app/(home)/_components/mobile-bar";
import { PageHeader, PageFoot } from "@/components/homev2/page-shell";
import ForParents from "@/app/(home)/_components/for-parents";

/* ===========================================================================
   /for-parents
   ---------------------------------------------------------------------------
   Split off the homepage, Aug 2026. The homepage carried fifteen topics and
   ranked for none of them; this page carries one.

   The section below is RELOCATED, not rewritten — it is the same component
   the homepage rendered, imported unchanged. If it needs editing, edit it
   where it lives.
   ======================================================================== */

export const metadata: Metadata = {
  title: "For parents — the questions you actually ask | Global Opportunities",
  description:
    "Written for the person signing the loan: money, safety, whether the degree counts at home, and who we answer to. Plain answers, no promises about outcomes.",
  alternates: { canonical: "/for-parents" },
};

export default function ForParentsPage() {
  return (
    <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">      <StickyNav />
      <main id="main" className="pt-14 md:pt-16">
        <PageHeader
          eyebrow="FOR THE PERSON WHO PAYS"
          deck="Most of this site is written for someone who is nineteen and impatient. This page is not."
        >
          A page written for you, not for your child.
        </PageHeader>

        <ForParents />

        <PageFoot
          related={[
          { href: "/costs", label: "What it costs, itemised" },
          { href: "/faq", label: "Ten questions, answered in full" },
          ]}
        />
      </main>
      <Colophon />
      <MobileBar />
    </div>
  );
}
