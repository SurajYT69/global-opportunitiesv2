"use client";

import { useReducedMotion } from "framer-motion";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

/* ---------------------------------------------------------------------------
   `mobile-bar` — THE MOBILE BAR
   Chapter: — (persistent chrome), <1024px ONLY.

   Three real anchors — Call · WhatsApp · Book — that work with JavaScript
   disabled. Targets are >=48px (56px here) and the bar is padded above the
   Android gesture inset with env(safe-area-inset-bottom).

   Surface: solid `--paper` at 98% with a top `--rule-strong` hairline.
   No backdrop-filter. WhatsApp is rendered as ink + outline and NEVER in
   WhatsApp green — green means *verified* on this page and the semantic
   must not leak. The WhatsApp glyph inherits currentColor like every other,
   so the brand green cannot re-enter through the icon either.

   ICONS: additive ONLY. Every one of the three keeps its visible word — an
   icon-only bar is the regression this project's research explicitly rejected
   — so all three glyphs are decorative and unlabelled, and the `aria-label`
   on each anchor is unchanged. Sizes are `sm`, not the `md` the convention
   gives links: at 320px each cell is ~91px of content and "WhatsApp" alone
   eats ~62px of it, so a 20px glyph plus its gap would wrap the label.

   Motion: one transform-only entry at ~25% scroll depth, once. Under
   reduced motion the bar is simply present from first paint.
   ------------------------------------------------------------------------ */

/** Canon numbers. `tel:` and `wa.me` are real hrefs, never JS handlers. */
const CALL_HREF = "tel:+918282828215";
const WHATSAPP_NUMBER = "918282828215";

/**
 * Canon default. The enquiry section may pass a message pre-filled from the
 * destination chip the student has already tapped.
 */
const DEFAULT_WHATSAPP_TEXT =
  "Hello Global Opportunities. I would like to book a free guidance session about studying abroad.";

/** Fraction of scrollable depth after which the bar enters. */
const REVEAL_AT = 0.25;

export interface MobileBarProps {
  /** Pre-filled WhatsApp message body. Defaults to the canon line. */
  whatsappText?: string;
}

export default function MobileBar({
  whatsappText = DEFAULT_WHATSAPP_TEXT,
}: MobileBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const measure = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - window.innerHeight;
      setVisible(max <= 0 ? true : window.scrollY / max >= REVEAL_AT);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [prefersReducedMotion]);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <>
      {/* JS-disabled backstop: the three anchors must always be reachable. */}
      <noscript>
        <style>{`#mobile-bar{transform:none!important;visibility:visible!important}`}</style>
      </noscript>

      <nav
        id="mobile-bar"
        role="navigation"
        aria-label="Call, WhatsApp or book a free guidance session"
        className={cn(
          "fixed inset-x-0 bottom-0 z-[var(--z-mobilebar)] hairline-strong-t",
          "transition-[transform,visibility] duration-480 ease-quart md:hidden",
          visible ? "visible translate-y-0" : "invisible translate-y-full",
        )}
        style={{
          backgroundColor: "color-mix(in srgb, var(--paper) 98%, transparent)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <ul className="grid grid-cols-3">
          <li className="flex">
            <a
              href={CALL_HREF}
              aria-label="Call Global Opportunities"
              className="flex min-h-14 w-full items-center justify-center gap-2 px-2 text-center font-ui text-body-sm font-semibold text-ink no-underline"
            >
              <Icon as={Phone} size="sm" />
              Call
            </a>
          </li>
          <li className="flex hairline-l">
            <a
              href={whatsappHref}
              aria-label="Message Global Opportunities on WhatsApp"
              className="flex min-h-14 w-full items-center justify-center gap-2 px-2 text-center font-ui text-body-sm font-semibold text-ink no-underline"
            >
              {/* Generic speech bubble, not the WhatsApp mark: Lucide has no
                  brand glyphs, and a branded one would drag the green with
                  it. Inherits --ink from the anchor. */}
              <Icon as={MessageCircle} size="sm" />
              WhatsApp
            </a>
          </li>
          <li className="flex">
            <a
              href="#enquiry"
              aria-label="Book a free guidance session"
              className="flex min-h-14 w-full items-center justify-center gap-2 bg-sienna-press px-2 text-center font-ui text-body-sm font-semibold text-paper no-underline transition-colors duration-200 ease-quad active:bg-sienna-deep"
            >
              <Icon as={CalendarCheck} size="sm" />
              Book
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
