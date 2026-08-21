"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

/* ===========================================================================
   FAQ TABS — ported 2026-08-21 from 21st.dev's "FAQ tabs", client-selected
   ---------------------------------------------------------------------------
   The source is plain JS with no prop types, no "use client", no ARIA, and
   imports cn from "@/lib/utils". All four are fixed here — this repo is
   strict TS and its cn lives at "@/lib/cn".

   IT WAS RE-SKINNED, NOT PASTED, which is the same call taken for the footer
   CTA band earlier today. Dropped: the gradient-clipped subtitle, the 500x600
   blurred colour bloom behind the header, `text-5xl font-bold`, `rounded-xl`,
   and the gradient tab fill. Those are the exact things this page retired on
   2026-08-21 — see Palette and "Radius and elevation" in CLAUDE.md. Kept: the
   layout, the tab-switch crossfade, the slide-up fill on the active tab, and
   the 45-degree plus-to-cross rotation, because those are what the component
   IS.

   THE TAB ROW MATCHES THE COSTS LEDGER'S FILTER CHIPS on purpose — same
   rounded-full, same border-rule, same bg-marine active state. Two different
   pill-shaped filter rows on one page that look different is worse than
   either one alone.

   ANIMATED HEIGHT IS A KNOWN DEVIATION from the "only transform and opacity"
   rule in Motion. It is the same one already recorded for the shadcn
   Accordion in globals.css §8, and for the same reason: this is a
   click-triggered disclosure, not scroll-driven, so the jank the rule guards
   against does not apply.
   ======================================================================== */

export interface FaqEntry {
  id: string;
  question: string;
  /** One <p> per string. The registry stores answers as paragraph arrays. */
  answer: string[];
}

export interface FaqTabsProps {
  /** Tab key -> visible label, in tab order. */
  categories: Record<string, string>;
  /** Tab key -> that tab's questions. Keys must match `categories`. */
  faqs: Record<string, FaqEntry[]>;
  className?: string;
}

export function FaqTabs({ categories, faqs, className }: FaqTabsProps) {
  const keys = Object.keys(categories);
  const [selected, setSelected] = useState(keys[0]);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* aria-pressed, not role="tablist". These buttons filter a list that
          stays in the same place; they do not switch panels a screen reader
          should announce as tabs, and a half-implemented tablist (no arrow-key
          roving focus) reads worse than plain buttons. */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Object.entries(categories).map(([key, label]) => {
          const active = selected === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(key)}
              className={cn(
                "relative overflow-hidden whitespace-nowrap rounded-full border px-4 py-2 text-body-sm font-medium transition-colors",
                active
                  ? "border-marine text-plate-white"
                  : "border-rule text-ink transition-colors hover:border-rule-strong hover:bg-secondary",
              )}
            >
              <span className="relative z-10">{label}</span>
              {/* initial={false} — WITHOUT IT THE FIRST TAB FLASHES BLANK.
                  The fill enters from y:100%, and the label is white, so on
                  mount the already-selected tab renders white-on-white for
                  the length of the transition. This suppresses the entry
                  animation on first paint only; switching tabs still slides. */}
              <AnimatePresence initial={false}>
                {active && (
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.35, ease: "backIn" }}
                    className="absolute inset-0 z-0 bg-marine"
                  />
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <div className="mt-10 w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {Object.entries(faqs).map(([key, entries]) =>
            selected === key ? (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3"
              >
                {entries.map((entry) => (
                  <FaqRow key={entry.id} entry={entry} />
                ))}
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FaqRow({ entry }: { entry: FaqEntry }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className={cn(
        "rounded-2 transition-colors",
        open ? "bg-muted" : "bg-secondary",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
      >
        <span
          className={cn(
            "text-heading transition-colors",
            open ? "text-ink" : "text-ink-muted",
          )}
        >
          {entry.question}
        </span>
        {/* The glyph goes through the Icon primitive, which pins the stroke
            weight — Lucide's 2px default out-weighs this page's hairlines.
            It is decorative here: the button already has an accessible name
            from the question, and aria-expanded carries the state. */}
        <motion.span
          variants={{ open: { rotate: 45 }, closed: { rotate: 0 } }}
          transition={{ duration: 0.2 }}
          className={cn("shrink-0", open ? "text-ink" : "text-ink-muted")}
        >
          <Icon as={Plus} />
        </motion.span>
      </button>

      <motion.div
        id={panelId}
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="flex flex-col gap-3 px-4 pb-4">
          {entry.answer.map((para, i) => (
            <p key={i} className="text-body text-muted-foreground">
              {para}
            </p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
