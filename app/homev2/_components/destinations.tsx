import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/shadcn/card";
import { ANCHOR_DESTINATIONS } from "@/app/(home)/_components/gazetteer/data";

/** slug -> ISO code, which is the flag filename. Only the four anchors have
    one; anything else renders the plate with no badge. */
const FLAGS: Record<string, string> = {
  "united-kingdom": "gb",
  "united-states": "us",
  canada: "ca",
  australia: "au",
};

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

   FLAGS (2026-08-22). The imagery ban was lifted on 2026-08-21, and the
   client asked for a flag on each card. `public/flags/*.svg` are the
   public-domain vectors from flagcdn.com, rendered `unoptimized` because the
   image optimizer refuses SVG and a vector has nothing to optimize — same
   treatment as the wordmark. The card photographs are client-supplied plates
   of places, and a card whose image is missing falls back to a tinted field
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
      <Container className="flex flex-col gap-8">
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
              {/* bg-secondary, NOT bg-muted (2026-08-21). These cards were the
                    page's only #ECF0F5 while <WaysWeAssist> and the FAQ rows
                    were #F5F7FA, so two card tints sat four sections apart
                    and read as a mistake. #F5F7FA is `--paper-laid`, the tint
                    that replaces a drawn card border; #ECF0F5 is the darker
                    STATE on top of it (FAQ open, service-card hover). A
                    resting card does not use the state colour. */}
                <Card className="h-full gap-0 overflow-hidden border-0 bg-secondary py-0">
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
                  {/* Scrim, top-weighted: these plates are photographs we do
                      not control, so the flag badge needs a ground of its own
                      rather than luck with whatever is behind it. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-endpaper/45 via-endpaper/5 to-transparent"
                  />
                  {/* Decorative: the country is the card title two lines
                      below, so alt="" rather than a second announcement. */}
                  {FLAGS[d.slug] ? (
                    <Image
                      src={`/flags/${FLAGS[d.slug]}.svg`}
                      alt=""
                      width={54}
                      height={36}
                      unoptimized
                      className="absolute left-3 top-3 h-9 w-[54px] rounded-[4px] object-cover ring-1 ring-plate-white/70"
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

        {/* THE HYDRATION LESSON THIS BLOCK TAUGHT, KEPT (2026-08-21).
            There used to be a <Footnote> marker after this link. It renders
            its own <a>, and an <a> inside an <a> is invalid nesting: the
            parser splits it, so the DOM React hydrates into is not the one it
            rendered. That threw React #418, React regenerated the tree from
            the root, and regenerating the root wiped the `data-hero-intro`
            attribute the inline boot script had set, which hid
            [data-intro-plate] one second into the three-second intro and made
            the hero wordmark vanish. A NESTING MISTAKE HERE BREAKS THE HERO.

            The marker itself is gone with the sources panel it resolved into.
            The rule is not: never put an anchor inside an anchor. */}
        <p className="m-0 flex flex-wrap items-baseline gap-x-2">
          <a
            href="/destinations"
            className="inline-flex items-center gap-2 text-body text-sienna no-underline hover:underline"
          >
            All 15 destinations
            <Icon as={ArrowRight} size="sm" />
          </a>
        </p>
      </Container>
    </section>
  );
}
