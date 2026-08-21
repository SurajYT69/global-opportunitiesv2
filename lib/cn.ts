import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Class-name joiner.
 *
 * WAS a plain string join, with a deliberate "no tailwind-merge dependency"
 * note: the hand-rolled primitives put consumer `className` last, and the
 * token set was small enough that conflicts were visible in review.
 *
 * That stopped being true on 2026-08-21 when shadcn/ui was adopted for
 * /homev2. Every shadcn component is written against `cn = twMerge(clsx(...))`
 * and relies on it to RESOLVE conflicts, not merely concatenate them: without
 * twMerge, `cn("px-4","px-8")` emits both and CSS source order picks the
 * winner instead of the caller. That silently breaks `className` overrides on
 * every added component.
 *
 * ---------------------------------------------------------------------------
 * WHY THE CONFIG BELOW IS LOAD-BEARING — DO NOT DELETE IT
 *
 * Stock tailwind-merge knows Tailwind's DEFAULT scales, not this one. It reads
 * `text-*` as a colour unless it recognises the value as a size, so a bare
 * twMerge silently ate the SIZE out of every size+colour pair on the page:
 *
 *     twMerge("text-body text-ink-muted")  ->  "text-ink-muted"   // size gone
 *     twMerge("text-figure text-marine")   ->  "text-marine"      // size gone
 *
 * That is most of the page's typography. The `font-size` group below restores
 * all fifteen steps of the Departure Atlas scale as literals, which take
 * precedence over the colour validator. `border-radius` and `max-width` are
 * registered for the same reason — they are custom scales too (`--radius-0/1/
 * 2/pill`, `--container-frame/content/...`), and without them an override
 * cannot win against the base class.
 *
 * If a new `--text-*`, `--radius-*` or `--container-*` token is added to
 * globals.css, add it here in the same commit or overrides of it stop working.
 *
 * The count changed on 2026-08-21: fifteen steps became seven, with the old
 * fifteen kept as aliases. Both sets are registered below.
 * ------------------------------------------------------------------------ */

/**
 * Every `--text-*` step from globals.css §1 — the seven live ones AND the
 * thirteen aliases, because both still resolve to real utilities and both can
 * appear in a `cn()` call during the migration. Order is irrelevant.
 */
const FONT_SIZES = [
  // The seven (2026-08-21).
  "display", "title", "heading", "lede", "body", "small", "label",
  // The alias layer. Delete a name here in the same commit you delete it
  // from globals.css, and not before.
  "d0", "d1", "d2", "h4",
  "deck", "quote", "serif-body",
  "body-sm",
  "figure", "data",
  "mono-label", "caption", "footnote",
] as const;

/** `--radius-*`. Three values: 6px inputs, 12px cards, pill CTA. */
const RADII = ["0", "1", "2", "pill"] as const;

/** `--container-*` bands, mirrored by components/ui/container.tsx. */
const CONTAINERS = ["frame", "content", "serif", "deck"] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...FONT_SIZES] }],
      rounded: [{ rounded: [...RADII] }],
      "max-w": [{ "max-w": [...CONTAINERS] }],
    },
  },
});

export type { ClassValue };

export function cn(...values: ClassValue[]): string {
  return twMerge(clsx(values));
}
