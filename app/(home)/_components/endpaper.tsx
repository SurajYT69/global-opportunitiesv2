import { Info } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Footnote } from "@/components/ui/footnote";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { INSTITUTIONS, STATS } from "./endpaper/data";
import { Inversion } from "./endpaper/inversion";
import { Outcomes } from "./endpaper/outcomes";
import { StatCountUp } from "./endpaper/stat-countup";

/* ===========================================================================
   13 · ENDPAPER — "Forty thousand people have already done this."
   Chapter VI, SUCCESS. Surface: --endpaper, entered through the 30vh
   --grad-endpaper-turn band. The page's ONE dark chapter, earned narratively.

   `data-chapter="success"` is what switches the focus ring to --ochre-on-dark,
   the selection colours to marine/plate-white, and Newsreader's opsz to 72.

   ICONS: one, on the caveat that closes the chapter. The counted figures and
   the institution register are left bare on purpose — this chapter's argument
   is that the numbers are checkable, and a tick drawn beside a figure is an
   assertion of exactly the kind the footnotes exist to replace.
   ======================================================================== */

/**
 * `<Footnote>` hard-codes --sienna-press, which is 2.5:1 on --endpaper. On the
 * dark chapter the marker takes --sienna-on-dark (7.0:1) instead. Descendant
 * selector, so it wins on specificity without an `!important` and without
 * touching the shared component.
 */
const DARK_FOOTNOTE = "[&_a]:text-sienna-on-dark";

export default function Endpaper() {
  return (
    <section
      id="endpaper"
      data-chapter="success"
      className="relative isolate bg-endpaper"
    >
      {/* The turn: backdrop + the 30vh gradient band. Nothing moves. */}
      <Inversion />

      <div className="relative pt-section-y pb-section-y">
        <Container>
          <SectionHeading
            tone="dark"
            chapter="VI"
            chapterName="SUCCESS"
            eyebrow="OUTCOMES"
            deck={
              <>
                Named students, named universities, named counsellors. Every
                figure below is the one Global Opportunities publishes most
                often and claims least loudly, and every one of them resolves to
                a source.
              </>
            }
          >
            Forty thousand people have already done this.
          </SectionHeading>
        </Container>

        {/* ---- The crossing --------------------------------------------- */}
        {/* The one wide plate on the page: the flight the register below is
            the result of. Dark-chapter treatment — --plate-rule keyline,
            --plate-grey caption, no registration offset, so the photograph
            sits inside the endpaper rather than on top of it. Locked 16:9,
            capped at 480px so it stays a band and never a hero. */}
        <Container className="mt-12 md:mt-16">
          <figure className="m-0 flex flex-col">
            <div className="relative aspect-[16/9] max-h-[480px] w-full overflow-hidden rounded-1 border border-plate-rule bg-endpaper-2">
              <Image
                src="/images/plates/night-window.jpg"
                alt="The view from an aircraft window in the middle of the night — a dark cabin, the wing barely lit, and nothing below but cloud."
                fill
                loading="lazy"
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 font-mono text-caption text-plate-grey tabular-figures">
              THE NIGHT CROSSING · SEAT 34A, SOMEWHERE OVER THE CASPIAN
            </figcaption>
          </figure>
        </Container>

        {/* ---- Named outcomes ------------------------------------------- */}
        <Container className="mt-14 md:mt-20">
          <Outcomes />
        </Container>

        {/* ---- The institutions who vouched back ------------------------ */}
        <Container className="mt-20 md:mt-24">
          <h3 className="font-display text-d2 opsz-32 text-plate-white text-balance">
            And the institutions who vouched back.
          </h3>
          <p className="mt-4 max-w-prose font-ui text-body text-plate-grey">
            Seven partner institutions have published testimonials about Global
            Opportunities; five are named here. We print their names rather than
            our summary of their words — the full text sits on their own pages,
            where you can read it without us in the room.
          </p>

          <ul className="m-0 mt-8 list-none p-0">
            {INSTITUTIONS.map((institution) => (
              <li
                key={institution.id}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t border-plate-rule py-4"
              >
                <span className="font-ui text-h4 text-plate-white">
                  {institution.name}
                </span>
                <span className="font-mono text-caption text-plate-grey tabular-figures">
                  {institution.place} · testimonial on record
                </span>
              </li>
            ))}
          </ul>
        </Container>

        {/* ---- The counted evidence ------------------------------------- */}
        <Container className="mt-20 md:mt-24">
          <h3 className="font-display text-d2 opsz-32 text-plate-white text-balance">
            Counted, and footnoted.
          </h3>

          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-grid-gap gap-y-10 p-0 xs:grid-cols-2 md:grid-cols-4">
            {STATS.map((stat) => (
              <li
                key={stat.id}
                className="flex flex-col gap-3 border-t border-plate-rule pt-5"
              >
                <span
                  data-figure
                  className="font-mono text-figure text-plate-white tabular-figures"
                >
                  <StatCountUp display={stat.display} value={stat.value} />
                  {stat.suffix}
                  <Footnote id={stat.id} className={DARK_FOOTNOTE} />
                </span>
                <span className="font-ui text-label uppercase text-plate-grey">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-12 flex max-w-prose items-start gap-2 font-mono text-caption text-plate-grey tabular-figures">
            <Icon as={Info} size="sm" className="mt-px" />
            <span>
              No visa success rate is published on this page. No admission is
              guaranteed. Figures are carried at the most conservative value
              Global Opportunities publishes, and each one resolves to the
              sources table at the foot of this page.
            </span>
          </p>
        </Container>
      </div>
    </section>
  );
}
