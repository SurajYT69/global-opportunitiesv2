import GlobeReveal from "@/components/GlobeReveal";
import {
  FILM_CENTRE_AT,
  FILM_RX,
  FILM_RY,
} from "@/components/globe-reveal-geometry";
import StickyNav from "./sticky-nav";
import ColophonStrip from "./colophon-strip";
import Gazetteer from "./gazetteer";
import Register from "./register";
import BranchAtlas from "./branch-atlas";
import ForParents from "./for-parents";
import Reckoning from "./reckoning";
import Endpaper from "./endpaper";
import Questions from "./questions";
import Enquiry from "./enquiry";
import Colophon from "./colophon";
import MobileBar from "./mobile-bar";

/* ---------------------------------------------------------------------------
   PAGE SHELL — the whole `/` home page.

   UNTIL 2026-08-21 this was rendered by BOTH routes: /homev2 passed a flag
   that stamped an attribute on the outermost div and switched on a block of
   CSS overrides in globals.css section 9, so the comparison route could not
   drift out of date.

   /homev2 is now a genuinely different page (app/homev2/_components/), so that
   flag, those overrides and the shared-tree rule are all gone with it. What is
   still shared is everything that matters: the hero, every data file, the
   footnote registry and the CTA primitive are single copies imported by both
   routes. Do not re-introduce a layout flag here — a third layout gets its own
   directory, not a branch inside this file.

   HOME — the v2 hero (promoted from /homev2 on 2026-08-20 by client direction).

   The hero is GlobeReveal: a full-bleed film revealed out of the wordmark's
   globe glyph. It replaces `_components/hero`, which stays on disk
   unreferenced (see CLAUDE.md, "Intentionally dead files").

   The masthead is the CANON `_components/sticky-nav` — on 2026-08-20 the
   `components/homev2/sticky-nav-v2` fork was merged back into it and deleted,
   so the two-tier strip, scroll-spy nav and short CTA are all live again, now
   with the fork's transparent-over-the-film behaviour folded in.

   Page title/description/robots come from app/layout.tsx — this route sets no
   metadata of its own, and must NOT carry the noindex it had as /homev2.
   ------------------------------------------------------------------------ */

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

export default function PageShell() {
  return (
    <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
      />
      {/* Must stay ABOVE the hero — both run during parse, and the attribute
          has to be set before [data-intro-film] is painted. */}
      <style dangerouslySetInnerHTML={{ __html: INTRO_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT }} />
      <StickyNav />
      <main id="main">
        {/* The masthead's skip link and wordmark both target #hero. In the
            old hero that id lived inside hero-stage; here the wrapper carries
            it, which also gives the masthead the element it measures to decide
            where the film ends. Keep the id and the wrapper together.

            THE NEGATIVE MARGIN IS LOAD-BEARING. Both masthead tiers stay in
            normal flow (that is what lets the strip scroll away while the
            paper row sticks), so without this the h-svh film would start
            below them and run past the fold — the "navy sliver" the brief
            rules out. -3.5rem / -6.75rem is exactly the at-rest stack: 56px
            row on mobile, 36px strip + 72px row at md+. Change either height
            in sticky-nav and this must follow. */}
        <div id="hero" className="-mt-14 md:-mt-27">
          <GlobeReveal
            src="/video/hero-placeholder.mp4"
            poster="/img/hero-placeholder.jpg"
          />
        </div>
        <ColophonStrip />
        <Gazetteer />
        <Register />
        <BranchAtlas />
        <ForParents />
        <Reckoning />
        <Endpaper />
        <Questions />
        <Enquiry />
      </main>
      <Colophon />
      <MobileBar />
    </div>
  );
}
