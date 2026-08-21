import { ChevronDown, ChevronUp, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { DualClock } from "./for-parents/dual-clock";
import { KitchenPlate } from "./for-parents/kitchen-plate";
import { QuietFade } from "./for-parents/quiet-fade";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Rule } from "@/components/ui/rule";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

/* ===========================================================================
   III · TRUST — FOR PARENTS
   ---------------------------------------------------------------------------
   The chapter written only for the person who pays. Warmer paper, serif body,
   plainer words, and near-zero motion: one 480ms opacity fade for the whole
   chapter and nothing else.

   V2 — CONDENSED. This chapter used to run seven full essays down a single
   column and stood 5,563px tall. It read like a blog post, which is the one
   thing a parent scanning for a number does not want. It is now a two-column
   grid of answer cards: a distilled answer is always visible, and every point
   made in the original long-form text survives inside a native <details>.
   Nothing was deleted — it was folded.

   Answers, in GO's own order: finances, safety, course recognition,
   accreditation — plus who calls you, what we are paid and by whom, and what
   happens if the visa is refused. Nothing here promises a visa or an
   admission. No percentage appears anywhere in this chapter, by design.

   ICONS: three, and they are all controls rather than ornament — the caret on
   each <details>, a receiver on the two labels that head a `tel:` number, and
   the WhatsApp CTA's channel mark. Nothing is placed on the questions, the
   answers or the topic marks. This chapter is set in a serif and reads at a
   lower temperature than the rest of the page, and a row of little glyphs down
   the left of seven cards is exactly the register it is written to avoid.
   ======================================================================== */

const TOLL_FREE_DISPLAY = "1800 111 119";
const TOLL_FREE_HREF = "tel:1800111119";
const DIRECT_DISPLAY = "+91 82828 28215";
const DIRECT_HREF = "tel:+918282828215";

const WHATSAPP_SUMMARY = [
  "Namaste. I am a parent looking at Global Opportunities.",
  "Please send me the parents' summary: the full cost in rupees for the country we are considering,",
  "what happens if the visa is refused,",
  "and the name and number of the counsellor who would handle our file.",
].join(" ");

const WHATSAPP_HREF = `https://wa.me/918282828215?text=${encodeURIComponent(
  WHATSAPP_SUMMARY,
)}`;

interface Answer {
  id: string;
  /** Mono marker at the top of the card: "01 · FINANCES". */
  index: string;
  topic: string;
  /** One line, display face. */
  question: string;
  /** Two or three sentences. Always visible. */
  short: ReactNode;
  /** The rest of the original answer, folded into a native <details>. */
  full: ReactNode;
  /** The visa-refusal card is set on clay — canon reserves it for exactly this. */
  tone?: "ink" | "clay";
}

const ANSWERS: readonly Answer[] = [
  {
    id: "money",
    index: "01",
    topic: "Finances",
    question: "Can we actually afford this?",
    short: (
      <>
        A year abroad &mdash; tuition, living, the visa, health cover, one
        return flight &mdash; usually runs between ₹20,00,000 and ₹55,00,000.
        The ledger below prints it line by line in rupees. Plan against the
        higher number.
      </>
    ),
    full: (
      <>
        <p>
          The range is that wide because the honest range is wide: a taught
          Master&rsquo;s in a smaller Canadian city and an MBA in London are not
          the same purchase. Change the country, the degree and the size of the
          city in the ledger until it matches what your child actually wants,
          and every figure re-sets with its note attached.
        </p>
        <p>
          Scholarships exist, but most applicants receive nothing, so plan
          against the higher number rather than the lower one. And an education
          loan is priced very differently depending on whether it is secured
          against property &mdash; over ten years the difference is larger than
          most families expect. Ask us to run that number before you apply
          anywhere. We do not lend.
        </p>
      </>
    ),
  },
  {
    id: "safety",
    index: "02",
    topic: "Safety",
    question: "Will my child be safe, and who do I call?",
    short: (
      <>
        You get a named counsellor with a direct number, and so does your child
        &mdash; not a ticket number and not a call centre. We will not tell you
        a foreign city is safe. We will tell you which areas students actually
        live in, in writing, before your child flies.
      </>
    ),
    full: (
      <>
        <p>
          Your counsellor&rsquo;s name, their city, the countries they handle
          and how long they have been doing it are published on this page,
          above. Before departure we go through accommodation, the first week,
          local emergency numbers, registration with the university, and how to
          open a bank account. After departure the counsellor stays reachable.
          Most families settle on WhatsApp, because it works at both ends and
          costs nothing.
        </p>
        <p>
          Some foreign cities are safer than parts of India and some are not,
          and a consultant who answers that question with one word is not
          answering it. So instead you get addresses and numbers: which
          university accommodation has a warden on site, and what the
          university&rsquo;s own out-of-hours number is.
        </p>
      </>
    ),
  },
  {
    id: "recognition",
    index: "03",
    topic: "Course recognition",
    question: "Will the degree be recognised back in India?",
    short: (
      <>
        For a private employer in India, a degree from a university recognised
        in its own country is generally accepted on its own. For further study
        or a government post you may be asked for an AIU equivalence
        certificate. Tell your counsellor the plan early.
      </>
    ),
    full: (
      <>
        <p>
          Employers in the private sector look at the institution. The
          Association of Indian Universities, by contrast, assesses foreign
          qualifications against its own published criteria, and both the
          duration and the structure of the programme matter &mdash; a one-year
          Master&rsquo;s is not automatically read as equivalent to a two-year
          Indian one.
        </p>
        <p>
          So the honest answer is that it depends on what your child intends to
          do afterwards: private sector, a doctorate, or an Indian government
          examination. Say which, before the shortlist is made rather than after
          the offer arrives. That one conversation prevents the most expensive
          mistake in this process.
        </p>
      </>
    ),
  },
  {
    id: "accreditation",
    index: "04",
    topic: "Accreditation",
    question: "Who are you accountable to, apart from us?",
    short: (
      <>
        Global Opportunities Private Limited is a registered Indian company, and
        its accreditations are set out earlier on this page. An accreditation
        you can look up is a body you can complain to &mdash; you are not
        limited to complaining to us.
      </>
    ),
    full: (
      <p>
        Each accreditation is listed with how often it is re-reviewed by
        somebody who is not us. AIRC, for instance, re-certifies its members:
        the first round at five years, and every ten years after that. That
        matters for one reason. If we get something wrong, there is somewhere
        else to take it.
      </p>
    ),
  },
  {
    id: "who-calls",
    index: "05",
    topic: "Who calls you",
    question: "Who actually calls, and when?",
    short: (
      <>
        A GO counsellor calls within fifteen minutes of an enquiry, between 9 AM
        and 9 PM IST. We do not call families at night. The person who calls is
        the person who handles the file &mdash; and if that changes, you are
        told who took it over and why.
      </>
    ),
    full: (
      <p>
        If the enquiry arrives outside those hours, the call comes the next
        morning. Counsellors do leave, and when yours does you are told who has
        taken the file over and why &mdash; before you find out by ringing a
        number that no longer answers.
      </p>
    ),
  },
  {
    id: "what-we-are-paid",
    index: "06",
    topic: "What we are paid",
    question: "What are you paid, and by whom?",
    short: (
      <>
        Counselling, shortlisting, the applications, the visa file and the
        pre-departure briefing cost you nothing. Partner universities pay us a
        commission when a student enrols; that is our income. Ask every
        consultant this question &mdash; if the answer is vague, that is the
        answer.
      </>
    ),
    full: (
      <>
        <p>
          Free here is not a discount and it is not an introductory offer.
          Commission on enrolment is the standard arrangement across this
          industry; we are telling you about it rather than leaving you to find
          out. A small number of services &mdash; coaching for IELTS or PTE, for
          example &mdash; are paid, and they are marked and priced where they
          are listed.
        </p>
        <p>
          Third-party costs are yours and always were: the university
          application fee, the visa fee, the English test, biometrics, courier.
          You pay those directly to whoever charges them, at their published
          price, and every one of them appears as a line in the ledger below.
        </p>
      </>
    ),
  },
  {
    id: "visa-refused",
    index: "07",
    topic: "If the visa is refused",
    question: "What happens if the visa is refused?",
    tone: "clay",
    short: (
      <>
        It happens, and nobody in this industry can promise you it will not. We
        publish no visa success rate anywhere on this page: a percentage with no
        denominator and no auditor is not evidence. Before a file is submitted a
        former visa official on our team reviews it &mdash; and if a refusal
        comes anyway, we read the notice with you the same week. We do not
        charge you again to re-file.
      </>
    ),
    full: (
      <>
        <p>
          The review happens before submission rather than after a decision
          because most refusals turn on documentation and financial evidence
          rather than on the student.
        </p>
        <p>
          When we read a refusal notice with you, we tell you which of three
          things it is. Something fixable, where a corrected application can be
          re-filed. Something that needs an appeal or an administrative review,
          which carries a stated deadline we will put in front of you the day we
          read the notice. Or something that means this country is closed for
          this intake, in which case we ask the university to defer the offer to
          the next one, or move to a country where the same course is open.
          Universities will usually defer. We ask on your behalf.
        </p>
        <p>
          There was nothing to charge for the first file, so there is nothing to
          charge for the second.
        </p>
      </>
    ),
  },
];

/* ---------------------------------------------------------------------------
   THE FOLD

   Native <details>. Zero JavaScript, works with JS off, and the browser's own
   find-in-page opens it. The label swaps with `group-open:` — a class change,
   not a transition — so the chapter's motion budget is still exactly one fade,
   and the reduced-motion rendering is identical to the default one. The caret
   swaps on the same class, and the underline moved off the <summary> onto the
   two labels so the rule stops short of the glyph rather than running under it.
   ------------------------------------------------------------------------ */
function ReadFull({ children, clay }: { children: ReactNode; clay: boolean }) {
  return (
    <details className="group mt-auto pt-5">
      <summary
        className={cn(
          // `flex`, not `inline-flex`: <summary> is block-level by default and
          // the whole row is the click target. Shrinking it to the label would
          // shrink the target with it.
          "flex cursor-pointer list-none items-center gap-2 font-mono text-mono-label uppercase [&::-webkit-details-marker]:hidden",
          clay ? "text-clay" : "text-marine",
        )}
      >
        <span className="underline decoration-rule-strong underline-offset-4 group-open:hidden">
          Read the full answer
        </span>
        <span className="hidden underline decoration-rule-strong underline-offset-4 group-open:inline">
          Close
        </span>
        <Icon as={ChevronDown} size="sm" className="group-open:hidden" />
        <Icon as={ChevronUp} size="sm" className="hidden group-open:inline" />
      </summary>

      <div className="mt-4 flex max-w-serif flex-col gap-4 font-display text-serif-body opsz-16 text-ink-muted">
        {children}
      </div>
    </details>
  );
}

function TopicMark({ answer, clay }: { answer: Answer; clay: boolean }) {
  return (
    <p
      className={cn(
        "font-mono text-mono-label uppercase tabular-figures",
        clay ? "text-clay" : "text-marine",
      )}
    >
      <span>{answer.index}</span>
      <span aria-hidden="true"> · </span>
      <span>{answer.topic}</span>
    </p>
  );
}

/** The six standard cards: one column, question then distilled answer. */
function AnswerCard({ answer }: { answer: Answer }) {
  return (
    <article
      id={`for-parents-${answer.id}`}
      className="flex flex-col rounded-1 border border-rule bg-paper-tracing p-6"
    >
      <TopicMark answer={answer} clay={false} />

      <h3 className="mt-3 font-display text-h4 opsz-24 text-ink text-balance">
        {answer.question}
      </h3>

      <p className="mt-3 max-w-serif font-display text-serif-body opsz-16 text-ink">
        {answer.short}
      </p>

      <ReadFull clay={false}>{answer.full}</ReadFull>
    </article>
  );
}

/**
 * The visa-refusal card. Spans both columns, keeps its clay treatment, and
 * uses the extra width for a two-part layout rather than a longer measure —
 * the question stands alone on the left at chapter-head size.
 */
function RefusalCard({ answer }: { answer: Answer }) {
  return (
    <article
      id={`for-parents-${answer.id}`}
      className="rounded-1 border-2 border-clay bg-paper-tracing p-6 sm:p-7 md:col-span-2 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] md:gap-grid-gap"
    >
      <div>
        <TopicMark answer={answer} clay />
        <h3 className="mt-3 font-display text-d2 opsz-32 text-clay text-balance">
          {answer.question}
        </h3>
      </div>

      <div className="mt-4 flex flex-col md:mt-0">
        <p className="max-w-serif font-display text-serif-body opsz-16 text-ink">
          {answer.short}
        </p>
        <ReadFull clay>{answer.full}</ReadFull>
      </div>
    </article>
  );
}

export default function ForParents() {
  return (
    <section
      id="for-parents"
      data-chapter="trust"
      className="bg-paper-warm py-section-y"
    >
      <Container>
        <QuietFade>
          {/* ---------------------------------------------------------------
              THE OPENING — the chapter's argument beside its one photograph
              --------------------------------------------------------------- */}
          <div className="md:grid md:grid-cols-[1.35fr_1fr] md:items-start md:gap-grid-gap">
            <div>
              <SectionHeading
                chapter="III"
                chapterName="TRUST"
                eyebrow="For the person who pays"
                deck="The seven questions parents actually put to us — money, safety, whether the degree counts at home, and who we answer to. Nothing here promises a visa or an admission."
              >
                A page written for you, not for your child.
              </SectionHeading>

              <p className="mt-8 max-w-serif font-display text-serif-body opsz-16 text-ink">
                Most of this site is written for someone who is nineteen and
                impatient. This page is not. You are the one signing the loan,
                and you are owed plain answers first.
              </p>
            </div>

            <KitchenPlate className="mt-10 md:mt-2" />
          </div>

          <Rule weight="chapter" className="mt-12" />

          {/* ---------------------------------------------------------------
              THE SEVEN ANSWERS — two columns, distilled, with the rest of the
              long-form text folded behind each card
              --------------------------------------------------------------- */}
          <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2">
            {ANSWERS.map((answer) =>
              answer.tone === "clay" ? (
                <RefusalCard key={answer.id} answer={answer} />
              ) : (
                <AnswerCard key={answer.id} answer={answer} />
              ),
            )}
          </div>

          <Rule weight="chapter" className="mt-12" />

          {/* ---------------------------------------------------------------
              THE CONTACT STRIP — the dual clock, the phone set large, and the
              WhatsApp handoff, side by side rather than stacked in prose
              --------------------------------------------------------------- */}
          <div className="mt-10 md:grid md:grid-cols-2 md:items-start md:gap-grid-gap">
            <DualClock />

            <div className="mt-6 rounded-0 border border-rule bg-paper-tracing p-6 sm:p-7 md:mt-0">
              <p className="font-mono text-mono-label uppercase text-marine tabular-figures">
                <span>08</span>
                <span aria-hidden="true"> · </span>
                <span>Talk to a person</span>
              </p>

              <h3 className="mt-4 max-w-serif font-display text-d2 opsz-32 text-ink text-balance">
                Call us before you do anything else.
              </h3>

              <p className="mt-4 max-w-serif font-display text-serif-body opsz-16 text-ink">
                No appointment, and your child does not need to be on the line.
                If we do not know the answer, we will say so and find out.
              </p>

              <div className="mt-6">
                <p className="flex items-center gap-2 font-ui text-label uppercase text-ink-muted">
                  <Icon as={Phone} size="sm" />
                  Toll-free
                </p>
                <a
                  href={TOLL_FREE_HREF}
                  data-figure
                  className="mt-2 block font-mono text-figure text-marine no-underline tabular-figures hover:text-sienna-deep"
                >
                  {TOLL_FREE_DISPLAY}
                </a>
                <p className="mt-1 font-mono text-caption text-ink-muted tabular-figures">
                  9 AM – 9 PM IST · NO FEE · NO OBLIGATION
                </p>
              </div>

              <div className="mt-6">
                <p className="flex items-center gap-2 font-ui text-label uppercase text-ink-muted">
                  <Icon as={Phone} size="sm" />
                  Direct line
                </p>
                <a
                  href={DIRECT_HREF}
                  data-figure
                  className="mt-2 block font-mono text-d2 text-marine no-underline tabular-figures hover:text-sienna-deep"
                >
                  {DIRECT_DISPLAY}
                </a>
                <p className="mt-1 font-mono text-caption text-ink-muted tabular-figures">
                  SAME NUMBER ON WHATSAPP
                </p>
              </div>

              <div className="mt-6">
                <Button href={WHATSAPP_HREF} variant="secondary" size="lg">
                  <Icon as={MessageCircle} />
                  Send this summary to WhatsApp
                </Button>
                <p className="mt-3 max-w-serif font-mono text-caption text-ink-muted tabular-figures">
                  OPENS WHATSAPP · THE MESSAGE IS ALREADY WRITTEN · ASKS FOR THE
                  COST IN RUPEES, THE REFUSAL POLICY, AND YOUR COUNSELLOR&rsquo;S
                  NAME
                </p>
                <p className="mt-3 max-w-serif font-display text-serif-body opsz-16 text-ink-muted">
                  Forward it to whoever else in the family is deciding.
                </p>
              </div>
            </div>
          </div>
        </QuietFade>
      </Container>
    </section>
  );
}
