import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";

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

   Server Component — Radix's Accordion is the only client boundary, and it is
   inside the primitive.
   ======================================================================== */

interface Faq {
  id: string;
  topic: string;
  question: string;
  answer: string[];
}

const FAQS: Faq[] = [
  {
    id: "total-cost",
    topic: "Money",
    question: "What will the whole thing actually cost?",
    answer: [
      "A year abroad — tuition, living, the visa, health cover, one return flight — usually runs between ₹20,00,000 and ₹55,00,000. The ledger above prints it line by line in rupees, and re-sets with its note attached when you change the country, the degree or the size of the city.",
      "The range is that wide because the honest range is wide: a taught Master's in a smaller Canadian city and an MBA in London are not the same purchase. We publish ranges rather than an average, because an average hides the case you are in.",
      "An education loan is priced very differently depending on whether it is secured against property — over ten years the difference is larger than most families expect. Ask us to run that number before you apply anywhere. We do not lend.",
    ],
  },
  {
    id: "what-you-charge",
    topic: "Money",
    question: "What do you charge? And if it is free, who pays you?",
    answer: [
      "Counselling, shortlisting, applications, document preparation, interview practice and the visa file cost you nothing. There is no registration fee, no success fee and no package to buy.",
      "The universities pay us. When a student we introduced enrols, the institution pays a commission out of tuition it has already priced. That is the whole model, and it is the model most agencies in this category use, whether or not they print it.",
      "You should hear the conflict in that sentence, because it is real: an agency paid per enrolment has an incentive to steer. So ask your counsellor out loud which universities on your shortlist pay us and which do not, and ask why each one is on the list. A counsellor who cannot answer that has not done the work.",
      "Money that is not ours stays out of our hands. Test fees, university application fees where they exist, the visa fee, the health surcharge, medical checks, forex and a GIC where the destination requires one are paid by you, directly to those bodies, at their published price. We do not mark them up and we do not collect them on their behalf. A small number of services — IELTS or PTE coaching, for example — are paid, and they are marked and priced where they are listed.",
    ],
  },
  {
    id: "visa-refused",
    topic: "Risk",
    question: "What happens if the visa is refused?",
    answer: [
      "It happens, and nobody in this industry can promise you it will not. The decision belongs to a government. We publish no visa success rate anywhere on this page: a percentage with no denominator and no auditor is not evidence, and any figure you are quoted — by us or by anyone — is a statement about other people in the past, not about you.",
      "Before a file is submitted, a former visa official on our team reviews it. That review happens before submission rather than after a decision because most refusals turn on documentation and financial evidence rather than on the student.",
      "If a refusal comes, the letter states the ground, and your counsellor reads it with you inside one working day. A missing or weak document, or maintenance funds held for the wrong number of days: we rebuild the file and re-file. Credibility, meaning the interview: we prepare you again on the answers that failed. Something that cannot be fixed before the course starts: we ask the university in writing to defer your offer to the next intake. Most of our partners do. It is a request, not a right, and we tell you the answer either way.",
      "There was nothing to charge for the first file, so there is nothing to charge for the second. What nobody can return to you: the visa fee and the health surcharge are paid to a government and are not refundable by us or by the university. Tuition deposits follow the institution's own published refusal-refund policy — we show you that policy in writing before you pay a deposit, not after.",
    ],
  },
  {
    id: "safety",
    topic: "For parents",
    question: "Will my child be safe, and who do I call?",
    answer: [
      "You get a named counsellor with a direct number, and so does your child — not a ticket number and not a call centre. We will not tell you a foreign city is safe. We will tell you which areas students actually live in, in writing, before your child flies.",
      "Before departure we go through accommodation, the first week, local emergency numbers, registration with the university, and how to open a bank account. We place students in accommodation we have placed students in before, and we say which cities and which housing we would not put our own family in. After departure the counsellor stays reachable.",
      "Some foreign cities are safer than parts of India and some are not, and a consultant who answers that question with one word is not answering it. So instead you get addresses and numbers: which university accommodation has a warden on site, and what the university's own out-of-hours number is.",
      "We never take payment instructions over WhatsApp, and no counsellor will ever ask you to transfer money to a personal account. We do not make promotional calls between 9 PM and 9 AM.",
    ],
  },
  {
    id: "who-calls",
    topic: "For parents",
    question: "Who actually calls, and when?",
    answer: [
      "A counsellor calls within fifteen minutes of an enquiry, between 9 AM and 9 PM IST. If the enquiry arrives outside those hours, the call comes the next morning. We do not call families at night.",
      "The person who calls is the person who handles the file. Parents are on the first call unless the student asks otherwise, and the cost sheet goes out in writing before any money moves.",
      "Counsellors do leave, and when yours does you are told who has taken the file over and why — before you find out by ringing a number that no longer answers. The file moves with its notes attached. You are not a lead being passed around a floor.",
    ],
  },
  {
    id: "scholarships",
    topic: "Money",
    question: "Are there scholarships, and do you charge to find them?",
    answer: [
      "There are, and no. Scholarship search is part of the free guidance session.",
      "Three kinds are worth your time. University merit awards and fee waivers — usually a percentage off tuition, and at many institutions applied at the offer stage without a separate application. Government and public schemes such as Chevening and Commonwealth for the UK, DAAD for Germany, and Australia Awards — competitive, dated, and applied for on the funder's own website. And department or country-specific bursaries, which are small, numerous, and the ones most students never look for.",
      "The honest shape of it: most students who receive something receive a partial tuition reduction, not full funding. Build your budget as though you will not get one, and treat anything you do get as the bill coming down.",
      "We link every scheme to the funder's own page, and you apply there in your own name. Nobody should ever be paid to secure a scholarship for you, and that includes us.",
    ],
  },
  {
    id: "when-to-start",
    topic: "Timing",
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
    topic: "Admissions",
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
    topic: "Afterwards",
    question:
      "Can I work there afterwards, and will the degree be recognised in India?",
    answer: [
      "Post-study work is a government rule, not a university one, and it moves. The United Kingdom's Graduate Route currently allows two years after a degree and three after a doctorate. During term time the UK permits 20 hours of work a week, and full hours in the holidays. For every other destination your counsellor gives you the rule as it stands on the day you ask, with the government page it came from and the date it was checked. We do not print a rule here that we cannot date.",
      "On recognition in India: for a private employer, a degree from a university recognised in its own country is generally accepted on its own. The Association of Indian Universities assesses foreign qualifications against its own published criteria and issues equivalence certificates where an employer or a public-sector recruiter asks for one — and both the duration and the structure of the programme matter. A one-year Master's is not automatically read as equivalent to a two-year Indian one.",
      "So the honest answer depends on what you intend to do afterwards: private sector, a doctorate, or an Indian government examination. Say which before the shortlist is made rather than after the offer arrives. That one conversation prevents the most expensive mistake in this process.",
    ],
  },
  {
    id: "why-a-consultant",
    topic: "The basics",
    question: "Why use a consultant at all? I could apply on my own.",
    answer: [
      "Plenty of students do apply on their own, and it works. If you already know your five universities, your funding is settled and you have filed a study visa before, you may not need us.",
      "What we add is narrower than this category usually claims. We shortlist against your actual marks, your budget and the intake you can realistically make. We know which of our 700+ partner universities have taken profiles like yours and which have not. We assemble the document set, and the visa file is checked before it is filed by people who used to assess visa applications for a living.",
      "Because the guidance session costs you nothing, the question is not money. It is whether you would rather spend eight months learning this yourself, and what a rejected application or a missed intake would cost you if you got it wrong.",
    ],
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-section-y">
      <Container className="flex flex-col gap-10">
        <header className="flex max-w-prose flex-col gap-3">
          <p className="text-caption text-muted-foreground">
            Questions
          </p>
          <h2 className="text-d2 text-ink">Questions people actually ask.</h2>
          <p className="text-body text-muted-foreground">
            Including the ones parents ask. If the answer to yours is not here,
            it is the first thing the guidance session is for.
          </p>
        </header>

        <Accordion type="single" collapsible className="max-w-prose">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="gap-4 text-left">
                <span className="flex flex-col gap-1">
                  <span className="text-caption text-muted-foreground">
                    {faq.topic}
                  </span>
                  <span className="text-h4 text-ink">{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                {faq.answer.map((para, i) => (
                  <p key={i} className="text-body text-muted-foreground">
                    {para}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
