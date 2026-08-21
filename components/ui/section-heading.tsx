import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Chapter opener / section head.
 *
 * Order of parts, top to bottom:
 *   eyebrow    the `label` step, tracked caps, --ink-faint
 *   headline   Source Serif 4 400, --fs-title, balanced
 *   deck       Geist 400, --fs-lede, max 52ch
 *
 * ---------------------------------------------------------------------------
 * THE CHAPTER DEVICE WAS RETIRED (2026-08-20, client: "clean modern not
 * cluttered").
 *
 * Every section used to open with THREE stacked lines before it said anything:
 * a chapter stamp ("02 · EXPLORE" in tracked marine caps), an eyebrow ("THE
 * FOUR ANCHOR DESTINATIONS" in tracked ink caps), and only then the headline.
 * Two tracked-caps preambles in a row is the single loudest editorial-magazine
 * tell on the page, repeated at the top of all eight sections — the reader met
 * it before every heading and had to step over it every time.
 *
 * `chapter` and `chapterName` are STILL ACCEPTED and are now ignored. Every
 * call site passes an `eyebrow` as well (verified across all eight sections),
 * so nothing lost a label and no section file had to change. The props stay in
 * the signature so this was a one-file edit and so a future decision to bring
 * the device back has somewhere to land — delete them only when you are also
 * editing the call sites.
 *
 * RHYTHM, NOT A UNIFORM GAP. The old stack used one `gap-4` between every
 * part, which set the eyebrow, the headline and the deck at equal distance and
 * flattened the hierarchy. The eyebrow now sits close to the headline it
 * introduces, and the deck sits further from it, so the group reads as one
 * heading with a lede rather than three separate lines.
 * ---------------------------------------------------------------------------
 *
 * UPPERCASE IS NOW ONE ROLE (2026-08-21). The eyebrow is the `label` step and
 * that step IS the tracked-caps role — there is no longer a second, third and
 * fourth place caps are legal. Captions, footnotes, helper text, stamps and
 * strip labels are all sentence case now. Never headlines, never CTAs.
 *
 * The heading is `title`, in the display serif. `d1` and `d2` both alias to
 * it, so the h2/h3 distinction is semantic only — it no longer changes size.
 */

export interface SectionHeadingProps {
  /** @deprecated Accepted and ignored — the chapter device was retired. */
  chapter?: string;
  /** @deprecated Accepted and ignored — the chapter device was retired. */
  chapterName?: string;
  /** Tracked-caps label above the headline. The section's only preamble. */
  eyebrow?: string;
  /** Lede beneath the headline. Capped at 52ch. */
  deck?: ReactNode;
  /** `h2` for chapter openers (--fs-d1), `h3` for section heads (--fs-d2). */
  as?: "h2" | "h3";
  /** `dark` recolours for the `endpaper` chapter. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  /** Applied to the heading element itself, for in-page anchors. */
  id?: string;
  className?: string;
  headingClassName?: string;
  children: ReactNode;
}

export function SectionHeading({
  eyebrow,
  deck,
  as: Heading = "h2",
  tone = "light",
  align = "left",
  id,
  className,
  headingClassName,
  children,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <header
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-label uppercase",
            dark ? "text-plate-grey" : "text-ink-faint",
          )}
        >
          {eyebrow}
        </p>
      )}

      <Heading
        id={id}
        className={cn(
          "text-balance font-display text-title",
          dark ? "text-plate-white" : "text-ink",
          headingClassName,
        )}
      >
        {children}
      </Heading>

      {deck && (
        <p
          className={cn(
            "mt-5 max-w-deck text-lede",
            align === "center" && "mx-auto",
            dark ? "text-plate-grey" : "text-ink-muted",
          )}
        >
          {deck}
        </p>
      )}
    </header>
  );
}
