import Image from "next/image";
import { ArrowRight, BookOpen, ClipboardCheck, FlaskConical } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { STAGGER } from "@/lib/motion";
import { Reveal } from "@/app/(home)/_components/register/reveal";

/* ===========================================================================
   homev2 · AUDIENCE FORK
   ---------------------------------------------------------------------------
   Two stacked blocks on one cream ground, image sides mirrored. The page has
   two audiences that want opposite things from it and the rest of the page
   addresses only the first — a student picking a country. This is where an
   institution looking for a recruitment partner gets told, once, that it is
   in the right place.

   Mirroring is the whole reason it works at this density: neither block needs
   more than one photograph to read as finished, because the flip does the
   work a second image would otherwise have to do.

   SERVER COMPONENT. `Reveal` (framer `whileInView`) is the only client code,
   and it is IMPORTED from the live home page's register section rather than
   reimplemented — same once-only opacity+y24 rise, same reduced-motion
   behaviour via <MotionConfig reducedMotion="user"> at the root. Zero
   ScrollTrigger spent; the page-wide budget of 14 is untouched by this file.

   THE THREE PATHWAY CARDS carry Lucide glyphs. Not a graduation cap — that is
   on the banned list and adopting an icon library did not license the
   category's clichés. A book, a flask, a checked sheet: what the three routes
   actually consist of.
   ======================================================================== */

const PATHWAYS = [
  {
    href: "#enquiry",
    glyph: BookOpen,
    title: "Undergraduate",
    blurb: "A first degree abroad.",
  },
  {
    href: "#enquiry",
    glyph: FlaskConical,
    title: "Postgraduate",
    blurb: "Master's and research.",
  },
  {
    href: "#enquiry",
    glyph: ClipboardCheck,
    title: "Test prep",
    blurb: "IELTS, PTE, TOEFL, GRE, SAT, GMAT.",
  },
] as const;

/** One keylined photographic plate, in the house treatment. */
function Plate({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[3/2] w-full overflow-hidden rounded-1 border border-rule-strong bg-paper-tracing ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

/* --- BLOCK A · FOR STUDENTS — text left, plate right ---------------------
   Exported on its own because the Aug 2026 split sends this half to
   `/destinations` and the other half to `/partner-with-us`'s successor,
   `/partners`. The two were authored as one section and are still composed as
   one by the default export below; nothing here was rewritten to separate
   them, only given its own name. */
export function ForkStudents() {
  return (
    <section
      id="fork-students"
      data-chapter="explore"
      aria-labelledby="fork-students-h2"
      className="scroll-mt-24 bg-paper-still py-section-y"
    >
      <Container>
        <h2 id="fork-students-h2" className="sr-only">
          For students
        </h2>

        <div className="grid grid-cols-1 items-center gap-x-grid-gap gap-y-8 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <SectionHeading
              as="h3"
              eyebrow="FOR STUDENTS"
              deck="Fifteen destinations, and the difference between them is not the brochure. It is your marks, your budget and the intake you can realistically make."
            >
              Find the country and course that fits you.
            </SectionHeading>

            <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-3 p-0">
              {PATHWAYS.map((route, index) => (
                <Reveal
                  key={route.title}
                  as="li"
                  delay={index * STAGGER.tight}
                  className="flex"
                >
                  <a
                    href={route.href}
                    className="group/route flex w-full min-h-12 items-center gap-4 rounded-1 border border-rule bg-paper px-4 py-4 no-underline transition-colors duration-200 ease-quad hover:border-rule-strong"
                  >
                    {/* Decorative: the title beside it is the link's name. */}
                    <Icon as={route.glyph} size="md" className="shrink-0 text-marine" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-ui text-h4 text-ink">
                        {route.title}
                      </span>
                      <span className="block font-ui text-body-sm text-ink-muted">
                        {route.blurb}
                      </span>
                    </span>
                    <Icon
                      as={ArrowRight}
                      size="sm"
                      className="shrink-0 text-ink-muted transition-transform duration-200 ease-quad group-hover/route:translate-x-1"
                    />
                  </a>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <Plate
              src="/images/plates/fork-students.jpg"
              alt="Students walking between buildings on a university campus."
            />
          </Reveal>
        </div>

      </Container>
    </section>
  );
}

/* --- BLOCK B · FOR INSTITUTIONS — plate left, text right ------------------
   The mirror of the block above. On mobile both blocks put the plate first,
   because a reversed stack reads as a mistake rather than as a rhythm — which
   is why the order classes stay even now that the two can render apart. */
export function ForkInstitutions() {
  return (
    <section
      id="fork-institutions"
      data-chapter="explore"
      aria-labelledby="fork-institutions-h2"
      className="scroll-mt-24 bg-paper-still py-section-y"
    >
      <Container>
        <h2 id="fork-institutions-h2" className="sr-only">
          For universities and schools
        </h2>

        <div className="grid grid-cols-1 items-center gap-x-grid-gap gap-y-8 lg:grid-cols-2">
          <Reveal>
            <Plate
              src="/images/plates/fork-india-offices.jpg"
              alt="A dense Indian city skyline seen from above in daylight."
            />
          </Reveal>

          <Reveal>
            <SectionHeading
              as="h3"
              eyebrow="FOR UNIVERSITIES AND SCHOOLS"
              deck="Formal agreements with 700+ institutions across fifteen destinations, and counsellors who meet the applicants in person before the file is ever assembled."
            >
              Recruit from our offices across India.
            </SectionHeading>

            <p className="mt-6 max-w-prose font-ui text-body text-ink-muted">
              We have been placing students since{" "}
              <span className="font-mono tabular-figures">2001</span>. Our
              counsellors sit in the cities the applications come from, which is
              why the profiles that reach you have already been read against
              your entry requirements rather than against a wish.
            </p>

            <div className="mt-8">
              <Button href="/#enquiry" variant="secondary">
                Partner with us
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/**
 * Both halves, mirrored, as originally authored for the homepage.
 *
 * KEPT DELIBERATELY. The Aug 2026 split composes `ForkStudents` and
 * `ForkInstitutions` on separate pages, so nothing renders this today. It is
 * not dead code to be tidied away — it is the only definition of how the two
 * blocks read as a pair, and the pairing is the point of a fork.
 */
export default function AudienceFork() {
  return (
    <>
      <ForkStudents />
      <ForkInstitutions />
    </>
  );
}
