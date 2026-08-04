import { Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Rule } from "@/components/ui/rule";
import { SectionHeading } from "@/components/ui/section-heading";
import { MonthRule } from "./eleven-months/month-rule";
import { Specimens } from "./eleven-months/specimens";

/* ===========================================================================
   12 · ELEVEN-MONTHS — "Your next eleven months."
   Chapter V, APPLY. Surface: --paper.

   The page's ONE pinned chapter (>=1024px only). Everything measured against
   scroll position lives in <MonthRule>, a client leaf; the copy, the heading
   and the specimen sheets are server-rendered.

   ICONS: the milestone marks are set on the blocks themselves, inside
   <MonthRule>. The only one here is on the refusal caveat, which is the one
   paragraph in the chapter a reader must not skim past.
   ======================================================================== */

export default function ElevenMonths() {
  return (
    <section
      id="eleven-months"
      data-chapter="apply"
      className="relative bg-paper py-section-y"
    >
      <Container>
        <SectionHeading
          chapter="V"
          chapterName="APPLY"
          eyebrow="THE ELEVEN-MONTH RULE"
          deck={
            <>
              One ruled line from August to July, marked with the durations we
              actually observe. Ochre ticks are our own Application Days. Clay
              ticks are deadlines other people set, cited and dated.
            </>
          }
        >
          Your next eleven months.
        </SectionHeading>
      </Container>

      {/* THE PIN. Desktop scrubs it horizontally; below 1024px it is a static
          vertical ruled list of the same six blocks. */}
      <MonthRule />

      <Container className="mt-16 md:mt-24">
        <Rule weight="chapter" />
        <div className="mt-10 flex flex-col gap-3">
          <h3 className="font-display text-d2 opsz-32 text-ink text-balance">
            Three documents decide the eleven months.
          </h3>
          <p className="max-w-prose font-ui text-body text-ink-muted">
            Reproduced here as typeset facsimiles rather than photographs — no
            student record is published on this page, and none ever will be.
            Each one is annotated at the single clause that changes what you do
            next.
          </p>
        </div>

        <div className="mt-10">
          <Specimens />
        </div>

        <div className="mt-12 max-w-prose border-l-2 border-clay pl-5">
          <p className="flex items-start gap-2 font-ui text-body text-ink">
            <Icon as={Info} className="mt-1" />
            <span>
              If a visa is refused, you receive the refusal letter, the reason
              the post gave, and a written re-application plan. We do not
              publish a visa success rate and we do not promise one. Nobody
              honestly can.
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
