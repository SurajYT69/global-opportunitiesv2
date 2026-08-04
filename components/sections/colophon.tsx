import {
  Clock,
  ExternalLink,
  List,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Rule } from "@/components/ui/rule";
import {
  Footnote,
  allSources,
  footnoteId,
  footnoteRefId,
} from "@/components/ui/footnote";

/* ===========================================================================
   16 · THE COLOPHON
   ---------------------------------------------------------------------------
   A book's colophon states who made the thing, where, when, in what types,
   and on whose authority. This one does the same, and then does the thing no
   competitor does: it prints the sources table that every footnote marker on
   the page resolves into, with an owner and a last-verified date per entry.

   Surface --paper-laid, top rule 0.125rem --rule-strong (Rule weight
   "colophon"). Zero motion, zero JavaScript: this is a Server Component with
   no client boundary anywhere inside it.

   `data-chapter` is deliberately absent — the colophon sits outside the six
   chapters, so the Newsreader axis stays at the base 16 and the dark-chapter
   focus-ring override never applies.

   ICONS (2026-08-04): Lucide, via `<Icon>` only. They mark the CONTACT
   POINTS and the one index — the things a reader scans for rather than
   reads — and every one of them has its word or its number beside it, so
   every one is decorative and unlabelled. Nearly all are `sm`: this footer
   is set in mono caption and label sizes, which is exactly the case the
   convention reserves `sm` for. Deliberately unmarked: the eighteen branch
   numbers (one glyph per row, eighteen times, is a texture not an
   affordance — the "Toll free / All branches" block above already carries
   the phone mark), the thirteen Contents rows (the heading carries the mark
   for the whole list), the accreditation and social names (they are set
   text, not links), and the footnote back-references (they belong to
   `components/ui/footnote.tsx`, not to this file).
   ======================================================================== */

const PHONE_NATIONAL = "+91 82828 28215";
const PHONE_NATIONAL_HREF = "tel:+918282828215";
const PHONE_DELHI = "+91 11 4714 1414";
const PHONE_DELHI_HREF = "tel:+911147141414";
const PHONE_TOLL_FREE = "1800 111 119";
const PHONE_TOLL_FREE_HREF = "tel:1800111119";
const WHATSAPP_HREF = "https://wa.me/918282828215";

/** The page, in reading order. Mirrors the section ids. */
const CONTENTS: { href: string; label: string }[] = [
  { href: "#hero", label: "The Departure Card" },
  { href: "#gazetteer", label: "Four destinations, up close" },
  { href: "#register", label: "The Register of partner universities" },
  { href: "#what-we-do", label: "Fifteen things we do" },
  { href: "#still-page", label: "Accreditation" },
  { href: "#branch-atlas", label: "Eighteen offices" },
  { href: "#contributors", label: "The counsellors" },
  { href: "#for-parents", label: "For parents" },
  { href: "#reckoning", label: "What it costs, in rupees" },
  { href: "#eleven-months", label: "Your next eleven months" },
  { href: "#endpaper", label: "Outcomes" },
  { href: "#questions", label: "Questions people actually ask" },
  { href: "#enquiry", label: "Book a free guidance session" },
];

/**
 * Eighteen named branches. One national line reaches all of them; Delhi
 * South, the head office, also has a direct line. We publish the number we
 * can name — no branch here carries a number we have not verified.
 */
const BRANCHES: { city: string; phone: string; href: string }[] = [
  "Ahmedabad",
  "Amritsar",
  "Bangalore",
  "Bathinda",
  "Chandigarh",
  "Chennai",
  "Delhi South",
  "Delhi West",
  "Hyderabad",
  "Jalandhar",
  "Ludhiana",
  "Mohali",
  "Mumbai Andheri",
  "Mumbai Bandra",
  "Mumbai Dadar",
  "Mumbai Thane",
  "Patiala",
  "Pune",
].map((city) =>
  city === "Delhi South"
    ? { city, phone: PHONE_DELHI, href: PHONE_DELHI_HREF }
    : { city, phone: PHONE_NATIONAL, href: PHONE_NATIONAL_HREF },
);

const ACCREDITATIONS = [
  "AIRC",
  "ICEF",
  "AAERI",
  "BRITISH COUNCIL",
  "EDUCATION NEW ZEALAND",
  "PTE PEARSON",
];

const SOCIALS = ["Facebook", "Instagram", "LinkedIn", "YouTube"];

const blockLabel = "font-ui text-label uppercase text-ink-muted";

export default function Colophon() {
  const sources = allSources();

  return (
    <footer
      id="colophon"
      aria-labelledby="colophon-title"
      className="bg-paper-laid"
    >
      <Rule weight="colophon" />

      <Container width="frame" className="py-section-y-tight">
        {/* ── Imprint · contents · contact ───────────────────────────────── */}
        <div className="grid gap-grid-gap md:grid-cols-3">
          {/* Imprint */}
          <div>
            <h2
              id="colophon-title"
              className="font-display text-d2 opsz-32 text-ink"
            >
              Global Opportunities
            </h2>
            <p className="mt-4 font-mono text-mono-label uppercase text-ink tabular-figures">
              Global Opportunities Private Limited
            </p>
            <p className="mt-1 font-mono text-mono-label uppercase text-ink-muted tabular-figures">
              Est. 2001, Amritsar
              <Footnote id="founded" /> · Twenty-five years to 2026
            </p>

            <address className="mt-6 font-ui text-body-sm not-italic text-ink-muted">
              {/* The mark sits on the label line, not on the street lines —
                  an address is read, not scanned. */}
              <span className="inline-flex items-center gap-2">
                <Icon as={MapPin} size="sm" />
                Registered office
              </span>
              <br />
              HS-27, 2nd Floor, Kailash Colony Market
              <br />
              New Delhi 110048
            </address>
          </div>

          {/* Contents */}
          <nav aria-label="Page contents">
            {/* One mark for the whole index. Thirteen chevrons down the
                column would read as ornament; the hover underline is
                already each row's affordance. */}
            <h3 className={`${blockLabel} flex items-center gap-2`}>
              <Icon as={List} size="sm" />
              Contents
            </h3>
            <ul className="mt-3 flex list-none flex-col p-0">
              {CONTENTS.map((entry) => (
                <li key={entry.href}>
                  <a
                    href={entry.href}
                    className="inline-flex min-h-8 items-center py-1 font-ui text-body-sm text-ink no-underline hover:text-marine hover:underline hover:decoration-sienna hover:underline-offset-4"
                  >
                    {entry.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className={blockLabel}>Reach a counsellor</h3>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
              <dt className="self-center font-ui text-label uppercase text-ink-muted">
                Toll free
              </dt>
              <dd className="m-0">
                <a
                  href={PHONE_TOLL_FREE_HREF}
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-data text-marine no-underline tabular-figures hover:underline"
                >
                  <Icon as={Phone} size="sm" />
                  {PHONE_TOLL_FREE}
                </a>
              </dd>

              <dt className="self-center font-ui text-label uppercase text-ink-muted">
                All branches
              </dt>
              <dd className="m-0">
                <a
                  href={PHONE_NATIONAL_HREF}
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-data text-marine no-underline tabular-figures hover:underline"
                >
                  <Icon as={Phone} size="sm" />
                  {PHONE_NATIONAL}
                </a>
              </dd>

              <dt className="self-center font-ui text-label uppercase text-ink-muted">
                Delhi South
              </dt>
              <dd className="m-0">
                <a
                  href={PHONE_DELHI_HREF}
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-data text-marine no-underline tabular-figures hover:underline"
                >
                  <Icon as={Phone} size="sm" />
                  {PHONE_DELHI}
                </a>
              </dd>

              <dt className="self-center font-ui text-label uppercase text-ink-muted">
                WhatsApp
              </dt>
              <dd className="m-0">
                {/* Ink and rule, never WhatsApp green — on this page green
                    means verified, and that semantic must not leak. The glyph
                    is a generic speech bubble inheriting --ink for the same
                    reason: Lucide ships no brand marks, and a branded one
                    would carry the green back in. */}
                <a
                  href={WHATSAPP_HREF}
                  className="inline-flex min-h-12 items-center gap-2 rounded-2 border border-rule-strong px-3 font-mono text-caption uppercase text-ink no-underline tabular-figures hover:border-sienna hover:text-marine"
                >
                  <Icon as={MessageCircle} size="sm" />
                  Message {PHONE_NATIONAL}
                </a>
              </dd>
            </dl>

            {/* `flex`, not `inline-flex`, so the line keeps its block flow
                under the contact list. */}
            <p className="mt-4 flex items-center gap-2 font-mono text-caption uppercase text-ink-muted tabular-figures">
              <Icon as={Clock} size="sm" />
              9 AM – 9 PM IST · New Delhi · UTC+05:30
            </p>

            <h3 className={`${blockLabel} mt-8`}>Elsewhere</h3>
            <p className="mt-3 font-mono text-mono-label uppercase text-ink tabular-figures">
              {SOCIALS.join(" · ")}
            </p>
            <p className="mt-2 font-display text-footnote opsz-8 text-ink-muted">
              A profile link is printed here once we have verified it points at
              an account we control. A link that resolves to the wrong place
              does more damage than no link.
            </p>
          </div>
        </div>

        <Rule weight="chapter" className="my-10" />

        {/* ── Branches ───────────────────────────────────────────────────── */}
        <section aria-labelledby="colophon-branches">
          <h3 id="colophon-branches" className={blockLabel}>
            Eighteen offices, named and addressed
            <Footnote id="offices" />
          </h3>

          <ul className="mt-5 grid list-none grid-cols-1 gap-x-grid-gap p-0 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {BRANCHES.map((branch) => (
              <li
                key={branch.city}
                className="flex items-center justify-between gap-3 hairline-b"
              >
                <span className="font-ui text-body-sm text-ink">
                  {branch.city}
                </span>
                <a
                  href={branch.href}
                  aria-label={`Call Global Opportunities, ${branch.city}`}
                  className="inline-flex min-h-11 items-center font-mono text-caption uppercase text-marine no-underline tabular-figures hover:underline"
                >
                  {branch.phone}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-4 max-w-prose font-display text-footnote opsz-8 text-ink-muted">
            One national line reaches every branch; Delhi South, the head
            office, also has a direct line. Street addresses and opening hours
            for all eighteen are published on each branch&rsquo;s own page. You
            can walk into any of them.
          </p>
        </section>

        <Rule weight="chapter" className="my-10" />

        {/* ── Accreditation ─────────────────────────────────────────────── */}
        <section aria-labelledby="colophon-accreditation">
          <h3 id="colophon-accreditation" className={blockLabel}>
            Accreditation
          </h3>
          <p className="mt-4 font-mono text-mono-label uppercase text-ink tabular-figures">
            {ACCREDITATIONS.join(" · ")}
          </p>
          <p className="mt-3 max-w-prose font-display text-footnote opsz-8 text-ink-muted">
            AIRC certification is granted for a designated period of five years
            at first round and ten years thereafter, and is reviewed by an
            external body rather than by us. Each mark above is held by Global
            Opportunities Private Limited and is verifiable with the issuing
            association directly.
          </p>
        </section>

        <Rule weight="chapter" className="my-10" />

        {/* ── Sources & last verified ────────────────────────────────────
            Every superscript on this page resolves into a row of this table.
            Ids come from the foundation registry, so the markers never 404. */}
        <section aria-labelledby="colophon-sources">
          <h3 id="colophon-sources" className={blockLabel}>
            Sources &amp; last verified
          </h3>
          <p className="mt-3 max-w-prose font-display text-footnote opsz-8 text-ink-muted">
            Every number printed on this page carries a superscript, and every
            superscript lands here. Each entry names where the figure came
            from, who inside Global Opportunities is accountable for it, and
            the month it was last checked.
          </p>

          <table className="mt-6 w-full border-collapse text-left">
            <caption className="sr-only">
              Sources and last-verified dates for every figure on this page
            </caption>
            <thead>
              <tr className="hairline-strong-b">
                <th
                  scope="col"
                  className="w-8 pb-2 font-ui text-label uppercase text-ink-muted"
                >
                  No.
                </th>
                <th
                  scope="col"
                  className="pb-2 font-ui text-label uppercase text-ink-muted"
                >
                  Claim, and where it comes from
                </th>
                <th
                  scope="col"
                  className="hidden w-32 pb-2 font-ui text-label uppercase text-ink-muted sm:table-cell"
                >
                  Last verified
                </th>
              </tr>
            </thead>
            <tbody>
              {sources.map(({ id, n, source }) => (
                <tr key={id} id={footnoteId(id)} className="hairline-b">
                  <th
                    scope="row"
                    className="py-4 pr-2 align-top font-mono text-data font-normal tabular-figures"
                  >
                    <a
                      href={`#${footnoteRefId(id)}`}
                      aria-label={`Back to reference ${n} in the page`}
                      className="text-sienna-press no-underline hover:underline"
                    >
                      {n}
                    </a>
                  </th>
                  <td className="py-4 pr-4 align-top">
                    <p className="font-mono text-mono-label uppercase text-ink tabular-figures">
                      {source.claim}
                    </p>
                    <p className="mt-2 max-w-prose font-display text-footnote opsz-8 text-ink-muted">
                      {source.note}
                    </p>
                    <p className="mt-1 font-mono text-caption uppercase text-ink-muted tabular-figures">
                      {source.origin} · owner {source.owner}
                      <span className="sm:hidden">
                        {" "}
                        · verified {source.lastVerified}
                      </span>
                    </p>
                    {source.href && (
                      /* The one place on the page that leaves it. The glyph
                         trails the URL and stays inline — `inline-flex` here
                         would stop a long href from wrapping inside its
                         table cell. */
                      <a
                        href={source.href}
                        rel="noopener"
                        className="mt-1 inline-block font-mono text-caption uppercase text-marine underline decoration-rule-strong decoration-1 underline-offset-4 tabular-figures hover:decoration-sienna"
                      >
                        {source.href}
                        <Icon
                          as={ExternalLink}
                          size="sm"
                          className="ml-1.5 align-middle"
                        />
                      </a>
                    )}
                  </td>
                  <td className="hidden py-4 align-top font-mono text-data text-ink tabular-figures sm:table-cell">
                    {source.lastVerified}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <Rule weight="chapter" className="my-10" />

        {/* ── Privacy & legal ───────────────────────────────────────────── */}
        <div className="grid gap-grid-gap md:grid-cols-2">
          <section aria-labelledby="colophon-privacy">
            <h3 id="colophon-privacy" className={blockLabel}>
              What we do with your details
            </h3>
            <p className="mt-4 max-w-prose font-ui text-body-sm text-ink-muted">
              We ask for your name, your mobile number and your study
              preferences for one purpose: so that a counsellor can call you
              about studying abroad. That is the only thing the enquiry form is
              for.
            </p>
            <p className="mt-3 max-w-prose font-ui text-body-sm text-ink-muted">
              Marketing messages need a separate consent, given by ticking a box
              that is never ticked for you, and you can withdraw it at any time
              without losing anything else. We do not send them between 9 PM and
              9 AM. Enquiry records are kept while your application is live and
              for one admissions cycle after it closes, and are then deleted. To
              see, correct or delete what we hold, write to the Grievance
              Officer at the registered office above, or call{" "}
              <a
                href={PHONE_TOLL_FREE_HREF}
                className="font-mono text-marine no-underline tabular-figures hover:underline"
              >
                {PHONE_TOLL_FREE}
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="colophon-legal">
            <h3 id="colophon-legal" className={blockLabel}>
              What this page does not promise
            </h3>
            <p className="mt-4 max-w-prose font-ui text-body-sm text-ink-muted">
              No visa and no admission is guaranteed on this page, in any
              conversation with a counsellor, or in any document we prepare.
              Those decisions belong to governments and to universities.
            </p>
            <p className="mt-3 max-w-prose font-ui text-body-sm text-ink-muted">
              Tuition, living costs, application deadlines, post-study work
              rights and immigration rules are set by universities and by
              governments and change without notice. Every figure on this page
              is printed with the date it was last checked; where a figure has
              gone stale, the table above is where you will see it first.
            </p>
          </section>
        </div>

        <Rule weight="chapter" className="mt-10" />

        {/* ── The closing line ──────────────────────────────────────────── */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-ui text-body-sm text-ink-muted">
            © 2026 Global Opportunities Private Limited · New Delhi
          </p>
          <p className="font-mono text-caption uppercase text-ink-muted tabular-figures">
            Est. 2001, Amritsar
          </p>
        </div>
      </Container>
    </footer>
  );
}
