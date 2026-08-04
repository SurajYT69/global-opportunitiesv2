/**
 * Number formatting for the ledger. Indian digit grouping everywhere, lakh
 * notation on the total only — because "₹56,03,000" is the accountable figure
 * and "₹56.0 L" is the one a family says out loud.
 *
 * All output is consumed inside `.font-mono` / `[data-figure]` elements, which
 * the base layer forces to `tabular-nums lining-nums slashed-zero`. Nothing
 * reflows while an odometer runs.
 */

const INR = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** "₹9,50,000" — Indian grouping, no paise. */
export function formatRupees(value: number): string {
  return `₹${INR.format(Math.round(value))}`;
}

/** "₹56.0 L" — lakh notation, one decimal. Totals only. */
export function formatLakh(value: number): string {
  return `₹${(value / 100_000).toFixed(1)} L`;
}

export type FigureFormat = "rupee" | "lakh";

export function formatBy(format: FigureFormat, value: number): string {
  return format === "lakh" ? formatLakh(value) : formatRupees(value);
}
