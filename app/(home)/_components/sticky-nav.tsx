"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck, ChevronRight, Phone } from "lucide-react";
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
        {/* Solid paper at 96%. No backdrop-filter, no glass, ever. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-14 transition-opacity duration-200 ease-quad md:h-16",
            "opacity-100",
          )}
          style={{
            backgroundColor: "color-mix(in srgb, var(--paper) 96%, transparent)",
          }}
        />

        <Container
          width="frame"
          className="relative flex h-14 items-center justify-between gap-4 md:h-16"
        >
          {/* Running head — wordmark */}
          <div className="flex min-w-0 items-baseline gap-4">
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
                  className="h-9 w-auto md:h-10"
                />
              </motion.span>
            </a>
          </div>

          {/* Desktop nav — 1024px and up.
              No glyphs on these six: the affordance is already the sienna
              hairline that swells under the word on hover/focus, and six 20px
              strokes in a horizontal rail would out-weigh both it and the
              masthead rule. The drawer rows below DO carry one, because a
              full-width list row has no such underline to lean on. */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative inline-flex min-h-11 items-center font-ui text-body-sm text-ink no-underline transition-colors duration-200 ease-quad hover:text-sienna-press"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 bg-sienna transition-transform duration-200 ease-quad group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-4 lg:gap-6">
            {/* Phone as text, with an icon beside it — never instead of it.
                Real tel: anchor, works with JS off. `sm` because the number is
                set in mono, and the glyph inherits --marine from the anchor. */}
            <a
              href={PHONE_HREF}
              aria-label={`Call Global Opportunities on ${PHONE_DISPLAY}`}
              className="hidden min-h-11 items-center gap-2 font-mono text-data text-marine no-underline transition-colors duration-200 ease-quad hover:text-sienna-press md:inline-flex"
            >
              <Icon as={Phone} size="sm" />
              {PHONE_DISPLAY}
            </a>

            {/* Button already sets `inline-flex items-center gap-2`. */}
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

        {/* The chapter spine — fills with scroll progress */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-14 md:top-16"
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
