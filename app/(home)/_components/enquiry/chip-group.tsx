"use client";

import { useId } from "react";
import { Check, CircleAlert } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import type { IconComponent } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { ChipOption } from "./data";

/**
 * A tap-chip group set as a ruled form block.
 *
 * - Native `<input type="radio">` inside a `<fieldset>` with a real `<legend>`,
 *   so arrow-key traversal, grouping semantics and JS-off rendering all come
 *   free. The radio is `sr-only`; its focus ring is forwarded to the visible
 *   chip with the canon recipe (2px --sienna-press, 2px offset) because the
 *   ring would otherwise be painted on a zero-size box.
 * - Selected chip = `--sienna-tint` well + `--sienna-press` keyline (canon),
 *   plus a tick that fades in. The tick is a THIRD signal, not the signal:
 *   the radio's own checked state is what AT reads, and it is untouched. The
 *   tick's box is reserved whether or not it is showing, so selecting one
 *   never reflows the grid.
 * - Every chip is >=48px tall.
 */
export interface ChipGroupProps {
  name: string;
  /** Tracked-caps legend — the visible label. Never a placeholder. */
  legend: string;
  /** Leading glyph beside the legend. Decorative — the legend is the name. */
  icon?: IconComponent;
  options: readonly ChipOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  /** Caption beneath the legend; joined into aria-describedby. */
  hint?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

const COLUMNS: Record<2 | 3 | 4, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 xs:grid-cols-3",
  4: "grid-cols-2 xs:grid-cols-3 sm:grid-cols-4",
};

const CHIP =
  "flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2 border " +
  "border-rule bg-paper px-4 py-3 text-center font-ui text-body-sm text-ink " +
  "transition-colors duration-200 ease-quad hover:border-rule-strong hover:bg-paper-laid " +
  "peer-checked:border-sienna-press peer-checked:bg-sienna-tint " +
  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 " +
  "peer-focus-visible:outline-sienna-press";

export function ChipGroup({
  name,
  legend,
  icon,
  options,
  value,
  onChange,
  error,
  hint,
  columns = 4,
  className,
}: ChipGroupProps) {
  const uid = useId();
  const errorId = `${uid}-error`;
  const hintId = `${uid}-hint`;

  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <fieldset
      className={cn("m-0 min-w-0 border-0 p-0", className)}
      aria-describedby={describedBy}
    >
      {/* The span carries the flex row: `display` on a <legend> itself is
          still the one box UAs reserve the right to override. */}
      <legend className="p-0 font-ui text-label uppercase text-ink-muted">
        <span className="flex items-center gap-2">
          {icon && <Icon as={icon} size="sm" />}
          {legend}
        </span>
      </legend>

      {hint && (
        <p id={hintId} className="mt-2 font-ui text-body-sm text-ink-muted">
          {hint}
        </p>
      )}

      <div className={cn("mt-4 grid gap-2", COLUMNS[columns])}>
        {options.map((option) => {
          const id = `${uid}-${option.value}`;
          const selected = value === option.value;
          return (
            <div key={option.value} className="relative">
              <input
                type="radio"
                id={id}
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <label htmlFor={id} className={CHIP}>
                <Icon
                  as={Check}
                  size="sm"
                  className={cn(
                    "transition-opacity duration-200 ease-quad",
                    selected ? "opacity-100" : "opacity-0",
                  )}
                />
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-3 flex items-start gap-2 font-ui text-body-sm text-clay"
        >
          <Icon as={CircleAlert} size="sm" className="mt-0.5" />
          {error}
        </p>
      )}
    </fieldset>
  );
}
