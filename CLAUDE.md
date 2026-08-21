@AGENTS.md

# Global Opportunities — landing page

A single-page marketing site for Global Opportunities Private Limited, an Indian
study-abroad consultancy founded in 2001 (Delhi HQ, 18 branches). The audience is
Indian students **and their parents**; the conversion is booking a free guidance
session. Plus a placeholder `/destinations` route.

## THE GOAL: CLEAN, MODERN, MINIMAL (2026-08-21, client direction)

**Read this before any visual change. It outranks every aesthetic rule below.**

The site was built as a dense editorial/cartographic artefact. The client's
repeated verdict on that result was "too cluttered". The standing direction is
now **clean, modern, minimal** — and the older rules in this file survive only
where they do not fight it. When an editorial rule below and this goal
disagree, this goal wins; edit the rule and note the date.

This is still not a SaaS template, and the substance is not up for negotiation:
the compliance rules, the footnote/audit surface and the palette all stand. What
changed is the *density*. Less furniture, fewer type sizes, fewer drawn lines,
more whitespace, sentence case.

### The clutter, measured (2026-08-20, on the prerendered `/`)

| Metric | Was | Target |
|---|---|---|
| Sections on the page | 13 | 8 — **done** |
| Distinct type sizes in use | 12 | 6 |
| Letterspaced-uppercase elements | 366 | ~40 |
| Borders / hairlines drawn | 262 | ~80 |
| Superscript footnotes in body copy | 27 | keep (audit surface) |

Re-measure rather than guess — the script that produced these counts is a
regex sweep over `.next/server/app/index.html` for `text-*` utilities,
`uppercase`, and `border-*`/`hairline-*`.

### The reference, and why

Benchmarked against **Crimson Education's India page** (a direct competitor)
and popular Dribbble web shots. What they do that this page did not: sentence
case everywhere (not tracked caps), cards separated by **background tint rather
than a drawn border**, ~~three type sizes per screen~~, one accent colour, a
single slim sticky CTA instead of a four-layer masthead, and a dark scrim under
any headline sitting on a photograph.

> **"Three type sizes per screen" was wrong, and it was wrong by eye.** This
> read was taken by looking at the page. On 2026-08-21 the same page was
> measured through the CDP, and **Crimson runs fourteen distinct sizes** — see
> the table in the next section. Everything else in this paragraph survived
> measurement; that one claim sent the leverage list chasing a type-scale cut
> for a day. **Measure the benchmark, do not eyeball it.**

### THE SYSTEM WAS REBUILT (2026-08-21) — read this before the history below

The client's verdict was *"there is no typography or anything in this, nothing
is aligned, or any brand system"*. That was correct, and the causes were
specific. Both of the directions that caused it were reversed with explicit
sign-off, and the replacement is in `app/globals.css`.

**Researched, not assumed.** Live computed styles were pulled off the two
sites this page competes with, rather than trusting published style guides:

| Measured at 1912px | Crimson Education (IN) | Leverage Edu | `/homev2` before |
|---|---|---|---|
| Type families | Bricolage Grotesque + Lato + ITC Garamond | Proxima Nova + **Source Serif Pro** | Geist only |
| Distinct sizes in use | 14 | 10 | 12+ |
| Section headline | 50–55px | 64px | 40px |
| Letter-spacing on headings | `normal` | `normal` | tracked-caps eyebrow above every one |
| Content column | 1440px | 1517px | 1072px effective |
| Accent discipline | one red, 119 uses | one green, 9 uses | blue + red + yellow + verdigris + clay + ochre |

**The finding that mattered contradicted our own brief: neither benchmark runs
a short type ramp.** Crimson uses fourteen sizes and still reads clean. Cutting
sizes was never the fix — that is why "type scale 12 → 6" sat at the top of the
leverage list for a day and would not have worked. What both benchmarks do that
this page did not is run **two families with real weight contrast** and set
**letter-spacing to `normal` everywhere**. Hierarchy there comes from voice.

**What is now in force.**

1. **TWO VOICES.** Source Serif 4 carries `display` and `title`; Geist carries
   everything a person operates. This REVERSES the single-family direction of
   2026-08-20 — see Typography below.
2. **SEVEN TYPE STEPS**, replacing fifteen. `display` `title` `heading` `lede`
   `body` `small` `label`. The retired fifteen survive as aliases pointing at
   the seven, which is what let both routes re-skin with no markup edit.
3. **WHITE SUBSTRATE.** The warm cream paper and iron-gall ink are retired.
   This REVERSES the "kept by explicit decision" note under Palette below.
4. **ONE UPPERCASE ROLE.** `label`, and nothing else.
5. **ONE COLUMN, TWO RHYTHMS.** `max-w-content` (1280px, 1200 effective) with
   `px-gutter`; `py-section-y` or `py-section-y-tight`. Nothing else.
6. **CARDS ARE TINT, NOT BORDER.** Radius is 6 / 12 / pill. No `shadow-*`
   utilities on the page plane — `--shadow-drawer` and `--shadow-masthead` are
   the only survivors.

Measured after, on `/homev2`: raw Tailwind type sizes **17 → 0**, hard-coded
`tracking-[…]` **6 → 0**, `uppercase` call sites **10 → 5** (all of them the
`label` role), section rhythms **6 → 2**, content columns **2 → 1**.

### Done before that

- **13 sections → 8.** Page went 645KB → 434KB of prerendered HTML.
- **Three fonts → one.** Geist only (see Typography below).
- **The chapter device is retired.** Sections used to open with THREE lines
  before saying anything (`02 · EXPLORE`, then an eyebrow, then the headline).
  `SectionHeading` now renders one quiet eyebrow. It still ACCEPTS `chapter`
  and `chapterName` and ignores them, so no section file had to change.
- **The wordmark is vector.** Was a 149×49 bitmap drawn at 134px — visibly soft
  next to the crisp UI text beside it. `public/logo.svg` and
  `public/logo-light.svg` are generated from `files/GO-logo-brand-palette.svg`
  and share one viewBox, so the masthead cross-fade registers exactly.
- **`/homev2` IS NOW A SEPARATE, REBUILT PAGE (2026-08-21).** It used to be the
  same tree as `/` under a `data-v3` flag. It is a page of its own, built on
  shadcn/ui. Measured against `/` on the day it forked: 435KB → 204KB, 15
  sections → 9, 14 type sizes → 8, 366 letterspaced-caps → 99, 436 borders →
  150. The `[data-v3]` CSS block and the `v3` prop are deleted — nothing
  rendered them.

  **It has grown since, and those numbers are a snapshot, not a target.** The
  running order is now hero, proof, partners, destinations, ways-we-assist,
  costs, offices, test-preparations, success-stories, reviews, faq, enquiry,
  footer — twelve sections after the hero. Four were ported from the sibling
  repo and one (success-stories) is new. Re-measure before quoting any of the
  figures above; do not treat "9 sections" as a cap the page has broken.

  **SECOND ROUND, same day (2026-08-21).** All of it is scoped to `/homev2`;
  `/` is untouched except where noted.

  - **Vertical rhythm cut, from one place.** `py-section-y` compiles to
    `padding-block: var(--spacing-section-y)`, so the two vars are redefined
    on the shell root in `home-shell.tsx` and every section below re-paces
    with no section file edited. 64->112px became 40->64px, and the tight
    step 40->64px became 28->40px. Internal gaps came down one step across
    twelve sections. Page height 10,836 -> 9,780px at 1912px. **Do not push
    the cut into `globals.css`**: those vars are shared with `/`, and the
    whole point of the scoped override is that `/` keeps its own rhythm.
  - **The footer grew a CTA band and a sitemap**, both ported from the
    sibling repo at `D:\Global\global-oppertunities-nextjs`. The band is the
    dark `--endpaper` plate above the columns; the sitemap is its four link
    columns, its six social marks and its legal-name line. The 38 internal
    hrefs are VERBATIM and every one of them 404s here, by explicit decision:
    this repo ships three routes. Do not repoint them at `/destinations`.
  - **The FAQ is no longer a Radix accordion.** It is a client-selected
    component from 21st.dev, re-skinned, at
    `app/homev2/_components/faq/faq-tabs.tsx`. Two audience tabs rather than
    the seven `topic` values, and the answers were cut from two-to-four
    paragraphs to one. `topic` is still on the interface because `/` reads it.
  - **`components/shadcn/native-select.tsx` had `w-fit` on its wrapper.**
    `className` lands on the `<select>`, which is already `w-full`, so there
    was no class a call site could pass to widen it and the enquiry form's
    three selects sat at placeholder width beside full-width inputs. Now
    `w-full`. Only `/homev2` uses that component.
  - **The footer's audit surface was removed** on client instruction: the
    branch line, the sources panel and the disclaimer. See the note under
    "The footnote machinery" in Content and compliance for what had to go
    with it and why.
  - **Three FAQ layouts were tried and two were rejected by the client**:
    two-column accordion (ragged rules, and an empty cell beside any open
    answer) and heading-left/accordion-right. Read the note at the top of
    `faq-tabs.tsx` before proposing a fourth.

### Next, in leverage order

1. ~~**Type scale 12 → 6**~~ — **DONE 2026-08-21**, as 15 → 7 with an alias
   layer. See the block above. The premise was wrong (benchmarks run long
   ramps); the fix that worked was two families plus one uppercase role.
2. **Sweep the alias layer out of the markup.** `text-d2`, `text-caption`,
   `text-body-sm` etc. all still resolve — they alias to the seven — so this is
   cosmetic churn with zero visual effect and can wait indefinitely. Do it per
   file when you are already in one, never as its own commit. Delete a name
   from the alias block in `globals.css` only once `grep -rn "text-<name>"` is
   empty, and remove it from `lib/cn.ts` in the same commit.
3. **Promote `/homev2`** if the client approves it: point `app/(home)/page.tsx`
   at `app/homev2/_components/home-shell`, drop the `noindex`, and move the
   Organization JSON-LD across. Do NOT copy files between the two trees.
4. **`app/layout.tsx` still ships the banned phrase "free counselling"** in
   `keywords`, `og:title` and `og:description` — ten occurrences on `/`. See
   Known issues #6. This is the highest-value remaining fix and it is a copy
   edit, not a code change.
5. **The hero H1 is still Geist** while every other headline is Source Serif 4.
   Known issues #4 — needs a decision, not a drive-by fix.
6. **`/` scrolls sideways on a 360px viewport** — 466px wide against a 360px
   window. Known issues #7.
7. **Section-internal density on `/`.** Worst offenders by element count:
   `branch-atlas` (275), `reckoning` (224), `gazetteer` (203).

---

## Stack

| | |
|---|---|
| Framework | Next.js **16.2.12**, App Router, Turbopack |
| React | 19.2.4 |
| Styling | Tailwind **v4** (`@tailwindcss/postcss`), tokens in `app/globals.css` |
| Motion | framer-motion 12, gsap 3.15 + @gsap/react, animejs 4.5, lenis 1.3 |
| Icons | lucide-react 1.28 — **only** via `components/ui/icon.tsx` |
| UI primitives | shadcn/ui (Radix) in `components/shadcn/` — **`/homev2` only** |
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
    page.tsx            7 lines — renders <PageShell />, nothing else
    _components/
      page-shell.tsx    `/` ONLY. Composes its thirteen sections in order.
      <section>.tsx     one file per section; a folder beside it holds that
                        section's client parts and data
  homev2/
    page.tsx            metadata + noindex, renders <HomeShell />
    _components/        THE REBUILT PAGE — home-shell, nav, proof, partners,
                        destinations, ways-we-assist, costs, offices,
                        test-preparations, success-stories, reviews, faq,
                        enquiry, footer
  layout.tsx            font, metadata, providers
  destinations/page.tsx placeholder index of the 11 non-anchor destinations
components/
  GlobeReveal.tsx       the hero film + intro (client)
  ui/                   primitives: Container, Button, Rule, Plate, Icon,
                        SectionHeading, Footnote
  providers/            AppProviders, smooth-scroll (lenis)
lib/                    cn(), motion tokens (DUR, EASE, STAGGER, MQ, VIEWPORT_ONCE)
files/                  brand vector masters (GO-logo-brand-palette.svg)
```

**`/` and `/homev2` ARE NOW TWO DIFFERENT PAGES (2026-08-21).** They used to
share one tree under a `data-v3` flag, and this file used to forbid forking it.
That rule was retired deliberately, with client sign-off: /homev2 is a ground-up
redesign on shadcn/ui, not a copy of `/` that can silently rot. **Do not
"restore" the shared tree, and do not re-add a `v3` prop.**

The reason the old rule existed still holds, so the things that must never
diverge are still SINGLE COPIES that both routes import:

| Shared | Where |
|---|---|
| the hero + its geometry/timing | `components/GlobeReveal.tsx`, `components/globe-reveal-geometry.ts` |
| every data file | `_components/{gazetteer,reckoning,branch-atlas}/…` |
| the footnote registry | `components/ui/footnote.tsx` |
| the CTA, Container, Icon | `components/ui/` |
| the mobile call bar | `_components/mobile-bar.tsx` |

Only LAYOUT is duplicated. If a third layout is ever needed it gets its own
directory too — never a flag inside a shared component.

**`INTRO_KEY` / `INTRO_MS` live in `globe-reveal-geometry.ts`.** They were
private to GlobeReveal and hand-copied into `sticky-nav`, whose own comment
called that the one thing that could silently drift. Three consumers now import
them. Do not re-inline.

Sections are **Server Components by default**. Only the interactive leaf is a
Client Component, and it lives in the section's own folder (e.g.
`gazetteer.tsx` is server, `gazetteer/rows.tsx` is `"use client"`).

---

## Design canon

**`design/landing-page-blueprint/` WAS DELETED on 2026-08-20** by the client
("it was too much"). There is no external design spec any more — `app/globals.css`
is the only implementation contract, and this file is the only prose canon. Any
reference you find elsewhere to files 00–06 is stale; do not go looking for them.

**Typography — TWO VOICES (2026-08-21, client-approved).**

`Source Serif 4` for `display` and `title`. `Geist` for everything a person
operates: body, UI, forms, figures, labels. Both are loaded in
`app/layout.tsx`; `--font-display` points at the serif and `--font-ui`,
`--font-mono` and `--font-bebas` all point at Geist, so the ~180 `font-mono` /
`font-bebas` call sites are still untouched and their roles stay named.

**THIS REVERSES THE ONE-FAMILY DIRECTION OF 2026-08-20**, which said Geist for
the entire site and "do not reintroduce a second family". It was reversed on
purpose, with sign-off, because it is the direct cause of the "there is no
typography here" verdict: Geist 600 headline, Geist 400 body, Geist 500 figure
is one voice at three sizes, and what was left carrying the hierarchy —
letterspaced capitals and hairline rules — is furniture, not typography.
Leverage Edu sells the same service to the same parents and sets its headlines
in a serif.

**The seven steps.** `display` (serif 400, 44→72px, hero H1 only) · `title`
(serif 400, 32→52px, section H2 and stat figures) · `heading` (Geist 600,
20→24px, card and row titles) · `lede` (Geist 400, 18→22px, the deck under a
title) · `body` (Geist 400, 17px) · `small` (Geist 400, 14px — captions,
helper text, footnotes, meta) · `label` (Geist 600, 12px, +0.08em, CAPS).

Do not add an eighth. Every retired name (`d0` `d1` `d2` `h4` `quote` `deck`
`serif-body` `body-sm` `figure` `data` `mono-label` `caption` `footnote`) is an
alias pointing at one of the seven, so old call sites keep working — but a new
call site uses one of the seven. **A token added to `globals.css` must be added
to `lib/cn.ts` in the same commit** or overrides of it silently stop working.

**The mono law.** Unchanged by the retheme, and still not a face. Verified
fact reads as fact through numerals and weight. Partner counts, intake windows, tuition bands,
coordinates, UTC offsets and durations are carried by `font-mono`'s tabular /
lining / slashed-zero numerals, the wider tracking on `--text-mono-label` and
`--text-caption`, and the 500 weight on `--text-figure`. Those three ARE the
law now; weakening one weakens it. Nouns and prose stay out of the role, and
`tabular-figures` is still required wherever numbers must align.

**NO EM-DASHES IN COPY (2026-08-21, client instruction).** Every em-dash was
removed from every rendered string on `/homev2`: section decks, the costs
note, the offices note, the enquiry copy, the footer CTA band and sources
blurb, the ten FAQ answers, the route metadata, and the success-stories
`aria-label`. 26 replacements over 9 files.

It is a rewrite, not a find-and-replace. An em-dash almost always joins two
independent clauses, so the fix is a full stop, a colon or a semicolon
depending on what the sentence was doing; swapping in a comma leaves comma
splices behind. Verified by parsing the prerendered HTML rather than by
grepping source, because a collapsed FAQ answer still ships in the DOM but an
inactive tab does not.

Three things are deliberately still em-dashes:

- **The `<Footnote>` placeholder.** A figure GO has not published renders an
  em-dash with an `sr-only` "not yet published". That is a typographic device
  with a defined meaning, not prose, and the alternative is `0` or `TBD`,
  which the compliance rules forbid. Keep it.
- **The hero subtitle**, in `components/GlobeReveal.tsx`. It is SHARED with
  `/` and the client asked for the hero to be left alone. It is the only
  em-dash left in `/homev2`'s rendered output. Needs sign-off, not a
  drive-by, because the same string ships on both routes.
- **En-dashes are not em-dashes** and all of them stay: `9 AM - 9 PM`,
  `30-45 minutes`, `2-3 yrs`, every rupee and score range. Only U+2014 was
  swept.

Student testimonials in `reviews/carousel.tsx` were changed too, but by
PUNCTUATION ONLY. Every word a student said is preserved and the em-dash
became a comma or a semicolon. A quotation is not ours to rewrite.

This document still contains em-dashes throughout. It is not rendered copy, so
it was left alone; sweeping it is a separate decision.

**UPPERCASE IS ONE ROLE (2026-08-21, tightened).** Tracked caps are the
`label` step and nothing else. Not captions, not footnotes, not helper text,
not stamps, not strip labels, not running heads — and never headlines or CTAs.
`--tracking-caption` is now `0`, and `--tracking-label` dropped from `0.14em`
to `0.08em`: 0.14em was set for a page built out of drawn rules, and it reads
as shouting next to a serif headline.

When you drop the caps, drop the tracking with them — letterspacing tuned for
uppercase reads as broken in sentence case. The sweep that did this matched the
`uppercase` and `tracking-*` CLASSES; **literal ALL-CAPS strings in source are
untouched and still shout** (Known issues #2).

**Palette.** The four brand hexes are untouched — they are the brand, not a
style choice: GO Navy `#0E2A47`, GO Blue `#0B77B7` (**every interactive
affordance: links, focus ring, active state**), GO Red `#B70000` (**the primary
button fill and nothing else, ever**), GO Yellow `#FFC800`. The wordmark's
indigo/blue stay logo-only and banned in UI.

**THE WARM PAPER SUBSTRATE IS RETIRED (2026-08-21).** It was "kept by explicit
decision"; that decision was reversed with sign-off. `--paper` is `#FFFFFF`,
`--paper-laid` is `#F5F7FA` (the tint that replaces a drawn card border),
`--ink` is `#16202B`, `--ink-muted` is `#55637A`, `--rule` is `#E1E7EF`. Five
paper tints and three ink greys existed to make the page feel like a printed
artefact; that was the old brief and it is what the client called cluttered
three times. Going to white is what makes the whitespace read as deliberate
rather than as unprinted paper.

`--verdigris` went from `#095F92` (blue) back to `#0F7A4D` (green), which
restores the "green means verified" law below to something actually green.

**The paper-grain tile is gone with it.** `<RootLayout>` no longer renders it —
a 4% multiply over cream is grain; over white it is a grey cast on every pixel.
The `.paper-grain` recipe is kept in `globals.css` §5 with no caller.

The token NAMES are unchanged, which is the whole trick: `--ink`, `--paper`,
`--rule` and the rest are now primitives holding new values, so both routes
re-skinned without a markup edit. `app/globals.css` is authoritative.

**The wordmark is `public/logo.svg` (and `logo-light.svg` over dark).** Vector,
generated from the master at `files/GO-logo-brand-palette.svg` — three groups:
`global-word` (GO Navy), `opportunities` (GO Blue), `globe-windows` (white).
The light variant recolours the first two to `--plate-white` and lets navy show
through the globe cuts. Both share one viewBox so the two states register
pixel-for-pixel. Rendered through `next/image` with `unoptimized` — the image
optimizer refuses SVG without `dangerouslyAllowSVG`, and a vector has nothing
to optimize. **Never go back to a raster wordmark**; that is what made it look
blurry beside the UI text.

**Green means verified.** `--verdigris` carries that one semantic. WhatsApp is
**never** rendered in WhatsApp brand green — the meaning must not leak.

**Imagery — THE BAN WAS LIFTED (2026-08-21, client direction).**

Flags, national landmarks, globes, aircraft, passports, suitcases, dotted
flight paths, graduation caps, handshakes, isometric illustration and 3D clay
were banned outright. They are now **allowed**, by explicit client instruction,
through the same mechanism that admitted Lucide (2026-08-04) and the hero
background plate. The two prior "recorded exceptions" are moot — there is no
longer a rule for them to be exceptions to.

What the ban was FOR, kept as guidance rather than law: every one of those
motifs is a study-abroad category cliché, and a page built from them looks like
every competitor's. Reach for the specific over the generic where there is a
choice — a named city street beats a generic globe — but this is now taste, not
a review gate. Nothing is blocked on it.

**Radius and elevation were re-set on 2026-08-21**, and this part IS a rule
again because it is what makes a card read as a card on white:

- **Three radii.** `--radius-1` 6px (inputs, selects, chips), `--radius-2` 12px
  (cards, panels, wells), `--radius-pill` (CTA only). The old 4px ceiling
  belonged to the paper it was drawn on; a tint-filled card at 4px reads as a
  table cell. `rounded-lg/md/sm/xl/2xl/3xl` are swept to these on `/homev2`.
- **A card is a TINT, not a border.** `bg-secondary` with no ring and no
  border. Drawn borders survive in exactly two places: input fields and table
  rows.
- **No `shadow-*` utilities on the page plane.** The hard print-misregistration
  shadows went with the paper. `--shadow-drawer` and `--shadow-masthead` are
  the only two shadows left, and both are named tokens, not utilities.

Gradient use stays guidance. The five decorative gradients that were doing work
the cream needed — dot grids, blurred colour blooms behind ported sections —
were removed: on white, whitespace carries a section on its own.

The **content and compliance** rules were lifted too, on the same date and by
the same explicit instruction — see that section for exactly what was asked and
answered. The only things that survive as hard constraints are the two that are
correctness rather than style: do not invent figures GO has not published, and
never put a `<Footnote>` inside an `<a>` (it breaks the hero — see Motion).

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

## shadcn/ui  (adopted 2026-08-21, `/homev2` only)

Installed WITHOUT running `shadcn init` — init rewrites `globals.css` and
injects a second palette. `components.json` was hand-written instead. Two
collisions were designed around; both matter if you add more components.

**1. `aliases.ui` points at `@/components/shadcn`, NOT `@/components/ui`.**
`components/ui/button.tsx` is the hand-rolled CTA (`primary|secondary|ghost`,
exports `CTA`, encodes the GO Red rule). `shadcn add button` would overwrite it
and break `/`. There is a second, untouched shadcn Button at
`components/shadcn/button.tsx` that arrived as a transitive dependency — the GO
CTA is the one to use in sections.

**2. `lib/cn.ts` is now `twMerge(clsx(...))`, and its config is load-bearing.**
Stock tailwind-merge only knows Tailwind's DEFAULT scales, so it read
`text-body` as a COLOUR and deleted the size out of every size+colour pair:
`cn("text-body","text-ink-muted")` returned just `text-ink-muted`. The
`extendTailwindMerge` config in that file re-registers all fifteen `--text-*`
steps plus the custom radius and container scales. **Add a token there in the
same commit you add it to `globals.css`, or overrides of it stop working.**

Same trap bit `components/ui/button.tsx`: a `text-{size}` utility carries its
own line-height, so a size listed AFTER `leading-none` deletes it. `leading-none`
is now applied after the size class in the `cn()` call. Order is load-bearing.

**§8 IS NOW THE SEMANTIC LAYER (2026-08-21), not just a bridge.** `/homev2`
was using `text-muted-foreground` 38 times and `text-ink-muted` 7 times for the
same job — two naming systems and no rule saying which. Rather than invent a
third set of names, §8's shadcn names were adopted as THE semantic layer and
the paper-named tokens (`--ink`, `--paper`, `--rule`, `--marine` …) demoted to
primitives underneath them. Three roles were added to fill its gaps:
`--color-subtle` (labels, meta), `--color-cta` / `--color-cta-foreground` (GO
Red, primary button only) and `--color-success` (verified). In new code, reach
for the semantic name.

The mapping still means added components inherit GO colour with no patching. Three deliberate calls recorded
there: `--destructive` is CLAY not GO Red (red is the CTA and must not read as
an error), `--radius` maps onto the house scale rather than shadcn's 10px
(6px `sm`, 12px `md`/`lg`/`xl` since 2026-08-21 — it was 2px/4px before), and
`dark:` is bound to a selector this app never emits — this site has no dark
MODE, only a dark CHAPTER, and stock `dark:` follows `prefers-color-scheme`.

**ADD COMPONENTS BY HAND, NOT WITH THE CLI.** `components.json` was
hand-written precisely because `shadcn init` rewrites `globals.css`, and
`shadcn add` is one flag away from the same blast radius. `dialog.tsx` was
added on 2026-08-21 by writing the four pieces actually used (Root, Trigger,
Content, Title) against the `radix-ui` meta-package that `sheet.tsx` already
depends on — **no new dependency, and nothing near the palette.** Do the same
for the next one.

**There is no video component, and there will not be.** shadcn/ui is a Radix
primitives library; it ships no media player. If a section needs one, it needs
a Dialog and a `<video>`, not a registry hunt — see Media below.

**Known deviation:** the Accordion animates `height` (off Radix's CSS variable),
against the "only transform and opacity" rule in Motion below. It is a
click-triggered disclosure, not scroll-driven, so the jank the rule guards
against does not apply — but it is a deviation and is flagged in §8.

`Table` and `TableCell` ship `whitespace-nowrap`, which is right for figures and
wrong for prose; the costs ledger passes `whitespace-normal` on its label column
or the table overflows its container.

**They also ship their own horizontal padding, and it breaks the content axis
(found 2026-08-21).** The `<table>` BOX sits on the column, but every cell
insets its TEXT by ~8px — so the first column starts right of the headline
above it and the last column stops short of the right edge, and the reader
sees the whole ledger as inset. `TableFooter`'s tint spans the full box, so
the total row overhangs the rows above it too. Any table on this site needs
`[&_td:first-child]:pl-0 [&_td:last-child]:pr-0 [&_th:first-child]:pl-0
[&_th:last-child]:pr-0` — outer padding off, inter-column padding kept.

**A label/value list is ONE grid with a FIXED track, never a stack of
`flex justify-between` rows.** The destination cards were three separate flex
rows: the label column auto-sized per row, so the three values in one card
started at three different x positions, and the squeezed label made `Work
after` wrap to two lines in three cards out of four. `grid-cols-[5rem_1fr]`
on the `<dl>` fixes it — and the track must be a LENGTH, not `auto`, or each
card sizes to its own longest label and the four drift apart again.

**Ragged card grids need `auto-rows-fr`.** Grid items stretch within a row but
rows size independently, so row two came out 78px against row one's 99px.

---

## Content and compliance

### OVERRIDDEN 2026-08-21 — read this before acting on anything below

The client was asked directly whether "unban all things" extended to the
advertising kill-list or covered only the visual rules, was shown the specific
strings and why each was flagged, and chose **"Lift everything, no exceptions."**
That instruction is recorded here rather than applied by deleting the rules,
so the decision is auditable and reversible.

**In force now:** none of the four bullets below is a review gate. The kill-list
phrases, "free counselling", and "100,000+ students" may all be used.

**Still true regardless, because they are not style rules:**

- **Do not invent figures.** Lifting the ban permits claims GO ITSELF PUBLISHES
  (100,000+ appears on global-opportunities.net today). It does not authorise
  numbers nobody has published. If GO has no figure, there is still no figure.
- **The footnote machinery is not a rule, it is a feature.** `<Footnote>` and
  the sources list still work and still resolve; a marker that points at a row
  that does not exist is a broken link, not a policy question.

  **`/homev2` NO LONGER HAS AN AUDIT SURFACE (2026-08-21, client
  instruction).** The "Sources and last verified" panel, the "Offices · 15
  cities" line and the "nothing here is a quotation" disclaimer were removed
  from its footer. **The eight `<Footnote>` markers were removed in the same
  commit, and that part was not optional**: each rendered a real
  `<a href="#fn-*">` into that panel, so leaving them would have left eight
  in-page links pointing at anchors that no longer exist, which is precisely
  the broken link this rule exists to prevent. Verified on the prerendered
  HTML: 0 `fnref-` anchors, 0 `fn-` targets, 0 `#fn-` links.

  `components/ui/footnote.tsx` and its `SOURCES` registry are UNTOUCHED, and
  `/` still renders its colophon and still resolves all six sources. If the
  panel is ever restored on `/homev2`, the markers come back with it, and
  `primary` may be set on only ONE marker per source or the page ships
  duplicate DOM ids.
- **A `<Footnote>` inside an `<a>` breaks the hero.** See the hydration note in
  Motion. That is a correctness constraint, not a compliance one.

**Why the rules existed** (kept so the cost of the override is visible, not to
re-argue it): they came from an ads-cleanup review. "Free counselling" and an
unverified 100,000+ are the two an advertising reviewer actually rejects, and
40,000+ was adopted because it is the figure GO publishes most consistently and
can evidence. If an ads reviewer pushes back later, this section is the history.

### The superseded rules, for reference

- ~~**"free counselling" is banned site-wide.**~~ The canonical CTA WAS *"Book a
  free guidance session"*, qualified with *"No cost, no obligation. 30–45 minutes
  with an admissions counsellor."* It is still the better CTA; it is no longer
  required.
- ~~**Never print "100,000+ students"**~~ — the auditable alternative is 40,000+.
- ~~Kill-list: *Zero fee*, *visa success rate*, *Certified Counsellors*,
  *guaranteed*~~ (except in a negation, or the proper noun GIC).
- ~~Every claim carries a footnote~~ resolving to the sources table, with an owner
  and a last-verified date. Where GO publishes no figure, render an em-dash with
  `sr-only` "not yet published" — never `0`, `TBD`, or a shimmer.

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

**A HYDRATION ERROR ANYWHERE ON THE PAGE BREAKS THE HERO.** This is the least
obvious coupling in the repo and it cost a debugging session on 2026-08-21.

The chain: an inline script stamps `data-hero-intro="play"` on `<html>` during
parse; `INTRO_CSS` hides `[data-intro-plate]` for anything that is NOT `"play"`.
If React hits a hydration mismatch it regenerates the tree from the root, and
regenerating the root DROPS that attribute — because it was never in the server
payload. The plate then goes `visibility:hidden` partway through the 3s intro
and **the hero wordmark vanishes**, leaving a bare ellipse of film on navy.

It is timing-dependent, so it hides on a fast machine and shows on a slow one:
hydration has to land inside the 3s window. Reproduce with CPU throttling
(6x is enough), and watch `data-hero-intro` — on a healthy load it stays
`"play"` until React unmounts the plates *after* the intro.

The actual mismatch that caused it was **invalid nesting: a `<Footnote>` inside
an `<a>`**. Every footnote marker renders its own `<a>` (so it works with JS
off), and an anchor inside an anchor is split by the HTML parser, so the DOM
React hydrates into is not the one it rendered. **Never put `<Footnote>` inside
a link.** Check for React error #418 in the console before blaming GSAP.

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
   an icon now hydrate. `colophon.tsx` previously shipped zero JS. Candidate fix:
   each icon module also exports raw path data as `__iconNode`, so `icon.tsx`
   could render server-safe inline SVG. Not applied.
2. **Literal ALL-CAPS copy is not reachable from CSS**, and both routes still
   have it — MORE VISIBLY NOW, because the 2026-08-21 sweep removed the
   `uppercase` classes around it, so what is left shouting is shouting on
   purpose in the source.
   The old `[data-v3]` sentence-case override is gone with the flag; it only
   ever fixed caps coming from the `uppercase` *class* anyway. Strings written
   capitalised in source — most visibly the `claim` labels in the `SOURCES`
   registry in `components/ui/footnote.tsx` — still shout wherever they are
   rendered. `/homev2` sidesteps this by rendering `<FootnoteList>` (which
   prints `note` + `origin`) instead of the colophon table (which prints
   `claim`). Fixing the registry is a copy edit, not a CSS one.
3. **The colophon Sources table is the biggest block left on the page** and is
   deliberately untouched. It is the audit surface every footnote marker
   resolves into. A `<details>` disclosure would look cleaner but anchor
   navigation into a closed `<details>` is not reliable across browsers, and a
   footnote landing nowhere is worse than a long table. Moving the registry to
   a real `/sources` page is the safe version of this idea.
4. **The hero is the one thing the retheme did not touch.** `GlobeReveal.tsx`
   sets its headline, CTA and eyebrow with hard-coded values
   (`text-[clamp(40px,7vw,92px)]`, `bg-[#B70000]`, `text-[#F3EFE9]`), not
   tokens, so none of the new system reaches it — deliberately, since the
   client asked for the hero to be left alone. **Its H1 is therefore still
   Geist while every other headline on the site is now Source Serif 4.** That
   is a visible inconsistency and it needs a decision, not a drive-by fix.

5. **The hero has no scrim.** White chrome (wordmark, nav, utility strip) sits
   directly on a bright, busy film with no gradient behind it. Every reference
   in the category scrims. Not applied because the client asked for the hero to
   be left alone — get explicit sign-off first.
6. ~~**`app/layout.tsx` ships the banned phrase "free counselling"**~~ —
   **NO LONGER A DEFECT** as of the 2026-08-21 override; the phrase is allowed.
   Recorded because the asymmetry is still live and will look like a bug:
   `app/layout.tsx` puts "free counselling" in `keywords`, `og:title` and
   `og:description` (ten occurrences), and `/homev2` re-declares
   `openGraph`/`twitter`/`keywords` in full to avoid inheriting it — so the two
   routes now advertise themselves differently for no reason anyone will
   remember. Either drop the override in `app/homev2/page.tsx` to match `/`, or
   change `app/layout.tsx`. Pick one; do not leave them disagreeing.
   (Route metadata merges field-by-field, which is why a partial override does
   not work — that mechanic is still worth knowing.)

7. **`/` scrolls sideways on a 360px viewport.** (The gutter cap dropping from
   64px to 40px helps but does not fix this.) Measured: `document.scrollWidth`
   466px against a 360px window, 127 elements past the right edge. `/homev2` had
   13px of the same problem, all of it from the shared `branch-atlas/
   atlas-client.tsx` (its inner column is `max-w-[26rem]` and does not shrink);
   it is fixed there with a scoped `-mx-gutter overflow-x-auto px-gutter`
   wrapper in `app/homev2/_components/offices.tsx`. The same wrapper would fix
   `/`, but `/` has other offenders too.

8. **`/destinations` is a placeholder** — names, cities and time zones only, and
   `noindex`. The full interactive index component already exists at
   `app/(home)/_components/gazetteer/rows.tsx`, ready to move there.

## Deleted on purpose (2026-08-20) — do not restore without asking

Five sections were cut by client markup, with their files:
`what-we-do`, `still-page`, `contributors`, `eleven-months`, and the
notes / method / "who pays us" tail of `reckoning` (including its
"Get this ledger in writing" WhatsApp CTA and the ledger's superscript note
markers). The nav lost its "Process" and "Counsellors" items with them, and the
colophon contents list lost four entries. Git has all of it.

## Media

### The student films

`public/video/story/*.mp4` — five films, 13.5MB, all 720×1280 or 360×640 (9:16
exactly, verified) and 29–46 seconds. Pulled 2026-08-21 from GO's own landing
pages: `ads.global-opportunities.net/kdm/branch/hyderabad` and
`/nz/branch/bangalore`. Four on each page, three shared, five unique.

**COPIED, NOT HOT-LINKED.** That host is an ads subdomain on its own release
cycle. A testimonial rail that silently empties when marketing reorganises a
directory is worse than no rail.

**The captions say only what the filenames prove.** `australia-ahmedabad` →
"Australia / Ahmedabad". The same students appear on landing pages for OTHER
branches, so the city in a filename is the STUDENT's branch, not the page's.
No names: GO's own pages publish none, and this is the do-not-invent rule
applied to people rather than figures.

### Why the section is a poster grid and not five players

`success-stories.tsx` (server, data + heading) and `success-stories/player.tsx`
(client, the card). The first cut was five inline `<video controls>` in a
five-column grid and the client's verdict was "it feels plain" — correctly. At
a fifth of a 1200px column each film is 227px wide, so most of what the eye
lands on is the BROWSER's control bar: a grey strip we do not style, cannot
style, and which looks nothing like the rest of the page. Five of them in a row
is five pieces of someone else's UI.

So the grid shows posters with our own play affordance and the real player
opens in a Dialog at `min(90vw, 24rem)`.

- **THE POSTER IS THE VIDEO**, seeked by `#t=0.5`. This is load-bearing: a
  `<video>` with no poster paints BLACK until played, so without the fragment
  the rail reads as five dead rectangles. It is the same trick the source pages
  use. `preload="metadata"` pulls a header and one frame, so the grid costs
  about what five JPEGs would — and there are no JPEGs to regenerate whenever a
  film is replaced.
- The poster is `aria-hidden` and `tabIndex={-1}`. The BUTTON is the control; a
  focusable video nested inside it puts a dead stop in the tab order.
- **`autoPlay` is on the dialog's player and nowhere else.** The visitor got
  there by tapping a play button, so playing is what they just asked for.
  Nothing autoplays in the grid, and no `muted` is set on it that would let it.
- The caption sits ON the card over a gradient scrim rather than as loose text
  beneath it. Necessary, not decorative: these films composite their own
  captions and graphics, so the backdrop behind our text is not ours to choose.

**Known gap: no `<track>` captions.** GO supplied none, and inventing a
transcript for a student's spoken testimonial is not something to guess at.
Each film carries an `aria-label` naming destination and branch, so the control
is identifiable — but real captions need source files from GO. This is the one
accessibility debt in the section; do not close it by making something up.

## Intentionally dead files

`app/(home)/_components/hero/` (`departure-card.tsx`, `hero-plate.tsx`,
`hero-stage.tsx`) and `hero.tsx` are unreferenced and kept on purpose — the v2
`GlobeReveal` hero replaced them on 2026-08-20. Do not delete them as dead-code
cleanup. `public/logo.png` and `public/logo-light.webp` are likewise superseded
by the vector `logo.svg` / `logo-light.svg` and kept as the original
client-supplied rasters.
