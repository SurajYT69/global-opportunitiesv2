import GlobeReveal from "@/components/GlobeReveal";
import {
  FILM_CENTRE_AT,
  FILM_RX,
  FILM_RY,
} from "@/components/globe-reveal-geometry";
import StickyNavV2 from "@/components/homev2/sticky-nav-v2";
import ColophonStrip from "./_components/colophon-strip";
import DestinationCards from "@/components/homev2/destination-cards";
import BeyondTheOffer from "@/components/homev2/beyond-the-offer";
import ParentsBrief from "@/components/homev2/parents-brief";
import OutcomeCard from "@/components/homev2/outcome-card";
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

/* --- FIRST-PAINT GATE FOR THE INTRO --------------------------------------
   Promoted from /homev2 with the hero it belongs to (Aug 2026 split).

   Without this the intro cannot start until GSAP runs at hydration, so the
   first painted frame is the film full-bleed with the wordmark off-centre.
   It cannot be solved with a static SSR default, because two audiences need
   opposite first frames: anyone who gets the intro must see p=0 (navy, plate
   on the wordmark, no film), while a reduced-motion visitor must see the
   finished hero — and `prefers-reduced-motion` is not readable on the server.
   So the decision is made by a synchronous inline script during HTML parse,
   before the hero markup is reached.

   Anything that is not "play" — script threw, JS disabled, or a genuine skip
   — shows the finished hero. */
const INTRO_BOOT = `(function(){try{var k='go-hero-intro-seen';sessionStorage.removeItem(k);var s=matchMedia('(prefers-reduced-motion:reduce)').matches;document.documentElement.setAttribute('data-hero-intro',s?'skip':'play');}catch(e){}})();`;

/* The ellipse matches render(0) — radii AND centre — so the mark does not
   jump at hydration. Every number comes from globe-reveal-geometry.ts and the
   white globe plate is built from the same constants; the two must move
   together or the first frame shows a crescent of the film.

   Plates use visibility, NOT display:none: measure() reads the lockup's
   offsetWidth and a display:none element reports 0.

   NO BACKTICKS inside this string, and interpolate nothing but the geometry
   constants above — it is injected with dangerouslySetInnerHTML. */
const INTRO_CSS = `
html[data-hero-intro="play"] [data-intro-film]{clip-path:ellipse(${FILM_RX} ${FILM_RY} at ${FILM_CENTRE_AT})}
html:not([data-hero-intro="play"]) [data-intro-plate]{visibility:hidden}
html:not([data-hero-intro="play"]) [data-intro-copy]{opacity:1;pointer-events:auto}
html:not([data-hero-intro="play"]) [data-intro-logo]{opacity:1}
`;

export default function Home() {
  return (
    <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
      />
      {/* Must stay ABOVE the hero — both run during HTML parse, and the
          attribute has to be set before [data-intro-film] is painted. */}
      <style dangerouslySetInnerHTML={{ __html: INTRO_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT }} />
      <StickyNavV2 />
      {/* No clearance padding, unlike the retired hero. The GlobeReveal hero
          is a full-bleed h-svh plate and the masthead floats over it; adding
          the clearance pushes the plate past the fold and leaves the film
          short at the bottom edge. */}
      <main id="main">
        {/* StickyNavV2's skip link and wordmark both target #hero, and the
            masthead measures this wrapper to decide where the film ends.
            Keep the id and the wrapper together. */}
        <div id="hero">
          <GlobeReveal
            src="/video/hero-placeholder.mp4"
            poster="/img/hero-placeholder.jpg"
          />
        </div>
        <ColophonStrip />
        <DestinationCards />
        <BeyondTheOffer />
        <ParentsBrief />
        <OutcomeCard />
        <Enquiry />
      </main>
      <Colophon />
      <MobileBar />
    </div>
  );
}
