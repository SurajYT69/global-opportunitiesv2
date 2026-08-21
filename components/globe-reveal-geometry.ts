/* ---------------------------------------------------------------------------
   GlobeReveal — SHARED GEOMETRY

   Two files have to describe the SAME rest state — where the globe sits inside
   the wordmark:

     · components/GlobeReveal.tsx   the SSR markup + GSAP's render(p)   (client)
     · app/(home)/page.tsx          the first-paint gate's <style>      (server)

   They described it independently once and drifted. The SSR markup centred the
   globe on the SECTION; render(0) centres it on its glyph slot in the wordmark,
   45.8px higher. The globe therefore sat low in the "o" of "Global" from first
   paint until hydration, then jumped into place in a single frame.

   Everything below is DERIVED from the two viewBoxes. Re-export the SVGs with
   different bounds and both declarations follow. No decimal literal belongs in
   this file, and none belongs in the two consumers either.

   NO "use client" HERE, DELIBERATELY. app/(home)/page.tsx is a Server
   Component; importing these from GlobeReveal.tsx would drag that module's
   whole graph — gsap, @gsap/react — across the boundary to read two numbers.
   ------------------------------------------------------------------------ */

/** The full wordmark's viewBox — `<svg viewBox="200 190 1120 530">`. */
export const LOCKUP = { x: 200, y: 190, w: 1120, h: 530 } as const;

/** The globe body's viewBox — `<svg viewBox="631 270 265 235">`. */
export const GLOBE = { x: 631, y: 270, w: 265, h: 235 } as const;

/** Wordmark width on screen. Every other size on this plate derives from it. */
export const LOCKUP_W = "min(62vw,760px)";

/** `calc()` of LOCKUP_W times `ratio`. The only way to spend a ratio below. */
const ofLockup = (ratio: number) => `calc(${LOCKUP_W} * ${ratio})`;

/* --- ratios ---------------------------------------------------------------
   The lockup renders at a UNIFORM scale: its box is LOCKUP_W wide and
   LOCKUP_W * 530/1120 tall, straight from the SVG's own aspect ratio. So one
   divisor — LOCKUP.w — converts a source-unit distance into a fraction of
   LOCKUP_W on BOTH axes. That is why every ratio here is over `.w`, including
   the vertical ones; it is not a typo.
   ---------------------------------------------------------------------- */

/** Globe box width as a fraction of the wordmark: 265 / 1120 = 0.236607… */
export const MARK_W_RATIO = GLOBE.w / LOCKUP.w;

/**
 * Globe centre minus lockup centre, over the lockup width:
 *
 *   x: (631 + 265/2) − (200 + 1120/2) = 763.5 − 760.0 =  +3.5 / 1120 =  0.003125
 *   y: (270 + 235/2) − (190 +  530/2) = 387.5 − 455.0 = −67.5 / 1120 = −0.060268
 *
 * Negative y means the globe sits ABOVE the wordmark's centre. This offset is
 * exactly what the SSR markup was missing.
 */
export const GLOBE_OFFSET_X_RATIO =
  (GLOBE.x + GLOBE.w / 2 - (LOCKUP.x + LOCKUP.w / 2)) / LOCKUP.w;
export const GLOBE_OFFSET_Y_RATIO =
  (GLOBE.y + GLOBE.h / 2 - (LOCKUP.y + LOCKUP.h / 2)) / LOCKUP.w;

/* --- the declarations built from them ------------------------------------ */

/** Globe box width on screen. */
export const MARK_W = ofLockup(MARK_W_RATIO);

/**
 * The translate that seats the globe in its glyph slot, appended to the plate's
 * centring translate in the SSR markup so the FIRST PAINTED FRAME already
 * matches render(0). GSAP overwrites the whole transform at hydration — it sets
 * xPercent, yPercent, x and y on every render() call — so this governs only the
 * frames before the intro starts.
 */
export const GLOBE_OFFSET_TRANSFORM = `translate(${ofLockup(
  GLOBE_OFFSET_X_RATIO,
)}, ${ofLockup(GLOBE_OFFSET_Y_RATIO)})`;

/**
 * Radii of the film's first-paint ellipse: half the globe box on each axis.
 * ry is over LOCKUP.w too — see the note on uniform scale above.
 */
export const FILM_RX = ofLockup(GLOBE.w / (2 * LOCKUP.w));
export const FILM_RY = ofLockup(GLOBE.h / (2 * LOCKUP.w));

/**
 * Centre of that ellipse: the section centre moved by the same offset.
 *
 * MUST track GLOBE_OFFSET_TRANSFORM exactly. The white globe covers this
 * ellipse precisely; if the two separate, the first painted frame shows a
 * crescent of the hero photo poking out from behind the mark. Moving one
 * without the other is the same class of bug this file exists to prevent.
 */
export const FILM_CENTRE_AT = `calc(50% + ${ofLockup(
  GLOBE_OFFSET_X_RATIO,
)}) calc(50% + ${ofLockup(GLOBE_OFFSET_Y_RATIO)})`;

/* ===========================================================================
   INTRO TIMING — SHARED, AND DELIBERATELY SO
   ---------------------------------------------------------------------------
   These two lived as private constants in components/GlobeReveal.tsx AND as a
   hand-copied pair in app/(home)/_components/sticky-nav.tsx, whose own comment
   called the duplication "the one thing here that can silently drift". The
   /homev2 masthead would have made it a third copy, so they moved here — the
   module that already exists to keep the hero's build-time numbers in one
   place.

   Every consumer of the wordmark hold reads these. If the intro's length or
   its sessionStorage key changes, it changes once, here.
   ======================================================================== */

/** sessionStorage key for the once-per-session gate.
    LATCHING IS OFF (2026-08-04, client direction): GlobeReveal only ever
    CLEARS this key, so `seen` is permanently false and the intro plays on
    every load. The reads are kept because they are the whole handshake —
    re-latch it in GlobeReveal and the hold starts working again with no other
    edit. Reduced motion is the live skip path. */
export const INTRO_KEY = "go-hero-intro-seen";

/** Full length of the hero intro, ms. The masthead holds its wordmark for
    this long so the two land together. */
export const INTRO_MS = 3000;
