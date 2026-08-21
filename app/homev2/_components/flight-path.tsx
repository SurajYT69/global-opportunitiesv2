"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { createTimeline, svg, utils, type Timeline } from "animejs";
import { TRAIL_GLYPH, zigzag } from "@/lib/flightPath";

/** Scrubbed timeline: the duration is only a unit scale, it is never played. */
const SPAN = 1000;

/**
 * How far the plane flies AHEAD of its own contrail, in the same units.
 *
 * With one duration for both tracks the glyph sits exactly on the draw-front,
 * so it reads as stuck to the end of the dots rather than flying out in front
 * of them. Running the plane over a shorter span makes it lead: at any seek
 * its local progress is t/(SPAN-LEAD), which outruns the trail's t/SPAN.
 *
 * SIZE THIS SMALL. At 90 the plane ran 9% of the page in front of its own
 * draw-front, which over a 10,000px document is nearly a thousand pixels of
 * empty air — the trail stops in one section and the plane is in the next one,
 * and it reads as two unrelated objects rather than one flying thing. 22 keeps
 * the glyph just clear of the last dot, which is all "ahead" needs to mean.
 *
 * Side effect: the plane reaches the end of the path at 98% of the page and
 * holds while the last of the trail catches up.
 */
const LEAD = 22;

/**
 * A small plane that flies a zig-zag down the page as you scroll, drawing a
 * dotted contrail behind it and passing *behind* every card, table and form.
 *
 * PORTED 2026-08-21 from the sibling repo at
 * "D:\Global\global-opportunities by Suraj v2", with two changes.
 *
 * 1. THE TIMELINE IS SCRUBBED FROM gsap.ticker, NOT FROM SCROLL EVENTS.
 *    This took two wrong turns, so the finding is written down.
 *
 *    The source drives the timeline from framer's `useScroll()` with no
 *    target. That emits nothing here. The obvious fix, a plain
 *    window "scroll" listener, ALSO emits nothing here. Measured in the
 *    running page: window.scrollY went to 3600 while a listener on window
 *    AND one on document.scrollingElement both counted ZERO events.
 *
 *    The reason is components/providers/smooth-scroll.tsx. Lenis owns scroll
 *    on this site, it swallows the native event, and it re-emits on its own
 *    emitter — which is how ScrollTrigger stays in sync there
 *    (`lenis.on("scroll", () => ScrollTrigger.update())`). The instance is
 *    local to that effect and is not exported, so nothing outside the
 *    provider can subscribe to it.
 *
 *    Note that `useScroll({ target })` elsewhere on this route (see
 *    ways-we-assist/our-process.tsx) works fine, which is why no other
 *    section ever exposed this. It is specifically window-level scroll
 *    observation that Lenis defeats.
 *
 *    gsap.ticker is the right clock, and it is the one the provider already
 *    drives: it runs Lenis on `autoRaf: false` precisely so the app has ONE
 *    animation loop. Reading scrollY on the tick reads the RESULT of a scroll
 *    rather than an event, so Lenis cannot defeat it, and it early-outs on an
 *    unchanged position so a still page costs one comparison per frame.
 *
 *    A WARNING FOR WHOEVER DEBUGS THIS NEXT, because it cost a long detour.
 *    gsap.ticker is rAF-driven, and CHROME STOPS rAF ENTIRELY IN A HIDDEN TAB.
 *    Measured from a background tab this component looks stone dead: the
 *    plane's transform and the mask's dash never change no matter how far you
 *    scroll, and it is very easy to conclude the ticker is broken or that the
 *    provider's gsap is a different instance. It is not. Check
 *    `document.visibilityState` before believing any of it — a hidden tab
 *    reports `rafFrames: 0` over a second and a half, and the whole thing
 *    springs back the moment the tab is focused.
 *
 *    (The scroll-EVENT finding above is real and unaffected: scroll events are
 *    not visibility-throttled, and they genuinely never arrive.)
 *
 *    `document.body.offsetHeight` is the same box the viewBox is measured
 *    from a few lines below, so progress and geometry cannot disagree.
 *
 * 2. The layer sits at z-index -1 rather than the source's 5.
 *
 * THE Z-INDEX IS THE ONE REAL DIFFERENCE, and it is worth understanding
 * before touching it. The source page gives every section an inner `.wrap`
 * pinned to z-index 10, which lets the trail sit at 5: above the tinted
 * section grounds, below every card. THIS app has no `.wrap` convention —
 * sections compose <Container> — so reproducing that would mean raising the
 * inner content of thirteen sections. Instead the layer is z-index -1 inside
 * the shell's own relative box: it paints behind in-flow content but in front
 * of the shell background, which is the same result for every section that
 * has no background of its own.
 *
 * The consequence is deliberate and not a bug: the tinted bands (proof,
 * offices, enquiry), the dark endpaper CTA plate and the footer all paint
 * their own ground, so the plane disappears behind them and reappears over
 * the white sections. Do NOT "fix" that by raising the z-index — that puts
 * the trail over headings and cards.
 *
 * The shell root must therefore stay `relative` WITHOUT `isolation: isolate`;
 * isolating it would trap the negative layer and hide it entirely.
 *
 * Page-anchored, not viewport-fixed — see the .flightpath block in
 * globals.css §7a for the tuning knobs.
 *
 * Colour, stroke width and plane size come from CSS custom properties, so all
 * of it is tunable without touching this file. Note that `var()` does not work
 * in SVG presentation attributes, which is why the paints live in CSS classes
 * rather than on `fill` / `stroke` here.
 */
export function FlightPath() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<Timeline | null>(null);
  /** 0..1 down the document. Survives a rebuild so a resize does not jump. */
  const progress = useRef(0);

  useEffect(() => {
    const host = root.current;
    if (!host) return;

    const svgEl = host.querySelector("svg");
    const arcs = host.querySelectorAll<SVGPathElement>("path[data-arc]");
    if (!svgEl || arcs.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const build = () => {
      // Measured off body's own box, which excludes this out-of-flow layer, so
      // a resize can never feed back into the observer.
      const w = document.body.clientWidth;
      const h = document.body.offsetHeight;
      if (w === 0 || h === 0) return;

      // viewBox 1:1 with CSS pixels: uniform scale, so the plane glyph, stroke
      // widths and dash pattern stay undistorted at any viewport or page length.
      svgEl.setAttribute("viewBox", `0 0 ${w} ${h}`);
      const d = zigzag(w, h);
      for (const p of arcs) p.setAttribute("d", d);

      // Both the motion path and the drawable cache path geometry, so the
      // timeline has to be rebuilt whenever `d` changes.
      tl.current?.revert();
      tl.current = null;

      const [maskLine] = svg.createDrawable("#gp-mask");

      // Accessibility basics are not up for simplification: with reduced motion
      // the trail is simply drawn in full, the plane parked at the end, and the
      // scroll subscription does no work.
      if (reduced) {
        utils.set(maskLine, { draw: "0 1" });
        const [x, y, deg] = endOfPath(host);
        utils.set("#gp-plane", { translateX: x, translateY: y, rotate: deg });
        return;
      }

      const { translateX, translateY, rotate } = svg.createMotionPath("#gp-route");
      tl.current = createTimeline({ autoplay: false })
        .add(maskLine, { draw: ["0 0", "0 1"], ease: "linear", duration: SPAN }, 0)
        .add(
          "#gp-plane",
          { translateX, translateY, rotate, ease: "linear", duration: SPAN - LEAD },
          0,
        );
      tl.current.seek(SPAN * progress.current);
    };

    /** Clamped so a rubber-band overscroll cannot seek past the timeline. */
    const readProgress = () => {
      const max = document.body.offsetHeight - window.innerHeight;
      if (max <= 0) return 0;
      return Math.min(1, Math.max(0, window.scrollY / max));
    };

    /** Cheap guard: seeking an unchanged timeline every frame is wasted work. */
    let last = -1;
    const onTick = () => {
      const p = readProgress();
      if (p === last) return;
      last = p;
      progress.current = p;
      tl.current?.seek(SPAN * p);
    };

    progress.current = readProgress();
    build();
    // With reduced motion there is no timeline to scrub — build() parks the
    // plane at the end of the path and returns.
    if (!reduced) gsap.ticker.add(onTick);

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(build);
    });
    ro.observe(document.body);

    return () => {
      gsap.ticker.remove(onTick);
      ro.disconnect();
      cancelAnimationFrame(raf);
      tl.current?.revert();
      tl.current = null;
    };
  }, []);

  return (
    <div className="flightpath" ref={root} aria-hidden="true">
      {/* viewBox and every `d` are generated in the effect from the page box */}
      <svg preserveAspectRatio="none">
        <defs>
          {/*
            A fat solid stroke that anime.js `draw` animates. Masking the
            contrail with it is what gives a dotted trail that still draws on:
            `draw` owns stroke-dasharray, so it cannot coexist with the dots on
            the same path.
          */}
          <mask id="gp-reveal">
            <path
              id="gp-mask"
              data-arc
              fill="none"
              stroke="#fff"
              strokeWidth={40}
              strokeLinecap="round"
            />
          </mask>
        </defs>

        {/* motion path only — never painted */}
        <path id="gp-route" data-arc fill="none" stroke="none" />

        {/* dash patterns are --trail-dash / --haze-dash in CSS, with the rest
            of the tuning knobs, rather than attributes here */}
        <g mask="url(#gp-reveal)">
          {/* soft haze, so the trail still reads where it crosses busy ground */}
          <path data-arc className="trail-haze" />
          {/* the crisp dotted contrail */}
          <path data-arc className="trail-line" />
        </g>

        {/* unmasked — the glyph is the leading edge of the reveal */}
        <g id="gp-plane" className="plane">
          <g className="plane-glyph">
            <path d={TRAIL_GLYPH} />
          </g>
        </g>
      </svg>
    </div>
  );
}

/** Endpoint transform for the reduced-motion resting state. */
function endOfPath(host: HTMLElement): [number, number, number] {
  const path = host.querySelector<SVGPathElement>("#gp-route");
  if (!path) return [0, 0, 0];
  const len = path.getTotalLength();
  const end = path.getPointAtLength(len);
  const just = path.getPointAtLength(Math.max(0, len - 1));
  const deg = (Math.atan2(end.y - just.y, end.x - just.x) * 180) / Math.PI;
  return [end.x, end.y, deg];
}
