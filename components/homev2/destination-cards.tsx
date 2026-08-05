import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Rule } from "@/components/ui/rule";
import { Icon } from "@/components/ui/icon";
import { ANCHOR_DESTINATIONS } from "@/app/(home)/_components/gazetteer/data";

/* ===========================================================================
   home · FOUR DESTINATIONS (BRIEF)
   ---------------------------------------------------------------------------
   The homepage's cut-down gazetteer: photograph, country, one line. Nothing
   else.

   THIS IS NOT A REPLACEMENT FOR `gazetteer.tsx`. That section — the keyline
   plates, the three-fact ruled strip, the caption locators, the eleven-more
   block and the sources footer — moves to `/destinations` intact and is
   rendered there unchanged. This file exists so the homepage can show four
   photographs without also carrying the data rows that gave the page its
   fifteen-topics problem. Reading a partner count is a `/destinations` job.

   The one line under each name is the destination's own published city
   locator, straight from `gazetteer/data.ts`. No new copy is authored here.

   SERVER COMPONENT, zero JavaScript. The hover lift is a CSS transform and
   the link is a real anchor.
   ======================================================================== */

export default function DestinationCards() {
  return (
    <section
      id="destinations"
      data-chapter="explore"
      aria-labelledby="destinations-h2"
      className="scroll-mt-24 bg-paper py-section-y"
    >
      <Container>
        <SectionHeading
          id="destinations-h2"
          chapter="II"
          chapterName="EXPLORE"
          eyebrow="The four anchor destinations"
          deck="The four countries that carry most of GO's traffic and partnerships. Partner counts, intake windows and post-study work rights for all fifteen live on the destinations index."
        >
          Four places, up close.
        </SectionHeading>

        <Rule weight="chapter" className="mt-10" />

        <ul
          aria-label="The four anchor destinations"
          className="m-0 mt-12 grid list-none grid-cols-1 gap-x-grid-gap gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ANCHOR_DESTINATIONS.map(({ destination: d }) => (
            <li
              key={d.slug}
              className="group/card relative flex transition-transform duration-320 ease-cubic hover:-translate-y-1 focus-within:-translate-y-1"
            >
              <article className="flex w-full flex-col">
                <div
                  style={{ backgroundImage: "var(--grad-plate-marine)" }}
                  className="relative aspect-[3/2] w-full overflow-hidden rounded-1 border border-rule-strong shadow-reg-sienna"
                >
                  <div
                    aria-hidden="true"
                    className="plate-graticule absolute inset-0"
                  />
                  {d.image && (
                    <Image
                      src={d.image}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>

                {/* min-h locks two lines: "United Kingdom" wraps and the other three
                    do not, which left the city labels off each other by a line. */}
                <h3 className="mt-4 min-h-[2.4em] font-display text-d2 opsz-32 text-ink text-balance">
                  {d.name}
                </h3>

                <p className="mt-2 font-mono text-caption uppercase text-ink-muted tabular-figures">
                  {d.city}
                </p>

                {/* One focusable element per card; `after:` stretches its hit
                    area over the photograph. */}
                <Link
                  href="/destinations"
                  className="mt-auto inline-flex min-h-12 w-fit items-center gap-2 rounded-0 pt-4 font-ui text-body font-semibold text-ink underline decoration-rule-strong decoration-1 underline-offset-[0.3em] transition-colors duration-200 ease-quad after:absolute after:inset-0 after:content-[''] hover:decoration-2 hover:decoration-sienna"
                >
                  {d.name}
                  <span className="sr-only"> — intakes, tuition and work rights</span>
                  <Icon as={ArrowRight} size="sm" />
                </Link>
              </article>
            </li>
          ))}
        </ul>

        {/* The exit link. This section lost its depth; this is where it went. */}
        <div className="mt-12 border-t border-rule-strong pt-8">
          <Link
            href="/destinations"
            className="inline-flex min-h-12 w-fit items-center gap-2 rounded-0 font-ui text-body font-semibold text-ink underline decoration-rule-strong decoration-1 underline-offset-[0.3em] transition-colors duration-200 ease-quad hover:decoration-2 hover:decoration-sienna"
          >
            All fifteen destinations
            <Icon as={ArrowRight} size="sm" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
