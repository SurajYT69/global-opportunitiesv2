import {
  ArrowLeftRight,
  BedDouble,
  BookOpen,
  Calculator,
  ClipboardList,
  FileCheck2,
  FileSearch,
  Landmark,
  ListFilter,
  MessagesSquare,
  Mic,
  PiggyBank,
  Scale,
  ShieldPlus,
  Signpost,
} from "lucide-react";

import type { SourceId } from "@/components/ui/footnote";
import type { IconComponent } from "@/components/ui/icon";

/* ===========================================================================
   SECTION 6 · what-we-do — the service bento, content model.
   ---------------------------------------------------------------------------
   The same fifteen services GO publishes (the fourteen on the homepage plus
   Career Guidance from /our-services/). Nothing is invented and nothing is
   dropped — the ledger has been regrouped into six cards in the order the work
   actually happens, and every line has been cut to a single clause.

   GO charges ₹0 on all fifteen. `atCost` names the third party the student pays
   directly, at cost, with nothing added by us. Seven of the fifteen carry one.
   That pairing is the section's whole argument, so it is data, never prose.

   ICONS (2026-08-04, Lucide adopted site-wide). One glyph per line, fifteen
   distinct, stored here because the glyph is a property of the service, not of
   the card that happens to hold it. This file stays JSX-free: the components
   are imported as VALUES and rendered by `what-we-do.tsx` through
   `<Icon as={…}>`, which is the only thing allowed to draw a Lucide path.

   Each glyph names the ACTION, never the travel motif — banned throughout:
   flags, globes, aircraft, passports, graduation caps, handshakes, suitcases.
   So 09 Visa is a file being read (FileSearch) rather than a passport, and 15
   Travel is the pre-departure checklist (ClipboardList) rather than a plane.
   ======================================================================== */

/** One segment of a card's mono fact line. `note` appends its source marker. */
export interface FactPart {
  text: string;
  note?: SourceId;
}

/** One of the fifteen. `n` is the ordinal it carries in GO's own list. */
export interface ServiceLine {
  n: string;
  name: string;
  /** One clause. If it needs a second sentence, it belongs in the card `note`. */
  qualifier: string;
  /** Third party paid directly by the student. Absent = free outright. */
  atCost?: string;
  /** The line's own glyph. Distinct across all fifteen; drawn via `<Icon>`. */
  icon: IconComponent;
}

export interface ServiceCard {
  id: string;
  /** Ordinal span, mono. A fact about the ledger, not a label. */
  range: string;
  title: string;
  lines: ServiceLine[];
  /** Mono fact line — figures only, each resolving to a source. */
  fact?: FactPart[];
  /** One conservative annotation, set as prose. Never a superlative. */
  note?: string;
  /**
   * Bento span on the 6-column desktop grid. Rows sum to 6:
   *   4 + 2  ·  2 + 4  ·  3 + 3
   * The two wide anchors carry the two largest groups.
   */
  span: string;
}

export const SERVICE_CARDS: ServiceCard[] = [
  {
    id: "counselling",
    range: "01–03",
    title: "Counselling, and an honest shortlist",
    lines: [
      {
        n: "01",
        name: "Education counselling",
        qualifier:
          "a named counsellor, thirty minutes, and no file opened until you say so",
        icon: MessagesSquare,
      },
      {
        n: "02",
        name: "Career guidance",
        qualifier: "what the degree opens, and what it does not",
        icon: Signpost,
      },
      {
        n: "03",
        name: "Profile shortlisting",
        qualifier:
          "marks, tests, gaps and backlogs read against what each university admits",
        icon: ListFilter,
      },
    ],
    fact: [
      { text: "18 offices", note: "offices" },
      { text: "30 min" },
      { text: "no obligation" },
    ],
    span: "sm:col-span-2 md:col-span-4",
  },
  {
    id: "destinations",
    range: "04–05",
    title: "Where, and which course",
    lines: [
      {
        n: "04",
        name: "Country information",
        qualifier:
          "intake windows, post-study work rights, the rules as they stand",
        icon: Scale,
      },
      {
        n: "05",
        name: "Selection of course",
        qualifier: "a shortlist with the reason for each one written next to it",
        icon: BookOpen,
      },
    ],
    fact: [
      { text: "15 destinations", note: "destinations" },
      { text: "700+ partner universities", note: "partner-universities" },
    ],
    span: "md:col-span-2",
  },
  {
    id: "application",
    range: "06 · 08",
    title: "The application, and the interview",
    lines: [
      {
        n: "06",
        name: "Admission guidance",
        qualifier:
          "documents, deadlines, statements of purpose, tracked to the decision letter",
        icon: FileCheck2,
      },
      {
        n: "08",
        name: "Interview preparation",
        qualifier:
          "mock rounds for the university, and for the visa where one is required",
        icon: Mic,
      },
    ],
    span: "md:col-span-2",
  },
  {
    id: "money",
    range: "07 · 10–13",
    title: "Money: the sheet, the loan, the forex, the cover",
    lines: [
      {
        n: "07",
        name: "Financial estimation",
        qualifier:
          "a written cost sheet in rupees — ranges, never one confident number",
        icon: Calculator,
      },
      {
        n: "10",
        name: "Education loan",
        qualifier:
          "lender introductions, and the EMI arithmetic done in front of you",
        atCost: "the lender",
        icon: Landmark,
      },
      {
        n: "11",
        name: "Forex exchange",
        qualifier:
          "the published rate on the day, with the spread shown, not absorbed",
        atCost: "the forex provider",
        icon: ArrowLeftRight,
      },
      {
        n: "12",
        name: "GIC account",
        qualifier:
          "opened before the visa file goes in; the deposit stays your money",
        atCost: "the Canadian bank",
        icon: PiggyBank,
      },
      {
        n: "13",
        name: "Medical insurance",
        qualifier:
          "cover read against your destination's visa rule, not a brochure",
        atCost: "the insurer",
        icon: ShieldPlus,
      },
    ],
    span: "sm:col-span-2 md:col-span-4",
  },
  {
    id: "visa",
    range: "09",
    title: "The visa file",
    lines: [
      {
        n: "09",
        name: "Visa services",
        qualifier:
          "assembled, checked and submitted, with the refusal grounds read before it goes in rather than after",
        atCost: "the issuing government",
        icon: FileSearch,
      },
    ],
    note: "This desk is supervised by former visa officials — people who used to decide these files.",
    fact: [{ text: "No success rate published" }],
    span: "md:col-span-3",
  },
  {
    id: "departure",
    range: "14–15",
    title: "Before you fly",
    lines: [
      {
        n: "14",
        name: "Accommodation",
        qualifier:
          "a room found and booked before you land, not from a hostel in week one",
        atCost: "the housing provider",
        icon: BedDouble,
      },
      {
        n: "15",
        name: "Travel guidance",
        qualifier:
          "flights, baggage rules, and what has to be in the cabin bag at immigration",
        atCost: "the airline",
        icon: ClipboardList,
      },
    ],
    span: "md:col-span-3",
  },
];

const ALL_LINES = SERVICE_CARDS.flatMap((card) => card.lines);

/** Fifteen. Counted, never typed. */
export const SERVICE_COUNT = ALL_LINES.length;

/** How many of the fifteen attach a fee that is not GO's. Seven. */
export const AT_COST_COUNT = ALL_LINES.filter((line) => line.atCost).length;

/** The named third parties on one card, deduped, in ledger order. */
export function atCostParties(card: ServiceCard): string[] {
  const seen = new Set<string>();
  for (const line of card.lines) {
    if (line.atCost) seen.add(line.atCost);
  }
  return [...seen];
}

/** Sources cited from this section, in marker order. Resolves below 1024px. */
export const CITED_SOURCES: SourceId[] = [
  "partner-universities",
  "destinations",
  "offices",
];
