import type { CSSProperties } from "react";
import { Container } from "@/components/ui/container";
import { Rule } from "@/components/ui/rule";
import { SectionHeading } from "@/components/ui/section-heading";
import { QuestionDisclosure } from "./questions/accordion";

/* ===========================================================================
   14 · QUESTIONS PEOPLE ACTUALLY ASK          Chapter VI — Success
   ---------------------------------------------------------------------------
   Surface: --paper, entered through the 24vh --grad-endpaper-return band.
   Purpose: kill the last objections immediately before the ask.

   ONE data array drives both the rendered accordion and the FAQPage JSON-LD.
   FAQ rich results were deprecated 7 May 2026 — the markup is emitted anyway
   because it is valid, harmless, and is what AI answer engines retrieve.

   Voice contract, enforced here: no superlatives; no "leading / top / best /
   #1 / trusted partner / world-class"; no exclamation marks; no visa or
   admission promise; ranges printed rather than averages. Figures sit in
   running body copy, not in mono — the mono law reserves IBM Plex Mono for
   figures that carry a footnote resolving to the colophon's sources table.
   ======================================================================== */

/** A paragraph, or a bullet list. Order is preserved into the JSON-LD. */
type AnswerBlock = string | string[];

interface FaqItem {
  /** Stable slug — becomes the button/panel id pair. */
  id: string;
  question: string;
  answer: AnswerBlock[];
}

const FAQS: FaqItem[] = [
  {
    id: "why-a-consultant",
    question: "Why use a consultant at all? I could apply on my own.",
    answer: [
      "Plenty of students do apply on their own, and it works. If you already know your five universities, your funding is settled and you have filed a study visa before, you may not need us.",
      "What we add is narrower than this category usually claims. We shortlist against your actual marks, your budget and the intake you can realistically make. We know which of our 700+ partner universities have taken profiles like yours and which have not. We assemble the document set, and the visa file is checked before it is filed by people who used to assess visa applications for a living.",
      "Because counselling costs you nothing, the question is not money. It is whether you would rather spend eight months learning this yourself, and what a rejected application or a missed intake would cost you if you got it wrong.",
    ],
  },
  {
    id: "what-you-charge",
    question: "What do you charge? And if it is free, who pays you?",
    answer: [
      "Counselling, shortlisting, applications, document preparation, interview practice and the visa file cost you nothing. There is no registration fee, no success fee and no package to buy.",
      "The universities pay us. When a student we introduced enrols, the institution pays a commission out of tuition it has already priced. That is the whole model, and it is the model most agencies in this category use, whether or not they print it.",
      "You should hear the conflict in that sentence, because it is real: an agency paid per enrolment has an incentive to steer. So ask your counsellor out loud which universities on your shortlist pay us and which do not, and ask why each one is on the list. A counsellor who cannot answer that has not done the work.",
      "Money that is not ours stays out of our hands. Test fees, university application fees where they exist, the visa fee, the health surcharge, medical checks, forex and a GIC where the destination requires one are paid by you, directly to those bodies, at their published price. We do not mark them up and we do not collect them on their behalf.",
    ],
  },
  {
    id: "visa-refused",
    question: "What happens if my visa is refused?",
    answer: [
      "First, the part no consultant can honestly soften: nobody can promise you a visa. The decision belongs to a government. Any success percentage you are quoted, by us or by anyone, is a statement about other people in the past, not a statement about you.",
      "If a refusal comes, the letter states the ground it was refused on, and your counsellor reads it with you inside one working day. What happens next depends on that ground.",
      [
        "A missing or weak document, or maintenance funds held for the wrong number of days: we rebuild the file and re-file at the next available date.",
        "Credibility, meaning the interview: we prepare you again, on the specific answers that failed.",
        "A ground we cannot fix before the course starts: we ask the university in writing to defer your offer to the next intake. Most of our partners do. It is a request, not a right, and we tell you the answer either way.",
      ],
      "What nobody can return to you: the visa fee and the health surcharge are paid to a government and are not refundable by us or by the university. Tuition deposits follow the institution's own published refusal-refund policy — we show you that policy in writing before you pay a deposit, not after.",
    ],
  },
  {
    id: "total-cost",
    question: "What will the whole thing actually cost?",
    answer: [
      "We publish ranges rather than an average, because an average hides the case you are in.",
      "A one-year master's in the United Kingdom is our most common case. Published tuition runs £9,000 to £30,000 for the year. Living costs are budgeted at £1,136 a month outside London and £1,483 a month in London. The student visa is £524, and the Immigration Health Surcharge is £776 for each full year of the course and £388 for a part year. Undergraduate tuition in the UK runs £11,400 to £38,000 a year.",
      "Canada averages CAD 21,100 a year for a postgraduate programme and CAD 36,100 for an undergraduate one, before living costs and before the GIC deposit.",
      "On top of tuition and living, budget for flights, insurance, the spread you lose on forex, and a GIC or equivalent proof-of-funds deposit where the destination asks for one. The costs section higher up this page sets all of it out in rupees, line by line, with the conversion rate we used and the date we took it.",
    ],
  },
  {
    id: "scholarships",
    question: "Are there scholarships, and do you charge to find them?",
    answer: [
      "There are, and no. Scholarship search is part of the free guidance session.",
      "Three kinds are worth your time.",
      [
        "University merit awards and fee waivers. Usually a percentage off tuition, and at many institutions applied at the offer stage without a separate application.",
        "Government and public schemes — Chevening and Commonwealth for the UK, DAAD for Germany, Australia Awards. Competitive, dated, and applied for on the funder's own website.",
        "Department and country-specific bursaries. Small, numerous, and the ones most students never look for.",
      ],
      "The honest shape of it: most students who receive something receive a partial tuition reduction, not full funding. Build your budget as though you will not get one, and treat anything you do get as the bill coming down.",
      "We link every scheme to the funder's own page, and you apply there in your own name. Nobody should ever be paid to secure a scholarship for you, and that includes us.",
    ],
  },
  {
    id: "when-to-start",
    question: "When should I start, and which intake should I aim for?",
    answer: [
      "Work backwards from the intake rather than forwards from today.",
      "Applications open eight to nine months before the intake window. University decisions take three to four months. The visa takes a further two to three months after that. Those are our own documented durations, not best cases.",
      "The intakes themselves: the United Kingdom runs a main September/October intake, a secondary January/February one, and May/June for a limited set of programmes. Canada's primary intake is Fall in September, with Winter in January and a limited Summer in May/June. Germany's winter semester closes on 15 July.",
      "In practice, if you are aiming at September 2027, the first conversation should happen by December 2026. Starting later is not a disaster. It usually means the next intake, and choosing the next intake is a decision, not a failure.",
    ],
  },
  {
    id: "english-test",
    question: "Do I need IELTS, and what score?",
    answer: [
      "Almost every destination asks for evidence of English. Which test is accepted — IELTS, PTE, TOEFL, and in some places Duolingo — is decided by the university and by the country's visa rules. It is not our decision, and we do not sell test preparation.",
      "A common postgraduate requirement is 6.5 overall with no individual band below 6.0. Some programmes, and most regulated fields such as nursing, ask for 7.0. Requirements differ by university, by course and by year, so treat any single number you read online as a starting guess.",
      "Some universities waive the test where your schooling or degree was taught in English, on a medium-of-instruction letter. The visa authority can still want a test even when the university does not. Confirm both before you book anything.",
      "Your counsellor gives you the exact requirement for each university on your shortlist, in writing, before you pay for a test date. Interview practice we do run ourselves, and it is free.",
    ],
  },
  {
    id: "after-the-degree",
    question:
      "After the degree — can I work there, and will the degree be recognised in India?",
    answer: [
      "Post-study work is a government rule, not a university one, and it moves. The United Kingdom's Graduate Route currently allows two years after a degree and three after a doctorate. During term time the UK permits 20 hours of work a week, and full hours in the holidays.",
      "For every other destination your counsellor gives you the rule as it stands on the day you ask, with the government page it came from and the date it was checked. We do not print a rule here that we cannot date.",
      "On recognition in India: a degree from an institution accredited in its own country is generally recognised here, and the Association of Indian Universities issues equivalence certificates where an employer or a public-sector recruiter asks for one. Recognition rests on the institution, not on us — which is why every university on your shortlist is one we can name, with its accreditation attached, before you apply to it.",
    ],
  },
  {
    id: "parents",
    question: "My parents are paying, and they are worried. What do they get?",
    answer: [
      "A chapter of this page is written for them rather than for you, in plainer language and, if they prefer, in Hindi.",
      "Concretely: they are on the first call unless you ask otherwise. They get the cost sheet in writing before any money moves. They get the name, the city and the direct line of the counsellor holding the file, not a call-centre queue. They can walk into one of eighteen branches and sit across a desk from that person.",
      "On safety, which is the question parents ask about daughters and rarely ask out loud: we place students in accommodation we have placed students in before, we hand over the local emergency numbers and the university's own student-safety and reporting contacts before they fly, and we say which cities and which housing we would not put our own family in. We will not tell you a country is uniformly safe. Nowhere is.",
      "We never take payment instructions over WhatsApp, and no counsellor will ever ask you to transfer money to a personal account. We do not make promotional calls between 9 PM and 9 AM.",
    ],
  },
  {
    id: "counsellor-matching",
    question: "How do I get a counsellor, and can I ask for one by name?",
    answer: [
      "You are matched on destination first and on branch second, because destination knowledge is the part that takes years to build. The counsellors' section above lists them by name, city, the countries they handle and how long they have handled them.",
      "You can ask for a specific counsellor. If that person is at capacity we will say so, rather than book you in and reassign you quietly afterwards.",
      "The first call is thirty minutes, free, and carries no obligation. Between 9 AM and 9 PM IST a counsellor calls you within fifteen minutes of your enquiry.",
      "If your counsellor leaves, or you would simply rather work with someone else, say so. The file moves with its notes attached. You are not a lead being passed around a floor.",
    ],
  },
];

/** The same array, flattened to plain text for the FAQPage graph. */
function answerText(blocks: AnswerBlock[]): string {
  return blocks
    .map((block) =>
      Array.isArray(block)
        ? block.map((point) => `— ${point}`).join("\n")
        : block,
    )
    .join("\n\n");
}

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answerText(item.answer),
    },
  })),
};

/*
 * Chapter VI's Newsreader optical-size axis, set directly rather than through
 * `data-chapter="success"`: that attribute also swaps the focus ring to
 * --ochre-on-dark, which is ~1.5:1 on --paper and fails WCAG 2.2 SC 1.4.11.
 * The dark-chapter overrides belong to `endpaper`; this section has turned
 * back to paper.
 */
const CHAPTER_AXIS = { "--nr-opsz": 72 } as CSSProperties;

export default function Questions() {
  return (
    <section
      id="questions"
      aria-labelledby="questions-heading"
      className="relative bg-paper"
      style={CHAPTER_AXIS}
    >
      {/* The page turns back to paper. 24vh band, canon-restricted to the top
          of this section only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[24vh]"
        style={{ backgroundImage: "var(--grad-endpaper-return)" }}
      />

      <Container className="relative pt-[calc(24vh+var(--s-6))] pb-section-y">
        <SectionHeading
          id="questions-heading"
          eyebrow="TEN QUESTIONS · ANSWERED IN FULL"
          deck="The ones asked on the first call, in the order they get asked. Where the answer is a range, the range is printed. Where nobody can know the answer, we say that instead."
        >
          Questions people actually ask.
        </SectionHeading>

        <Rule weight="chapter" className="mt-12" />

        <ul className="m-0 list-none p-0">
          {FAQS.map((item, index) => (
            <QuestionDisclosure
              key={item.id}
              id={item.id}
              index={index + 1}
              question={item.question}
            >
              <div className="flex flex-col gap-4">
                {item.answer.map((block, blockIndex) =>
                  Array.isArray(block) ? (
                    <ul
                      key={blockIndex}
                      className="m-0 flex list-none flex-col gap-3 border-l border-rule p-0 pl-4"
                    >
                      {block.map((point) => (
                        <li
                          key={point}
                          className="font-ui text-body-sm text-ink-muted"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      key={blockIndex}
                      className="font-ui text-body text-ink-muted"
                    >
                      {block}
                    </p>
                  ),
                )}
              </div>
            </QuestionDisclosure>
          ))}
        </ul>

        <p className="mt-10 max-w-prose font-display text-footnote opsz-8 text-ink-muted">
          Tuition, living costs and immigration rules quoted above are the
          figures Global Opportunities publishes on its own country pages, last
          checked in August 2026. Every counted claim on this page resolves to
          the{" "}
          <a
            href="#colophon"
            className="text-marine underline decoration-rule-strong decoration-1 underline-offset-4 hover:decoration-sienna hover:decoration-2"
          >
            sources table at the foot of this page
          </a>
          .
        </p>
      </Container>

      <script
        type="application/ld+json"
        // Static, author-controlled data. `<` is escaped so the JSON can never
        // close the script element early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
