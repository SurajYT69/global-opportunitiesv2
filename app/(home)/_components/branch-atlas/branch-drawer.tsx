"use client";

import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Rule } from "@/components/ui/rule";
import { DUR, EASE } from "@/lib/motion";
import {
  PHONE_WINDOW,
  TOLL_FREE_LINE,
  WALK_IN_LINE,
  type Station,
} from "./branches";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface PanelProps {
  station: Station;
  onClose: () => void;
}

function Panel({ station, onClose }: PanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  /* Focus management: move focus in on open, trap Tab inside the panel, close
     on Escape, and hand focus back to whatever opened it. */
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

  const multi = station.branches.length > 1;

  return (
    <div className="fixed inset-0 z-[var(--z-drawer)]">
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
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 28 }}
        transition={{ duration: DUR.d4, ease: EASE.quart }}
        /* The ring is suppressed on the panel ITSELF only: it is a container,
           not a control, and it is focused programmatically so the dialog's
           role and name are announced. Every real control inside keeps the
           global focus ring untouched. */
        className="absolute inset-y-0 right-0 z-[var(--z-drawer)] flex h-dvh w-full max-w-[28rem] flex-col overflow-y-auto rounded-0 border-l border-rule-strong bg-paper shadow-drawer focus-visible:outline-none"
      >
        <div className="flex items-start justify-between gap-4 p-6 sm:p-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-mono-label uppercase text-marine tabular-figures">
              {`BRANCH ${station.key}`}
              {station.hq && <span> · HEAD OFFICE</span>}
            </span>
            <h3
              id={titleId}
              className="font-display text-d2 opsz-32 text-ink text-balance"
            >
              {station.city}
            </h3>
            <span className="font-mono text-caption text-ink-muted">
              {station.state}
            </span>
          </div>

          {/* The glyph is the whole control, so it carries the name itself —
              which retires the sr-only twin the ✕ character needed. The
              accessible name is unchanged, verbatim. */}
          <button
            type="button"
            onClick={onClose}
            className="-mt-2 -mr-2 flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-2 text-ink-muted transition-colors duration-200 ease-quad hover:text-ink"
          >
            <Icon as={X} label="Close branch details" />
          </button>
        </div>

        <Rule weight="chapter" />

        <ul className="m-0 flex list-none flex-col p-0">
          {station.branches.map((branch) => (
            <li
              key={branch.name}
              className="flex flex-col gap-3 border-b border-rule px-6 py-5 sm:px-8"
            >
              <h4 className="font-ui text-h4 text-ink">{branch.name}</h4>
              {/* Address and line take a leading mark each. Both glyphs sit
                  inside the element whose colour they should be, so nothing
                  here names a colour of its own. */}
              <address className="flex items-start gap-2 font-ui text-body-sm text-ink-muted not-italic">
                <Icon as={MapPin} size="sm" className="mt-[0.24em]" />
                <span>{branch.address}</span>
              </address>
              <div className="flex flex-col gap-1">
                {/* The mark sits beside the link, never inside it — the
                    underline is the link's own width and stays that way. */}
                <span className="flex w-fit items-center gap-2 text-marine">
                  <Icon as={Phone} size="sm" />
                  <a
                    href={branch.phone.href}
                    className="w-fit font-mono text-data text-marine underline decoration-rule-strong underline-offset-[0.3em] decoration-1 tabular-figures hover:decoration-sienna"
                  >
                    {branch.phone.display}
                  </a>
                </span>
                <span className="font-mono text-caption text-ink-muted">
                  {branch.phone.kind === "direct"
                    ? "DIRECT LINE TO THIS BRANCH"
                    : "NATIONAL LINE · ASK FOR THIS BRANCH"}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 bg-sienna-tint px-6 py-5 sm:px-8">
          <p className="font-display text-quote text-ink">
            {WALK_IN_LINE}
          </p>
          {/* The hours row: the only opening-hours claim on the page, marked. */}
          <p className="flex items-center gap-2 font-mono text-caption text-ink-muted tabular-figures">
            <Icon as={Clock} size="sm" />
            {PHONE_WINDOW}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-3 px-6 py-6 sm:px-8">
          <Button href="#enquiry" size="md" fullWidth onClick={onClose}>
            Book a free guidance session
          </Button>
          <Button
            href={TOLL_FREE_LINE.href}
            variant="secondary"
            size="md"
            fullWidth
          >
            {`Call ${TOLL_FREE_LINE.display}`}
          </Button>
          <p className="font-mono text-caption text-ink-muted tabular-figures">
            NO COST · NO OBLIGATION · 30–45 MIN
          </p>
          {multi && (
            <p className="font-display text-footnote text-ink-muted">
              {`Global Opportunities publishes ${station.branches.length} branches in ${station.city}. Localities are as published; ask the national line for the nearest one.`}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export interface BranchDrawerProps {
  station: Station | null;
  onClose: () => void;
}

export function BranchDrawer({ station, onClose }: BranchDrawerProps) {
  return (
    <AnimatePresence mode="wait">
      {station && (
        <Panel key={station.id} station={station} onClose={onClose} />
      )}
    </AnimatePresence>
  );
}
