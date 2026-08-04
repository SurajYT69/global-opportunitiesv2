import type { SourceId } from "@/components/ui/footnote";

/**
 * THE ENDPAPER — data.
 *
 * VI SUCCESS. The page's one dark surface, entered through the canonical 30vh
 * `--grad-endpaper-turn` band.
 *
 * INTEGRITY RULES APPLIED HERE
 *   · Student quotes are verbatim excerpts of testimonials GO has already
 *     published, each linked back to its own source page. Nothing is
 *     paraphrased, invented or composited.
 *   · No intake year is asserted for any student — GO's published testimonials
 *     do not carry one. What is stated instead is the verification date, which
 *     is a fact we own.
 *   · Institutional testimonials are listed by institution, not quoted, because
 *     we do not hold their verbatim wording. Naming them is auditable;
 *     inventing their words would not be.
 *   · No visa or admission percentage appears anywhere on this page.
 */

export interface Outcome {
  id: string;
  /** Plate C monogram. */
  initials: string;
  name: string;
  programme: string;
  place: string;
  counsellor: string;
  /** Verbatim excerpt of the published testimonial. */
  quote: string;
  /** Where the full text lives. */
  source: string;
  href: string;
  lastVerified: string;
}

export const OUTCOMES: Outcome[] = [
  {
    id: "rittik-panchal",
    initials: "RP",
    name: "Rittik Panchal",
    programme: "Master's degree",
    place: "United Kingdom",
    counsellor: "Avinash",
    quote: "Global Opportunities has been a great support …",
    source: "GLOBAL-OPPORTUNITIES.NET",
    href: "https://www.global-opportunities.net/blogs/testimonial-count/rittik-panchal/",
    lastVerified: "AUG 2026",
  },
  {
    id: "vanshika-sheel",
    initials: "VS",
    name: "Vanshika Sheel",
    programme: "German public university",
    place: "Germany",
    counsellor: "Nivesh Bisht",
    quote:
      "My consultant, Nivesh Bisht, was not just professional and knowledgeable, but also incredibly friendly and approachable.",
    source: "GLOBAL-OPPORTUNITIES.NET",
    href: "https://www.global-opportunities.net/blogs/testimonial-count/vanshika-sheel/",
    lastVerified: "AUG 2026",
  },
  {
    id: "simarpreet-kaur",
    initials: "SK",
    name: "Simarpreet Kaur",
    programme: "Centennial College",
    place: "Canada",
    counsellor: "Jasmeet Kaur",
    quote: "Super active and especially super consistent.",
    source: "GLOBAL-OPPORTUNITIES.NET",
    href: "https://www.global-opportunities.net/blogs/testimonial-count/simarpreet-kaur/",
    lastVerified: "AUG 2026",
  },
];

export interface Institution {
  id: string;
  name: string;
  place: string;
}

/**
 * The seven partner institutions on the testimonial register. Five are named
 * publicly; these are the five. Partner-side validation is rare, so it is set
 * as a register — names and locations we can stand behind — not as quotation
 * marks around words we do not hold.
 */
export const INSTITUTIONS: Institution[] = [
  { id: "auckland", name: "University of Auckland", place: "NEW ZEALAND" },
  { id: "rmit", name: "RMIT University", place: "AUSTRALIA" },
  {
    id: "nci",
    name: "National College of Ireland",
    place: "IRELAND",
  },
  { id: "sgu", name: "St. George's University", place: "GRENADA" },
  {
    id: "witt",
    name: "Western Institute of Technology at Taranaki",
    place: "NEW ZEALAND",
  },
];

export interface EndpaperStat {
  id: SourceId;
  /** Server-rendered final value, exactly as it must read. */
  display: string;
  /** The numeric target the odometer settles on. */
  value: number;
  /** Rendered after the figure, outside the odometer. */
  suffix?: string;
  label: string;
}

/**
 * Four of the six canonical stats. Every figure is server-rendered at its final
 * value and carries a footnote resolving to the Sources & Methods registry.
 * The odometer only animates the last 8% — GO's current placeholder-zero bug
 * is structurally impossible here.
 */
export const STATS: EndpaperStat[] = [
  {
    id: "students-placed",
    display: "40,000",
    value: 40000,
    suffix: "+",
    label: "Students placed",
  },
  {
    id: "partner-universities",
    display: "700",
    value: 700,
    suffix: "+",
    label: "Partner universities",
  },
  {
    id: "offices",
    display: "18",
    value: 18,
    label: "Offices, named and addressed",
  },
  {
    id: "testimonials",
    display: "47",
    value: 47,
    label: "Published testimonials",
  },
];
