import { Container } from "@/components/ui/container";

/* ===========================================================================
   HOW IT WORKS — GO's own five steps
   ---------------------------------------------------------------------------
   PROVENANCE MATTERS HERE. CLAUDE.md records `what-we-do` as deleted by client
   markup on 2026-08-20, under "do not restore without asking". This section is
   not that one restored: the five steps below are Global Opportunities' own
   published process, read off global-opportunities.net on 2026-08-21, where
   they run as "Our Process":

     Walkin Nearest Office → Share Documents → Sortlisting & Application
     → Apply For University → Visa & Offer Letter

   The wording is corrected (their site carries a typo in "Sortlisting") and
   expanded to one honest line each. Re-added at the client's explicit request.

   VOICE CONTRACT, enforced: no superlatives, no exclamation marks, no visa or
   admission promise, and no timeline stated as a guarantee. The durations are
   the ones already published in the FAQ, which are GO's documented ranges
   rather than best cases.

   Numerals are mono because they are figures; the prose is not. No cards, no
   borders, no icons — five numbered items in a row is the whole shape, and
   anything else here is furniture.

   Server Component; ships no JavaScript.
   ======================================================================== */

const STEPS = [
  {
    n: "01",
    title: "Walk into your nearest office",
    body: "Fifteen cities, eighteen branches. Or take the first call remotely — it is thirty to forty-five minutes either way, and it costs nothing.",
  },
  {
    n: "02",
    title: "Share your documents",
    body: "Marksheets, your English test if you have already sat one, and your budget. The shortlist is built against what you actually have, not against what the brochure wants.",
  },
  {
    n: "03",
    title: "Shortlisting and application",
    body: "Universities we can name, with their accreditation attached, before you apply to any of them. Ask which ones pay us commission — a counsellor who cannot answer that has not done the work.",
  },
  {
    n: "04",
    title: "Apply to the universities",
    body: "We assemble and file the set. Decisions typically take three to four months, which is why the first conversation wants to happen eight to nine months before your intake.",
  },
  {
    n: "05",
    title: "Offer letter, then the visa file",
    body: "The visa file is checked before it is filed, by people who used to assess visa applications for a living. Nobody can promise you a visa — the decision belongs to a government.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-secondary py-section-y"
    >
      <Container className="flex flex-col gap-10">
        <header className="flex max-w-prose flex-col gap-3">
          <p className="text-caption text-muted-foreground">
            How it works
          </p>
          <h2 className="text-d2 text-ink">Five steps, start to visa.</h2>
          <p className="text-body text-muted-foreground">
            This is the process as Global Opportunities publishes it. Every step
            is free except the fees other people charge — those you pay
            directly, at their published price.
          </p>
        </header>

        <ol className="grid list-none grid-cols-1 gap-x-8 gap-y-9 p-0 md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col gap-2">
              <span className="font-mono text-body-sm text-sienna tabular-figures">
                {step.n}
              </span>
              <h3 className="text-h4 text-ink">{step.title}</h3>
              <p className="text-body-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
