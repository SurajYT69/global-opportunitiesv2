# 03 — Section Specifications, Part 2: Contributors through Colophon, plus the Mobile Bar

**Purpose of this document.** This is the build-ready specification for the last eight of the sixteen canonical sections — `contributors`, `for-parents`, `reckoning`, `eleven-months`, `endpaper`, `questions`, `enquiry`, `colophon` — plus the persistent `mobile-bar`. It is the conversion half of the page: everything from the named human you book, through the money, the calendar and the proof, to the form itself and the auditability promise in the footer. Three sections carry unusually heavy specification here and are called out as such: `questions` (ten real FAQs with complete draft answers), `enquiry` (the full three-step form contract, field by field, including validation and consent language), and `colophon` (the complete footer content inventory).

Every token, headline and stat is taken verbatim from the canon (`direction.md`). Conventions established in `02-sections-part1.md` — the footnote marker split, the mono law's treatment of proper nouns, the `[VERIFY]` discipline, the `scroll-margin-top` anchor offset — apply here unchanged and are not restated.

**Related documents.**

| File | Owns |
|---|---|
| `direction.md` | THE CANON. Tokens, copy, section architecture. Supersedes everything. |
| `01-foundations.md` | Token layer, font loading, grid, Plate System primitives, marginalia rail |
| `02-sections-part1.md` | Sections 1–8, and the page-opening strategy |
| `03-sections-part2.md` | *this document* — sections 9–16 plus the mobile bar |
| `05-motion-blueprint.md` | **All animation specification.** This document names motion moments and their owning library only. |

---

## Table of contents

- [Conventions carried forward](#conventions-carried-forward)
- [9. `contributors` — The Contributors' Page](#9-contributors--the-contributors-page)
- [10. `for-parents` — Step Out Without Doubt](#10-for-parents--step-out-without-doubt)
- [11. `reckoning` — The Reckoning](#11-reckoning--the-reckoning)
- [12. `eleven-months` — Your Next Eleven Months](#12-eleven-months--your-next-eleven-months)
- [13. `endpaper` — The Endpaper](#13-endpaper--the-endpaper)
- [14. `questions` — Questions People Actually Ask](#14-questions--questions-people-actually-ask)
- [15. `enquiry` — The First Call](#15-enquiry--the-first-call)
- [16. `colophon` — The Colophon](#16-colophon--the-colophon)
- [17. `mobile-bar` — The Mobile Bar](#17-mobile-bar--the-mobile-bar)

---

## Conventions carried forward

**Heading map (Part 2 half).** One `<h1>` on the page, in `hero`. No skipped levels. No CTA is ever a heading.

| Section | Level | Text |
|---|---|---|
| `contributors` | H2 | You do not book a service. You book a person. |
| `for-parents` | H2 | For the person who is paying. |
| `reckoning` | H2 | What it costs, in rupees, with the ranges shown. |
| `eleven-months` | H2 | Your next eleven months. |
| `endpaper` | H2 | Forty thousand people have already done this. |
| `questions` | H2 | Questions people actually ask. |
| `enquiry` | H2 | The first call. |
| `colophon` | H2 | The Colophon |
| `mobile-bar` | — | landmark only, no heading |

**Chapter roots.** `contributors` and `for-parents` continue `[data-chapter="trust"]` (`--nr-opsz: 44`). `reckoning` and `eleven-months` are `[data-chapter="choose"]` and `[data-chapter="apply"]` respectively (`--nr-opsz: 60`). `endpaper` and `questions` are `[data-chapter="success"]` (`--nr-opsz: 72`), which is also what switches the focus ring to `--ochre-on-dark`. `enquiry` and `colophon` inherit `success`.

**Footnote markers.** Numerals `¹`–`⁶` remain bound to the six canonical statistics wherever they appear. Numerals above `⁶` are page-sequential sourced facts. The dagger `†` marks editorial or illustrative notes and carries no registry obligation beyond being honest about being illustrative.

---

## 9. `contributors` — The Contributors' Page

> **Chapter:** III Trust · **Surface:** `--paper` · **Motion owner:** Motion (`layoutId` shared-element morph)

### 9.1 Purpose & UX objective

The masthead of a periodical lists its contributors, with what each of them covers. This section does the same for GO's counsellors: named people, with the city they sit in, the destinations they own, the years they have been doing it, and one student outcome attached to each. It exists because the brand research found something nobody in the Indian mass market has surfaced — GO's own published testimonials already name the individual counsellor — and because the CRO research found the corresponding open flank: IDP and Leverage Edu show **zero** named counsellors above the fold. The section's job is to move the transaction from *a company* to *a person*, which is the only frame in which "free counselling" reads as generous rather than suspicious.

**Think:** "There is a specific person whose name I will know, and I can see who they placed." **Feel:** the difference between a call centre and a colleague. **Do:** open one counsellor, read the outcome, and use `Book Avinash` — arriving at the form with the destination already chosen.

### 9.2 Story chapter

**III — Trust**, third beat. `[data-chapter="trust"]`. The canon places `contributors` in Trust rather than Choose: a named human with a track record is credibility evidence before it is a purchasing option.

### 9.3 Content hierarchy

1. Running head — `THE CONTRIBUTORS`
2. **H2** — `You do not book a service. You book a person.`
3. Deck
4. Six **Plate C** cartouches in a 3 × 2 grid — monogram field, name, data block, one student outcome, `Book [name]` CTA
5. Counsellor drawer — full data, languages, destinations, the complete testimonial, `tel:`, `wa.me`, `Book [name]`
6. Reassignment note
7. Lateral link — `Every counsellor, by office →`
8. Footnotes

### 9.4 Draft copy

**Running head:** `THE CONTRIBUTORS`

**H2:** `You do not book a service. You book a person.`

**Deck** (`--fs-deck`):
> *Counsellors are named here with the city they sit in, the destinations they handle and the years they have done it. When you book, you are booking one of them, and the name on your file is the name you will speak to.*

**Cartouche format** (this is the canon's own line, and it is the template):
`AVINASH · DELHI SOUTH · UK & IRELAND · 11 YEARS†`

**The six cartouches:**

| Monogram | Name | City | Destinations | Years | Outcome attached |
|---|---|---|---|---|---|
| `AV` | Avinash | Delhi South | UK & Ireland | `11 YEARS` `[VERIFY]` | Rittik Panchal — Master's, United Kingdom |
| `NB` | Nivesh Bisht | Delhi GK | Germany & Europe | `[VERIFY]` | Vanshika Sheel — German public university |
| `JK` | Jasmeet Kaur | `[VERIFY]` | Canada | `[VERIFY]` | Simarpreet Kaur — Centennial College |
| `AD` | Anjandeep | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |
| `PA` | Pallavi | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |
| `MO` | Monika | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |

**The three testimonials, verbatim** (these are published, named and attributable):

> "Global Opportunities has been a great support in my journey to study in the UK in masters."
> `— RITTIK PANCHAL · MASTER'S, UNITED KINGDOM · COUNSELLOR: AVINASH`

> "My consultant, NIVESH BISHT was not just professional and knowledgeable, but also incredibly friendly and approachable."
> `— VANSHIKA SHEEL · GERMAN PUBLIC UNIVERSITY · COUNSELLOR: NIVESH BISHT, GK OFFICE`

> "They have been a great support throughout. Super active and especially super consistent."
> `— SIMARPREET KAUR · CENTENNIAL COLLEGE · COUNSELLOR: JASMEET KAUR`

*Editorial note on the third quote.* The canon's tone rules cap the word *journey* at one appearance on the page, and it appears in Rittik Panchal's testimonial, which is printed verbatim. Simarpreet Kaur's published quote reads "throughout the journey"; it is trimmed to "throughout" so the page's single permitted instance sits in the quote where it is load-bearing. Trimming is disclosed with an ellipsis if any reviewer objects; **inventing** words in a testimonial is not an option under any circumstance.

**CTA label:** `Book Avinash` (name substituted per card)
**CTA sub-label** (`--fs-caption`): `Delhi South · UK & Ireland · replies on WhatsApp`
**Microcopy under the CTA:** `Takes you to the form with the United Kingdom already selected.`

**Drawer additions:** `LANGUAGES: ENGLISH, HINDI, PUNJABI [VERIFY]` · `Call this counsellor` · `WhatsApp this counsellor` · the full untrimmed testimonial.

**Reassignment note** (`--fs-body-sm`, `--ink-muted`, at the section foot):
> Counsellors move. If the person named on your file leaves, we tell you who has taken it over, in writing, before anything else happens.

**Reassignment fallback string** (rendered when a deep link resolves to a departed counsellor):
> `This counsellor is no longer at Global Opportunities. Your enquiry will go to the Delhi South team, who hold the file.`

**Dagger note (rail):** `† Years and placements are held per counsellor in the Sources & Methods register with a last-verified date. A counsellor's figures are removed from this page the day they can no longer be evidenced.`

### 9.5 Layout

**Desktop ≥1280px.** `--content-max`, `padding-block: var(--section-y)`.

- Running head, H2, deck: columns 1–7.
- Six cartouches: **3 × 2 grid**, each spanning 4 columns, `--grid-gap` between, `--s-8` between rows.
- Each cartouche: Plate C at `aspect-ratio: 4/5` on top; data block beneath; the quote (max two lines, clamped) beneath that; the CTA at the foot.
- Drawer: right-side panel, 480px, `--z-drawer`, `--paper`, `--shadow-drawer`, scrim `--ink` at 22%.

**Tablet 768–1023px.** 2 × 3 grid. Drawer becomes a full-width in-flow expansion beneath the grid row that was clicked.

**Mobile <768px — structurally different.** One column, and **the cartouche re-composes**: the Plate C monogram field shrinks to a 96×120px block floated left of the data block rather than sitting above it at 4:5, so a counsellor occupies ~180px instead of ~520px and all six are scannable in two flicks. The quote sits full-width beneath the pair. The CTA is full-width at ≥48px. Expansion is an in-place accordion, not a drawer.

### 9.6 Wireframe — desktop

```
 col  1    2    3    4    5    6    7    8    9   10   11   12      rail
     THE CONTRIBUTORS
     You do not book a service. You book a person.
     /Counsellors are named here with the city they sit in, the/
     /destinations they handle and the years they have done it./

     ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
     │ ┌──────────────┐ │ │ ┌──────────────┐ │ │ ┌──────────────┐ │
     │ │   ◜ ◝        │ │ │ │              │ │ │ │              │ │
     │ │     AV       │ │ │ │     NB       │ │ │ │     JK       │ │  Plate C
     │ │   ◟ ◞        │ │ │ │              │ │ │ │              │ │  4:5
     │ │ contour ring │ │ │ │              │ │ │ │              │ │  --paper-
     │ └──────────────┘ │ │ └──────────────┘ │ │ └──────────────┘ │  tracing
     │ AVINASH          │ │ NIVESH BISHT     │ │ JASMEET KAUR     │  --reg-sienna
     │ DELHI SOUTH ·    │ │ DELHI GK ·       │ │ [VERIFY] ·       │
     │ UK & IRELAND ·   │ │ GERMANY & EUROPE │ │ CANADA           │
     │ 11 YEARS†        │ │ [VERIFY]         │ │ [VERIFY]         │
     │ /"…great support/ │ │ /"My consultant,/ │ │ /"They have been/ │
     │ /in my journey…"/ │ │ /NIVESH BISHT…"/  │ │ /a great support"/│
     │ — RITTIK PANCHAL │ │ — VANSHIKA SHEEL │ │ — SIMARPREET KAUR│
     │ ( Book Avinash ) │ │ ( Book Nivesh )  │ │ ( Book Jasmeet ) │
     │  Delhi South ·   │ │                  │ │                  │
     │  replies on WA   │ │                  │ │                  │
     └──────────────────┘ └──────────────────┘ └──────────────────┘
     ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
     │ AD  ANJANDEEP    │ │ PA  PALLAVI      │ │ MO  MONIKA       │
     └──────────────────┘ └──────────────────┘ └──────────────────┘
     Counsellors move. If the person named on your file leaves, we tell
     you who has taken it over, in writing, before anything else happens.
     Every counsellor, by office →

  ┌─ DRAWER (--z-drawer, 480px, --shadow-drawer) ─────────────┐
  │ ┌──────────┐  AVINASH                                 ×  │
  │ │    AV    │  DELHI SOUTH · UK & IRELAND · 11 YEARS†     │
  │ └──────────┘  LANGUAGES: ENGLISH, HINDI, PUNJABI          │
  │ /"Global Opportunities has been a great support in my/     │
  │ /journey to study in the UK in masters."/                  │
  │ — RITTIK PANCHAL · MASTER'S, UNITED KINGDOM               │
  │ ( Book Avinash )  Call this counsellor  WhatsApp          │
  └───────────────────────────────────────────────────────────┘
```

### 9.7 Wireframe — mobile (390px, re-composed cartouche)

```
┌─ 390 ───────────────────────────────┐
│ THE CONTRIBUTORS                    │
│ You do not book a service.          │
│ You book a person.                  │
├─────────────────────────────────────┤
│ ┌───────┐ AVINASH                   │
│ │  AV   │ DELHI SOUTH ·             │  96×120 monogram, floated left
│ │       │ UK & IRELAND · 11 YEARS†  │
│ └───────┘                           │
│ /"…a great support in my journey to/ │
│ /study in the UK in masters."/       │
│ — RITTIK PANCHAL · MASTER'S, UK     │
│ (        Book Avinash        )      │  ≥48px
│  Takes you to the form with the     │
│  United Kingdom already selected.   │
├─────────────────────────────────────┤
│ ┌───────┐ NIVESH BISHT              │
│ │  NB   │ DELHI GK · GERMANY…       │
│ └───────┘                           │
│ …                                   │
└─────────────────────────────────────┘
```

### 9.8 Visual direction

Surface `--paper`, returning from the two `--paper-still` Trust sections — the still page and the map are one spread; the contributors' page is the next leaf.

- **Plate C:** field `--paper-tracing`, keyline `1px --rule`, `--r-1`, `--reg-sienna` (`3px 3px 0 0 #C2562B`). Initials set at **5rem in Newsreader** (this is the canon's explicit figure and the one place a raw rem value is specified outside the type scale), `--ink`, centred, with a hairline contour-ring motif behind at `--rule` weight and `--sienna` at low opacity for the innermost ring.
- **Name:** `--fs-h4` (Hanken 600), `--ink`.
- **Data block:** `--fs-caption` (Plex Mono 400), `--ink-muted`, separators `·` in `--ink-faint` (non-text use).
- **Quote:** `--fs-deck` (Newsreader italic 300), `--ink`, clamped to two lines with the full text in the drawer. Attribution at `--fs-mono-label`, `--ink-muted`.
- **CTA:** solid `--sienna-press` pill, `--r-pill`, white, 44px on desktop and 48px on mobile. Sub-label `--fs-caption`, `--ink-muted`.
- **Drawer:** `--paper`, `--r-0`, `--shadow-drawer` — permitted because a drawer floats above the page plane. `Call` as an outlined pill (`--marine` text, `1px --rule-strong`); `WhatsApp` likewise outlined in `--ink` — **never brand green**, because green means verified on this page.
- No card shadows, no hover lift, no scale-on-hover. A cartouche responds to hover and focus with a `--sienna` keyline swell on its plate and nothing else.

### 9.9 Imagery

**Plate C — Portrait Cartouche.** No face. A 4:5 `--paper-tracing` field carrying the person's initials as a monogram at 5rem in Newsreader, a hairline contour-ring motif behind, and the full data block beneath. Monograms read as an institutional register — a masthead, a bookplate — not as a broken image, which is precisely why this treatment survives having no photographs.

**v2 replacement:** a commissioned portrait drops into the identical 4:5 field behind the identical data block, `data-plate="cartouche"` → `data-plate="photo"`. The data block never changes. Photography direction: the counsellor at their actual desk in the actual office — Kailash Colony, Amritsar — natural light, files visible, a phone mid-call. Not a white-background corporate headshot; a working portrait.

**Consent gate for v2.** A counsellor portrait is personal data. Each portrait requires that individual's written, purpose-specific consent naming this landing page, logged with a timestamp, and a removal path on departure. Until that exists per person, the monogram is the shipped state and it is not a compromise.

### 9.10 CTA placement & conversion note

**One CTA per cartouche — `Book [name]` — plus two channel anchors inside each drawer.** No section-level `Book free counselling`; the whole point is that you book a person, not a service.

- `Book Avinash` deep-links to `#enquiry` carrying **two** parameters: the counsellor's routing token and their primary destination as the step-1 chip. The visitor therefore lands on **step 2 of 3**. Combined with the multi-step conversion differential (~13.85% vs ~4.53% single-page) and the finding that clearing step 1 raises finish rates by ~73%, this is the highest-value link on the page after the form's own submit button.
- The named-counsellor device is trust tier 3 in the CRO hierarchy and is explicitly identified as unclaimed: neither IDP nor Leverage Edu surfaces a named counsellor above the fold. GO already has the asset — its own testimonials name the counsellor — and has never productised it.
- The drawer's `tel:` and `wa.me` anchors are real and function with JavaScript disabled, per canon build note 11. For the PG persona, whose stated fear is a salesperson rather than an adviser, a direct line to a named individual is a stronger signal than any volume of company-level proof.
- **Churn is a design problem, not an ops problem.** The reassignment fallback string is part of the conversion spec: a deep link that 404s on a departed counsellor turns the page's single most humanising device into its most damaging one.

### 9.11 Accessibility

- Landmark: `<section id="contributors" aria-labelledby="contributors-h2">`.
- Heading levels: **H2** for the section, **H3** for each counsellor's name.
- **No nested interactives.** The cartouche's expand affordance is a `<button>` wrapping the monogram and name; the `Book [name]` CTA is a **sibling** `<a>`, not a descendant of that button. This is the most common accessibility defect in card patterns and it is specified out here.
- Drawer: `role="dialog" aria-modal="true" aria-labelledby="counsellor-name"`, focus trapped, `Esc` closes, focus returns to the invoking button, `<body>` scroll locked.
- **No-JS contract:** the drawer's content is server-rendered inside each cartouche as a native `<details>` and upgraded to a dialog by Motion. With JS off, every name, testimonial, `tel:` and `wa.me` link remains present and operable — this is required by canon build note 11 and is not optional.
- The monogram is `aria-hidden`; the accessible name comes from the `<h3>`.
- Testimonials are `<blockquote>` with `<cite>` carrying student, university and counsellor.
- Contrast: `--ink` on `--paper-tracing` must be measured and recorded (the canon quotes `--ink` against `--paper`); `--ink-muted` at `--fs-caption` on `--paper-tracing` likewise. `--ink-faint` appears only as separator glyphs and is `aria-hidden`.
- Touch targets: cartouche button hit area is the whole monogram-plus-name block; CTA ≥48px on mobile; drawer actions ≥48px.
- Screen-reader flow: heading 2 → deck → "Avinash, heading level 3, button, collapsed" → data block → blockquote → "Book Avinash, link" → sub-label → next counsellor.

### 9.12 Motion cue

- **Owner: Motion.** Card → drawer is a **shared-element morph via `layoutId`** on the Plate C field, with `AnimatePresence` handling mount and exit. `--dur-4`, `--ease-quart`. Transform and opacity only.
- Cartouche hover/focus: CSS keyline colour transition, `--dur-2`, `--ease-quad`. No lift, no scale.
- Once-only `whileInView` grid reveal, opacity plus `y`, `--stagger` across the six cards.
- No ScrollTrigger, no scrub, no pin. Reduced motion: the dialog appears at its final state with an opacity change only, and the `layoutId` morph is not registered. `05-motion-blueprint.md` § 9.

---

## 10. `for-parents` — Step Out Without Doubt

> **Chapter:** III Trust · **Surface:** `--paper-warm` (`#F7EFE1`), wells `--ochre-tint` · **Motion owner:** Anime.js (dual clock), Motion (opacity reveals only)

### 10.1 Purpose & UX objective

One full chapter, on warmer paper, in serif, at larger type, addressed to the person who signs the cheque. No competitor addresses the parent anywhere except as a page in a dropdown, and GO's own site already names the four fears — *finances, safety, course recognition, accreditation* — in its own words and then buries them. This chapter surfaces them in that order and adds the three questions a parent asks second: who actually calls me, what are you paid and by whom, and what happens if the visa is refused. Its exits are a phone number and WhatsApp, not a form, because the buyer persona very often will not fill a form.

**Think:** "This section is not talking past me to my child." **Feel:** addressed. Slower, larger, warmer — the physical sensation of someone lowering their voice and sitting down. **Do:** read three or four blocks, then call the toll-free number, send the chapter to WhatsApp, or print it for the family conversation.

### 10.2 Story chapter

**III — Trust**, final beat and the chapter's emotional peak. `[data-chapter="trust"]`, `--nr-opsz: 44`. This is the lowest-motion chapter on the page after `still-page`.

### 10.3 Content hierarchy

1. Hindi toggle — `हिन्दी में पढ़ें`
2. Running head — `FOR PARENTS`
3. **H2** — `For the person who is paying.`
4. Deck (serif italic)
5. **Plate A**, 16:9, at the chapter head
6. **Block 1 — Money**
7. **Block 2 — Safety**
8. **Block 3 — Course recognition**
9. **Block 4 — Accreditation**
10. **Block 5 — Who calls you**
11. **Block 6 — What we are paid, and by whom**
12. **Block 7 — If the visa is refused**
13. Toll-free number as a display element
14. **The dual clock**, with its verbatim caption
15. Three actions: `Call 1800 111 119` · `Send this chapter to my WhatsApp` · `Print this chapter`
16. Footnotes

### 10.4 Draft copy

**Hindi toggle label:** `हिन्दी में पढ़ें` (with `Read in English` as the toggled state)
**Running head:** `FOR PARENTS`
**H2:** `For the person who is paying.`

**Deck** (`--fs-deck`, Newsreader italic):
> *This chapter is written for you, not for your child. It is longer than the rest of the page, it is slower, and it answers money first.*

**Block 1 — `MONEY`**
> A year abroad costs somewhere between ₹25 lakh and ₹55 lakh, depending on the country, the city and the course. We publish the whole arithmetic in rupees further down this page — tuition, living, visa, health surcharge, insurance, forex, flights, and the loan instalment — with a range on every line and a source on every figure. We do not quote a single number, because a single number is always wrong, and the people who quote you one are guessing or selling.
>
> `See the full costing →`

**Block 2 — `SAFETY`**
> The question is usually asked about daughters, and it deserves a straight answer rather than reassurance. We place students in university-managed or university-verified accommodation wherever it is available. Before your child flies, we give you the institution's own international student support number, in writing, along with the name of the person there who answers it. The counsellor who handled the file stays reachable after departure, not just until the visa arrives. We cannot promise you safety, and anyone who does is not being honest with you. What we can promise is that you will always have a number that answers.

**Block 3 — `COURSE RECOGNITION`**
> Ask two questions of any course, and ask them before a deposit is paid. First: is the university recognised by its own country's regulator? Second: is the qualification recognised by the employers, councils or licensing bodies you care about in India? We will answer both in writing, per university on the shortlist. If the answer to either is no, we will tell you so and say why the course might still be worth it, or that it is not.

**Block 4 — `ACCREDITATION`**
> Six external bodies review Global Opportunities: AIRC, ICEF, AAERI, the British Council, Education New Zealand and PTE Pearson. AIRC's certification runs *"for a designated period of time of five years (first round), and ten years (thereafter)"* — which means an independent American body examined us against a published standard, and will do it again. The company is `GLOBAL OPPORTUNITIES PRIVATE LIMITED`, registered, with eighteen addressed branches. You can look all of it up, and you should.

**Block 5 — `WHO CALLS YOU`**
> A named counsellor from the branch nearest you, within 15 minutes, between 9 AM and 9 PM IST. You will have their name, their branch and their direct number, and they will speak to **you** about money and timelines, not only to your child. If that counsellor leaves Global Opportunities, we tell you in writing who has taken the file over, before anything else happens.

**Block 6 — `WHAT WE ARE PAID, AND BY WHOM`**
> Global Opportunities charges you ₹0. When your child enrols at a partner university, that university pays us a recruitment fee — that is the standard arrangement across this industry and it is how counselling can be free to you. Four things on our service list are third-party costs: forex, medical insurance, the GIC deposit for Canada, and accommodation. We pass those through at the provider's price and add nothing. The full line-by-line accounting, including who pays us, is printed further down this page.
>
> `Read the reckoning →`

**Block 7 — `IF THE VISA IS REFUSED`**
> Visas are refused. Nobody can promise you one, and you should be careful of anyone who does — every competitor publishes a success percentage, and independent guidance to parents treats that specific claim as a warning sign.
>
> If it happens, here is what we do. We obtain the refusal notice. We read the exact ground it cites, because the ground determines everything. We then tell you honestly whether it is answerable. If it is, we re-apply or appeal inside the time limit. If it is not, we move the application to the next intake or to another country. Deposits are recovered where the university's own refund policy allows it, and we will tell you what that policy says before you pay. We do not charge you again for any of this. `[VERIFY — confirm and record the refund and re-application policy with GO before this block ships.]`

**Toll-free display block:**
`1800 111 119`
`FREE FROM ANY INDIAN LANDLINE OR MOBILE · 9 AM–9 PM IST`

**Dual clock caption, verbatim:**
> *You'll always know what time it is where they are.*

**Dual clock faces:**
`NEW DELHI · 14:32 IST` / `LONDON · 10:02 BST` — the second city follows the destination chip last tapped elsewhere on the page, defaulting to London.

**Actions:**
- `Call 1800 111 119` — sub-label: `Toll-free. 9 AM–9 PM IST.`
- `Send this chapter to my WhatsApp` — sub-label: `A link to this page and the costing, on WhatsApp.`
- `Print this chapter` — sub-label: `Four pages, including the costing and the branch nearest you.`

### 10.5 Layout

**Desktop ≥1280px.** `--content-max`, `padding-block: var(--section-y)` at the top of its clamp — this chapter is given more air than any other.

- Hindi toggle: top right, columns 10–12, aligned with the running head.
- Running head, H2, deck: columns 3–9.
- Plate A: columns 3–11, `aspect-ratio: 16/9`.
- **The seven blocks: columns 3–9**, constrained to `--measure-serif` (62ch). This is the narrowest measure on the page and it is the tonal signal — a column of serif prose at 62 characters reads as a book, not as a landing page.
- Blocks 1, 6 and 7 sit in `--ochre-tint` wells spanning columns 2–10 with a 2px `--ochre` left rule; the other four sit on the bare `--paper-warm` with `--s-7` between them.
- Toll-free display block: columns 3–9, centred within that span.
- Dual clock: a full-width band, columns 1–12, bounded by `0.0625rem --rule` hairlines above and below.
- Three actions: columns 3–9, in a row, `Call` first.
- Marginalia rail retained at `--rail`.

**Tablet 768–1023px.** Single column at `--measure-serif`, centred in the viewport. No rail; footnotes become inline `<details>`. Dual clock stays a full-width band. Actions stack two-up then one.

**Mobile <768px.** Single column, `--gutter` padding. The Hindi toggle becomes a **full-width chip at the chapter head**, above the running head, because it is the first decision a Hindi-preferring parent needs to make and it must not be a 32px target in a corner. The dual clock stacks vertically — Delhi above, destination below, separated by a hairline. All three actions are full-width at ≥48px, `Call` first.

### 10.6 Wireframe — desktop

```
 col  1    2    3    4    5    6    7    8    9   10   11   12      rail
                                                    [ हिन्दी में पढ़ें ]
       FOR PARENTS
       For the person who is paying.
       /This chapter is written for you, not for your child. It is/
       /longer than the rest of the page, it is slower, and it/
       /answers money first./
     ┌────────────────────────────────────────────────────────┐
     │ PLATE VII · 28.5562° N · 77.1000° E                    │  16:9
     │ GLOBAL OPPORTUNITIES, DELHI SOUTH · 11:00 IST      ✛   │
     └────────────────────────────────────────────────────────┘
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃ MONEY                                    --ochre-tint ┃  well
   ┃ A year abroad costs somewhere between ₹25 lakh and    ┃  2px --ochre
   ┃ ₹55 lakh, depending on the country, the city and the ┃  left rule
   ┃ course. We publish the whole arithmetic in rupees…    ┃  62ch serif
   ┃ See the full costing →                                ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
       SAFETY
       The question is usually asked about daughters, and it
       deserves a straight answer rather than reassurance…      --s-7 gap
       COURSE RECOGNITION
       Ask two questions of any course, and ask them before…
       ACCREDITATION
       Six external bodies review Global Opportunities…
       WHO CALLS YOU
       A named counsellor from the branch nearest you, within…
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃ WHAT WE ARE PAID, AND BY WHOM                         ┃
   ┃ Global Opportunities charges you ₹0…  Read the reckoning →
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃ IF THE VISA IS REFUSED                                ┃
   ┃ Visas are refused. Nobody can promise you one…        ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                      1800 111 119
        FREE FROM ANY INDIAN LANDLINE OR MOBILE · 9 AM–9 PM IST
 ────────────────────────────────────────────────── --rule ──────
     NEW DELHI                          LONDON
     14:32 IST                          10:02 BST
     /You'll always know what time it is where they are./
 ────────────────────────────────────────────────── --rule ──────
     ( Call 1800 111 119 )  ( Send this chapter to my WhatsApp )
       Toll-free. 9 AM–9 PM IST.      Print this chapter
                     surface --paper-warm #F7EFE1
```

### 10.7 Visual direction

Surface `--paper-warm` (`#F7EFE1`) — used **only here**. The step from `--paper` to `--paper-warm` is the largest surface shift on the light half of the page and it is the first thing the parent registers before reading a word.

- **Body: `--fs-serif-body`** — Newsreader 400, opsz 16, `1.125rem / 1.72`, max 62ch. The only serif body on the page. **The tonal shift is the signal.** Icons ship on the page as of 2026-08-04 (`04-design-system.md §5`), but no glyph and no badge can do what this does: the parent knows the chapter is addressed to them before reading a word, because the *voice* changed. An icon may label an action in this chapter; it may not be asked to announce the chapter.
- Block heads: `--fs-mono-label`, `--ink-muted`, letterspaced uppercase.
- H2: `--fs-d1` at `--nr-opsz: 44`, `--ink`.
- Wells: `--ochre-tint` fill with a `2px --ochre` left rule. Ochre is 2.1:1 and appears **only** as fill and rule — never as text, anywhere in this chapter.
- Toll-free number: `--fs-figure` (Plex Mono 500, tabular), `--marine`. It is the largest non-headline element in the chapter, deliberately: a 50-year-old reader should be able to read it at arm's length.
- Dual clock: city names at `--fs-mono-label`, `--ink-muted`; times at `--fs-figure`, `--ink`, tabular; the caption in Newsreader italic at `--fs-deck`, `--ink-muted`, centred beneath both faces. **Typographic clocks — no dials, no hands.** This survives the 2026-08-04 icon adoption verbatim: the clock face is *set*, not drawn, and no `Clock` glyph goes inside it. The time is a fact and facts on this page are mono type. An icon may sit beside the "Call" action beneath the clock; it may not sit in place of a numeral.
- Hindi toggle: `--r-2` chip, `1px --rule`, `--ink`, `--sienna-tint` when active. Devanagari sets in IBM Plex Sans Devanagari, loaded on demand and never preloaded.
- Actions: `Call` as a solid `--sienna-press` pill; the other two outlined in `--marine` and `--ink` respectively. **WhatsApp is ink and outline, never brand green.**
- No plates besides the chapter-head Plate A. No cards. No shadows. Radii `--r-0` except chips and pills.

### 10.8 Imagery

**One Plate A** at the chapter head, 16:9: `PLATE VII · 28.5562° N · 77.1000° E · GLOBAL OPPORTUNITIES, DELHI SOUTH · 11:00 IST`. Field `--grad-plate-marine`, 8%-white graticule, one crosshair, type in `--plate-white`.

**v2 replacement:** the commissioned photograph that matters most on the whole page — **the kitchen table**. A mother with a laptop and a printed cost sheet, ceiling-fan light, the actual paperwork on the table. 16:9, into the identical box behind the identical caption, with the caption rewritten to the real place and hour of the shoot. This is the single image whose absence the concept research flagged as most costly, and it is the one v2 commission that must not be cut.

**Not here, ever:** a stock photograph of a smiling family, a handshake, a graduation cap, or a parent pointing at a laptop.

### 10.9 CTA placement & conversion note

**Three exits, and not one of them is the form.** `Call 1800 111 119`, `Send this chapter to my WhatsApp`, `Print this chapter`.

- This is the most consequential CTA decision on the page. The buyer persona — 45–55, funding ₹15–45 lakh, often against collateral — frequently will not complete a web form, and the CRO research is blunt about it: parents may never fill a form; some students only use WhatsApp. Routing the parent chapter into `#enquiry` would be routing the buyer into the child's channel.
- **Toll-free is the primary action here**, not "book". `1800 111 119` is free from any Indian landline, which matters materially outside metros, and a phone call gives the parent the thing they are actually after: a named human, immediately, without typing.
- **WhatsApp economics:** 60–70% response in India against 20–30% for web forms; ~98% opened within three hours; median reply 45–90 seconds. The handoff sends a link to this page plus the costing, so the conversation continues in the family group where the decision is actually made.
- **Print is not a legacy affordance.** A four-page printed summary is the artifact that gets carried to the bank for the loan conversation and to the relative who "knows about these things". No competitor prints.
- The chapter is placed **before** `reckoning` deliberately: the parent must be addressed before they are shown a number, or the number reads as a quote rather than a disclosure.

### 10.10 Accessibility

- Landmark: `<section id="for-parents" aria-labelledby="for-parents-h2">`.
- Heading levels: **H2** for the chapter, **H3** for each of the seven blocks.
- **Hindi toggle:** a `<button aria-pressed="false">`. When active, only the chapter subtree receives `lang="hi"`; the document `lang` stays `en`. The Devanagari face loads on activation only and is never preloaded (canon font budget).
- **Dual clock:** each face is a `<time datetime="…">`. The per-minute update must carry **`aria-live="off"`** — a live region that announces the time every sixty seconds would make the chapter unusable with a screen reader. This is a blocking requirement.
- The `--fs-serif-body` measure of 62ch and its 1.72 line height are chosen for a 45–55-year-old reader and comfortably exceed AA minimums for spacing and reflow.
- **Print stylesheet** (`@media print`) is part of this section's deliverable: hide the nav, the mobile bar, the spine, all plates and the dual clock; print the seven blocks, the toll-free number, the branch nearest the reader if one has been selected, and the Sources & Methods table from the colophon. Target four A4 pages.
- Contrast against `--paper-warm` (`#F7EFE1`) is **not in the canon's contrast table** — `--ink`, `--ink-muted`, `--marine` and `--clay` must all be re-measured against this surface and recorded before ship. `--ink-faint` is not used in this chapter at all.
- Touch targets: Hindi toggle ≥48px on mobile; all three actions ≥48px; inline links padded to ≥44px.
- Screen-reader flow: "Read in Hindi, toggle button, not pressed" → heading 2 → deck → plate figure with caption → "Money, heading level 3" → prose → … → "1800 111 119, call link" → two `<time>` elements → three action links.

### 10.11 Motion cue

- **Lowest-motion chapter on the page after `still-page`.** All block reveals are **opacity only** — no `y`, no stagger beyond `--stagger-loose`, capped at `--dur-5`. Motion owns them.
- **Owner: Anime.js** for the dual clock's digit odometers, ticking **once per minute**.
- *Reconciliation note.* The canon bans infinite animation page-wide and also specifies this clock. There is no conflict: a once-per-minute digit change is a discrete state update driven by `Intl.DateTimeFormat`, not a running timeline, and it holds no rAF loop between ticks. Under `prefers-reduced-motion` the clock still updates its value; only the odometer roll is removed. `05-motion-blueprint.md` § 10 owns the implementation.
- No ScrollTrigger, no scrub, no pin, no parallax in this chapter.

---

## 11. `reckoning` — The Reckoning

> **Chapter:** IV Choose · **Surface:** `--paper-tracing` · **Motion owner:** Anime.js (odometers), Motion (bar), GSAP (total rule) — **user-triggered, never scroll-triggered**

### 11.1 Purpose & UX objective

Publish the money. Three tap-chips — destination × degree level × city tier — type out a printed accounting spread in rupees: tuition, living, visa, health surcharge, forex, GIC, insurance and flights, each an honest range with a footnote, less a scholarships line, plus a loan instalment line, totalling to a **range** rather than a number. Then the section prints the line no competitor will print: *What Global Opportunities charges you: ₹0. Here is who pays us, and how.* The CRO research names the cost calculator as the decisive parent artifact and an entirely unclaimed position — neither IDP nor Leverage Edu surfaces one — and the economics explain why: HSBC finds overseas education can consume up to 64% of an Indian family's retirement savings while only ~53% of affluent parents have an education savings plan.

**Think:** "This is the first honest number I have been given, and it comes with its arithmetic." **Feel:** the specific relief of a range with sources instead of a quote. **Do:** tap three chips, read the total, and take the costing to WhatsApp or into the form.

### 11.2 Story chapter

**IV — Choose.** `[data-chapter="choose"]`, `--nr-opsz: 60`. Chapter opener: roman `IV` in the margin with a rule running from it, label `CHOOSE`.

### 11.3 Content hierarchy

1. Chapter opener — `IV`, `CHOOSE`, chapter rule
2. **H2** — `What it costs, in rupees, with the ranges shown.`
3. Deck
4. **Three chip groups** — Destination · Degree level · City tier
5. **The ledger** — eight cost rows, each a range with a footnote
6. `LESS: SCHOLARSHIPS & BURSARIES` — typical range, four named funders linked
7. `EDUCATION LOAN` — indicative monthly instalment
8. `TOTAL, YEAR ONE` — a range, on a `0.125rem --rule-strong`
9. **The conversion stamp** — source currency, rate, reference and date
10. **The stacked ₹ bar** — proportional, labelled in text
11. The verbatim ₹0 line, and the who-pays-us disclosure
12. Two CTAs
13. Footnotes on every figure

### 11.4 Draft copy

**H2:** `What it costs, in rupees, with the ranges shown.`

**Deck** (`--fs-deck`):
> *Pick three things and the page does the arithmetic. Every line is a range, every range has a source, and the total is a range too — because a single figure would be a guess dressed up as a quote.*

**Chip group labels:**
- `WHERE` — `UK` · `USA` · `Canada` · `Australia` · `New Zealand` · `Ireland` · `Germany`
- `WHAT` — `Bachelor's` · `Master's` · `MBA`
- `WHERE, EXACTLY` — `Capital city` · `Major city` · `Elsewhere`

**Worked example — United Kingdom · Master's · Elsewhere.** Currency amounts are the destination's own published figures; the rupee column is derived at a dated reference rate.

| Line | Source currency | In rupees | Ref |
|---|---|---|---|
| `TUITION, ONE YEAR` | `£9,000 – 30,000` | `₹9,63,000 – 32,10,000` | ⁷ |
| `LIVING, 12 MONTHS` | `£1,136 / month` | `₹14,58,600` | ⁷ |
| `STUDENT VISA` | `£524` | `₹56,300` | ⁷ |
| `IMMIGRATION HEALTH SURCHARGE` | `£776 / year` | `₹83,300` | ⁷ |
| `FOREX & REMITTANCE CHARGES` | `[VERIFY]` | `[VERIFY]` | — |
| `GIC DEPOSIT` | `— not applicable to the UK` | `—` | — |
| `MEDICAL INSURANCE` | `[VERIFY]` | `[VERIFY]` | — |
| `FLIGHTS, ONE WAY` | `[VERIFY]` | `[VERIFY]` | — |
| `LESS: SCHOLARSHIPS & BURSARIES` | `−£2,000 – 8,000 typical` `[VERIFY]` | `−₹2,14,000 – 8,56,000` | — |
| **`TOTAL, YEAR ONE`** | — | **`₹23,46,000 – 40,35,000`** | — |
| `EDUCATION LOAN, INDICATIVE` | `₹30,00,000 over 10 years` | `≈ ₹40,500 / month` † | — |

**The conversion stamp** (mono, beneath the total rule):
> `CONVERTED AT £1 = ₹107.00 · RBI REFERENCE RATE · [DATE] · RATES MOVE; YOUR BANK'S RATE ON THE DAY IS THE ONE THAT COUNTS.`

Publishing the source-currency figure **and** the rupee conversion **and** the rate **and** its date is the only honest way to print a rupee ledger for a foreign cost. A rupee figure with no rate attached is a claim that expires silently, which is exactly the failure mode this page exists to avoid.

**Scholarship line copy** (`--fs-body-sm`, beneath the row):
> Full-cost awards are rare and competitive — Chevening, Commonwealth Scholarships, Fulbright-Nehru and DAAD each fund a small number of Indian students each year, with deadlines eight to twelve months before the intake. Partial university bursaries are far more common and usually decided from your application with no separate form. Each funder is linked to its own page; we publish no total.

**Loan line copy** († dagger note):
> `† Illustrative only. ₹30,00,000 over 10 years at an indicative rate. Your actual rate depends on collateral, co-applicant income and the lender. We are paid nothing by any lender for showing you this line.`

**The verbatim line** (Newsreader italic, `--fs-quote`, `--marine`):
> *What Global Opportunities charges you: ₹0. Here is who pays us, and how.*

**The disclosure that follows it** (`--fs-body`):
> When you enrol at a partner university, that university pays us a recruitment fee. That is the standard arrangement in this industry and it is why counselling is free to you. It also creates an obvious question, so here is the answer: we will tell you which universities on your shortlist have an agreement with us and which do not, and we will keep universities on your list that pay us nothing when they are the right fit. If a counsellor pushes a university you did not ask about, ask them this question and ask for the answer in writing.

**CTAs:** `Get this costing on WhatsApp` (primary) and `Book free counselling` (secondary), with the canonical proof line beneath.
**CTA sub-label:** `The full costing, with sources, as a message you can forward.`

### 11.5 Layout

**Desktop ≥1280px.** `--content-max`, `padding-block: var(--section-y)`.

- Chapter opener: `IV` in the outer margin, rule across 1–12.
- H2 columns 1–8; deck columns 1–6.
- **Chip groups:** full width, three labelled rows stacked, chips wrapping within each row.
- **Ledger: columns 1–7.** Row label left, source-currency figure centre, rupee range right-aligned, footnote marker trailing. Rows ruled at `0.0625rem --rule`; the total sits above a `0.125rem --rule-strong`.
- **Bar and total panel: columns 9–12**, on a `--paper` panel with `--reg-marine` (`3px 3px 0 0 #14384A`) — the one place marine registration is used, because this is the institutional column.
- ₹0 line and disclosure: columns 1–8. CTAs: columns 1–6.

**Tablet 768–1023px.** Chips wrap across full width; ledger spans all twelve columns; the bar and total panel move **below** the ledger as a full-width block. Source-currency column is retained.

**Mobile <768px — structurally different.** Chips become three horizontally scrollable rows with `scroll-snap-type: x mandatory`, each chip ≥44px tall with `--s-3` inline padding; the scroll affordance is a visible fade at the row's right edge, not an arrow button. **Each ledger row becomes a two-line block**: line 1 is the label at `--fs-mono-label`; line 2 is the source figure left and the rupee range right, at `--fs-data`. The source-currency column is not dropped — it is what makes the conversion honest. The stacked bar becomes a 12px full-width horizontal bar with a **text legend list beneath it**, one line per segment with its percentage. Total is a full-width block above the bar.

### 11.6 Wireframe — desktop

```
 col  1    2    3    4    5    6    7    8    9   10   11   12      rail
   IV ─────────────────────────── 0.125rem --rule-strong ─────────
   CHOOSE
   What it costs, in rupees, with the ranges shown.
   /Pick three things and the page does the arithmetic./

   WHERE   (UK)(USA)(Canada)(Australia)(New Zealand)(Ireland)(Germany)
   WHAT    (Bachelor's)(Master's)(MBA)
   WHERE,  (Capital city)(Major city)(Elsewhere)
   EXACTLY        ▲ selected: --sienna-tint bg + 1px --sienna-press

   ┌─────────────────────────────────────────┐  ┌──────────────────┐
   │ TUITION, ONE YEAR                       │  │ TOTAL, YEAR ONE  │
   │   £9,000–30,000    ₹9,63,000–32,10,000⁷ │  │ ₹23,46,000       │
   │ LIVING, 12 MONTHS                       │  │       – 40,35,000│
   │   £1,136/mo        ₹14,58,600⁷          │  │ ────────────────  │
   │ STUDENT VISA                            │  │ ▉▉▉▉▉▉▉▉▉▓▓▓▓░░░ │ stacked ₹ bar
   │   £524             ₹56,300⁷             │  │ ▉ Tuition   58%  │ scaleX only
   │ IMMIGRATION HEALTH SURCHARGE            │  │ ▓ Living    36%  │
   │   £776/yr          ₹83,300⁷             │  │ ░ Fees       6%  │
   │ FOREX & REMITTANCE     [VERIFY]         │  │                  │
   │ GIC DEPOSIT      — not applicable to UK │  │ CONVERTED AT     │
   │ MEDICAL INSURANCE      [VERIFY]         │  │ £1 = ₹107.00     │
   │ FLIGHTS, ONE WAY       [VERIFY]         │  │ RBI REFERENCE    │
   │ ───────────────────────────────────────  │  │ RATE · [DATE]    │
   │ LESS: SCHOLARSHIPS  −₹2,14,000–8,56,000 │  └──────────────────┘
   │ ═══════════════════ 0.125rem --rule-strong    --reg-marine 3px
   │ TOTAL, YEAR ONE     ₹23,46,000–40,35,000│
   │ EDUCATION LOAN      ≈ ₹40,500 / month † │
   └─────────────────────────────────────────┘
   /What Global Opportunities charges you: ₹0. Here is who pays us,/
   /and how./
   When you enrol at a partner university, that university pays us a
   recruitment fee. That is the standard arrangement in this industry…

   ( Get this costing on WhatsApp )   Book free counselling
     The full costing, with sources, as a message you can forward.
     A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST.
                    surface --paper-tracing
```

### 11.7 Visual direction

Surface `--paper-tracing` (`#EDE5D7`) — the ledger bed, and the darkest light surface in the system. The section reads as a sheet of accounting paper laid onto the book.

- **Chips:** unselected — `--paper` fill, `1px --rule`, `--r-2`, `--fs-body-sm`, `--ink`. Selected — `--sienna-tint` fill, `1px --sienna-press`, `--ink`, with a mono `✓` prefix. Chips never animate size.
- **Row labels:** `--fs-mono-label`, `--ink-muted`.
- **All figures:** `--fs-data` (Plex Mono 400), `--ink`, `font-variant-numeric: tabular-nums lining-nums slashed-zero`. Right-aligned, so the digits column-align down the ledger — which is the entire visual argument of an accounting spread.
- **Row rules:** `0.0625rem --rule`. **Total rule:** `0.125rem --rule-strong`, drawn by DrawSVG on each recalculation.
- **Scholarship line:** the minus sign and figure in `--verdigris` — a subtraction in your favour is the page's verified-good state, and this is a legitimate second use of it.
- **`[VERIFY]` / not-applicable cells:** an em-dash in `--ink-muted`, never `0`, never a shimmer, never "TBD".
- **Stacked ₹ bar:** segments in `--marine`, `--marine-mid`, `--sienna`, `--rule-strong` and `--ochre`. **`--verdigris` is never a cost segment** — green means verified on this page and must not come to mean "money". Every segment is labelled in text beside the bar with its percentage; the bar is reinforcement, never the source.
- **Conversion stamp:** `--fs-mono-label`, `--ink-muted`, boxed in a `1px --rule` keyline at `--r-1`.
- **₹0 line:** Newsreader italic at `--fs-quote`, `--marine`, on its own with `--s-7` above and below. It is the most important sentence in the section and it is given the room a pull quote gets.
- `--r-0` on the ledger and panels; `--r-2` on chips; `--r-pill` on the CTA.

### 11.8 Imagery

**None, in v1 or v2.** A ledger with a photograph on it is a brochure, and the digits are the picture. The only graphic element is the stacked ₹ bar, which is data rather than decoration.

This is worth defending in review, because "the money section looks austere" is a predictable note. It is meant to. The austerity is what makes the numbers legible as numbers rather than as marketing, and it is the same argument that makes `still-page` (`02-sections-part1.md` § 7) work.

### 11.9 CTA placement & conversion note

**Primary: `Get this costing on WhatsApp`. Secondary: `Book free counselling`.** Both at the block foot, after the ₹0 disclosure.

- **Value first, gate second.** The CRO research is explicit: show the result on screen first, then offer the full report on WhatsApp. Interactive lead magnets convert at 30–40%+ against 3–5% for static PDFs, with ~85% completion against ~12% for whitepapers — but only when the result is not held hostage. The total is fully visible before any ask; the WhatsApp CTA offers the *sourced, forwardable* version, which is a genuinely better artifact and not a paywall.
- **The WhatsApp message is a forwardable object.** It carries the three chip selections, the total range, the conversion rate and its date, and a link back to this section. In a family decision that happens in a WhatsApp group, this is the format the decision is actually made in.
- **This is the calculator no competitor has.** IDP and Leverage Edu surface neither a named counsellor nor a cost calculator; both are unclaimed. Combined with the HSBC finding that education can consume up to 64% of retirement savings, the arithmetic is the single highest-value thing on this page for the buyer.
- **The ₹0 line converts by disarming.** The PG persona's stated fear is commission-steered recommendations. Answering it unprompted, with the mechanism named and a written-answer challenge issued to our own counsellors, is a stronger signal than any testimonial.
- **Recalculation never scrolls or jumps.** The ledger re-typesets in place with the chips still in view, so a visitor can run five scenarios without losing their position. Scroll-jacking a calculator is the fastest way to make it feel like a lead form.

### 11.10 Accessibility

- Landmark: `<section id="reckoning" aria-labelledby="reckoning-h2">`.
- Heading levels: **H2** for the section; **H3** for the disclosure block (`What we are paid, and by whom`).
- **Chips are native radios.** Three `<fieldset>` elements with `<legend>`, each containing `<input type="radio">` visually styled as chips. Native radios give keyboard operation, group semantics and screen-reader state announcement for free, and they degrade: the whole thing is a `<form method="get">` with a `Show the costing` submit button that Motion progressively enhances into live recalculation. **The calculator works with JavaScript disabled.**
- The ledger is a real `<table>` with `<caption>`, `<th scope="row">` per line, and a `<tfoot>` carrying the total, so the total is announced as a footer row rather than as another line item.
- **Ranges must not be read as two numbers.** `₹9,63,000–32,10,000` renders the en-dash visually and supplies `<span class="sr-only"> to </span>` between the bounds. The same applies to every currency range on the page.
- Recalculation announces once via a polite live region: `Costing updated. Total, year one: ₹23,46,000 to ₹40,35,000.` It must not announce per row, or a chip tap produces eleven interruptions.
- The stacked bar is `aria-hidden`; the text legend beside it is the accessible source.
- Contrast against `--paper-tracing` (`#EDE5D7`) is **not in the canon's table**: `--ink`, `--ink-muted`, `--marine`, `--verdigris` and `--clay` must all be measured against this surface and recorded before ship. `--ochre` appears only as a bar segment and is non-text.
- Touch targets: chips ≥44px tall, ≥48px on mobile; CTAs ≥48px.
- Screen-reader flow: heading 2 → deck → "Where, group" → seven radios → "What, group" → "Where exactly, group" → table caption → rows → footer total → conversion stamp → ₹0 line → disclosure heading → CTAs.

### 11.11 Motion cue

- **User-triggered, never scroll-triggered.** No ScrollTrigger instance exists in this section. The ledger animates only in response to a chip change.
- **Owner: Anime.js** — figures roll as tabular odometers inside fixed-width cells, so no cell resizes and CLS is structurally zero. Rows re-typeset line by line on a short stagger.
- **Owner: Motion** — the stacked bar is driven by `useMotionValue` + `useSpring` into `scaleX` **only**. Animated `width` is banned outright by the canon.
- **Owner: GSAP** — the total rule redraws via DrawSVG on each recalculation.
- All durations ≤ `--dur-5`. Reduced motion swaps every figure instantly with no roll and no rule draw. `05-motion-blueprint.md` § 11.

---

## 12. `eleven-months` — Your Next Eleven Months

> **Chapter:** V Apply · **Surface:** `--paper` · **Motion owner:** GSAP (the page's only pin), Anime.js (annotation leaders)

### 12.1 Purpose & UX objective

Eleven honest months on one ruled calendar line, annotated with GO's own documented durations and owners, carrying two visually distinct kinds of date: **ochre ticks** for GO's real, dated Application Days, and **sienna ticks** for cited third-party deadlines with a named source and a last-verified stamp. Three specimen documents are tipped in as typeset facsimiles with annotation leaders drawn to the one clause that matters. And in the margin, verbatim: *This is a real timeline. It is not a promise.* The section does two jobs at once that the category never does together — radical process transparency, and honest urgency — and it does the second one in a form that is FTC-clean by construction.

**Think:** "I now know what happens, in what order, how long each part takes, and who does it." **Feel:** the calm of a plan, and the mild alarm of a real date that is closer than expected — which is the only legitimate urgency there is. **Do:** find their intake, count backwards, and book a place at the Application Day in their city.

### 12.2 Story chapter

**V — Apply.** `[data-chapter="apply"]`, `--nr-opsz: 60`. Chapter opener: roman `V` in the margin, label `APPLY`.

### 12.3 Content hierarchy

1. Chapter opener — `V`, `APPLY`, chapter rule
2. **H2** — `Your next eleven months.`
3. Deck
4. **The calendar rule**, AUG → JUL, eleven month ticks
5. **Six process stages** with real durations and named owners
6. **Ochre ticks** — GO Application Days, eight cities, real dates
7. **Sienna ticks** — cited third-party deadlines, each with source and last-verified
8. **Three Plate B specimen sheets** — offer letter, CAS statement, visa vignette — with ochre annotation leaders
9. Visa-refusal policy, short form, linking to `for-parents`
10. **The margin note**, verbatim
11. Two CTAs
12. Footnotes

### 12.4 Draft copy

**H2:** `Your next eleven months.`

**Deck** (`--fs-deck`):
> *Durations below are ours, and they are what we actually observe. Dates below are of two kinds, marked differently: the ones we set, and the ones somebody else set and we have cited.*

**The six stages:**

| Stage | When | Duration | Owner |
|---|---|---|---|
| `RESEARCH & SHORTLIST` | 2–3 years before the intake, or now if you are late | ongoing | `YOU + COUNSELLOR` |
| `APPLICATIONS` | 8–9 months before the intake window | 4–8 weeks | `COUNSELLOR` |
| `ENTRANCE & ENGLISH TESTS` | concurrent with applications | 6–12 weeks | `YOU` |
| `UNIVERSITY DECISION` | after submission | `3–4 MONTHS` | `THE UNIVERSITY` |
| `VISA` | after the offer is unconditional | `2–3 MONTHS` | `COUNSELLOR + VISA TEAM` |
| `ARRIVAL & PART-TIME WORK` | from the intake date | `20 HRS/WEEK TERM · 40 HRS HOLIDAYS (UK)` | `YOU` |

**Ochre ticks — GO Application Days** (on-site admission events; `[VERIFY YEAR AND CONFIRM EACH DATE BEFORE SHIP]`):
`PUNE 7 AUG` · `MUMBAI 8 AUG` · `DELHI 9 AUG` · `AMRITSAR 10 AUG` · `LUDHIANA 11 AUG` · `CHANDIGARH 12 AUG` · `HYDERABAD 13 AUG` · `CHENNAI 17 AUG`

Tick label copy: `GO APPLICATION DAY · PUNE · 7 AUG · ON-SITE DECISIONS · FREE`

**Sienna ticks — cited third-party deadlines.** Each renders as `DEADLINE · [WHAT] · [DATE] · SOURCE: [BODY] · LAST VERIFIED [DATE]`:

- `GERMANY · WINTER SEMESTER APPLICATION · 15 JULY · SOURCE: [NAMED AND LINKED] · LAST VERIFIED [DATE]`
- `UNITED KINGDOM · UCAS EQUAL-CONSIDERATION DEADLINE · [VERIFY DATE] · SOURCE: UCAS · LAST VERIFIED [DATE]`
- `AUSTRALIA · FEBRUARY INTAKE CLOSES · OCT–DEC PRIOR · SOURCE: [NAMED AND LINKED] · LAST VERIFIED [DATE]`
- `UNITED STATES · SPRING INTAKE CLOSES · SEP–NOV PRIOR · SOURCE: [NAMED AND LINKED] · LAST VERIFIED [DATE]`

**The two tick types must be legible as two types without colour.** Ochre ticks carry the prefix `GO ·`; sienna ticks carry the prefix `DEADLINE ·` and their source. A colour-blind reader, a printed page and a screen reader all get the distinction.

**The three specimen sheets — Plate B:**

| Specimen | The one clause the leader points to | Annotation copy |
|---|---|---|
| `OFFER LETTER` | the conditions clause | `A conditional offer is not an admission. This clause is the list of things that must still be true — usually final marks, an English score, or a deposit.` |
| `CAS STATEMENT` | the CAS number and the course start date | `The CAS is issued once, it has a number, and it expires. The start date on it must match the visa you apply for.` |
| `VISA VIGNETTE` | the travel window | `The vignette is valid for a fixed window. You must travel inside it. [VERIFY — the UK has moved to eVisas; confirm the current document and its wording before this specimen ships.]` |

Every specimen carries the stamp `SPECIMEN · ILLUSTRATIVE · NOT A STUDENT RECORD` and `██████` redaction blocks where a real document would carry personal data.

**Visa-refusal short form:**
> Visas are refused, and no consultant can promise you one. If it happens we get the notice, read the ground it cites, and tell you honestly whether it is answerable — then re-apply, appeal, or move you to the next intake. `The full policy is in the parents' chapter →`

**The margin note, verbatim:**
> *This is a real timeline. It is not a promise.*

**CTAs:** `Book a place at an Application Day` (primary) and `Book free counselling` (secondary), with the canonical proof line.
**Primary CTA sub-label:** `Free. On-site decisions. Eight cities.`

### 12.5 Layout

**Desktop ≥1024px — the page's only pinned section.**

- The section pins and tweens horizontally: track width ≈ 11 month-columns, pin duration `end: "+=300%"`, `ease: "none"`, `scrub: 0.6`, `anticipatePin: 1`.
- The **calendar rule** runs horizontally at ~62% of the viewport height, `0.125rem --rule-strong`.
- **Month ticks** hang below the rule at `0.0625rem --rule`, labelled `AUG SEP OCT NOV DEC JAN FEB MAR APR MAY JUL` at `--fs-mono-label`.
- **Stage bars** sit above the rule, each spanning its real duration, labelled with stage, duration and owner.
- **Ochre and sienna ticks** rise from the rule with their labels stacked above, alternating high and low to avoid collision.
- **Three Plate B specimens** are tipped in at roughly months 3, 6 and 10, alternating above and below the rule, each at 4:5 with `--reg-sienna` and an ochre annotation leader drawn to its clause.
- The margin note sits in the marginalia rail, fixed, visible for the whole pin.

**Tablet 768–1023px — static vertical list.** No pin. Eleven month blocks stacked, each carrying its stage bars and any ticks that fall in it; the three specimens render inline at the months they belong to, at 4:5. The calendar rule becomes a vertical hairline down the left of the block stack with ticks projecting right.

**Mobile <768px.** The same static vertical list, tighter: specimens at 4:5 full width, month labels as sticky-free ruled dividers, tick labels wrapping to two lines. Row-level touch targets ≥44px where a tick links to its source.

### 12.6 Wireframe — desktop (pinned horizontal)

```
 V  APPLY ──────────────────────── 0.125rem --rule-strong ─────────  rail
 Your next eleven months.                                            ┌──────┐
 /Durations below are ours, and they are what we actually observe./   │/This/ │
                                                                     │/is a/ │
   ┌────────────┐        ┌──────────────┐                            │/real/ │
   │ PLATE B    │        │ PLATE B      │                            │/time-/│
   │ OFFER      │        │ CAS          │                            │/line./│
   │ LETTER     │        │ STATEMENT    │                            │/It is/│
   │ ████ ████  │        │ ████  ████   │                            │/not a/│
   │ ┈┈┈▶conditions      │ ┈┈┈▶CAS no.  │                            │/prom-/│
   │ SPECIMEN·ILLUS…     │ SPECIMEN·…   │                            │/ise./ │
   └────────────┘        └──────────────┘                            └──────┘
 ┌ RESEARCH & SHORTLIST ┐┌ APPLICATIONS ┐┌TESTS┐┌ UNIVERSITY DECISION ┐┌VISA┐
 │ YOU + COUNSELLOR     ││ COUNSELLOR   ││ YOU ││ THE UNIVERSITY      ││ … │
 └──────────────────────┘└──────────────┘└─────┘└─────────────────────┘└────┘
════╪═════╪═════╪═════╪═════╪═════╪═════╪═════╪═════╪═════╪═════╪═══════
   AUG   SEP   OCT   NOV   DEC   JAN   FEB   MAR   APR   MAY   JUL
    ▮     ▮                       ▮                             ▮
   GO ·  GO ·                   DEADLINE ·                   DEADLINE ·
   PUNE  MUMBAI                 AUSTRALIA FEB               GERMANY WINTER
   7 AUG 8 AUG                  INTAKE CLOSES               SEMESTER
   ON-SITE                      SOURCE: […]                 15 JULY
   DECISIONS                    LAST VERIFIED […]           SOURCE: […]
   ▮ = --ochre tick (GO)        ▮ = --sienna tick, --clay label (third-party)
                                          ┌───────────────┐
                                          │ PLATE B       │
                                          │ VISA VIGNETTE │
                                          └───────────────┘
  ( Book a place at an Application Day )   Book free counselling
    Free. On-site decisions. Eight cities.
  PIN: end "+=300%" · ease none · scrub 0.6 · anticipatePin 1 · ≥1024px ONLY
```

### 12.7 Wireframe — mobile (<768px, static vertical)

```
┌─ 390 ───────────────────────────────┐
│ V  APPLY                            │
│ Your next eleven months.            │
│ /Durations below are ours…/          │
│ /This is a real timeline. It is not/ │  margin note becomes inline
│ /a promise./                         │  italic, before the calendar
├─┬───────────────────────────────────┤
│ │ AUG                               │
│ │ ▮ GO · PUNE · 7 AUG               │  ≥44px
│ │   ON-SITE DECISIONS · FREE        │
│ │ ▮ GO · MUMBAI · 8 AUG             │
│ │ ┌───────────────────────────────┐ │
│ │ │ RESEARCH & SHORTLIST          │ │
│ │ │ YOU + COUNSELLOR · ongoing    │ │
│ │ └───────────────────────────────┘ │
├─┼───────────────────────────────────┤
│ │ SEP …                             │
├─┼───────────────────────────────────┤
│ │ DEC                               │
│ │ ┌───────────────────────────────┐ │
│ │ │ PLATE B · OFFER LETTER   4:5  │ │
│ │ │ ████████  ████                │ │
│ │ │ ┈┈┈▶ conditions clause        │ │
│ │ │ SPECIMEN · ILLUSTRATIVE ·     │ │
│ │ │ NOT A STUDENT RECORD          │ │
│ │ └───────────────────────────────┘ │
│ │ /A conditional offer is not an/    │
│ │ /admission…/                       │
└─┴───────────────────────────────────┘
   vertical hairline = the calendar rule, rotated
```

### 12.8 Visual direction

Surface `--paper`.

- Calendar rule: `0.125rem --rule-strong`, horizontal, spanning the full track.
- Month ticks: `0.0625rem --rule`; labels `--fs-mono-label`, `--ink-muted`.
- Stage bars: `1px --rule-strong` keyline on `--paper-tracing`, `--r-1`; stage name at `--fs-mono-label` `--ink`; duration at `--fs-data`; owner at `--fs-mono-label` `--ink-muted`.
- **Ochre ticks (GO):** 2px `--ochre` mark; label text in `--ink` — **never in ochre**, which is 2.1:1 and non-text only.
- **Sienna ticks (third-party):** 2px `--sienna` mark; **label text in `--clay` (6.1:1)**, which the canon assigns precisely to real external deadlines. Mark colour and label colour differ by design: the mark belongs to the accent system, the label belongs to the semantic system.
- **Plate B specimens:** `--paper-tracing` field, `1px --rule` keyline, `--r-1`, hairline document rules, mono field labels, `██████` redaction blocks in `--rule-strong`, and the `SPECIMEN · ILLUSTRATIVE · NOT A STUDENT RECORD` stamp at `--fs-mono-label` in `--clay` inside a `1px --clay` box. `--reg-sienna` registration offset.
- **Annotation leaders:** 1px `--ochre` line terminating in a 4px `--ochre` dot on the clause; the annotation text sits in an `--ochre-tint` well with `--ink` type.
- Margin note: Newsreader italic at `--fs-deck`, `--ink-muted`, in the rail.
- No shadows, `--r-0` on the rule and ticks, `--r-1` on plates and stage bars.

### 12.9 Imagery

**Plate B — Specimen Sheet, ×3.** HTML and SVG facsimiles of an offer letter, a CAS statement and a visa vignette, on `--paper-tracing`, with honest redaction blocks and an annotation leader to the one clause that matters.

**v2: permanent.** No photograph replaces a Plate B, for two reasons that are both decisive on their own. First, an atlas reproduces facsimiles — this is the most on-brand image treatment in the whole system. Second, a photograph of a real offer letter or CAS is personal data belonging to a student, and publishing one creates DPDP exposure with no upside; the redaction blocks would have to cover the interesting parts anyway.

**One additional plate is permitted at the chapter opener**: a **Plate A** at 16:9 carrying the Delhi South coordinates and the hour, which in v2 may take a commissioned photograph of a counsellor's desk mid-call — files, a phone, a screen — from the concept's third subject family.

### 12.10 CTA placement & conversion note

**Primary: `Book a place at an Application Day`, routed to `#enquiry` with the nearest city pre-selected. Secondary: `Book free counselling`.**

- **This section is the page's entire honest-urgency argument.** The FTC's 2022 dark-patterns report names resetting countdowns and invented scarcity as §5 deceptive. The three permitted mechanics are real published third-party deadlines with the source named and linked, the company's own dated events, and real scheduler availability. This section runs the first two **side by side and labels which is which** — the ochre/sienna split is a *disclosure*, not decoration. No competitor discloses the provenance of its deadlines because no competitor's deadlines have any.
- Application Days are the strongest urgency device GO owns: real, dated, city-specific, free, and resulting in an on-site decision. They convert a diffuse "sometime" into a Saturday.
- The margin note — *This is a real timeline. It is not a promise.* — is a conversion device, not a disclaimer. In a category where every rival promises, the sentence that refuses to is the one that gets believed.
- Placement is deliberate: `eleven-months` sits **after** `reckoning`. A visitor who has seen the number needs to know how long they have, and a visitor who sees the calendar first has no reason to care about it.

### 12.11 Accessibility

- Landmark: `<section id="eleven-months" aria-labelledby="eleven-months-h2">`.
- Heading levels: **H2** for the section, **H3** per stage, **H4** per specimen sheet.
- **The semantic source is a vertical `<ol>` at every breakpoint.** At ≥1024px it is visually transformed into the horizontal track; the DOM is not reordered. This means keyboard order is natural, the pin cannot trap anyone, and the mobile and desktop experiences are the same document. It is the single most important structural decision in this section.
- Under `prefers-reduced-motion`, **the pin is not created at all** — `gsap.matchMedia()`'s reduce branch returns without registering it, and the vertical list renders. Reduced motion must never hide content.
- Each specimen is a `<figure>` with a `<figcaption>`; the annotation is real text in the caption, not a tooltip. The `██████` blocks are `aria-hidden` with an `sr-only` note reading `personal details redacted`.
- The stamp text is real, focusable-adjacent text and is announced — it is the sentence that makes the facsimile honest.
- **Tick type is never conveyed by colour alone**: `GO ·` and `DEADLINE ·` prefixes carry it in text.
- Every third-party date's source is a real anchor with the last-verified date in its accessible name.
- Contrast: `--clay` 6.1:1 on `--paper`; `--ink` 17:1; `--ochre` non-text only; `--clay` on `--paper-tracing` (the stamp) must be measured and recorded.
- Touch targets: ticks that link to sources are ≥44px; CTAs ≥48px on mobile.
- Screen-reader flow: heading 2 → deck → margin note → ordered list of eleven months → within each, stages and ticks in date order → specimens with captions → refusal note → CTAs.

### 12.12 Motion cue

- **Owner: GSAP. This is the page's only pinned section, ≥1024px only.** Horizontal `x` tween with `ease: "none"`, `scrub: 0.6`, `anticipatePin: 1`; child reveals fire through `containerAnimation` rather than their own scroll positions.
- **Owner: Anime.js** for the three annotation leaders, drawn via `createDrawable`, dynamically imported at the section boundary inside `createScope({ root })`.
- **Never two pins active.** No other section on the page pins, which is what makes this one affordable inside the ≤14 ScrollTrigger budget.
- Reduced motion and <1024px both render the static vertical list with everything drawn. `05-motion-blueprint.md` § 12 owns the pin arithmetic, the `containerAnimation` map and `invalidateOnRefresh` behaviour.

---

## 13. `endpaper` — The Endpaper

> **Chapter:** VI Success · **Surface:** `--endpaper` (`#0E2029`), entered via a 30vh `--grad-endpaper-turn` band · **Motion owner:** GSAP (scrubbed backdrop), Anime.js (counters)

### 13.1 Purpose & UX objective

The paper inverts. This is the page's **one** dark surface, and it is earned narratively rather than used for contrast: an atlas has endpapers, they are the darkest sheet in the book, and they are where the plates live. The section carries named students with their universities, years and counsellors; institutional testimonials from the partner universities themselves; and four cited count-ups. It is the last and largest block of evidence before the ask, and the reason the inversion works is that the reader has been on cream for thirteen sections and has earned a change of register.

**Think:** "Real people, with names and universities, and the universities say the same thing back." **Feel:** arrival — the visual sensation of turning to the back of a book. **Do:** read two or three plates, register the institutional quotes, and carry that into the questions and the form.

### 13.2 Story chapter

**VI — Success.** `[data-chapter="success"]`, `--nr-opsz: 72` — the display axis returns to its widest, matching the hero, which is how the page's first and last chapters rhyme. This attribute also switches `:focus-visible` to `--ochre-on-dark`.

### 13.3 Content hierarchy

1. The 30vh turn band — `--grad-endpaper-turn` on one fixed backdrop element
2. Chapter opener — `VI`, `SUCCESS`
3. **H2** — `Forty thousand people have already done this.`
4. Deck
5. **Three named-student Plate C cartouches**, each with a verbatim quote
6. **Five institutional testimonials** — partner universities speaking about GO
7. **Four cited count-ups** — `25 YEARS¹` · `40,000+ STUDENTS PLACED²` · `700+ PARTNER UNIVERSITIES³` · `47 PUBLISHED TESTIMONIALS⁶`
8. Lateral link — `Read all 47 testimonials →`
9. Footnotes, rendered on dark

### 13.4 Draft copy

**H2:** `Forty thousand people have already done this.`

**Deck** (`--fs-deck`):
> *Named students, named universities, named counsellors. Where a partner institution has said something about us, we print that too — it is rarer and it is harder to arrange than a student quote.*

**The three student plates:**

| Monogram | Student | Destination | Counsellor | Quote |
|---|---|---|---|---|
| `RP` | Rittik Panchal | Master's, United Kingdom | Avinash | "Global Opportunities has been a great support in my journey to study in the UK in masters." |
| `VS` | Vanshika Sheel | German public university | Nivesh Bisht, GK office | "My consultant, NIVESH BISHT was not just professional and knowledgeable, but also incredibly friendly and approachable." |
| `SK` | Simarpreet Kaur | Centennial College, Canada | Jasmeet Kaur | "They have been a great support throughout. Super active and especially super consistent." |

**The five institutional testimonials** — set as a ruled list, institution named, quote `[VERIFY — pull verbatim from GO's published testimonial pages before ship]`:

- `UNIVERSITY OF AUCKLAND` — `[VERBATIM QUOTE]`
- `RMIT UNIVERSITY` — `[VERBATIM QUOTE]`
- `NATIONAL COLLEGE OF IRELAND` — `[VERBATIM QUOTE]`
- `ST. GEORGE'S UNIVERSITY` — `[VERBATIM QUOTE]`
- `WESTERN INSTITUTE OF TECHNOLOGY AT TARANAKI` — `[VERBATIM QUOTE]`

**Framing line above the institutional block** (`--fs-body`, `--plate-grey`):
> These are the other side of the transaction. A student saying we were helpful is common; a partner university saying it is not.

**The four count-ups**, each with its canonical footnote marker, set as a stacked mono block:
`25 YEARS¹` · `40,000+ STUDENTS PLACED²` · `700+ PARTNER UNIVERSITIES³` · `47 PUBLISHED TESTIMONIALS⁶`

**Lateral link:** `Read all 47 testimonials →`

**Closing microcopy** (`--fs-body-sm`, `--plate-grey`):
> Forty named students and seven partner institutions are published with their names, and where they gave them, their university and their counsellor. We do not publish a star rating, and we do not mark these up for search engines.

That last clause is a real design constraint made visible: Google's policy makes entities that control their own reviews ineligible for star treatment, so the page **never emits `AggregateRating` or `Review` structured data** and instead displays the reviews visually and links to the Google Business Profile.

### 13.5 Layout

**Desktop ≥1280px.** `--content-max`, `padding-block: var(--section-y)`.

- **The turn band** is a 30vh strip immediately above the section, painted on a single fixed backdrop `<div>`. **No element moves through it** — the background colour tweens; the content does not translate.
- Chapter opener `VI` in the outer margin, `SUCCESS` label; H2 columns 1–8; deck columns 1–6.
- **Three student plates:** each spanning 4 columns, side by side, Plate C at 4:5 with the data block and quote beneath.
- **Institutional block:** columns 1–7, five ruled rows.
- **Count-ups:** columns 9–12, a stacked block of four, each figure at `--fs-figure` above its label at `--fs-mono-label`.
- Marginalia rail rendered on dark: `--plate-rule` divider, `--plate-grey` text.

**Tablet 768–1023px.** Student plates go two-up then one; institutional block full width; count-ups become a 2 × 2 grid beneath.

**Mobile <768px.** Single column. Student plates use the same re-composed cartouche as `contributors` — 96×120 monogram floated left of the data block, quote beneath. Institutional rows stack at ≥56px. Count-ups become a **2 × 2 grid**, which keeps all four on one screen; four stacked rows would push the last one below the fold and count-ups only work as a group.

### 13.6 Wireframe — desktop

```
 ░░░░░░░░░░░░ 30vh --grad-endpaper-turn band ░░░░░░░░░░░░░░░░░░░░░░░░
 ▒▒▒▒▒▒▒▒▒▒▒▒ #FBF8F2 → #1B3240 → #0E2029 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 ████████████ one fixed backdrop div · NO element moves ████████████

 col  1    2    3    4    5    6    7    8    9   10   11   12      rail
  VI ────────────────────────────────────────────────────────────
  SUCCESS                                                          ┌──────┐
  Forty thousand people have already done this.                    │¹ Fou-│
  /Named students, named universities, named counsellors./          │ nded │
                                                                   │ 2001…│
  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐      │² The │
  │ ┌─────────────┐ │ │ ┌─────────────┐ │ │ ┌─────────────┐ │      │ most │
  │ │     RP      │ │ │ │     VS      │ │ │ │     SK      │ │      │ cons-│
  │ │  --endpaper-2│ │ │ │             │ │ │ │             │ │      │ erva-│
  │ └─────────────┘ │ │ └─────────────┘ │ │ └─────────────┘ │      │ tive…│
  │ RITTIK PANCHAL  │ │ VANSHIKA SHEEL  │ │ SIMARPREET KAUR │      └──────┘
  │ MASTER'S, UNITED│ │ GERMAN PUBLIC   │ │ CENTENNIAL      │
  │ KINGDOM         │ │ UNIVERSITY      │ │ COLLEGE, CANADA │
  │ COUNSELLOR:     │ │ COUNSELLOR:     │ │ COUNSELLOR:     │
  │ AVINASH         │ │ NIVESH BISHT    │ │ JASMEET KAUR    │
  │ /"…a great supp-/│ │ /"My consultant,/│ │ /"They have been/│
  │ /ort in my jour-/│ │ /NIVESH BISHT…"/ │ │ /a great support/│
  │ /ney to study…"/ │ │                 │ │ /throughout…"/   │
  └─────────────────┘ └─────────────────┘ └─────────────────┘
  These are the other side of the transaction.        ┌──────────────┐
  ────────────────────────────────────────            │ 25           │
  UNIVERSITY OF AUCKLAND     /"…"/                     │ YEARS¹       │
  ────────────────────────────────────────            │ 40,000+      │
  RMIT UNIVERSITY            /"…"/                     │ STUDENTS     │
  ────────────────────────────────────────            │ PLACED²      │
  NATIONAL COLLEGE OF IRELAND /"…"/                    │ 700+         │
  ────────────────────────────────────────            │ PARTNER      │
  ST. GEORGE'S UNIVERSITY    /"…"/                     │ UNIVERSITIES³│
  ────────────────────────────────────────            │ 47           │
  WESTERN INSTITUTE OF TECH. /"…"/                     │ PUBLISHED    │
  ────────────────────────────────────────            │ TESTIMONIALS⁶│
  Read all 47 testimonials →                          └──────────────┘
  surface --endpaper #0E2029 · grain SUPPRESSED · focus ring --ochre-on-dark
```

### 13.7 Visual direction

Surface `--endpaper` (`#0E2029`), entered through the 30vh `--grad-endpaper-turn` band and exited into `questions` through the 24vh `--grad-endpaper-return` band.

- **Type:** `--plate-white` (`#F0EAE0`, ~15:1) for headings, names and quotes; `--plate-grey` (`#A8A096`, 6.4:1) for captions, labels and secondary prose.
- **Rules:** `--plate-rule` (`#2A3E48`) at the same hairline weights used on light — `0.0625rem` and `0.125rem`.
- **Accents:** `--sienna-on-dark` (`#E0794A`, 7.0:1) for the chapter numeral, footnote markers and links; `--ochre-on-dark` (`#E8B75C`, 9.4:1) for the focus ring, set by `[data-chapter="success"] :focus-visible`; `--verdigris-on-dark` (`#6FA98F`, 7.3:1) for any verified mark.
- **Plate C on dark:** field `--endpaper-2` (`#142E3A`) — the raised-surface token — with a `1px --plate-rule` keyline, the monogram at 5rem Newsreader in `--plate-white`, and the contour ring in `--plate-rule`. The registration offset stays **`--reg-sienna`** (`3px 3px 0 0 #C2562B`): sienna against `#0E2029` is a clearly visible non-text mark, and inventing a dark-mode registration token would break the six-shadow-recipe rule.
- **Count-ups:** `--fs-figure` (Plex Mono 500, tabular) in `--plate-white`, labels at `--fs-mono-label` in `--plate-grey`, markers in `--sienna-on-dark`.
- **The paper grain tile is suppressed on this section.** It is applied with `mix-blend-mode: multiply`, which is a visual no-op over a near-black field but still costs a composite pass. `[data-chapter="success"] { background-image: none; }` for the grain layer.
- **This section renders dark in both light and dark OS themes.** It is an editorial inversion, not a response to `prefers-color-scheme`, and it must not become one.
- `--r-0` everywhere except `--r-1` on the plates. No shadow — the dark surface is not an excuse to reintroduce elevation.

### 13.8 Imagery

**Plate C — Portrait Cartouche, ×3**, rendered on `--endpaper-2` with the student's initials as a monogram.

**v2 — the one deliberate exception to the "photography replaces the plate" rule.** Student portraits **do not** replace these monograms by default. A testimonial photograph is personal data about a named individual, and the DPDP Rules are enforceable from May 2027; publishing a student's face on a marketing landing page requires that student's fresh, purpose-specific, logged consent naming this page, plus a removal path. Where such consent exists, the photograph drops into the identical 4:5 field with no other change. Where it does not, **the monogram is the shipped state permanently and nothing about the layout betrays that a photograph was ever expected.**

**Never here:** stock photographs of students, AI-generated faces, graduation caps, or a "happy graduate" carousel.

### 13.9 CTA placement & conversion note

**No primary CTA in this section.** One lateral link (`Read all 47 testimonials →`) and the Google Business Profile link in the closing microcopy.

- The ask comes 400px later, in `questions` → `enquiry`. NN/g's ordering — evidence, then request — is at its most valuable here, because this is the largest evidence block on the page and spending it on a button placed *inside* the inversion would waste the one moment the page changes colour.
- **Counters are server-rendered at their final values** (canon build note 5) and animate only their last 12%. GO's current site renders animated counters as literal `0` without JavaScript; on the target device class that bug would land exactly here, in the section whose entire job is proof, and would turn "40,000+ students placed" into "0 students placed" for a share of real visitors. Making that structurally impossible is a conversion decision, not a technical one.
- **Institutional testimonials are the highest-value asset in the section and are placed to be read second**, after the student plates. Two-sided validation — the university vouching for the agency — is rare, hard to fake and extremely persuasive to the parent persona, who discounts student testimony as coachable.
- No star rating, no aggregate score, no `Review` markup. The page displays reviews visually and links out; per Google's policy, self-served review markup is ineligible for stars anyway, so emitting it would be risk with no return.

### 13.10 Accessibility

- Landmark: `<section id="endpaper" aria-labelledby="endpaper-h2">`.
- Heading levels: **H2** for the section; **H3** per named student; **H3** for the institutional block heading (`What partner universities say`, rendered as the framing line).
- All quotes are `<blockquote>` with `<cite>` carrying student, university and counsellor — or institution, for the five partner quotes.
- Contrast on `--endpaper`: `--plate-white` ~15:1, `--plate-grey` 6.4:1, `--sienna-on-dark` 7.0:1, `--ochre-on-dark` 9.4:1, `--verdigris-on-dark` 7.3:1. Every value is AA or better and most are AAA; this is the best-contrasted section on the page.
- **Focus ring switches to `--ochre-on-dark`** via the `[data-chapter="success"]` rule. Verify the ring is visible against both `--endpaper` and `--endpaper-2`.
- Count-ups use `<StatFigure>` with `aria-live` explicitly **off**; a counter animating inside a live region would announce dozens of intermediate values.
- Monograms are `aria-hidden`; the accessible name comes from the `<h3>`.
- The 30vh turn band is `aria-hidden` decorative backdrop with no content.
- Touch targets: the lateral link and the five institutional source links are padded to ≥44px.
- Screen-reader flow: heading 2 → deck → "Rittik Panchal, heading level 3" → data → blockquote → cite → ×3 → framing line → five institutional blockquotes → four figures with footnote markers → link → closing microcopy.

### 13.11 Motion cue

- **Owner: GSAP.** One scrubbed background tween across the 30vh `--grad-endpaper-turn` band, applied to **a single fixed backdrop `<div>`** — **no element moves**. This is the cheapest possible implementation of the page's most dramatic moment and it produces zero layout work.
- **Owner: Anime.js.** The four counters are server-rendered at final value and animate **only the last 12%**, once, in tabular-locked cells so nothing reflows. Dynamically imported at the section boundary.
- Plate reveals are a once-only opacity change; there is no stagger theatre in the section that carries the page's proof.
- Reduced motion: the backdrop is set to its final colour immediately and the counters render at final value with no roll. `05-motion-blueprint.md` § 13.

---

## 14. `questions` — Questions People Actually Ask

> **Chapter:** VI Success · **Surface:** `--paper`, entered via a 24vh `--grad-endpaper-return` band · **Motion owner:** CSS only — **zero JavaScript**

### 14.1 Purpose & UX objective

Kill the last objections immediately before the ask. Ten questions, in the words people actually use, with complete answers that do not dodge: what you charge, who pays you, what happens when a visa is refused, whether scholarships are real, what a year costs, which intake, IELTS scores, work rights, and what is expected of the parent. The section is built from native `<details>` elements with a CSS grid transition and **no JavaScript at all**, which means it works on the slowest device on the worst connection and is fully indexable — the answers exist in the server HTML for search engines and for AI answer retrieval, which is the only remaining payoff now that FAQ rich results are deprecated.

**Think:** "They answered the awkward one without being asked." **Feel:** the end of hesitation. **Do:** open two or three, then use the CTA at the block foot, which hands straight to the form.

### 14.2 Story chapter

**VI — Success**, second beat. `[data-chapter="success"]`, `--nr-opsz: 72`. The page returns from dark to `--paper` through the 24vh `--grad-endpaper-return` band at the top of this section.

### 14.3 Content hierarchy

1. The 24vh return band — `--grad-endpaper-return`
2. Running head — `QUESTIONS`
3. **H2** — `Questions people actually ask.`
4. Deck
5. **Ten `<details>` disclosures**, each with an H3 inside its `<summary>`
6. Closing CTA block — `Book free counselling` + proof line
7. `FAQPage` JSON-LD, emitted from the same source data as the visible content
8. Footnotes where an answer carries a figure

### 14.4 Draft copy — the ten questions, with complete answers

**H2:** `Questions people actually ask.`

**Deck** (`--fs-deck`):
> *These are the ten we are asked most often, including the three we would rather not be asked. The answers are complete; nothing here is a teaser for a phone call.*

---

**1. Why use a consultant at all? I could apply myself.**

You could, and some people should. A consultant earns their place when you are applying to more than two or three universities, when the application, the money and the visa have to line up on one calendar, or when a refusal would cost you a year. What we add is a person who has filed this exact application before, institutional relationships that let us ask a university a direct question and get a direct answer, and a file that is checked by someone else before it is submitted. What we do not add is influence: no consultant can make an admissions committee or a visa officer decide differently, and anyone who implies otherwise is selling you something that does not exist.

---

**2. What does Global Opportunities charge me?**

₹0. Counselling, profile shortlisting, course selection, applications, documentation and visa filing are free to you. Four things on our list of fifteen services are third-party costs — forex, medical insurance, the GIC deposit for Canada, and accommodation — and we pass those through at the provider's price with nothing added. The full line-by-line accounting, service by service, is printed further up this page. `See the fifteen services and what each costs →`

---

**3. Then who pays you?**

The university does, when you enrol. Partner institutions pay a recruitment fee to accredited agencies; that is the standard model across international education, and it is why counselling can be free to you.

It also creates an obvious conflict, so here is how we handle it. We will tell you which universities on your shortlist have an agreement with us and which do not. We will keep universities on your list that pay us nothing when they are the right fit for you. And if a counsellor ever pushes a university you did not ask about, ask them this exact question and ask for the answer in writing — from us or from anyone else.

---

**4. What happens if my visa is refused?**

Visas are refused. Nobody can promise you one, and you should be careful of anyone who does — every competitor publishes a visa success percentage, and independent guidance to parents treats that specific claim as a warning sign. You will not find a percentage anywhere on this page.

If a refusal happens, this is what we do. We obtain the refusal notice. We read the exact ground it cites, because the ground determines everything that follows. We then tell you honestly whether it is answerable. If it is, we re-apply or appeal within the time limit. If it is not, we move the application to the next intake or to a different country. University deposits are recovered where that university's own refund policy allows, and we will tell you what that policy says before you pay anything. We do not charge you again for any of this. `[VERIFY — confirm the refund and re-application policy with GO before ship.]`

---

**5. What will one year actually cost?**

Between roughly ₹25 lakh and ₹55 lakh, depending on the country, the city and the course. For a Master's in the UK outside London, tuition runs £9,000–£30,000 a year, living costs about £1,136 a month, the student visa is £524 and the Immigration Health Surcharge is £776 a year. The costing further up this page converts all of it into rupees at a dated reference rate, shows a range on every line, subtracts a realistic scholarship band and adds an indicative loan instalment.

We do not publish a single number. A single number is always wrong, and the exchange rate alone moves it by lakhs over the months between your first call and your first fee payment. `Open the costing →`

---

**6. Are scholarships realistic, or is that marketing?**

Both, depending on which kind you mean.

Full-cost awards are real but rare and extremely competitive. Chevening, Commonwealth Scholarships, Fulbright-Nehru and DAAD each fund a small number of Indian students each year, and their deadlines fall eight to twelve months before the intake — usually before most people have even shortlisted. Each of those four is linked to its own page from the costing above; apply directly, and do not pay anyone to apply on your behalf.

Partial university bursaries and merit awards are far more common and far more winnable — often a few thousand pounds off tuition — and they are usually decided from your application itself, with no separate form. We will tell you which of the two categories you are actually a candidate for, and we will say so plainly if the answer is neither.

We do not publish a total rupee figure of "scholarships won", because that number cannot be audited and every figure on this page can be.

---

**7. Which intake should I apply for, and when do I start?**

Work backwards from the intake, never forwards from today.

The main windows: **United Kingdom** — September/October, with a smaller January/February intake and a few May/June programmes. **Canada** — Fall (September) primary, Winter (January), a limited Summer. **Australia** — February primary, July secondary. **Germany** — the winter semester, with a 15 July application deadline.

Then count backwards. Applications go in 8–9 months before the intake begins. University decisions take 3–4 months. The visa takes 2–3 months. Entrance and English tests run concurrently with the applications, not after them. If you are aiming at September 2027, the useful month to start is this one. The eleven-month calendar above sets all of it out with the real durations. `Open the calendar →`

---

**8. Do I need IELTS, and what score?**

Usually yes, sometimes no.

Most universities in the UK, Australia, New Zealand, Canada and Ireland require proof of English, and IELTS, PTE and TOEFL are the commonly accepted tests. Typical requirements sit around 6.0–6.5 overall for undergraduate study and 6.5–7.0 for postgraduate — but the number that catches people out is the **minimum in each band**, not the overall score. A 7.0 overall with a 5.5 in writing fails a great many requirements. `[VERIFY typical band ranges against current university requirements before ship.]`

Some universities waive the test entirely if your degree was taught in English or if your Class 12 English marks meet their threshold. Separately, some countries set a visa English requirement that is stricter than the university's, and the visa requirement is the one that stops you travelling.

We will give you the exact requirement for each university on your shortlist **before** you book a test date, because a test booked against the wrong requirement is six weeks and a fee lost.

---

**9. Can I work after I graduate, and while I study?**

In most of our destinations, yes, for a defined period.

The UK's Graduate Route allows two years of work after a degree, three after a doctorate. Australia, Canada, New Zealand, Ireland and Germany each run their own post-study work schemes with their own durations and conditions — and those conditions change, sometimes at short notice, which is why every work-rights figure in the gazetteer above carries a source and a last-verified date rather than a confident sentence.

During the course, work is limited. In the UK it is 20 hours a week in term time and 40 hours in the holidays. Plan your finances on tuition and living costs, not on part-time earnings: part-time work covers groceries and a phone bill, and it does not cover a semester.

---

**10. I am the parent. What is expected of me, is it safe for my daughter, and will the degree be recognised in India?**

Three questions that get asked in one breath, so here are three answers.

**What is expected of you.** To be on the call — and we would rather you were. A named counsellor from the branch nearest you will speak to you directly about money, timelines and risk, not only to your child. You will have that counsellor's name, branch and direct number, and if they leave, we tell you in writing who has taken the file.

**Safety.** The question is usually asked about daughters and it deserves a straight answer rather than reassurance. We place students in university-managed or university-verified accommodation wherever it is available. Before departure we give you the institution's own international student support number in writing. The counsellor who handled the file stays reachable afterwards. We cannot promise safety, and anyone who does is not being honest with you. What we can promise is that you will always have a number that answers.

**Recognition.** Ask two questions of any course before a deposit is paid: is the university recognised by its own country's regulator, and is the qualification recognised by the employers, councils or licensing bodies you care about in India? We answer both in writing, per university on the shortlist, and if the answer to either is no we will tell you so.

There is a chapter on this page written for you rather than for your child. `Read the parents' chapter →`

---

**Closing CTA block:**
`Book free counselling` · sub-label `30 min · free · no obligation` · proof line `A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST. No fee, no obligation.`

### 14.5 Layout

**Desktop ≥1280px.** `--content-max`, `padding-block: var(--section-y)`.

- Running head, H2, deck: columns 2–9.
- **The ten disclosures: columns 2–9**, constrained to `--measure-prose` (66ch). Answers are long; the measure is what keeps them readable.
- Marginalia rail carries any footnoted figure inside an answer.
- Closing CTA block: columns 2–7.
- The 24vh `--grad-endpaper-return` band sits above the running head and carries no content.

**Tablet 768–1023px.** Full width at `--measure-prose`, centred. No rail; footnotes inline.

**Mobile <768px.** Full width with `--gutter` padding. `<summary>` rows are ≥56px with the whole row as the hit area and the `+`/`−` glyph right-aligned. Answers set at `--fs-body` with `--s-4` between paragraphs. No truncation, no "read more" — an FAQ that hides its answer is a lead form.

### 14.6 Wireframe — desktop

```
 ▒▒▒▒▒▒▒▒ 24vh --grad-endpaper-return band (#0E2029 → #1B3240 → #FBF8F2) ▒▒▒
 col  1    2    3    4    5    6    7    8    9   10   11   12      rail
      QUESTIONS
      Questions people actually ask.
      /These are the ten we are asked most often, including the three/
      /we would rather not be asked./
      ───────────────────────────────────────────────────── --rule ──
      + Why use a consultant at all? I could apply myself.
      ───────────────────────────────────────────────────────────────
      + What does Global Opportunities charge me?
      ───────────────────────────────────────────────────────────────
      − Then who pays you?                                   ← OPEN
        The university does, when you enrol. Partner institutions
        pay a recruitment fee to accredited agencies; that is the
        standard model across international education, and it is
        why counselling can be free to you.

        It also creates an obvious conflict, so here is how we
        handle it. We will tell you which universities on your
        shortlist have an agreement with us and which do not…
      ───────────────────────────────────────────────────────────────
      + What happens if my visa is refused?
      ───────────────────────────────────────────────────────────────
      + What will one year actually cost?
      ───────────────────────────────────────────────────────────────
      + Are scholarships realistic, or is that marketing?
      ───────────────────────────────────────────────────────────────
      + Which intake should I apply for, and when do I start?
      ───────────────────────────────────────────────────────────────
      + Do I need IELTS, and what score?
      ───────────────────────────────────────────────────────────────
      + Can I work after I graduate, and while I study?
      ───────────────────────────────────────────────────────────────
      + I am the parent. What is expected of me, is it safe for my
        daughter, and will the degree be recognised in India?
      ───────────────────────────────────────────────────────────────
      ( Book free counselling )
        30 min · free · no obligation
        A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST.
        No fee, no obligation.
   native <details> · grid-template-rows 0fr→1fr · --dur-3 · ZERO JS
```

### 14.7 Visual direction

Surface `--paper`, entered through the 24vh `--grad-endpaper-return` band.

- **`<summary>`:** `--fs-h4` (Hanken 600), `--ink`, row height ≥56px, full-row hit area. The default disclosure triangle is removed (`list-style: none`, `::-webkit-details-marker { display: none }`) and replaced by a mono `+` / `−` glyph in `--sienna` at the row's right edge. **The glyph swaps; it does not rotate** — a rotating chevron is the category's tell.
- **Answers:** `--fs-body` (Hanken 400) in **`--ink`**, not `--ink-muted`. These answers are the payload of the section, not secondary text, and several of them are the most important prose on the page.
- Inline emphasis inside answers uses `<strong>` at Hanken 600, never colour.
- Row rules: `0.0625rem --rule` between disclosures, `0.125rem --rule-strong` above the CTA block.
- In-answer links (`See the fifteen services →`, `Open the costing →`, `Read the parents' chapter →`) in `--marine` with a `--sienna` underline swell.
- `--r-0` throughout; `--r-pill` on the CTA only.
- No cards, no wells, no tint on the open state. An opened answer is distinguished by being present, which is enough.

### 14.8 Imagery

**None, in v1 or v2.** Ten long answers and a picture is nine answers and a picture. The section's only graphic is the `+`/`−` glyph.

### 14.9 CTA placement & conversion note

**One CTA, at the block foot**, immediately handing to `#enquiry`: `Book free counselling` with its sub-label and the canonical proof line.

- Placement is the whole argument. NN/g's ordering is objections cleared, then ask; this is the last screen before the form and questions 3, 4 and 6 remove the three specific objections that stop the highest-intent visitors — commission-steered advice, the unspoken possibility of refusal, and scholarship marketing.
- **Question 3 is the highest-converting paragraph on the page.** It answers the PG persona's stated fear without being asked, names the mechanism, and then hands the reader a challenge to use against our own counsellors. A disclosure that arms the customer is the strongest form of trust signalling available and it costs nothing.
- **Zero JavaScript is a conversion decision.** Budget Androids are >55% of Indian traffic on 3–6 Mbps connections; an accordion that needs hydration before it opens is an accordion that does not open. Native `<details>` works from first paint.
- `FAQPage` JSON-LD is emitted from the same source data as the visible answers. Budget **zero SERP payoff** — FAQ rich results were restricted in August 2023 and fully deprecated on 7 May 2026 — but the markup is valid, harmless, and the plain-text answers in the DOM are what AI answer surfaces retrieve.
- No CTA is a heading. The `<summary>` elements contain H3s; the CTA is a link.

### 14.10 Accessibility

- Landmark: `<section id="questions" aria-labelledby="questions-h2">`.
- Heading levels: **H2** for the section, **H3** inside each `<summary>`. Ten H3s give a clean navigable list of the questions, and they are literal searcher questions, which is exactly the heading structure the SEO research prescribes.
- **Native `<details>`/`<summary>`** provides keyboard operation, state announcement and toggle semantics with no ARIA and no script. Do not add `role="button"` or `aria-expanded` — the element already carries them.
- **No `name` attribute on the `<details>` elements.** Naming them makes them mutually exclusive; a visitor comparing the cost answer against the scholarship answer must be able to hold both open.
- The `grid-template-rows: 0fr → 1fr` transition must not break find-in-page. Closed content remains in the DOM and remains discoverable via the browser's `hidden="until-found"` behaviour where supported; the transition never uses `display: none` on the answer.
- The `+`/`−` glyph is `aria-hidden`; state is announced by the native element.
- Contrast: `--ink` on `--paper` 17:1; `--marine` links 11.7:1; `--sienna` glyph is non-text.
- Touch targets: `<summary>` rows ≥56px with the full row as hit area; in-answer links padded to ≥44px; CTA ≥48px.
- The `--grad-endpaper-return` band is decorative and `aria-hidden`.
- Screen-reader flow: heading 2 → deck → "Why use a consultant at all? I could apply myself. Heading level 3, collapsed" → on activation, "expanded" then the answer text → next.

### 14.11 Motion cue

- **CSS only. Zero JavaScript in this section.** The open/close transition is `grid-template-rows: 0fr → 1fr` at `--dur-3` with `--ease-cubic`.
- The `+`/`−` glyph swaps content with no rotation and no transform.
- No Motion component, no GSAP instance, no Anime.js scope. This section adds nothing at all to the JS bundle.
- Under `prefers-reduced-motion` the CSS backstop zeroes the duration and the disclosure opens instantly. `05-motion-blueprint.md` § 14.

---

## 15. `enquiry` — The First Call

> **Chapter:** VI Success · **Surface:** `--paper-tracing` · **Motion owner:** Motion (`AnimatePresence` step transitions)

### 15.1 Purpose & UX objective

The page's primary conversion: **six fields, three steps, three of them non-PII taps, personal information last.** GO's current homepage asks seven or more fields on one screen, which sits squarely in the documented collapse zone — completion falls from ~23.1% at three fields to ~17.0% at five, ~11.4% at seven and ~6.9% at ten or more, with a sharp cliff between five and seven. Re-sequencing into three escalating steps is the single highest-leverage change available: multi-step aggregates at ~13.85% against ~4.53% for single-page, progress indicators add ~28%, and clearing step 1 raises finish rates by ~73%. Alongside the form, and given equal weight rather than being shrunk to a corner icon, sit a phone number and a WhatsApp link as first-class siblings — labelled anchors carrying their number and their name in full, which since the 2026-08-04 icon adoption may each take a decorative `sm` glyph beside the label but must never be reduced to one — because in India WhatsApp enquiries get 60–70% responses against 20–30% for web forms, and because the parent may never fill a form at all.

**Think:** "This is three taps and my number, not an interrogation." **Feel:** low-stakes. **Do:** complete three steps in under 40 seconds — or bypass the form entirely and call or message.

### 15.2 Story chapter

**VI — Success.** `[data-chapter="success"]`. The chapter's proof has been delivered; this is where the reader joins it.

### 15.3 Content hierarchy

1. Running head — `THE FIRST CALL`
2. **H2** — `The first call.`
3. Deck
4. **Progress rule** — `STEP n OF 3` plus a `scaleX` fill
5. **Step 1** — destination chips
6. **Step 2** — degree level + intake chips
7. **Step 3** — name, mobile, email (optional), nearest office, consent
8. Submit + proof line + next-available slot
9. **The sibling channel** — `Call 1800 111 119` and `WhatsApp us`, present at every step
10. Thank-you state, with post-submit OTP as a value exchange
11. No-JS fallback: all three steps stacked, one submit

### 15.4 Draft copy and the full form contract

**H2:** `The first call.`

**Deck** (`--fs-deck`):
> *Three taps, then your name and number. A counsellor from the office nearest you calls back within 15 minutes, between 9 AM and 9 PM IST.*

---

#### Step 1 — `Where are you going?`

| Property | Value |
|---|---|
| Field name | `destination` |
| Control | radio group, rendered as chips |
| Legend | `Where are you thinking of going?` |
| Options | `UK` · `USA` · `Canada` · `Australia` · `New Zealand` · `Ireland` · `Germany` · `Other` |
| Required | yes |
| Helper text | `You can change this later. It only decides who calls you.` |
| Error | `Pick one so we can route you to the right counsellor.` |
| Progress | `STEP 1 OF 3` |
| Pre-fill | set from a `?dest=` parameter carried by every gazetteer, counsellor and costing CTA — in which case the visitor lands on step 2 |

**Advance behaviour.** Tapping a chip auto-advances after 220ms **on pointer and touch input only**. Keyboard users are not auto-advanced — arrow keys move the selection within a radio group, and auto-advancing on selection change would make the group impossible to traverse. Detection is by `pointerType`; a visible `Next` button is present for every input mode.

---

#### Step 2 — `What and when?`

| Property | Field A | Field B |
|---|---|---|
| Field name | `degree_level` | `intake` |
| Control | radio chips | radio chips |
| Label | `What level?` | `Which intake?` |
| Options | `Bachelor's` · `Master's` · `MBA` · `PhD` · `Diploma / PG Diploma` | `September 2027` · `January 2028` · `Later / not sure` |
| Required | yes | yes |
| Helper | — | `Applications go in 8–9 months before the intake starts.` |
| Error | `Pick a level.` | `Pick an intake, or "Later / not sure".` |

Buttons: `Back` (ghost) and `Next` (solid). Progress: `STEP 2 OF 3`.

`Later / not sure` is a real, respected option, not a trap. Persona C — test-prep stage, low intent, high volume — must be able to complete the form honestly, and forcing a date they do not have is how that lead is lost or falsified.

---

#### Step 3 — `Who should we call?`

| # | Field | Label | Input contract | Required | Validation & error |
|---|---|---|---|---|---|
| 1 | `given-name` | `First name` | `type="text" autocomplete="given-name"` | yes | non-empty · `We need a name to ask for.` |
| 2 | `family-name` | `Last name (optional)` | `type="text" autocomplete="family-name"` | no | — |
| 3 | `tel` | `Mobile number` | `type="tel" inputMode="numeric" autocomplete="tel-national" maxlength="10"`, with `+91` as a **rendered adornment, not a field** | yes | exactly 10 digits, first digit 6–9 · `That doesn't look like a 10-digit Indian mobile number.` |
| 4 | `email` | `Email (optional)` | `type="email" autocomplete="email"` | no | validated only if non-empty · `Check the email — it's missing an @.` |
| 5 | `office` | `Nearest office` | **native `<select>`**, 18 branches in `<optgroup>` by region, smart-defaulted server-side from IP | yes | a value is always present · — |

Helper under `Nearest office`: `We've picked the one nearest you. Change it if you'd rather.` The list ends with `Not near any of these`.
Beside the `+91` adornment: a small link `I'm not in India`, which swaps the adornment for a native `<select>` of dial codes and relaxes the 10-digit rule.

**The six-field count.** The six counted fields are the six required decisions — destination, degree level, intake, first name, mobile, nearest office — three of which are taps. Last name and email are **optional and labelled optional**, and do not count against the cap. Baymard's 2024 finding is that labelling fields *optional* rather than asterisking *required* lifted conversion by ~25%; consequently **no asterisk appears anywhere in this form**.

---

#### Consent — two separate things, and they must never be merged

**Consent 1 — the enquiry callback. A statement, not a checkbox** (`--fs-body-sm`, above the submit):
> By submitting, you are asking a Global Opportunities counsellor to call or message you about this enquiry. We contact enquiries between 9 AM and 9 PM IST.

**Consent 2 — marketing. An unticked checkbox, separate, never pre-ticked, never bundled:**
> ☐ You may also send me intake deadlines, Application Day dates and scholarship information by WhatsApp, SMS and email. I can withdraw this at any time by replying STOP or by writing to `[VERIFY privacy contact address]`.

**Itemised plain-language notice beneath it** (`--fs-body-sm`, `--ink-muted`):
> Purpose: marketing about study-abroad services. Retention: until you withdraw, or 24 months after our last contact, whichever comes first. This is separate from the callback above and is **not** required to submit this form.

**What is logged on submit:** consent timestamp, IP address and form version — for both the implied enquiry consent and, separately, the marketing checkbox state. The DPDP Rules were notified in November 2025 and are enforceable from May 2027; TCCCPR requires DLT-logged explicit opt-in for promotional contact and prohibits it between 9 PM and 9 AM. All of this ships on day one rather than being retrofitted.

---

#### Submit and proof

- **Submit label:** `Book free counselling`
- **Proof line, directly beneath the button** (canon verbatim): `A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST. No fee, no obligation.`
- **Live availability, beneath the proof line** (`--fs-mono-label`): `NEXT AVAILABLE · TUE 4:30 PM · DELHI SOUTH` — drawn from the real scheduler. `[VERIFY scheduler integration.]` If the scheduler is unavailable, the line is **omitted**, never faked. It is never "only 3 slots left", never a countdown, never a viewer count.

---

#### The sibling channel — present at every step, not below the form

- `Call 1800 111 119` — a real `tel:` anchor. Sub-label: `Toll-free. 9 AM–9 PM IST.`
- `WhatsApp us` — a real `wa.me/918282828215` anchor with the message body pre-filled from the destination chip already tapped:
  `Hi, I'd like counselling for a Master's in the UK, September 2027 intake.`
  Before any chip is tapped it reads: `Hi, I'd like to know more about studying abroad.`
- Framing line above the pair (`--fs-body-sm`): `Or skip the form.`

---

#### Thank-you state

> **Your enquiry is with the Delhi South team.**
> `Avinash will call you on +91 98••• ••••.`
> `Between 9 AM and 9 PM IST, usually within 15 minutes.`
>
> **Verify your number to get your costing sheet and your eleven-month plan on WhatsApp.**
> `[ Send me a code ]`

**OTP is a value exchange, not a gate.** The lead is banked at submit. Verification costs 15–30% of raw completions when used as a gate but reduces cost-per-qualified-lead by 40–60%; moving it to the thank-you screen and attaching it to a deliverable keeps both benefits. A visitor who never verifies is still a lead and is still called.

The thank-you state also carries: `Add this to your calendar`, `WhatsApp us now instead`, and a link back to the costing.

---

#### No-JavaScript fallback

The form is a real `<form method="post" action="/enquiry">`. Without JavaScript, all three steps render **stacked on one page** with a single `Book free counselling` submit. Six fields on one screen is the fallback, not the design — but a fallback that submits beats a step wizard that never hydrates on a ₹15,000 Android at 3 Mbps.

### 15.5 Layout

**Desktop ≥1280px.** `--content-max`, `padding-block: var(--section-y)`.

- Running head, H2, deck: columns 3–8.
- **Form bed: columns 3–8**, on `--paper-tracing` with a `1px --rule` keyline, `--r-1`, and `--reg-marine` (`3px 3px 0 0 #14384A`).
- **Progress rule** spans the full width of the bed at its top edge, with `STEP n OF 3` at `--fs-mono-label` above it.
- **Sibling channel: columns 10–12**, a ruled panel aligned to the top of the form bed.
- Step content is vertically centred within a bed of fixed minimum height, so the bed does not resize between steps — **no animated height anywhere**.

**Tablet 768–1023px.** Form bed spans columns 1–12 with a 640px max width, centred. **The sibling channel moves above the form** as a full-width ruled row — a parent scrolling to this section should see the phone number before the first field.

**Mobile <768px.** Single column.

- **Sibling channel first**: two full-width buttons at ≥48px, `Call` then `WhatsApp`, above the form. This inverts the desktop order deliberately.
- Chips wrap two per row at ≥44px tall with `--s-3` inline padding.
- Inputs are 48px tall, full width, label above.
- `Back` and `Next` sit side by side at the step foot, `Next` at 60% width.
- **The mobile bar is suppressed while `#enquiry` is in the viewport** — visually hidden and marked `inert` — so the page never shows two competing primary CTAs in the same thumb region. It returns when the section leaves view. See § 17.

### 15.6 Wireframe — desktop

```
 col  1    2    3    4    5    6    7    8    9   10   11   12      rail
       THE FIRST CALL
       The first call.
       /Three taps, then your name and number. A counsellor from the/
       /office nearest you calls back within 15 minutes./
     ┌──────────────────────────────────────────┐   ┌──────────────────┐
     │ STEP 2 OF 3                              │   │ Or skip the form.│
     │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░ │   │ ──────────────── │
     │  progress rule, scaleX, --sienna-press   │   │ ( Call           │
     │                                          │   │   1800 111 119 ) │
     │ What level?                              │   │  Toll-free.      │
     │ (Bachelor's) (Master's ✓) (MBA)          │   │  9 AM–9 PM IST.  │
     │ (PhD) (Diploma / PG Diploma)             │   │ ( WhatsApp us )  │
     │                                          │   │  Pre-filled with │
     │ Which intake?                            │   │  UK · Master's · │
     │ (September 2027 ✓) (January 2028)        │   │  Sep 2027        │
     │ (Later / not sure)                       │   │  ink + outline,  │
     │ Applications go in 8–9 months before     │   │  never green     │
     │ the intake starts.                       │   └──────────────────┘
     │                                          │
     │  Back            (        Next        )  │
     └──────────────────────────────────────────┘
       bed --paper-tracing · 1px --rule · --r-1 · --reg-marine 3px 3px

 ── STEP 3 ───────────────────────────────────────────────────────────
     │ First name              Last name (optional)                   │
     │ [___________________]   [___________________]                  │
     │ Mobile number                                                  │
     │ [+91][__________]  I'm not in India                            │
     │ Email (optional)                                               │
     │ [_________________________________]                            │
     │ Nearest office                                                 │
     │ [ Delhi South            ▾ ]  native <select>                  │
     │ We've picked the one nearest you. Change it if you'd rather.   │
     │ By submitting, you are asking a Global Opportunities counsellor│
     │ to call or message you about this enquiry…                     │
     │ ☐ You may also send me intake deadlines, Application Day dates │
     │   and scholarship information by WhatsApp, SMS and email…      │
     │   Purpose: marketing about study-abroad services. Retention:…  │
     │  Back      (      Book free counselling      )                 │
     │  A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST.   │
     │  No fee, no obligation.                                        │
     │  NEXT AVAILABLE · TUE 4:30 PM · DELHI SOUTH                    │
```

### 15.7 Wireframe — mobile (390px, siblings first)

```
┌─ 390 ───────────────────────────────┐
│ THE FIRST CALL                      │
│ The first call.                     │
│ /Three taps, then your name and/     │
│ /number./                            │
│ Or skip the form.                   │
│ (       Call 1800 111 119      )    │ ≥48px
│ (          WhatsApp us         )    │ ≥48px, ink + outline
├─────────────────────────────────────┤
│ STEP 1 OF 3                         │
│ ▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ Where are you thinking of going?    │
│ (   UK   ) (   USA   )              │ ≥44px, 2 per row
│ ( Canada ) (Australia)              │
│ (New Zeal) ( Ireland )              │
│ (Germany ) (  Other  )              │
│ You can change this later. It only  │
│ decides who calls you.              │
│                (     Next     )     │
└─────────────────────────────────────┘
  mobile bar SUPPRESSED + inert while #enquiry is in view
```

### 15.8 Visual direction

Surface `--paper-tracing` for the bed — the same paper as `reckoning`, which makes the two conversion surfaces read as one working sheet.

- **Inputs:** `--paper` fill, `1px --rule` border, `--r-2`, `--fs-body`, **48px tall**. Label above the field at `--fs-body-sm`, `--ink`. **Never a placeholder as a label.**
- **Focus:** `2px --sienna-press` outline with `2px` offset, per the canon focus-ring token. `:focus-visible` only.
- **Chips:** unselected — `--paper`, `1px --rule`, `--r-2`, `--ink`. Selected — `--sienna-tint` fill, `1px --sienna-press`, `--ink`, mono `✓` prefix. Chips never change size on selection; only fill and border change.
- **Native `<select>`:** system-rendered, `--r-2`, `1px --rule`. **Never a custom dropdown** — custom selects are materially worse on low-end Android and this is one of the six required fields.
- **`+91` adornment:** `--fs-data` (mono) in `--ink-muted` inside the input's left inset, on a `--paper-tracing` ground, separated by a `1px --rule` vertical hairline. It is not focusable and not editable.
- **Progress rule:** `0.125rem` track in `--rule`, fill `--sienna-press`, animated by `scaleX` only.
- **Submit:** solid `--sienna-press`, `--r-pill`, white, 48px, full bed width. Hover/active `--sienna-deep`.
- **`Back`:** ghost — `--marine` text, no fill, no border.
- **Errors:** message in `--clay` (6.1:1) preceded by a `!` glyph, plus a `2px --clay` left rule on the field. **Never colour alone.**
- **Consent checkbox:** native `<input type="checkbox">`, 24px, `--r-2`, `--sienna-press` when checked, with a 44px hit area extended over the label.
- **`WhatsApp us`:** ink text with a `1px --rule-strong` outline. **Never WhatsApp brand green** — green means *verified* on this page (`--verdigris`) and the semantic must not leak.
- `--r-0` on the bed and rules; `--r-2` on inputs, chips and checkbox; `--r-pill` on the submit only.

### 15.9 Imagery

**None in the form.** A form with a photograph beside it is a landing page from 2019, and every pixel spent on atmosphere here is a pixel not spent on the six fields.

**One exception: the thank-you state carries a Plate A** at 16:9 — `PLATE XV · 28.5562° N · 77.1000° E · DELHI SOUTH · NEXT CALL 16:30 IST` — because the thank-you screen is the one place on the page with nothing to do and a genuine reason to feel like an arrival. **v2:** a commissioned photograph of a counsellor's desk mid-call drops into the identical box behind the identical caption.

### 15.10 CTA placement & conversion note

This section *is* the CTA, so the note is the research applied line by line.

| Decision | Evidence |
|---|---|
| Six fields, not seven-plus | Completion ~23.1% at 3 fields → 17.0% at 5 → 11.4% at 7 → 6.9% at 10+, with a sharp cliff between 5 and 7. GO's current form sits at 7+. |
| Three steps rather than one screen | Multi-step ~13.85% vs single-page ~4.53% aggregate; HubSpot reports 86% higher. |
| Progress rule on every step | Progress indicators ~+28%. |
| Destination first, one tap, no typing | Zero-friction entry that doubles as the counsellor-routing signal; clearing step 1 raises finish rates ~73%. |
| PII in step 3 only | Visitors are ~3.2× more likely to disclose sensitive data after clearing earlier steps. |
| "optional" labels, zero asterisks | Labelling optional rather than asterisking required lifted conversion ~25% (Baymard 2024). |
| `type="tel"` + `inputMode="numeric"` + `autocomplete="tel-national"` + rendered `+91` | Correct keyboard on first tap; `autocomplete` tokens also satisfy WCAG 2.2 SC 1.3.5. |
| Native `<select>` for the office | Native selects outperform custom dropdowns on low-end Android, which is >55% of Indian traffic. |
| Proof line under submit | NN/g: one line of proof under every CTA; publishing a real callback window beats "we'll get back to you". |
| A published 15-minute window | 5-minute response ≈ 21× qualification vs 30 minutes; 1 hour ≈ 7× vs 2 hours (HBR, 1.25M leads). |
| Real next-available slot, or nothing | FTC 2022 dark-patterns guidance: resetting timers and invented scarcity are §5 deceptive. "Next available: Tue 4:30 PM, Delhi" beats "only 3 slots left". |
| `tel:` and `wa.me` as equal siblings | WhatsApp India: 60–70% response vs 20–30% for forms; ~98% opened within 3 hours; median reply 45–90s. Parents may never fill a form. |
| WhatsApp body pre-filled from the chip | The message arrives already qualified, which is what makes a 45–90 second reply useful. |
| OTP after submit, never before | OTP as a gate costs 15–30% of raw completions; as a post-submit unlock it cuts cost-per-qualified-lead 40–60% with the lead already banked. |
| Real `<form>` that works without JS | The target device class is exactly where hydration fails. |

**One CTA the section deliberately does not have:** an exit-intent popup on top of the form. Exit-intent averages 2.8–3.9% and can reach ~19.6% in the top decile, but the research is explicit that the offer must **differ** from the main CTA — so if one is ever added, it is the cost calculator or a named time slot, desktop only, and never this same form again.

### 15.11 Accessibility

- Landmark: `<section id="enquiry" aria-labelledby="enquiry-h2">` containing a single `<form>`.
- Heading level: **H2**. Each step's legend is a `<legend>`, not a heading.
- **Structure:** three `<fieldset>` elements, each with a `<legend>` (`Where are you going?`, `What and when?`, `Who should we call?`). Chip groups are nested `<fieldset>`s with their own `<legend>`.
- **Chips are native `<input type="radio">`** styled as chips. Native radios give group semantics, arrow-key traversal and state announcement for free, and they submit without JavaScript.
- **Step changes move focus** to the new step's `<legend>` (`tabindex="-1"`) and announce through a polite live region: `Step 2 of 3. What and when?`
- **Progress** is `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and an accessible name of `Enquiry progress`.
- **Errors** are `role="alert"`, referenced by `aria-describedby` on their field, and the field carries `aria-invalid="true"`. Validation runs **on blur**, then re-validates on input **after** the first error — never on keystroke before first blur.
- **Never disable the `Next` button.** A disabled control hides the reason it is disabled; the button stays enabled and produces an inline error naming what is missing.
- **Labels are `<label for>`.** No placeholder ever carries a label. Optional fields say *optional* in the label text; no field is asterisked.
- **The `+91` adornment must be in the accessible name**, not only visual: the mobile field's label reads `Mobile number, India, plus 91`.
- `autocomplete` tokens on `given-name`, `family-name`, `tel-national` and `email` satisfy WCAG 2.2 SC 1.3.5 Identify Input Purpose.
- **Consent checkbox is never pre-ticked and never bundled** with the enquiry consent; its label is a real `<label>` with a ≥44px hit area, and the itemised purpose/retention notice is linked to it by `aria-describedby`.
- Touch targets: chips ≥44px (≥48px mobile), inputs 48px, submit 48px, checkbox hit area ≥44px.
- Contrast: `--clay` errors 6.1:1; white on `--sienna-press` 5.4:1; `--ink` on `--paper-tracing` to be measured and recorded (see § 11.10).
- **`Esc` does nothing destructive** anywhere in this form — it never clears a step and never closes the form.
- Screen-reader flow: heading 2 → deck → "Or skip the form" → call link → WhatsApp link → "Enquiry progress, 33%" → "Where are you going?, group" → eight radios → "Next, button" → step 2 announced → step 3 → labelled inputs → consent statement → checkbox with description → "Book free counselling, button" → proof line.

### 15.12 Motion cue

- **Owner: Motion.** Step transitions via `AnimatePresence`: `x: ±16px` plus opacity, `--dur-3`, `--ease-cubic`. Direction reverses on `Back`.
- Progress rule fills via `scaleX`, `--dur-3`. Chip selection uses `--ease-press` at `--dur-1` for the press feedback only.
- **Bed height is never animated.** The bed has a fixed minimum height and steps cross-fade within it; animated `height` is banned by the canon and would also cost INP on the target device.
- Reduced motion: steps swap with an opacity change only and the progress rule jumps. `05-motion-blueprint.md` § 15.

---

## 16. `colophon` — The Colophon

> **Chapter:** — (chrome) · **Surface:** `--paper-laid`, top rule `0.125rem --rule-strong` · **Motion owner:** GSAP (one closing rule draw)

### 16.1 Purpose & UX objective

A book ends with a colophon: who published it, where, when, in what typefaces, and on what authority. This footer does the same and adds the thing that makes the whole page defensible — the **Sources & Last-Verified table as a first-class element**, not a link to a policy page. Every dated figure on the landing page resolves to a row here with a named source, a named owner and a verification date. That table is the only structure on the page a competitor cannot clone without doing the operational work of actually being auditable, and it is the last thing the parent persona reads before deciding.

**Think:** "Everything they claimed upstairs is listed down here with a date against it." **Feel:** closure, and the particular respect owed to an organisation that publishes its own working. **Do:** find the branch nearest them, check one figure against its source, or call.

### 16.2 Story chapter

Chrome. The page's six chapters are complete; the colophon is the publication's imprint.

### 16.3 Content hierarchy — the full footer inventory

1. Top rule — `0.125rem --rule-strong`
2. Running head — `THE COLOPHON`, and **H2** `The Colophon`
3. **Legal entity block** — wordmark SVG, `GLOBAL OPPORTUNITIES PRIVATE LIMITED`, CIN, registered office, head office
4. **The three numbers** — toll-free, national, Delhi South — all `tel:` anchors
5. **Email and WhatsApp** — real anchors
6. **Eighteen branches with addresses** — three columns of six; city, street address, phone, hours
7. **Fifteen destinations** — linked list, and only these fifteen
8. **Fifteen services** — linked list
9. **Six accreditations** — mono row, each linked to the accrediting body
10. **Sources & Last-Verified table** — the footer's structural anchor
11. **Muted dual clock** — New Delhi and the last-selected destination
12. **Social profiles** — the `sameAs` set
13. **Legal links** — Privacy Policy, DPDP notice and withdrawal mechanism, Terms, Cookie notice
14. **Disclaimer block**, in plain language
15. **Closing line**, verbatim
16. Copyright
17. Closing rule (DrawSVG, once)
18. `Return to the running head ↑`

### 16.4 Draft copy

**H2:** `The Colophon`

**Legal entity block:**
```
GLOBAL OPPORTUNITIES PRIVATE LIMITED
CIN [VERIFY]
REGISTERED OFFICE  [VERIFY]
HEAD OFFICE        HS-27, 2ND FLOOR, KAILASH COLONY MARKET,
                   NEW DELHI 110048
```

**The three numbers:**
```
TOLL-FREE      1800 111 119
NATIONAL       +91 82828 28215
DELHI SOUTH    +91 11 4714 1414
EMAIL          [VERIFY]
WHATSAPP       wa.me/918282828215
```

**Branch block heading:** `EIGHTEEN BRANCHES, WITH ADDRESSES`
Ahmedabad · Amritsar · Bangalore · Bathinda · Chandigarh · Chennai · **Delhi South (head office)** · Delhi West · Hyderabad · Jalandhar · Ludhiana · Mohali · Mumbai Andheri · Mumbai Bandra · Mumbai Dadar · Mumbai Thane · Patiala · Pune
Each entry: city name (H3-level), `<address>`, `tel:` anchor, hours. `[VERIFY — 17 of 18 addresses and phone numbers to be pulled from GO's own contact pages.]`

**Destinations block heading:** `FIFTEEN DESTINATIONS`
Australia · USA · UK · New Zealand · Canada · Europe · Ireland · Dubai · Germany · Switzerland · Singapore · Malaysia · Italy · France · Spain

> **Retired permanently.** The 38-entry destination list is not reproduced anywhere in this footer. "Berlin" and "Paris" were listed as countries on the previous site; both are removed, and the curated fifteen is the only list this page publishes.

**Services block heading:** `FIFTEEN SERVICES`
Education Counselling · Country Information · Travel Guidance · Selection of Course · Admission Guidance · Accommodation · Financial Estimation · Interview Preparation · Forex Exchange · Profile Shortlisting · Visa Services · Education Loan · GIC Account · Medical Insurance · Career Guidance

**Accreditations row:** `AIRC · ICEF · AAERI · BRITISH COUNCIL · EDUCATION NEW ZEALAND · PTE PEARSON` — each linked to the accrediting body's own page.

**Sources & Last-Verified table — heading and framing:**
> `SOURCES & METHODS`
> Every figure on this page appears below with where it came from, who inside Global Opportunities owns it, and when it was last checked. If a figure cannot be evidenced, it is removed from the page rather than left here.

| Figure | What it covers | Source | Owner | Last verified |
|---|---|---|---|---|
| `EST. 2001, AMRITSAR` | Founding year and first office | About page | `[OWNER]` | `[DATE]` |
| `40,000+ STUDENTS PLACED` | Cumulative placements | /our-services/, /what-we-do-10-ways/ | `[OWNER]` | `Aug 2026` |
| `700+ PARTNER UNIVERSITIES` | Formal partner agreements | /partner-universities/ | `[OWNER]` | `Aug 2026` |
| `15 DESTINATIONS` | Curated destination list | /study-destinations/ | `[OWNER]` | `[DATE]` |
| `18 OFFICES` | Named, addressed branches | Branch list | `[OWNER]` | `[DATE]` |
| `47 PUBLISHED TESTIMONIALS` | 40 students, 7 institutions | Testimonial index | `[OWNER]` | `[DATE]` |
| `UK PG TUITION £9,000–30,000` | Tuition band | `[NAMED SOURCE]` | `[OWNER]` | `[DATE]` |
| `UK LIVING £1,136 / £1,483 per month` | Living cost, outside / in London | `[NAMED SOURCE]` | `[OWNER]` | `[DATE]` |
| `UK STUDENT VISA £524` | Visa fee | `[NAMED SOURCE]` | `[OWNER]` | `[DATE]` |
| `IHS £776 / YEAR` | Immigration Health Surcharge | `[NAMED SOURCE]` | `[OWNER]` | `[DATE]` |
| `CANADA AVG PG CAD 21,100` | Average PG tuition | `[NAMED SOURCE]` | `[OWNER]` | `[DATE]` |
| `£1 = ₹107.00` | Conversion rate used in the costing | RBI reference rate | `[OWNER]` | `[DATE]` |
| `GRADUATE ROUTE 2 YEARS` | UK post-study work | `[NAMED SOURCE]` | `[OWNER]` | `[DATE]` |
| `GERMANY WINTER SEMESTER 15 JULY` | Third-party deadline | `[NAMED SOURCE]` | `[OWNER]` | `[DATE]` |
| `GO APPLICATION DAYS, 8 CITIES` | Event dates | GO events calendar | `[OWNER]` | `[DATE]` |
| `AIRC 5 YEARS / 10 YEARS` | Certification term | /airc-accreditation/ | `[OWNER]` | `[DATE]` |

The table is **data-driven** from a JSON or CMS registry with an owner and a last-verified date per entry — not hand-authored markup. A footnote that 404s does more damage than no footnote, and hand-maintained citation tables always drift.

**Muted dual clock:** `NEW DELHI 14:32 IST` · `LONDON 10:02 BST` — static here, updating on the minute without an odometer roll.

**Legal links:** `Privacy Policy` · `Your data: what we hold and how to withdraw consent` · `Terms` · `Cookie notice`

**Disclaimer block** (`--fs-body-sm`, `--ink`):
> Global Opportunities is an education consultancy. We are not a university, and we do not issue admissions or visas. Nothing on this page is a guarantee of admission, of a visa, or of employment. Every figure above is dated and sourced.

**Closing line, verbatim** (Newsreader italic, centred):
> *Volume XXV. Set in Newsreader, Hanken Grotesk and IBM Plex Mono. New Delhi, 2026.*

**Copyright:** `© 2026 GLOBAL OPPORTUNITIES PRIVATE LIMITED`
**Back to top:** `Return to the running head ↑`

**Structured data emitted from this section** (canon build note 14): `Organization` with `legalName`, `foundingDate: "2001"`, `logo` ≥112×112, `telephone`, `contactPoint` (`areaServed: IN`) and `sameAs`; `LocalBusiness` as `subOrganization` × 18; `Service` with `hasOfferCatalog`; `WebSite` / `WebPage` / `BreadcrumbList`. **Never `EducationalOrganization`, never `ProfessionalService`, never `AggregateRating`, never `Review`.**

### 16.5 Layout

**Desktop ≥1280px.** Full width to `--frame-max`, inner content to `--content-max`, `padding-block: var(--section-y-tight)` top and `--section-y` bottom.

- **Row 1:** legal entity + numbers (columns 1–4) · destinations (5–7) · services (8–10) · accreditations and socials (11–12).
- **Row 2:** eighteen branches in three columns across 1–12, above a `0.0625rem --rule`.
- **Row 3:** **Sources & Last-Verified table, full width, columns 1–12.** It is the largest single element in the footer, deliberately.
- **Row 4:** dual clock (1–4) · legal links (5–8) · disclaimer (9–12).
- **Row 5:** closing line centred across 1–12, above the closing rule; copyright and back-to-top beneath.

**Tablet 768–1023px.** Link lists in two columns; branches in two columns; the Sources table scrolls horizontally inside an `overflow-x: auto` container with a visible edge fade and a `tabindex="0"` so it is keyboard-scrollable.

**Mobile <768px — structurally different.** A footer with 18 addresses, 15 destinations, 15 services and a 16-row table is 4,000px tall if it is all expanded.

- **`Destinations`, `Services` and `Eighteen branches` each become a native `<details>` disclosure**, closed by default, at ≥56px.
- **The Sources table becomes a stacked definition list** — one block per figure, with `FIGURE / SOURCE / OWNER / LAST VERIFIED` as labelled lines. A 5-column table at 390px is unreadable and horizontal scrolling a citation table is worse than restructuring it.
- Always visible without a tap: the legal entity, the three numbers, the disclaimer, the closing line, the copyright and the back-to-top.
- Bottom padding of `calc(56px + env(safe-area-inset-bottom))` so the mobile bar never covers the closing line.

### 16.6 Wireframe — desktop

```
 ═══════════════════════════ 0.125rem --rule-strong ═══════════════════
 col  1    2    3    4    5    6    7    8    9   10   11   12
  THE COLOPHON
  ┌──────────────────┐┌───────────┐┌───────────┐┌──────────────────┐
  │ [◧] wordmark SVG ││ FIFTEEN   ││ FIFTEEN   ││ ACCREDITATIONS   │
  │ GLOBAL OPPORTUNI-││ DESTINAT- ││ SERVICES  ││ AIRC · ICEF ·    │
  │ TIES PRIVATE LTD ││ IONS      ││ Education ││ AAERI · BRITISH  │
  │ CIN [VERIFY]     ││ Australia ││ Counsell- ││ COUNCIL · EDUCA- │
  │ REGISTERED [VER] ││ USA       ││ ing       ││ TION NZ · PTE    │
  │ HEAD OFFICE      ││ UK        ││ Country   ││                  │
  │ HS-27, 2ND FLOOR,││ New Zeal. ││ Informat- ││ SOCIAL           │
  │ KAILASH COLONY   ││ Canada    ││ ion       ││ [sameAs set]     │
  │ MARKET, NEW DELHI││ Europe    ││ …         ││                  │
  │ 110048           ││ …         ││           ││                  │
  │ TOLL-FREE        ││ (15 only  ││ (15)      ││                  │
  │ 1800 111 119     ││  — the 38 ││           ││                  │
  │ NATIONAL         ││  list is  ││           ││                  │
  │ +91 82828 28215  ││  retired) ││           ││                  │
  │ DELHI SOUTH      │└───────────┘└───────────┘└──────────────────┘
  │ +91 11 4714 1414 │
  └──────────────────┘
  ─────────────────────────────────────────────────────── --rule ────
  EIGHTEEN BRANCHES, WITH ADDRESSES
  Ahmedabad          Delhi South (HQ)      Mumbai Andheri
  [address]          HS-27, 2ND FLOOR…     [address]
  [phone] [hours]    +91 11 4714 1414      [phone] [hours]
  Amritsar           Delhi West            Mumbai Bandra
  …                  …                     …
  ─────────────────────────────────────────────────────── --rule ────
  SOURCES & METHODS
  Every figure on this page appears below with where it came from, who
  inside Global Opportunities owns it, and when it was last checked.
  ┌──────────────────┬───────────────┬──────────┬────────┬──────────┐
  │ FIGURE           │ WHAT IT COVERS│ SOURCE   │ OWNER  │ LAST VER.│
  ├──────────────────┼───────────────┼──────────┼────────┼──────────┤
  │ EST. 2001,       │ Founding year │ About    │ [OWNER]│ [DATE]   │
  │ AMRITSAR         │ and 1st office│ page     │        │          │
  │ 40,000+ STUDENTS │ Cumulative    │ /our-    │ [OWNER]│ Aug 2026 │
  │ PLACED           │ placements    │ services/│        │          │
  │ 700+ PARTNER     │ Formal partner│ /partner-│ [OWNER]│ Aug 2026 │
  │ UNIVERSITIES     │ agreements    │ univer…/ │        │          │
  │ … 16 rows total, data-driven from the registry …                │
  └──────────────────┴───────────────┴──────────┴────────┴──────────┘
  ─────────────────────────────────────────────────────── --rule ────
  NEW DELHI 14:32 IST   Privacy Policy      Global Opportunities is an
  LONDON    10:02 BST   Your data: what we  education consultancy. We are
                        hold and how to     not a university, and we do
                        withdraw consent    not issue admissions or visas.
                        Terms · Cookies     Nothing on this page is a
                                            guarantee…
  ═══════════════════════════════════════════════════════════════════
        /Volume XXV. Set in Newsreader, Hanken Grotesk and IBM Plex/
        /Mono. New Delhi, 2026./
        © 2026 GLOBAL OPPORTUNITIES PRIVATE LIMITED
        Return to the running head ↑
  ▁▁▁▁▁▁▁▁▁▁ closing rule, DrawSVG, 600ms power2.inOut, once ▁▁▁▁▁▁▁
                    surface --paper-laid
```

### 16.7 Visual direction

Surface `--paper-laid`, entered under a `0.125rem --rule-strong` — the heaviest rule on the page after the masthead, marking the end of the book.

- All type at `--fs-body-sm`, `--fs-mono-label` or `--fs-caption`. The footer is deliberately the smallest type on the page; a footer set at body size reads as content and steals attention from the form above it.
- Block headings: `--fs-mono-label`, `--ink-muted`, letterspaced uppercase.
- Links: `--marine` with a `--sienna` underline swell on hover and focus.
- Addresses: `--fs-data` (mono) — addresses and phone numbers are verified facts and belong in mono under the mono law.
- **Sources table:** `--paper` bed inside the `--paper-laid` section, `0.0625rem --rule` row rules, header row at `--fs-mono-label` on `--paper-tracing`. `LAST VERIFIED` dates in `--verdigris` where current, `--clay` where the entry is overdue for re-verification — a small operational device that makes staleness visible to the team as well as the reader.
- Dual clock: `--fs-data`, `--ink-muted`, muted relative to the parents' chapter version.
- Closing line: Newsreader italic at `--fs-deck`, `--ink-muted`, centred — the only centred text on the entire page, which is what makes it read as an imprint.
- Closing rule: `0.0625rem --rule-strong`, drawn once.
- `--r-0` everywhere. No shadow. No card.

### 16.8 Imagery

**None, with one functional exception.** The `Organization` structured data requires a `logo` of at least 112×112, so a **single-colour `--ink` SVG wordmark** sits at the head of the legal entity block and doubles as the schema logo reference. It is a wordmark, not an illustration, and it is the only mark of its kind on the page.

**v2:** unchanged. No branch photographs here — those belong in the `branch-atlas` drawers (`02-sections-part1.md` § 8), where they are contextual rather than decorative.

### 16.9 CTA placement & conversion note

**No primary CTA.** Four real anchors — three `tel:` and one `wa.me` — plus the back-to-top.

- The footer is the auditability promise, not an ask. A `Book free counselling` button here would be the fifth on the page and the least earned.
- **The Sources & Methods table is the conversion device.** For the parent persona it is the last thing read before leaving, and it is the strongest possible closing argument: a company that publishes who owns each figure and when it was last checked is a company that expects to be checked. It is also, structurally, the one thing on this page a competitor cannot copy in a sprint — cloning the table requires doing the operational work of maintaining it, and an unmaintained clone visibly rots.
- The three phone numbers are given as three, with their scopes labelled, because a toll-free line, a national mobile and a branch landline answer three different anxieties. A single "contact us" would answer none.
- The disclaimer is placed above the closing line rather than buried, and it is written in plain language rather than legalese, because a plainly stated limitation is a trust signal in a category whose defining behaviour is over-promising.

### 16.10 Accessibility

- Landmark: `<footer role="contentinfo">`.
- Heading levels: **H2** `The Colophon`, **H3** per block (`Eighteen branches, with addresses`, `Fifteen destinations`, `Fifteen services`, `Sources & Methods`), **H4** per branch city.
- Each branch is an `<address>` inside a `<li>`, with `tel:` anchors.
- Link lists are wrapped in `<nav aria-label="Destinations">` and `<nav aria-label="Services">` so they are individually navigable.
- **Sources table** is a real `<table>` with `<caption>`, `<th scope="col">` on all five headers and `<th scope="row">` on the figure. On tablet it lives inside a `tabindex="0"` scroll container with `role="region"` and an accessible name, so keyboard users can scroll it.
- On mobile the table becomes a `<dl>`-structured stack; the same registry data renders both forms, so they cannot drift.
- **Back-to-top moves focus**, not just scroll position: it sends focus to the skip-link target so keyboard users are actually returned to the top of the document.
- `LAST VERIFIED` staleness is indicated by colour **and** by the word `overdue` in the cell — never colour alone.
- Contrast: `--ink-muted` on `--paper-laid` must be measured and recorded (the canon quotes 6.8:1 against `--paper`). `--marine` links ≥11:1. `--verdigris` and `--clay` in the table to be measured against `--paper`.
- Touch targets: every footer link gets `padding-block: var(--s-2)` giving ≥44px rows on mobile; `<summary>` rows ≥56px.
- Bottom padding clears the mobile bar and the Android gesture inset.
- Screen-reader flow: "content information" → heading 2 → legal entity → three phone links → branch heading → 18 addresses → destinations nav → services nav → accreditations → "Sources and Methods, heading level 3" → table caption → 16 rows → clock → legal links → disclaimer → closing line → copyright → back to top.

### 16.11 Motion cue

- **Owner: GSAP.** One DrawSVG closing rule, **600ms**, `power2.inOut`, once, on entry. That is the entire motion budget for this section.
- The dual clock updates its value on the minute **without** an odometer roll — the animated version belongs to `for-parents` (§ 10), where it is an argument; here it is an imprint.
- No hover animation beyond the standard `--dur-2` link underline swell.
- Reduced motion renders the rule at full length. `05-motion-blueprint.md` § 16.

---

## 17. `mobile-bar` — The Mobile Bar

> **Chapter:** — (chrome) · **Breakpoint:** `<1024px` only · **Surface:** `--paper` at 98%, top hairline `--rule-strong` · **Motion owner:** Motion

### 17.1 Purpose & UX objective

Persistent thumb-zone conversion on the device class that carries the majority of the traffic. Three real anchors — **Call · WhatsApp · Book** — sitting above the Android gesture inset, functional with JavaScript disabled, and pre-filled from whatever destination the visitor last tapped. Budget Androids are more than 55% of Indian web traffic on 3–6 Mbps connections; a sticky bottom bar in the thumb zone is worth a documented 5–12% lift in mobile completion, and it is the only element on the page that guarantees the visitor is never more than one thumb-reach from a human.

**Think:** nothing. A good utility bar is not thought about. **Feel:** availability. **Do:** call, message, or jump to the form, from any scroll depth.

### 17.2 Story chapter

Chrome. Present across all six chapters below 1024px.

### 17.3 Content hierarchy

1. Top hairline — `0.0625rem --rule-strong`
2. `Call` — `tel:+918282828215`
3. `WhatsApp` — `wa.me/918282828215?text=…`, body pre-filled from the last destination chip
4. `Book` — `#enquiry`, visually dominant
5. Safe-area padding below

### 17.4 Draft copy

| Slot | Visible label | Accessible name | Target |
|---|---|---|---|
| 1 | `Call` | `Call Global Opportunities, 8282 8282 15` | `tel:+918282828215` |
| 2 | `WhatsApp` | `Message Global Opportunities on WhatsApp` | `wa.me/918282828215?text=…` |
| 3 | `Book` | `Book free counselling` | `#enquiry` |

**Pre-filled WhatsApp body**, from the last chip tapped anywhere on the page:
`Hi, I'd like counselling for a Master's in the UK, September 2027 intake.`
Default, before any chip is tapped:
`Hi, I'd like to know more about studying abroad.`

The third label is `Book`, not `Book free counselling`, because at 390px a third of the bar cannot carry four words at a legible size. **The full canonical label is the accessible name**, so screen-reader users get `Book free counselling` verbatim.

### 17.5 Layout

**Below 1024px only.** Fixed to the viewport bottom at `--z-mobilebar` (40).

- Content height **56px**; total height `56px + max(var(--s-2), env(safe-area-inset-bottom))`.
- Width split: `Call` 28% · `WhatsApp` 28% · `Book` 44%. The Book slot is visually dominant and is the only filled control.
- Every target ≥48px tall and ≥88px wide at 390px — comfortably above the canon's 48px mobile-bar floor.
- Top hairline `0.0625rem --rule-strong` spanning the full width.
- `<main>` receives `padding-bottom: calc(56px + env(safe-area-inset-bottom))` below 1024px so the bar never covers the colophon's closing line.

**Suppression rules.**

| Condition | Behaviour |
|---|---|
| `#enquiry` is in the viewport | Bar is visually hidden and marked `inert` + `aria-hidden`. Two competing primary CTAs in the same thumb region cost taps. |
| A drawer or dialog is open | Bar is `inert`. `--z-drawer` (60) and `--z-scrim` (50) already sit above `--z-mobilebar` (40), but `inert` is applied regardless so focus cannot reach it behind a scrim. |
| ≥1024px | The bar does not render at all. |

**No auto-hide.** The bar does not retract on scroll-down and reappear on scroll-up. Auto-hiding bars cost taps, and a utility that moves is a utility that has to be hunted for.

### 17.6 Wireframe — mobile

```
   … page content …
   padding-bottom: calc(56px + env(safe-area-inset-bottom))
 ┌─ 390 ───────────────────────────────────────────────┐
 ├──────────── 0.0625rem --rule-strong ────────────────┤
 │            │              │                         │
 │    Call    │   WhatsApp   │        Book             │  56px
 │   (ghost)  │   (ghost)    │  (solid --sienna-press) │  ≥48px targets
 │    28%     │     28%      │          44%            │
 ├─────────────────────────────────────────────────────┤
 │        env(safe-area-inset-bottom) padding          │  Android gesture
 └─────────────────────────────────────────────────────┘  inset

 surface --paper @98% · NO backdrop-filter · --z-mobilebar (40)
 WhatsApp = --ink text + 1px --rule-strong outline — NEVER brand green
 enters once on translateY at 25% scroll depth; never auto-hides
 SUPPRESSED + inert while #enquiry is in view
```

### 17.7 Visual direction

- Surface `--paper` at **98% opacity**, with **no `backdrop-filter`** — canon build note 8 applies to every fixed surface on the page, including this one. The 2% translucency lets the page beneath register faintly without a blur pass, which matters on Mali and Adreno GPUs.
- Top hairline `0.0625rem --rule-strong`. No shadow of any kind; the hairline is the whole separation.
- `Call` and `WhatsApp`: ghost treatment — `--ink` label, `1px --rule` vertical dividers between slots, no fill.
- `Book`: solid `--sienna-press`, white label, `--r-pill` inset within its slot with `--s-2` padding all round, `--sienna-deep` on active.
- Labels at `--fs-body-sm`, Hanken 600.
- **WhatsApp is `--ink` text with a `1px --rule-strong` outline — never WhatsApp brand green.** Green means *verified* on this page (`--verdigris` / `--verdigris-on-dark`) and that semantic must not leak into a channel icon. This is a canon rule, not a preference.
- **Three words, at a legible size, in the page's own typeface — always.** Since 2026-08-04 each slot may also carry one decorative `<Icon>` above or before its word (`04-design-system.md §5`). The icon is additive and the label is not optional: **this bar is never icon-only**, at any breakpoint, under any space pressure. If the three labels no longer fit, the labels stay and the icons go.

### 17.8 Imagery

**No photography, no logos, no brand marks.** As of 2026-08-04 the three slots may each carry one Lucide glyph beside its text label; the labels remain the payload and the section still ships nothing that could be called an image.

> **Changed 2026-08-04 · client override.** This passage previously read *"None. No icons, no logos, no channel glyphs. Three text labels."* The site-wide adoption of Lucide supersedes the "no icons" half of it. The reasoning behind the original refusal is kept because it still constrains what the icons are allowed to do here:
>
> Icon-only bottom bars are the category default and they fail twice. A phone glyph and a WhatsApp glyph both read as "some kind of contact" to a 50-year-old, which is why the word is mandatory and the glyph is decoration — **the whole objection was to icons *instead of* labels, not to icons at all.** And the WhatsApp glyph cannot be rendered in its brand green, which this page has reserved for a different meaning; that prohibition is unchanged, and the `currentColor` rule in `04-design-system.md §5` enforces it structurally, since a glyph passed through `<Icon>` inherits `--ink` and has no way to introduce a colour of its own.
>
> The channel logos themselves — the official WhatsApp mark, any app-store or brand badge — remain banned. What is now admissible is a *generic* Lucide glyph drawn in the page's own stroke weight and ink: a message mark, not the WhatsApp mark.
>
> **The three glyphs, settled.** `Call` takes `Phone`, `WhatsApp` takes `MessageCircle`, `Book` takes `CalendarCheck`. `MessageCircle` is a plain speech bubble with nothing WhatsApp about it, and because it passes through `<Icon>` it inherits `--ink` from the label beside it. That is the point worth keeping: the brand green is held out **structurally**, by `currentColor`, and not by anyone remembering the rule at the call site.
>
> **All three at `size="sm"` — a deliberate deviation, recorded here.** `04-design-system.md §5` gives `md` as the default and assigns `lg` to the mobile bar and other ≥48px targets. This bar takes `sm` instead, and the reason is arithmetic rather than taste. At 320px each of the three grid cells has roughly **91px of content box**, and the word `WhatsApp` alone consumes about **62px** of it. A 20px glyph plus its gap does not fit beside that word — the label wraps, and a wrapped label in a 56px bar is worse than no glyph at all. The labels are non-negotiable (§17.7), so the glyph is the thing that gives way. This is the same rule as *"if the three labels no longer fit, the labels stay and the icons go"*, applied one step earlier: at the size step, before it has to be applied to the icon's existence.

### 17.9 CTA placement & conversion note

The bar is three CTAs and nothing else.

- **Sticky bottom bar in the thumb zone: +5–12% mobile completion.** The bar is full-width, ≥48px, and padded above the Android gesture bar exactly as the research prescribes.
- **`tel:` and `wa.me` are real `<a href>` anchors that work with JavaScript disabled** (canon build note 11). On budget Androids at 3–6 Mbps this is the difference between a bar that works at 800ms and one that works at 4s.
- **WhatsApp carries the qualified message.** Pre-filling from the last destination chip means the enquiry arrives already qualified, which is what makes India's 45–90 second median reply time commercially useful. Response rates of 60–70% against 20–30% for web forms make this, for a large share of mobile visitors, the highest-yield control on the page.
- **Three channels, not one.** The student taps `Book`, the parent taps `Call`, and the visitor who will do neither taps `WhatsApp`. The research is explicit that these are different people with different channel behaviour and that forcing them into one form loses two of the three.
- **The bar enters at 25% scroll depth, not at load.** At load, the hero's own CTA is on screen; introducing a second primary action in the first viewport would be the page's first act of shouting. 25% is roughly the end of the colophon strip — the point at which the visitor has been given evidence and an ask is earned.

### 17.10 Accessibility

- Landmark: `<nav aria-label="Quick contact">` at `--z-mobilebar`.
- Heading level: none. A utility bar is not a heading.
- All three are `<a>` elements, never `<button>` — they navigate, and they must be openable in a new tab, long-pressable and copyable.
- **DOM order is last**, immediately before `</body>`, so the bar does not interrupt the reading order of the document. Visually it is fixed; for screen-reader and keyboard users it is a persistent utility reached at the end, which is the standard and expected position.
- Accessible names are the full labels, not the truncated visible text: `Book free counselling`, `Call Global Opportunities, 8282 8282 15`, `Message Global Opportunities on WhatsApp`.
- **No-JS contract:** the bar is server-rendered and visible from first paint with no transform applied. The entrance `translateY` is added by JavaScript only; with JS off the bar is simply present. It must never be hidden by default in CSS and revealed by script.
- `inert` plus `aria-hidden` are applied together whenever the bar is suppressed, so it is removed from the accessibility tree and the tab order at the same time it disappears visually.
- Contrast: `--ink` on `--paper` at 98% ≥16:1; white on `--sienna-press` 5.4:1; the top hairline is non-text.
- Touch targets: ≥48px tall, ≥88px wide at 390px, with `padding-bottom: max(var(--s-2), env(safe-area-inset-bottom))` clearing the Android gesture area.
- Focus ring: `2px --sienna-press` with 2px offset; verify it is not clipped by the bar's top edge — the bar's `overflow` must not be `hidden`.
- Screen-reader flow: "Quick contact, navigation" → "Call Global Opportunities, 8282 8282 15, link" → "Message Global Opportunities on WhatsApp, link" → "Book free counselling, link".
- **Icons in the bar are `aria-hidden` and change none of the above.** Each anchor's accessible name comes from its visible label, so an added glyph is silent to AT. Because the label always ships, no anchor here ever meets the "sole content of a control" case that would require `<Icon label="…">` (`04-design-system.md §5`) — SC 1.1.1 is satisfied by the word, as it was before.

### 17.11 Motion cue

- **Owner: Motion.** One entrance: `translateY` from below the viewport to rest, fired **once** at 25% scroll depth, `--dur-4`, `--ease-quart`. It never plays again.
- **No auto-hide, no re-entry, no infinite anything.** Suppression while `#enquiry` is in view is an opacity and `inert` change at `--dur-3`, not a slide.
- Press feedback on `Book`: `--ease-press` at `--dur-1`.
- Reduced motion renders the bar in place at first paint with no entrance. `05-motion-blueprint.md` § 17.

---

*End of Part 2. Sections 1–8 and the page-opening strategy are in `02-sections-part1.md`. All animation specification is owned by `05-motion-blueprint.md`.*
