/* ===========================================================================
   THE GAZETTEER — DATA
   ---------------------------------------------------------------------------
   Chapter II · EXPLORE. Fifteen destinations, four facts each, on the same
   four axes. This is the build source of truth for the index rows.

   THE MONO LAW applies to every value below: partner counts, intake windows,
   tuition bands, work-rights durations, coordinates and UTC offsets are set in
   IBM Plex Mono because they are verified fact. Destination names, city names
   and the context notes are NOT mono — they are nouns and prose.

   PARTNER COUNTS are GO's own claim and resolve to Sources & Methods note 3
   (`partner-universities`). Only the eight countries GO publishes a count for
   carry one; the other seven render an em-dash with an `sr-only` expansion of
   "not yet published" — NEVER `0`, `TBD`, or a shimmer.

   INTAKE WINDOWS, TUITION BANDS and POST-STUDY WORK RIGHTS are the
   destination's own published figures, quoted conservatively as ranges. They
   are attributed in the section foot and dated in the colophon.

   Banned here permanently: flags, national landmarks, globes, aircraft,
   passports, currency symbols as illustration, and any tile grid of any of
   the above. Currency symbols appear only inside a figure, where they carry
   information rather than identity.
   ======================================================================== */

/** A tuition band. Always a range — never fake precision, never a single number. */
export interface TuitionBand {
  /** Currency symbol or ISO code, e.g. "£" or "CAD ". */
  prefix: string;
  low: string;
  high: string;
}

/** A cited third-party deadline. Label in `--clay`, marker in `--sienna`. */
export interface CitedDeadline {
  label: string;
  value: string;
  source: string;
}

export interface Destination {
  slug: string;
  /** Primary identifier. Set in `--fs-h4` Hanken 600 — a noun, never mono. */
  name: string;
  /** Short form for the in-row CTA: "Talk to a UK counsellor". */
  ctaName: string;
  /** Reads inside "Takes you to the form with … already selected." */
  selectionLabel: string;
  /** UK / USA / Canada / Australia — the four anchor destinations. */
  anchor: boolean;
  /**
   * Anchor-card photograph, 3:2, served from `/public`. Only the four anchors
   * carry one; the other eleven stay index rows and have no plate of their own
   * until one is commissioned.
   *
   * The card renders this over the Plate A field (marine gradient + graticule),
   * which is the documented v2 photography drop-in: if the file is absent the
   * card falls back to the canonical plate field rather than a broken box.
   */
  image?: string;
  /** GO's own published partner count, or null where none is published. */
  partners: string | null;
  intake: string;
  tuition: TuitionBand | null;
  work: string;
  /** Primary study city — a noun, set in the editorial voice. */
  city: string;
  /** Plate A: the atlas's own way of pointing at a place. */
  coordinates: string;
  /** Plate A: standard-time offset. */
  utc: string;
  note: string;
  deadline?: CitedDeadline;
}

/**
 * The four anchors first — that is where the traffic and the partnerships
 * actually are — then the other eleven alphabetically.
 *
 * "Europe" is not a country and it appears in GO's own curated fifteen. It is
 * kept, labelled `Europe (multiple)`, and its note says what it covers.
 * "Berlin" and "Paris" never reappear as entries.
 */
export const DESTINATIONS: Destination[] = [
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    ctaName: "UK",
    selectionLabel: "the United Kingdom",
    anchor: true,
    image: "/images/plates/uk-manchester.jpg",
    partners: "80+",
    intake: "Sep/Oct main · Jan/Feb second",
    tuition: { prefix: "£", low: "9,000", high: "30,000" },
    work: "Graduate Route · 2 yrs (3 doctoral)",
    city: "London",
    coordinates: "51.5072° N · 0.1276° W",
    utc: "UTC+00:00",
    note: "Eighty-plus partner universities, the largest single-country block after the United States. Living costs run £1,483 a month in London and £1,136 outside it; the visa is £524 and the Immigration Health Surcharge £776 a year.",
  },
  {
    slug: "united-states",
    name: "United States",
    ctaName: "US",
    selectionLabel: "the United States",
    anchor: true,
    image: "/images/plates/usa-campus.jpg",
    partners: "150+",
    intake: "Fall (Aug/Sep) main · Spring (Jan)",
    tuition: { prefix: "US$", low: "20,000", high: "55,000" },
    work: "OPT · 12 mths (+24 STEM)",
    city: "Boston",
    coordinates: "42.3601° N · 71.0589° W",
    utc: "UTC−05:00",
    note: "The largest block on the register at a hundred and fifty-plus agreements, spread across public state systems and private research universities. Tuition varies more here than anywhere else on this index, so the band is wide on purpose.",
  },
  {
    slug: "canada",
    name: "Canada",
    ctaName: "Canada",
    selectionLabel: "Canada",
    anchor: true,
    image: "/images/plates/canada-toronto.jpg",
    partners: "60+",
    intake: "Fall (Sep) primary · Winter (Jan) · Summer limited",
    tuition: { prefix: "CAD ", low: "18,000", high: "35,000" },
    work: "PGWP · up to 3 yrs",
    city: "Toronto",
    coordinates: "43.6532° N · 79.3832° W",
    utc: "UTC−05:00",
    note: "Sixty-plus institutions, universities and colleges both. Postgraduate tuition averages around CAD 21,100 a year, and the post-graduation work permit is issued for a length tied to the length of the programme.",
  },
  {
    slug: "australia",
    name: "Australia",
    ctaName: "Australia",
    selectionLabel: "Australia",
    anchor: true,
    image: "/images/plates/australia-melbourne.jpg",
    partners: "45+",
    intake: "Feb primary · Jul secondary",
    tuition: { prefix: "A$", low: "22,000", high: "45,000" },
    work: "Temporary Graduate visa · 2–3 yrs",
    city: "Melbourne",
    coordinates: "37.8136° S · 144.9631° E",
    utc: "UTC+10:00",
    note: "Forty-five-plus partners, with the academic year opening in February rather than September. The Temporary Graduate visa runs two to three years depending on the qualification and where it was studied.",
  },
  {
    slug: "dubai",
    name: "Dubai",
    ctaName: "Dubai",
    selectionLabel: "Dubai",
    anchor: false,
    partners: null,
    intake: "Sep primary · Jan secondary",
    tuition: { prefix: "AED ", low: "40,000", high: "75,000" },
    work: "Employer-sponsored · Green Visa route",
    city: "Dubai",
    coordinates: "25.2048° N · 55.2708° E",
    utc: "UTC+04:00",
    note: "International branch campuses of British, Australian and Indian universities, taught in English. There is no general post-study work route; work rights follow an employer sponsorship or a Green Visa.",
  },
  {
    slug: "europe",
    name: "Europe (multiple)",
    ctaName: "Europe",
    selectionLabel: "Europe",
    anchor: false,
    partners: null,
    intake: "Sep/Oct main · Feb secondary",
    tuition: { prefix: "€", low: "0", high: "18,000" },
    work: "Varies by country · typically 9–18 mths",
    city: "Amsterdam",
    coordinates: "52.3676° N · 4.9041° E",
    utc: "UTC+01:00",
    note: "The countries in GO's Europe group beyond the ones indexed separately here. Public systems in several of them charge only a semester contribution; the private institutions do not. Cities are not destinations, and none are listed as one.",
  },
  {
    slug: "france",
    name: "France",
    ctaName: "France",
    selectionLabel: "France",
    anchor: false,
    partners: null,
    intake: "Sep main · Jan limited",
    tuition: { prefix: "€", low: "3,000", high: "17,000" },
    work: "APS permit · 12 mths",
    city: "Paris",
    coordinates: "48.8566° N · 2.3522° E",
    utc: "UTC+01:00",
    note: "Public universities charge differentiated fees to students from outside the EU; the grandes écoles and private schools charge more. The APS permit gives twelve months to look for work after a master's.",
  },
  {
    slug: "germany",
    name: "Germany",
    ctaName: "Germany",
    selectionLabel: "Germany",
    anchor: false,
    partners: "30+",
    intake: "Winter (Oct) main · Summer (Apr)",
    tuition: { prefix: "€", low: "0", high: "20,000" },
    work: "Job-seeking residence permit · 18 mths",
    city: "Berlin",
    coordinates: "52.5200° N · 13.4050° E",
    utc: "UTC+01:00",
    note: "Thirty-plus partners. Public universities charge no tuition, only a semester contribution of roughly €150–350; the private business schools on the register charge full fees.",
    deadline: {
      label: "Winter semester application deadline",
      value: "15 JULY",
      source: "German public universities' published admission calendar",
    },
  },
  {
    slug: "ireland",
    name: "Ireland",
    ctaName: "Ireland",
    selectionLabel: "Ireland",
    anchor: false,
    partners: "20+",
    intake: "Sep main · Jan limited",
    tuition: { prefix: "€", low: "10,000", high: "25,000" },
    work: "Third Level Graduate Programme · 2 yrs",
    city: "Dublin",
    coordinates: "53.3498° N · 6.2603° W",
    utc: "UTC+00:00",
    note: "Twenty-plus partners. The Third Level Graduate Programme gives master's graduates two years to work, and the academic year opens in September.",
  },
  {
    slug: "italy",
    name: "Italy",
    ctaName: "Italy",
    selectionLabel: "Italy",
    anchor: false,
    partners: null,
    intake: "Sep/Oct main · Feb limited",
    tuition: { prefix: "€", low: "1,000", high: "20,000" },
    work: "Job-search residence permit · 12 mths",
    city: "Milan",
    coordinates: "45.4642° N · 9.1900° E",
    utc: "UTC+01:00",
    note: "Public university fees are scaled to declared family income, which puts the lower bound of the band well below the private schools on the register.",
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    ctaName: "Malaysia",
    selectionLabel: "Malaysia",
    anchor: false,
    partners: null,
    intake: "Sep main · Feb & Jun secondary",
    tuition: { prefix: "RM ", low: "15,000", high: "45,000" },
    work: "Employer-sponsored · no general route",
    city: "Kuala Lumpur",
    coordinates: "3.1390° N · 101.6869° E",
    utc: "UTC+08:00",
    note: "Branch campuses and local private universities, taught in English, at the lowest tuition band on this index. Work rights are employer-sponsored; there is no general graduate route.",
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    ctaName: "New Zealand",
    selectionLabel: "New Zealand",
    anchor: false,
    partners: "30+",
    intake: "Feb primary · Jul secondary",
    tuition: { prefix: "NZ$", low: "26,000", high: "45,000" },
    work: "Post-study work visa · up to 3 yrs",
    city: "Auckland",
    coordinates: "36.8509° S · 174.7645° E",
    utc: "UTC+12:00",
    note: "Thirty-plus partners, including the University of Auckland, which has given GO a testimonial of its own. The post-study work visa runs up to three years where the qualification and its level both qualify.",
  },
  {
    slug: "singapore",
    name: "Singapore",
    ctaName: "Singapore",
    selectionLabel: "Singapore",
    anchor: false,
    partners: "7",
    intake: "Aug primary · Jan secondary",
    tuition: { prefix: "S$", low: "25,000", high: "50,000" },
    work: "Employer-sponsored pass · no general route",
    city: "Singapore",
    coordinates: "1.3521° N · 103.8198° E",
    utc: "UTC+08:00",
    note: "Seven agreements, the smallest block on the register. There is no general post-study work route; graduates convert through an employer-sponsored pass.",
  },
  {
    slug: "spain",
    name: "Spain",
    ctaName: "Spain",
    selectionLabel: "Spain",
    anchor: false,
    partners: null,
    intake: "Sep/Oct main · Feb limited",
    tuition: { prefix: "€", low: "2,000", high: "20,000" },
    work: "Job-search residence permit · 12 mths",
    city: "Madrid",
    coordinates: "40.4168° N · 3.7038° W",
    utc: "UTC+01:00",
    note: "Public universities set fees per credit by region; the private and business schools sit at the top of the band. Twelve months of job-search residence follow the degree.",
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    ctaName: "Switzerland",
    selectionLabel: "Switzerland",
    anchor: false,
    partners: null,
    intake: "Sep main · Feb secondary",
    tuition: { prefix: "CHF ", low: "1,600", high: "25,000" },
    work: "6 mths to find work (non-EU)",
    city: "Zurich",
    coordinates: "47.3769° N · 8.5417° E",
    utc: "UTC+01:00",
    note: "Public university tuition sits at the low end of the European range; the hospitality and business schools on the register sit at the top of it. Graduates from outside the EU have six months to find work.",
  },
];

/**
 * A destination carrying its position in `DESTINATIONS`, so the canonical
 * order survives the anchor/index split below.
 */
export interface IndexedDestination {
  destination: Destination;
  /** Position in `DESTINATIONS`, not the render order. */
  index: number;
}

const WITH_INDEX: IndexedDestination[] = DESTINATIONS.map(
  (destination, index) => ({ destination, index }),
);

/**
 * The four anchors, rendered as image cards above the index.
 *
 * They do NOT also appear as index rows: an anchor is presented once, as a
 * card, and the index below is the remaining eleven. Four plus eleven is still
 * the fifteen the headline claims.
 */
export const ANCHOR_DESTINATIONS: IndexedDestination[] = WITH_INDEX.filter(
  (entry) => entry.destination.anchor,
);

/** The other eleven, which keep the ruled index-row treatment. */
export const INDEX_DESTINATIONS: IndexedDestination[] = WITH_INDEX.filter(
  (entry) => !entry.destination.anchor,
);
