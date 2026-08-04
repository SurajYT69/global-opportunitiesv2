import StickyNav from "./_components/sticky-nav";
import Hero from "./_components/hero";
import ColophonStrip from "./_components/colophon-strip";
import Gazetteer from "./_components/gazetteer";
import Register from "./_components/register";
import WhatWeDo from "./_components/what-we-do";
import StillPage from "./_components/still-page";
import BranchAtlas from "./_components/branch-atlas";
import Contributors from "./_components/contributors";
import ForParents from "./_components/for-parents";
import Reckoning from "./_components/reckoning";
import ElevenMonths from "./_components/eleven-months";
import Endpaper from "./_components/endpaper";
import Questions from "./_components/questions";
import Enquiry from "./_components/enquiry";
import Colophon from "./_components/colophon";
import MobileBar from "./_components/mobile-bar";

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
      {/* Fixed masthead adds no spacer; main owns the clearance. 56px below
          md; 108px (utility strip + paper row, 6.75rem) at md+. */}
      <main id="main" className="pt-14 md:pt-27">
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
