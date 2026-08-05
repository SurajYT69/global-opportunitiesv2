import type { Metadata } from "next";

import StickyNav from "@/app/(home)/_components/sticky-nav";
import Colophon from "@/app/(home)/_components/colophon";
import MobileBar from "@/app/(home)/_components/mobile-bar";
import { PageHeader, PageFoot } from "@/components/homev2/page-shell";
import Questions from "@/app/(home)/_components/questions";
import { FAQS } from "@/app/(home)/_components/questions";

/* ===========================================================================
   /faq
   ---------------------------------------------------------------------------
   Split off the homepage, Aug 2026. The homepage carried fifteen topics and
   ranked for none of them; this page carries one.

   The section below is RELOCATED, not rewritten — it is the same component
   the homepage rendered, imported unchanged. If it needs editing, edit it
   where it lives.
   ======================================================================== */

export const metadata: Metadata = {
  title: "Questions about studying abroad, answered | Global Opportunities",
  description:
    "Ten questions students and parents put to us most often, answered in full — what we do, what we charge, what we cannot promise, and who we answer to.",
  alternates: { canonical: "/faq" },
};

/* FAQPage structured data, built from the SAME array the section renders, so
   the markup and the rich result cannot describe different answers. Answers
   are flattened to text: a block may be a paragraph or a bullet list, and
   schema.org wants one string either way. */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
        .map((block) => (Array.isArray(block) ? block.join(" ") : block))
        .join(" "),
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <StickyNav />
      <main id="main" className="pt-14 md:pt-16">
        <PageHeader
          eyebrow="TEN QUESTIONS · ANSWERED IN FULL"
          deck="Answered at length rather than in a sentence, including the ones where the honest answer is that nobody can promise you an outcome."
        >
          The ten questions we are asked most.
        </PageHeader>

        <Questions />

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
