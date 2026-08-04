import type { Metadata } from "next";
import GlobeReveal from "@/components/GlobeReveal";
import StickyNavV2 from "@/components/homev2/sticky-nav-v2";
import ColophonStrip from "../(home)/_components/colophon-strip";
import Gazetteer from "../(home)/_components/gazetteer";
import Register from "../(home)/_components/register";
import WhatWeDo from "../(home)/_components/what-we-do";
import StillPage from "../(home)/_components/still-page";
import BranchAtlas from "../(home)/_components/branch-atlas";
import Contributors from "../(home)/_components/contributors";
import ForParents from "../(home)/_components/for-parents";
import Reckoning from "../(home)/_components/reckoning";
import ElevenMonths from "../(home)/_components/eleven-months";
import Endpaper from "../(home)/_components/endpaper";
import Questions from "../(home)/_components/questions";
import Enquiry from "../(home)/_components/enquiry";
import Colophon from "../(home)/_components/colophon";
import MobileBar from "../(home)/_components/mobile-bar";

/* ---------------------------------------------------------------------------
   /homev2 — PARALLEL HERO, FOR COMPARISON AGAINST `/`

   Only the hero differs. Every section below the fold is IMPORTED from the
   live home page — never copied, never edited — so any difference you see
   scrolling this page against `/` is the hero and nothing else.

   Two components are variants rather than shared:
     · GlobeReveal        replaces `sections/hero`
     · StickyNavV2        replaces `sections/sticky-nav`, because the masthead
                          has to be transparent over the film (see that file)

   NOINDEX. This route carries the same headline, sub and CTA as `/`. Left
   crawlable it would be duplicate content competing with the page the ad spend
   points at. Remove the `robots` key below if this ever becomes the real home.

   NO ORGANIZATION JSON-LD, deliberately. `/` emits it; a noindex comparison
   route emitting a second copy of the same Organization node buys nothing.
   ------------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Hero v2 — Global Opportunities",
  robots: { index: false, follow: false },
};

/* --- FIRST-PAINT GATE FOR THE INTRO --------------------------------------
   Without this the intro cannot start until GSAP runs at hydration, so the
   first painted frame is the film full-bleed with the wordmark off-centre —
   the video arrives first and the "preloader" lands late.

   It cannot be solved with a static SSR default, because the two audiences
   need opposite first frames: a first-time visitor must see p=0 (navy, plate
   centred, no film), a returning visitor must see the finished hero
   (acceptance 2). Only sessionStorage distinguishes them, and it is not
   readable on the server — so the decision is made by a synchronous inline
   script that runs during HTML parse, before the hero markup is reached.
   This is the same no-flash pattern used for theme toggles.

   It sets ONE attribute; the rules below do the rest. GSAP takes over at
   hydration and writes inline styles, which outrank these (no !important
   anywhere here, deliberately).

   FALLBACK: anything that is not "play" — script threw, JS disabled, or a
   genuine skip — shows the finished hero. That also closes a hole in the
   supplied component, where `opacity-0` on the copy had nothing to remove it
   with JS off, leaving the h1 permanently invisible.
   ---------------------------------------------------------------------- */
const INTRO_BOOT = `(function(){try{var k='go-hero-intro-seen';${
  process.env.NODE_ENV === "development" ? "sessionStorage.removeItem(k);" : ""
}var s=sessionStorage.getItem(k)||matchMedia('(prefers-reduced-motion:reduce)').matches;document.documentElement.setAttribute('data-hero-intro',s?'skip':'play');}catch(e){}})();`;

/* The ellipse matches render(0): rx = MARK_W/2, ry = rx * (235/265), centred.
   MARK_W is `min(62vw,760px) * 0.23661`, so rx = that * 0.118305. */
const INTRO_CSS = `
html[data-hero-intro="play"] [data-intro-film]{clip-path:ellipse(calc(min(62vw,760px)*.118305) calc(min(62vw,760px)*.104897) at 50% 50%)}
html:not([data-hero-intro="play"]) [data-intro-plate]{display:none}
html:not([data-hero-intro="play"]) [data-intro-copy]{opacity:1}
`;

export default function HomeV2() {
  return (
    <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* Must stay ABOVE the hero — both run during parse, and the attribute
          has to be set before [data-intro-film] is painted. */}
      <style dangerouslySetInnerHTML={{ __html: INTRO_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT }} />
      <StickyNavV2 />
      {/* No `pt-14 md:pt-16` here, unlike `/`. The hero is a full-bleed h-svh
          plate and the masthead floats over it; adding the clearance would
          push the plate past the fold and leave the film short at the bottom
          edge — the exact "navy sliver" the brief rules out. */}
      <main id="main">
        {/* StickyNavV2's skip link and wordmark both target #hero. On `/` that
            id lives inside hero-stage; here the wrapper carries it, which also
            gives the masthead the element it measures to decide where the film
            ends. Keep the id and the wrapper together. */}
        <div id="hero">
          <GlobeReveal
            src="/video/hero-placeholder.mp4"
            poster="/img/hero-placeholder.jpg"
          />
        </div>
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
