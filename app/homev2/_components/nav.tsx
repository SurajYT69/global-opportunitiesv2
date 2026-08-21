"use client";

import {
  motion,
  useAnimate,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, Phone } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { INTRO_KEY, INTRO_MS } from "@/components/globe-reveal-geometry";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet";
import { cn } from "@/lib/cn";
import { DUR, EASE, MQ } from "@/lib/motion";

/* ===========================================================================
   MASTHEAD — /homev2
   ---------------------------------------------------------------------------
   ONE TIER. The canon masthead on `/` runs two: a navy utility strip (Est.
   2001 · offices · hours · phone) above a sticky paper row. That strip is four
   facts nobody reads before they have decided to care, and it is the single
   biggest piece of furniture above the fold. It is gone here; the same facts
   live in the proof strip and the footer, where they are actually read.

   HEIGHT IS A CONTRACT. 56px (h-14) at every breakpoint. home-shell pulls the
   hero up by exactly -3.5rem to sit the film under it. Change NAV_H and change
   that margin in the same commit, or a navy sliver appears above the film.

   SURFACE. Transparent while it overlaps the hero film, solid --background
   the moment it clears it. No backdrop-filter — there is none anywhere on this
   site, deliberately.

   THE WORDMARK HOLD is a handshake with GlobeReveal: the hero animates the
   logo out of its own lockup, so this one must not appear until that lands.
   Both constants come from globe-reveal-geometry.ts, which is now the single
   source for them — this file is the reason they were moved there, since it
   would otherwise have been the third hand-copy.
   ======================================================================== */

/** Stuck height of the bar. home-shell's `-mt-14` must equal this. */
const NAV_H = 56;

/** The section the masthead floats over. Set by home-shell. */
const HERO_ID = "hero";

const NAV_ITEMS = [
  { label: "Destinations", href: "#destinations" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Costs", href: "#costs" },
  { label: "Offices", href: "#offices" },
  { label: "Questions", href: "#faq" },
] as const;

/** Canon toll-free number, rendered as TEXT. An icon may sit beside it, never
    replace it. */
const PHONE_DISPLAY = "1800 111 119";
const PHONE_HREF = "tel:1800111119";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  /* `onFilm` is true while the masthead overlaps the hero. It STARTS true
     because the page always opens at the top of the hero; a restored mid-page
     scroll corrects it on the first measurement. Starting it false would flash
     a cream bar across the first frame of the intro, which is the exact
     artefact this behaviour exists to remove. */
  const [onFilm, setOnFilm] = useState(true);
  const filmEnd = useRef(0);

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById(HERO_ID);
      const bottom = hero
        ? hero.getBoundingClientRect().bottom + window.scrollY
        : 0;
      filmEnd.current = Math.max(bottom - NAV_H, 0);
      // Seeded from a DOM measurement — the hero's height has no render-time
      // source, so this cannot be lifted out of the effect.
      setOnFilm(filmEnd.current > 0 && window.scrollY < filmEnd.current);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollY, "change", (v) => {
    setOnFilm(filmEnd.current > 0 && v < filmEnd.current);
  });

  /* An open drawer is a solid panel, so the bar above it must match it
     regardless of where the page is scrolled to. */
  const solid = !onFilm || open;

  /* --- the wordmark hold ------------------------------------------------ */
  const [logoScope, animateLogo] = useAnimate<HTMLSpanElement>();

  useEffect(() => {
    const el = logoScope.current;
    if (!el) return;

    /* Both branches that make GlobeReveal skip its intro must also skip the
       hold, or the wordmark would be missing from a hero that is already
       fully rendered. `seen` is permanently false as of 2026-08-04 (the
       once-per-session gate is off and GlobeReveal only ever CLEARS the key);
       the read is kept because it is the whole handshake. */
    const reduced = window.matchMedia(MQ.reduce).matches;
    const seen = sessionStorage.getItem(INTRO_KEY) !== null;

    const controls =
      reduced || seen
        ? animateLogo(el, { opacity: 1 }, { duration: 0 })
        : animateLogo(
            el,
            { opacity: 1 },
            {
              duration: DUR.d4,
              ease: EASE.quad,
              /* Land a beat before the intro finishes, so the two wordmarks
                 cross rather than hand off with a gap. */
              delay: INTRO_MS / 1000 - 0.25,
            },
          );

    return () => controls.stop();
  }, [animateLogo, logoScope]);

  const linkBase =
    "text-body-sm no-underline transition-colors duration-200 ease-quad";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-200 ease-quad",
        solid ? "bg-background" : "bg-transparent",
      )}
    >
      <Container className="flex h-14 items-center justify-between gap-4">
        {/* --- wordmark ---------------------------------------------------
            Vector, via next/image with `unoptimized`: the image optimizer
            refuses SVG without dangerouslyAllowSVG, and a vector has nothing
            to optimize. NEVER go back to a raster wordmark — that is what made
            it look blurry beside the UI text.

            Two files, one shared viewBox, so the cross-fade registers
            pixel-for-pixel. `.reveal` holds it at opacity 0 until the effect
            above runs; the INTRO_CSS skip rule outranks that class, so a
            reduced-motion or JS-off visitor sees it immediately. */}
        <a href="#hero" className="flex shrink-0 items-center no-underline">
          <motion.span
            ref={logoScope}
            data-intro-logo
            className="reveal relative block"
          >
            <Image
              src="/logo.svg"
              alt="Global Opportunities"
              width={1120}
              height={530}
              priority
              unoptimized
              className={cn(
                "h-8 w-auto transition-opacity duration-200 ease-quad",
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
                "absolute left-0 top-0 h-8 w-auto transition-opacity duration-200 ease-quad",
                solid ? "opacity-0" : "opacity-100",
              )}
            />
          </motion.span>
        </a>

        {/* --- desktop nav ------------------------------------------------ */}
        <nav
          aria-label="Sections"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                linkBase,
                solid
                  ? "text-ink-muted hover:text-ink"
                  : "text-plate-white/80 hover:text-plate-white",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* The number stays visible TEXT at md+. The icon is decoration
              beside it and carries no label. */}
          <a
            href={PHONE_HREF}
            className={cn(
              linkBase,
              "hidden items-center gap-2 font-mono tabular-figures md:inline-flex",
              solid
                ? "text-ink-muted hover:text-ink"
                : "text-plate-white/80 hover:text-plate-white",
            )}
          >
            <Icon as={Phone} size="sm" />
            {PHONE_DISPLAY}
          </a>

          <Button href="#enquiry" size="sm" className="max-lg:hidden">
            Book a free guidance session
          </Button>

          {/* --- mobile ---------------------------------------------------- */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-1 lg:hidden",
                  solid ? "text-ink" : "text-plate-white",
                )}
              >
                {/* Sole content of a control, so it MUST carry a label. */}
                <Icon as={Menu} size="md" label="Open menu" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full max-w-sm">
              <SheetHeader>
                <SheetTitle className="text-h4">Menu</SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Sections"
                className="flex flex-col gap-1 px-4 pb-4"
              >
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="rounded-1 px-3 py-3 text-body text-ink no-underline hover:bg-muted"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 font-mono text-body-sm text-ink-muted no-underline tabular-figures"
                >
                  <Icon as={Phone} size="sm" />
                  {PHONE_DISPLAY}
                </a>
                <SheetClose asChild>
                  <Button href="#enquiry" fullWidth>
                    Book a free guidance session
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
