import { Fragment } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, Hourglass, Landmark } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { ANCHOR_DESTINATIONS } from "./data";
import type { Destination } from "./data";
import { NotPublished, SourceMark } from "./marks";

/* ===========================================================================
   THE GAZETTEER — ANCHOR CARDS
   ---------------------------------------------------------------------------
   Chapter II EXPLORE. The four destinations that carry the traffic and the
   partnerships — UK, USA, Canada, Australia — are lifted out of the index and
   given a photograph, a 2x2 bento above the ruled rows.

   This is a SERVER COMPONENT. Every figure, every name and every caption is in
   the server HTML; the hover lift is CSS transform, the link is a real anchor.
   Zero JavaScript, zero ScrollTrigger, zero framer-motion. The section comment
   in `gazetteer.tsx` promises that only the disclosure behaviour is
   client-side, and cards keep that promise.

   THE PHOTOGRAPH SITS ON TOP OF A PLATE FIELD, NOT INSTEAD OF ONE.
   `plate.tsx` documents the v2 drop-in: the field is `position: relative`, the
   caption is a sibling, and a commissioned photograph absolutely-positions in
   with zero layout shift. This card is built that way round on purpose. The
   marine gradient + graticule render first; `next/image` covers them. If an
   asset is missing the card degrades to the canonical Plate A field rather
   than to a broken-image box — which is exactly the "placeholders-as-absence"
   failure the plate system exists to prevent.

   `alt=""` is deliberate and correct, not a shortcut. The card already names
   the country in a display-face heading and the link already says "Talk about
   the United Kingdom". The photograph carries no information those two do not,
   so describing it would be redundant announcement. It is decorative in the
   strict WCAG sense. The useful side effect: a missing file renders as nothing
   at all rather than as a broken-image icon with alt text beside it.
   ======================================================================== */

/* The three facts a card leads with. Mono, because all three are verified.
   The leading glyph restates the axis, nothing more: an institution, a dated
   window, an elapsing permission. Not a cap, not a flag, not a suitcase —
   those are the category's clichés and adopting Lucide does not license them.
   `sm` (16px) is the size that sits with mono label type. */
const CARD_FACTS = [
  { key: "partners", label: "Partners", glyph: Landmark },
  { key: "intake", label: "Main intake", glyph: CalendarDays },
  { key: "work", label: "Post-study work", glyph: Hourglass },
] as const;

function factValue(d: Destination, key: (typeof CARD_FACTS)[number]["key"]) {
  if (key === "intake") return d.intake;
  if (key === "work") return d.work;
  return d.partners ? (
    <>
      {d.partners}
      {/* Lifted above the stretched link so the citation stays clickable. */}
      <SourceMark id="partner-universities" className="relative z-10" />
    </>
  ) : (
    <NotPublished />
  );
}

export function AnchorCards() {
  return (
    <ul
      aria-label="The four anchor destinations"
      className="m-0 grid list-none grid-cols-1 gap-x-grid-gap gap-y-12 p-0 md:grid-cols-2"
    >
      {ANCHOR_DESTINATIONS.map(({ destination: d }) => (
        <li
          key={d.slug}
          data-anchor="true"
          className={cn(
            "group/card relative flex",
            // Transform only. The lift is carried by the whole card, shadow
            // included, so the registration offset travels with it.
            "transition-transform duration-320 ease-cubic",
            "hover:-translate-y-1 focus-within:-translate-y-1",
          )}
        >
          <article className="flex w-full flex-col">
            {/* THE FIELD. Two stacked layers, mirroring <Plate variant="field">:
                the gradient is an inline style on the frame, the graticule tile
                is its own absolute child, because both are `background-image`
                and one element cannot carry the two. */}
            <div
              style={{ backgroundImage: "var(--grad-plate-marine)" }}
              className={cn(
                "relative aspect-[3/2] w-full overflow-hidden",
                "rounded-1 border border-rule-strong shadow-reg-sienna",
              )}
            >
              <div aria-hidden="true" className="plate-graticule absolute inset-0" />
              {d.image && (
                <Image
                  src={d.image}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(min-width:1024px) 45vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>

            {/* THE CAPTION STRIP. Beneath the keyline, mono, tracked caps —
                the plate language. Both lines are the destination's own
                published locator, identical to the plate the expanded index
                row already shows for it. */}
            <div className="mt-3 flex flex-col gap-1">
              <span className="font-mono text-caption uppercase text-ink-muted tabular-figures">
                {d.city}
              </span>
              <span className="font-mono text-caption uppercase text-ink-muted tabular-figures">
                {d.coordinates} · {d.utc}
              </span>
            </div>

            <h3 className="mt-4 font-display text-d2 opsz-32 text-ink text-balance">
              {d.name}
            </h3>

            {/* Three facts as a ruled strip — the index's own grammar, kept so
                a card is still something you read a number off. */}
            <dl className="m-0 mt-5 grid grid-cols-[minmax(0,7.5rem)_1fr] border-t border-rule">
              {CARD_FACTS.map((fact) => (
                <Fragment key={fact.key}>
                  <dt className="flex items-center gap-2 border-b border-rule py-2 pr-4 font-mono text-mono-label uppercase text-ink-muted">
                    {/* Decorative: the label beside it is the accessible name
                        of this term, so the glyph stays aria-hidden. */}
                    <Icon as={fact.glyph} size="sm" />
                    {fact.label}
                  </dt>
                  <dd className="m-0 border-b border-rule py-2 font-mono text-data text-ink tabular-figures">
                    {factValue(d, fact.key)}
                  </dd>
                </Fragment>
              ))}
            </dl>

            {/* The card's single focusable element. `after:` stretches its hit
                area over the whole card, so the photograph is clickable and
                assistive technology still gets exactly one link with a name
                that says where it goes. */}
            <a
              href="#enquiry"
              data-destination={d.slug}
              className={cn(
                "mt-auto inline-flex min-h-12 w-fit items-center gap-2 rounded-0 pt-5",
                "font-ui text-body font-semibold text-ink",
                "underline decoration-rule-strong decoration-1 underline-offset-[0.3em]",
                "transition-colors duration-200 ease-quad",
                "hover:decoration-2 hover:decoration-sienna",
                "after:absolute after:inset-0 after:content-['']",
              )}
            >
              Talk about {d.selectionLabel}
              <Icon as={ArrowRight} size="sm" />
            </a>
          </article>
        </li>
      ))}
    </ul>
  );
}
