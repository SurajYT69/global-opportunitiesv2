import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { STAGGER } from "@/lib/motion";
import { Reveal } from "@/app/(home)/_components/register/reveal";

/* ===========================================================================
   homev2 · RESOURCES
   ---------------------------------------------------------------------------
   Three cards on cream, the last read before the enquiry form.

   MOBILE IS A SCROLL-SNAP RAIL, NOT A CAROUSEL. `overflow-x-auto` plus
   `snap-x snap-mandatory` on the track and `snap-start` on each card. No
   library, no state, no dots, no autoplay, and it degrades to a plain
   scrollable row with JavaScript off. The negative margin + matching padding
   let the rail bleed to the viewport edge while the cards still line up with
   the container gutter — so a half-visible third card signals "there is more"
   without a control that has to be discovered.

   This is the ONLY horizontal scroll on the page, by design; every other
   section is ruled out of it.

   HREFS ARE PLACEHOLDERS. The articles are not published yet. This follows the
   precedent already set at `register.tsx` ("See the full list"), and is the
   one thing in this build that needs a real URL before it ships to production.

   SERVER COMPONENT. `Reveal` is imported, not reimplemented.
   ======================================================================== */

const ARTICLES = [
  {
    href: "#",
    image: "/images/plates/resource-campus.jpg",
    alt: "A gothic university quadrangle under an overcast sky.",
    category: "Intakes",
    title: "January intake: what is still open, and what has already closed",
    excerpt:
      "Which of the four anchor destinations still accept a January start, and the deadline each one publishes.",
  },
  {
    href: "#",
    image: "/images/plates/resource-library.jpg",
    alt: "A large skylit library reading room filled with students at long desks.",
    category: "Fees",
    title: "What a UK master's actually costs, tuition and everything after it",
    excerpt:
      "Tuition band, the maintenance figure the visa asks you to show, and the costs that sit outside both.",
  },
  {
    href: "#",
    image: "/images/plates/resource-study.jpg",
    alt: "A student writing in a notebook beside a window in daylight.",
    category: "Work rights",
    title: "Post-study work rights, country by country",
    excerpt:
      "How long each destination lets you stay and work after the course ends, on its own published terms.",
  },
] as const;

export default function Resources() {
  return (
    <section
      id="resources"
      data-chapter="trust"
      aria-labelledby="resources-h2"
      className="scroll-mt-24 bg-paper-still py-section-y"
    >
      <Container>
        <SectionHeading id="resources-h2" eyebrow="RESOURCES">
          Latest from our counsellors.
        </SectionHeading>
      </Container>

      {/* The rail. Full-bleed on mobile so the cut card reaches the edge;
          a plain three-up grid from 768px, where nothing needs to scroll. */}
      <Container className="mt-10">
        <ul
          className={[
            "m-0 flex list-none gap-x-grid-gap p-0",
            // Mobile: bleed past the gutter and snap.
            "-mx-gutter snap-x snap-mandatory overflow-x-auto px-gutter pb-2",
            // 768px up: a grid, no scroll, no bleed.
            "md:mx-0 md:grid md:snap-none md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0",
          ].join(" ")}
        >
          {ARTICLES.map((article, index) => (
            <Reveal
              key={article.title}
              as="li"
              delay={index * STAGGER.tight}
              className="flex w-[78vw] shrink-0 snap-start sm:w-[60vw] md:w-auto md:shrink"
            >
              <article className="group/card relative flex w-full flex-col">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-1 border border-rule-strong bg-paper-tracing">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 33vw, 78vw"
                    className="object-cover"
                  />
                </div>

                <p className="mt-4 font-mono text-mono-label uppercase text-marine tabular-figures">
                  {article.category}
                </p>

                <h4 className="mt-2 font-ui text-h4 text-ink text-balance">
                  {article.title}
                </h4>

                <p className="mt-2 max-w-prose font-ui text-body-sm text-ink-muted">
                  {article.excerpt}
                </p>

                {/* The card's single focusable element; `after:` stretches its
                    hit area over the whole card so the photograph is clickable
                    and assistive technology still gets exactly one link. */}
                <a
                  href={article.href}
                  className="mt-auto inline-flex min-h-12 w-fit items-center gap-2 rounded-0 pt-4 font-ui text-body font-semibold text-ink underline decoration-rule-strong decoration-1 underline-offset-[0.3em] transition-colors duration-200 ease-quad after:absolute after:inset-0 after:content-[''] hover:decoration-2 hover:decoration-sienna"
                >
                  Read more
                  <span className="sr-only">: {article.title}</span>
                  <Icon as={ArrowRight} size="sm" />
                </a>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Container className="mt-10">
        <a
          href="#"
          className="inline-flex min-h-12 w-fit items-center gap-2 rounded-0 font-ui text-body font-semibold text-ink underline decoration-rule-strong decoration-1 underline-offset-[0.3em] transition-colors duration-200 ease-quad hover:decoration-2 hover:decoration-sienna"
        >
          View all
          <Icon as={ArrowRight} size="sm" />
        </a>
      </Container>
    </section>
  );
}
