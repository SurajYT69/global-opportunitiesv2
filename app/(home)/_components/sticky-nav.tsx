"use client";

import {
  AnimatePresence,
  motion,
  useAnimate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { CalendarCheck, ChevronRight, Clock, Phone } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO_KEY, INTRO_MS } from "@/components/globe-reveal-geometry";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { DUR, EASE, MQ } from "@/lib/motion";

/* ---------------------------------------------------------------------------
   SECTION 1 · `sticky-nav` — THE RUNNING HEAD
   Chapter: — (persistent chrome)

   Canon: wordmark, six nav items, phone as TEXT, `Book a free guidance
   session` pill. Surface is solid `--paper` at 96% — there is NO
   backdrop-filter anywhere on this page, including here. (The 0.25rem
   masthead rule was removed 2026-08-04 by client request.)

   TWO-TIER MASTHEAD (2026-08-04, client: "more professional"). At md+ a
   36px GO Navy utility strip rides ABOVE the paper row: Est. 2001 and the
   office count left; hours and the phone right, all in the mono label
   voice (verified facts — mono law). The PHONE MOVED UP into the strip at
   md+ — still text, glyph beside it, never instead (the rule that
   mattered survives) — which declutters the paper row down to wordmark /
   nav / CTA. Below md the strip does not render and nothing changes: the
   phone lives in the drawer, the bar stays 56px.

   ONLY THE PAPER ROW STICKS (client, same day). The strip lives in normal
   flow outside <header> and scrolls away; the header itself is `sticky
   top-0`, so `main` carries NO clearance padding — both tiers occupy real
   space. Past 40px of scroll the row steps down 72px -> 56px at md+, the
   size change carried by Framer's layout projection (transform), never a
   raw height animation. The spine hangs at `top-full`, so no other file
   hard-codes the header height.

   SCROLL-SPY (same date). An IntersectionObserver watches the six nav
   targets through a band around the upper-middle of the viewport; the
   section under the band keeps its nav item inked (sienna, underline
   held open) with `aria-current`. Plain React state + the CSS the
   underline already had — no ScrollTrigger spent, the budget stands.

   ICONS (2026-08-04): Lucide is now canon site-wide, but only through
   `<Icon>` (see `components/ui/icon.tsx` for the stroke/size/colour pins). The
   phone rule survives intact in the form that mattered: the number is still
   TEXT and a glyph sits BESIDE it, never instead of it. Every glyph here has
   a visible word next to it, so every glyph here is decorative and unlabelled.

   -------------------------------------------------------------------------
   TRANSPARENT OVER THE HERO FILM (2026-08-20). Merged back from the
   `components/homev2/sticky-nav-v2` fork when the v2 hero was promoted to `/`;
   that file is gone and this is again the only masthead in the codebase.

   The fork existed because GlobeReveal is a full-bleed film: an opaque
   56/72px strip cuts the frame at exactly the moment the ellipse is trying
   to fill the viewport, which reads as a rendering bug rather than a
   masthead. The old comment here — "a transparent phase would set ink type
   over a dark image" — is answered rather than ignored: every foreground
   colour swaps in lockstep with the surface, so ink type never lands on the
   film. Over the film the palette is plate-white on navy; past it, the
   original ink-on-cream returns unchanged.

   THE TWO-TIER FLOW SURVIVED THE MERGE. The fork was `fixed`; this is still
   `sticky`, with the strip still in normal flow, because that is what lets
   the strip scroll away while the row sticks. The hero is pulled up under
   both tiers by a negative margin in `app/(home)/page.tsx` (`-mt-14
   md:-mt-27`, the at-rest stack height), so the film still starts at the
   viewport top and fills `h-svh` with no navy sliver. Both tiers carry
   `z-[var(--z-nav)]` so they paint over it.

   THE WORDMARK IS HELD BACK THROUGH THE INTRO, then fades in as the hero
   opens — the mark "lands" in the corner. The intro puts the GO lockup,
   huge, in the centre of the viewport, and a second copy of the same lockup
   sitting above it for 1.5s is avoidable. NO STATE IS THREADED between this
   component and GlobeReveal: it reads the same public signal GlobeReveal
   writes — the `go-hero-intro-seen` sessionStorage key — and nothing else.

   MOTION SAFETY. The hold is expressed with the canon `.reveal` class, so it
   inherits both existing backstops: `<noscript>` in layout.tsx forces it
   visible with JS off, and the reduced-motion block in globals.css forces it
   visible with motion off. Neither path can strand the wordmark at opacity 0.
   -------------------------------------------------------------------------

   Motion (Motion / framer-motion owns pointer + React state):
     - transparent over the hero film -> paper past it
     - wordmark scales 1 -> 0.92 past 40px (transform only)
     - the chapter spine fills with `--grad-spine-fill` on scrollYProgress
   Every branch lands on a fully visible final state.
   ------------------------------------------------------------------------ */

/** Canon nav items, in canon order, resolved to their section ids. */
const NAV_ITEMS = [
  { label: "Destinations", href: "#gazetteer" },
  { label: "Costs", href: "#reckoning" },
  { label: "Offices", href: "#branch-atlas" },
  { label: "For Parents", href: "#for-parents" },
] as const;

/** Canon toll-free number, rendered as text. Mono = verified fact. */
const PHONE_DISPLAY = "1800 111 119";
const PHONE_HREF = "tel:1800111119";

const SCROLL_THRESHOLD = 40;
const MENU_ID = "sticky-nav-menu";

/* --- the GlobeReveal handshake ------------------------------------------
   These WERE hand-copied from components/GlobeReveal.tsx, with a note calling
   that the one thing here that could silently drift. They now come from
   components/globe-reveal-geometry.ts, which both this masthead and the hero
   import — so the drift is structurally impossible rather than merely
   documented. Aliased to the old local names so the body below is unchanged.
   ---------------------------------------------------------------------- */
const HERO_INTRO_KEY = INTRO_KEY;
const HERO_INTRO_MS = INTRO_MS;

/** The section the masthead floats over. Set by app/(home)/page.tsx. */
const HERO_ID = "hero";

/** Stuck height of the paper row (`h-14` at every breakpoint once scrolled).
    The film is treated as ending this far above the hero's bottom edge. */
const NAV_STUCK_H = 56;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function StickyNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const wordmarkScale = useTransform(scrollY, [0, SCROLL_THRESHOLD], [1, 0.92], {
    clamp: true,
  });

  // Stuck-state: past the threshold the paper row is riding the top edge
  // (the strip has scrolled away) and steps down 72px -> 56px at md+.
  const [scrolled, setScrolled] = useState(false);

  /* --- surface state ----------------------------------------------------
     `onFilm` is true while the masthead overlaps the hero. It starts true
     because the home page always opens at the top of the hero; a restored
     mid-page scroll corrects it on the first measurement below. Starting it
     false instead would flash a cream bar across the first frame of the
     intro, which is the exact artefact this behaviour exists to remove.

     Measured through getBoundingClientRect rather than offsetTop: the hero is
     pulled up under the masthead by a negative margin, and whether that
     margin collapses through <main> is not worth depending on.
     ------------------------------------------------------------------- */
  const [onFilm, setOnFilm] = useState(true);
  const filmEnd = useRef(0);

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById(HERO_ID);
      const bottom = hero
        ? hero.getBoundingClientRect().bottom + window.scrollY
        : 0;
      filmEnd.current = Math.max(bottom - NAV_STUCK_H, 0);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- seeded from
      // a DOM measurement; the hero's height has no render-time source.
      setOnFilm(filmEnd.current > 0 && window.scrollY < filmEnd.current);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // One scroll listener for both reads, through Motion's own event so the
  // work stays batched with the rest of the page's scroll handling.
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > SCROLL_THRESHOLD);
    setOnFilm(filmEnd.current > 0 && v < filmEnd.current);
  });

  /* An open drawer is a solid cream panel — the masthead above it must match
     it regardless of where the page is scrolled to. */
  const solid = !onFilm || open;

  /* --- the wordmark hold ------------------------------------------------ */
  const [logoScope, animateLogo] = useAnimate<HTMLSpanElement>();

  useEffect(() => {
    const el = logoScope.current;
    if (!el) return;

    // Both branches that make GlobeReveal skip its intro must also skip the
    // hold, or the wordmark would be missing from a hero that is already
    // fully rendered.
    const reduced = window.matchMedia(MQ.reduce).matches;
    /* `seen` is permanently false as of 2026-08-04: the once-per-session gate
       is off by client direction and GlobeReveal now only ever CLEARS this key
       (see its note). The read is kept rather than deleted because it is the
       whole handshake — re-latch the key over there and the hold here starts
       working again with no edit to this file. Reduced motion is the live
       skip path. */
    const seen = sessionStorage.getItem(HERO_INTRO_KEY) !== null;

    const controls =
      reduced || seen
        ? animateLogo(el, { opacity: 1 }, { duration: 0 })
        : animateLogo(
            el,
            { opacity: 1 },
            {
              // Lands just before the intro settles, so the mark arrives with
              // the copy rather than after it.
              delay: HERO_INTRO_MS / 1000 - 0.25,
              duration: DUR.d4,
              ease: EASE.quad,
            },
          );

    return () => controls.stop();
  }, [animateLogo, logoScope]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Scroll-spy: the section under the read-band keeps its nav item inked.
  // The band sits at 30%..40% of the viewport, so exactly one chapter-scale
  // section occupies it at a time; when none of the six targets is in the
  // band (hero, or a section without a nav item), nothing is marked.
  useEffect(() => {
    const targets = NAV_ITEMS.map((item) =>
      document.querySelector<HTMLElement>(item.href),
    ).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) {
            setActive(href);
          } else {
            setActive((prev) => (prev === href ? null : prev));
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Crossing into the desktop layout must never leave a hidden panel trapped.
  useEffect(() => {
    const query = window.matchMedia(MQ.md);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Body scroll lock while the panel is open. Lenis drives the window, so
  // locking the document element stops it too.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const { body } = document;
    const previous = {
      rootOverflow: root.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPadding: body.style.paddingRight,
    };
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      root.style.overflow = previous.rootOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPadding;
    };
  }, [open]);

  // Esc closes; Tab cycles between the trigger and the panel's own controls.
  useEffect(() => {
    if (!open) return;

    const cycle = () => {
      const panel = panelRef.current;
      const inPanel = panel
        ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
        : [];
      const trigger = triggerRef.current;
      return trigger ? [trigger, ...inPanel] : inPanel;
    };

    // Move focus into the panel so the menu is immediately navigable.
    const first = cycle()[1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const items = cycle();
      if (items.length === 0) return;
      const head = items[0];
      const tail = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = active !== null && items.includes(active);

      if (event.shiftKey && (!inside || active === head)) {
        event.preventDefault();
        tail.focus();
      } else if (!event.shiftKey && (!inside || active === tail)) {
        event.preventDefault();
        head.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <>
      {/* First focusable on the page. */}
      <a href={`#${HERO_ID}`} className="skip-link">
        Skip to content
      </a>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="sticky-nav-scrim"
            aria-hidden="true"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.d3, ease: EASE.quad }}
            className="fixed inset-0 z-[var(--z-scrim)] bg-ink/40 md:hidden"
          />
        ) : null}
      </AnimatePresence>

      {/* THE UTILITY STRIP — md+ only, and NOT sticky (client, 2026-08-04):
          it lives in normal flow OUTSIDE the header and scrolls away with
          the page. Every item on it is a verified fact (mono law): founding
          year, office count, calling hours, the toll-free number. The phone
          keeps its glyph BESIDE the visible number, never instead.

          `relative z-[var(--z-nav)]` is load-bearing since the v2 hero: the
          film is pulled up UNDER this row by a negative margin, and an
          unpositioned strip would lose the paint order to the hero's own
          `relative` section. Its navy ground drops away over the film — the
          type is already plate-white/plate-grey, so it reads on both. */}
      <div
        className={cn(
          "relative z-[var(--z-nav)] hidden transition-colors duration-200 ease-quad md:block",
          onFilm ? "bg-transparent" : "bg-endpaper",
        )}
      >
        <Container
          width="frame"
          className="flex h-9 items-center justify-between gap-6"
        >
          <p className="m-0 font-mono text-mono-label uppercase text-plate-grey">
            Est. 2001 · 18 offices across India
          </p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2 font-mono text-mono-label uppercase text-plate-grey">
              <Icon as={Clock} size="sm" />9 AM–9 PM IST
            </span>
            <a
              href={PHONE_HREF}
              aria-label={`Call Global Opportunities on ${PHONE_DISPLAY}`}
              className="inline-flex items-center gap-2 font-mono text-mono-label text-plate-white no-underline transition-colors duration-200 ease-quad hover:text-sienna-on-dark"
            >
              <Icon as={Phone} size="sm" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </Container>
      </div>

      <header
        id="sticky-nav"
        className={cn(
          "sticky top-0",
          open ? "z-[var(--z-drawer)]" : "z-[var(--z-nav)]",
        )}
      >
        {/* THE PAPER ROW — the only sticky chrome. Solid paper at 96% past
            the film; over the film it is simply ABSENT, never blurred (no
            backdrop-filter, ever). Three-zone composition (2026-08-04):
            brand lockup flex-1 left, nav DEAD CENTRE (shrink-0 between two
            flex-1 wings), CTA flex-1 right. 72px tall at rest at md+; once
            stuck it steps down to 56px. The size change is carried by
            Framer's LAYOUT PROJECTION (transform under the hood) — raw
            height animation stays banned. */}
        <motion.div
          layout
          transition={{ duration: DUR.d3, ease: EASE.quart }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 transition-opacity duration-200 ease-quad",
              solid ? "opacity-100" : "opacity-0",
            )}
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--paper) 96%, transparent)",
            }}
          />

          {/* The stuck-state shadow (--shadow-masthead, client 2026-08-04).
              A separate layer faded via OPACITY — box-shadow itself never
              animates, per the transform/opacity-only law. Invisible at
              rest, where the row sits flush against the strip, and over the
              film, where there is no bar for it to be cast by. */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 shadow-masthead transition-opacity duration-200 ease-quad",
              scrolled && solid ? "opacity-100" : "opacity-0",
            )}
          />

          <Container
            width="frame"
            className={cn(
              "relative flex h-14 items-center justify-between gap-4",
              scrolled ? "md:h-14" : "md:h-18",
            )}
          >
          {/* Running head — the brand lockup. Wordmark, then a hairline and
              a two-line tracked-caps tagline at lg+ (label voice, not mono:
              it is a noun phrase, not a verified figure).

              `.reveal` holds the mark at opacity 0 until the effect above
              releases it; the noscript and reduced-motion backstops both
              force it visible, so JS-off and motion-off users never lose it.
              Both lockups are stacked and cross-faded rather than swapped on
              `src`, which would fire a network request mid-scroll. */}
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <a
              href={`#${HERO_ID}`}
              className="group inline-flex min-h-11 items-center no-underline"
            >
              <span ref={logoScope} data-intro-logo className="reveal block">
                <motion.span
                  style={{ scale: prefersReducedMotion ? 1 : wordmarkScale }}
                  className="relative block origin-left"
                >
                  {/* VECTOR, NOT RASTER (2026-08-20). Both marks were bitmaps
                      — logo.png 109x49 and logo-light.webp 149x49 — drawn at
                      up to 134px wide, so they had no resolution headroom: the
                      wordmark rendered visibly soft next to the crisp UI text
                      beside it, and the globe's window cuts turned to mush.
                      They were also DIFFERENT CROPS of the same artwork, so
                      the two states did not register against each other and
                      the wider light mark overflowed the box the narrower dark
                      one sized.

                      Both files are now generated from the vector master at
                      `files/GO-logo-brand-palette.svg` and share one viewBox,
                      so the cross-fade lands pixel-for-pixel and the mark is
                      sharp at any density. `unoptimized` because the image
                      optimizer refuses SVG without `dangerouslyAllowSVG`, and
                      a 12KB vector has nothing to optimize anyway. */}
                  <Image
                    src="/logo.svg"
                    alt="Global Opportunities"
                    width={1120}
                    height={530}
                    priority
                    unoptimized
                    className={cn(
                      "h-9 w-auto transition-opacity duration-200 ease-quad md:h-11",
                      solid ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <Image
                    src="/logo-light.svg"
                    alt=""
                    aria-hidden="true"
                    width={1120}
                    height={530}
                    priority
                    unoptimized
                    className={cn(
                      "absolute left-0 top-0 h-9 w-auto transition-opacity duration-200 ease-quad md:h-11",
                      solid ? "opacity-0" : "opacity-100",
                    )}
                  />
                </motion.span>
              </span>
            </a>
            {/* `border-l` + an explicit colour rather than the `hairline-l`
                utility: the rule has to swap with the surface, and stacking a
                colour utility on top of one that also sets border-color is a
                source-order coin toss. */}
            <p
              className={cn(
                "m-0 hidden self-center border-l pl-4 font-ui text-label uppercase transition-colors duration-200 ease-quad lg:block",
                solid
                  ? "border-[var(--rule)] text-ink-muted"
                  : "border-plate-grey/40 text-plate-grey",
              )}
            >
              Overseas education
              <br />
              consultants
            </p>
          </div>

          {/* Desktop nav — 1024px and up.
              No glyphs on these six: the affordance is already the sienna
              hairline that swells under the word on hover/focus, and six 20px
              strokes in a horizontal rail would out-weigh both it and the
              masthead rule. The drawer rows below DO carry one, because a
              full-width list row has no such underline to lean on.

              Over the film that hairline goes plate-white, because sienna on
              navy is the one pairing in the palette that fails contrast. No
              nav item can be `active` over the film — the hero is not one of
              the six targets — so the inked state is a solid-only concern. */}
          <nav aria-label="Primary" className="hidden shrink-0 md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active === item.href ? "true" : undefined}
                    className={cn(
                      "group relative inline-flex min-h-11 items-center font-ui text-body-sm font-medium no-underline transition-colors duration-200 ease-quad",
                      solid
                        ? "text-ink hover:text-sienna-press"
                        : "text-plate-white hover:text-white",
                      solid && active === item.href && "text-sienna-press",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 transition-transform duration-200 ease-quad group-hover:scale-x-100 group-focus-visible:scale-x-100",
                        solid ? "bg-sienna" : "bg-plate-white",
                        solid && active === item.href && "scale-x-100",
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-4 lg:gap-6">
            {/* The phone moved up to the utility strip at md+ (2026-08-04);
                below md it lives in the drawer. The paper row carries only
                wordmark / nav / CTA now. */}

            {/* GO Red carries itself on both surfaces — the one element here
                that needs no variant. Button already sets `inline-flex
                items-center gap-2`.
                Short form in the masthead only (client, 2026-08-04): the
                canonical "Book a free guidance session" stays on the hero,
                the drawer and every other surface. "Session" is kill-list
                safe; "free counselling" remains banned. */}
            <Button
              href="#enquiry"
              size="sm"
              className="max-sm:hidden"
              onClick={() => setOpen(false)}
            >
              <Icon as={CalendarCheck} />
              Book a free session
            </Button>

            {/* Menu disclosure — below 1024px only.
                Deliberately NOT a Lucide Menu/X swap. These three spans are
                1px rules that morph into the cross on `open`; a Lucide glyph
                would be a 1.5 stroke that pops in and out, losing the morph
                and mismatching every hairline around it. It is icon-only, so
                its accessible name stays on the `aria-label` below. */}
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={open}
              aria-controls={MENU_ID}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => (open ? close() : setOpen(true))}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-0 md:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 block h-px w-full transition-[transform,background-color] duration-200 ease-quad",
                    solid ? "bg-ink" : "bg-plate-white",
                    open && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 block h-px w-full transition-[opacity,background-color] duration-200 ease-quad",
                    solid ? "bg-ink" : "bg-plate-white",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-3 block h-px w-full transition-[transform,background-color] duration-200 ease-quad",
                    solid ? "bg-ink" : "bg-plate-white",
                    open && "-translate-y-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
          </Container>
        </motion.div>

        {/* The chapter spine — fills with scroll progress. `top-full`
            rides the sticky row's bottom edge at every height, rest or
            shrunk, without a hard-coded offset. Ink-side furniture: it goes
            with the cream, because over the film the top edge of the frame
            is the only rule there should be. */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-full transition-opacity duration-200 ease-quad",
            solid ? "opacity-100" : "opacity-0",
          )}
        >
          <motion.div
            className="h-0.5 w-full origin-left"
            style={{
              scaleX: scrollYProgress,
              backgroundImage: "var(--grad-spine-fill)",
            }}
          />
        </div>

        {/* The drawer. One of the page's two permitted blurred shadows —
            the other is the stuck masthead's (--shadow-masthead). */}
        <AnimatePresence>
          {open ? (
            <motion.nav
              key="sticky-nav-panel"
              ref={panelRef}
              id={MENU_ID}
              aria-label="Main menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: DUR.d4, ease: EASE.quart }}
              className="fixed inset-x-0 top-14 max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain bg-paper px-gutter pb-8 pt-6 shadow-drawer md:hidden"
            >
              <p className="font-mono text-mono-label uppercase text-ink-faint">
                Est. Amritsar 2001
              </p>

              {/* Trailing chevron, not a leading one: the row's own hairline
                  is the left edge, and a right-hand mark reads as "this row
                  goes somewhere" without pushing the label off the margin.
                  ChevronRight rather than an arrow — these are jump links
                  inside one page, and the drawer can be opened from anywhere
                  in it, so no vertical direction would be honest. */}
              <ul className="mt-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href} className="hairline-b">
                    <a
                      href={item.href}
                      onClick={close}
                      className="flex min-h-14 items-center justify-between gap-4 font-ui text-h4 text-ink no-underline"
                    >
                      {item.label}
                      <Icon as={ChevronRight} />
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={PHONE_HREF}
                aria-label={`Call Global Opportunities on ${PHONE_DISPLAY}`}
                className="mt-2 flex min-h-14 items-center justify-between gap-4 no-underline"
              >
                <span className="inline-flex items-center gap-3 font-ui text-body text-ink">
                  <Icon as={Phone} />
                  Call
                </span>
                <span className="font-mono text-data text-marine">
                  {PHONE_DISPLAY}
                </span>
              </a>

              <Button href="#enquiry" size="lg" fullWidth onClick={close}>
                <Icon as={CalendarCheck} />
                Book a free guidance session
              </Button>
              <p className="mt-2 font-mono text-caption text-ink-muted">
                30 min · free · no obligation
              </p>
              <p className="mt-1 font-mono text-caption text-ink-muted">
                A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST. No
                fee, no obligation.
              </p>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
