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
import { CalendarCheck, ChevronRight, Phone } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Rule } from "@/components/ui/rule";
import { cn } from "@/lib/cn";
import { DUR, EASE, MQ } from "@/lib/motion";

/* ---------------------------------------------------------------------------
   SECTION 1 · `sticky-nav-v2` — THE RUNNING HEAD, /homev2 VARIANT
   Chapter: — (persistent chrome)

   A COPY of the home page's sticky-nav, not an edit of it. The live home page
   keeps the original untouched; only /homev2 imports this one.

   FORKED FROM commit 5887f75, when the original lived at
   `components/sections/sticky-nav.tsx`. It now lives at
   `app/(home)/_components/sticky-nav.tsx` AND HAS BEEN REDESIGNED SINCE
   (+179/-53: two-tier header, scroll-spy nav, shorter CTA, masthead rule
   removed, h-14/md:h-18 instead of h-14/md:h-16). This fork has NOT been
   rebased onto that redesign, so /homev2 currently differs from / in the
   masthead as well as the hero. Re-fork before trusting the comparison.

   WHAT DIFFERS, AND WHY

   1. IT IS TRANSPARENT OVER THE HERO FILM, and solidifies to the canon cream
      bar once the hero has scrolled past. The original is always solid — its
      own comment records why ("a transparent phase would set ink type over a
      dark image"), and that reasoning is answered here rather than ignored:
      every foreground colour swaps in lockstep with the surface, so ink type
      never lands on the film. Over the film the palette is plate-white on
      navy; past it, the original ink-on-cream returns unchanged.

      The reason it has to be transparent HERE is the reveal: an opaque 56/64px
      strip cuts the frame at exactly the moment the ellipse is trying to fill
      the viewport, which reads as a rendering bug rather than a masthead.

   2. THE WORDMARK IS HELD BACK THROUGH THE INTRO, then fades in as the hero
      opens — the mark "lands" in the corner. This exists because the intro
      puts the GO lockup, huge, in the centre of the viewport, and a second
      copy of the same lockup sitting above it for 1.5s is avoidable.

      NO STATE IS THREADED between this component and GlobeReveal. This reads
      the same public signal GlobeReveal writes — the `go-hero-intro-seen`
      sessionStorage key — and nothing else. See the constants below for the
      one cost of that independence.

   The nav items, the phone-as-text rule, the CTA, the drawer, the focus trap
   and the scroll lock are all carried over unchanged.

   MOTION SAFETY. The hold is expressed with the canon `.reveal` class, so it
   inherits both existing backstops: `<noscript>` in layout.tsx forces it
   visible with JS off, and the reduced-motion block in globals.css forces it
   visible with motion off. Neither path can strand the wordmark at opacity 0.
   ------------------------------------------------------------------------ */

/** Canon nav items, in canon order, resolved to their section ids. */
const NAV_ITEMS = [
  /* ROUTES, NOT ANCHORS (Aug 2026). Every entry here used to be an in-page
     anchor, because the whole site was one page. The split moved those
     sections onto their own routes and left six hash links pointing at ids
     that no longer exist anywhere — the masthead silently did nothing on
     every page of the site.

     "Counsellors" and "Offices" both resolve to /offices, which carries the
     branch atlas and the counsellor list; the anchor keeps them distinct
     rather than shipping the same href twice. */
  { label: "Destinations", href: "/destinations" },
  { label: "Costs", href: "/costs" },
  { label: "Process", href: "/how-it-works" },
  { label: "Counsellors", href: "/offices#contributors" },
  { label: "Offices", href: "/offices" },
  { label: "For Parents", href: "/for-parents" },
] as const;

/** Canon toll-free number, rendered as text. Mono = verified fact. */
const PHONE_DISPLAY = "1800 111 119";
const PHONE_HREF = "tel:1800111119";

const SCROLL_THRESHOLD = 40;
const MENU_ID = "sticky-nav-menu";

/* --- the GlobeReveal handshake ------------------------------------------
   Both constants below are DUPLICATED from components/GlobeReveal.tsx
   (`INTRO_KEY`, and the 1.5s `duration` on the progress tween). That
   duplication is the price of not coupling the two components, and it is
   deliberate — but it is also the one thing here that can silently drift.
   If the intro's length or key changes, these must follow.
   ---------------------------------------------------------------------- */
const HERO_INTRO_KEY = "go-hero-intro-seen";
const HERO_INTRO_MS = 3000;

/** The section the masthead floats over. Set by app/homev2/page.tsx. */
const HERO_ID = "hero";

/** Masthead height, matching `h-14 md:h-16` (Tailwind `md` is 1024px here). */
const NAV_H = { base: 56, md: 64 } as const;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function StickyNavV2() {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const wordmarkScale = useTransform(scrollY, [0, SCROLL_THRESHOLD], [1, 0.92], {
    clamp: true,
  });

  /* --- surface state ----------------------------------------------------
     `onFilm` is true while the masthead overlaps the hero. It starts true
     because /homev2 always opens at the top of the hero; a restored mid-page
     scroll corrects it on the first measurement below. Starting it false
     instead would flash a cream bar across the first frame of the intro,
     which is the exact artefact this variant exists to remove.
     ------------------------------------------------------------------- */
  const [onFilm, setOnFilm] = useState(true);
  const filmEnd = useRef(0);

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById(HERO_ID);
      const navH = window.matchMedia(MQ.md).matches ? NAV_H.md : NAV_H.base;
      filmEnd.current = hero ? Math.max(hero.offsetHeight - navH, 0) : 0;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- seeded from
      // a DOM measurement; the hero's height has no render-time source.
      setOnFilm(filmEnd.current > 0 && window.scrollY < filmEnd.current);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll updates run through Motion's own listener, never a raw effect, so
  // the read stays batched with the rest of the page's scroll work.
  useMotionValueEvent(scrollY, "change", (y) => {
    setOnFilm(filmEnd.current > 0 && y < filmEnd.current);
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

      <header
        id="sticky-nav"
        className={cn(
          "fixed inset-x-0 top-0",
          open ? "z-[var(--z-drawer)]" : "z-[var(--z-nav)]",
        )}
      >
        {/* Solid paper at 96%. No backdrop-filter, no glass, ever — over the
            film it is simply absent, never blurred. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-14 transition-opacity duration-200 ease-quad md:h-16",
            solid ? "opacity-100" : "opacity-0",
          )}
          style={{
            backgroundColor: "color-mix(in srgb, var(--paper) 96%, transparent)",
          }}
        />

        <Container
          width="frame"
          className="relative flex h-14 items-center justify-between gap-4 md:h-16"
        >
          {/* Running head — wordmark.
              `.reveal` holds it at opacity 0 until the effect above releases
              it; the noscript and reduced-motion backstops both force it
              visible, so JS-off and motion-off users never lose the mark.
              Both lockups are stacked and cross-faded rather than swapped on
              `src`, which would fire a network request mid-scroll. */}
          <div className="flex min-w-0 items-baseline gap-4">
            <a
              href={`#${HERO_ID}`}
              className="group inline-flex min-h-11 items-center no-underline"
            >
              <span ref={logoScope} data-intro-logo className="reveal block">
                <motion.span
                  style={{ scale: prefersReducedMotion ? 1 : wordmarkScale }}
                  className="relative block origin-left"
                >
                  <Image
                    src="/logo.png"
                    alt="Global Opportunities"
                    width={109}
                    height={49}
                    priority
                    className={cn(
                      "h-9 w-auto transition-opacity duration-200 ease-quad md:h-10",
                      solid ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <Image
                    src="/logo-light.webp"
                    alt=""
                    aria-hidden="true"
                    width={149}
                    height={49}
                    priority
                    className={cn(
                      "absolute left-0 top-0 h-9 w-auto transition-opacity duration-200 ease-quad md:h-10",
                      solid ? "opacity-0" : "opacity-100",
                    )}
                  />
                </motion.span>
              </span>
            </a>
          </div>

          {/* Desktop nav — 1024px and up.
              No glyphs on these six: the affordance is already the hairline
              that swells under the word on hover/focus. Over the film that
              hairline goes plate-white, because sienna on navy is the one
              pairing in the palette that fails contrast. */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "group relative inline-flex min-h-11 items-center font-ui text-body-sm no-underline transition-colors duration-200 ease-quad",
                      solid
                        ? "text-ink hover:text-sienna-press"
                        : "text-plate-white hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 transition-transform duration-200 ease-quad group-hover:scale-x-100 group-focus-visible:scale-x-100",
                        solid ? "bg-sienna" : "bg-plate-white",
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-4 lg:gap-6">
            {/* Phone as text, with an icon beside it — never instead of it.
                Real tel: anchor, works with JS off. `sm` because the number is
                set in mono; the glyph inherits whichever colour the surface
                currently calls for. */}
            <a
              href={PHONE_HREF}
              aria-label={`Call Global Opportunities on ${PHONE_DISPLAY}`}
              className={cn(
                "hidden min-h-11 items-center gap-2 font-mono text-data no-underline transition-colors duration-200 ease-quad md:inline-flex",
                solid
                  ? "text-marine hover:text-sienna-press"
                  : "text-plate-white hover:text-white",
              )}
            >
              <Icon as={Phone} size="sm" />
              {PHONE_DISPLAY}
            </a>

            {/* GO Red carries itself on both surfaces — the one element here
                that needs no variant. Button already sets `inline-flex
                items-center gap-2`. */}
            <Button
              href="#enquiry"
              size="sm"
              className="max-sm:hidden"
              onClick={() => setOpen(false)}
            >
              <Icon as={CalendarCheck} />
              Book a free guidance session
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

        {/* Masthead rule (0.25rem --rule-strong) + the chapter spine. Both are
            ink-side furniture and go with the cream — over the film the top
            edge of the frame is the only rule there should be. */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-14 transition-opacity duration-200 ease-quad md:top-16",
            solid ? "opacity-100" : "opacity-0",
          )}
        >
          <Rule weight="masthead" />
          <motion.div
            className="h-0.5 w-full origin-left"
            style={{
              scaleX: scrollYProgress,
              backgroundImage: "var(--grad-spine-fill)",
            }}
          />
        </div>

        {/* The drawer. Sole blurred shadow on the page is permitted here. */}
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
              <p className="mt-2 font-mono text-caption uppercase text-ink-muted">
                30 min · free · no obligation
              </p>
              <p className="mt-1 font-mono text-caption uppercase text-ink-muted">
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
