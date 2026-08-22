import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  NATIONAL_LINE,
  TOLL_FREE_LINE,
} from "@/app/(home)/_components/branch-atlas/branches";

/* ===========================================================================
   FOOTER — the sitemap, and nothing that audits the page
   ---------------------------------------------------------------------------
   THE AUDIT SURFACE WAS REMOVED (2026-08-21, client instruction). This
   footer used to end with three blocks that are now gone: the "Offices · 15
   cities" line, the "Sources and last verified" panel, and the "nothing here
   is a quotation" disclaimer.

   THE FOOTNOTE MARKERS WENT WITH IT, IN THE SAME COMMIT, AND THAT WAS NOT
   OPTIONAL. Eight <Footnote> superscripts on this route rendered real
   <a href="#fn-*"> links INTO that panel: four in <Proof>, one in the
   <Offices> heading, one after the destinations link, and two in the CTA band
   above. Delete the list and every one of them becomes an in-page link to an
   anchor that does not exist. If the panel is ever restored, the markers come
   back with it, and `primary` may be set on only ONE marker per source or the
   page ships duplicate DOM ids.

   The registry itself is untouched. `components/ui/footnote.tsx` is shared
   with `/`, which still renders its colophon and still resolves all six
   sources. Nothing here removed anything from it.

   Server Component. Zero JavaScript.
   ======================================================================== */

/* ===========================================================================
   THE LINK COLUMNS — ported 2026-08-21 from the sibling repo's footer
   ---------------------------------------------------------------------------
   Copied verbatim, hrefs included, BY EXPLICIT DECISION. None of these 38
   routes exists in this project — it ships `/`, `/destinations` and `/homev2`
   and nothing else — so every one of them 404s today. That is deliberate:
   /homev2 is noindex, so nothing leaks to search, and keeping the sibling's
   paths byte-for-byte means the columns light up the moment those routes are
   built, with no edit here.

   THE PRECEDENT THIS OVERRIDES, so nobody re-litigates it: the reviews
   section had two buttons DELETED for exactly this reason (see the note in
   reviews/index.tsx). The difference is that those two were that section's
   only call to action, and a dead CTA is worse than none — where a footer
   sitemap reads as an index of a site still being built.

   WHAT WAS TRANSLATED RATHER THAN COPIED: the source draws a GO-Red dash
   before every column heading and a GO-Red chevron before all thirty-eight
   links. Both are gone. Red is the primary button fill and nothing else
   (Palette, CLAUDE.md), and seventy-six pieces of drawn furniture is the
   exact density this page spent two rounds removing.
   ======================================================================== */

const EXPLORE_COUNTRIES = [
  { label: "Study in Australia", href: "/study-in-australia" },
  { label: "Study in the USA", href: "/study-in-usa" },
  { label: "Study in Canada", href: "/study-in-canada" },
  { label: "Study in the UK", href: "/study-in-uk" },
  { label: "Study in Europe", href: "/study-in-europe" },
  { label: "Study in New Zealand", href: "/study-in-new-zealand" },
  { label: "Study in Ireland", href: "/study-in-ireland" },
  { label: "Study in Germany", href: "/study-in-germany" },
  { label: "Study in Spain", href: "/study-in-spain" },
  { label: "Study in Malaysia", href: "/study-in-malaysia" },
  { label: "Study in France", href: "/study-in-france" },
  { label: "Study in Italy", href: "/study-in-italy" },
  { label: "Study in Singapore", href: "/study-in-singapore" },
  { label: "Study in Dubai", href: "/study-in-dubai" },
  { label: "Study in Switzerland", href: "/study-in-switzerland" },
] as const;

const FINANCIAL_ASSISTANCE = [
  { label: "Scholarships in Australia", href: "/scholarships-in-australia" },
  { label: "Scholarships in USA", href: "/scholarships-in-usa" },
  { label: "Scholarships in Canada", href: "/scholarships-in-canada" },
  { label: "Scholarships in UK", href: "/scholarships-in-uk" },
  { label: "Scholarships in New Zealand", href: "/scholarships-in-new-zealand" },
  { label: "Scholarships in Ireland", href: "/scholarships-in-ireland" },
  { label: "Scholarships in Germany", href: "/scholarships-in-germany" },
  { label: "Scholarships in Singapore", href: "/scholarships-in-singapore" },
] as const;

const EXAMS = [
  { label: "GMAT", href: "/test-preparation/gmat" },
  { label: "GRE", href: "/test-preparation/gre" },
  { label: "IELTS", href: "/test-preparation/ielts" },
  { label: "PTE", href: "/test-preparation/pte" },
  { label: "SAT", href: "/test-preparation/sat" },
  { label: "TOEFL", href: "/test-preparation/toefl" },
] as const;

const OTHER_LINKS = [
  { label: "Media updates", href: "/media-updates" },
  { label: "Blogs", href: "/blogs" },
  { label: "Careers", href: "/career" },
  { label: "Intakes", href: "/information/intakes" },
  { label: "Image gallery", href: "/information/gallery" },
  { label: "Video gallery", href: "/information/video" },
  { label: "Contact us", href: "/contact-us" },
  { label: "Sitemap", href: "/sitemap" },
  { label: "Privacy policy", href: "/privacy-policy" },
] as const;

/* Brand marks, copied from the sibling repo. These are NOT Lucide glyphs, so
   the "every icon goes through components/ui/icon.tsx" rule does not reach
   them — that rule exists to pin Lucide's stroke weights against the page's
   hairlines. Lucide also no longer ships an X mark, which is the other
   reason these stay inline. */
const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/globalopportunities",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5Z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/global_opp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M17.2 4h2.7l-6 6.8L21 20h-5.5l-4.3-5.7L6.3 20H3.6l6.4-7.3L3 4h5.7l3.9 5.2L17.2 4Zm-1 14.4h1.5L7.9 5.5H6.3l9.9 12.9Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/global-opportunities",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M6.9 8.6H4V20h2.9V8.6ZM5.4 7.4a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM20 13.4c0-3.2-1.7-4.9-4-4.9-1.8 0-2.7 1-3.1 1.7V8.6H10V20h2.9v-6c0-1.6.8-2.5 2-2.5s1.9.9 1.9 2.5v6H20v-6.6Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@globalopportunities",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26.5 26.5 0 0 0 2 12c0 1.6.1 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/globalopportunities",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/globalopportunities",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M12 3a9 9 0 0 0-3.5 17.3c-.1-.8-.2-2 0-2.8l1.2-5s-.3-.6-.3-1.5c0-1.4.9-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.5-1.8-4.3-4.4-4.3a4.6 4.6 0 0 0-4.8 4.6c0 .9.3 1.9.8 2.4a.3.3 0 0 1 .1.3l-.3 1.2c0 .2-.2.2-.4.1-1.2-.6-2-2.4-2-3.9 0-3.2 2.3-6.2 6.8-6.2 3.5 0 6.3 2.5 6.3 5.9 0 3.5-2.2 6.4-5.3 6.4-1 0-2-.5-2.4-1.2l-.6 2.5c-.2.9-.9 2-1.3 2.7A9 9 0 1 0 12 3Z" />
      </svg>
    ),
  },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-caption text-muted-foreground">{title}</h3>
      <ul className="flex list-none flex-col gap-2 p-0">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-body-sm text-muted-foreground no-underline transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-background py-section-y">
      <Container className="flex flex-col gap-10">
        {/* --- CLOSING CTA BAND -------------------------------------------
            Ported 2026-08-21 from the sibling repo's footer (its own comment
            calls it the "CTA band"), TRANSLATED rather than pasted. What the
            source had and this does not: a primary->secondary gradient fill,
            two blurred colour blooms, `shadow-lg shadow-accent/35`,
            `rounded-2xl`, and a headline whose second half was gradient-
            clipped text. All five are things this page retired on 2026-08-21
            — see Palette and "Radius and elevation" in CLAUDE.md.

            What survives is the SHAPE, and it is already house: the
            test-preparations banner is the same dark plate, dot overlay,
            copy-left / pill-right band. This one is the page's last word, so
            it runs the serif `title` step rather than that band's body text.

            The two figures here (2001 -> 25 years, 700+ partners) are ones
            this page publishes elsewhere; they carried footnote markers until
            the sources panel was removed on 2026-08-21, and the markers went
            with it. If a marker is ever put back, it goes in the <p> and NOT
            inside the <Link>: a Footnote renders its own <a>, and an anchor
            inside an anchor is split by the parser, which is the invalid
            nesting that threw React #418 and killed the hero intro. */}
        {/* 36px, not the house `rounded-2` (12px): client asked for a softer
            corner on 2026-08-22. It applies to the two full-column dark
            plates only (this and the test-preparations banner), where 12px
            reads as a square edge; every other card keeps the house scale. */}
        <div
          data-flight-end
          className="relative z-2 overflow-hidden rounded-[36px] bg-endpaper px-6 py-8 text-plate-white lg:px-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] bg-size-[22px_22px] opacity-40"
          />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-prose">
              <p className="font-display text-title text-plate-white">
                Ready to start your study abroad journey?
              </p>
              <p className="mt-2 text-body text-plate-grey">
                Free guidance from India&apos;s study abroad specialists: 25
                years of it, and 700+ university partners.
              </p>
            </div>
            <Link
              href="#enquiry"
              className="group flex shrink-0 items-center gap-2 rounded-full bg-sienna-press px-7 py-3.5 text-body font-semibold text-plate-white transition-colors hover:bg-sienna-deep"
            >
              Book a free guidance session
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              >
                <path d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* --- THE SITEMAP COLUMNS ----------------------------------------
            The sibling repo's four-column footer, on the white substrate
            rather than its navy — that was the call when this was ported.
            Column one keeps everything the /homev2 footer already had
            (brand line, the mono contact block) and gains the social row and
            legal name from the source. */}
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.9fr]">
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-3">
              <h2 className="text-h4 text-ink">Global Opportunities</h2>
              <p className="max-w-prose text-body-sm text-muted-foreground">
                Global Opportunities Private Limited. Overseas education
                consultants since 2001. Registered office in New Delhi.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-caption text-muted-foreground">Contact</h3>
              {/* Numbers stay visible TEXT and stay mono — they are verified
                  fact, and the mono law carries that, not a different colour. */}
              <ul className="flex list-none flex-col gap-2 p-0">
                <li className="font-mono text-body-sm tabular-figures">
                  <a href={TOLL_FREE_LINE.href} className="text-ink no-underline hover:underline">
                    {TOLL_FREE_LINE.display}
                  </a>
                  <span className="text-muted-foreground"> · toll-free</span>
                </li>
                <li className="font-mono text-body-sm tabular-figures">
                  <a href={NATIONAL_LINE.href} className="text-ink no-underline hover:underline">
                    {NATIONAL_LINE.display}
                  </a>
                </li>
                <li className="font-mono text-body-sm text-muted-foreground tabular-figures">
                  9 AM – 9 PM IST. We do not call between 9 PM and 9 AM.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-caption text-muted-foreground">
                Let&apos;s get connected
              </h3>
              {/* target=_blank needs rel=noopener: without it the opened tab
                  gets a window.opener handle back into this one. */}
              <ul className="flex list-none flex-wrap gap-2 p-0">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-9 place-items-center rounded-full bg-secondary text-ink-muted transition-colors hover:bg-marine hover:text-plate-white"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-footnote text-muted-foreground">
              <span className="text-ink">Legal name:</span> Global Opportunities
              Private Limited
            </p>
          </div>

          <LinkColumn title="Explore countries" links={EXPLORE_COUNTRIES} />

          <div className="flex flex-col gap-8">
            <LinkColumn title="Financial assistance" links={FINANCIAL_ASSISTANCE} />
            <LinkColumn title="Exams" links={EXAMS} />
          </div>

          <LinkColumn title="Other links" links={OTHER_LINKS} />
        </div>

      </Container>
    </footer>
  );
}
