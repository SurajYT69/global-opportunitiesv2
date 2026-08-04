"use client";

/**
 * SECTION 6 · what-we-do — "Fifteen Things We Do"   (Chapter II -> III)
 *
 * THE COLOUR BLOCK. This is the page's mid-point band: a full-bleed GO Navy
 * surface between two cream chapters, carrying the fifteen services as a
 * six-card asymmetric bento rather than a 3,200px typeset ledger. The client
 * note was that the page read as a blog; a confident brand band with cards in
 * it is the answer, and this is the section that can afford one because its
 * content is a *list*, not an argument.
 *
 * What is kept from the ledger version, verbatim in substance:
 *   · all fifteen services GO actually publishes, none invented, none dropped
 *   · GO's price for every one of them — ₹0 — stamped on every card
 *   · the free-vs-at-cost honesty, now stated ONCE as a figure instead of
 *     three paragraphs, with the seven third-party fees named on their cards
 *   · the footnoted counts (18 offices, 15 destinations, 700+ universities)
 *
 * `data-chapter="success"` is not narrative here — it is the ONLY switch in
 * globals.css for the dark-surface focus ring and dark ::selection. See below.
 *
 * Client Component because the reveal is Motion's. No state, no effects, no
 * measurement — the markup server-renders complete on first paint.
 */

import type { CSSProperties } from "react";
import { Fragment } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Footnote, FootnoteDetails } from "@/components/ui/footnote";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { fadeUp, staggerChildrenTight, VIEWPORT_ONCE } from "@/lib/motion";
import {
  AT_COST_COUNT,
  CITED_SOURCES,
  SERVICE_CARDS,
  SERVICE_COUNT,
  atCostParties,
} from "./what-we-do/cards";

/**
 * globals.css keys BOTH dark-surface overrides — `:focus-visible` outline to
 * `--ochre-on-dark` (GO Yellow, 9.4:1 on GO Navy) and `::selection` to
 * marine-mid/plate-white — to `[data-chapter="success"]`. A dark band has to
 * carry that attribute or every keyboard focus ring inside it is GO Red at
 * 2.1:1, which fails SC 1.4.11.
 *
 * The attribute also forces `--nr-opsz: 72`. This band is narratively chapters
 * II–III, so the Newsreader axis is put straight back to 60 with an inline
 * custom property — inline styles beat the attribute rule on the same element.
 */
const DARK_CHAPTER_AXIS = { "--nr-opsz": "60" } as CSSProperties;

/**
 * `<Footnote>` hard-codes `--sienna-press` (GO Red, 2.1:1 on GO Navy). On the
 * dark surface the marker takes `--sienna-on-dark` (6.1:1). Descendant
 * selector, so it wins on specificity without `!important` and without
 * touching the shared component. Same device the endpaper chapter uses.
 */
const DARK_FOOTNOTE = "[&_a]:text-sienna-on-dark";

/**
 * `<FootnoteDetails>` is authored for paper (ink-muted type, a GO Red marker,
 * a 70%-opacity meta line). All three are recoloured for the band by descendant
 * selectors, which outrank the component's own single-class utilities.
 */
const DARK_DETAILS = cn(
  "[&_summary]:text-plate-grey",
  "[&_summary::marker]:text-ochre-on-dark",
  "[&_p]:text-plate-grey",
  "[&_p]:opacity-100",
);

/** "a, b, c and d" — the at-cost parties read as a sentence, not a CSV. */
function readAsList(parts: string[]): string {
  if (parts.length <= 1) return parts.join("");
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

export function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      data-chapter="success"
      style={DARK_CHAPTER_AXIS}
      className="bg-endpaper py-section-y"
    >
      {/* --- Header: the headline, and the price, side by side ------------ */}
      <Container className="md:grid md:grid-cols-12 md:items-end md:gap-grid-gap">
        <SectionHeading
          id="what-we-do-heading"
          tone="dark"
          chapter="II–III"
          chapterName="EXPLORE INTO TRUST"
          eyebrow="THE SERVICE LEDGER"
          deck="The fourteen services on the homepage plus one more, in the order they actually happen — with the price of each printed next to it."
          className="md:col-span-7"
        >
          Fifteen things we do.
        </SectionHeading>

        {/* The free-vs-at-cost honesty. One statement, one figure, once. */}
        <div className="mt-10 rounded-1 border border-plate-rule bg-endpaper-2 p-6 md:col-span-5 md:mt-0">
          <p className="font-ui text-label uppercase text-plate-grey">
            What Global Opportunities charges you
          </p>

          <p className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span
              data-figure
              className="font-mono text-figure text-ochre-on-dark tabular-figures"
            >
              ₹0
            </span>
            <span className="font-mono text-mono-label uppercase text-plate-grey tabular-figures">
              on all {SERVICE_COUNT}
            </span>
          </p>

          <p className="mt-4 font-ui text-body-sm text-plate-white">
            {AT_COST_COUNT} of the {SERVICE_COUNT}{" "}attach a fee that is not ours
            — a government&rsquo;s, a bank&rsquo;s, an insurer&rsquo;s, an
            airline&rsquo;s. You pay those directly, at cost, and we add nothing
            to them.
          </p>

          <a
            href="#reckoning"
            className="mt-4 inline-flex min-h-12 items-center font-ui text-body font-semibold text-plate-white underline decoration-plate-rule decoration-1 underline-offset-[0.3em] transition-colors duration-200 ease-quad hover:decoration-ochre-on-dark hover:decoration-2"
          >
            Who pays us, and how
          </a>
        </div>
      </Container>

      {/* --- The bento: 4+2 · 2+4 · 3+3 on a six-column desktop grid ------ */}
      <Container>
        <motion.ul
          variants={staggerChildrenTight}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="m-0 mt-12 grid list-none grid-cols-1 gap-grid-gap p-0 sm:grid-cols-2 md:mt-14 md:grid-cols-6"
        >
          {SERVICE_CARDS.map((card) => {
            const parties = atCostParties(card);

            return (
              <motion.li
                key={card.id}
                variants={fadeUp}
                className={cn("flex", card.span)}
              >
                <article className="flex w-full flex-col rounded-1 border border-plate-rule bg-endpaper-2 p-6 md:p-7">
                  <p className="font-mono text-mono-label uppercase text-sienna-on-dark tabular-figures">
                    {card.range}
                  </p>

                  <h3 className="mt-2 font-ui text-h4 text-plate-white text-balance">
                    {card.title}
                  </h3>

                  {/* Three columns per line, never a decorated card: the
                      ordinal, the glyph, then the clause. The glyph is `sm`
                      (16px, 1.75 stroke) so it sits at the weight of the mono
                      ordinal beside it and takes that column's --plate-grey
                      rather than introducing a colour. It is decoration next to
                      a visible name, so it carries no `label` and `<Icon>`
                      hides it — the ordinal span is aria-hidden already, and
                      only the name and qualifier are read out, unchanged. */}
                  <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                    {card.lines.map((line) => (
                      <li
                        key={line.n}
                        className="flex gap-3 font-ui text-body-sm"
                      >
                        <span
                          aria-hidden="true"
                          className="shrink-0 pt-1 font-mono text-mono-label uppercase text-plate-grey tabular-figures"
                        >
                          {line.n}
                        </span>
                        <Icon
                          as={line.icon}
                          size="sm"
                          className="mt-0.5 text-plate-grey"
                        />
                        <span className="min-w-0 font-semibold text-plate-white">
                          {line.name}
                          <span className="font-normal text-plate-grey">
                            {" · "}
                            {line.qualifier}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  {card.note && (
                    <p className="mt-5 border-l border-sienna-on-dark pl-3 font-display text-body-sm text-plate-white">
                      {card.note}
                    </p>
                  )}

                  {card.fact && (
                    <p className="mt-5 font-mono text-caption uppercase text-plate-white tabular-figures">
                      {card.fact.map((part, index) => (
                        <Fragment key={part.text}>
                          {index > 0 && (
                            <span aria-hidden="true">{" · "}</span>
                          )}
                          {part.text}
                          {part.note && (
                            <Footnote id={part.note} className={DARK_FOOTNOTE} />
                          )}
                        </Fragment>
                      ))}
                    </p>
                  )}

                  {/* The stamp. ₹0 six times over, plus who else gets paid. */}
                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-plate-rule pt-4">
                      <span
                        data-figure
                        className="font-mono text-data text-plate-white tabular-figures"
                      >
                        ₹0
                      </span>
                      <span className="rounded-2 bg-ochre px-2 py-1 font-mono text-caption uppercase text-endpaper tabular-figures">
                        Free from GO
                      </span>
                      {parties.length > 0 && (
                        <span className="rounded-2 border border-plate-rule px-2 py-1 font-mono text-caption uppercase text-plate-white tabular-figures">
                          At cost
                        </span>
                      )}
                    </div>

                    {parties.length > 0 && (
                      <p className="mt-3 font-mono text-caption uppercase text-plate-grey tabular-figures">
                        Paid direct to {readAsList(parties)}. Nothing added.
                      </p>
                    )}
                  </div>
                </article>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>

      {/* --- Closing stamp, and the footnote resolution below 1024px ------ */}
      <Container className="mt-12">
        <p className="max-w-prose font-mono text-caption uppercase text-plate-grey tabular-figures">
          No admission is guaranteed and no visa outcome is promised. Every
          figure above resolves to the sources table at the foot of this page.
        </p>

        <div className="mt-6 flex flex-col gap-3 md:hidden">
          {CITED_SOURCES.map((id) => (
            <FootnoteDetails key={id} id={id} className={DARK_DETAILS} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhatWeDo;
