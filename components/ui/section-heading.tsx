import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Chapter opener / section head.
 *
 * Order of parts, top to bottom (CANON, retheme 2026-08-04):
 *   chapter index + name     Plex Mono, tracked caps, --marine (marine owns numerals)
 *   eyebrow                  Geist 600, tracked caps, --ink-muted
 *   headline                 Geist 600, --fs-d1 (h2) or --fs-d2 (h3)
 *   deck                     Geist 400 upright, --fs-deck, max 52ch
 *
 * The chapter device is now a zero-padded arabic index ("03 · TRUST"), not a
 * roman numeral — roman numerals read as the editorial/newspaper register the
 * client rejected. Call sites still pass roman ("III"); the mapping happens
 * here so no section file has to change.
 *
 * Letterspaced uppercase is legal here and only here in the heading stack:
 * running heads, captions, data labels, stamps, footnote refs. Never headlines.
 */

/** Roman chapter numerals as authored across the section files. */
const ROMAN_CHAPTER_INDEX: Readonly<Record<string, string>> = {
  I: "01",
  II: "02",
  III: "03",
  IV: "04",
  V: "05",
  VI: "06",
};

/**
 * "III" -> "03". Already-arabic input ("3", "03") is zero-padded too. Anything
 * unrecognised passes through untouched rather than rendering a wrong number.
 */
function chapterIndex(chapter: string): string {
  const key = chapter.trim().toUpperCase();

  const roman = ROMAN_CHAPTER_INDEX[key];
  if (roman) return roman;

  if (/^\d{1,2}$/.test(key)) return key.padStart(2, "0");

  return chapter;
}

export interface SectionHeadingProps {
  /** Chapter numeral in the margin — "I".."VI". Rendered as "01".."06". */
  chapter?: string;
  /** Chapter name — "DREAM", "EXPLORE", "TRUST"… */
  chapterName?: string;
  /** Tracked-caps label above the headline. */
  eyebrow?: string;
  /** Italic lede beneath the headline. Capped at 52ch. */
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
  chapter,
  chapterName,
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
  const hasChapter = Boolean(chapter || chapterName);

  return (
    <header
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {hasChapter && (
        <p
          className={cn(
            "font-mono text-mono-label uppercase tabular-figures",
            dark ? "text-sienna-on-dark" : "text-marine",
          )}
        >
          {chapter && <span>{chapterIndex(chapter)}</span>}
          {chapter && chapterName && <span aria-hidden="true"> · </span>}
          {chapterName && <span>{chapterName}</span>}
        </p>
      )}

      {eyebrow && (
        <p
          className={cn(
            "font-ui text-label uppercase",
            dark ? "text-plate-grey" : "text-ink-muted",
          )}
        >
          {eyebrow}
        </p>
      )}

      <Heading
        id={id}
        className={cn(
          "font-display opsz-chapter text-balance",
          Heading === "h2" ? "text-d1" : "text-d2",
          dark ? "text-plate-white" : "text-ink",
          headingClassName,
        )}
      >
        {children}
      </Heading>

      {deck && (
        <p
          className={cn(
            "font-display text-deck max-w-deck",
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
