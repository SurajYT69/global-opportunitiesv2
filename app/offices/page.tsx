import type { Metadata } from "next";

import StickyNav from "@/app/(home)/_components/sticky-nav";
import Colophon from "@/app/(home)/_components/colophon";
import MobileBar from "@/app/(home)/_components/mobile-bar";
import { PageHeader, PageFoot } from "@/components/homev2/page-shell";
import BranchAtlas from "@/app/(home)/_components/branch-atlas";
import Contributors from "@/app/(home)/_components/contributors";

/* ===========================================================================
   /offices
   ---------------------------------------------------------------------------
   Split off the homepage, Aug 2026. The homepage carried fifteen topics and
   ranked for none of them; this page carries one.

   The section below is RELOCATED, not rewritten — it is the same component
   the homepage rendered, imported unchanged. If it needs editing, edit it
   where it lives.
   ======================================================================== */

export const metadata: Metadata = {
  title: "Our offices across India and the counsellors in them | Global Opportunities",
  description:
    "Where Global Opportunities has offices you can walk into, and the counsellors who work in them — named, with what each of them handles.",
  alternates: { canonical: "/offices" },
};

export default function OfficesPage() {
  return (
    <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">      <StickyNav />
      <main id="main" className="pt-14 md:pt-16">
        <PageHeader
          eyebrow="OFFICES YOU CAN WALK INTO"
          deck="A map is only useful if somebody is behind the desk. The offices are here with the counsellors who sit in them, because the second is what you are actually looking for."
        >
          Offices across India, and the people in them.
        </PageHeader>

        <BranchAtlas />
        <Contributors />

        <PageFoot
          related={[
          { href: "/partners", label: "The 700+ partner register" },
          { href: "/how-it-works", label: "The eleven-month timeline" },
          ]}
        />
      </main>
      <Colophon />
      <MobileBar />
    </div>
  );
}
