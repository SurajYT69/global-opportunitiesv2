import { Container } from "@/components/ui/container";
import { FaqTabs } from "./faq/faq-tabs";

/* ===========================================================================
   QUESTIONS — the FAQ and the parents' answers, merged
   ---------------------------------------------------------------------------
   `/` runs these as TWO sections: a seven-card "For the person who pays" grid
   in Chapter III, and a ten-item accordion in Chapter VI. Both ask the same
   kind of question and both are answered the same way, so on this page they
   are one list. Merged at the client's instruction.

   THE MERGE IS NOT A COPY-PASTE. Four pairs overlapped and were folded
   together (cost, what-we-are-paid, visa refusal, recognition), and two canon
   items were DROPPED because their copy cross-references sections that no
   longer exist on this page — "the counsellors' section above lists them by
   name" (that section was deleted on 2026-08-20) and the meta-answer that
   pointed parents at a chapter which is now these very items. Shipping either
   verbatim would have left a dangling reference.

   Ten items, ordered by what actually blocks a decision: money first,
   incentives second, the thing everyone is afraid of third.

   VOICE CONTRACT, enforced: no superlatives; no "leading / top / best / #1 /
   trusted"; no exclamation marks; no visa or admission promise; ranges printed
   rather than averages; "free counselling" never appears.

   NO FAQPage JSON-LD. `/` emits it from the same array, but this route is
   noindex, so structured data here is a duplicate-entity signal for nothing.

   Server Component — it holds the data and the heading. <FaqTabs> is the
   only client boundary, and it lives in this section's own folder, which is
   where every interactive leaf on this route goes.
   ======================================================================== */

interface Faq {
  id: string;
  topic: string;
  question: string;
  answer: string[];
}

/* SHORTENED 2026-08-21, at the client's instruction, for the tabbed card
   layout — every answer was two to four paragraphs and ran 150-250 words,
   which in a 12px-padded card is a wall.

   WHAT WAS PROTECTED IN THE CUT, because it is the reason this section is
   credible rather than decoration:
     · every published figure (the ₹20L-₹55L band, 700+ partners, 6.5/6.0
       and 7.0, the 8-9 / 3-4 / 2-3 month durations, 15 July, the Graduate
       Route's two and three years, 20 hours, fifteen minutes, 9-9 IST)
     · every NON-promise — no visa success rate, we do not lend, we do not
       mark up third-party fees, never payment over WhatsApp, nobody should
       be paid to secure a scholarship
     · the conflict-of-interest admission in "what do you charge", which is
       the single most load-bearing sentence on the page
   The voice contract still holds: no superlatives, no promise about a visa
   or an admission, ranges rather than averages.

   ONE FACTUAL FIX RODE ALONG. The old english-test answer said "we do not
   sell test preparation" — that stopped being true when <TestPreparations>
   was added to this route, and it sits four sections above this one. The
   claim is gone rather than restated. */
const FAQS: Faq[] = [
  {
    id: "total-cost",
    topic: "Money",
    question: "What will the whole thing actually cost?",
    answer: [
      "A year abroad, counting tuition, living, the visa, health cover and one return flight, usually runs between ₹20,00,000 and ₹55,00,000. The ledger above prints it line by line and re-sets when you change the country, the degree or the size of the city. We publish ranges rather than an average, because an average hides the case you are in. Ask us to price your education loan before you apply anywhere; we do not lend.",
    ],
  },
  {
    id: "what-you-charge",
    topic: "Money",
    question: "What do you charge? And if it is free, who pays you?",
    answer: [
      "Counselling, shortlisting, applications, documents, interview practice and the visa file cost you nothing: no registration fee and no success fee. The universities pay us a commission out of tuition when a student we introduced enrols. You should hear the conflict in that, because it is real: ask your counsellor which universities on your shortlist pay us, and why each one is on it. Test fees, application fees, the visa fee, the health surcharge and a GIC you pay directly, at their published price. We do not mark them up.",
    ],
  },
  {
    id: "visa-refused",
    topic: "Risk",
    question: "What happens if the visa is refused?",
    answer: [
      "It happens, and nobody in this industry can promise you it will not. The decision belongs to a government. We publish no visa success rate anywhere on this page: a percentage with no denominator and no auditor is not evidence. A former visa official reviews every file before it is submitted, because most refusals turn on documentation and financial evidence rather than on the student. If a refusal comes, your counsellor reads the letter with you inside one working day, and we rebuild and re-file, or ask the university in writing to defer your offer. There was nothing to charge for the first file, so there is nothing to charge for the second.",
    ],
  },
  {
    id: "safety",
    topic: "For parents",
    question: "Will my child be safe, and who do I call?",
    answer: [
      "You get a named counsellor with a direct number, and so does your child, not a ticket number and not a call centre. We will not tell you a foreign city is safe. We will tell you in writing which areas students actually live in, which accommodation has a warden on site, and what the university's own out-of-hours number is. Before departure we go through housing, the first week, emergency numbers and opening a bank account. We never take payment instructions over WhatsApp, and no counsellor will ask you to transfer money to a personal account.",
    ],
  },
  {
    id: "who-calls",
    topic: "For parents",
    question: "Who actually calls, and when?",
    answer: [
      "A counsellor calls within fifteen minutes, between 9 AM and 9 PM IST, or the next morning if the enquiry arrives outside those hours. We do not call families at night. The person who calls is the person who handles the file, parents are on the first call unless the student asks otherwise, and the cost sheet goes out in writing before any money moves. Counsellors do leave, and when yours does you are told who has taken the file over before you find out by ringing a number that no longer answers.",
    ],
  },
  {
    id: "scholarships",
    topic: "Money",
    question: "Are there scholarships, and do you charge to find them?",
    answer: [
      "There are, and no. Scholarship search is part of the free guidance session. Three kinds are worth your time: university merit awards and fee waivers, often applied at the offer stage without a separate application; government schemes such as Chevening, DAAD and Australia Awards, applied for on the funder's own website; and small department bursaries, which are the ones most students never look for. Most students who receive something receive a partial tuition reduction, not full funding, so build your budget as though you will not get one. Nobody should ever be paid to secure a scholarship for you, and that includes us.",
    ],
  },
  {
    id: "when-to-start",
    topic: "Timing",
    question: "When should I start, and which intake should I aim for?",
    answer: [
      "Work backwards from the intake rather than forwards from today. Applications open eight to nine months before the intake window, university decisions take three to four months, and the visa a further two to three. Those are our own documented durations, not best cases. The UK runs a main September/October intake and a secondary January/February one; Canada's primary intake is Fall in September, with Winter in January; Germany's winter semester closes on 15 July. So if you are aiming at September 2027, the first conversation should happen by December 2026. Starting later usually means the next intake, and that is a decision, not a failure.",
    ],
  },
  {
    id: "english-test",
    topic: "Admissions",
    question: "Do I need IELTS, and what score?",
    answer: [
      "Almost every destination asks for evidence of English. Which test is accepted, whether IELTS, PTE, TOEFL or in some places Duolingo, is decided by the university and by the country's visa rules, not by us. A common postgraduate requirement is 6.5 overall with no individual band below 6.0; some programmes, and most regulated fields such as nursing, ask for 7.0. Some universities waive the test on a medium-of-instruction letter, but the visa authority can still want one, so confirm both. Your counsellor gives you the exact requirement for each university on your shortlist, in writing, before you pay for a test date.",
    ],
  },
  {
    id: "after-the-degree",
    topic: "Afterwards",
    question:
      "Can I work there afterwards, and will the degree be recognised in India?",
    answer: [
      "Post-study work is a government rule, not a university one, and it moves. The UK's Graduate Route currently allows two years after a degree and three after a doctorate, with 20 hours of work a week in term time. For every other destination your counsellor gives you the rule as it stands on the day you ask, with the government page it came from and the date it was checked. We do not print a rule here that we cannot date. On recognition in India, a private employer generally accepts a degree from a university recognised in its own country, while the Association of Indian Universities issues equivalence certificates where a public-sector recruiter asks for one, and a one-year Master's is not automatically read as equivalent to a two-year Indian one. Say what you intend to do afterwards before the shortlist is made, not after the offer arrives.",
    ],
  },
  {
    id: "why-a-consultant",
    topic: "The basics",
    question: "Why use a consultant at all? I could apply on my own.",
    answer: [
      "Plenty of students do apply on their own, and it works. If you already know your five universities, your funding is settled and you have filed a study visa before, you may not need us. What we add is narrower than this category usually claims: we shortlist against your actual marks, your budget and an intake you can realistically make, we know which of our 700+ partner universities have taken profiles like yours, and the visa file is checked before it is filed by people who used to assess visa applications for a living. The guidance session costs you nothing, so the question is not money. It is whether you would rather spend eight months learning this yourself.",
    ],
  },
];

/* ---------------------------------------------------------------------------
   THE TWO TABS ARE AUDIENCES, NOT TOPICS (2026-08-21, client direction).

   The `topic` field above yields seven values — Money, Risk, For parents,
   Timing, Admissions, Afterwards, The basics — and seven tabs over ten
   questions is a filter row longer than the thing it filters. The client
   marked up the 21st.dev preview with two groups, "For Parents" and "For
   Students", and that is the split: the person who pays and the person who
   goes. It is also the audience CLAUDE.md names for the whole site.

   `students` is DERIVED as the complement, deliberately. Listing both sets by
   hand means a typo in an id silently drops a question out of the section
   with nothing to catch it. This way every entry lands in exactly one tab and
   a bad id can only mis-file, never delete.

   `topic` is no longer rendered — the tab above the list does that job now.
   The field stays on the interface because `/` still reads it.
   ------------------------------------------------------------------------ */

const AUDIENCES = {
  parents: "For parents",
  students: "For students",
} as const;

/** The person who pays: cost, incentives, safety, contact, scholarships. */
const PARENT_IDS = new Set([
  "total-cost",
  "what-you-charge",
  "safety",
  "who-calls",
  "scholarships",
]);

const GROUPED = {
  parents: FAQS.filter((f) => PARENT_IDS.has(f.id)),
  students: FAQS.filter((f) => !PARENT_IDS.has(f.id)),
};

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-section-y">
      <Container className="flex flex-col gap-8">
        {/* Centred, because the tab row and the list below it are centred —
            a left-ranged heading over a centred filter row reads as two
            different components stacked. This is the only centred heading on
            the page and it is the component's own composition. */}
        <header className="mx-auto flex max-w-prose flex-col items-center gap-3 text-center">
          <p className="text-caption text-muted-foreground">Questions</p>
          <h2 className="text-d2 text-ink">Questions people actually ask.</h2>
          <p className="text-body text-muted-foreground">
            Including the ones parents ask. If the answer to yours is not here,
            it is the first thing the guidance session is for.
          </p>
        </header>

        <FaqTabs categories={AUDIENCES} faqs={GROUPED} />
      </Container>
    </section>
  );
}
