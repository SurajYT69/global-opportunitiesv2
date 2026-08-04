"use client";

import { useEffect, useId, useRef } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarCheck,
  Clock,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Plate } from "@/components/ui/plate";
import { Rule } from "@/components/ui/rule";
import { DUR, EASE } from "@/lib/motion";
import { TOLL_FREE, whatsAppHref, type Counsellor } from "./counsellors";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface CounsellorDrawerProps {
  counsellor: Counsellor;
  /** Must be referentially stable. */
  onClose: () => void;
}

/**
 * The contributors' drawer. The cartouche is a shared element: the card's
 * plate carries the same `layoutId`, so the plate itself travels into the
 * drawer rather than a new panel appearing over it.
 */
export function CounsellorDrawer({
  counsellor,
  onClose,
}: CounsellorDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const restoreTo = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreTo?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[var(--z-drawer)] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <motion.button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DUR.d3, ease: EASE.quad }}
        className="absolute inset-0 z-[var(--z-scrim)] block w-full cursor-default bg-ink/35"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        data-lenis-prevent
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: DUR.d4, ease: EASE.quart }}
        /* The ring is suppressed on the panel ITSELF only: it is a container,
           not a control, and it is focused programmatically so the dialog's
           role and name are announced. Every real control inside keeps the
           global focus ring untouched. */
        className="relative z-[var(--z-drawer)] max-h-[92dvh] w-full max-w-[44rem] overflow-y-auto rounded-0 border border-rule-strong bg-paper-still shadow-drawer focus-visible:outline-none"
      >
        <div className="flex items-start justify-between gap-4 p-6 sm:p-8 sm:pb-4">
          <span className="font-mono text-mono-label uppercase text-marine tabular-figures">
            CONTRIBUTOR · {counsellor.destinations.toUpperCase()}
          </span>
          {/* The one icon on this page that is the whole control, so it is the
              one that MUST carry a `label`. The label is the exact string the
              sr-only span used to hold, and it is now the button's only name —
              two names on one control (an aria-label plus sr-only text) would
              have it announced twice. 44px target and the global focus ring
              are untouched. */}
          <button
            type="button"
            onClick={onClose}
            className="-mt-2 -mr-2 flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-2 text-ink-muted transition-colors duration-200 ease-quad hover:text-ink"
          >
            <Icon
              as={X}
              size="md"
              label={`Close details for ${counsellor.name}`}
            />
          </button>
        </div>

        <div className="grid gap-6 px-6 pb-6 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-8 sm:px-8 sm:pb-8">
          <motion.div layoutId={`cartouche-${counsellor.id}`}>
            <Plate
              variant="cartouche"
              initials={counsellor.initials}
              registration="marine"
            />
          </motion.div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3
                id={titleId}
                className="font-display text-d2 opsz-32 text-ink text-balance"
              >
                {counsellor.name}
              </h3>
              <p className="font-mono text-caption uppercase text-ink-muted tabular-figures">
                {`${counsellor.desk.toUpperCase()} · ${counsellor.destinations.toUpperCase()} · ${counsellor.years} YEARS`}
              </p>
            </div>

            <p className="max-w-prose font-ui text-body text-ink-muted">
              {counsellor.bio}
            </p>

            {counsellor.outcome && (
              <div className="flex flex-col gap-1 bg-verdigris-tint p-4">
                {/* The badge the card in the grid carries, so the morph lands
                    on the same mark it left with. */}
                <span className="inline-flex items-center gap-1.5 font-mono text-caption uppercase text-verdigris tabular-figures">
                  <Icon as={BadgeCheck} size="sm" />
                  NAMED IN A PUBLISHED TESTIMONIAL
                </span>
                <span className="font-ui text-body-sm text-ink">
                  {`${counsellor.outcome.student} · ${counsellor.outcome.result}`}
                </span>
              </div>
            )}

            <Rule weight="hairline" />

            {/* The three contact rows each take the glyph for the CHANNEL, at
                the size of the button's own type — `md` on the body-text CTA,
                `sm` on the two body-sm ones. All three sit beside a visible
                label, so all three are decorative and <Button>'s own `gap-2`
                seats them. No brand mark on WhatsApp: Lucide has none, and a
                green one would collide with --verdigris meaning *verified*.
                `data-counsellor` on the primary is untouched. */}
            <div className="flex flex-col gap-3">
              <Button
                href="#enquiry"
                size="md"
                data-counsellor={counsellor.id}
                onClick={onClose}
              >
                <Icon as={CalendarCheck} size="md" />
                {`Book ${counsellor.name}`}
              </Button>
              <div className="flex flex-wrap gap-3">
                <Button href={TOLL_FREE.href} variant="secondary" size="sm">
                  <Icon as={Phone} size="sm" />
                  {`Call ${TOLL_FREE.display}`}
                </Button>
                <Button
                  href={whatsAppHref(counsellor.name)}
                  variant="ghost"
                  size="sm"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon as={MessageCircle} size="sm" />
                  WhatsApp us
                </Button>
              </div>
              <p className="inline-flex items-center gap-2 font-mono text-caption uppercase text-ink-muted tabular-figures">
                <Icon as={Clock} size="sm" />
                30 MIN · FREE · NO OBLIGATION
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
