"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck, ChevronRight, Clock, Phone } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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
   phone lives in the drawer, the bar stays 56px. Desktop header is now
   108px (2.25rem strip + 4.5rem row = 6.75rem) — `main`'s clearance, the
   hero's fold calc and the spine offset all moved with it; grep for
   `6.75rem`/`pt-27`/`top-27` before touching any of them.

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

   Motion (Motion / framer-motion owns pointer + React state):
     - transparent over the hero -> paper + masthead rule past 40px
     - wordmark scales 1 -> 0.92 past 40px (transform only)
     - the chapter spine fills with `--grad-spine-fill` on scrollYProgress
   Every branch lands on a fully visible final state.
   ------------------------------------------------------------------------ */

/** Canon nav items, in canon order, resolved to their section ids. */
const NAV_ITEMS = [
  { label: "Destinations", href: "#gazetteer" },
  { label: "Costs", href: "#reckoning" },
  { label: "Process", href: "#eleven-months" },
  { label: "Counsellors", href: "#contributors" },
  { label: "Offices", href: "#branch-atlas" },
  { label: "For Parents", href: "#for-parents" },
] as const;

/** Canon toll-free number, rendered as text. Mono = verified fact. */
const PHONE_DISPLAY = "1800 111 119";
const PHONE_HREF = "tel:1800111119";

const SCROLL_THRESHOLD = 40;
const MENU_ID = "sticky-nav-menu";

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

  /* The hero is a full-bleed photograph now — the masthead is ALWAYS solid.
     A transparent phase would set ink type over a dark image. */

  return (
    <>
      {/* First focusable on the page. */}
      <a href="#hero" className="skip-link">
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
        {/* THE UTILITY STRIP — md+ only. Solid GO Navy, mono label voice.
            Every item on it is a verified fact (mono law): founding year,
            office count, calling hours, the toll-free number. The phone
            keeps its glyph BESIDE the visible number, never instead. */}
        <div className="hidden bg-endpaper md:block">
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

        {/* THE PAPER ROW. Solid paper at 96%. No backdrop-filter, ever.
            Three-zone composition (2026-08-04): brand lockup flex-1 left,
            nav DEAD CENTRE (shrink-0 between two flex-1 wings), CTA flex-1
            right. 72px tall at md+ — the extra air over the old 64px is
            most of what reads as "professional". */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--paper) 96%, transparent)",
            }}
          />

          <Container
            width="frame"
            className="relative flex h-14 items-center justify-between gap-4 md:h-18"
          >
          {/* Running head — the brand lockup. Wordmark, then a hairline and
              a two-line tracked-caps tagline at lg+ (label voice, not mono:
              it is a noun phrase, not a verified figure). */}
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <a
              href="#hero"
              className="group inline-flex min-h-11 items-center no-underline"
            >
              <motion.span
                style={{ scale: prefersReducedMotion ? 1 : wordmarkScale }}
                className="block origin-left"
              >
                <Image
                  src="/logo.png"
                  alt="Global Opportunities"
                  width={109}
                  height={49}
                  priority
                  className="h-9 w-auto md:h-11"
                />
              </motion.span>
            </a>
            <p className="m-0 hidden self-center hairline-l pl-4 font-ui text-label uppercase text-ink-muted lg:block">
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
              full-width list row has no such underline to lean on. */}
          <nav aria-label="Primary" className="hidden shrink-0 md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active === item.href ? "true" : undefined}
                    className={cn(
                      "group relative inline-flex min-h-11 items-center font-ui text-body-sm font-medium text-ink no-underline transition-colors duration-200 ease-quad hover:text-sienna-press",
                      active === item.href && "text-sienna-press",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 bg-sienna transition-transform duration-200 ease-quad group-hover:scale-x-100 group-focus-visible:scale-x-100",
                        active === item.href && "scale-x-100",
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

            {/* Button already sets `inline-flex items-center gap-2`.
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
                    "absolute left-0 top-0 block h-px w-full bg-ink transition-transform duration-200 ease-quad",
                    open && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 block h-px w-full bg-ink transition-opacity duration-200 ease-quad",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-3 block h-px w-full bg-ink transition-transform duration-200 ease-quad",
                    open && "-translate-y-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
          </Container>
        </div>

        {/* The chapter spine — fills with scroll progress. Rides the
            masthead's bottom edge: 56px row on mobile, strip + row (108px,
            top-27 = 6.75rem) at md+. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-14 md:top-27"
        >
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
