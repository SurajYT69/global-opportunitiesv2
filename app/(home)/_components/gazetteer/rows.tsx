"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Plate } from "@/components/ui/plate";
import { DUR, EASE, STAGGER, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { INDEX_DESTINATIONS } from "./data";
import type { Destination } from "./data";
import { NotPublished, Range, SourceMark } from "./marks";

/* ===========================================================================
   THE GAZETTEER — INDEX ROWS
   ---------------------------------------------------------------------------
   Motion owner: Motion (framer-motion) — `layout` on the row, `AnimatePresence`
   on the panel, one shared `layoutId` for the margin plate. ZERO ScrollTrigger
   instances: the gazetteer is the most interaction-heavy section on the page
   and it spends none of the 14-instance allowance. Entry reveals run on
   IntersectionObserver (`whileInView`, once).

   Only transform and opacity animate. The row's height change is carried by
   Framer's layout projection (transform + scale correction), never by an
   animated `height`.

   Reduced motion: <MotionConfig reducedMotion="user"> at the app root disables
   the transform and layout animations, so the expansion is instantaneous and
   every reveal lands on its final, fully visible state.

   SCOPE: the eleven non-anchor destinations. UK, USA, Canada and Australia are
   rendered once, as image cards above this index — never here as well.
   `SourceMark`, `NotPublished` and `Range` moved to `./marks` so the cards and
   the rows cite note 3 and redact an unpublished count identically.
   ======================================================================== */

/** One resting-row data cell. Carries its own label for screen readers. */
function Cell({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "hidden self-center font-mono text-data text-ink tabular-figures sm:block",
        className,
      )}
    >
      <span className="sr-only">{label}: </span>
      {children}
    </span>
  );
}

/** One definition pair inside an expanded micro-spread. */
function Fact({
  label,
  tone = "default",
  className,
  children,
}: {
  label: string;
  tone?: "default" | "cited";
  className?: string;
  children: ReactNode;
}) {
  return (
    <>
      <dt
        className={cn(
          "font-mono text-mono-label uppercase",
          tone === "cited" ? "text-clay" : "text-ink-muted",
          className,
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          "m-0 font-mono text-data text-ink tabular-figures",
          className,
        )}
      >
        {children}
      </dd>
    </>
  );
}

const COLUMN_HEADS = [
  { label: "Destination", span: "sm:col-span-4" },
  { label: "Partners", span: "sm:col-span-2" },
  { label: "Main intake", span: "sm:col-span-2" },
  { label: "Tuition, PG/yr", span: "sm:col-span-2" },
  { label: "Post-study work", span: "sm:col-span-2" },
];

const PANEL_TRANSITION = { duration: DUR.d3, ease: EASE.cubic } as const;
const LAYOUT_TRANSITION = { duration: DUR.d4, ease: EASE.quart } as const;
const ROW_PAD = "px-3 sm:px-4";

/**
 * `sticky` is true when the open row was pinned by a tap, a click or a
 * keyboard focus move — as opposed to being opened by a passing pointer.
 * A pinned row survives `pointerleave`; a hovered one does not.
 *
 * Every transition is a functional update, so no handler can ever read a stale
 * `open`/`sticky` pair — which matters because focus and click arrive as two
 * separate events on the same physical click.
 */
interface IndexState {
  open: string | null;
  sticky: boolean;
}

const CLOSED: IndexState = { open: null, sticky: false };

/* Hover-to-expand is a pointer affordance, not a breakpoint: a 1024px tablet
   with a stylus must not open rows on a passing pointer. Read as an external
   store so the server snapshot is a stable `false` and there is no
   setState-in-effect cascade on mount. */
let hoverMql: MediaQueryList | null = null;
function getHoverMql(): MediaQueryList | null {
  if (typeof window === "undefined") return null;
  hoverMql ??= window.matchMedia("(hover: hover) and (pointer: fine)");
  return hoverMql;
}
function subscribeHover(onChange: () => void): () => void {
  const mql = getHoverMql();
  if (!mql) return () => {};
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getHoverSnapshot = () => getHoverMql()?.matches ?? false;
const getHoverServerSnapshot = () => false;

export function GazetteerRows() {
  const [state, setState] = useState<IndexState>(CLOSED);
  const hoverCapable = useSyncExternalStore(
    subscribeHover,
    getHoverSnapshot,
    getHoverServerSnapshot,
  );

  /** Pointer enters a row: open it, unpinned. Hover always wins. */
  const openByHover = useCallback(
    (slug: string) => {
      if (!hoverCapable) return;
      setState((s) => (s.open === slug ? s : { open: slug, sticky: false }));
    },
    [hoverCapable],
  );

  /** Pointer leaves a row: close it only if it was never pinned. */
  const closeByHover = useCallback(
    (slug: string) => {
      if (!hoverCapable) return;
      setState((s) => (s.open === slug && !s.sticky ? CLOSED : s));
    },
    [hoverCapable],
  );

  /**
   * Click / Enter / Space. A row already open *by hover* is pinned rather than
   * closed — otherwise clicking what you are pointing at would dismiss it.
   */
  const toggle = useCallback((slug: string) => {
    setState((s) =>
      s.open === slug && s.sticky ? CLOSED : { open: slug, sticky: true },
    );
  }, []);

  /** Keyboard focus opens and pins. Focus arriving at an already-open row
      (i.e. the pointer got there first) leaves the pin state alone. */
  const focusIn = useCallback((slug: string) => {
    setState((s) => (s.open === slug ? s : { open: slug, sticky: true }));
  }, []);

  /** Esc collapses the open row; the caller returns focus to its button. */
  const dismiss = useCallback((slug: string) => {
    setState((s) => (s.open === slug ? CLOSED : s));
  }, []);

  return (
    <div>
      {/* Column heads. The resting cells carry their own sr-only labels, so
          this row is furniture and is hidden from assistive technology. */}
      <div
        aria-hidden="true"
        className={cn(
          "hidden grid-cols-12 gap-x-grid-gap border-b border-rule-strong pb-2 sm:grid",
          ROW_PAD,
        )}
      >
        {COLUMN_HEADS.map((head) => (
          <span
            key={head.label}
            className={cn(
              "font-mono text-mono-label uppercase text-ink-muted",
              head.span,
            )}
          >
            {head.label}
          </span>
        ))}
      </div>

      {/* One LayoutGroup so the shared `layoutId` plate is measured across all
          eleven rows' independent <AnimatePresence> trees. */}
      <LayoutGroup>
        <ul className="list-none p-0">
          {INDEX_DESTINATIONS.map(({ destination }, position) => (
            <Row
              key={destination.slug}
              destination={destination}
              position={position}
              isOpen={state.open === destination.slug}
              onToggle={toggle}
              onPointerEnter={openByHover}
              onPointerLeave={closeByHover}
              onFocusIn={focusIn}
              onDismiss={dismiss}
            />
          ))}
        </ul>
      </LayoutGroup>
    </div>
  );
}

interface RowProps {
  destination: Destination;
  /** Position in the rendered index — drives the entry stagger only. */
  position: number;
  isOpen: boolean;
  onToggle: (slug: string) => void;
  onPointerEnter: (slug: string) => void;
  onPointerLeave: (slug: string) => void;
  onFocusIn: (slug: string) => void;
  onDismiss: (slug: string) => void;
}

function Row({
  destination: d,
  position,
  isOpen,
  onToggle,
  onPointerEnter,
  onPointerLeave,
  onFocusIn,
  onDismiss,
}: RowProps) {
  const buttonId = `gz-${d.slug}-toggle`;
  const panelId = `gz-${d.slug}-panel`;
  const button = useRef<HTMLButtonElement>(null);

  const onKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key !== "Escape" || !isOpen) return;
    event.stopPropagation();
    onDismiss(d.slug);
    // Esc collapses the open row and keeps focus on its button.
    button.current?.focus();
  };

  return (
    <motion.li
      layout
      /* Opacity-only entry reveal. A `y` tween on a `layout` component fights
         Framer's projection maths, so the rise is deliberately omitted here
         and kept for the non-layout blocks elsewhere in the chapter. */
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{
        opacity: {
          duration: DUR.d5,
          ease: EASE.quart,
          delay: Math.min(position, 8) * STAGGER.tight,
        },
        layout: LAYOUT_TRANSITION,
      }}
      onPointerEnter={() => onPointerEnter(d.slug)}
      onPointerLeave={() => onPointerLeave(d.slug)}
      onFocus={() => onFocusIn(d.slug)}
      onKeyDown={onKeyDown}
      data-open={isOpen ? "true" : undefined}
      /* No anchor bed here any more: the four anchors are cards above this
         index and never render as rows, so every row is a peer of every other. */
      className="group/row relative border-b border-rule"
    >
      {/* The sienna rule that draws left to right beneath the row on
          hover/focus. CSS scaleX on a pseudo-element stand-in — no JS,
          transform only, nothing translates. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-sienna",
          "scale-x-0 transition-transform duration-320 ease-cubic",
          "group-hover/row:scale-x-100 group-focus-within/row:scale-x-100",
          isOpen && "scale-x-100",
        )}
      />

      <motion.div
        layout="position"
        className={cn(
          "grid grid-cols-1 items-stretch gap-x-grid-gap sm:grid-cols-12",
          ROW_PAD,
        )}
      >
        <h3 className="sm:col-span-4">
          <button
            ref={button}
            type="button"
            id={buttonId}
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => onToggle(d.slug)}
            /* Row height tightened from min-h-16 (64px) to min-h-14 (56px) so
               the index reads denser beneath the cards. Nearest step on the
               spacing scale to the requested ~15%, and still comfortably over
               the 44px minimum touch target. */
            className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 rounded-0 bg-transparent text-left"
          >
            <span className="font-ui text-h4 text-ink">{d.name}</span>
            <span className="flex items-center gap-4">
              {/* Mobile-only echo of the partner count. Hidden from assistive
                  technology — the panel's definition list carries the real,
                  marked-up value at this breakpoint. */}
              <span
                aria-hidden="true"
                className="font-mono text-data text-ink-muted tabular-figures sm:hidden"
              >
                {d.partners ?? "—"}
              </span>
              {/* The expand affordance. Same conditional as the glyph it
                  replaces, and still decorative: `aria-expanded` on the
                  button is what announces open/closed. Inherits `text-sienna`
                  through currentColor. */}
              <span aria-hidden="true" className="flex items-center text-sienna">
                <Icon as={isOpen ? Minus : Plus} size="sm" />
              </span>
            </span>
          </button>
        </h3>

        <Cell label="Partner universities" className="sm:col-span-2">
          {d.partners ? (
            <>
              {d.partners}
              <SourceMark id="partner-universities" />
            </>
          ) : (
            <NotPublished />
          )}
        </Cell>
        <Cell label="Main intake" className="sm:col-span-2">
          {d.intake}
        </Cell>
        <Cell label="Tuition, postgraduate, per year" className="sm:col-span-2">
          {d.tuition ? <Range band={d.tuition} /> : <NotPublished />}
        </Cell>
        <Cell label="Post-study work rights" className="sm:col-span-2">
          {d.work}
        </Cell>
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            layout
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ...PANEL_TRANSITION, layout: LAYOUT_TRANSITION }}
            className={cn(
              "grid grid-cols-1 gap-grid-gap overflow-hidden border-t border-rule-strong pt-6 pb-8 sm:grid-cols-12",
              ROW_PAD,
            )}
          >
            <div className="flex flex-col gap-5 sm:col-span-7">
              <dl className="m-0 grid grid-cols-[minmax(0,9.5rem)_1fr] gap-x-4 gap-y-3">
                {/* Below 768px the resting cells are display:none, so the four
                    core facts live here. Above it they are already set on the
                    row and are not repeated to assistive technology. */}
                <Fact label="Partners" className="sm:hidden">
                  {d.partners ? (
                    <>
                      {d.partners}
                      <SourceMark id="partner-universities" />
                    </>
                  ) : (
                    <NotPublished />
                  )}
                </Fact>
                <Fact label="Main intake" className="sm:hidden">
                  {d.intake}
                </Fact>
                <Fact label="Tuition, PG/yr" className="sm:hidden">
                  {d.tuition ? <Range band={d.tuition} /> : <NotPublished />}
                </Fact>
                <Fact label="Post-study work" className="sm:hidden">
                  {d.work}
                </Fact>

                <Fact label="Primary city">{d.city}</Fact>
                <Fact label="Coordinates">{d.coordinates}</Fact>
                <Fact label="Standard time">{d.utc}</Fact>
                {d.deadline && (
                  <Fact label={d.deadline.label} tone="cited">
                    {d.deadline.value}
                  </Fact>
                )}
              </dl>

              <p className="max-w-prose font-ui text-body text-ink-muted">
                {d.note}
              </p>

              {d.deadline && (
                <p className="max-w-prose font-ui text-body-sm text-ink-muted">
                  That deadline is not ours. It comes from {d.deadline.source},
                  and it is dated in the sources table with everything else.
                </p>
              )}

              <div className="flex flex-col gap-2">
                <a
                  href="#enquiry"
                  data-destination={d.slug}
                  className={cn(
                    "inline-flex min-h-12 w-fit items-center gap-2 rounded-0",
                    "font-ui text-body font-semibold text-ink",
                    "underline decoration-rule-strong decoration-1 underline-offset-[0.3em]",
                    "transition-colors duration-200 ease-quad",
                    "hover:decoration-2 hover:decoration-sienna",
                  )}
                >
                  Talk to a {d.ctaName} counsellor
                  <Icon as={ArrowRight} size="sm" />
                </a>
                {/* Prose, so Hanken — the mono law reserves Plex Mono for
                    verified fact, and letterspaced caps for labels. */}
                <p className="font-ui text-body-sm text-ink-muted">
                  Takes you to the form with {d.selectionLabel} already
                  selected.
                </p>
              </div>
            </div>

            {/* The margin plate. One shared layoutId across all fifteen rows,
                so moving from one destination to the next morphs the plate
                across the index rather than re-mounting it. */}
            <motion.div
              layoutId="gazetteer-plate"
              transition={LAYOUT_TRANSITION}
              className="sm:col-span-4 sm:col-start-9"
            >
              <Plate
                variant="field"
                ratio="16 / 10"
                coordinates={d.coordinates}
                place={d.city}
                time={d.utc}
                caption={d.name}
                captionMeta={
                  d.partners ? `${d.partners} partner universities` : undefined
                }
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
