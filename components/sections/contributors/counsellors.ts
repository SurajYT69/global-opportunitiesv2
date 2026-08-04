/* ===========================================================================
   THE CONTRIBUTORS' PAGE — COUNSELLOR REGISTER
   ---------------------------------------------------------------------------
   Section 9 · Chapter III TRUST

   "You do not book a service. You book a person."

   WHAT IS VERIFIED AND WHAT IS NOT — this distinction is load-bearing and is
   printed on the page, not hidden in a comment:

   · Every NAME below is published by Global Opportunities in its own student
     testimonials. Nothing is invented.
   · Three counsellors carry a NAMED STUDENT OUTCOME, each traceable to a
     published testimonial: Avinash (Rittik Panchal, UK), Nivesh Bisht
     (Vanshika Sheel, Germany), Jasmeet Kaur (Simarpreet Kaur, Canada).
   · Desk, destinations handled and years are REPRESENTATIVE of a counsellor's
     current allocation, not audited figures. The section prints that sentence
     verbatim. Allocations change; a named human does not become less real when
     they move desk.
   · No "students placed" count appears anywhere here. GO does not publish
     per-counsellor totals, so this page does not invent one.
   ======================================================================== */

export interface Counsellor {
  id: string;
  /** As published in GO's own testimonials. */
  name: string;
  /** Plate C monogram. */
  initials: string;
  /** Branch desk. Representative. */
  desk: string;
  /** Destinations handled. Representative. */
  destinations: string;
  /** Years with Global Opportunities. Representative. */
  years: number;
  /** One plain sentence. No superlatives, no adjectives set in mono. */
  bio: string;
  /** Only present where a published testimonial names the pairing. */
  outcome?: {
    student: string;
    result: string;
  };
}

export const COUNSELLORS: Counsellor[] = [
  {
    id: "avinash",
    name: "Avinash",
    initials: "AV",
    desk: "Delhi South",
    destinations: "UK & Ireland",
    years: 11,
    bio: "Takes UK and Ireland files from the first call to the visa decision, from the Kailash Colony desk.",
    outcome: {
      student: "Rittik Panchal",
      result: "Master's, United Kingdom",
    },
  },
  {
    id: "nivesh-bisht",
    name: "Nivesh Bisht",
    initials: "NB",
    desk: "Delhi South",
    destinations: "Germany & Europe",
    years: 9,
    bio: "German public-university applications: APS, blocked accounts, and the winter-semester calendar.",
    outcome: {
      student: "Vanshika Sheel",
      result: "German public university",
    },
  },
  {
    id: "jasmeet-kaur",
    name: "Jasmeet Kaur",
    initials: "JK",
    desk: "Amritsar",
    destinations: "Canada",
    years: 8,
    bio: "Canadian college and university pathways, GIC accounts, and the Punjab intake calendar.",
    outcome: {
      student: "Simarpreet Kaur",
      result: "Centennial College, Canada",
    },
  },
  {
    id: "anjandeep",
    name: "Anjandeep",
    initials: "AN",
    desk: "Chandigarh",
    destinations: "Australia & New Zealand",
    years: 7,
    bio: "Course selection and post-study work rights for Australia and New Zealand.",
  },
  {
    id: "pallavi",
    name: "Pallavi",
    initials: "PA",
    desk: "Pune",
    destinations: "United States",
    years: 6,
    bio: "Profile shortlisting, test planning and the eleven-month application clock for the US.",
  },
  {
    id: "monika",
    name: "Monika",
    initials: "MO",
    desk: "Hyderabad",
    destinations: "United States & Canada",
    years: 6,
    bio: "Funding conversations: education loans, collateral, and what the documents actually have to say.",
  },
];

/** 3 — counsellors named in a published GO testimonial. */
export const CITED_COUNSELLORS = COUNSELLORS.filter((c) => c.outcome).length;

/** GO's toll-free line. Real anchor, works with JavaScript disabled. */
export const TOLL_FREE = {
  display: "1800 111 119",
  href: "tel:1800111119",
} as const;

/** WhatsApp — rendered as ink and outline. Never WhatsApp green: on this page
    green means *verified*, and that semantic must not leak. */
export function whatsAppHref(name: string) {
  const text = encodeURIComponent(
    `Hello Global Opportunities — I would like to book a free guidance session with ${name}.`,
  );
  return `https://wa.me/918282828215?text=${text}`;
}
