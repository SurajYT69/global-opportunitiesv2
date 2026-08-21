"use client";

import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import { CircleAlert } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import type { IconComponent } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

/**
 * A field set in a book: no box, no fill, no placeholder. A tracked-caps label
 * above, ink on a hairline rule below, and the rule inks up to `--ink` on
 * focus. Errors recolour the rule to `--clay` and are announced with
 * `role="alert"`, wired back to the input through `aria-describedby`.
 *
 * `adornment` renders `+91` as set type beside the caret — it is NOT an input
 * and never becomes one (research-cro.md / canon build note 9).
 *
 * Both glyphs here are decoration on top of a signal that already exists. The
 * error mark sits INSIDE the `role="alert"` sentence and is aria-hidden, so
 * the failure is still carried by the words, by `aria-invalid` and by the
 * described-by wiring — never by the mark or by the clay rule alone.
 */
export interface FieldProps {
  label: string;
  /** Leading glyph beside the label. Decorative — the label is the name. */
  icon?: IconComponent;
  value: string;
  onChange: (value: string) => void;
  name: string;
  type?: "text" | "tel" | "email";
  autoComplete: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  /** Renders the tracked-caps `optional` tag. Required fields get no asterisk. */
  optional?: boolean;
  /** Caption under the rule — what the field is for, in plain words. */
  hint?: string;
  error?: string;
  /** Rendered prefix, e.g. `+91`. Static type, never a field. */
  adornment?: string;
  maxLength?: number;
  className?: string;
}

export function Field({
  label,
  icon,
  value,
  onChange,
  name,
  type = "text",
  autoComplete,
  inputMode,
  optional = false,
  hint,
  error,
  adornment,
  maxLength,
  className,
}: FieldProps) {
  const uid = useId();
  const inputId = `${uid}-input`;
  const hintId = `${uid}-hint`;
  const errorId = `${uid}-error`;

  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={inputId}
        className="flex flex-wrap items-baseline gap-x-3 font-ui text-label uppercase text-ink-muted"
      >
        {icon && <Icon as={icon} size="sm" className="self-center" />}
        <span>{label}</span>
        {optional && (
          <span className="font-mono text-caption text-ink-muted">
            optional
          </span>
        )}
      </label>

      <div
        className={cn(
          "mt-1 flex items-baseline gap-2 border-b transition-colors duration-200 ease-quad",
          error ? "border-clay" : "border-rule",
          "focus-within:border-ink",
        )}
      >
        {adornment && (
          <span className="shrink-0 font-mono text-data text-ink-muted">
            {adornment}
          </span>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          required={!optional}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="min-h-12 w-full rounded-0 border-0 bg-transparent px-0 py-2 font-ui text-body text-ink"
        />
      </div>

      {hint && (
        <p id={hintId} className="mt-2 font-ui text-body-sm text-ink-muted">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-start gap-2 font-ui text-body-sm text-clay"
        >
          <Icon as={CircleAlert} size="sm" className="mt-0.5" />
          {error}
        </p>
      )}
    </div>
  );
}
