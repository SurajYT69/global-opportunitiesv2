import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Footnote } from "@/components/ui/footnote";
import { Icon } from "@/components/ui/icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/shadcn/card";
import { ANCHOR_DESTINATIONS } from "@/app/(home)/_components/gazetteer/data";

/* ===========================================================================
   DESTINATIONS — the four anchors
   ---------------------------------------------------------------------------
   Four cards, then a link out to /destinations for the other eleven. The
   canon gazetteer on `/` renders the same four as a photographic bento plus a
   fifteen-row ruled index; the index has moved to its own route, which is
   where it always belonged.

   DATA IS IMPORTED, NOT COPIED — `ANCHOR_DESTINATIONS` is the same array `/`
   renders, so partner counts and intake windows cannot drift between the two
   routes.

   THE EM-DASH RULE: `partners` is null for every country GO does not publish a
   count for. Those render an em-dash with an `sr-only` expansion — NEVER `0`,
   `TBD`, or a shimmer. All four anchors happen to have counts today; the
   branch is kept because the data type allows null and a future edit will hit
   it.

   Banned imagery still applies to anything we author: no flags, no landmarks,
   no globes, no aircraft. The card photographs are client-supplied plates of
   places, and a card whose image is missing falls back to a tinted field
   rather than a broken box.
   ======================================================================== */

export default function Destinations() {
  return (
    <section id="destinations" className="scroll-mt-20 py-section-y">
      {/* ALIAS ANCHOR. The hero's secondary CTA ("Explore 15 destinations")
          hardcodes href="#gazetteer" inside components/GlobeReveal.tsx — that
          is `/`'s id for this section, and GlobeReveal takes no prop for it.
          The hero is shared and is not being modified, so the anchor is
          provided here instead. Without this the hero's second button scrolls
          nowhere on this route. Remove only if GlobeReveal gains a href prop. */}
      <span id="gazetteer" aria-hidden className="block scroll-mt-20" />
      <Container className="flex flex-col gap-10">
        <header className="flex max-w-prose flex-col gap-3">
          <p className="text-caption text-muted-foreground">
            Destinations
          </p>
          <h2 className="text-d2 text-ink">Four places, up close.</h2>
          <p className="text-body text-muted-foreground">
            The four our students actually go to, with the numbers that decide
            it. Eleven more are listed in full on the destinations page.
          </p>
        </header>

        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {/* ANCHOR_DESTINATIONS wraps each record as { destination, index } —
              the index is the position in the full fifteen, which the index
              rows on /destinations need and these cards do not. */}
          {ANCHOR_DESTINATIONS.map(({ destination: d }) => (
            <li key={d.slug}>
              <Card className="h-full gap-0 overflow-hidden border-0 bg-muted py-0">
                {/* 3:2. `bg-marine` is the fallback field, so a missing file
                    reads as a plate rather than a hole. */}
                <div className="relative aspect-[3/2] w-full bg-marine">
                  {d.image ? (
                    <Image
                      src={d.image}
                      alt=""
                      fill
                      sizes="(min-width:1280px) 300px, (min-width:640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>

                <CardContent className="flex flex-col gap-4 px-5 py-5">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-h4 text-ink">{d.name}</CardTitle>
                    <CardDescription className="text-body-sm text-muted-foreground">
                      {d.city}
                    </CardDescription>
                  </div>

                  {/* ONE grid for the whole list, with a FIXED 5rem label
                      track. Not three flex rows, and not `auto` — `auto`
                      sizes to the longest label in THAT card, so the four
                      cards would each settle on their own axis again. */}
                  <dl className="m-0 grid grid-cols-[5rem_1fr] items-baseline gap-x-4 gap-y-2.5 text-body-sm">
                    <dt className="text-muted-foreground">Partners</dt>
                    <dd className="m-0 font-mono text-ink tabular-figures">
                      {d.partners ?? (
                        <>
                          <span aria-hidden="true">&mdash;</span>
                          <span className="sr-only">not yet published</span>
                        </>
                      )}
                    </dd>

                    <dt className="text-muted-foreground">Intake</dt>
                    <dd className="m-0 font-mono text-ink tabular-figures">
                      {d.intake}
                    </dd>

                    <dt className="text-muted-foreground">Work after</dt>
                    <dd className="m-0 font-mono text-ink tabular-figures">
                      {d.work}
                    </dd>
                  </dl>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        {/* THE FOOTNOTE MARKER MUST STAY OUTSIDE THE <a>. It renders its own
            anchor (every marker is a real in-page link so it works with JS
            off), and an <a> inside an <a> is invalid nesting: the parser
            splits it, so the DOM React hydrates into no longer matches what it
            rendered. That threw React #418, React regenerated the tree from
            the root, and regenerating the root wiped the `data-hero-intro`
            attribute the inline boot script had set — which hid
            [data-intro-plate] one second into the three-second intro and made
            the hero wordmark vanish. A nesting mistake here breaks the HERO.

            "15 destinations" still needs the marker — it is a claim, and
            without it the page cited sources 1, 2, 3, 5 with an unexplained
            gap — so it sits after the link instead of inside it. */}
        <p className="m-0 flex flex-wrap items-baseline gap-x-2">
          <a
            href="/destinations"
            className="inline-flex items-center gap-2 text-body text-sienna no-underline hover:underline"
          >
            All 15 destinations
            <Icon as={ArrowRight} size="sm" />
          </a>
          <Footnote id="destinations" primary />
        </p>
      </Container>
    </section>
  );
}
