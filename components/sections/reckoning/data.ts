/* ===========================================================================
   THE RECKONING — COST DATA
   ---------------------------------------------------------------------------
   Every figure here is a RANGE, in rupees, per student, per year. Nothing is
   a point estimate, because nobody honest has one. Where we were unsure we
   widened the range rather than picked a number.

   Rupee bands are authored directly and rounded to the nearest ₹1,000 — they
   are not computed live from a rate, because a landing page that recalculates
   itself against a moving currency is claiming a precision it does not have.
   The indicative rate used to set each band is published in METHOD below, and
   the band is wide enough to absorb a normal swing in it.

   OWNER: GO Editorial · LAST VERIFIED: 2026-08
   ======================================================================== */

export type CountryId = "uk" | "usa" | "canada" | "australia" | "other";
export type DegreeId = "bachelors" | "masters" | "mba";
export type TierId = "capital" | "major" | "regional";

export interface Band {
  readonly low: number;
  readonly high: number;
}

export interface CostLine {
  id: string;
  label: string;
  /** Native-currency gloss, set in mono beneath the label. */
  native?: string;
  band: Band;
  /** Resolves to a numbered note beneath the ledger. */
  note: string;
  /**
   * `false` — shown, explained, and deliberately NOT added to the total.
   * Canada's GIC and Germany's blocked account are proof-of-funds deposits
   * that come back to the student. Counting them would inflate the total.
   */
  counted: boolean;
  /** Mono tag rendered beside an uncounted figure. */
  tag?: string;
}

export interface ScholarshipLine {
  band: Band;
  /** Named, real, and labelled as examples — never as an offer. */
  funders: readonly string[];
  note: string;
}

interface Priced {
  band: Band;
  native?: string;
}

interface LivingBand extends Priced {
  /** Real cities, so the tier means something. */
  examples: string;
}

interface CountryData {
  id: CountryId;
  name: string;
  /** Chip sub-label. */
  meta: string;
  tuition: Record<DegreeId, Priced>;
  tuitionNote: string;
  living: Record<TierId, LivingBand>;
  livingNote: string;
  /** Visa, health cover, forex, deposits, flights — in ledger order. */
  fixed: readonly CostLine[];
  scholarship: ScholarshipLine;
}

/* --- Shared lines ------------------------------------------------------- */

const FOREX: CostLine = {
  id: "forex",
  label: "Forex and transfer costs",
  native: "0.5% – 2% of the amount sent",
  band: { low: 40_000, high: 1_60_000 },
  note: "Bank margin on the exchange rate plus transfer fees, on roughly ₹30–50 lakh moved abroad across a year, plus GST. The spread your bank quotes is the cost; the headline rate is not. Tax Collected at Source on remittances under the Liberalised Remittance Scheme is adjustable against your income tax, so it is not counted here as a cost — but you do have to fund it up front, and your counsellor will say when.",
  counted: true,
};

const flights = (band: Band, note: string): CostLine => ({
  id: "flights",
  label: "Flights, one return trip a year",
  band,
  note,
  counted: true,
});

/* --- United Kingdom ------------------------------------------------------ */

const UK: CountryData = {
  id: "uk",
  name: "United Kingdom",
  meta: "80+ PARTNERS",
  tuition: {
    bachelors: {
      band: { low: 11_50_000, high: 30_00_000 },
      native: "£11,000 – £28,000 / yr",
    },
    masters: {
      band: { low: 9_50_000, high: 32_00_000 },
      native: "£9,000 – £30,000 / yr",
    },
    mba: {
      band: { low: 21_00_000, high: 64_00_000 },
      native: "£20,000 – £60,000 / yr",
    },
  },
  tuitionNote:
    "Published international fees at UK partner institutions, one academic year. The top of the range is London and the Russell Group; the bottom is a post-1992 university outside the South East. Clinical and conservatoire courses sit above this band and are priced separately.",
  living: {
    capital: {
      band: { low: 14_50_000, high: 19_50_000 },
      native: "£13,500 – £18,000 / yr",
      examples: "London",
    },
    major: {
      band: { low: 10_50_000, high: 14_50_000 },
      native: "£10,000 – £13,500 / yr",
      examples: "Manchester · Birmingham · Edinburgh",
    },
    regional: {
      band: { low: 9_00_000, high: 12_50_000 },
      native: "£8,500 – £11,500 / yr",
      examples: "Coventry · Sheffield · Swansea",
    },
  },
  livingNote:
    "Rent, food, transport, phone and books. UK Visas and Immigration assesses maintenance funds separately, at a fixed monthly figure for London and a lower one outside it; that is the number the visa is tested against, not the number your child will spend.",
  fixed: [
    {
      id: "visa",
      label: "Student visa fee",
      native: "£524, applied for from India",
      band: { low: 54_000, high: 58_000 },
      note: "The application fee for a Student visa made outside the UK. It is paid to the Home Office, not to us. Priority processing is an optional extra and is not included.",
      counted: true,
    },
    {
      id: "ihs",
      label: "Immigration Health Surcharge",
      native: "£776 per year of the visa",
      band: { low: 83_000, high: 1_25_000 },
      note: "Paid up front for the whole length of the visa, which for a one-year Master's is usually about sixteen months rather than twelve — hence the range. The IHS is what buys NHS access, so there is no separate private health-insurance line for the UK.",
      counted: true,
    },
    FOREX,
    flights(
      { low: 50_000, high: 1_10_000 },
      "Economy return, Delhi or Mumbai to a UK airport, booked in a normal window. September departures and December returns are the two peaks and sit at the top of the range.",
    ),
  ],
  scholarship: {
    band: { low: 0, high: 10_00_000 },
    funders: [
      "GREAT Scholarships",
      "Chevening",
      "Commonwealth Shared Scholarships",
      "University merit awards",
    ],
    note: "Examples, not offers, and we do not decide any of them. A GREAT Scholarship is worth £10,000 towards one year of postgraduate study. Chevening covers tuition and living but funds roughly 1,500 people worldwide each year, across every subject and every country. University merit awards are far more common and far smaller. The range starts at zero because zero is the most common outcome.",
  },
};

/* --- United States ------------------------------------------------------- */

const USA: CountryData = {
  id: "usa",
  name: "United States",
  meta: "150+ PARTNERS",
  tuition: {
    bachelors: {
      band: { low: 17_50_000, high: 48_50_000 },
      native: "US$20,000 – US$55,000 / yr",
    },
    masters: {
      band: { low: 17_50_000, high: 53_00_000 },
      native: "US$20,000 – US$60,000 / yr",
    },
    mba: {
      band: { low: 39_50_000, high: 83_50_000 },
      native: "US$45,000 – US$95,000 / yr",
    },
  },
  tuitionNote:
    "Published international tuition and mandatory university fees, one academic year. The bottom of the range is a state university charging out-of-state rates; the top is a private research university. Assistantships and merit aid are handled on the scholarship line, not here.",
  living: {
    capital: {
      band: { low: 16_50_000, high: 23_50_000 },
      native: "US$19,000 – US$27,000 / yr",
      examples: "New York · Bay Area · Boston",
    },
    major: {
      band: { low: 12_00_000, high: 16_50_000 },
      native: "US$14,000 – US$19,000 / yr",
      examples: "Chicago · Dallas · Atlanta",
    },
    regional: {
      band: { low: 9_50_000, high: 13_00_000 },
      native: "US$11,000 – US$15,000 / yr",
      examples: "College towns · the Midwest · upstate New York",
    },
  },
  livingNote:
    "Rent, food, transport and phone. Universities publish their own cost-of-attendance figure for the I-20, and it is usually close to the middle of this band. Sharing an apartment rather than taking university housing is the single largest lever in the American numbers.",
  fixed: [
    {
      id: "visa",
      label: "F-1 visa and SEVIS fees",
      native: "US$350 SEVIS + US$185 application",
      band: { low: 45_000, high: 50_000 },
      note: "The I-901 SEVIS fee plus the MRV visa application fee. Both are paid to United States government systems, not to us, and both are payable whether or not the visa is granted. Any federal fee not yet being collected is excluded; if that changes, this line moves and the note is dated again.",
      counted: true,
    },
    FOREX,
    {
      id: "insurance",
      label: "Health insurance",
      native: "US$1,500 – US$3,000 / yr",
      band: { low: 1_30_000, high: 2_65_000 },
      note: "Most American universities require enrolment in their own student health plan and will bill it with tuition unless your child qualifies for a waiver with comparable private cover. This is the largest single line that Indian families routinely forget.",
      counted: true,
    },
    flights(
      { low: 70_000, high: 1_50_000 },
      "Economy return, Delhi or Mumbai to a US airport, one stop, booked in a normal window. West-coast routings sit at the top of the range.",
    ),
  ],
  scholarship: {
    band: { low: 0, high: 14_00_000 },
    funders: [
      "Fulbright-Nehru Master's Fellowships",
      "University assistantships and merit aid",
      "Inlaks Shivdasani Foundation",
    ],
    note: "Examples, not offers. Most American funding for Indian students is institutional — merit aid, and teaching or research assistantships — and it is decided by the academic department, not by a consultant and not by us. Fulbright-Nehru funds a small number of Master's candidates each year and applications close roughly a year ahead. The range starts at zero.",
  },
};

/* --- Canada -------------------------------------------------------------- */

const CANADA: CountryData = {
  id: "canada",
  name: "Canada",
  meta: "60+ PARTNERS",
  tuition: {
    bachelors: {
      band: { low: 11_50_000, high: 24_50_000 },
      native: "C$18,000 – C$38,000 / yr",
    },
    masters: {
      band: { low: 10_00_000, high: 22_50_000 },
      native: "C$16,000 – C$35,000 / yr",
    },
    mba: {
      band: { low: 22_50_000, high: 48_00_000 },
      native: "C$35,000 – C$75,000 / yr",
    },
  },
  tuitionNote:
    "Published international tuition, one academic year. Public colleges sit at the bottom of the range and research universities at the top. Programme eligibility for a post-graduation work permit varies by institution and by course, and it is worth checking before the fee is.",
  living: {
    capital: {
      band: { low: 10_00_000, high: 14_00_000 },
      native: "C$16,000 – C$22,000 / yr",
      examples: "Toronto · Vancouver",
    },
    major: {
      band: { low: 8_25_000, high: 11_00_000 },
      native: "C$13,000 – C$17,000 / yr",
      examples: "Ottawa · Calgary · Montréal",
    },
    regional: {
      band: { low: 7_00_000, high: 9_50_000 },
      native: "C$11,000 – C$14,500 / yr",
      examples: "Halifax · Winnipeg · Kelowna",
    },
  },
  livingNote:
    "Rent, food, transport, phone — and winter clothing in the first year, which is a real and underestimated cost. Immigration, Refugees and Citizenship Canada tests proof of funds against its own figure, which is the GIC line below.",
  fixed: [
    {
      id: "visa",
      label: "Study permit and biometrics",
      native: "C$150 + C$85",
      band: { low: 14_000, high: 16_000 },
      note: "The study permit application fee plus the biometrics fee, paid to the Government of Canada. Both are payable whether or not the permit is granted.",
      counted: true,
    },
    {
      id: "gic",
      label: "Guaranteed Investment Certificate",
      native: "C$20,635, held with a Canadian bank",
      band: { low: 13_20_000, high: 13_20_000 },
      tag: "HELD · RETURNED IN INSTALMENTS",
      note: "A GIC is money you deposit with a Canadian bank before the study permit is filed, as proof your child can support themselves. The bank returns it to them in instalments across the first year. It is not an extra cost — it is the living money above, paid in advance — so we do not add it to the total. It is listed because you have to arrange it, and because it is the largest single cheque most families write in this process.",
      counted: false,
    },
    FOREX,
    {
      id: "insurance",
      label: "Health insurance",
      native: "C$600 – C$1,000 / yr",
      band: { low: 38_000, high: 64_000 },
      note: "Some provinces cover international students under the public plan, sometimes after a waiting period; others do not. Where they do not, the university's own plan is usually compulsory and billed with fees.",
      counted: true,
    },
    flights(
      { low: 70_000, high: 1_50_000 },
      "Economy return, Delhi or Mumbai to a Canadian airport, one stop, booked in a normal window.",
    ),
  ],
  scholarship: {
    band: { low: 0, high: 6_00_000 },
    funders: [
      "University entrance awards",
      "Provincial graduate scholarships",
      "Vanier Canada Graduate Scholarships (doctoral)",
    ],
    note: "Examples, not offers. Canadian funding for taught international students is mostly institutional entrance awards, applied automatically from the admission file, and mostly modest. The large named awards are doctoral. The range starts at zero.",
  },
};

/* --- Australia ----------------------------------------------------------- */

const AUSTRALIA: CountryData = {
  id: "australia",
  name: "Australia",
  meta: "45+ PARTNERS",
  tuition: {
    bachelors: {
      band: { low: 14_50_000, high: 28_00_000 },
      native: "A$25,000 – A$48,000 / yr",
    },
    masters: {
      band: { low: 16_00_000, high: 30_00_000 },
      native: "A$28,000 – A$52,000 / yr",
    },
    mba: {
      band: { low: 26_00_000, high: 55_00_000 },
      native: "A$45,000 – A$95,000 / yr",
    },
  },
  tuitionNote:
    "Published international tuition, one academic year. The Group of Eight sits at the top of the range. Australian universities publish fees per unit as well as per year, so a lighter load costs less — and takes longer, which costs more in living.",
  living: {
    capital: {
      band: { low: 15_00_000, high: 19_75_000 },
      native: "A$26,000 – A$34,000 / yr",
      examples: "Sydney · Melbourne",
    },
    major: {
      band: { low: 12_75_000, high: 16_25_000 },
      native: "A$22,000 – A$28,000 / yr",
      examples: "Brisbane · Perth · Adelaide",
    },
    regional: {
      band: { low: 11_00_000, high: 14_00_000 },
      native: "A$19,000 – A$24,000 / yr",
      examples: "Wollongong · Toowoomba · Launceston",
    },
  },
  livingNote:
    "Rent, food, transport and phone. The Department of Home Affairs assesses a student against its own published annual living-costs figure, which is higher than the bottom of this band; that figure is what the visa is tested on, not what a frugal student spends. Student visa work rights offset part of this, and we do not net them off, because a budget that assumes your child will work is not a budget.",
  fixed: [
    {
      id: "visa",
      label: "Subclass 500 visa fee",
      native: "A$2,000",
      band: { low: 1_12_000, high: 1_20_000 },
      note: "The base application charge for a Student visa, paid to the Department of Home Affairs. It has risen twice in three years and is the highest student visa fee of the four main destinations. It is payable whether or not the visa is granted.",
      counted: true,
    },
    FOREX,
    {
      id: "insurance",
      label: "Overseas Student Health Cover",
      native: "A$650 – A$800 / yr, single",
      band: { low: 38_000, high: 47_000 },
      note: "OSHC is compulsory for the full length of the visa and is usually paid up front for the whole period, not annually. Family cover costs several times the single rate.",
      counted: true,
    },
    flights(
      { low: 60_000, high: 1_20_000 },
      "Economy return, Delhi or Mumbai to an Australian airport, one stop, booked in a normal window.",
    ),
  ],
  scholarship: {
    band: { low: 0, high: 8_00_000 },
    funders: [
      "University international merit scholarships",
      "Destination Australia",
      "Australia Awards Scholarships",
    ],
    note: "Examples, not offers. Australian universities publish international merit scholarships as a percentage off tuition, commonly between 10% and 25%, applied from the admission file. Destination Australia supports study in regional areas. Australia Awards are government scholarships with their own eligibility rules and a separate timetable. The range starts at zero.",
  },
};

/* --- Everything else ----------------------------------------------------- */

const OTHER: CountryData = {
  id: "other",
  name: "Other destinations",
  meta: "11 MORE COUNTRIES",
  tuition: {
    bachelors: {
      band: { low: 1_00_000, high: 22_00_000 },
      native: "Varies by country",
    },
    masters: {
      band: { low: 50_000, high: 24_00_000 },
      native: "Varies by country",
    },
    mba: {
      band: { low: 8_00_000, high: 45_00_000 },
      native: "Varies by country",
    },
  },
  tuitionNote:
    "This is the widest band on the page, because it covers eleven countries at once. Germany's public universities charge no tuition at all — a semester contribution of roughly €150–350 applies instead — which is what pulls the bottom of the range down to almost nothing. Ireland sits around €12,000–25,000 for a taught Master's, and New Zealand, Singapore and Dubai fall between the two. Tell your counsellor which country and we will price that one properly, rather than showing you an average of eleven.",
  living: {
    capital: {
      band: { low: 9_00_000, high: 15_00_000 },
      examples: "Dublin · Zurich · Auckland · Dubai",
    },
    major: {
      band: { low: 7_50_000, high: 11_50_000 },
      examples: "Munich · Milan · Wellington",
    },
    regional: {
      band: { low: 6_00_000, high: 10_00_000 },
      examples: "Smaller university towns",
    },
  },
  livingNote:
    "Several of these countries want the living money proved up front rather than spent as you go. Germany's blocked account holds a fixed annual sum for the student to draw monthly; Ireland asks for proof of funds at registration. Like Canada's GIC, that money comes back to your child — it is the living cost above, paid in advance, not an additional one.",
  fixed: [
    {
      id: "visa",
      label: "Visa and registration fees",
      native: "Varies by country",
      band: { low: 8_000, high: 1_20_000 },
      note: "Germany's national visa is a double-digit euro fee; Ireland charges a visa fee plus a separate registration fee on arrival; New Zealand's student visa is a few hundred dollars. The band covers all of them. Ask for the one you want and we will give you the exact figure and the authority that charges it.",
      counted: true,
    },
    FOREX,
    {
      id: "insurance",
      label: "Health insurance",
      native: "Varies by country",
      band: { low: 40_000, high: 1_20_000 },
      note: "Compulsory in most of these countries and a condition of the visa in several. German public student health insurance is at the lower end; private cover in Dubai and Switzerland is at the upper end.",
      counted: true,
    },
    flights(
      { low: 40_000, high: 1_20_000 },
      "Economy return from Delhi or Mumbai. Dubai and Singapore sit at the bottom of the range; New Zealand at the top.",
    ),
  ],
  scholarship: {
    band: { low: 0, high: 7_00_000 },
    funders: [
      "DAAD (Germany)",
      "Government of Ireland International Education Scholarships",
      "New Zealand Excellence Awards",
    ],
    note: "Examples, not offers. DAAD funds a small number of Master's candidates with a monthly stipend rather than a fee waiver, which — combined with tuition-free public universities — is why the low end of the German total is so much lower than anywhere else on this page. The range starts at zero.",
  },
};

/* --- Registry ------------------------------------------------------------ */

const COUNTRIES: Record<CountryId, CountryData> = {
  uk: UK,
  usa: USA,
  canada: CANADA,
  australia: AUSTRALIA,
  other: OTHER,
};

export const COUNTRY_OPTIONS = (
  Object.keys(COUNTRIES) as CountryId[]
).map((id) => ({
  value: id,
  label: COUNTRIES[id].name,
  meta: COUNTRIES[id].meta,
}));

export const DEGREE_OPTIONS: readonly {
  value: DegreeId;
  label: string;
  meta: string;
}[] = [
  { value: "bachelors", label: "Bachelor's", meta: "3 – 4 YEARS" },
  { value: "masters", label: "Master's", meta: "1 – 2 YEARS" },
  { value: "mba", label: "MBA", meta: "1 – 2 YEARS" },
] as const;

const TIER_LABEL: Record<TierId, string> = {
  capital: "Capital or primary city",
  major: "Major city",
  regional: "Regional or smaller city",
};

export function tierOptions(
  country: CountryId,
): { value: TierId; label: string; meta: string }[] {
  const data = COUNTRIES[country];
  return (Object.keys(TIER_LABEL) as TierId[]).map((tier) => ({
    value: tier,
    label: TIER_LABEL[tier],
    meta: data.living[tier].examples.toUpperCase(),
  }));
}

export function countryName(country: CountryId): string {
  return COUNTRIES[country].name;
}

/* --- The ledger ---------------------------------------------------------- */

export interface LedgerView {
  /** In print order. Uncounted lines are included and marked. */
  lines: CostLine[];
  scholarship: ScholarshipLine;
  /** Every counted line, before scholarships. */
  subtotal: Band;
  /** Sub-total less the scholarship band. Floored at zero. */
  total: Band;
  /** Numbered notes, in marker order: one per line, then the scholarship. */
  notes: string[];
}

export function buildLedger(
  country: CountryId,
  degree: DegreeId,
  tier: TierId,
): LedgerView {
  const data = COUNTRIES[country];
  const tuition = data.tuition[degree];
  const living = data.living[tier];

  const lines: CostLine[] = [
    {
      id: "tuition",
      label: "Tuition",
      native: tuition.native,
      band: tuition.band,
      note: data.tuitionNote,
      counted: true,
    },
    {
      id: "living",
      label: `Living costs · ${TIER_LABEL[tier].toLowerCase()}`,
      native: living.native ?? living.examples,
      band: living.band,
      note: data.livingNote,
      counted: true,
    },
    ...data.fixed,
  ];

  const subtotal = lines.reduce<Band>(
    (acc, line) =>
      line.counted
        ? { low: acc.low + line.band.low, high: acc.high + line.band.high }
        : acc,
    { low: 0, high: 0 },
  );

  const total: Band = {
    low: Math.max(0, subtotal.low - data.scholarship.band.high),
    high: Math.max(0, subtotal.high - data.scholarship.band.low),
  };

  return {
    lines,
    scholarship: data.scholarship,
    subtotal,
    total,
    notes: [...lines.map((line) => line.note), data.scholarship.note],
  };
}

/* --- Method -------------------------------------------------------------- */

export const METHOD: readonly string[] = [
  "Every figure is a range, per student, per year, rounded to the nearest ₹1,000. Where we were unsure, we widened the range rather than picked a number.",
  "Rupee bands were set against indicative rates of ₹107 to the pound, ₹88 to the US dollar, ₹64 to the Canadian dollar and ₹58 to the Australian dollar. Rates move; the bands are wide enough to absorb a normal move without becoming wrong.",
  "The low end of the total assumes the largest scholarship listed and the cheapest institution in the band. Almost nobody lands there. Plan against the high end and treat anything better as a result, not a plan.",
  "Nothing on this page is a quotation, and none of it is a promise about a visa or an admission.",
];

export const METHOD_STAMP =
  "LAST VERIFIED AUG 2026 · OWNER: GO EDITORIAL · SOURCES ARE THE CHARGING AUTHORITIES AND PUBLISHED UNIVERSITY FEES";
