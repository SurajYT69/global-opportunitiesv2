import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/* ===========================================================================
   ICON — the single gate every Lucide glyph passes through
   ---------------------------------------------------------------------------
   CANON CHANGE (2026-08-04): the blueprint's "no icon library" rule is
   superseded by an explicit client decision to adopt Lucide site-wide. See
   `design/landing-page-blueprint/01-creative-vision-and-brand.md §3.6` and
   `04-design-system.md §5`, both restated to match.

   The rule that survives is the LOOK, not the ban. A default Lucide glyph is
   a 2px rounded stroke, which is heavier than every rule, keyline and
   crosshair on this page and is exactly what makes an editorial layout read
   as a SaaS template. So no section imports `lucide-react` directly — it
   imports this, which pins:

     stroke        1.5 at md/lg, 1.75 at sm (optical compensation, so a 16px
                   glyph does not disappear next to 1px hairlines)
     size          16 / 20 / 24, matching the type scale's cap heights
     colour        currentColor, always — an icon inherits its label's colour
                   and never introduces one of its own
     a11y          aria-hidden by default. An icon beside a word is decoration.
                   Pass `label` ONLY when the icon is the sole content of a
                   control, which makes it an <img role> with a real name.

   BANNED, unchanged: flags, globes, aircraft, passports, graduation caps,
   handshakes, suitcases. Those were never about the library — they are about
   the category cliché, and adopting Lucide does not license them.
   ======================================================================== */

export type IconSize = "sm" | "md" | "lg";

/** Any Lucide icon component. lucide-react@1 exports these as `LucideIcon`. */
export type IconComponent = LucideIcon;

const PX: Record<IconSize, number> = { sm: 16, md: 20, lg: 24 };

/* Small glyphs need a fractionally heavier stroke to hold their weight beside
   1px rules; large ones need less or they bloom. */
const STROKE: Record<IconSize, number> = { sm: 1.75, md: 1.5, lg: 1.5 };

export interface IconProps {
  /** The Lucide component itself, e.g. `Phone`. */
  as: IconComponent;
  size?: IconSize;
  /**
   * Accessible name. Supply this ONLY when the icon stands alone in a control
   * with no visible text; otherwise the icon is decorative and stays hidden.
   */
  label?: string;
  className?: string;
}

export function Icon({ as: Glyph, size = "md", label, className }: IconProps) {
  const px = PX[size];
  return (
    <Glyph
      width={px}
      height={px}
      strokeWidth={STROKE[size]}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
      /* `shrink-0` so a glyph never squashes inside a flex row, and
         `currentColor` inheritance is left to Lucide's own default. */
      className={cn("inline-block shrink-0", className)}
    />
  );
}
