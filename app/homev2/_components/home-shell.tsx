import GlobeReveal from "@/components/GlobeReveal";
import {
  FILM_CENTRE_AT,
  FILM_RX,
  FILM_RY,
} from "@/components/globe-reveal-geometry";
import MobileBar from "@/app/(home)/_components/mobile-bar";
import Nav from "./nav";
import Proof from "./proof";
import Destinations from "./destinations";
import Costs from "./costs";
import Offices from "./offices";
import Faq from "./faq";
import Enquiry from "./enquiry";
import Footer from "./footer";
/* Ported 2026-08-21 from the sibling repo. Named exports, not default —
   that is how they were written and it is not worth churning them. */
import { WaysWeAssist } from "./ways-we-assist";
import { Partners } from "./partners";
import { TestPreparations } from "./test-preparations";
import { Reviews } from "./reviews";

/* ===========================================================================
   HOME SHELL — /homev2, in reading order
   ---------------------------------------------------------------------------
   Eight sections after the hero. The shape is the standard one for this
   category, which is the point: hero, proof, what you can buy, how it works,
   what it costs, where we are, objections, ask.

   The hero is UNTOUCHED. Everything between this file's <style>/<script> pair
   and <GlobeReveal> is copied verbatim from app/(home)/_components/page-shell
   because it is a first-paint contract, not layout — see the long note below.
   ======================================================================== */

/* --- FIRST-PAINT GATE FOR THE INTRO --------------------------------------
   VERBATIM FROM page-shell.tsx. Do not "clean this up".

   Without it the intro cannot start until GSAP runs at hydration, so the first
   painted frame is the film full-bleed with the wordmark off-centre — the
   video arrives first and the "preloader" lands late.

   It cannot be solved with a static SSR default, because two audiences need
   opposite first frames: anyone who gets the intro must see p=0 (navy, plate
   on the wordmark, no film), while a reduced-motion visitor must see the
   finished hero. `prefers-reduced-motion` is not readable on the server — so
   the decision is made by a synchronous inline script that runs during HTML
   parse, before the hero markup is reached.

   THE ONCE-PER-SESSION GATE IS OFF (2026-08-04, client direction): the intro
   plays on every load. The key is now only ever CLEARED, never read.

   FALLBACK: anything that is not "play" — script threw, JS disabled, or a
   genuine skip — shows the finished hero.
   ---------------------------------------------------------------------- */
const INTRO_BOOT = `(function(){try{var k='go-hero-intro-seen';sessionStorage.removeItem(k);var s=matchMedia('(prefers-reduced-motion:reduce)').matches;document.documentElement.setAttribute('data-hero-intro',s?'skip':'play');}catch(e){}})();`;

/* Rules, in order. Rationale lives HERE rather than inside the template
   literal: comments in the string would ship to every visitor inside <style>,
   and a stray backtick in one of them terminates the literal.

   1. play + film   the ellipse matches render(0) — radii AND centre. It is
                    NOT centred on the section. Every number comes from
                    components/globe-reveal-geometry.ts.
   2. plates        visibility, NOT display:none — measure() reads the lockup's
                    offsetWidth and a display:none element reports 0.
   3. copy          opacity only; the h1 is never conditionally mounted.
   4. logo          the masthead wordmark is held until hydration fades it in.

   The CSS string must contain no backticks, and nothing may be interpolated
   into it except the geometry constants above — it is injected with
   dangerouslySetInnerHTML. */
const INTRO_CSS = `
html[data-hero-intro="play"] [data-intro-film]{clip-path:ellipse(${FILM_RX} ${FILM_RY} at ${FILM_CENTRE_AT})}
html:not([data-hero-intro="play"]) [data-intro-plate]{visibility:hidden}
html:not([data-hero-intro="play"]) [data-intro-copy]{opacity:1;pointer-events:auto}
html:not([data-hero-intro="play"]) [data-intro-logo]{opacity:1}
`;

export default function HomeShell() {
  return (
    <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* No Organization JSON-LD here — this route is noindex, so structured
          data on it is pointless at best and a duplicate-entity signal at
          worst. `/` carries the canonical graph. */}

      {/* Must stay ABOVE the hero — both run during parse, and the attribute
          has to be set before [data-intro-film] is painted. */}
      <style dangerouslySetInnerHTML={{ __html: INTRO_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT }} />

      <Nav />

      <main id="main">
        {/* THE NEGATIVE MARGIN IS LOAD-BEARING, and it is NOT the same value
            as on `/`. That page runs a two-tier masthead (36px strip + 72px
            row at md+) and pulls the film up by -3.5rem/-6.75rem. This nav is
            ONE tier, 56px, at every breakpoint — so it is -3.5rem everywhere.
            Both tiers stay in normal flow, so without this the h-svh film
            would start below the bar and run past the fold, showing the navy
            sliver the brief rules out. If NAV_H in nav.tsx changes, this must
            follow. */}
        <div id="hero" className="-mt-14">
          <GlobeReveal
            src="/video/hero-placeholder.mp4"
            poster="/img/hero-placeholder.jpg"
          />
        </div>

        {/* Reading order. `how-it-works` was REMOVED rather than added to:
            <WaysWeAssist> renders the same five-step flow as <OurProcess> in
            its right-hand column, so keeping both would have printed the
            process twice. The services list is the new content; the process
            came along with it. */}
        <Proof />
        <Partners />
        <Destinations />
        <WaysWeAssist />
        <Costs />
        <Offices />
        <TestPreparations />
        <Reviews />
        <Faq />
        <Enquiry />
      </main>

      <Footer />
      <MobileBar />
    </div>
  );
}
