import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Geist, Poppins } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

/* ---------------------------------------------------------------------------
   Typefaces — CANON (retheme 2026-08-04: the editorial serif is retired).
   Geist        = THE text face. Headlines, decks, body, UI chrome, forms,
                  labels, buttons — one variable grotesque, no serif voice.
   Bebas Neue   = display numerals, photo/plate overlays and band eyebrows
                  ONLY. Never body, never UI, never a full sentence.
   Poppins      = the figures-and-labels face (the old "mono" role: stats,
                  captions, station labels, footnotes). Not a monospace —
                  tabular-nums still requested where alignment matters.
   Geist + Bebas preload (both render above the fold); Poppins does not.
   ------------------------------------------------------------------------ */
const display = Geist({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-geist",
  preload: true,
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bebas-neue",
  preload: true,
});

const mono = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-poppins",
  preload: false,
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
  themeColor: "#FBF8F2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* suppressHydrationWarning on <html>: /homev2's first-paint gate sets
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
      className={`${display.variable} ${bebas.variable} ${mono.variable}`}
    >
      <body suppressHydrationWarning className="min-h-dvh">
        {/* JS-disabled backstop: .reveal must never hide content. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {/* One static paper-grain tile, page-level. Never animated. */}
        <div className="paper-grain" aria-hidden="true" />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
