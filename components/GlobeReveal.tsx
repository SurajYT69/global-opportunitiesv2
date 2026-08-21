"use client";

/**
 * GlobeReveal — Global Opportunities hero intro.
 *
 * Plays once on load: the GO wordmark holds, the globe (the "o" in Global) opens
 * into the hero film, then the headline and CTAs arrive. 1.5s total.
 *
 * NOT scroll-driven. The section is a normal full-height hero — the fold stays
 * usable and scrolling goes straight to the next section.
 *
 * Stack: Next 16 / React 19 / GSAP 3.15 + @gsap/react / Tailwind v4.
 * No ScrollTrigger. No Lenis dependency.
 *
 * The logo paths below are traced from the real GO artwork. Do not edit them and
 * do not touch the group transform — the path data is at 10x scale and y-flipped
 * (potrace output). Normalising the coordinates will silently break the shapes.
 */

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
/* Geometry of the traced artwork lives in its own module because the
   first-paint gate in app/(home)/page.tsx — a Server Component — has to build
   the same numbers into CSS. See that file's header for why they must not be
   written twice. */
import {
  GLOBE,
  GLOBE_OFFSET_TRANSFORM,
  LOCKUP,
  LOCKUP_W,
  MARK_W,
  INTRO_KEY,
  INTRO_MS,
} from "@/components/globe-reveal-geometry";

gsap.registerPlugin(useGSAP);

const TF = "translate(0,1024) scale(0.1,-0.1)";

/* --- INTRO TIMING ---------------------------------------------------------
   Phases are authored in WALL-CLOCK MILLISECONDS and converted to the master
   tween's progress, never the other way round. The tween is eased
   `power3.inOut`, so equal spans of `p` are nowhere near equal spans of time:
   the previous windows started at p=0.22, which sounds like 22% but was 570ms
   of a 1500ms sequence spent showing a motionless plate. Written as ms that is
   obvious; written as p literals it was invisible, and it is why this sequence
   could not be re-timed by changing `duration` alone.

   `easeInOut3` MUST stay identical to the `ease` on the tween below. Change
   one without the other and every phase silently re-times.
   ---------------------------------------------------------------------- */
/* INTRO_MS now lives in globe-reveal-geometry.ts — the masthead needs the
   same number and used to keep a hand-copy of it. Imported above. */

/** Phase windows, in ms from the intro's first frame. */
const PHASE = {
  /** navy window grid clears — film appears inside the globe */
  winOut: [400, 700],
  /** white globe + wordmark clear — overlaps into `grow`, deliberately */
  markOut: [620, 980],
  /** ellipse centre walks from the glyph slot to the viewport centre */
  travel: [400, 2050],
  /** ellipse scales to full bleed. The moment worth watching. */
  grow: [400, 2250],
  /** headline + CTAs arrive */
  copyIn: [2250, INTRO_MS],
} as const;

/** GSAP's `power3.inOut` in closed form — mirrors the tween's ease exactly. */
const easeInOut3 = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - 4 * (1 - t) ** 3;

/** wall-clock ms -> the master tween's eased progress `p`. */
const atMs = (ms: number) => easeInOut3(ms / INTRO_MS);

type Props = {
  /** mp4 for the hero film. Omit to run from the poster alone. */
  src?: string;
  poster: string;
  eyebrow?: string;
  headline?: string;
  sub?: string;
};

export default function GlobeReveal({
  src,
  poster,
  eyebrow = "September 2027 intake · Admissions open",
  headline = "Step out without doubt.",
  sub = "Overseas education consultants since 2001. We've placed students in 700+ partner universities across 15 countries — admissions, education loans, GIC and forex handled in-house.",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const film = useRef<HTMLDivElement>(null);
  /* These two are the WRAPPERS around the SVGs, not the SVGs themselves.
     GSAP transforms a plain HTML element here on purpose — percentage
     offsets (xPercent/yPercent) have unambiguous semantics against a div's
     border box, whereas on an outermost <svg> they did not land at all and
     both plates hung down-and-right from the section centre. The SVGs inside
     are untouched: same viewBox, same paths, same group transforms. */
  const lockup = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const windows = useRef<SVGGElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* THE ONCE-PER-SESSION GATE IS OFF BY CLIENT DIRECTION (2026-08-04).
         The intro plays on EVERY load, in every environment — it was
         previously suppressed after the first view of a session, and that is
         no longer wanted.

         The key is CLEARED rather than simply left unread, for two reasons:
         a session that already latched it before this change would otherwise
         never see the intro again, and the masthead reads the same key to
         decide whether to hold the masthead wordmark. Leaving a stale "1"
         there would replay the globe while the corner logo popped in
         immediately. Clearing it keeps that handshake honest without coupling
         the two components.

         REDUCED MOTION STILL SKIPS. That branch is an accessibility
         guarantee, not a preference, and the client direction above is about
         repeat visits — not about forcing motion on people who asked for
         none. */
      sessionStorage.removeItem(INTRO_KEY);

      let cx = 0, cy = 0, rx = 0, ry = 0, MAXS = 1;
      let ox = 0, oy = 0; // globe centre relative to the lockup centre

      const clamp = gsap.utils.clamp(0, 1);
      const lerp = gsap.utils.interpolate;
      /** 0..1 window with smootherstep easing */
      const seg = (p: number, a: number, b: number) => {
        const t = clamp((p - a) / (b - a));
        return t * t * t * (t * (t * 6 - 15) + 10);
      };

      const measure = () => {
        /* MUST NOT use getBoundingClientRect() on the lockup: render() writes
           a transform onto that same element, so the rect means different
           things before the first render and after. document.fonts.ready
           re-measures on nearly every first load, which moved the clip-path
           centre mid-intro. offsetWidth/offsetHeight never include transforms,
           and the wrapper's resting box is the section centre by construction
           (`absolute left-1/2 top-1/2` + the xPercent/yPercent below), so this
           derives the same layout box every time it is called. */
        /* Both the resize listener and document.fonts.ready outlive `done`,
           and React unmounts the lockup at that point — so this dereferenced
           null and THREW on any resize after the intro settled. Previously you
           had to resize inside the 1.5s window to see it; with the skip below
           it is one click plus one resize. Bailing keeps the last-rendered
           geometry, which is correct: nothing that uses it is on screen. */
        if (!root.current || !lockup.current) return;

        const host = root.current.getBoundingClientRect();
        const w = lockup.current.offsetWidth;
        /* DERIVED from w, not read as offsetHeight. offsetHeight is rounded to
           a whole pixel (360 where the box is really 359.643), which made sy
           disagree with sx by ~0.1% and put render(0) 0.046px above the rest
           state the CSS in app/(home)/page.tsx paints. Sub-pixel, but it is
           the one number that stopped first paint and render(0) being bit-for-
           bit identical. The div's height comes from the SVG's own aspect
           ratio, so this is exact rather than an approximation — and it is the
           same ratio the shared geometry module divides by. */
        const h = (w * LOCKUP.h) / LOCKUP.w;
        const left = host.left + host.width / 2 - w / 2;
        const top = host.top + host.height / 2 - h / 2;

        const sx = w / LOCKUP.w;
        const sy = h / LOCKUP.h;

        cx = left + (GLOBE.x + GLOBE.w / 2 - LOCKUP.x) * sx;
        cy = top + (GLOBE.y + GLOBE.h / 2 - LOCKUP.y) * sy;
        rx = (GLOBE.w / 2) * sx;
        ry = (GLOBE.h / 2) * sy;

        // the mark wrapper is centred on the section, so shift it onto the globe
        ox = cx - (left + w / 2);
        oy = cy - (top + h / 2);

        const vw = window.innerWidth, vh = window.innerHeight;
        // scale at which the ellipse covers the whole viewport
        MAXS = Math.hypot(vw / (2 * rx), vh / (2 * ry)) * 1.03;
      };

      const render = (p: number) => {
        const vw = window.innerWidth, vh = window.innerHeight;

        const at = (w: readonly [number, number]) =>
          seg(p, atMs(w[0]), atMs(w[1]));
        const grow = at(PHASE.grow);
        const travel = at(PHASE.travel);
        const winOut = at(PHASE.winOut);
        const markOut = at(PHASE.markOut);
        const copyIn = at(PHASE.copyIn);

        const s = lerp(1, MAXS, grow);
        const dx = lerp(0, vw / 2 - cx, travel);
        const dy = lerp(0, vh / 2 - cy, travel);

        gsap.set(film.current, {
          clipPath:
            "ellipse(" + rx * s + "px " + ry * s + "px at " +
            (cx + dx) + "px " + (cy + dy) + "px)",
        });
        /* The three plate refs go null the moment `done` flips and React
           unmounts them — and render() outlives that, via the resize listener
           and document.fonts.ready. The skip below makes that window trivial
           to hit, where before it needed a resize inside 1.5s. */
        if (mark.current) {
          gsap.set(mark.current, {
            xPercent: -50, yPercent: -50,
            x: ox + dx, y: oy + dy, scale: s, opacity: 1 - markOut,
          });
        }
        if (windows.current) gsap.set(windows.current, { opacity: 1 - winOut });
        if (lockup.current) {
          gsap.set(lockup.current, {
            xPercent: -50, yPercent: -50,
            y: -18 * markOut, opacity: 1 - markOut,
          });
        }
        gsap.set(copy.current, {
          opacity: copyIn,
          y: 18 * (1 - copyIn),
          /* opacity:0 does NOT remove hit-testing. Without this the CTA is
             clickable and sits in the tab order for the whole intro while
             completely invisible. */
          pointerEvents: copyIn > 0 ? "auto" : "none",
        });
      };

      measure();

      if (reduced) {
        render(1);
        setDone(true);
        const onR = () => { measure(); render(1); };
        window.addEventListener("resize", onR);
        return () => window.removeEventListener("resize", onR);
      }

      render(0);

      const o = { p: 0 };
      const tween = gsap.to(o, {
        p: 1,
        duration: INTRO_MS / 1000,
        ease: "power3.inOut",
        onUpdate: () => render(o.p),
        /* Deliberately does NOT set INTRO_KEY — see the gate note above. */
        onComplete: () => { detachSkip(); setDone(true); },
      });

      /* --- SKIP -----------------------------------------------------------
         Any deliberate input lands the finished hero at once. Three seconds is
         a long time to hold someone who arrived wanting to read.

         `scroll` is NOT in this list, deliberately: browsers restore scroll
         position on reload and fire it unprompted, which would skip an intro
         nobody asked to skip. `wheel` and `touchstart` are the honest signals
         of scroll INTENT; `keydown` covers space, arrows and Tab.

         `o.p` is forced to 1 as well as the tween being killed — the resize
         handler below replays render(o.p), and a stale mid-intro p would snap
         the film's clip-path back into the middle of the reveal on the next
         resize. */
      const SKIP_EVENTS = [
        "pointerdown",
        "keydown",
        "wheel",
        "touchstart",
      ] as const;

      const detachSkip = () =>
        SKIP_EVENTS.forEach((e) => window.removeEventListener(e, skip));

      const skip = () => {
        detachSkip();
        tween.kill();
        o.p = 1;
        render(1);
        setDone(true);
      };

      SKIP_EVENTS.forEach((e) =>
        window.addEventListener(e, skip, { passive: true }),
      );

      const onResize = () => { measure(); render(o.p); };
      window.addEventListener("resize", onResize);
      document.fonts?.ready.then(() => { measure(); render(o.p); });
      return () => {
        window.removeEventListener("resize", onResize);
        detachSkip();
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative h-svh w-full overflow-hidden bg-[#0E2A47]">
      {/* film */}
      <div
        ref={film}
        data-intro-film
        className="absolute inset-0 will-change-[clip-path]"
      >
        {src ? (
          <video
            className="h-full w-full object-cover"
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="h-full w-full object-cover" src={poster} alt="" />
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top,rgba(14,42,71,.80) 0%,rgba(14,42,71,.30) 45%,rgba(14,42,71,.10) 75%)",
          }}
        />
      </div>

      {/* wordmark — traced from the real logo, so it matches the masthead exactly */}
      {!done && (
        <div
          ref={lockup}
          data-intro-plate
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2"
          /* The centring translate is SSR'd so the plate is centred in the
             first painted frame rather than after hydration. This is safe on a
             div (it was not on the <svg>): CSSPlugin reads the computed matrix
             and, when the translation equals exactly -offsetWidth/2, converts
             it back to xPercent/-50 with x:0 — so render()'s xPercent below
             replaces it rather than stacking on top of it. */
          style={{ width: LOCKUP_W, transform: "translate(-50%,-50%)" }}
        >
        <svg viewBox="200 190 1120 530" className="block w-full">
          <g transform={TF} fill="#F3EFE9" stroke="none">
            <path d="M5676 8148 c-236 -75 -375 -115 -453 -128 l-73 -13 0 -42 0 -41 92
            -12 c60 -7 101 -18 117 -30 52 -39 51 -23 49 -1214 l-3 -1107 -30 -31 c-32
            -33 -74 -48 -169 -58 l-61 -7 -3 -47 -3 -48 515 0 516 0 0 45 c0 50 9 46 -125
            64 -94 13 -125 33 -142 87 -8 29 -12 373 -12 1337 l-1 1297 -32 -2 c-17 -1
            -99 -24 -182 -50z"/>
            <path d="M9705 8160 c-66 -21 -166 -54 -223 -74 -56 -20 -159 -46 -228 -59
            l-125 -22 3 -45 3 -45 85 -6 c98 -7 123 -17 147 -62 17 -30 18 -111 21 -1284
            l2 -1253 37 0 c25 0 69 17 139 54 l102 54 83 -28 c278 -95 525 -37 735 174 94
            95 154 184 200 296 165 406 56 946 -219 1079 -142 69 -312 58 -492 -32 -33
            -16 -72 -38 -87 -48 -14 -11 -29 -19 -33 -19 -4 0 -6 306 -3 680 3 607 2 680
            -12 679 -8 0 -69 -17 -135 -39z m453 -1419 c81 -41 154 -164 187 -311 22 -101
            31 -361 16 -471 -39 -294 -149 -439 -332 -439 -75 0 -124 13 -156 43 l-23 20
            0 552 0 552 23 20 c25 23 58 42 96 54 40 13 146 2 189 -20z"/>
            <path d="M12385 8181 c-303 -112 -425 -151 -547 -176 -25 -5 -28 -10 -28 -44
            l0 -38 75 -6 c91 -8 112 -18 131 -62 20 -48 21 -2316 1 -2355 -7 -14 -31 -34
            -55 -44 -37 -17 -42 -23 -42 -53 l0 -33 400 0 400 0 0 45 c0 25 -4 45 -9 45
            -42 0 -170 24 -188 36 -13 8 -24 28 -27 46 -3 18 -7 618 -9 1334 -2 715 -7
            1306 -11 1312 -10 16 -32 14 -91 -7z"/>
            <path d="M3455 8154 c-145 -19 -196 -30 -305 -60 -284 -80 -475 -191 -668
            -385 -204 -207 -325 -442 -379 -732 -27 -146 -24 -469 6 -607 60 -279 162
            -472 345 -656 221 -220 489 -338 856 -378 312 -34 704 -6 998 70 113 29 321
            98 372 122 l35 17 0 388 0 389 27 23 c25 21 48 27 196 50 l43 7 -3 46 -3 47
            -645 0 -645 0 -3 -46 c-4 -56 2 -59 128 -59 187 0 278 -32 313 -108 21 -45 22
            -61 22 -373 0 -359 2 -350 -64 -369 -70 -21 -217 -40 -311 -40 -468 0 -823
            222 -999 624 -92 209 -126 415 -118 709 8 282 45 451 142 648 56 114 94 169
            179 258 119 124 270 210 442 253 120 30 376 32 504 5 305 -65 497 -244 611
            -567 l37 -105 68 0 69 0 -3 290 c-1 160 -5 314 -8 343 -6 48 -8 52 -33 52 -14
            0 -66 11 -116 25 -90 25 -324 80 -380 89 -16 3 -50 7 -75 11 -25 3 -61 8 -80
            11 -44 7 -514 14 -555 8z"/>
            <path d="M11335 6973 c-176 -22 -334 -91 -436 -192 -98 -96 -113 -176 -55
            -276 43 -73 91 -73 178 -2 65 53 99 112 107 186 6 53 8 57 45 75 48 23 142 24
            190 1 61 -29 70 -59 77 -265 3 -102 5 -187 3 -188 -1 -2 -58 -20 -125 -39
            -278 -78 -449 -200 -538 -383 -35 -73 -36 -77 -36 -195 0 -148 19 -199 100
            -274 133 -120 352 -113 552 19 42 28 79 50 83 50 4 0 10 -17 14 -39 7 -46 66
            -105 115 -116 71 -15 184 38 277 131 77 77 80 97 13 104 -52 6 -76 22 -92 60
            -8 17 -13 203 -17 580 -6 609 -4 596 -68 663 -77 82 -227 120 -387 100z m115
            -1055 c-1 -182 -5 -248 -15 -267 -15 -30 -70 -84 -102 -100 -31 -16 -109 -14
            -147 4 -96 46 -136 246 -77 380 24 55 89 128 136 153 30 15 183 71 198 72 4 0
            7 -109 7 -242z"/>
          </g>
          <g transform={TF} fill="#8FC4E8" stroke="none">
            <path d="M2828 5065 c-239 -45 -425 -190 -529 -410 -54 -116 -74 -215 -72
            -360 3 -217 60 -363 194 -496 135 -136 321 -203 559 -203 172 -1 274 20 395
            79 210 102 328 281 357 542 45 391 -175 745 -518 834 -106 27 -284 33 -386 14z
            m324 -133 c80 -39 121 -85 178 -194 72 -137 93 -241 94 -463 1 -170 -2 -198
            -22 -270 -29 -100 -69 -170 -128 -225 -75 -69 -121 -85 -249 -85 -102 0 -115
            2 -175 31 -125 59 -212 179 -262 360 -30 109 -33 433 -5 534 67 245 195 353
            407 348 85 -3 103 -7 162 -36z"/>
            <path d="M10292 4910 c-51 -32 -74 -76 -69 -137 4 -59 24 -88 74 -109 100 -43
            213 27 213 131 0 48 -31 103 -70 122 -38 19 -110 16 -148 -7z"/>
            <path d="M11390 4911 c-49 -25 -80 -75 -80 -125 0 -108 116 -169 220 -116 53
            27 73 68 68 138 -4 48 -10 60 -41 89 -31 28 -44 33 -85 33 -27 0 -62 -8 -82
            -19z"/>
            <path d="M7611 4636 c-46 -95 -79 -133 -152 -172 -45 -25 -50 -31 -47 -58 2
            -26 8 -32 33 -36 l30 -5 5 -300 c6 -334 6 -335 76 -393 48 -40 117 -56 214
            -50 85 5 156 33 219 88 32 27 33 30 21 60 -7 17 -15 29 -19 27 -114 -63 -241
            -52 -262 24 -4 13 -7 143 -8 288 l-1 263 128 -3 127 -4 3 53 3 52 -125 0 c-89
            0 -127 4 -133 13 -4 6 -10 62 -13 122 -5 110 -5 110 -31 113 -24 3 -30 -4 -68
            -82z"/>
            <path d="M10802 4638 c-49 -105 -76 -137 -151 -177 -74 -39 -81 -65 -22 -81
            21 -5 42 -17 45 -26 3 -9 6 -141 6 -295 0 -259 1 -283 20 -318 42 -83 119
            -121 244 -121 144 0 291 100 247 168 -7 11 -17 9 -52 -9 -67 -35 -150 -33
            -186 4 l-28 27 -3 280 -3 280 123 -3 123 -2 0 50 0 50 -125 5 -125 5 -5 120
            -5 120 -32 3 c-31 3 -33 1 -71 -80z"/>
            <path d="M4990 4494 c-41 -25 -114 -57 -162 -72 -76 -23 -88 -30 -88 -48 0
            -17 8 -24 33 -29 71 -16 67 21 67 -562 0 -591 6 -550 -80 -573 -37 -10 -41
            -14 -38 -38 l3 -26 261 -4 c279 -3 280 -3 268 45 -4 15 -20 22 -71 30 -99 17
            -97 14 -101 226 l-3 182 133 0 c123 0 138 2 201 29 113 47 201 140 247 261 20
            51 23 79 24 185 1 162 -19 217 -108 305 -72 71 -131 95 -236 95 -81 0 -139
            -19 -199 -65 -24 -19 -48 -35 -53 -35 -4 0 -8 29 -8 64 0 36 -4 67 -8 70 -4 2
            -41 -16 -82 -40z m307 -145 c94 -35 143 -148 143 -328 0 -201 -72 -302 -215
            -301 -43 0 -112 27 -133 52 -9 12 -12 78 -10 279 l3 263 40 23 c44 25 123 31
            172 12z"/>
            <path d="M4025 4493 c-33 -20 -103 -51 -155 -69 -83 -28 -95 -35 -95 -55 0
            -19 7 -25 42 -32 34 -6 43 -13 52 -39 16 -45 15 -1011 0 -1041 -15 -28 -25
            -35 -72 -48 -34 -9 -38 -13 -35 -37 l3 -27 270 0 270 0 0 29 c0 29 -2 30 -74
            42 -109 18 -105 12 -109 234 l-3 189 33 -10 c57 -16 190 -11 259 11 177 54
            288 189 311 379 20 163 -19 300 -111 391 -66 66 -128 90 -231 90 -81 0 -118
            -12 -192 -62 -31 -21 -59 -38 -62 -38 -4 0 -6 29 -6 65 0 79 -7 81 -95 28z
            m313 -148 c103 -44 149 -157 140 -347 -9 -187 -74 -273 -206 -273 -49 0 -78 6
            -107 21 l-40 21 0 273 0 273 44 24 c52 27 115 30 169 8z"/>
            <path d="M9307 4491 c-50 -33 -107 -54 -237 -91 -17 -4 -26 -15 -28 -32 -3
            -22 2 -26 40 -34 68 -14 69 -20 66 -325 -3 -294 -2 -291 -69 -311 -33 -9 -39
            -15 -39 -40 l0 -28 250 0 250 0 0 29 c0 25 -5 30 -30 35 -16 3 -43 9 -60 12
            -58 11 -60 21 -60 321 l0 272 29 20 c96 68 243 32 271 -67 5 -20 10 -141 10
            -267 0 -259 -2 -266 -70 -286 -34 -11 -40 -16 -40 -41 l0 -28 246 0 245 0 -3
            33 c-3 30 -6 32 -49 37 -80 10 -77 -5 -81 323 -3 269 -5 295 -24 337 -44 96
            -124 140 -253 140 -89 0 -126 -12 -201 -65 -35 -25 -68 -45 -72 -45 -4 0 -8
            32 -8 70 0 83 -2 84 -83 31z"/>
            <path d="M6925 4485 c-38 -19 -112 -48 -163 -66 -82 -27 -93 -34 -90 -52 2
            -17 12 -23 42 -28 66 -11 66 -11 66 -318 0 -152 -4 -281 -8 -288 -4 -6 -30
            -20 -57 -31 -40 -16 -50 -24 -50 -43 l0 -24 268 -3 268 -2 -3 32 c-3 32 -5 33
            -60 40 -71 9 -96 22 -108 54 -6 14 -10 137 -10 274 l0 249 32 17 c18 9 59 19
            93 21 58 5 78 0 173 -38 45 -19 52 -6 52 109 0 92 0 93 -27 104 -16 6 -57 11
            -93 12 -75 1 -111 -15 -180 -78 l-45 -41 -5 64 c-3 36 -9 66 -15 67 -5 2 -41
            -12 -80 -31z"/>
            <path d="M6128 4500 c-241 -41 -387 -207 -388 -441 0 -208 115 -372 299 -426
            59 -17 198 -23 266 -11 248 43 388 247 355 515 -32 250 -263 408 -532 363z
            m107 -101 c58 -16 117 -82 145 -160 49 -143 35 -381 -28 -463 -95 -123 -249
            -78 -315 91 -27 70 -40 213 -28 306 25 182 102 260 226 226z"/>
            <path d="M8145 4481 c-125 -25 -130 -27 -133 -53 -3 -22 2 -27 28 -33 60 -13
            60 -13 60 -278 0 -278 8 -345 47 -401 46 -66 109 -91 223 -91 106 0 136 9 222
            67 66 44 68 44 68 19 0 -52 85 -98 158 -85 83 15 188 91 180 131 -3 15 -11 17
            -45 15 -33 -3 -44 0 -52 17 -7 13 -11 139 -11 370 l0 351 -24 0 c-29 0 -324
            -58 -337 -66 -5 -3 -9 -16 -9 -29 0 -21 6 -26 41 -31 22 -4 50 -15 62 -24 21
            -18 22 -25 25 -275 3 -290 6 -280 -74 -311 -52 -20 -138 -15 -177 10 -50 33
            -52 48 -55 399 l-3 327 -32 -1 c-18 -1 -90 -13 -162 -28z"/>
            <path d="M10427 4499 c-10 -6 -77 -30 -150 -54 -118 -39 -132 -46 -135 -68 -3
            -21 2 -26 32 -31 65 -12 66 -18 66 -332 0 -310 3 -294 -66 -316 -31 -10 -40
            -18 -42 -40 l-3 -28 245 0 246 0 0 30 c0 32 -3 35 -62 45 -71 11 -68 -6 -68
            421 l0 384 -22 0 c-13 0 -31 -5 -41 -11z"/>
            <path d="M11515 4495 c-15 -10 -198 -73 -292 -101 -7 -2 -13 -12 -13 -22 0
            -15 11 -22 45 -31 69 -17 70 -21 73 -316 3 -300 2 -302 -71 -324 -42 -13 -47
            -18 -47 -43 l0 -28 253 2 252 3 0 30 c0 28 -3 30 -59 41 -35 7 -65 19 -73 30
            -10 14 -13 100 -13 396 0 354 -1 378 -17 377 -10 0 -27 -6 -38 -14z"/>
            <path d="M11971 4480 c-205 -74 -324 -260 -308 -481 12 -155 91 -275 225 -341
            65 -32 70 -33 197 -33 126 0 132 1 200 33 72 34 165 114 165 142 0 9 -6 24
            -13 34 -12 16 -17 15 -71 -18 -71 -43 -105 -50 -197 -44 -150 11 -241 118
            -251 293 l-3 60 235 5 c129 3 241 9 248 13 17 11 16 131 -3 194 -19 65 -76
            125 -140 147 -69 23 -214 21 -284 -4z m179 -82 c50 -26 68 -61 69 -135 l1 -43
            -150 0 c-113 0 -150 3 -150 13 0 22 57 131 78 150 20 18 62 34 92 36 9 1 36
            -9 60 -21z"/>
            <path d="M12705 4491 c-81 -20 -161 -85 -189 -153 -22 -53 -21 -150 3 -197 25
            -48 81 -98 156 -140 158 -88 202 -137 192 -212 -7 -50 -20 -66 -67 -80 -75
            -23 -153 25 -190 116 -22 55 -24 56 -59 53 l-36 -3 0 -109 0 -109 40 -14 c53
            -18 111 -25 225 -25 84 -1 104 3 157 26 106 48 155 120 154 226 0 31 -7 76
            -17 98 -22 56 -106 131 -212 190 -119 65 -162 107 -162 158 0 63 37 94 114 94
            44 0 52 -4 90 -43 22 -23 49 -57 58 -75 15 -27 23 -33 45 -30 l28 3 -3 76 c-6
            121 -13 143 -47 150 -41 9 -243 9 -280 0z"/>
          </g>
        </svg>
        </div>
      )}

      {/* globe mark — scales and travels in lockstep with the film ellipse */}
      {!done && (
        <div
          ref={mark}
          data-intro-plate
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2"
          /* The centring translate alone would leave the globe on the SECTION
             centre — 45.8px BELOW its glyph slot — for every frame between
             first paint and hydration, then jump it up when render(0) lands.
             GLOBE_OFFSET_TRANSFORM seats it correctly in the SSR markup, so
             the first painted frame already equals render(0). It is derived,
             never typed: see components/globe-reveal-geometry.ts.

             Safe against the xPercent note on the lockup below: render() sets
             xPercent, yPercent, x AND y on every call, so whatever GSAP parses
             out of this compound transform at hydration is fully overwritten
             rather than stacked. */
          style={{
            width: MARK_W,
            transformOrigin: "50% 50%",
            transform: `translate(-50%,-50%) ${GLOBE_OFFSET_TRANSFORM}`,
          }}
        >
        <svg viewBox="631 270 265 235" className="block w-full">
          <g transform={TF} fill="#F3EFE9" stroke="none">
            <path d="M7415 7526 c-448 -65 -828 -337 -1004 -717 -134 -291 -133 -674 3
            -954 215 -441 704 -696 1293 -672 254 10 415 48 605 143 138 68 223 128 324
            229 305 303 407 716 278 1126 -130 414 -524 740 -1006 834 -111 22 -377 27
            -493 11z"/>
          </g>
          <g ref={windows} transform={TF} fill="#0E2A47" stroke="none">
            <path d="M7710 7160 l0 -210 51 0 c49 0 241 20 247 25 9 8 -57 140 -104 212
            -51 76 -98 124 -166 166 l-28 17 0 -210z"/>
            <path d="M7493 7308 c-63 -60 -141 -172 -184 -267 -16 -35 -28 -65 -27 -67 5
            -5 197 -24 242 -24 l45 0 -1 73 c0 39 2 113 4 164 2 53 0 89 -6 86 -5 -4 -6
            14 -2 41 9 60 -1 59 -71 -6z"/>
            <path d="M7235 7316 c-89 -34 -175 -80 -231 -121 -55 -42 -134 -116 -134 -126
            0 -4 17 -11 38 -17 20 -5 79 -21 130 -35 85 -24 94 -24 99 -9 21 60 80 174
            127 247 31 47 50 85 43 85 -6 -1 -39 -11 -72 -24z"/>
            <path d="M7960 7335 c0 -3 11 -18 26 -33 45 -48 112 -155 140 -227 16 -38 29
            -71 30 -73 4 -7 264 63 264 70 0 13 -135 120 -202 160 -74 46 -258 119 -258
            103z"/>
            <path d="M8455 6924 c-38 -14 -108 -34 -155 -46 -47 -11 -86 -22 -88 -23 -1
            -1 6 -40 17 -86 19 -79 32 -168 46 -301 l6 -58 215 0 214 0 0 38 c0 59 -35
            210 -67 293 -33 83 -100 209 -111 208 -4 0 -38 -12 -77 -25z"/>
            <path d="M6745 6903 c-60 -88 -124 -311 -125 -430 l0 -63 200 0 c230 0 204
            -15 214 124 3 43 18 130 32 193 14 63 24 116 22 118 -2 1 -48 15 -103 30 -55
            15 -122 36 -150 46 -64 24 -60 25 -90 -18z"/>
            <path d="M7221 6768 c-28 -132 -41 -228 -41 -290 l0 -68 190 0 190 0 0 189 0
            190 -42 5 c-24 3 -88 8 -143 11 -55 3 -110 9 -122 11 -19 5 -22 0 -32 -48z"/>
            <path d="M7980 6810 c-30 -5 -103 -8 -162 -9 l-108 -1 0 -195 0 -195 206 0
            207 0 -7 96 c-6 93 -39 284 -51 304 -3 6 -12 9 -18 9 -7 -1 -37 -5 -67 -9z"/>
            <path d="M6625 6213 c28 -164 77 -301 149 -412 l44 -69 134 51 c73 28 134 51
            135 52 1 0 -9 43 -23 94 -13 52 -30 145 -36 208 l-12 113 -199 0 -198 0 6 -37z"/>
            <path d="M8276 6238 c-3 -7 -7 -44 -10 -83 -5 -63 -45 -257 -61 -296 -5 -13
            13 -23 86 -49 51 -18 116 -45 146 -61 l53 -28 44 62 c77 109 144 262 160 368
            4 24 9 56 12 72 l6 27 -217 0 c-164 0 -217 -3 -219 -12z"/>
            <path d="M7170 6231 c0 -66 46 -328 60 -344 4 -4 51 -1 106 7 54 9 126 17 159
            19 l60 3 3 162 2 162 -195 0 c-116 0 -195 -4 -195 -9z"/>
            <path d="M7710 6081 l0 -159 78 -7 c42 -4 122 -13 176 -21 54 -8 100 -13 101
            -12 12 16 54 271 55 331 l0 27 -205 0 -205 0 0 -159z"/>
            <path d="M7437 5759 c-110 -12 -147 -20 -147 -31 0 -19 72 -154 109 -203 40
            -52 119 -132 145 -147 14 -8 16 13 16 192 l0 200 -27 -1 c-16 -1 -59 -5 -96
            -10z"/>
            <path d="M7710 5571 c0 -110 4 -201 8 -201 33 0 151 116 206 202 38 60 89 159
            84 163 -6 6 -137 24 -215 31 l-83 7 0 -202z"/>
            <path d="M7051 5662 c-134 -54 -134 -52 -59 -104 106 -75 222 -131 312 -152
            l29 -7 -40 48 c-56 68 -83 109 -123 184 l-35 65 -84 -34z"/>
            <path d="M8134 5658 c-28 -62 -106 -177 -150 -222 l-39 -39 35 8 c104 22 247
            94 354 178 l38 30 -26 14 c-21 11 -182 73 -190 73 -2 0 -12 -19 -22 -42z"/>
          </g>
        </svg>
        </div>
      )}

      {/* hero copy — in the DOM from first paint, hidden with opacity only */}
      <div
        ref={copy}
        data-intro-copy
        /* `pointer-events-none` pairs with `opacity-0`: an opacity:0 element is
           still clickable and still tabbable. render() restores it to `auto`
           as the copy fades in, and the CSS in app/(home)/page.tsx restores it
           for the JS-off and reduced-motion paths that never run render(). */
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center opacity-0"
      >
        <p className="mb-6 rounded-full bg-[#0E2A47]/70 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/85">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#FFC800] align-middle" />
          {eyebrow}
        </p>
        <h1 className="max-w-[18ch] text-[clamp(40px,7vw,92px)] font-semibold leading-[0.98] tracking-[-0.03em] text-[#F3EFE9]">
          {headline}
        </h1>
        <p className="mt-7 max-w-[62ch] text-[clamp(14px,1.35vw,17px)] leading-relaxed text-white/85">
          {sub}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#enquiry"
            className="rounded-full bg-[#B70000] px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#9c0000] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#FFC800]"
          >
            Book a free guidance session
          </a>
          <a
            href="#gazetteer"
            className="rounded-full border border-white/50 px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#FFC800]"
          >
            Explore 15 destinations
          </a>
        </div>
        <p className="mt-6 text-[13px] text-white/70">
          No cost, no obligation · 30–45 minutes with an admissions counsellor
        </p>
      </div>
    </section>
  );
}
