"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/shadcn/toggle-group";
import {
  COUNTRY_OPTIONS,
  DEGREE_OPTIONS,
  buildLedger,
  countryName,
  tierOptions,
  type CountryId,
  type DegreeId,
  type TierId,
} from "@/app/(home)/_components/reckoning/data";
import {
  formatLakh,
  formatRupees,
} from "@/app/(home)/_components/reckoning/format";

/* ===========================================================================
   COSTS — the ledger
   ---------------------------------------------------------------------------
   The single most distinctive thing on this page, and the one section that is
   deliberately NOT simplified away. Nobody else in this category prints their
   numbers.

   Rebuilt on shadcn ToggleGroup + Table. The canon version runs three bespoke
   chip groups and a 449-line re-typing ledger with an odometer; this is the
   same data through primitives, which is most of the line count gone.

   WHY TOGGLEGROUP AND NOT TABS: there are THREE independent filters (country,
   degree, city tier). Tabs models one dimension. Three single-select
   ToggleGroups model three, and they carry the right ARIA for a radio-like
   choice.

   DATA IS IMPORTED. `buildLedger` and the rupee formatters are the same
   functions `/` calls, so the two routes cannot disagree about a number.

   THE RULES CARVE-OUT: everything else on this page separates by tint, but a
   cost table keeps its row hairlines. Strip them and the figures float with
   nothing tying a row to its number — that is a comprehension loss, not a
   de-clutter. This is the documented exception, and shadcn's Table draws them
   by default.

   UNCOUNTED LINES: Canada's GIC and Germany's blocked account are
   proof-of-funds deposits that come back to the student. They are shown,
   tagged, and NOT added to the total. Counting them would inflate it.

   Nothing here is a quotation, and none of it is a promise about a visa or an
   admission.
   ======================================================================== */

export default function Costs() {
  const [country, setCountry] = useState<CountryId>("uk");
  const [degree, setDegree] = useState<DegreeId>("masters");
  const [tier, setTier] = useState<TierId>("major");

  const tiers = useMemo(() => tierOptions(country), [country]);
  const ledger = useMemo(
    () => buildLedger(country, degree, tier),
    [country, degree, tier],
  );

  return (
    <section id="costs" className="scroll-mt-20 py-section-y-tight">
      <Container className="flex flex-col gap-6">
        <header className="flex max-w-prose flex-col gap-2">
          <p className="text-caption text-muted-foreground">
            Costs
          </p>
          {/* One line, not two. "with the ranges shown" was doing work the
              deck immediately below already does ("Every figure is a range"),
              and it cost the section a whole extra headline line. */}
          <h2 className="text-d2 text-ink">What it costs, in rupees.</h2>
          <p className="text-body text-muted-foreground">
            Per student, per year. Every figure is a range because nobody honest
            has a point estimate. Plan against the higher number.
          </p>
        </header>

        {/* --- the three filters ------------------------------------------
            ONE ROW at md+, not three stacked. Stacked, these three groups were
            232px — the second-largest block in the section after the table
            itself, for three controls that are each one line of chips. The
            chips wrap inside their own column, so a long label set costs a
            second row of chips rather than a third row of filters. */}
        {/* THREE ROWS, NOT THREE COLUMNS (2026-08-21).

            In three columns each filter got ~380px, so Destination's five
            options wrapped onto a ragged second row, City's three wrapped
            onto a second row, and Degree's three did not — three groups of
            three different widths and three different heights, none of them
            lining up with each other or with the ledger below.

            Full-width rows give every group one line at every breakpoint
            above sm, and the fixed label track puts all three labels and all
            three option runs on two shared axes. */}
        <div className="flex flex-col gap-5">
          <Filter
            label="Destination"
            value={country}
            onChange={(v) => setCountry(v as CountryId)}
            options={COUNTRY_OPTIONS}
          />
          <Filter
            label="Degree"
            value={degree}
            onChange={(v) => setDegree(v as DegreeId)}
            options={DEGREE_OPTIONS}
          />
          <Filter
            label="City"
            value={tier}
            onChange={(v) => setTier(v as TierId)}
            options={tiers}
          />
        </div>

        {/* --- the ledger -------------------------------------------------- */}
        <Table className="[&_td:first-child]:pl-0 [&_td:last-child]:pr-0 [&_th:first-child]:pl-0 [&_th:last-child]:pr-0">
          <caption className="sr-only">
            {`Estimated annual cost of study in ${countryName(country)}, in rupees`}
          </caption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2 whitespace-normal text-ink">Line</TableHead>
              <TableHead className="text-right text-ink">Low</TableHead>
              <TableHead className="text-right text-ink">High</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ledger.lines.map((line) => (
              <TableRow key={line.id} className={line.counted ? "" : "opacity-70"}>
                <TableCell className="align-top whitespace-normal">
                  <span className="block text-body-sm text-ink">
                    {line.label}
                  </span>
                  {line.native ? (
                    <span className="block font-mono text-caption text-muted-foreground tabular-figures">
                      {line.native}
                    </span>
                  ) : null}
                  {/* An uncounted line must SAY it is uncounted, beside the
                      number, not in a note nobody scrolls to. */}
                  {!line.counted ? (
                    <span className="mt-1 inline-block font-mono text-caption text-clay tabular-figures">
                      {line.tag ?? "Refundable deposit"} · not in the total
                    </span>
                  ) : null}
                </TableCell>
                <TableCell className="text-right align-top font-mono text-body-sm text-ink tabular-figures">
                  {formatRupees(line.band.low)}
                </TableCell>
                <TableCell className="text-right align-top font-mono text-body-sm text-ink tabular-figures">
                  {formatRupees(line.band.high)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell className="align-top whitespace-normal">
                <span className="block text-body-sm text-ink">
                  Scholarships and fee waivers
                </span>
                <span className="block text-caption text-muted-foreground">
                  {`Examples: ${ledger.scholarship.funders.join(", ")}. Most applicants receive nothing.`}
                </span>
              </TableCell>
              <TableCell className="text-right align-top font-mono text-body-sm text-verdigris tabular-figures">
                {`− ${formatRupees(ledger.scholarship.band.high)}`}
              </TableCell>
              <TableCell className="text-right align-top font-mono text-body-sm text-verdigris tabular-figures">
                {`− ${formatRupees(ledger.scholarship.band.low)}`}
              </TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell className="text-body text-ink">
                Estimated total, one year
              </TableCell>
              <TableCell
                data-figure
                className="text-right font-mono text-body text-marine tabular-figures"
              >
                {formatLakh(ledger.total.low)}
              </TableCell>
              <TableCell
                data-figure
                className="text-right font-mono text-body text-marine tabular-figures"
              >
                {formatLakh(ledger.total.high)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        {/* Compliance surface — the rates, the deposit rule, the disclaimer and
            the verification stamp all have to stay. Compressed, not cut. */}
        <p className="text-footnote text-muted-foreground">
          Rounded to the nearest ₹1,000, at indicative rates of ₹107/£, ₹88/US$,
          ₹64/C$, ₹58/A$. Refundable deposits are excluded from the total.
          Nothing here is a quotation. Verified Aug 2026 · GO Editorial.
        </p>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------------------
   One labelled single-select row. `type="single"` on a ToggleGroup gives
   radio semantics; the guard on `v` is required because Radix emits "" when a
   user deselects the active item, and an empty filter would blank the ledger.
   -------------------------------------------------------------------------- */
function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string; meta: string }[];
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:items-start sm:gap-6">
      <span className="text-label uppercase text-ink-faint sm:pt-2.5">
        {label}
      </span>

      {/* NOT variant="outline". That variant is a SEGMENTED CONTROL: it joins
          the items with shared borders and `-ml-px` and rounds only the first
          and last. The trick has no idea a row ended, so every wrap tore the
          border open mid-run and left the group looking broken. Five
          destinations wrap at any width this section will ever have.

          Independent pills wrap cleanly because each one owns all four of its
          corners. The selected state is a NAVY FILL, not the old pale tint —
          at 1.05:1 against paper that tint was invisible, and a filter whose
          current value you cannot see is not a filter. Navy and not GO Red:
          red is the primary CTA fill and nothing else. */}
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => v && onChange(v)}
        className="flex flex-wrap justify-start gap-2"
        aria-label={label}
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            className="h-auto rounded-full border border-rule bg-transparent px-4 py-2 font-medium text-ink transition-colors hover:border-rule-strong hover:bg-secondary data-[state=on]:border-marine data-[state=on]:bg-marine data-[state=on]:text-plate-white text-body-sm"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
