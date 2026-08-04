/**
 * SECTION 7 · still-page — "Nothing Here Casts a Shadow"   (Chapter III · Trust)
 *
 * CANON: the anti-moment. The one section of the page with no motion at all
 * beyond a single 400ms opacity fade, set on `--paper-still` (#FDFBF7) — the
 * flattest, brightest paper in the system, used only here. Six accreditations,
 * each with its mark name, the credential's own name, a single line of what it
 * means for the reader, and how often the issuing body re-examines us. AIRC's
 * published standard is quoted verbatim. The legal entity is named in full.
 *
 * THE STILLNESS IS THE SIGNAL. Fraud is loud; this is the quietest section on
 * the page, at the exact moment a parent is deciding whether to believe us.
 *
 * SERVER COMPONENT. Zero JavaScript, zero ScrollTrigger instances, zero Motion
 * components, zero Anime.js scopes. The fade is CSS, per canon. The six long
 * explanations are native <details> — disclosure without a bundle. This section
 * adds nothing to the client bundle, which is itself part of the argument. The
 * Lucide glyphs added in the 2026-08-04 icon pass do not change that: they are
 * rendered here on the server and ship as inert SVG paths in the HTML.
 *
 * v2 COMPACTION (client note: "reads like a blog"): the six marks were six
 * stacked essays running the section to 2,351px. They are now six bordered
 * cards on a 3x2 desktop grid — mark name, one line of meaning, one mono
 * provenance line — with every word of the original explanation preserved
 * inside a per-card <details>. Headline, deck and the zero-motion law are
 * untouched. Target height ≈ 1,480px desktop.
 *
 * DEVIATIONS (4, all deliberate — see the final report):
 *  1. The 400ms fade is driven by a CSS `view()` scroll timeline rather than by
 *     the page-level `[data-reveal]` IntersectionObserver, which the foundation
 *     layer did not ship. The element still carries `data-reveal="still"`, so
 *     the documented contract lights up unchanged if that observer lands later.
 *  2. British Council's credential is set as TRAINED AGENT AND COUNSELLOR
 *     PROGRAMME, not "certified" — the brand research supports "British Council
 *     trained counsellors" and nothing stronger.
 *  3. Five of the six re-examination cadences are unverified, so no number is
 *     printed for them. The blueprint's `[VERIFY]` placeholders are replaced by
 *     a stated absence, and the absence is explained below the grid.
 *  4. Canon's "no keyline, no well, no box" for this section is relaxed to a
 *     1px `--rule` hairline card, on instruction. Still no tint beyond
 *     `--paper` on `--paper-still`, no shadow, no chip, no logo, no image.
 */

import type { ReactNode } from "react";
import {
  BadgeCheck,
  CircleDashed,
  ExternalLink,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Footnote, FootnoteDetails } from "@/components/ui/footnote";
import { Icon, type IconComponent } from "@/components/ui/icon";
import { Rule } from "@/components/ui/rule";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

/* ---------------------------------------------------------------------------
   THE FADE — the section's entire motion budget, spent in one line of CSS.
   ---------------------------------------------------------------------------
   opacity 0 -> 1, --ease-quad, once, on entry. No transform, no stagger, no
   scrub, no pin. The six cards do not reveal individually; the surface does
   not fade in separately; the quotation does not type out.

   Three guarantees, in order of importance:
   · No JS      — a scroll-driven `view()` timeline, so nothing is imported,
                  observed or hydrated. With scripting disabled it is identical.
   · No hiding  — the base rule is `opacity: 1`. The fade only ever exists
                  inside `@supports` + `prefers-reduced-motion: no-preference`.
                  Reduced motion, unsupported browsers and a failed stylesheet
                  all land on the same fully-visible state.
   · No jitter  — `animation-range` is calibrated so a normal reading scroll
                  crosses it in roughly 400ms; the section then never responds
                  to scroll position again.

   The cards add no second animation: opening a <details> is an instant native
   state change, and no element in this section carries a `transition`.
   ------------------------------------------------------------------------ */
const FADE_CSS = `
#still-page [data-reveal="still"] { opacity: 1; }
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    #still-page [data-reveal="still"] {
      animation: go-still-fade 400ms var(--ease-quad) both;
      animation-timeline: view();
      animation-range: entry 10% entry 60%;
    }
  }
}
@keyframes go-still-fade { from { opacity: 0 } to { opacity: 1 } }
`;

/* ---------------------------------------------------------------------------
   THE SIX MARKS
   ---------------------------------------------------------------------------
   Set as type. Never as logos: rendering six third-party marks as images would
   reproduce exactly the silent grey strip GO's current site already runs, which
   the brand research names as its most under-exploited trust asset.

   Only AIRC's re-examination cadence is verified — it is published on GO's own
   /airc-accreditation/ page and quoted below in full. The other five are set by
   the body that issues the mark and we have not checked them, so no number is
   printed. A number without a source is worth less here than an admitted gap.
   ------------------------------------------------------------------------ */
interface Mark {
  /** The mark as it is spoken. The card's row title. */
  name: string;
  /** The credential's own name and its jurisdiction. Mono tracked caps. */
  credential: string;
  /** One line. What the mark buys the reader, and nothing else. */
  gist: string;
  /** Who issues it, and under whose jurisdiction. Inside the disclosure. */
  issuedBy: string;
  /** The full explanation. Inside the disclosure, never truncated. */
  detail: ReactNode;
  /** External re-examination cadence. */
  cycle: string;
  /** True only where we can name where the cadence came from. */
  cycleVerified: boolean;
  /** Where the claim resolves. */
  source: string;
  /** Present on the two claims carrying a live third-party citation. */
  sourceHref?: string;
  /** Month we last checked. */
  verified: string;
}

const MARKS: Mark[] = [
  {
    name: "AIRC",
    credential: "American International Recruitment Council · United States",
    gist: "Checked against a published US standard.",
    issuedBy: "AIRC · United States",
    detail: (
      <>
        An independent US body that certifies agencies recruiting students to
        American institutions against a published standard. It means a US
        university can check us against that standard before it accepts a
        student from us, rather than taking our word for it.
      </>
    ),
    cycle: "5 years (first round), 10 years thereafter",
    cycleVerified: true,
    source: "airc-education.org · quoted in full below",
    verified: "Aug 2026",
  },
  {
    name: "ICEF",
    credential: "ICEF Agency Status · Germany",
    gist: "Screened by the industry's vetting programme.",
    issuedBy: "ICEF · Germany",
    detail: (
      <>
        A screening programme used across the international education industry
        to vet recruitment agencies. It means the institutions we introduce you
        to have a common reference for who we are, and it is how we reach vetted
        partners rather than cold-emailing universities.
      </>
    ),
    cycle: "Set by the body · not yet verified by us",
    cycleVerified: false,
    source: "icef.com",
    sourceHref: "https://www.icef.com/quality-standards/icef-agency-status/",
    verified: "Aug 2026",
  },
  {
    name: "AAERI",
    credential:
      "Association of Australian Education Representatives in India",
    gist: "A complaints route in India, not overseas.",
    issuedBy: "AAERI · India",
    detail: (
      <>
        The Indian industry body for representatives of Australian institutions,
        with a code of conduct and a complaints process. It means that if we
        handle your Australian application badly, there is a body{" "}
        <em className="italic">in India</em> you can complain to about us.
      </>
    ),
    cycle: "Set by the body · not yet verified by us",
    cycleVerified: false,
    source: "Displayed by GO sitewide",
    verified: "Aug 2026",
  },
  {
    name: "British Council",
    credential: "Trained agent and counsellor programme · United Kingdom",
    gist: "UK advice from an examined counsellor.",
    issuedBy: "British Council · United Kingdom",
    detail: (
      <>
        The British Council&rsquo;s training and ethics programme for agents
        advising on UK study. It means the counsellor advising you on a UK
        application sat an examined course rather than learning on your file.
      </>
    ),
    cycle: "Set by the body · not yet verified by us",
    cycleVerified: false,
    source: "Displayed by GO sitewide",
    verified: "Aug 2026",
  },
  {
    name: "Education New Zealand",
    credential: "Recognised agency · New Zealand government agency",
    gist: "Recognised by New Zealand’s own agency.",
    issuedBy: "Education New Zealand · New Zealand government agency",
    detail: (
      <>
        The New Zealand government education agency&rsquo;s recognition scheme
        for overseas representatives. It means our New Zealand advice is given
        under a scheme the destination government itself operates.
      </>
    ),
    cycle: "Set by the body · not yet verified by us",
    cycleVerified: false,
    source: "Displayed by GO sitewide",
    verified: "Aug 2026",
  },
  {
    name: "PTE Pearson",
    credential: "Authorised test partner · Pearson, United Kingdom",
    gist: "PTE at the published fee, no arrangement fee.",
    issuedBy: "Pearson · United Kingdom",
    detail: (
      <>
        Pearson&rsquo;s authorisation covering the PTE English test. It means you
        can book and prepare for PTE through us at the published fee, with no
        arrangement fee added.
      </>
    ),
    cycle: "Set by the body · not yet verified by us",
    cycleVerified: false,
    source: "Displayed by GO sitewide",
    verified: "Aug 2026",
  },
];

const AIRC_SOURCE = "https://www.airc-education.org/faqs";

/** The one link recipe this section uses. Instant colour change, no transition.
    `gap-2` seats the ExternalLink glyph both anchors carry. */
const LINK =
  "inline-flex min-h-11 items-center gap-2 text-marine underline decoration-rule-strong underline-offset-4 hover:decoration-marine";

/** One label/value pair inside a card's provenance block. Mono both sides. */
function DataLine({
  label,
  tone = "muted",
  icon,
  children,
}: {
  label: string;
  /** `verified` earns `--verdigris`, the page's cleared state. */
  tone?: "muted" | "verified";
  /**
   * Optional state glyph, drawn ahead of the value. `sm`, so it matches the
   * mono line's cap height, and it inherits the <dd>'s colour rather than
   * carrying one — the tone above is still the only thing setting it. Purely
   * a restatement of the words beside it, so it stays decorative.
   */
  icon?: IconComponent;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <dt className="font-mono text-mono-label uppercase text-ink-muted">
        {label}
      </dt>
      <dd
        className={cn(
          "font-mono text-mono-label uppercase tabular-figures",
          icon && "inline-flex items-center gap-1.5",
          tone === "verified" ? "text-verdigris" : "text-ink",
        )}
      >
        {icon && <Icon as={icon} size="sm" />}
        {children}
      </dd>
    </div>
  );
}

export function StillPage() {
  return (
    <section
      id="still-page"
      data-chapter="trust"
      aria-labelledby="still-page-h2"
      className="scroll-mt-24 bg-paper-still py-section-y"
    >
      <style>{FADE_CSS}</style>

      <Container>
        <div data-reveal="still">
          {/* --- Chapter opener · III TRUST ----------------------------------
              Headline and deck sit side by side from 1280px so the opener is a
              masthead rather than four stacked paragraphs. Same copy, same
              type, roughly 150px less page. */}
          <Rule weight="colophon" />

          <div className="mt-6 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-x-grid-gap">
            <SectionHeading
              chapter="III"
              chapterName="TRUST"
              id="still-page-h2"
            >
              Nothing here casts a shadow.
            </SectionHeading>

            <p className="mt-6 max-w-deck font-display text-deck text-ink-muted lg:mt-0">
              That is a description of this page, not a promise about your
              application. There are no drop shadows in this design and there
              are no guarantees in this business. What there is: six external
              bodies that review us, a published re-examination cycle, and a
              registered company you can look up.
            </p>
          </div>

          {/* --- The six marks ------------------------------------------------
              3x2 at >=1280px, 2x3 from 768px, one column below that. Each card
              is a 1px --rule hairline on --paper over the section's
              --paper-still: the quietest edge the system has. No shadow, no
              radius beyond the 2px keyline, no hover state, no transition.

              The card carries the payload — name, one line of meaning, the
              re-examination cadence. The full explanation, the issuing body and
              the citation live in a native <details> so nothing is lost and
              nothing is scrolled past. */}
          <ul className="mt-8 grid list-none grid-cols-1 gap-grid-gap p-0 sm:grid-cols-2 lg:grid-cols-3">
            {MARKS.map((mark) => (
              <li
                key={mark.name}
                className="flex flex-col rounded-1 border border-rule bg-paper p-5"
              >
                {/* One glyph, the same one six times: these are six instances
                    of the same thing — an external body that examines us — and
                    six different glyphs would invent six different meanings we
                    cannot source. It sits in the ink of the name it precedes. */}
                <h3 className="flex items-center gap-2 font-ui text-h4 text-ink">
                  <Icon as={ShieldCheck} size="md" />
                  {mark.name}
                </h3>

                <p className="mt-1.5 font-mono text-mono-label uppercase text-ink-muted">
                  {mark.credential}
                </p>

                {/* Set in the primary ink, never the muted ink. This line is
                    the payload of the card, not secondary text — and it is
                    permanently visible, never behind the disclosure. */}
                <p className="mt-3 flex-1 font-ui text-body-sm text-ink">
                  {mark.gist}
                </p>

                <div className="mt-4 border-t border-rule pt-3">
                  <dl>
                    {/* Verified cadences take the sealed badge, the five we
                        have not checked take an open dashed ring. The glyph
                        only ever repeats what the words already say, so a
                        reader who cannot see it loses nothing. */}
                    <DataLine
                      label="Re-examined"
                      tone={mark.cycleVerified ? "verified" : "muted"}
                      icon={mark.cycleVerified ? BadgeCheck : CircleDashed}
                    >
                      {mark.cycle}
                    </DataLine>
                  </dl>

                  <details className="mt-2">
                    {/* Left as `display: list-item` so the native disclosure
                        triangle survives; `py-1` takes the row past the 24px
                        AA target size without a second element. */}
                    <summary className="cursor-pointer py-1 font-mono text-caption uppercase text-ink-muted tabular-figures marker:text-sienna-press">
                      {`What ${mark.name} means, in full`}
                    </summary>

                    <p className="mt-2 font-ui text-body-sm text-ink">
                      {mark.detail}
                    </p>

                    <dl className="mt-3 flex flex-col gap-y-1.5">
                      <DataLine label="Issued by">{mark.issuedBy}</DataLine>
                      <DataLine label="Source">
                        {mark.sourceHref ? (
                          <a
                            href={mark.sourceHref}
                            target="_blank"
                            rel="noreferrer"
                            className={LINK}
                          >
                            {mark.source}
                            {/* The glyph draws what the sr-only text says;
                                both stay, one per audience. */}
                            <Icon as={ExternalLink} size="sm" />
                            <span className="sr-only">
                              {" "}
                              (opens in a new tab)
                            </span>
                          </a>
                        ) : (
                          mark.source
                        )}
                        <span aria-hidden="true"> · </span>
                        Verified {mark.verified}
                      </DataLine>
                    </dl>
                  </details>
                </div>
              </li>
            ))}
          </ul>

          {/* --- AIRC verbatim, and the entity that holds the marks -----------
              Reproduced exactly as AIRC publishes it, lower-case opening and
              parentheses included. An accreditation is only as good as the
              entity holding it, so the entity is named, addressed and dialable
              in the same row. */}
          <div className="mt-8 grid gap-x-grid-gap gap-y-8 border-t border-rule pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <figure className="m-0">
              <blockquote cite={AIRC_SOURCE}>
                <p className="max-w-serif font-display text-quote opsz-32 text-ink lg:indent-[-0.5em]">
                  &ldquo;for a designated period of time of five years (first
                  round), and ten years (thereafter)&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-4 font-mono text-mono-label uppercase text-ink-muted tabular-figures">
                <span aria-hidden="true">— </span>
                <cite className="not-italic text-ink">AIRC</cite>, on the term
                of its certification.{" "}
                <a
                  href={AIRC_SOURCE}
                  target="_blank"
                  rel="noreferrer"
                  className={LINK}
                >
                  airc-education.org
                  <Icon as={ExternalLink} size="sm" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <span aria-hidden="true"> · </span>
                Last verified Aug 2026
              </figcaption>
            </figure>

            <div>
              <address className="not-italic">
                <p className="font-mono text-data uppercase text-ink tabular-figures">
                  Global Opportunities Private Limited
                </p>
                <p className="mt-2 font-mono text-data text-ink-muted tabular-figures">
                  HS-27, 2nd Floor, Kailash Colony Market, New Delhi 110048
                </p>
                <p className="mt-2 font-mono text-data uppercase text-ink-muted tabular-figures">
                  Est. 2001, Amritsar
                  <Footnote id="founded" />
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-8">
                  {/* The receiver marks these two as dialable. Decorative:
                      the number and the word "Toll-free" carry the meaning. */}
                  <a
                    href="tel:1800111119"
                    className="inline-flex min-h-11 items-center gap-2 font-mono text-data text-marine tabular-figures underline decoration-rule-strong underline-offset-4 hover:decoration-marine"
                  >
                    <Icon as={Phone} size="sm" />
                    Toll-free 1800 111 119
                  </a>
                  <a
                    href="tel:+911147141414"
                    className="inline-flex min-h-11 items-center gap-2 font-mono text-data text-marine tabular-figures underline decoration-rule-strong underline-offset-4 hover:decoration-marine"
                  >
                    <Icon as={Phone} size="sm" />
                    Delhi South +91 11 4714 1414
                  </a>
                </p>
              </address>

              {/* Below 1024px the marginalia rail does not exist; the one
                  footnote used in this section resolves here instead. Zero
                  JavaScript. */}
              <FootnoteDetails id="founded" className="mt-4" />
            </div>
          </div>

          {/* --- The two admissions this section exists to be able to make ---- */}
          <div className="mt-6 grid gap-x-grid-gap gap-y-4 lg:grid-cols-2">
            <p className="max-w-prose font-ui text-body-sm text-ink-muted">
              Five of the six re-examination cycles are set by the body that
              issues the mark, and we have not verified them ourselves. This
              page prints a number when it can name where the number came from.
              Until then the line stays open rather than filled.
            </p>
            <p className="max-w-prose font-ui text-body-sm text-ink-muted">
              No percentage appears on this page. Every competitor publishes a
              visa success rate; independent guidance to parents treats that
              specific claim as a warning sign, so we do not make it.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default StillPage;
