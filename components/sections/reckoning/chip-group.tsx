"use client";

import { Circle, CircleCheck } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

/**
 * A tap-chip group that is a real radio group underneath: `<fieldset>`,
 * `<legend>`, and native `<input type="radio">` inputs sharing a `name`.
 *
 * That buys arrow-key navigation, a single tab stop per group, correct
 * announcement of "3 of 5", and a form that would still submit with JavaScript
 * disabled — none of which a div-with-role-radio reimplementation gets for free.
 *
 * The input is `sr-only`; the visible chip is its `<label>`, so the focus ring
 * is mirrored onto the label with `has-[:focus-visible]`. Same 2px sienna ring,
 * same 2px offset as the global rule — the values are the canon token, quoted,
 * not a new one.
 */
export interface ChipOption<T extends string> {
  value: T;
  label: string;
  /** Mono sub-label: partner counts, durations, example cities. */
  meta?: string;
}

export interface ChipGroupProps<T extends string> {
  /** Radio group name. Must be unique on the page. */
  name: string;
  legend: string;
  options: readonly ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function ChipGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  className,
}: ChipGroupProps<T>) {
  return (
    <fieldset className={cn("m-0 min-w-0 border-0 p-0", className)}>
      <legend className="mb-3 p-0 font-ui text-label uppercase text-ink-muted">
        {legend}
      </legend>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex min-h-11 cursor-pointer flex-col justify-center gap-0.5 rounded-2 border px-4 py-2",
                "transition-colors duration-200 ease-quad",
                selected
                  ? "border-sienna-press bg-sienna-tint"
                  : "border-rule bg-paper hover:border-rule-strong",
                "has-[:focus-visible]:[outline:2px_solid_var(--sienna-press)]",
                "has-[:focus-visible]:[outline-offset:2px]",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {/* The mark is decoration: the native radio already announces
                  checked state, so it stays aria-hidden and takes no label.
                  Both glyphs are the same box, so selecting never reflows the
                  row — and it sits inside the coloured span, so it inherits
                  the chip's own ink rather than naming a colour. */}
              <span
                className={cn(
                  "flex items-center gap-2 font-ui text-body-sm font-semibold",
                  selected ? "text-ink" : "text-ink-muted",
                )}
              >
                <Icon as={selected ? CircleCheck : Circle} size="sm" />
                {option.label}
              </span>
              {option.meta && (
                /* `pl-6` = the mark's 16px box plus its 8px gap, so the
                   sub-label hangs under the chip's word, not under the mark. */
                <span className="pl-6 font-mono text-mono-label uppercase text-ink-muted tabular-figures">
                  {option.meta}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
