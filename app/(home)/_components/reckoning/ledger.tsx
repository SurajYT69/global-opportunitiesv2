"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  BookOpen,
  Equal,
  HeartPulse,
  House,
  IndianRupee,
  Lock,
  Minus,
  Receipt,
  Stamp,
  Ticket,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { Icon, type IconComponent } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { DUR, DUR_MS, EASE, MQ } from "@/lib/motion";
import type { LedgerView } from "./data";
import type { FigureFormat } from "./format";
import { formatBy, formatRupees } from "./format";

/* ===========================================================================
   THE LEDGER
   ---------------------------------------------------------------------------
   A printed accounting spread, not a calculator widget. Ruled rows, tabular
   figures, a footnote marker on every line, a hairline and then a double rule
   above the total (the accounting convention), and a total that is always a
   range.

   Every figure is in the server HTML at its FINAL value. The odometer animates
   only towards a number that is already there — GO's current site renders
   literal zeros without JS, and that bug is structurally impossible here.
   ======================================================================== */

/* Leading marks for the ruled rows, keyed on the line `id` `data.ts` prints.
   A fallback keeps a new line from rendering a hole. The banned category
   clichés stay banned whatever the library, so flights take a ticket and not
   an aircraft, and tuition takes a book and not a graduation cap. The marks
   are leading only — every figure in this table stays type. */
const LINE_ICON: Record<string, IconComponent> = {
  tuition: BookOpen,
  living: House,
  visa: Stamp,
  ihs: HeartPulse,
  insurance: HeartPulse,
  gic: Lock,
  forex: ArrowLeftRight,
  flights: Ticket,
};

type AnimateFn = (typeof import("animejs/animation"))["animate"];
type CreateScopeFn = (typeof import("animejs/scope"))["createScope"];

interface AnimeModules {
  animate: AnimateFn;
  createScope: CreateScopeFn;
}

/**
 * Client components are server-rendered too, and `useLayoutEffect` warns there.
 * The odometer must run before paint (it overwrites React's final text with the
 * previous value and tweens back), so it cannot be downgraded to `useEffect` in
 * the browser.
 */
const useBeforePaint =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Run `task` when the main thread is free. Returns a canceller. */
function scheduleIdle(task: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(task, { timeout: 2_000 });
    return () => window.cancelIdleCallback(handle);
  }
  const handle = window.setTimeout(task, 1_200);
  return () => window.clearTimeout(handle);
}

function cellFormat(cell: HTMLElement): FigureFormat {
  return cell.dataset.format === "lakh" ? "lakh" : "rupee";
}

/**
 * Rolls every `[data-odometer]` figure inside `root` from its previous value
 * to its current one, once per selection change.
 *
 * Anime.js owns tabular odometers (canon), imported via its subpaths, run
 * inside `createScope({ root })` and torn down with `scope.revert()`. It is
 * fetched on idle after mount so the first chip tap already has it, and it is
 * never fetched at all under reduced motion — where the figures simply are
 * their final values, instantly, because React already rendered them.
 */
function useOdometers(
  rootRef: RefObject<HTMLDivElement | null>,
  selectionKey: string,
) {
  const modulesRef = useRef<AnimeModules | null>(null);
  const previousRef = useRef<Map<string, number>>(new Map());
  const primedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia(MQ.reduce).matches) return;

    let cancelled = false;
    const cancelIdle = scheduleIdle(() => {
      void Promise.all([
        import("animejs/animation"),
        import("animejs/scope"),
      ]).then(([animation, scope]) => {
        if (cancelled) return;
        modulesRef.current = {
          animate: animation.animate,
          createScope: scope.createScope,
        };
      });
    });

    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, []);

  useBeforePaint(() => {
    const root = rootRef.current;
    if (!root) return;

    const cells = Array.from(
      root.querySelectorAll<HTMLElement>("[data-odometer]"),
    );

    const next = new Map<string, number>();
    for (const cell of cells) {
      next.set(String(cell.dataset.odometer), Number(cell.dataset.value));
    }

    const previous = previousRef.current;
    previousRef.current = next;

    // First paint carries the final values already. Never animate on mount:
    // the ledger is user-triggered, never scroll-triggered.
    if (!primedRef.current) {
      primedRef.current = true;
      return;
    }

    const modules = modulesRef.current;
    if (!modules || window.matchMedia(MQ.reduce).matches) return;

    const scope = modules.createScope({ root }).add(() => {
      for (const cell of cells) {
        const id = String(cell.dataset.odometer);
        const to = Number(cell.dataset.value);
        const from = previous.get(id);
        if (from === undefined || from === to) continue;

        const format = cellFormat(cell);
        const row = Math.min(Number(cell.dataset.row ?? 0), 8);
        const state = { value: from };

        cell.textContent = formatBy(format, from);
        modules.animate(state, {
          value: to,
          duration: DUR_MS.d3,
          delay: row * 40,
          ease: "outQuart",
          onUpdate: () => {
            cell.textContent = formatBy(format, state.value);
          },
          onComplete: () => {
            cell.textContent = formatBy(format, to);
          },
        });
      }
    });

    return () => {
      scope.revert();
      // Land on the truth, whatever interrupted us.
      for (const cell of cells) {
        if (!cell.isConnected) continue;
        cell.textContent = formatBy(cellFormat(cell), Number(cell.dataset.value));
      }
    };
  }, [rootRef, selectionKey]);
}

/* --- Pieces -------------------------------------------------------------- */

interface FigureRangeProps {
  id: string;
  row: number;
  low: number;
  high: number;
  format?: FigureFormat;
  className?: string;
}

function FigureRange({
  id,
  row,
  low,
  high,
  format = "rupee",
  className,
}: FigureRangeProps) {
  return (
    <span className={cn("whitespace-nowrap tabular-figures", className)}>
      <span
        data-odometer={`${id}-low`}
        data-value={low}
        data-format={format}
        data-row={row}
      >
        {formatBy(format, low)}
      </span>
      <span className="sr-only"> to </span>
      <span aria-hidden="true"> – </span>
      <span
        data-odometer={`${id}-high`}
        data-value={high}
        data-format={format}
        data-row={row}
      >
        {formatBy(format, high)}
      </span>
    </span>
  );
}

/**
 * Hairline that draws left to right when the ledger re-types.
 *
 * `draw` is false until the reader has actually changed a chip, so the first
 * render — the server HTML, and therefore the JavaScript-disabled document —
 * ships the rule already at `scaleX: 1`. The ledger is user-triggered; nothing
 * here draws because you arrived.
 */
function DrawnRule({
  selectionKey,
  draw,
  delay = 0,
}: {
  selectionKey: string;
  draw: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      key={`${selectionKey}-${delay}`}
      aria-hidden="true"
      initial={draw ? { scaleX: 0 } : false}
      animate={{ scaleX: 1 }}
      transition={{ duration: DUR.d4, ease: EASE.inout, delay }}
      className="h-px w-full origin-left bg-rule-strong"
    />
  );
}

/* --- The ledger ---------------------------------------------------------- */

export interface LedgerProps {
  view: LedgerView;
  /** Changes whenever any chip changes. Drives the odometers and rule draws. */
  selectionKey: string;
  /** "United Kingdom · Master's · Major city" — the table's accessible caption. */
  selectionLabel: string;
}

export function Ledger({ view, selectionKey, selectionLabel }: LedgerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useOdometers(rootRef, selectionKey);

  // Latches the first time a chip actually changes, using React's documented
  // adjust-state-during-render pattern. Until then the rules render already
  // drawn, so the server HTML — and any JavaScript-disabled document — shows a
  // complete ledger.
  const [seenKey, setSeenKey] = useState(selectionKey);
  const [draw, setDraw] = useState(false);
  if (seenKey !== selectionKey) {
    setSeenKey(selectionKey);
    if (!draw) setDraw(true);
  }

  const { lines, scholarship, subtotal, total } = view;
  const scholarshipNoteNumber = lines.length + 1;
  const totalRow = lines.length + 1;

  return (
    <div>
      <div
        ref={rootRef}
        role="region"
        aria-label="Cost ledger"
        aria-live="polite"
        className="rounded-0 border border-rule-strong bg-paper p-5 sm:p-8"
      >
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            {`Estimated cost of one year of study — ${selectionLabel}. Every figure is a range in rupees.`}
          </caption>

          <thead>
            <tr className="border-b border-rule-strong">
              <th
                scope="col"
                className="py-3 pr-4 font-ui text-label uppercase text-ink-muted"
              >
                Item
              </th>
              <th
                scope="col"
                className="py-3 pl-4 text-right font-ui text-label uppercase text-ink-muted"
              >
                <Icon
                  as={IndianRupee}
                  size="sm"
                  className="mr-1.5 align-[-0.24em]"
                />
                Per year · ₹
              </th>
            </tr>
          </thead>

          <tbody>
            {lines.map((line, index) => (
              <tr key={line.id} className="border-b border-rule align-top">
                <th scope="row" className="py-4 pr-4 font-normal">
                  {/* Inline, not flex: the note marker is a superscript and
                      must stay welded to the last word of the label. */}
                  <span className="font-ui text-body text-ink">
                    <Icon
                      as={LINE_ICON[line.id] ?? Receipt}
                      className="mr-2 align-[-0.2em]"
                    />
                    {line.label}
                  </span>
                  {line.native && (
                    /* `pl-7` = the 20px mark plus its 8px gap, so the native
                       gloss hangs under the label and not under the mark. */
                    <span className="mt-1 block pl-7 font-mono text-caption text-ink-muted tabular-figures">
                      {line.native}
                    </span>
                  )}
                </th>
                <td className="py-4 pl-4 text-right">
                  <FigureRange
                    id={line.id}
                    row={index}
                    low={line.band.low}
                    high={line.band.high}
                    className={cn(
                      "font-mono text-data",
                      line.counted ? "text-ink" : "text-ink-muted",
                    )}
                  />
                  {line.tag && (
                    <span className="mt-1 block font-mono text-mono-label uppercase text-ink-muted tabular-figures">
                      {line.tag}
                    </span>
                  )}
                  {!line.counted && (
                    <span className="sr-only">
                      Not added to the total. See the note.
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {/* The subtraction line. Named funders, labelled as examples. */}
            <tr className="border-b border-rule align-top">
              <th scope="row" className="py-4 pr-4 font-normal">
                <span className="font-ui text-body text-ink">
                  {/* The subtraction line gets the accountant's minus. */}
                  <Icon as={Minus} className="mr-2 align-[-0.2em]" />
                  Less: scholarships and bursaries
                </span>
                <span className="mt-1 block pl-7 font-mono text-caption text-ink-muted">
                  {`EXAMPLES · ${scholarship.funders.join(" · ")}`}
                </span>
              </th>
              <td className="py-4 pl-4 text-right">
                <span className="sr-only">Subtracted: </span>
                <FigureRange
                  id="scholarship"
                  row={lines.length}
                  low={scholarship.band.low}
                  high={scholarship.band.high}
                  className="font-mono text-data text-sienna-press"
                />
              </td>
            </tr>
          </tbody>

          <tfoot>
            {/* Hairline, gap, hairline — the accountant's double rule. */}
            <tr>
              <td colSpan={2} className="p-0 pt-4">
                <DrawnRule selectionKey={selectionKey} draw={draw} />
                <div className="h-1" />
                <DrawnRule
                  selectionKey={selectionKey}
                  draw={draw}
                  delay={0.06}
                />
              </td>
            </tr>

            <tr className="align-baseline">
              <th scope="row" className="pt-6 pr-4 font-normal">
                <span className="font-ui text-h4 text-ink">
                  {/* Below the double rule, the mark that means "this is what
                      the column adds up to". */}
                  <Icon as={Equal} className="mr-2 align-[-0.14em]" />
                  Total, one year
                </span>
                <span className="mt-1 block pl-7 font-mono text-caption text-ink-muted">
                  ONE STUDENT · AFTER SCHOLARSHIPS
                </span>
              </th>
              <td className="pt-6 pl-4 text-right">
                <span data-figure className="block font-mono text-figure text-ink">
                  <FigureRange
                    id="total"
                    row={totalRow}
                    low={total.low}
                    high={total.high}
                    format="lakh"
                  />
                </span>
                <span className="mt-2 block font-mono text-caption text-ink-muted tabular-figures">
                  {`${formatRupees(total.low)} – ${formatRupees(total.high)}`}
                </span>
                <span className="mt-1 block font-mono text-caption text-ink-muted tabular-figures">
                  {`BEFORE SCHOLARSHIPS ${formatRupees(subtotal.low)} – ${formatRupees(subtotal.high)}`}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  );
}
