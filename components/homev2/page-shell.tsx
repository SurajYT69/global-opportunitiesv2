import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Rule } from "@/components/ui/rule";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

/* ===========================================================================
   SUBPAGE SHELL — HEADER AND FOOT
   ---------------------------------------------------------------------------
   The nine pages split off the homepage in Aug 2026 all have the same three
   parts: a short header, the relocated section, and a counselling CTA. Those
   two bookends live here rather than in nine files, so the CTA wording — which
   is compliance-governed, not stylistic — has exactly one definition.

   THE CTA COPY IS FIXED. "Book a free guidance session", qualified with "No
   cost, no obligation. 30-45 minutes with an admissions counsellor." The
   phrase "free counselling" is banned site-wide by the ads review; so is
   anything implying an admission or visa outcome. Do not reword this without
   going back to that review.

   PHOTOGRAPHER CREDIT rides in the foot. Unsplash's API terms require
   attribution for the six photographs used across the split; `colophon.tsx`
   belongs to the shared page furniture and is not ours to edit, so the credit
   is discharged here — once per page, on every page that the shell renders.

   Both are Server Components. Zero JavaScript, zero motion.
   ======================================================================== */

/** Every photographer whose work appears anywhere in this build. */
const PHOTOGRAPHERS = [
  "Zoshua Colah",
  "Ameya Khandekar",
  "Dimitri Karastelev",
  "Dominic Kurniawan Suryaputra",
  "Kyle Gregory Devaras",
  "Dora Dalberto",
] as const;

export interface PageHeaderProps {
  /** Tracked-caps label above the heading. */
  eyebrow: string;
  /** The page's one and only h1. */
  children: ReactNode;
  /** One line of context. Kept to a sentence — the section carries the rest. */
  deck: string;
}

export function PageHeader({ eyebrow, children, deck }: PageHeaderProps) {
  return (
    <header className="bg-paper-laid pt-12 pb-10 md:pt-16">
      <Container>
        {/* Back to home, up top: every subpage links home, and a crawler
            should find that link before it finds the body. */}
        <Link
          href="/"
          className="inline-flex min-h-12 w-fit items-center gap-2 rounded-0 font-ui text-body-sm font-semibold text-ink-muted no-underline transition-colors duration-200 ease-quad hover:text-ink"
        >
          <Icon as={ArrowLeft} size="sm" />
          Global Opportunities
        </Link>

        {/* as="h1" is load-bearing: this is the page's only h1, and every
            relocated section below it opens at h2. */}
        <SectionHeading as="h1" className="mt-4" eyebrow={eyebrow} deck={deck}>
          {children}
        </SectionHeading>

        <Rule weight="chapter" className="mt-10" />
      </Container>
    </header>
  );
}

export interface PageFootProps {
  /**
   * Sibling pages worth reading next. Required — every page links to at least
   * one other, which is half the reason the site was split.
   */
  related: ReadonlyArray<{ href: string; label: string }>;
}

export function PageFoot({ related }: PageFootProps) {
  return (
    <footer className="bg-paper-tracing py-section-y">
      <Container>
        <div className="flex flex-col gap-8 border-t border-rule-strong pt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-prose">
            <h2 className="font-display text-d2 opsz-32 text-ink text-balance">
              Talk it through with someone who has done it before.
            </h2>
            <p className="mt-4 font-ui text-body text-ink-muted">
              No cost, no obligation.{" "}
              <span className="font-mono tabular-figures">30&ndash;45</span>{" "}
              minutes with an admissions counsellor.
            </p>
            <div className="mt-6">
              <Button href="/#enquiry" variant="primary" size="lg">
                Book a free guidance session
              </Button>
            </div>
          </div>

          <nav aria-label="Related pages" className="shrink-0">
            <p className="font-mono text-mono-label uppercase text-ink-muted tabular-figures">
              Read next
            </p>
            <ul className="m-0 mt-3 flex list-none flex-col gap-1 p-0">
              {related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-12 w-fit items-center gap-2 rounded-0 font-ui text-body font-semibold text-ink underline decoration-rule-strong decoration-1 underline-offset-[0.3em] transition-colors duration-200 ease-quad hover:decoration-2 hover:decoration-sienna"
                  >
                    {link.label}
                    <Icon as={ArrowRight} size="sm" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 font-mono text-caption uppercase text-ink-muted tabular-figures">
          Photographs {PHOTOGRAPHERS.join(" · ")} — Unsplash
        </p>
      </Container>
    </footer>
  );
}
