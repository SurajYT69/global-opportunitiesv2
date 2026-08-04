import StickyNav from "@/components/sections/sticky-nav";
import Hero from "@/components/sections/hero";
import ColophonStrip from "@/components/sections/colophon-strip";
import Gazetteer from "@/components/sections/gazetteer";
import Register from "@/components/sections/register";
import WhatWeDo from "@/components/sections/what-we-do";
import StillPage from "@/components/sections/still-page";
import BranchAtlas from "@/components/sections/branch-atlas";
import Contributors from "@/components/sections/contributors";
import ForParents from "@/components/sections/for-parents";
import Reckoning from "@/components/sections/reckoning";
import ElevenMonths from "@/components/sections/eleven-months";
import Endpaper from "@/components/sections/endpaper";
import Questions from "@/components/sections/questions";
import Enquiry from "@/components/sections/enquiry";
import Colophon from "@/components/sections/colophon";
import MobileBar from "@/components/sections/mobile-bar";

/* Organization JSON-LD per 06-strategy.md — real GO data only, no self-served
   ratings (policy), sameAs deliberately absent until profiles are verified. */
const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Global Opportunities",
  legalName: "GLOBAL OPPORTUNITIES PRIVATE LIMITED",
  url: "https://www.global-opportunities.net/",
  foundingDate: "2001",
  telephone: "+91-8282828215",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+91-8282828215",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "IN",
  },
};

export default function Home() {
  return (
    <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
      />
      <StickyNav />
      {/* Fixed masthead adds no spacer; main owns the clearance (56px / 64px). */}
      <main id="main" className="pt-14 md:pt-16">
        <Hero />
        <ColophonStrip />
        <Gazetteer />
        <Register />
        <WhatWeDo />
        <StillPage />
        <BranchAtlas />
        <Contributors />
        <ForParents />
        <Reckoning />
        <ElevenMonths />
        <Endpaper />
        <Questions />
        <Enquiry />
      </main>
      <Colophon />
      <MobileBar />
    </div>
  );
}
