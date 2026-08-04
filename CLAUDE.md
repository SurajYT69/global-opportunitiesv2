@AGENTS.md

# Global Opportunities — landing page

A single-page marketing site for Global Opportunities Private Limited, an Indian
study-abroad consultancy founded in 2001 (Delhi HQ, 18 branches). The audience is
Indian students **and their parents**; the conversion is booking a free guidance
session. Plus a placeholder `/destinations` route.

This is an editorial, cartographic design — not a SaaS template. Most of the rules
below exist because a generic-looking alternative was considered and rejected on
purpose. When something here looks over-specified, that is why.

---

## Stack

| | |
|---|---|
| Framework | Next.js **16.2.12**, App Router, Turbopack |
| React | 19.2.4 |
| Styling | Tailwind **v4** (`@tailwindcss/postcss`), tokens in `app/globals.css` |
| Motion | framer-motion 12, gsap 3.15 + @gsap/react, animejs 4.5, lenis 1.3 |
| Icons | lucide-react 1.28 — **only** via `components/ui/icon.tsx` |
| Language | TypeScript 5, strict |

**Read `node_modules/next/dist/docs/` before using any Next API.** Version 16 has
breaking changes against most training data — `params`/`searchParams` are Promises,
and file conventions have moved. Do not write Next code from memory.

---

## Commands and working rules

```bash
npm run dev      # dev server
npm run build    # production build
npm start        # production server on :3000
npx tsc --noEmit # typecheck
npm run lint     # eslint
```

**Do not run build, lint, typecheck, or start/restart the server unless the user
explicitly asks.** They work in batches — many edits land across several turns
before anything is worth verifying, and rebuilding after each one wastes minutes
and takes their running site down mid-review. Make the edits, report what changed,
say verification is pending.

**The stale-server trap.** `next start` holds prerendered pages in memory. After a
code change you must rebuild **and** kill/restart the node process on :3000, or the
browser keeps serving the old page and your change looks like it silently failed.
Verify with `curl -s localhost:3000 | grep <new string>`, never by eye.

```powershell
$c = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($c) { Stop-Process -Id $c.OwningProcess -Force }
```

**Known pre-existing lint errors** (not yours, do not "fix" as drive-by work):
`components/providers/smooth-scroll.tsx:32` and `app/(home)/_components/mobile-bar.tsx:61`
both trip `react-hooks/set-state-in-effect`. `components/ui/button.tsx` has nine
`no-unused-vars` warnings from deliberate prop-omission destructuring.

---

## Layout

```
app/
  (home)/
    page.tsx            home — composes every section in reading order
    _components/        one file per chapter section; a folder beside it holds
                        that section's client parts and data
  layout.tsx            fonts, metadata, providers
  destinations/page.tsx placeholder index of the 11 non-anchor destinations
components/
  ui/                   primitives: Container, Button, Rule, Plate, Icon,
                        SectionHeading, Footnote
  providers/            AppProviders, smooth-scroll (lenis)
lib/                    cn(), motion tokens (DUR, EASE, STAGGER, MQ, VIEWPORT_ONCE)
design/landing-page-blueprint/   00–06, the authored design canon
```

Sections are **Server Components by default**. Only the interactive leaf is a
Client Component, and it lives in the section's own folder (e.g.
`gazetteer.tsx` is server, `gazetteer/rows.tsx` is `"use client"`).

---

## Design canon

The full specification is `design/landing-page-blueprint/` files 00–06.
`04-design-system.md` is the implementation contract. Read the relevant section
before changing its look — these documents record decisions with reasons, and the
reasons usually still apply.

**Typography (retheme 2026-08-04 — the editorial serif was retired).**
Geist for all text. Bebas Neue for display numerals, photo overlays and band
eyebrows only — never buttons, sentences, or anything red. Poppins carries the
"mono" role (figures, captions, station labels, footnotes); request
`tabular-figures` wherever numbers must align.

**The mono law.** Verified fact is set in the mono face: partner counts, intake
windows, tuition bands, coordinates, UTC offsets, durations. Nouns and prose are
not. Letterspaced uppercase is legal for labels, captions and running heads —
never for headlines or CTAs.

**Palette.** GO Navy `#0E2A47`, GO Blue `#0B77B7`, GO Red `#B70000` (primary CTA
only), GO Yellow `#FFC800`. The wordmark's indigo/blue are logo-only and banned in
UI. Warm cream paper and iron-gall ink are the editorial substrate, kept by
explicit decision. `app/globals.css` is authoritative; `04-design-system.md` still
shows superseded Atlas values.

**Green means verified.** `--verdigris` carries that one semantic. WhatsApp is
**never** rendered in WhatsApp brand green — the meaning must not leak.

**Banned imagery, permanently.** Flags, national landmarks, globes, aircraft,
passports, suitcases, dotted flight paths, graduation caps, handshakes, isometric
illustration, 3D clay. This survived the icon adoption below — it was always about
the category cliché, not the library.

**Drafted marks** — crosshairs, latitude ticks, bearing marks, registration
corners, contour rules — are structure, not decoration. Icons did not retire them.
The branch-atlas SVG keeps its crosshairs and gains no Lucide glyph inside the
`<svg>`.

---

## Icons

Adopted **2026-08-04** by explicit client decision, overriding the blueprint's
former "no icon library" rule. The original position is preserved in the docs
under "The superseded position, recorded".

**Every glyph goes through `components/ui/icon.tsx`.** Import the glyph from
`lucide-react` as a value, pass it to `<Icon as={Phone} />`. Never render a Lucide
component directly — the primitive pins the stroke weights that keep a glyph from
out-weighing the 1px hairlines the rest of the page is built from (Lucide's 2px
default is explicitly rejected).

- Sizes `sm` 16 / `md` 20 / `lg` 24. Use `sm` inline with anything ≤15px type.
- Icons inherit `currentColor`. Do not give an icon a colour of its own.
- Beside visible text → decorative, no `label`, auto `aria-hidden`.
- Sole content of a control → **must** pass `label`.
- No glyph at display sizes; that is not a case this system has.

**Rules that survive.** The phone number `1800 111 119` stays visible text — an
icon may sit beside it, never replace it. The mobile bar keeps its "Call" /
"WhatsApp" / "Book" text labels; icons are additive, and if space runs out the
icon gives way, not the label. Footnote markers stay superscript mono numerals.

---

## Content and compliance

These are hard constraints from an ads-cleanup review, not preferences.

- **"free counselling" is banned site-wide.** The canonical CTA is *"Book a free
  guidance session"*, qualified with *"No cost, no obligation. 30–45 minutes with
  an admissions counsellor."*
- **Never print "100,000+ students"** — unverified. The auditable figure is 40,000+.
- Kill-list: *Zero fee*, *visa success rate*, *Certified Counsellors*, *guaranteed*
  (except in a negation, or the proper noun GIC).
- Every claim carries a footnote resolving to the sources table in the colophon,
  with an owner and a last-verified date. Where GO publishes no figure, render an
  em-dash with `sr-only` "not yet published" — **never** `0`, `TBD`, or a shimmer.

---

## Motion

Library ownership is assigned per section and is not a free choice: GSAP owns the
hero boot sequence, Anime.js owns the branch-atlas SVG stroke draw, Framer owns
disclosure and layout transitions, Lenis owns smooth scroll. Tokens live in
`lib/motion.ts` — use them rather than raw durations.

Budget: **14 ScrollTrigger instances page-wide**. The gazetteer is the most
interaction-heavy section and deliberately spends none of them.

Only `transform` and `opacity` animate. Never animate `height` — let Framer's
layout projection carry size changes. `<MotionConfig reducedMotion="user">` at the
root means every reveal must land on its final visible state when motion is off;
a `.reveal` class must never be the only thing making content visible (there is a
`<noscript>` backstop in `layout.tsx`).

**Animation selectors are `data-*` attributes.** `data-atlas-outline`,
`data-atlas-mark`, `data-atlas-key`, `data-figure`, `data-hero-*`, `data-odometer`.
Renaming or removing one breaks the animation **silently**. Do not touch them while
editing nearby markup.

---

## The India map

`app/(home)/_components/branch-atlas/india-outline.ts` holds a single closed path —
mainland, then the Andaman & Nicobar and Lakshadweep groups as further subpaths of
the same `d` string, because Anime.js inks the whole plate with one
`createDrawable` call.

The boundary is the **Survey of India** depiction (full extent of J&K, Ladakh and
Arunachal Pradesh), fitted to the plate's projection and simplified for a hairline.

Both the outline and every office crosshair in `branches.ts` are placed by:

```
x = (lon - 67)  * 19.354      lon 67E..98E  ->  0..600
y = (37.5 - lat) * 23.607     lat 37.5N..7N ->  0..720
```

The two scales are **not** in true ratio (0.82 against ~0.93 correct at this
latitude), so the plate reads about 12% narrower than the ground. That is the
plate's existing proportion and the crosshairs are placed to match. Changing one
without the other slides every office off its coast.

---

## Known issues

1. **Lucide drags a client runtime across the server boundary.** `lucide-react@1`
   ships `"use client"` on its base `Icon` module, so Server Components rendering
   an icon now hydrate. `colophon.tsx` and `still-page.tsx` previously shipped zero
   JS. Candidate fix: each icon module also exports raw path data as `__iconNode`,
   so `icon.tsx` could render server-safe inline SVG. Not applied.
2. **`design/…/02-sections-part1.md` §6.5–§6.10 describes a section that no longer
   exists** — a four-column `<table>` ledger on cream. What ships is a six-card
   bento on dark navy. The new icon decisions were written into that stale
   vocabulary, so the `<th scope="row">` accessibility claim there is false.
3. **Service ordinals disagree** between the docs (§6.4/§6.6) and
   `what-we-do/cards.ts`. The code is authoritative.
4. **`/destinations` is a placeholder** — names, cities and time zones only, and
   `noindex`. The full interactive index component already exists at
   `app/(home)/_components/gazetteer/rows.tsx`, ready to move there.

## Intentionally dead files

`app/(home)/_components/hero/departure-card.tsx` and `hero/hero-plate.tsx` are
unreferenced and kept on purpose. Do not delete them as dead-code cleanup.
