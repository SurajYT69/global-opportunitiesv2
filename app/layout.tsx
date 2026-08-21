import type { Metadata, Viewport } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

/* ---------------------------------------------------------------------------
   Typefaces — TWO VOICES (2026-08-21, client-approved).

   This REVERSES the single-family direction of 2026-08-20. That direction is
   the direct cause of the "there is no typography here" verdict: Geist 600 for
   the headline, Geist 400 for the body and Geist 500 for the figures is one
   voice at three sizes, and what was left carrying hierarchy — letterspaced
   capitals and hairline rules — is furniture, not typography.

   Measured from live computed styles rather than style guides: Crimson
   Education (IN) runs three families, Leverage Edu runs two and sets its
   headlines in a SERIF while selling the same service to the same parents.

   Source Serif 4 carries `display` and `title`. Sober rather than
   fashionable, variable, and it reads as an institution that has been doing
   this since 2001 — which is the actual claim. Geist carries everything a
   person operates: body, UI, forms, figures, labels.

   `--font-mono` and `--font-bebas` still resolve to Geist in globals.css, so
   all ~180 `font-mono` / `font-bebas` call sites keep compiling untouched.

   THE MONO LAW SURVIVES, AND STILL NOT AS A FAMILY. Verified fact is carried
   by tabular/lining/slashed-zero numerals (the `.font-mono` rule and the
   `tabular-figures` utility) and by weight — never by a third face.
   ------------------------------------------------------------------------ */
const geist = Geist({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-geist",
  preload: true,
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal"],
  display: "swap",
  variable: "--font-source-serif",
  preload: true,
});

export const metadata: Metadata = {
  title: "Study Abroad Consultants in India | Global Opportunities",
  description:
    "Book a free guidance session with a named GO counsellor — 700+ partner universities, 15 countries, 18 offices across India. Real costs in rupees, real intake deadlines, no visa guarantees. Since 2001.",
  applicationName: "Global Opportunities",
  authors: [{ name: "Global Opportunities Private Limited" }],
  creator: "Global Opportunities Private Limited",
  publisher: "Global Opportunities Private Limited",
  keywords: [
    "study abroad consultants",
    "overseas education consultants India",
    "free counselling",
    "student visa guidance",
    "partner universities",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Global Opportunities",
    title: "Study Abroad Consultants in India | Free Counselling",
    description:
      "Free counselling with a named GO counsellor — 700+ partner universities, 15 countries, 18 offices across India. Real costs in rupees, real intake deadlines, no visa guarantees. Since 2001.",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* suppressHydrationWarning on <html>: the home page's first-paint gate sets
     `data-hero-intro` on this element from an inline script during HTML parse,
     so the attribute is in the DOM before React hydrates and can never be in
     the server payload. This is the documented pattern for it
     (next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md,
     "Themes"). It is not cosmetic: without it React treats the mismatch as a
     hydration error and recovers by client-rendering from the nearest
     boundary, which discards inline-script corrections made to anything else
     inside that boundary. Scoped to attributes on THIS element only — it does
     not cascade to children. */
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${geist.variable} ${serif.variable}`}
    >
      <body suppressHydrationWarning className="min-h-dvh">
        {/* JS-disabled backstop: .reveal must never hide content. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
