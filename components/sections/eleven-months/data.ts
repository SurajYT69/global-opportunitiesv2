/**
 * THE ELEVEN-MONTH RULE — data.
 *
 * V APPLY. One ruled calendar line, AUG 2026 -> JUL 2027, for the September
 * 2027 intake. Every duration below is GO's own documented duration
 * (/the-journey-of-studying-abroad/): applications 8-9 months before the intake
 * window, university decisions 3-4 months, visa 2-3 months.
 *
 * HONEST URGENCY ONLY (canon build note 12). Every date carries a named,
 * linked source and a last-verified stamp. No countdowns, no seat counts, no
 * visa or admission guarantee. The margin note is verbatim canon:
 *   "This is a real timeline. It is not a promise."
 */

export interface CalendarMonth {
  /** Mono, tracked caps — "AUG". */
  label: string;
  /** Rendered only where the year turns over. */
  year?: string;
}

/** Twelve ticks: AUG 2026 through JUL 2027. Index 0 = AUG. */
export const MONTHS: CalendarMonth[] = [
  { label: "AUG", year: "2026" },
  { label: "SEP" },
  { label: "OCT" },
  { label: "NOV" },
  { label: "DEC" },
  { label: "JAN", year: "2027" },
  { label: "FEB" },
  { label: "MAR" },
  { label: "APR" },
  { label: "MAY" },
  { label: "JUN" },
  { label: "JUL" },
];

export const MONTH_COUNT = MONTHS.length;

export type MilestoneSide = "above" | "below";

export interface Milestone {
  id: string;
  /** Mono ordinal — "01". */
  n: string;
  title: string;
  /** Mono duration, the fact we can prove. */
  duration: string;
  /** Mono month range. */
  range: string;
  /** Who does the work. */
  owner: string;
  body: string;
  /** Which side of the rule the block is annotated on. */
  side: MilestoneSide;
  /** First month column, 0-based. */
  start: number;
  /** Number of month columns the block spans. */
  span: number;
}

/**
 * Six annotated blocks, alternating above and below the rule. Above blocks
 * never overlap each other; neither do below blocks.
 */
export const MILESTONES: Milestone[] = [
  {
    id: "shortlist",
    n: "01",
    title: "Course shortlist",
    duration: "2 MONTHS",
    range: "AUG – SEP 2026",
    owner: "YOU + YOUR COUNSELLOR",
    body: "Marks, budget, stream, and a shortlist of courses you could actually be admitted to. You are given one named counsellor on the first call, and that name does not change.",
    side: "above",
    start: 0,
    span: 2,
  },
  {
    id: "exams",
    n: "02",
    title: "English and entrance exams",
    duration: "CONCURRENT",
    range: "OCT – NOV 2026",
    owner: "YOU",
    body: "IELTS, PTE, TOEFL, GRE or GMAT, booked to sit inside the application window rather than after it. Exams run alongside the shortlist, not after it closes.",
    side: "below",
    start: 2,
    span: 2,
  },
  {
    id: "applications",
    n: "03",
    title: "Applications go in",
    duration: "8–9 MONTHS BEFORE INTAKE",
    range: "DEC 2026 – JAN 2027",
    owner: "YOUR COUNSELLOR",
    body: "Applications are filed eight to nine months before the intake window opens. Later is possible. Later is worse, and it is worse in a way that shows up in the offer you get.",
    side: "above",
    start: 4,
    span: 2,
  },
  {
    id: "offers",
    n: "04",
    title: "Universities decide",
    duration: "3–4 MONTHS",
    range: "JAN – APR 2027",
    owner: "THE UNIVERSITY",
    body: "Three to four months is the honest range. Some institutions answer in three weeks. We do not know in advance which, and we will not guess on their behalf.",
    side: "below",
    start: 5,
    span: 4,
  },
  {
    id: "visa",
    n: "05",
    title: "The visa file",
    duration: "2–3 MONTHS",
    range: "APR – JUN 2027",
    owner: "GO VISA DESK",
    body: "Two to three months, prepared under the supervision of former visa officials. If it is refused you get the refusal letter, the stated reason, and a written re-application plan. We never promise a visa.",
    side: "above",
    start: 8,
    span: 3,
  },
  {
    id: "departure",
    n: "06",
    title: "Departure",
    duration: "4 WEEKS",
    range: "JUL 2027",
    owner: "YOU + YOUR COUNSELLOR",
    body: "Accommodation, forex, GIC, insurance and tickets, in that order. Then Terminal 3, 04:40, ahead of the September 2027 intake.",
    side: "below",
    start: 11,
    span: 1,
  },
];

export type TickKind = "application-day" | "deadline";

export interface CalendarTick {
  id: string;
  kind: TickKind;
  /** Month column index. */
  month: number;
  /** Position inside the month, 0–1. */
  frac: number;
  /** Mono label; omitted on the clustered Application Day ticks. */
  label?: string;
}

/**
 * OCHRE — GO's own dated Application Days (on-site admission events).
 * Real cities, real dates, all inside August. Ochre is 2.1:1 and is therefore
 * used as a NON-TEXT mark only; the cities are set in ink beneath.
 */
export const APPLICATION_DAYS = [
  { city: "PUNE", day: 7 },
  { city: "MUMBAI", day: 8 },
  { city: "DELHI", day: 9 },
  { city: "AMRITSAR", day: 10 },
  { city: "LUDHIANA", day: 11 },
  { city: "CHANDIGARH", day: 12 },
  { city: "HYDERABAD", day: 13 },
  { city: "CHENNAI", day: 17 },
] as const;

export interface CitedDeadline {
  id: string;
  month: number;
  frac: number;
  /** What the deadline is. Mono — it is a verified fact. */
  label: string;
  /** Named source. */
  source: string;
  href: string;
  lastVerified: string;
}

/**
 * CLAY — cited third-party deadlines. Not ours, not moveable by us, and
 * carrying the source and the last-verified stamp on the page.
 */
export const CITED_DEADLINES: CitedDeadline[] = [
  {
    id: "ucas-october",
    month: 2,
    frac: 0.48,
    label: "15 OCT · UCAS — OXFORD, CAMBRIDGE, MEDICINE, DENTISTRY, VETERINARY",
    source: "UCAS.COM",
    href: "https://www.ucas.com/",
    lastVerified: "AUG 2026",
  },
  {
    id: "ucas-january",
    month: 5,
    frac: 0.45,
    label: "JAN · UCAS EQUAL CONSIDERATION — EXACT DATE PUBLISHED ANNUALLY",
    source: "UCAS.COM",
    href: "https://www.ucas.com/",
    lastVerified: "AUG 2026",
  },
  {
    id: "germany-winter",
    month: 11,
    frac: 0.48,
    label: "15 JUL · GERMANY — WINTER SEMESTER APPLICATIONS CLOSE",
    source: "UNI-ASSIST.DE",
    href: "https://www.uni-assist.de/en/",
    lastVerified: "AUG 2026",
  },
];

/** The ochre ticks, resolved to fractional positions inside August. */
export const APPLICATION_DAY_TICKS: CalendarTick[] = APPLICATION_DAYS.map(
  (event) => ({
    id: `app-day-${event.city.toLowerCase()}`,
    kind: "application-day" as const,
    month: 0,
    frac: event.day / 31,
  }),
);

export const APPLICATION_DAY_SUMMARY = `8 GO APPLICATION DAYS · 7–17 AUG`;

export const APPLICATION_DAY_CITIES = APPLICATION_DAYS.map(
  (event) => event.city,
).join(" · ");

/** Verbatim canon. This line is review-blocking. */
export const MARGIN_NOTE = "This is a real timeline. It is not a promise.";

export interface SpecimenSheet {
  id: string;
  plateNumber: string;
  fields: { label: string; value?: string }[];
  stamp: string;
  caption: string;
  captionMeta: string;
  /** The one clause the ochre leader points at. */
  annotation: string;
}

/**
 * Three Plate B specimen sheets, tipped in beneath the rule. Typeset HTML
 * facsimiles — zero photography, zero DPDP exposure. Each carries an ochre
 * annotation calling out the single clause that matters.
 */
export const SPECIMENS: SpecimenSheet[] = [
  {
    id: "offer",
    plateNumber: "CONDITIONAL OFFER",
    fields: [
      { label: "Institution", value: "██████" },
      { label: "Programme", value: "MSc ██████" },
      { label: "Course start", value: "20 SEP 2027" },
      { label: "Condition", value: "IELTS 6.5, NO BAND < 6.0" },
      { label: "Deposit due", value: "██████" },
    ],
    stamp: "SPECIMEN · ILLUSTRATIVE · NOT A STUDENT RECORD",
    caption: "SPECIMEN · CONDITIONAL OFFER LETTER",
    captionMeta: "READ THE CONDITION LINE BEFORE THE CONGRATULATIONS LINE",
    annotation: "The condition is the offer. Everything above it is stationery.",
  },
  {
    id: "cas",
    plateNumber: "CAS STATEMENT",
    fields: [
      { label: "Institution", value: "██████" },
      { label: "CAS number", value: "E4G7██████" },
      { label: "Course start", value: "20 SEP 2027" },
      { label: "Fees paid", value: "£██████" },
      { label: "Sponsor licence", value: "██████" },
    ],
    stamp: "SPECIMEN · ILLUSTRATIVE · NOT A STUDENT RECORD",
    caption: "SPECIMEN · CONFIRMATION OF ACCEPTANCE FOR STUDIES",
    captionMeta: "ISSUED BY THE UNIVERSITY · NOT BY US, AND NOT BY AN AGENT",
    annotation: "No CAS, no visa application. The number is the whole document.",
  },
  {
    id: "vignette",
    plateNumber: "ENTRY VIGNETTE",
    fields: [
      { label: "Category", value: "STUDENT" },
      { label: "Valid from", value: "06 SEP 2027" },
      { label: "Valid until", value: "██████" },
      { label: "Work limit", value: "20 HRS/WK TERM · 40 HRS VACATION" },
      { label: "Holder", value: "██████" },
    ],
    stamp: "SPECIMEN · ILLUSTRATIVE · NOT A STUDENT RECORD",
    caption: "SPECIMEN · ENTRY VIGNETTE",
    captionMeta: "THE 90-DAY TRAVEL WINDOW STARTS ON THE VALID-FROM DATE",
    annotation: "Book the flight against this date, not against the offer date.",
  },
];
