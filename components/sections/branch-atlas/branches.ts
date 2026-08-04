/* ===========================================================================
   THE BRANCH ATLAS — BRANCH REGISTER
   ---------------------------------------------------------------------------
   Section 8 · Chapter III TRUST · "Eighteen Doors"

   HONESTY RULES OBSERVED HERE (canon, review-blocking):
   1. The eighteen branch names are GO's own published footer list. Nothing is
      added, nothing is invented.
   2. NO precise street addresses are invented. Only Delhi South's address is
      published by GO and verifiable, so only Delhi South carries one. Every
      other branch carries a city/locality label taken from the branch name
      itself.
   3. NO phone numbers are invented. GO publishes three: the national line, the
      Delhi South direct line and the toll-free line. Delhi South gets its
      direct line; every other branch is published against the national line
      and says so, in mono, on the face of the drawer.
   4. Map coordinates are approximate and, inside the Punjab and Delhi
      clusters, displaced a few units so that neighbouring crosshairs stay
      legible. The map is stylised cartography, not a survey.
   ======================================================================== */

export type PhoneKind = "direct" | "national" | "toll-free";

export interface Phone {
  /** As set on the page. Mono, tabular. */
  display: string;
  /** Real `tel:` href — must work with JavaScript disabled. */
  href: string;
  kind: PhoneKind;
}

/** GO's national line. Published sitewide. */
export const NATIONAL_LINE: Phone = {
  display: "+91 82828 28215",
  href: "tel:+918282828215",
  kind: "national",
};

/** GO's Delhi South direct line. Published on the Delhi South contact page. */
export const DELHI_SOUTH_LINE: Phone = {
  display: "+91 11 4714 1414",
  href: "tel:+911147141414",
  kind: "direct",
};

/** GO's toll-free line. Published sitewide. */
export const TOLL_FREE_LINE: Phone = {
  display: "1800 111 119",
  href: "tel:1800111119",
  kind: "toll-free",
};

export interface Branch {
  /** Verbatim from GO's own published branch list. */
  name: string;
  /** City / locality label. Street address only where GO publishes one. */
  address: string;
  phone: Phone;
}

export interface Station {
  id: string;
  /** Key numeral shared by the map crosshair and the index row. */
  key: string;
  city: string;
  state: string;
  /** Position in the 600 x 720 stylised map viewBox. Approximate. */
  x: number;
  y: number;
  /** Hand-set key-numeral offset so no two numerals collide. */
  dx: number;
  dy: number;
  anchor: "start" | "end";
  /** Delhi South is the registered head office. */
  hq?: boolean;
  branches: Branch[];
}

/**
 * Sixteen crosshairs, eighteen doors. Mumbai carries three branches on one
 * mark; every other mark carries one. Declared north to south — the map inks
 * in this order and the index reads in this order.
 */
export const STATIONS: Station[] = [
  {
    id: "amritsar",
    key: "01",
    city: "Amritsar",
    state: "Punjab",
    x: 152,
    y: 139,
    dx: -10,
    dy: -6,
    anchor: "end",
    branches: [
      {
        name: "Amritsar",
        address: "Amritsar, Punjab",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "jalandhar",
    key: "02",
    city: "Jalandhar",
    state: "Punjab",
    x: 166,
    y: 146,
    dx: 10,
    dy: -4,
    anchor: "start",
    branches: [
      {
        name: "Jalandhar",
        address: "Jalandhar, Punjab",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "ludhiana",
    key: "03",
    city: "Ludhiana",
    state: "Punjab",
    x: 171,
    y: 156,
    dx: -10,
    dy: 2,
    anchor: "end",
    branches: [
      {
        name: "Ludhiana",
        address: "Ludhiana, Punjab",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "chandigarh",
    key: "04",
    city: "Chandigarh",
    state: "Chandigarh UT",
    x: 193,
    y: 157,
    dx: 10,
    dy: -4,
    anchor: "start",
    branches: [
      {
        name: "Chandigarh",
        address: "Chandigarh",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "mohali",
    key: "05",
    city: "Mohali",
    state: "Punjab",
    x: 183,
    y: 167,
    dx: 13,
    dy: 6,
    anchor: "start",
    branches: [
      {
        name: "Mohali",
        address: "Mohali, Punjab",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "bathinda",
    key: "06",
    city: "Bathinda",
    state: "Punjab",
    x: 154,
    y: 172,
    dx: -10,
    dy: 4,
    anchor: "end",
    branches: [
      {
        name: "Bathinda",
        address: "Bathinda, Punjab",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "patiala",
    key: "07",
    city: "Patiala",
    state: "Punjab",
    x: 177,
    y: 176,
    dx: 9,
    dy: 12,
    anchor: "start",
    branches: [
      {
        name: "Patiala",
        address: "Patiala, Punjab",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "delhi-west",
    key: "08",
    city: "Delhi West",
    state: "Delhi NCT",
    x: 188,
    y: 205,
    dx: -10,
    dy: -4,
    anchor: "end",
    branches: [
      {
        name: "Delhi West",
        address: "West Delhi",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "delhi-south",
    key: "09",
    city: "Delhi South",
    state: "Delhi NCT",
    x: 202,
    y: 215,
    dx: 10,
    dy: 4,
    anchor: "start",
    hq: true,
    branches: [
      {
        name: "Delhi South — head office",
        address: "HS-27, 2nd Floor, Kailash Colony Market, New Delhi 110048",
        phone: DELHI_SOUTH_LINE,
      },
    ],
  },
  {
    id: "ahmedabad",
    key: "10",
    city: "Ahmedabad",
    state: "Gujarat",
    x: 108,
    y: 342,
    dx: -10,
    dy: 2,
    anchor: "end",
    branches: [
      {
        name: "Ahmedabad",
        address: "Ahmedabad, Gujarat",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "thane",
    key: "11",
    city: "Thane",
    state: "Maharashtra",
    x: 124,
    y: 426,
    dx: 10,
    dy: -4,
    anchor: "start",
    branches: [
      {
        name: "Mumbai Thane",
        address: "Thane, Maharashtra",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "mumbai",
    key: "12",
    city: "Mumbai",
    state: "Maharashtra",
    x: 117,
    y: 437,
    dx: -10,
    dy: 2,
    anchor: "end",
    branches: [
      {
        name: "Mumbai Andheri",
        address: "Andheri, Mumbai",
        phone: NATIONAL_LINE,
      },
      {
        name: "Mumbai Bandra",
        address: "Bandra, Mumbai",
        phone: NATIONAL_LINE,
      },
      {
        name: "Mumbai Dadar",
        address: "Dadar, Mumbai",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "pune",
    key: "13",
    city: "Pune",
    state: "Maharashtra",
    x: 133,
    y: 448,
    dx: 10,
    dy: 4,
    anchor: "start",
    branches: [
      {
        name: "Pune",
        address: "Pune, Maharashtra",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "hyderabad",
    key: "14",
    city: "Hyderabad",
    state: "Telangana",
    x: 222,
    y: 475,
    dx: 10,
    dy: 0,
    anchor: "start",
    branches: [
      {
        name: "Hyderabad",
        address: "Hyderabad, Telangana",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "chennai",
    key: "15",
    city: "Chennai",
    state: "Tamil Nadu",
    x: 254,
    y: 575,
    dx: 10,
    dy: 2,
    anchor: "start",
    branches: [
      {
        name: "Chennai",
        address: "Chennai, Tamil Nadu",
        phone: NATIONAL_LINE,
      },
    ],
  },
  {
    id: "bangalore",
    key: "16",
    city: "Bangalore",
    state: "Karnataka",
    x: 205,
    y: 579,
    dx: -10,
    dy: 4,
    anchor: "end",
    branches: [
      {
        name: "Bangalore",
        address: "Bangalore, Karnataka",
        phone: NATIONAL_LINE,
      },
    ],
  },
];

/** 18 — derived, never hard-coded. */
export const BRANCH_COUNT = STATIONS.reduce(
  (total, station) => total + station.branches.length,
  0,
);

/** 15 — Delhi South and Delhi West share a city. */
export const CITY_COUNT = new Set(
  STATIONS.map((station) => station.city.replace(/^Delhi.*/, "Delhi")),
).size;

/** 8 states and union territories. */
export const STATE_COUNT = new Set(STATIONS.map((station) => station.state))
  .size;

/** Canon copy. Set verbatim on the face of every branch drawer. */
export const WALK_IN_LINE = "Walk in tomorrow, 11:00 AM";

/** Canon proof line. The only opening-hours claim GO actually publishes. */
export const PHONE_WINDOW = "PHONE LINES 9 AM – 9 PM IST";
