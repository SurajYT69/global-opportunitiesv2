"use client";

import { useMemo, useState } from "react";
import { Info, MessageCircle } from "lucide-react";
import { ChipGroup } from "./reckoning/chip-group";
import type {
  CountryId,
  DegreeId,
  TierId,
} from "./reckoning/data";
import {
  COUNTRY_OPTIONS,
  DEGREE_OPTIONS,
  buildLedger,
  countryName,
  tierOptions,
} from "./reckoning/data";
import { Ledger } from "./reckoning/ledger";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Rule } from "@/components/ui/rule";
import { SectionHeading } from "@/components/ui/section-heading";

/* ===========================================================================
   IV · CHOOSE — THE RECKONING
   ---------------------------------------------------------------------------
   Publish the money. Three tap-chip groups — country, degree, city tier — and
   a ruled ledger that re-types itself line by line underneath them.

   Rules this section obeys, verbatim from canon:
     · Every figure is a RANGE. Never a point estimate, never fake precision.
     · Every figure carries a note that resolves to a real explanation.
     · The total is a range too, and it is the only lakh-notation figure here.
     · The interaction is USER-TRIGGERED, never scroll-triggered. Nothing on
       this page moves because you scrolled past it.
     · The closing line is printed exactly as canon writes it.
   ======================================================================== */

const WHATSAPP_LEDGER = [
  "Namaste. I have used the cost ledger on the Global Opportunities site.",
  "Please send me a written breakdown for the country and course we are considering,",
  "and tell me what an education loan for that amount would actually cost per month.",
].join(" ");

const WHATSAPP_HREF = `https://wa.me/918282828215?text=${encodeURIComponent(
  WHATSAPP_LEDGER,
)}`;

export default function Reckoning() {
  const [country, setCountry] = useState<CountryId>("uk");
  const [degree, setDegree] = useState<DegreeId>("masters");
  const [tier, setTier] = useState<TierId>("major");

  const tiers = useMemo(() => tierOptions(country), [country]);
  const view = useMemo(
    () => buildLedger(country, degree, tier),
    [country, degree, tier],
  );

  const selectionKey = `${country}-${degree}-${tier}`;
  const selectionLabel = [
    countryName(country),
    DEGREE_OPTIONS.find((option) => option.value === degree)?.label ?? "",
    tiers.find((option) => option.value === tier)?.label ?? "",
  ].join(" · ");

  return (
    <section
      id="reckoning"
      data-chapter="choose"
      className="bg-paper-tracing py-section-y"
    >
      <Container>
        <SectionHeading
          chapter="IV"
          chapterName="CHOOSE"
          eyebrow="The cost ledger"
          deck="Pick the three things you already know. The ledger re-types itself underneath. Every figure is a range, every range carries a note, and the total is a range as well — because anyone who quotes you a single number for this is guessing."
        >
          What it costs, in rupees, with the ranges shown.
        </SectionHeading>

        {/* ------------------------------------------------------------------
            THREE TAP-CHIP GROUPS — real radio groups, arrow-key navigable
            ------------------------------------------------------------------ */}
        <form
          className="mt-12 flex flex-col gap-8 rounded-0 border border-rule bg-paper p-5 sm:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <ChipGroup
            name="reckoning-country"
            legend="Country"
            options={COUNTRY_OPTIONS}
            value={country}
            onChange={setCountry}
          />
          <ChipGroup
            name="reckoning-degree"
            legend="Degree"
            options={DEGREE_OPTIONS}
            value={degree}
            onChange={setDegree}
          />
          <ChipGroup
            name="reckoning-tier"
            legend="Size of city"
            options={tiers}
            value={tier}
            onChange={setTier}
          />
          {/* The chips' one caveat, marked as an aside rather than a rule. */}
          <p className="flex items-start gap-2 font-mono text-caption uppercase text-ink-muted tabular-figures">
            <Icon as={Info} size="sm" className="mt-[0.2em]" />
            <span>
              DOCTORAL AND DIPLOMA ROUTES PRICE DIFFERENTLY — A FUNDED PHD
              OFTEN COSTS A FAMILY VERY LITTLE. ASK YOUR COUNSELLOR FOR THAT
              ONE.
            </span>
          </p>
        </form>

        <div className="mt-10">
          <Ledger
            view={view}
            selectionKey={selectionKey}
            selectionLabel={selectionLabel}
          />
        </div>

        <Rule weight="chapter" className="mt-16" />

        {/* ------------------------------------------------------------------
            THE LINE NOBODY ELSE PRINTS — canon copy, verbatim
            ------------------------------------------------------------------ */}
        <div className="mt-12">
          <p className="max-w-serif font-display text-quote opsz-32 text-ink">
            What Global Opportunities charges you: ₹0. Here is who pays us, and
            how.
          </p>

          <div className="mt-8 flex max-w-prose flex-col gap-5 font-ui text-body text-ink">
            <p>
              Partner universities pay us a commission when a student enrols.
              That is where our income comes from, and it is the standard
              arrangement across this industry. Counselling, shortlisting,
              applications, the visa file and the pre-departure briefing are
              free to you, and they are free because of that commission — not
              as an offer that expires.
            </p>
            <p>
              Everything you actually pay for is a line in the ledger above,
              paid by you directly to whoever charges it, at their published
              price. We add no margin to any of them. A small number of our own
              services &mdash; coaching for IELTS or PTE, for instance &mdash;
              are paid, and they are marked and priced where they are listed.
            </p>
            <p>
              The obvious question is whether a commission makes us push
              expensive universities. The answer you should insist on from any
              consultant is the same one: ask to see the shortlist with the
              reasons written down, and ask what the alternative was. Ours comes
              with both.
            </p>
          </div>

          <div className="mt-10">
            <Button href={WHATSAPP_HREF} variant="secondary" size="lg">
              Get this ledger in writing
            </Button>
            <p className="mt-3 flex max-w-prose items-start gap-2 font-mono text-caption uppercase text-ink-muted tabular-figures">
              <Icon as={MessageCircle} size="sm" className="mt-[0.2em]" />
              <span>
                OPENS WHATSAPP · THE MESSAGE IS ALREADY WRITTEN · ASKS FOR A
                WRITTEN BREAKDOWN AND THE REAL MONTHLY LOAN FIGURE
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
