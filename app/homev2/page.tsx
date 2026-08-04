import type { Metadata } from "next";
import GlobeReveal from "@/components/GlobeReveal";
import {
  FILM_CENTRE_AT,
  FILM_RX,
  FILM_RY,
} from "@/components/globe-reveal-geometry";
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

   It cannot be solved with a static SSR default, because two audiences need
   opposite first frames: anyone who gets the intro must see p=0 (navy, plate
   on the wordmark, no film), while a reduced-motion visitor must see the
   finished hero. `prefers-reduced-motion` is not readable on the server — so
   the decision is made by a synchronous inline script that runs during HTML
   parse, before the hero markup is reached. This is the same no-flash pattern
   used for theme toggles.

   THE ONCE-PER-SESSION GATE IS OFF (2026-08-04, client direction): the intro
   plays on every load. `go-hero-intro-seen` is now only ever CLEARED, never
   read — the removeItem below exists to flush a key latched by an older build
   and to keep sticky-nav-v2's read of it honest. See the matching note in
   components/GlobeReveal.tsx. Reduced motion is the only skip path left.

   It sets ONE attribute; the rules below do the rest. GSAP takes over at
   hydration and writes inline styles, which outrank these (no !important
   anywhere here, deliberately).

   FALLBACK: anything that is not "play" — script threw, JS disabled, or a
   genuine skip — shows the finished hero. That also closes a hole in the
   supplied component, where `opacity-0` on the copy had nothing to remove it
   with JS off, leaving the h1 permanently invisible.
   ---------------------------------------------------------------------- */
const INTRO_BOOT = `(function(){try{var k='go-hero-intro-seen';sessionStorage.removeItem(k);var s=matchMedia('(prefers-reduced-motion:reduce)').matches;document.documentElement.setAttribute('data-hero-intro',s?'skip':'play');}catch(e){}})();`;

/* Rules, in order. Rationale lives HERE rather than inside the template
   literal: comments in the string would ship to every visitor inside <style>,
   and a stray backtick in one of them terminates the literal — which is
   exactly how this file broke once already.

   1. play + film   the ellipse matches render(0) — radii AND centre. It is
                    NOT centred on the section: render(0) puts it on the globe's
                    glyph slot in the wordmark, 45.8px higher. This rule used to
                    say `at 50% 50%`, which is what made the mark jump at
                    hydration. Every number now comes from
                    components/globe-reveal-geometry.ts; the white globe plate
                    is built from the same constants, and the two must move
                    together or the first frame shows a crescent of the film.
   2. plates        visibility, NOT display:none. measure() reads the lockup's
                    offsetWidth, and a display:none element reports 0 — which
                    made rx=0, MAXS=Infinity and a clip-path of
                    "ellipse(NaNpx ...)" that the CSSOM silently rejected on
                    every skip load. visibility:hidden keeps the box
                    measurable. The plates are absolute, pointer-events-none
                    and aria-hidden, so holding layout costs nothing, and
                    React unmounts them a tick later anyway.
   3. copy          opacity only; the h1 is never conditionally mounted.
   4. logo          the masthead wordmark is held by the .reveal class until
                    hydration runs its fade-in. That hold is only wanted while
                    the intro plays — without this the logo arrives late on
                    EVERY load, including skip reloads with no intro to wait
                    for.

   The CSS string below must contain no backticks. Interpolation is now used,
   but ONLY for the geometry constants imported above — build-time numbers from
   a module we own, never request data — because this string is injected with
   dangerouslySetInnerHTML. Do not interpolate anything else into it. */
const INTRO_CSS = `
html[data-hero-intro="play"] [data-intro-film]{clip-path:ellipse(${FILM_RX} ${FILM_RY} at ${FILM_CENTRE_AT})}
html:not([data-hero-intro="play"]) [data-intro-plate]{visibility:hidden}
html:not([data-hero-intro="play"]) [data-intro-copy]{opacity:1;pointer-events:auto}
html:not([data-hero-intro="play"]) [data-intro-logo]{opacity:1}
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
