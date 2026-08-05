import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ===========================================================================
   SOURCES & METHODS REGISTRY
   ---------------------------------------------------------------------------
   THE MONO LAW (review-blocking): IBM Plex Mono is reserved for verified fact.
   Every mono figure on the page carries a superscript that resolves HERE.
   A 404ing footnote does more damage than no footnote.

   Every entry needs an owner and a last-verified date. Insertion order sets
   the superscript number, so the six canonical stats stay 1..6 — append new
   entries, never splice.
   ======================================================================== */

export interface Source {
  /** What the page claims, as displayed. */
  claim: string;
  /** The footnote text itself. Canon copy — do not paraphrase. */
  note: string;
  /** Where the figure comes from. */
  origin: string;
  /** External citation, if the source is third-party. */
  href?: string;
  /** Who is accountable for re-verifying this. */
  owner: string;
  /** ISO year-month of the last verification. */
  lastVerified: string;
}

export const SOURCES = {
  founded: {
    claim: "EST. 2001, AMRITSAR · 25 YEARS",
    note: "Founded 2001 in Amritsar by Sidharth Gupta. Twenty-five years to 2026.",
    origin: "About page",
    owner: "GO Editorial",
    lastVerified: "2026-08",
  },
  "students-placed": {
    claim: "40,000+ STUDENTS PLACED",
    note: "The most conservative and most frequently published of GO's own figures. Larger claims elsewhere on GO's older pages are withdrawn pending audit. Last verified Aug 2026.",
    origin: "/our-services/, /what-we-do-10-ways/",
    owner: "GO Editorial",
    lastVerified: "2026-08",
  },
  "partner-universities": {
    claim: "700+ PARTNER UNIVERSITIES",
    note: "Formal institutional partner agreements. Country split: USA 150+, UK 80+, Canada 60+, Australia 45+, Germany 30+, New Zealand 30+, Ireland 20+, Singapore 7. Last verified Aug 2026.",
    origin: "Homepage, /partner-universities/",
    owner: "GO Editorial",
    lastVerified: "2026-08",
  },
  destinations: {
    claim: "15 DESTINATIONS",
    note: "Australia, USA, UK, New Zealand, Canada, Europe, Ireland, Dubai, Germany, Switzerland, Singapore, Malaysia, Italy, France, Spain.",
    origin: "/study-destinations/",
    owner: "GO Editorial",
    lastVerified: "2026-08",
  },
  offices: {
    claim: "OFFICES ACROSS INDIA, NAMED AND ADDRESSED",
    note: "Every branch below is listed with a street address and a phone number. We publish the number we can name.",
    origin: "Footer branch list",
    owner: "GO Editorial",
    lastVerified: "2026-08",
  },
  testimonials: {
    claim: "47 PUBLISHED TESTIMONIALS",
    note: "40 named students and 7 partner institutions, each published with name and, where given, university and counsellor.",
    origin: "Testimonial sitemap",
    owner: "GO Editorial",
    lastVerified: "2026-08",
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof SOURCES;

const ORDER = Object.keys(SOURCES) as SourceId[];

/** 1-based superscript number. Derived from insertion order. */
export function sourceNumber(id: SourceId): number {
  return ORDER.indexOf(id) + 1;
}

export function getSource(id: SourceId): Source {
  return SOURCES[id];
}

/** Every registered source, in marker order. For the colophon's Sources table. */
export function allSources(): { id: SourceId; n: number; source: Source }[] {
  return ORDER.map((id, index) => ({ id, n: index + 1, source: SOURCES[id] }));
}

export const footnoteRefId = (id: SourceId) => `fnref-${id}`;
export const footnoteId = (id: SourceId) => `fn-${id}`;

/* ===========================================================================
   COMPONENTS
   ======================================================================== */

export interface FootnoteProps {
  id: SourceId;
  /**
   * Only the page's canonical citation surface (the colophon strip) renders
   * primary markers. A source may be cited from several sections, but only the
   * primary marker carries the `fnref-*` anchor id the Sources table
   * back-links to — otherwise the page ships duplicate DOM ids.
   */
  primary?: boolean;
  className?: string;
}

/**
 * The superscript marker. Sits immediately after the figure it qualifies.
 *
 *   40,000+<Footnote id="students-placed" />
 *
 * Rendered as a real in-page anchor so it works with JavaScript disabled and
 * carries its own accessible name.
 */
export function Footnote({ id, primary = false, className }: FootnoteProps) {
  const source = SOURCES[id];
  if (!source) return null;
  const n = sourceNumber(id);

  return (
    <sup className={cn("align-super leading-none", className)}>
      <a
        id={primary ? footnoteRefId(id) : undefined}
        /* Cross-page, not page-relative: the sources table lives once, on
           /costs. A bare `#fn-*` would resolve to nothing on every other
           page of the site. */
        href={`/costs#${footnoteId(id)}`}
        aria-label={`Footnote ${n}: ${source.note}`}
        className="font-mono text-[0.62em] text-sienna-press no-underline tabular-figures hover:underline"
      >
        {n}
      </a>
    </sup>
  );
}

export interface FootnoteDefinitionProps {
  id: SourceId;
  /** `dark` recolours for the `endpaper` chapter. */
  tone?: "light" | "dark";
  className?: string;
}

/** One resolved footnote. Used by the marginalia rail and the colophon table. */
export function FootnoteDefinition({
  id,
  tone = "light",
  className,
}: FootnoteDefinitionProps) {
  const source = SOURCES[id];
  if (!source) return null;
  const n = sourceNumber(id);
  const dark = tone === "dark";

  return (
    <li
      id={footnoteId(id)}
      className={cn(
        "font-display text-footnote",
        dark ? "text-plate-grey" : "text-ink-muted",
        className,
      )}
    >
      <a
        href={`#${footnoteRefId(id)}`}
        aria-label={`Back to reference ${n}`}
        className={cn(
          "font-mono text-[0.72em] no-underline tabular-figures hover:underline",
          dark ? "text-sienna-on-dark" : "text-sienna-press",
        )}
      >
        {n}
      </a>{" "}
      {source.note}{" "}
      <span className="font-mono text-caption uppercase opacity-70 tabular-figures">
        {source.origin} · verified {source.lastVerified}
      </span>
    </li>
  );
}

export interface FootnoteListProps {
  /** Defaults to every registered source, in marker order. */
  ids?: SourceId[];
  tone?: "light" | "dark";
  /** Visually hidden heading text for the list landmark. */
  label?: string;
  className?: string;
}

/** The marginalia rail's contents at >=1024px; the colophon's Sources table. */
export function FootnoteList({
  ids = ORDER,
  tone = "light",
  label = "Sources and methods",
  className,
}: FootnoteListProps) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex list-none flex-col gap-3 p-0">
        {ids.map((id) => (
          <FootnoteDefinition key={id} id={id} tone={tone} />
        ))}
      </ol>
    </nav>
  );
}

export interface FootnoteDetailsProps {
  id: SourceId;
  children?: ReactNode;
  className?: string;
}

/**
 * Below 1024px the rail is removed and each footnote becomes a native
 * <details> disclosure directly beneath its figure. Zero JavaScript.
 */
export function FootnoteDetails({
  id,
  children,
  className,
}: FootnoteDetailsProps) {
  const source = SOURCES[id];
  if (!source) return null;
  const n = sourceNumber(id);

  return (
    <details className={cn("md:hidden", className)}>
      <summary className="cursor-pointer font-mono text-caption uppercase text-ink-muted tabular-figures marker:text-sienna-press">
        {`Note ${n}`}
      </summary>
      <p className="mt-2 font-display text-footnote text-ink-muted">
        {children ?? source.note}
      </p>
      <p className="mt-1 font-mono text-caption uppercase text-ink-muted opacity-70 tabular-figures">
        {source.origin} · verified {source.lastVerified}
      </p>
    </details>
  );
}
