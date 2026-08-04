# 02 — Section Specifications, Part 1: Running Head through Branch Atlas

**Purpose of this document.** This is the build-ready specification for the first eight of the sixteen canonical sections of the Global Opportunities landing page — `sticky-nav`, `hero`, `colophon-strip`, `gazetteer`, `register`, `what-we-do`, `still-page`, `branch-atlas`. It converts the locked creative direction into content hierarchy, ship-ready copy, responsive layout, wireframes, surface tokens, plate assignments, conversion rationale and accessibility contracts. Every token, every headline and every stat here is taken verbatim from the canon (`direction.md`). Nothing in this document re-opens a decision recorded there; where the canon leaves a gap, this document closes it and says so in the margin.

**Related documents.**

| File | Owns |
|---|---|
| `direction.md` | THE CANON. Tokens, copy, section architecture. Supersedes everything. |
| `01-foundations.md` | Token layer, font loading, grid, Plate System primitives, marginalia rail |
| `02-sections-part1.md` | *this document* — sections 1–8 |
| `03-sections-part2.md` | sections 9–16 plus the mobile bar |
| `05-motion-blueprint.md` | **All animation specification.** This document names motion moments and their owning library only. It does not specify timelines, thresholds or reduced-motion branches. |

---

## Table of contents

- [Page opening strategy](#page-opening-strategy)
  - [The first-3-seconds contract — desktop](#the-first-3-seconds-contract--desktop-1440x900)
  - [The first-3-seconds contract — 390px mobile](#the-first-3-seconds-contract--390px-mobile)
  - [The first-scroll reward](#the-first-scroll-reward)
  - [Page-wide conventions established here](#page-wide-conventions-established-here)
- [1. `sticky-nav` — The Running Head](#1-sticky-nav--the-running-head)
- [2. `hero` — The Departure Card](#2-hero--the-departure-card)
- [3. `colophon-strip` — The Colophon Strip](#3-colophon-strip--the-colophon-strip)
- [4. `gazetteer` — The Gazetteer](#4-gazetteer--the-gazetteer)
- [5. `register` — The Register](#5-register--the-register)
- [6. `what-we-do` — Fifteen Things We Do](#6-what-we-do--fifteen-things-we-do)
- [7. `still-page` — Nothing Here Casts a Shadow](#7-still-page--nothing-here-casts-a-shadow)
- [8. `branch-atlas` — Eighteen Doors](#8-branch-atlas--eighteen-doors)

---

## Page opening strategy

The page has one job in its first screen: prove it is a publication, not a funnel. Everything in the opening is calibrated against a single hostile scenario — a 47-year-old father in Jalandhar, opening a link his daughter sent him, on a ₹15,000 Android, on congested tier-2 4G at 3–6 Mbps, who has already been burned by one agent and expects to be sold to. He is the buyer. If the first screen shouts, he leaves. If it under-claims and shows its working, he scrolls.

### The first-3-seconds contract — desktop (1440×900)

| Moment | What is on screen | Why |
|---|---|---|
| Paint 1 (server HTML + critical CSS) | Running head, wordmark, `VOL. XXV`, six nav items, `1800 111 119` as text, the `Book free counselling` pill, eyebrow, H1, deck, both CTAs, proof line, accreditation micro-row, and the Departure Card **already complete and cleared** | Nothing above the fold depends on JavaScript. The Departure Card is server-rendered at its final values (canon build note 5); the boot sequence animates *toward* what is already in the DOM. |
| LCP | **The H1 text `Step out without doubt.`** — never a plate, never an image | Canon build note 2. Newsreader and Hanken Grotesk are preloaded; the plate is CSS gradient + inline SVG and cannot contend. Target LCP ≤2.5s at p75; on desktop broadband expect ~1.0–1.4s. |
| ≤1400ms | The one-shot hero boot sequence completes and stops. The page is then still. | Canon motion budget. There is no ambient loop anywhere on this page. |
| By t=3.0s | The visitor has, unaided, the answers to three questions | |

**The three questions, and where each is answered above the fold:**

1. **Is this for me?** — Eyebrow: `STUDY ABROAD GUIDANCE FOR INDIAN FAMILIES · SINCE 2001`. Not "students". *Families*. The buyer is named in the first eleven words.
2. **Is this real?** — Deck: `700+ partner universities across 15 countries, 18 offices you can walk into`. Proof line: `A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST. No fee, no obligation.` Accreditation micro-row: six third-party marks. Specific integers, per the CRO research, beat adjectives for parent co-deciders.
3. **What do I do next?** — One filled pill, `Book free counselling`, with `30 min · free · no obligation` beneath it, and one underlined text alternative, `Explore 15 destinations`, for the visitor who is not ready.

**What is deliberately absent from the first screen:** any percentage, any star rating, any "India's leading / top / #1", any countdown, any seat count, any photograph, any glass, any shadow, any loop. The absence is the argument.

### The first-3-seconds contract — 390px mobile

390×844 is the design width. Subtracting browser chrome and the 52px running head leaves roughly **640px of first-paint canvas**. The stacking order below is different from desktop, and the difference is deliberate.

| Order | Element | Approx. height at 390px |
|---|---|---|
| 1 | Eyebrow, `--fs-label`, wrapped to 2 lines | 30px |
| 2 | H1 `Step out without doubt.` at the `--fs-d0` clamp floor of `3.25rem`, 3 lines at `0.92` leading | 143px |
| 3 | Deck, `--fs-deck` at its floor of `1.25rem`, 5 lines | 142px |
| 4 | Primary CTA `Book free counselling`, full width, ≥48px | 48px |
| 5 | CTA sub-label `30 min · free · no obligation` | 18px |
| 6 | Proof line, 2 lines | 34px |
| 7 | Secondary CTA `Explore 15 destinations` as an underlined text link | 44px |
| 8 | **Top two rows of the Departure Card, cropped by the fold** | remainder |

Total to the bottom of the secondary CTA ≈ **500px including `--s-4` and `--s-5` gaps**, leaving ~140px in which the Departure Card's header row and station `01` are visible but incomplete. **That crop is the scroll invitation and it is the only "engagement device" on the page.** It works because a half-visible form is a question, and the answer is one thumb-flick away.

Three mobile-only decisions, recorded here so they are not re-litigated downstream:

- **The CTA moves above the Departure Card.** On desktop the card sits beside the type; on mobile, stacking it before the CTA would push the ask below 700px. The deck already carries the verified specifics, so the CTA still arrives after evidence and does not violate the NN/g rule against asking for commitment without a reason.
- **Plate A moves below the Departure Card.** The plate is atmosphere; the card is argument. On a 390px screen, argument goes first.
- **The mobile bar is not yet on screen.** It enters at 25% scroll depth (see `03-sections-part2.md` § mobile-bar). Between 0% and 25%, the hero's own full-width CTA is the persistent action. There is no window in which the visitor has no reachable ask.

### The first-scroll reward

One viewport of scroll — roughly 900px on desktop, 844px on mobile — must deliver **a different kind of thing**, not more of the same thing. The reward is `colophon-strip`.

- **Desktop.** The surface changes from `--grad-paper-vignette` to flat `--paper-laid`. The six canonical statistics arrive as **one line of set text with six sienna superscripts**, and the marginalia rail on the right lights up for the first time with six footnotes carrying sources and last-verified dates. The reward is not a bigger number. The reward is the discovery that **every number on this page can be checked**, and that discovery happens 900px in, before a single further ask.
- **Mobile.** The first flick completes the Departure Card — the remaining four stations and the `STATUS: GO · SEPTEMBER 2027 INTAKE` bar resolve as they enter — and lands on the colophon strip in its stacked form, each stat on its own line with an inline `<details>` footnote directly beneath it.

The reward is explicitly *not* motion. Nothing scrubs, nothing parallaxes, nothing pins until `eleven-months`. What changes on first scroll is the **register** of the page: from statement to citation.

### Page-wide conventions established here

These are established in Part 1 and consumed by `03-sections-part2.md`. They are not new tokens; they are usage law.

**1. Footnote marker convention.** The marginalia rail carries two kinds of mark, and they must never be confused:

| Marker | Means | Backed by |
|---|---|---|
| `¹ ² ³ ⁴ ⁵ ⁶ …` numerals, `--sienna` | **A sourced fact.** A figure, date, cost, deadline or count. | A row in the Sources & Methods registry with a named source, an owner and a last-verified date. Numerals `¹`–`⁶` are permanently bound to the six canonical stats in the canon's stat table. |
| `†` dagger, `--sienna` | **An editorial or illustrative note.** Worked examples, specimen values, "this is how the format works". | Nothing external. It is a note from the editor, and it says so. |

This split exists because the page contains illustrative artifacts — the Departure Card, the three specimen sheets, the ledger's worked example — whose values are *not* facts about a real student. Numbering them would be a lie in the shape of a citation.

**2. The mono law, applied to proper nouns.** IBM Plex Mono is reserved for verified fact: numbers, dates, costs, deadlines, coordinates, station labels, stamps and citations. **Institution names, counsellor names and city names are set in the editorial voice (Hanken or Newsreader), not in mono** — they are nouns, not measurements. A partner count is mono; the university's name beside it is not.

**3. Heading map (Part 1 half).** One `<h1>`, no skipped levels, no CTA is ever a heading.

| Section | Level | Text |
|---|---|---|
| `sticky-nav` | — | landmark only, no heading |
| `hero` | H1 | Step out without doubt. |
| `colophon-strip` | H2 | What we publish, and where it comes from |
| `gazetteer` | H2 | Fifteen places, indexed. |
| `register` | H2 | Seven hundred agreements, and the names on them. |
| `what-we-do` | H2 | Fifteen things we do, and what each one costs you. |
| `still-page` | H2 | Nothing here casts a shadow. |
| `branch-atlas` | H2 | Eighteen doors you can walk through. |

The H2s are editorial, not keyword-bearing. This is a named trade-off the canon already accepts: the SEO payload is carried by the `<title>` (`Study Abroad Consultants in India | Free Counselling`), by the deck, and by the H3s inside `gazetteer` and `questions`, which *are* literal searcher questions.

**4. Anchor offset.** Every section sets `scroll-margin-top: var(--s-9)` (96px) so the sticky running head never covers the target of an in-page jump or a keyboard focus move.

**5. `[VERIFY]` flags.** Where this document supplies a figure that the research files do not source, it is marked `[VERIFY]`. **A `[VERIFY]` figure may not ship set in mono.** It either resolves to a registry row before launch, or the field is removed. A 404ing footnote does more damage than no footnote.

---

## 1. `sticky-nav` — The Running Head

> **Chapter:** — (chrome; spans all six) · **Surface:** `--paper` at 96% opacity, no `backdrop-filter` · **Motion owner:** Motion

### 1.1 Purpose & UX objective

The running head is the page's masthead: the single line that declares this is Volume XXV of a reference work with an editor, a date and a place of publication, and that keeps one phone number and one action within a glance at any scroll depth on a page that is sixteen sections long. It is not a navigation menu in the SaaS sense — it carries six destinations and refuses the ninth dropdown that GO's current site offers. Its second, quieter job is orientation: the chapter spine in the left gutter fills as the reader descends, so a visitor who lands two-thirds down from a search result can tell at a glance that there are six chapters and they are in the fourth.

**Think:** "This is a publication with a history, not a lead-generation page." **Feel:** oriented and unhurried; never chased. **Do:** jump to a chapter, dial `1800 111 119`, or book.

### 1.2 Story chapter

Chrome. Belongs to no chapter and displays all six — the spine re-typesets its label at each chapter boundary (`I DREAM` → `II EXPLORE` → `III TRUST` → `IV CHOOSE` → `V APPLY` → `VI SUCCESS`).

### 1.3 Content hierarchy

1. Skip link — `Skip to content`, first in DOM, `--z-skiplink`, visible on `:focus-visible` only
2. Running-head line (row 1, ≥1280px only): `GLOBAL OPPORTUNITIES · AN ATLAS OF DEPARTURES · VOL. XXV · EST. AMRITSAR 2001`
3. Wordmark — `GLOBAL OPPORTUNITIES`, anchor to `/`
4. `VOL. XXV` — mono lockup beside the wordmark
5. Primary nav, six items in canon order: `Destinations` · `Costs` · `Process` · `Counsellors` · `Offices` · `For Parents`
6. Destinations mega-panel (the only panel on the page)
7. Toll-free number as **text**: `1800 111 119`, preceded by the mono label `TOLL-FREE`. Since 2026-08-04 a decorative `<Icon as={Phone} size="sm" />` may sit before the label; the number is never replaced by a glyph (`04-design-system.md §5`)
8. Primary CTA pill: `Book free counselling`
9. Chapter spine — vertical hairline in the outer left gutter, ≥1280px, filling with `--grad-spine-fill`
10. Mobile/tablet: `Menu` disclosure replacing items 2 and 5–6

### 1.4 Draft copy

- Running head: `GLOBAL OPPORTUNITIES · AN ATLAS OF DEPARTURES · VOL. XXV · EST. AMRITSAR 2001`
- Wordmark: `GLOBAL OPPORTUNITIES`
- Volume lockup: `VOL. XXV`
- Nav: `Destinations` · `Costs` · `Process` · `Counsellors` · `Offices` · `For Parents`
- Phone: label `TOLL-FREE`, number `1800 111 119`
- CTA: `Book free counselling`
- Skip link: `Skip to content`
- Mega-panel heading: `Fifteen places, indexed.`
- Mega-panel column heads: `ANCHOR DESTINATIONS` · `THE OTHER ELEVEN`
- Mega-panel footer link: `Open the gazetteer →`
- Mega-panel microcopy beneath the four anchors: `Partner counts, intake windows, tuition bands and post-study work rights for all fifteen.`
- Mobile menu button: `Menu` / `Close`
- Spine labels: `I DREAM` · `II EXPLORE` · `III TRUST` · `IV CHOOSE` · `V APPLY` · `VI SUCCESS`

### 1.5 Layout

**Desktop ≥1280px.** Two rows, `padding-inline: var(--gutter)`, inner content stretched to `--frame-max` (1600px) — the running head is the only element on the page that uses the frame rather than `--content-max`, because a masthead runs to the trim.

- Row 1 — 24px. The running-head line, `--fs-label`, `--ink-muted`, letterspaced uppercase (a sanctioned use: running heads are one of the five reserved cases).
- Row 2 — 56px. Wordmark + `VOL. XXV` left; six nav items centred; `TOLL-FREE 1800 111 119` then the CTA pill right.
- Rule beneath: `0.0625rem` `--rule` at rest.
- **Past 40px of scroll:** row 1 collapses to zero height, the bar settles at 56px, the wordmark scales `1 → 0.92` from its left origin, and the rule strengthens to `0.25rem` `--rule-strong`. This is the canon's masthead-rule weight, and it is earned by scrolling rather than asserted at rest.
- Chapter spine: fixed, in the left gutter outside `--content-max`, 1px `--rule-strong` track, fill `--grad-spine-fill`, rotated label at `--fs-mono-label`.

**1024–1279px.** Row 1 drops. Single 56px bar. Six nav items remain but the mega-panel narrows to two columns. Marginalia rail is at `--rail-md` (64px) — see `01-foundations.md`.

**Tablet 768–1023px.** Single 56px bar: wordmark + `VOL. XXV` left; `Menu` button, phone text and CTA pill right. Nav items move inside the menu panel, which opens as a full-width sheet beneath the bar (not a modal) and lists the six items plus the fifteen destinations. The chapter spine is removed.

**Mobile <768px.** Single 52px bar: wordmark left, `Menu` right. **The CTA pill and the phone text leave the bar** and live in the menu panel's head plus the mobile bar (`03-sections-part2.md`). Between 0% and 25% scroll depth the hero's own CTA is the reachable action. `VOL. XXV` is dropped below 480px; the wordmark is never abbreviated.

### 1.6 Wireframe — desktop

```
┌── frame 1600, padding-inline: var(--gutter) ─────────────────────────────────┐
│ GLOBAL OPPORTUNITIES · AN ATLAS OF DEPARTURES · VOL. XXV · EST. AMRITSAR 2001│  row 1  24px  --fs-label / --ink-muted
├──────────────────────────────────────────────────────────────────────────────┤
│ GLOBAL OPPORTUNITIES  VOL. XXV   Destinations▾ Costs Process Counsellors      │
│                                  Offices For Parents    TOLL-FREE            │  row 2  56px
│                                                     1800 111 119 (Book free…)│
└──────────────────────────────────────────────── 0.0625rem --rule ────────────┘
   ▲ past 40px scroll: row 1 → 0px · wordmark scale 0.92 · rule → 0.25rem --rule-strong

  spine (fixed, outer left gutter, ≥1280px)
  ┃  ← 1px --rule-strong track
  ┃▓ ← fill --grad-spine-fill, driven by useScroll
  ┃▓  "II EXPLORE" rotated 90°, --fs-mono-label

── Destinations mega-panel (open) ─────────────────────────────────────────────
│ Fifteen places, indexed.                                                     │
│ ANCHOR DESTINATIONS            THE OTHER ELEVEN                              │
│ [▨] UNITED KINGDOM  80+        Dubai      Ireland     Singapore              │
│ [▨] UNITED STATES  150+        Europe     Italy       Spain                  │
│ [▨] CANADA          60+        France     Malaysia    Switzerland            │
│ [▨] AUSTRALIA       45+        Germany    New Zealand                        │
│ Partner counts, intake windows, tuition bands and post-study work rights…    │
│                                                     Open the gazetteer →     │
└──────────────────────────────────────────────────────────────────────────────┘
   [▨] = Plate D thumbnail (coastline SVG + crosshair), 3:2, 1px --rule keyline
```

### 1.7 Visual direction

Surface `--paper` at 96% opacity with **no `backdrop-filter`** — canon build note 8 forbids it explicitly, including here. The 4% translucency is enough for the paper grain beneath to register and cheap enough to composite on a Mali GPU. `--r-0` on everything except the CTA pill at `--r-pill`. No shadow of any kind; the only separation from the page is the hairline.

Type: wordmark at `--fs-h4` (Hanken 600), `--ink`, no letterspacing — the wordmark is a name, not a running head. `VOL. XXV` at `--fs-mono-label` in `--marine`. Nav items at `--fs-body-sm`, `--ink`, with a `--sienna` underline swell on hover and focus (a 1px rule that grows to 2px, `--dur-2`, `--ease-quad` — colour and `scaleY` only). `TOLL-FREE` at `--fs-mono-label`, `--ink-muted`; the number itself at `--fs-body-sm` in `--marine`, underlined. CTA pill: solid `--sienna-press`, white text, `--r-pill`, 40px tall on desktop, never gradient.

Mega-panel: `--paper-laid` bed, `1px --rule` bottom edge, `--r-0`, no shadow — it is a page that has been turned down, not a floating card. Column rules `0.0625rem` `--rule`.

### 1.8 Imagery

Four **Plate D** (Cartographic Panel) thumbnails inside the mega-panel only — simplified coastline SVGs for the UK, USA, Canada and Australia at 3:2, reusing the same paths as `gazetteer` at reduced scale, so they cost zero additional bytes.

**v2:** unchanged. **Plate D is permanent.** It is not a photography placeholder — it is cartography, which is the page's own graphic system. If GO commissions destination photography in v2 it is added *beside* the Plate D inside the gazetteer's expanded micro-spread, never in place of it, and never in the nav.

### 1.9 CTA placement & conversion note

One primary CTA (`Book free counselling`) and one tertiary (`1800 111 119` as a `tel:` anchor). The NN/g caution that a CTA placed before any credibility evidence asks for commitment without a reason applies to *page content*, not to persistent chrome: the nav pill is not the page's first ask, it is the page's permanent ask, and it sits beside a published toll-free number — itself an artifact only a real company with a real switchboard can display. The pill exists because the page is long: a visitor who is convinced at section 12 must not have to scroll back to section 15 to act.

Deliberately **not** in the nav: a search field, a login, a language switcher, a second CTA, and any dropdown other than Destinations. GO's current site runs nine dropdowns; the research names nav-menu maximalism as a thing the new page must not repeat.

### 1.10 Accessibility

- Landmark: `<header role="banner">` containing `<nav aria-label="Primary">`. The mega-panel is inside that nav.
- Heading level: none. A masthead is not a heading, and the running-head line is decorative text with a real accessible reading (it is not `aria-hidden`).
- Skip link is the first focusable element in the document, at `--z-skiplink`, targeting `<main id="main">`.
- Focus order: skip link → wordmark → Destinations trigger → (panel contents when open) → Costs → Process → Counsellors → Offices → For Parents → phone → CTA pill.
- Destinations uses the disclosure pattern: `<button aria-expanded="false" aria-controls="nav-destinations">`. `Esc` closes and returns focus to the trigger. The panel is not a modal and does not trap focus; Tab exits it into the rest of the nav.
- Contrast: `--ink` on `--paper` 17:1; `--ink-muted` running head on `--paper` 6.8:1; `--marine` phone link 11.7:1; white on `--sienna-press` 5.4:1. **`--ink-faint` is not used in the nav** — at `--fs-label` (11px) it would be a 3.4:1 failure.
- Touch targets: every nav item's hit area is padded to ≥44×44px inside the 56px bar; the mobile `Menu` button is 48×48px.
- Screen-reader flow: banner → primary nav → six links → phone link ("Call toll-free 1800 111 119") → "Book free counselling, link" → main.
- The 96%-opacity surface means text behind the bar can bleed through at 4%. Verified as imperceptible at `--ink` weights; do not reduce opacity further.

### 1.11 Motion cue

- **Owner: Motion.** `useScroll` drives two things and only two: the 40px threshold state change (row 1 collapse, wordmark `scale` 1 → 0.92, rule weight) and the chapter spine fill. No GSAP instance touches the nav — this keeps the nav out of `ScrollTrigger.refresh()` entirely.
- Mega-panel open/close: `AnimatePresence`, opacity + `y`, `--dur-3`, `--ease-cubic`.
- Nav underline swell: CSS `scaleY` on a pseudo-element, `--dur-2`, `--ease-quad`. No JS.
- Thresholds, spring configuration and the reduced-motion branch are specified in `05-motion-blueprint.md` § 1.

---

## 2. `hero` — The Departure Card

> **Chapter:** I Dream · **Surface:** `--grad-paper-vignette` · **Motion owner:** GSAP (boot sequence, ≤1400ms, one-shot)

### 2.1 Purpose & UX objective

The hero states GO's own buried motto at enormous scale and, beside it, makes readiness tangible without a photograph. The Departure Card is the concept's load-bearing invention: a typeset readiness form of six stations — Course shortlist, Finance plan, English test, Documents, Visa file, Your counsellor — whose values resolve out of scramble, whose statuses flip, and which settles on `STATUS: GO · SEPTEMBER 2027 INTAKE`. It answers the question the category never answers, which is not "what does studying abroad feel like" but "**what does *ready* look like, and who is on my file**". The last station carries a human being's name. That is the differentiator, rendered as an artifact rather than claimed as a benefit.

**Think:** "These people know what the finished thing looks like, and they are not hiding the parts I haven't done." **Feel:** calm ambition — the specific, unglamorous confidence of a form with every line cleared. **Do:** book the call, or take the low-commitment path into the gazetteer.

### 2.2 Story chapter

**I — Dream.** `[data-chapter="dream"]`, `--nr-opsz: 72`. The dream is not a graduation cap in the air; it is a cleared form with a counsellor's name at the bottom.

### 2.3 Content hierarchy

1. Masthead rule — `0.25rem` `--rule-strong`, drawn once (DrawSVG)
2. Chapter spine label re-typesets to `I DREAM` (nav-owned; see § 1)
3. Eyebrow — `STUDY ABROAD GUIDANCE FOR INDIAN FAMILIES · SINCE 2001`
4. **H1** — `Step out without doubt.` final word italic
5. Deck — Newsreader italic, `--measure-deck` (52ch)
6. Primary CTA — `Book free counselling` + sub-label `30 min · free · no obligation`
7. Secondary CTA — `Explore 15 destinations`
8. Proof line — the canonical callback promise
9. Accreditation micro-row — six marks
10. **The Departure Card** — header, six station rows, specimen stamp, `STATUS: GO` bar, editorial note †
11. **Plate A** — Typographic Plate, 4:5, caption set inside the field
12. Marginalia rail: one dagger note (the card is illustrative). No numbered footnote appears above the fold — the first numeral is `¹` in `colophon-strip`.

### 2.4 Draft copy

**Eyebrow** (Hanken 600 uppercase, `--fs-label`):
`STUDY ABROAD GUIDANCE FOR INDIAN FAMILIES · SINCE 2001`

**H1** (`--fs-d0`, final word italic — the only italic word above the fold):
> Step out without **_doubt._**

**Deck** (`--fs-deck`, max 52ch):
> *Study abroad guidance for Indian families. One office in Amritsar in 2001; today 700+ partner universities across 15 countries, 18 offices you can walk into, and a counsellor you'll know by name.*

**Primary CTA:** `Book free counselling`
**CTA sub-label** (Plex Mono, `--fs-caption`): `30 min · free · no obligation`
**Secondary CTA:** `Explore 15 destinations`
**Proof line** (Plex Mono, `--fs-caption`):
> `A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST. No fee, no obligation.`

**Accreditation micro-row** (`--fs-mono-label`):
`AIRC · ICEF · AAERI · BRITISH COUNCIL · EDUCATION NEW ZEALAND · PTE PEARSON`

**The Departure Card — full copy:**

| Element | Text |
|---|---|
| Card head, left | `THE DEPARTURE CARD` |
| Card head, right | `FORM GO/XXV` |
| Column heads | `STATION` · `VALUE` · `STATUS` |
| Row 01 | `COURSE SHORTLIST` · `8 PROGRAMMES · 4 UNIVERSITIES` · `CLEARED` |
| Row 02 | `FINANCE PLAN` · `EST. ₹28.4L YEAR ONE · LOAN PRE-CHECKED` · `CLEARED` |
| Row 03 | `ENGLISH TEST` · `IELTS 7.0 · SAT 12 MAR 2027` · `CLEARED` |
| Row 04 | `DOCUMENTS` · `11 OF 11 FILED` · `CLEARED` |
| Row 05 | `VISA FILE` · `OPENS 14 JUN 2027` · `SCHEDULED` |
| Row 06 | `YOUR COUNSELLOR` · `AVINASH · DELHI SOUTH` · `ASSIGNED` |
| Status bar | `STATUS: GO · SEPTEMBER 2027 INTAKE` |
| Stamp | `SPECIMEN · ILLUSTRATIVE · NOT A STUDENT RECORD` |
| Footer line | `This card is filled in with you, on the first call.` |
| Dagger note (rail) | `† Illustrative. A worked example of a completed file, not a student record. Your own card is built with your counsellor on the first call.` |

The specimen stamp is not optional decoration. The card's values are set in IBM Plex Mono, and the canon's mono law says mono means *we can prove it*. A fabricated file rendered in the page's proof typeface, unstamped, would void the system on the first screen. Stamping it converts the card from a claim into a facsimile — which is what an atlas prints.

**Plate A caption** (set inside the field, `--fs-caption`, `--plate-white`):
`PLATE I` / `28.5562° N · 77.1000° E` / `INDIRA GANDHI INTERNATIONAL, TERMINAL 3` / `04:40 IST`

### 2.5 Layout

**Desktop ≥1280px.** 12 columns inside `--content-max` (1200px), `--grid-gap`. Section `min-height: min(100svh, 920px)`, `padding-block: var(--section-y)`, contents vertically centred.

| Element | Columns | Notes |
|---|---|---|
| Type stack (items 3–9) | 1–6 | Deck constrained to `--measure-deck` |
| Plate A | 8–12 | `aspect-ratio: 4/5`, caption **inset** (`data-caption="inset"`) |
| Departure Card | 7–12 | `margin-top: calc(-1 * var(--s-8))` (−64px) so it hangs one column left of the plate and overlaps its lower field. `--z-raised`. `--reg-sienna` offset. |

The overlap is the page's depth strategy made literal: a card tipped onto a plate, with a two-colour press slightly out of register. Because the card covers the plate's lower-left, Plate A's typeset content is composed top-left (`PLATE I`, coordinates) and top-right (`04:40 IST`), with the crosshair mark centred in the visible upper field. This is the documented `data-caption="inset"` variant of Plate A and it exists only in the hero.

**Tablet 768–1023px.** Single column, no overlap. Order: type stack (full width, deck at `--measure-deck`) → Departure Card (full width) → Plate A at `aspect-ratio: 16/10` with its caption returning to the standard block **beneath** the field. `--reg-sienna` retained on both. Marginalia rail is gone below 1024px; the dagger note becomes an inline `<details>` beneath the card.

**Mobile <768px.** Single column, `--gutter` side padding, order per § "first-3-seconds contract — 390px mobile": eyebrow → H1 → deck → primary CTA → sub-label → proof line → secondary CTA → **Departure Card** → accreditation micro-row → **Plate A at `aspect-ratio: 3/4`**.

Card at 390px: the three-column table collapses to two. `STATION` and `VALUE` stack in the left cell (station label at `--fs-mono-label` above, value at `--fs-data` below); `STATUS` stays right-aligned as a pill. Row height ≥56px. **No horizontal scroll anywhere.** The accreditation micro-row wraps to three lines of two marks; it does not scroll horizontally.

### 2.6 Wireframe — desktop

```
 col   1    2    3    4    5    6    7    8    9   10   11   12        rail 96px
     ┌──────────────────────────────────────────────────────────┐    ┌─────────┐
 ▓▓▓▓│▓▓▓▓▓▓▓▓▓▓ masthead rule 0.25rem --rule-strong (DrawSVG) ▓│    │         │
 ┃▓  │                                                          │    │ † Illus-│
 ┃▓  │ STUDY ABROAD GUIDANCE FOR INDIAN FAMILIES · SINCE 2001    │    │ trative.│
 ┃   │                                    ┌─────────────────────┐│    │ A worked│
 ┃   │ Step out                           │ PLATE I             ││    │ example │
 ┃ I │ without /doubt./                   │ 28.5562° N          ││    │ of a    │
 ┃ D │                                    │ 77.1000° E   04:40  ││    │ complet-│
 ┃ R │ /Study abroad guidance for Indian/  │              IST    ││    │ ed file,│
 ┃ E │ /families. One office in Amritsar/  │        ✛            ││    │ not a   │
 ┃ A │ /in 2001; today 700+ partner…/      │  INDIRA GANDHI      ││    │ student │
 ┃ M │                                    │  INTERNATIONAL, T3  ││    │ record. │
 ┃   │ ( Book free counselling )  Explore  │                     ││    │         │
 ┃   │   30 min · free · no obligation    ─┼─────────────────────┤│    │         │
 ┃   │   A GO counsellor calls you within  │ (plate continues)   ││    │         │
 ┃   │   15 minutes, 9 AM–9 PM IST.       ┌┴─────────────────────┴┐   │         │
 ┃   │   AIRC · ICEF · AAERI · BRITISH    │ THE DEPARTURE CARD    │◄──┼─ --reg- │
 ┃   │   COUNCIL · EDUCATION NEW ZEALAND  │            FORM GO/XXV│   │  sienna │
 ┃   │   · PTE PEARSON                    │ STATION  VALUE  STATUS│   │  3px 3px│
 ┃   │                                    │ 01 COURSE SHORTLIST  ✓│   │         │
 ┃   │                                    │ 02 FINANCE PLAN      ✓│   │         │
 ┃   │                                    │ 03 ENGLISH TEST      ✓│   │         │
 ┃   │                                    │ 04 DOCUMENTS         ✓│   │         │
 ┃   │                                    │ 05 VISA FILE         ○│   │         │
 ┃   │                                    │ 06 YOUR COUNSELLOR   ✓│   │         │
 ┃   │                                    ├───────────────────────┤   │         │
 ┃   │                                    │ STATUS: GO · SEP 2027 │   │         │
 ┃   │                                    │ SPECIMEN · ILLUSTRAT… │   │         │
 ┃   │                                    └───────────────────────┘   └─────────┘
     └──────────────────────────────────────────────────────────┘
  spine                        surface: --grad-paper-vignette + grain 4%
```

### 2.7 Wireframe — mobile (390px, structurally different)

```
┌─ 390 ───────────────────────────────┐
│ GLOBAL OPPORTUNITIES        Menu    │ 52px nav
├─────────────────────────────────────┤
│ STUDY ABROAD GUIDANCE FOR           │
│ INDIAN FAMILIES · SINCE 2001        │
│                                     │
│ Step out                            │
│ without                             │  H1 3.25rem
│ /doubt./                            │
│                                     │
│ /Study abroad guidance for Indian/   │
│ /families. One office in Amritsar/   │  deck 1.25rem
│ /in 2001; today 700+ partner…/       │
│                                     │
│ (      Book free counselling      )  │  48px, full width
│   30 min · free · no obligation     │
│   A GO counsellor calls you within  │
│   15 minutes, 9 AM–9 PM IST.        │
│   Explore 15 destinations           │  44px text link
├ ─ ─ ─ ─ ─ ─ FOLD ≈ 640px ─ ─ ─ ─ ─ ┤
│ ┌─────────────────────────────────┐ │
│ │ THE DEPARTURE CARD   FORM GO/XXV│ │  ← cropped by fold: the invitation
│ │ 01 COURSE SHORTLIST             │ │
│ │    8 PROGRAMMES · 4 UNIS      ✓ │ │
│ │ 02 FINANCE PLAN                 │ │
│ │    EST. ₹28.4L YEAR ONE       ✓ │ │
│ │ …                               │ │
│ │ STATUS: GO · SEPTEMBER 2027     │ │
│ │ SPECIMEN · ILLUSTRATIVE · NOT…  │ │
│ └─────────────────────────────────┘ │
│ ▸ † Illustrative. A worked example…│  inline <details> (rail is gone <1024)
│ AIRC · ICEF · AAERI                 │
│ BRITISH COUNCIL · EDUCATION NZ      │
│ PTE PEARSON                         │
│ ┌─────────────────────────────────┐ │
│ │ PLATE I  28.5562° N 77.1000° E  │ │  3:4
│ │            ✛                    │ │
│ │ IGI, TERMINAL 3        04:40 IST│ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 2.8 Visual direction

Surface `--grad-paper-vignette` — the only place on the page it is permitted — with the baked paper-grain tile over it at 4%, `mix-blend-mode: multiply`, static.

- **H1**: `--fs-d0`, Newsreader 300 at `--nr-opsz: 72`, `--ink`. `doubt.` in true italic, including the full stop.
- **Deck**: `--fs-deck`, Newsreader italic 300, `--ink-muted`, 52ch.
- **Primary CTA**: solid `--sienna-press`, white, `--r-pill`, 48px tall, `--sienna-deep` on hover/active. Never a gradient.
- **Secondary CTA**: `--marine` text with a 1px `--sienna` underline that swells to 2px on hover/focus.
- **Departure Card**: bed `--paper-tracing`, keyline `1px --rule`, `--r-1` (2px), `--reg-sienna` (`3px 3px 0 0 #C2562B`). Head and column labels `--fs-mono-label` `--ink-muted`; station labels `--fs-mono-label` `--ink`; values `--fs-data` `--ink` with `font-variant-numeric: tabular-nums lining-nums slashed-zero`; row rules `0.0625rem --rule`.
- **Status marks**: `CLEARED` / `ASSIGNED` as `--verdigris` text on `--verdigris-tint`, `--r-2`; `SCHEDULED` as `--ink-muted` on `--paper`, `--r-2`, 1px `--rule`. The ✓ and ○ glyphs are decorative and `aria-hidden`; the word carries the meaning.
- **Status bar**: full card width, `--verdigris-tint` fill, `--verdigris` text at `--fs-mono-label`.
- **Stamp**: `--fs-mono-label`, `--clay`, 1px `--clay` keyline box, `--r-1`, set at a true 0° — nothing on this page is rotated.
- **Plate A**: field `--grad-plate-marine`, SVG graticule at 8% white, one large crosshair mark, keyline `1px --rule-strong`, `--r-1`, type in `--plate-white` (`--fs-caption`) and `--fs-mono-label`.
- **Depth**: overlap + registration offset + whitespace. Zero blur, zero glass, zero elevation shadow.

### 2.9 Imagery

**Plate A — Typographic Plate.** The field is `--grad-plate-marine` overlaid with an 8%-white graticule and a single cartographic crosshair; its content is type — plate number, coordinates, place, time. It does not pretend a photograph exists; it is a caption given the room a photograph would have had.

**v2 replacement:** a commissioned documentary photograph — the departures hall at Indira Gandhi International Terminal 3, 04:40, a family at the barrier — drops into the identical 4:5 box behind the identical caption. The only change is `data-plate="field"` → `data-plate="photo"`. Zero layout shift, zero CSS change, and the caption is already correct because it was written from the real coordinates and the real hour. Photography rules: commissioned documentary only, natural light, real people in named real places; no stock, no AI imagery, no cap-toss, no globe, no aircraft.

**Never here:** an empty `<img>`, a grey box, a skeleton shimmer, or "image coming soon".

### 2.10 CTA placement & conversion note

One primary, one secondary, one proof line, one accreditation row — in that order, immediately after the deck.

- **The deck precedes the button.** It carries `700+`, `15`, `18` and `2001`. NN/g's credibility model warns that a CTA placed before any evidence asks for commitment without a reason; here the reason is four verified integers, and the research is explicit that specific integers outperform adjectives for parent co-deciders.
- **The sub-label prices the ask.** `30 min · free · no obligation` removes the three unpriced unknowns — how long, how much, what am I agreeing to — at the exact moment of the click. GO's legacy "Avail Free Counselling" priced none of them; "Avail" is retired page-wide.
- **The proof line publishes an operational commitment.** Speed-to-lead research (Oldroyd/InsideSales, 15,000+ leads) puts a 5-minute response at ~21× the qualification rate of 30 minutes; HBR's 1.25M-lead study puts 1 hour at 7× vs 2 hours. Publishing a real 15-minute window with real hours is the page-design expression of that operations decision, and it beats "we'll get back to you" outright.
- **The secondary CTA prevents a bounce.** Persona C (test-prep stage, low intent, high volume) and the 17-year-old who is browsing rather than deciding both need a non-committal path. `Explore 15 destinations` jumps to `#gazetteer` and keeps them on the page.
- **The Departure Card is itself a conversion surface.** Station 06, `YOUR COUNSELLOR · AVINASH · DELHI SOUTH`, is the single most differentiated pixel above the fold: the CRO research records that IDP and Leverage Edu show **zero** named counsellors above the fold. The card makes the named human an artifact rather than a claim, and it seeds the `contributors` chapter (`03-sections-part2.md` § 9) fifteen sections early.

### 2.11 Accessibility

- Landmark: `<main id="main">` opens here; `<section id="hero" aria-labelledby="hero-h1">`.
- Heading level: the page's only `<h1>`, `id="hero-h1"`. The eyebrow is a `<p>`, not a heading. Neither CTA is a heading.
- SplitText inserts wrapper spans into the H1. **Do not override the `aria-label`/`aria-hidden` pair it generates** — the accessible name must remain the unsplit string `Step out without doubt.`
- The Departure Card is a real `<table>`: `<caption class="sr-only">The Departure Card — an illustrative record of a completed application file</caption>`, `<th scope="col">` for STATION / VALUE / STATUS, `<th scope="row">` per station. The specimen stamp is real text inside the table's `<tfoot>`, not a background image, so it is announced.
- Status is never conveyed by colour or glyph alone (WCAG 1.4.1). The words `CLEARED`, `SCHEDULED` and `ASSIGNED` are the payload; `✓`/`○` are `aria-hidden`.
- Focus order: skip target → eyebrow (non-focusable) → H1 (non-focusable) → primary CTA → secondary CTA → footnote/dagger disclosure → card (non-interactive) → nothing else. The primary CTA precedes the secondary in DOM.
- Contrast: `--ink` on `--grad-paper-vignette` ≥17:1 across the whole ramp (the darkest stop is `--paper-laid`); `--ink-muted` 6.8:1; white on `--sienna-press` 5.4:1; `--verdigris` 5.8:1; `--plate-white` on the marine plate ~15:1. `--ink-faint` is not used.
- Touch targets: primary CTA 48px tall and full width on mobile; secondary CTA hit area padded to 44px.
- Screen-reader flow: "Study abroad guidance for Indian families, since 2001" → heading level 1 "Step out without doubt." → deck → "Book free counselling, link" → "30 minutes, free, no obligation" → "A GO counsellor calls you within 15 minutes…" → accreditation list → "The Departure Card — an illustrative record…" → table.
- Under `prefers-reduced-motion`, the card renders complete and cleared on first paint and the H1 does not split. **The reduced branch must land on the final, fully visible state.**

### 2.12 Motion cue

- **Owner: GSAP** for the entire one-shot boot sequence, capped at **1400ms**, fired once on load, never re-triggered: SplitText `mask:"lines"` H1 rise → card rows stamp → values resolve in fixed-width tabular cells → status marks flip → `STATUS: GO` bar last → DrawSVG masthead rule.
- Values resolve via **ScrambleText**. Note for the motion author: the canon's plugin registration list (build note 15) names `useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin` and omits `ScrambleTextPlugin`, which the section table requires. `05-motion-blueprint.md` owns that reconciliation and the resulting bundle-budget check.
- Nothing reflows: every value animates inside a fixed-width tabular cell, so CLS from the boot sequence is structurally zero.
- **No parallax in the hero, ever. No ambient loop.** After 1400ms the hero is completely still until the visitor acts.
- Full timeline, easings, staggers and the `gsap.matchMedia()` reduce branch: `05-motion-blueprint.md` § 2.

---

## 3. `colophon-strip` — The Colophon Strip

> **Chapter:** I Dream · **Surface:** `--paper-laid` · **Motion owner:** Motion

### 3.1 Purpose & UX objective

Evidence before any further ask. The strip is the page's second screen and its first citation: the six canonical statistics set as **one continuous line of text with six sienna superscripts**, each resolving to a footnote in the marginalia rail carrying a source and a last-verified date. It is emphatically not a four-tile stat bar — a stat bar is a boast, and a line of set text with footnotes is a claim someone has agreed to stand behind. This is the section that teaches the reader how to read the rest of the page: *every number here has a number after it, and the number after it goes somewhere.*

**Think:** "They cite themselves. I can check this." **Feel:** the relief of not being sold to. **Do:** hover or tap one superscript, read one footnote, and continue scrolling with a raised credibility ceiling.

### 3.2 Story chapter

**I — Dream**, closing beat. The dream is stated in the hero and immediately underwritten here.

### 3.3 Content hierarchy

1. Top hairline — `0.0625rem` `--rule`
2. **H2** (styled at `--fs-label`) — `WHAT WE PUBLISH, AND WHERE IT COMES FROM`
3. The canonical stat line, one line of set text, six superscript markers
4. Accreditation mark row — six marks at `--fs-mono-label`
5. Lateral link — `Read what each accreditation means →` → `#still-page`
6. Marginalia rail: footnotes ¹–⁶ (≥1024px) / inline `<details>` disclosures (<1024px)
7. Bottom hairline — `0.0625rem` `--rule`

There is **no CTA in this section**, and that is a specification, not an omission. See § 3.9.

### 3.4 Draft copy

**H2** (visible, set small):
`WHAT WE PUBLISH, AND WHERE IT COMES FROM`

**The stat line — verbatim from the canon, set as one running line:**
> `EST. 2001, AMRITSAR¹ · 25 YEARS · 40,000+ STUDENTS PLACED² · 700+ PARTNER UNIVERSITIES³ · 15 DESTINATIONS⁴ · 18 OFFICES, NAMED AND ADDRESSED⁵ · 47 PUBLISHED TESTIMONIALS⁶`

**The six footnotes — verbatim from the canon stat table:**

| Ref | Rail text |
|---|---|
| `¹` | Founded 2001 in Amritsar by Sidharth Gupta. Twenty-five years to 2026. |
| `²` | The most conservative and most frequently published of GO's own figures. Larger claims elsewhere on GO's older pages are withdrawn pending audit. Last verified Aug 2026. |
| `³` | Formal institutional partner agreements. Country split: USA 150+, UK 80+, Canada 60+, Australia 45+, Germany 30+, New Zealand 30+, Ireland 20+, Singapore 7. Last verified Aug 2026. |
| `⁴` | Australia, USA, UK, New Zealand, Canada, Europe, Ireland, Dubai, Germany, Switzerland, Singapore, Malaysia, Italy, France, Spain. |
| `⁵` | Every branch below is listed with a street address and a phone number. We publish the number we can name. |
| `⁶` | 40 named students and 7 partner institutions, each published with name and, where given, university and counsellor. |

**Accreditation row:** `AIRC · ICEF · AAERI · BRITISH COUNCIL · EDUCATION NEW ZEALAND · PTE PEARSON`
**Lateral link:** `Read what each accreditation means →`
**Microcopy beneath the link** (`--fs-body-sm`, `--ink-muted`): `Six external bodies review us. Two of them re-examine us on a published cycle.`

Footnote `⁵` deliberately reads *"below"* — it is written to be true from this position on the page, because the eighteen addresses appear both in `branch-atlas` (§ 8) and in `colophon` (`03-sections-part2.md` § 16).

### 3.5 Layout

**Desktop ≥1280px.** `--content-max` (1200px), `padding-block: var(--section-y-tight)`.

- Stat line: columns 1–10. At `--fs-data` (0.9375rem, tabular) the ~155-character string sets to **two lines** in a 1000px measure, breaking naturally at a `·`. Do not force a break; do prevent a break *between* a stat and its superscript (`white-space: nowrap` on each stat token).
- Accreditation row + lateral link: columns 1–10, separated from the stat line by `--s-5`.
- Marginalia rail: fixed 96px (`--rail`), outside `--content-max`, carrying the six footnotes as a vertical list at `--fs-footnote`.

**1024–1279px.** Rail narrows to `--rail-md` (64px) and shows **footnote numbers only**; the text appears on hover or focus of either the superscript or the rail number.

**Tablet 768–1023px.** No rail. Stat line spans full width and sets to three lines. Each superscript becomes an inline `<details>` disclosure rendered **directly beneath the stat line**, in a stacked list of six.

**Mobile <768px — structurally different.** A 155-character running line at 390px becomes an unreadable ribbon. The line **breaks into six stacked rows**, one per stat:

```
40,000+          STUDENTS PLACED ²
```

Each row: mono figure left at `--fs-data`, label right at `--fs-body-sm` `--ink-muted`, superscript trailing, `0.0625rem --rule` between rows, row height ≥44px. The `<details>` footnote opens inside its own row. This is a documented structural change, not a reflow — see the wireframe.

### 3.6 Wireframe — desktop

```
 col   1    2    3    4    5    6    7    8    9   10   11   12     rail 96px
     ┌───────────────────────────────────────────────────┐        ┌──────────┐
 ─────┼───────────────────── 0.0625rem --rule ───────────┼────────┤          │
     │ WHAT WE PUBLISH, AND WHERE IT COMES FROM          │        │ ¹ Founded│
     │                                                   │        │ 2001 in  │
     │ EST. 2001, AMRITSAR¹ · 25 YEARS · 40,000+          │        │ Amritsar…│
     │ STUDENTS PLACED² · 700+ PARTNER UNIVERSITIES³ ·    │        │ ² The mos│
     │ 15 DESTINATIONS⁴ · 18 OFFICES, NAMED AND           │        │ conserva…│
     │ ADDRESSED⁵ · 47 PUBLISHED TESTIMONIALS⁶            │        │ ³ Formal │
     │                                                   │        │ institut…│
     │ AIRC · ICEF · AAERI · BRITISH COUNCIL ·            │        │ ⁴ Austra…│
     │ EDUCATION NEW ZEALAND · PTE PEARSON                │        │ ⁵ Every  │
     │ Read what each accreditation means →              │        │ branch…  │
     │ Six external bodies review us. Two of them re-…    │        │ ⁶ 40 nam…│
 ─────┼───────────────────── 0.0625rem --rule ───────────┼────────┤          │
     └───────────────────────────────────────────────────┘        └──────────┘
      surface --paper-laid          hover ² → rail line ² gets --sienna-tint well
                                            + 2px --sienna left rule (no movement)
```

### 3.7 Wireframe — mobile (390px, structurally different)

```
┌─ 390 ───────────────────────────────┐
│ WHAT WE PUBLISH, AND WHERE IT       │
│ COMES FROM                          │
├─────────────────────────────────────┤
│ EST. 2001            AMRITSAR ¹     │  ≥44px
├─────────────────────────────────────┤
│ 25                   YEARS          │
├─────────────────────────────────────┤
│ 40,000+       STUDENTS PLACED ²     │
│ ▸ ² The most conservative and most  │  <details>, open state
│   frequently published of GO's own… │
├─────────────────────────────────────┤
│ 700+     PARTNER UNIVERSITIES ³     │
├─────────────────────────────────────┤
│ 15                DESTINATIONS ⁴    │
├─────────────────────────────────────┤
│ 18      OFFICES, NAMED AND ADDR. ⁵  │
├─────────────────────────────────────┤
│ 47     PUBLISHED TESTIMONIALS ⁶     │
├─────────────────────────────────────┤
│ AIRC · ICEF · AAERI                 │
│ BRITISH COUNCIL · EDUCATION NZ      │
│ PTE PEARSON                         │
│ Read what each accreditation means →│
└─────────────────────────────────────┘
```

### 3.8 Visual direction

Surface `--paper-laid` (`#F3EDE2`) — the first surface change on the page, and the reason the first scroll registers as *turning a page* rather than continuing one. Bounded top and bottom by `0.0625rem --rule` hairlines; no keyline box, no well, no card, `--r-0` throughout.

- Stat figures and labels: `--fs-data`, IBM Plex Mono 400, `--ink`, `font-variant-numeric: tabular-nums lining-nums slashed-zero`.
- Separators `·`: `--ink-faint` — a **non-text decorative use**, permitted at 3.4:1.
- Superscripts: `--fs-caption` in `--sienna`, raised via `vertical-align: super` with `font-size` already reduced (never `<sup>`'s default shrink stacking).
- Rail footnotes: `--fs-footnote` (Newsreader opsz 8), `--ink-muted` — 6.8:1, comfortably above the floor, and the reason the rail is *not* set in `--ink-faint`.
- Illumination on hover/focus: the matching rail line gains a `--sienna-tint` well and a 2px `--sienna` left rule. **Colour and fill only — nothing moves, nothing resizes.**
- Accreditation marks: `--fs-mono-label`, `--ink-muted`, separated by `·` in `--ink-faint`.
- H2 set at `--fs-label`, `--ink-muted`, letterspaced uppercase — a sanctioned use (running head).

### 3.9 Imagery

**None, in v1 and in v2.** This is the one section of the page that is deliberately typographic-only and reserves no plate. A photograph here would compete with the superscripts, which are the entire point. If a future editor wants an image between the hero and the gazetteer, the answer is no: the space between a claim and its citation is not a place to put a picture.

### 3.10 CTA placement & conversion note

**No CTA.** The only link is lateral (`Read what each accreditation means →` → `#still-page`).

The page asked once, in the hero. NN/g's credibility research is that a request for commitment must be paid for with a reason; the strip is the payment. Inserting a second `Book free counselling` 900px after the first would convert the page from a publication into a funnel on its second screen and would forfeit the entire premise. The strip converts *indirectly and page-wide*: it raises the believability of every CTA that follows it, and it is the mechanism by which the parent persona — whose first-ranked fear is fraud — decides whether to keep reading.

The one commercial decision embedded here is the choice of **40,000+** over the 100,000 and 125,000 figures also published on GO's own site. Under-claiming with a footnote outperforms over-claiming without one for the buyer who matters, and the footnote says out loud that the larger numbers are withdrawn pending audit. That sentence is the most persuasive sentence in the section.

### 3.11 Accessibility

- Landmark: `<section id="colophon-strip" aria-labelledby="colophon-strip-h2">`.
- Heading level: **H2**, visible, styled at `--fs-label`. It is not `sr-only` — sighted and screen-reader users get the same heading, which is the correct pattern.
- Footnote markers: `<sup><a href="#fn-2" id="fnref-2">2</a></sup>` with an accessible name of `Footnote 2` supplied via `aria-label`; each rail entry ends with a back-link to `#fnref-2`. At `--fs-caption` (12px) the visual mark is far below any target minimum, so **each superscript anchor carries an expanded hit area of ≥44×44px** via padding plus a positioned `::after`, without displacing the line (`line-height` is unaffected because the pseudo-element is absolutely positioned).
- Below 1024px, the rail is replaced by native `<details>`/`<summary>` — zero JS, full keyboard and AT support, and no bottom sheet (which would need JS and would collide with the mobile bar).
- Hover-revealed footnote text at 1024–1279px must satisfy WCAG 1.4.13: dismissible with `Esc`, hoverable (the pointer can move onto the revealed text), and persistent until dismissed. It is equally available on `:focus-visible`.
- Contrast: `--ink` on `--paper-laid` ≥16:1; `--ink-muted` on `--paper-laid` ≥6.5:1 — **note that the canon quotes 6.8:1 against `--paper`, not `--paper-laid`; the measured value against `#F3EDE2` must be recorded in the accessibility register before ship.** `--sienna` superscripts on `--paper-laid`: sienna is 4.6:1 against cream and these are 12px text, so the **marker's meaning must never depend on its colour** — it is a link with a real accessible name and an underline on focus.
- Screen-reader flow: heading → the stat line read as continuous text with "footnote 1", "footnote 2" announced inline → accreditation list → lateral link.

### 3.12 Motion cue

- **Owner: Motion.** One once-only `whileInView` reveal: opacity `0 → 1` plus `y: 24 → 0`, `--stagger-tight` (0.045s) across the stat tokens. It fires once and never again — `viewport={{ once: true }}`.
- Footnote illumination: `--dur-2`, `--ease-quad`, colour and background only. No transform, no movement.
- No ScrollTrigger instance in this section. No scrub, no pin, no parallax.
- Reduced-motion branch and exact viewport margins: `05-motion-blueprint.md` § 3.

---

## 4. `gazetteer` — The Gazetteer

> **Chapter:** II Explore · **Surface:** `--paper` · **Motion owner:** Motion (`layout` / `layoutId` / `AnimatePresence`) — **zero ScrollTrigger**

### 4.1 Purpose & UX objective

The gazetteer replaces the category's flag grid with an index you read. Fifteen destinations arrive as an alphabetical list of ruled rows, each carrying four real facts — partner count, main intake window, tuition band, post-study work rights — with four anchor entries (UK, USA, Canada, Australia) given at least twice the area because that is where the traffic and the partnerships actually are. Hovering, focusing or tapping a row expands it into a micro-spread with a cartographic panel in the margin. This is what an atlas does: it indexes the world so you can locate yourself in it. The behavioural goal is that curiosity here feels like **reading, not shopping** — no tiles, no flags, no "Explore →" buttons on fifteen identical cards.

**Think:** "I can compare these on the same four axes without opening fifteen tabs." **Feel:** competent — the specific pleasure of a good index. **Do:** expand two or three rows, then use an in-row CTA that carries the destination into the enquiry form as a pre-selected chip.

### 4.2 Story chapter

**II — Explore.** `[data-chapter="explore"]`, `--nr-opsz: 60`. Chapter opener: roman `II` in the margin with a rule running from it, label `EXPLORE`.

### 4.3 Content hierarchy

1. Chapter opener — `II` roman numeral in the left margin, `EXPLORE` at `--fs-label`, chapter rule `0.125rem --rule-strong`
2. **H2** — `Fifteen places, indexed.`
3. Deck
4. Column-header row — `DESTINATION` · `PARTNERS` · `MAIN INTAKE` · `TUITION, PG/YR` · `POST-STUDY WORK`
5. **Four anchor entries** — United Kingdom, United States, Canada, Australia — each ≥2× the area of a standard row, each with its Plate D
6. **Eleven alphabetical rows** — Dubai, Europe, France, Germany, Ireland, Italy, Malaysia, New Zealand, Singapore, Spain, Switzerland
7. Expanded micro-spread (per row): Plate D in the margin, the four facts set large, one paragraph of context, in-row CTA
8. Footnote markers on every figure
9. Section foot: `The full country pages are in preparation. Every figure above is dated in the colophon.`

### 4.4 Draft copy

**H2:** `Fifteen places, indexed.`

**Deck** (`--fs-deck`):
> *Fifteen destinations, four facts each, on the same four axes. Partner counts are ours; intake windows, tuition bands and work rights are the destination's, and every one of them is dated below.*

**Column heads** (`--fs-mono-label`): `DESTINATION` · `PARTNERS` · `MAIN INTAKE` · `TUITION, PG/YR` · `POST-STUDY WORK`

**The anchor row, worked in full (United Kingdom):**

```
UNITED KINGDOM      80+³      Sep/Oct main      £9,000–30,000⁷      Graduate Route, 2 yrs⁸
                              Jan/Feb second
```

Expanded micro-spread copy:
> **United Kingdom** — Eighty-plus partner universities, the largest single-country block after the United States. The main intake is September/October, with a smaller January/February window and a handful of May/June programmes. Postgraduate tuition runs £9,000–£30,000 a year; living costs are £1,483 a month in London and £1,136 outside it. The visa is £524 and the Immigration Health Surcharge is £776 a year. The Graduate Route allows two years of work after the degree, three after a doctorate.
>
> `Talk to a UK counsellor →`

**Microcopy under each in-row CTA** (`--fs-caption`): `Takes you to the form with the United Kingdom already selected.`

**The data table — build source of truth.** Every cell below either resolves to a registry row or ships flagged. **A `[VERIFY]` cell may not ship set in IBM Plex Mono.**

| Destination | Partners | Main intake | Tuition PG/yr | Post-study work |
|---|---|---|---|---|
| **United Kingdom** | 80+ ³ | Sep/Oct main; Jan/Feb second | £9,000–30,000 | Graduate Route, 2 yrs (3 doctoral) |
| **United States** | 150+ ³ | Fall (Aug/Sep) main; Spring (Jan) | `[VERIFY]` | `[VERIFY]` |
| **Canada** | 60+ ³ | Fall (Sep) primary; Winter (Jan); Summer limited | avg CAD 21,100 | `[VERIFY]` |
| **Australia** | 45+ ³ | Feb primary; Jul secondary | `[VERIFY]` | `[VERIFY]` |
| Dubai | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |
| Europe | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |
| France | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |
| Germany | 30+ ³ | Winter semester; **15 July deadline** | `[VERIFY]` | `[VERIFY]` |
| Ireland | 20+ ³ | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |
| Italy | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |
| Malaysia | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |
| New Zealand | 30+ ³ | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |
| Singapore | 7 ³ | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |
| Spain | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |
| Switzerland | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` | `[VERIFY]` |

Two notes for the content owner. **"Europe" is not a country**, and it appears in GO's own curated fifteen; keep it, label it `Europe (multiple)`, and let its expanded spread list the countries it covers — but never let "Berlin" or "Paris" reappear as entries. And the row rendering must tolerate a missing cell gracefully: an unverified cell renders as an em-dash in `--ink-muted`, **never** as `0`, `TBD`, or a shimmer.

**Section foot:** `Partner counts last verified Aug 2026. Intake windows, tuition bands and work rights are the destination's own published figures; each carries its source and date in the colophon.`

### 4.5 Layout

**Desktop ≥1280px.** `--content-max` (1200px), `padding-block: var(--section-y)`.

- Chapter opener: roman `II` in the outer left margin (outside `--content-max`), rule running right across columns 1–12.
- H2 columns 1–8; deck columns 1–6.
- **Anchor block:** a 2×2 arrangement, each anchor spanning 6 columns and containing its Plate D at 3:2 across the first two of its six columns, with the four facts stacked beside it. Anchor cells sit on `--paper-tracing` with a `1px --rule` keyline and `--reg-rule` (`2px 2px 0 0 #C7B9A1`).
- **The eleven rows:** full 12-column ruled rows, `0.0625rem --rule` between, resting height 64px. Columns: destination (1–4), partners (5–6), intake (7–8), tuition (9–10), work rights (11–12).
- **Expanded state:** the row grows to ~280px. The four facts move to columns 1–7 set at `--fs-data`, the context paragraph sits beneath them at `--fs-body`, the in-row CTA sits at the paragraph foot, and **Plate D slides into columns 9–12** via a shared `layoutId`. Only one row is open at a time.
- Marginalia rail carries the figure footnotes.

**Tablet 768–1023px.** Anchors stack one-up (each full width, Plate D 3:2 above the facts). The eleven rows keep the ruled-index form but drop the tuition column into the expanded state only. On expand, Plate D renders **above** the facts rather than beside them.

**Mobile <768px — tap-accordion (canon rule).** The resting row shows **destination and partner count only** — four data columns at 390px is a table nobody reads. Row height ≥64px with a `+` affordance at the right. Tapping expands in place to: Plate D at 16:10 → the four facts as a stacked definition list → the context paragraph → the in-row CTA at ≥48px. The four anchors are simply the first four rows, visually distinguished by a `--paper-tracing` bed, not by size.

### 4.6 Wireframe — desktop

```
 col  1    2    3    4    5    6    7    8    9   10   11   12      rail
   II ─────────────────────────── 0.125rem --rule-strong ────────
   EXPLORE
   Fifteen places, indexed.
   /Fifteen destinations, four facts each, on the same four axes./

   DESTINATION      PARTNERS   MAIN INTAKE   TUITION, PG/YR   POST-STUDY WORK
   ┌──────────────────────────────┐ ┌──────────────────────────────┐
   │┌────────┐ UNITED KINGDOM     │ │┌────────┐ UNITED STATES      │   ANCHORS
   ││ ▨ PL.D │ 80+³               │ ││ ▨ PL.D │ 150+³              │   ≥2× area
   ││coastline│ Sep/Oct main      │ ││coastline│ Fall (Aug/Sep)    │   bed: --paper-
   │└────────┘ £9,000–30,000⁷     │ │└────────┘ —                  │   tracing
   │           Graduate Route 2y⁸ │ │                              │   --reg-rule
   └──────────────────────────────┘ └──────────────────────────────┘
   ┌──────────────────────────────┐ ┌──────────────────────────────┐
   │  CANADA  60+³  Fall (Sep) …  │ │  AUSTRALIA  45+³  Feb …      │
   └──────────────────────────────┘ └──────────────────────────────┘

   ─────────────────────────────────────────────────────── --rule ──
   Dubai            —        —              —            —          64px
   ─────────────────────────────────────────────────────────────────
   Europe (multiple) —       —              —            —
   ─────────────────────────────────────────────────────────────────
   France           —        —              —            —
   ─────────────────────────────────────────────────────────────────
 ┌ Germany         30+³   Winter sem.       —            —          ← EXPANDED
 │  ┌──────────────────────────────────┐  ┌────────────────────┐    280px
 │  │ PARTNERS   30+³                  │  │  ▨  PLATE D        │
 │  │ INTAKE     Winter semester       │  │  coastline + ✛     │  layoutId
 │  │ DEADLINE   15 JULY⁹  (cited)     │  │  GERMANY           │  morph
 │  │ /Germany's public universities…/ │  └────────────────────┘
 │  │ Talk to a Germany counsellor →   │
 │  │ Takes you to the form with…      │
 └──└──────────────────────────────────┘
   ─────────────────────────────────────────────────────────────────
   Ireland · Italy · Malaysia · New Zealand · Singapore · Spain · Switzerland
```

### 4.7 Wireframe — mobile (390px, tap-accordion)

```
┌─ 390 ───────────────────────────────┐
│ II  EXPLORE                         │
│ ─────────────────────────────────── │
│ Fifteen places, indexed.            │
│ /Fifteen destinations, four facts…/  │
├─────────────────────────────────────┤
│ UNITED KINGDOM        80+³       +  │ ≥64px, bed --paper-tracing (anchor)
├─────────────────────────────────────┤
│ UNITED STATES        150+³       +  │
├─────────────────────────────────────┤
│ CANADA                60+³       −  │ ← open
│ ┌─────────────────────────────────┐ │
│ │  ▨ PLATE D · CANADA        16:10│ │
│ └─────────────────────────────────┘ │
│ PARTNERS         60+³               │
│ MAIN INTAKE      Fall (Sep) primary │
│ TUITION PG/YR    avg CAD 21,100     │
│ POST-STUDY WORK  —                  │
│ /Sixty-plus partner institutions…/   │
│ (  Talk to a Canada counsellor  )   │ ≥48px
│  Takes you to the form with Canada  │
│  already selected.                  │
├─────────────────────────────────────┤
│ AUSTRALIA             45+³       +  │
├─────────────────────────────────────┤
│ Dubai                  —         +  │  standard rows: --paper bed
│ Europe (multiple)      —         +  │
│ …                                   │
└─────────────────────────────────────┘
```

### 4.8 Visual direction

Surface `--paper`. The section's whole visual argument is **rules and alignment**, not containers.

- Chapter numeral `II`: Newsreader at `--fs-d1`, `--marine`, sitting in the outer margin with a `0.125rem --rule-strong` running from it.
- H2: `--fs-d1`, Newsreader 400 at `--nr-opsz: 60`, `--ink`.
- Column heads: `--fs-mono-label`, `--ink-muted`.
- Destination names: `--fs-h4` (Hanken 600), `--ink`. **Not mono** — they are nouns, per the mono-law usage rule in the page-wide conventions.
- All four data values: `--fs-data`, IBM Plex Mono, `--ink`, tabular.
- Row rules: `0.0625rem --rule`. On hover/focus the rule beneath the row draws left→right in `--sienna` (CSS `transform: scaleX()` on a pseudo-element, `transform-origin: left`, `--dur-3`) and the destination name gains a `--sienna` underline swell. Nothing translates.
- Anchor cells: `--paper-tracing` bed, `1px --rule` keyline, `--r-1`, `--reg-rule` offset (2px, `--rule-strong`) — a lighter registration than the hero's sienna, because four of them side by side in sienna would shout.
- Expanded row: bed stays `--paper`; the expansion is signalled by height and by the Plate D arriving, not by a colour change. `0.125rem --rule-strong` closes the expanded block.
- Cited third-party dates inside a spread (e.g. Germany's 15 July): label in `--clay`, marker in `--sienna` — the same disclosure grammar used in `eleven-months` (`03-sections-part2.md` § 12).
- `--r-0` on rows; `--r-1` on plates and anchor beds; nothing else.

### 4.9 Imagery

**Plate D — Cartographic Panel.** Pure SVG per destination: a simplified coastline, a crosshair on the primary city, latitude ticks, and the destination name typeset over. Fifteen paths plus the India map of § 8 are **the only bespoke assets v1 requires**, at a combined budget of **≤40KB gzipped**. Practical consequence for the illustrator: each coastline gets a hard path-node budget; simplify to silhouette, do not trace borders, do not include islands below a threshold, and share the graticule and crosshair as reused `<symbol>` definitions.

**v2:** **Plate D is permanent.** No photograph replaces it. If GO commissions destination photography, it is added as a *second* figure inside the expanded micro-spread — `<figure data-plate="photo">` at 3:2, beside the cartography, with its own caption — because a map and a photograph answer different questions and an atlas prints both.

**Banned here, permanently:** flags, national landmarks, globes, aircraft, passports, currency symbols as illustration, and any tile grid of any of the above.

### 4.10 CTA placement & conversion note

**One in-row CTA per expanded destination**, and no section-level CTA. `Talk to a UK counsellor →` links to `#enquiry` with the destination pre-selected, so the visitor arrives at the form with **step 1 of 3 already satisfied**.

- Multi-step forms convert at ~13.85% against ~4.53% for single-page equivalents, and **step-1 completion raises finish rates by ~73%**. Handing the visitor a form that is already one-third done, from the exact moment their curiosity is highest, is the single cheapest conversion mechanic on the page.
- The same chip pre-fills the WhatsApp deep link's message body (canon build note 11), so a visitor who prefers WhatsApp — 60–70% response rate in India against 20–30% for web forms — sends a message that already says which country they mean.
- The CTA is **inside the expansion**, never on the resting row. Fifteen visible buttons would turn the index back into a tile grid and would make the section look like it wants something, which is precisely what it must not look like.
- The microcopy under the CTA (`Takes you to the form with the United Kingdom already selected.`) is doing real work: it converts a link into a described transition, which reduces the "where am I going" hesitation that costs clicks on anchor CTAs.

### 4.11 Accessibility

- Landmark: `<section id="gazetteer" aria-labelledby="gazetteer-h2">`.
- Heading levels: H2 for the section; **H3 for each destination name**, placed inside the disclosure button. Fifteen H3s give screen-reader users a usable heading list of the whole index — which is, not incidentally, also the SEO structure the research asks for (H2s and H3s mapping to searcher questions).
- Structure: a `<ul>` of fifteen items; each item is `<h3><button aria-expanded="false" aria-controls="gz-uk">United Kingdom</button></h3>` followed by `<div id="gz-uk" hidden>`. Not a `<table>` — the resting rows are a navigable index, and the four facts are only fully present in the expanded state, which a table's row semantics would misrepresent.
- **All fifteen destinations are reachable and operable by keyboard** (canon accessibility floor). Tab moves between rows; `Enter`/`Space` toggles; `Esc` collapses the open row and keeps focus on its button.
- **Hover must never be the only way in.** Expansion is equally triggered by `:focus-visible` and by tap. Content revealed on hover satisfies WCAG 1.4.13: dismissible, hoverable, persistent.
- Touch targets: resting rows are 64px; the `+` affordance is decorative and the whole row is the hit area; in-row CTAs are ≥48px on mobile.
- Missing data announces as an em-dash with an `sr-only` expansion: `not yet published`. It must never announce as "zero".
- Ranges: `£9,000–30,000` must not be read as two separate numbers. Render the en-dash visually and supply `<span class="sr-only"> to </span>` between the bounds.
- Contrast: `--ink` on `--paper` 17:1; `--ink-muted` column heads 6.8:1; `--clay` deadline labels 6.1:1; `--marine` numerals 11.7:1.
- Screen-reader flow: heading 2 → deck → "United Kingdom, button, collapsed, heading level 3" → … → on expand, focus stays on the button and the panel is announced via `aria-expanded` state change; the panel's first element is the facts list.

### 4.12 Motion cue

- **Owner: Motion.** Row expansion uses `layout` on the row and `AnimatePresence` on the panel; **Plate D morphs into the margin via a shared `layoutId`** from the anchor thumbnail. `--dur-4`, `--ease-quart`.
- Row hover/focus rule draw: CSS `scaleX` on a pseudo-element, `--dur-3`, `--ease-cubic`. No JS.
- **Zero ScrollTrigger instances in this section** — this is a deliberate budget decision: the gazetteer is the most interaction-heavy section on the page and it spends none of the 14-instance ScrollTrigger allowance.
- Under `prefers-reduced-motion` the expansion is instantaneous and no layout animation is registered. Details, spring configuration and the `layoutId` map: `05-motion-blueprint.md` § 4.

---

## 5. `register` — The Register

> **Chapter:** II Explore · **Surface:** `--paper-laid` · **Motion owner:** Anime.js (counters), Motion (column reveal)

### 5.1 Purpose & UX objective

To a parent, a name they recognise outweighs any testimonial. The Register publishes the strongest single asset GO owns — 700+ formal institutional partner agreements — as a **typeset list of named institutions with a country split**, not as a scrolling grey logo marquee. The section exists to convert an abstract number into eight or nine specific recognitions: *Monash. Manchester. Northeastern. Auckland. University College Dublin.* The reader is not asked to believe the 700; they are asked to find one name they already trust, and the 700 comes free with it.

**Think:** "These are real institutions, and some of them I have heard of." **Feel:** reassured in the specific way that only a familiar proper noun reassures. **Do:** read the country split, recognise a name, keep scrolling.

### 5.2 Story chapter

**II — Explore**, closing beat. The gazetteer indexes the world; the register names the institutions inside it.

### 5.3 Content hierarchy

1. Running head — `THE REGISTER`
2. **H2** — `Seven hundred agreements, and the names on them.`
3. Deck
4. `700+` as a `<StatFigure>` at `--fs-figure`, with footnote `³`
5. Country split — an eight-row mono table
6. Twenty-four named partner institutions, set in three typeset columns
7. Lateral link — `See the full register of 700+ →`
8. Registry caution note
9. Footnote `³` in the rail

### 5.4 Draft copy

**Running head:** `THE REGISTER`

**H2:** `Seven hundred agreements, and the names on them.`

**Deck** (`--fs-deck`):
> *A partner agreement means a signed institutional relationship, not a mailing list. Twenty-four of the seven hundred are printed below; the country split is complete.*

**Country split** (mono table, `--fs-data`):

| Country | Partners |
|---|---|
| United States | `150+` |
| United Kingdom | `80+` |
| Canada | `60+` |
| Australia | `45+` |
| Germany | `30+` |
| New Zealand | `30+` |
| Ireland | `20+` |
| Singapore | `7` |

**The twenty-four names, as set in three columns:**

| Column 1 — UK & Ireland | Column 2 — United States & Canada | Column 3 — Australia, NZ, Europe & Asia |
|---|---|---|
| Queen Mary University of London | Duke University | Monash University |
| University of Glasgow | Syracuse University | RMIT University |
| University of Manchester | Northeastern University | University of Queensland |
| University of Bristol | Arizona State University | University of Sydney |
| University of Exeter | University of Cincinnati | University of Auckland |
| Heriot-Watt University | University of Alberta | University of Otago |
| University College Dublin | University of Guelph | Munich Business School |
| Dublin City University | Centennial College | Kaplan Singapore |

**Lateral link:** `See the full register of 700+ →`

**Registry caution note** (`--fs-body-sm`, `--ink-muted`, set beneath the columns):
> Each name above is a formal partner agreement. Agreement type and last-verified date for every institution are held in the Sources & Methods register in the colophon.

**Note to the content owner, not for publication.** Duke, Syracuse and the Medical University of South Carolina appear in GO's own published partner list. Because they are high-prestige names, each must carry an explicit agreement-type and last-verified row in the register **before** it appears on this page. If any one of them cannot be evidenced on the day of launch, remove that name and substitute another from the same country block. One unverifiable prestige name costs more credibility than eight verified ordinary ones earn.

### 5.5 Layout

**Desktop ≥1280px.** `--content-max` (1200px), `padding-block: var(--section-y)`.

- Running head + H2 + deck: columns 1–5.
- `700+` figure and the country split: columns 7–12, the figure at `--fs-figure` above an eight-row ruled mono table (country left, count right, `0.0625rem --rule` between rows).
- The twenty-four names: three columns beneath, at columns 1–4, 5–8, 9–12, separated by `0.0625rem --rule` vertical hairlines. Each column head is a `--fs-mono-label` country grouping.
- Lateral link and registry note: columns 1–8.

**Tablet 768–1023px.** H2 and deck full width; `700+` and the country split move below the deck as a two-up block; the names set in **two** columns of twelve.

**Mobile <768px.** Single column throughout. `700+` sits above the country split, which becomes an eight-row full-width ruled list. The twenty-four names set in **one** column at `--fs-body-sm` with `--s-2` row spacing and a `--fs-mono-label` country subhead every eight names. Total height is acceptable because names are short and the list scans fast; do not paginate it and do not put it behind a disclosure — hiding the names defeats the section.

### 5.6 Wireframe — desktop

```
 col  1    2    3    4    5    6    7    8    9   10   11   12      rail
     ┌───────────────────────────┐      ┌────────────────────────┐  ┌──────┐
     │ THE REGISTER              │      │  700+                  │  │³ For-│
     │ Seven hundred agreements, │      │  PARTNER UNIVERSITIES³ │  │ mal  │
     │ and the names on them.    │      │ ─────────────────────  │  │ inst-│
     │ /A partner agreement means/│      │ UNITED STATES    150+  │  │ itut-│
     │ /a signed institutional…/  │      │ UNITED KINGDOM    80+  │  │ ional│
     │                           │      │ CANADA            60+  │  │ part-│
     │                           │      │ AUSTRALIA         45+  │  │ ner  │
     │                           │      │ GERMANY           30+  │  │ agre-│
     │                           │      │ NEW ZEALAND       30+  │  │ emen-│
     │                           │      │ IRELAND           20+  │  │ ts…  │
     │                           │      │ SINGAPORE           7  │  │      │
     └───────────────────────────┘      └────────────────────────┘  └──────┘
     ─────────────────────────────────────────────────────── --rule ──
     UK & IRELAND        │ UNITED STATES & CANADA │ AUSTRALIA, NZ, EUROPE & ASIA
     Queen Mary Univ… │ Duke University        │ Monash University
     University of Glasgow  │ Syracuse University    │ RMIT University
     University of Manchester│ Northeastern University│ University of Queensland
     University of Bristol  │ Arizona State University│ University of Sydney
     University of Exeter   │ University of Cincinnati│ University of Auckland
     Heriot-Watt University │ University of Alberta  │ University of Otago
     University College Dublin│ University of Guelph  │ Munich Business School
     Dublin City University │ Centennial College     │ Kaplan Singapore
     ──────────────────────────────────────────────────────────────────
     See the full register of 700+ →
     Each name above is a formal partner agreement. Agreement type and…
                          surface --paper-laid
```

### 5.7 Visual direction

Surface `--paper-laid` — the section alternates against `gazetteer`'s `--paper`, which is how a book distinguishes a spread from an index.

- `700+`: `--fs-figure` (Plex Mono 500), `--marine`, tabular, server-rendered at its final value. Beneath it, `PARTNER UNIVERSITIES` at `--fs-mono-label` in `--ink-muted`, with the `³` superscript in `--sienna`.
- Country split: country names at `--fs-body-sm` (Hanken), counts at `--fs-data` (mono, tabular, right-aligned), rows ruled at `0.0625rem --rule`.
- The twenty-four names: `--fs-body` (Hanken 400), `--ink`, one per line, `--s-2` leading between entries. **Not mono** — institution names are proper nouns.
- Column separators: `0.0625rem --rule` vertical hairlines with `--s-5` inner padding.
- Column heads: `--fs-mono-label`, `--ink-muted`.
- Lateral link: `--marine` with a `--sienna` underline swell.
- `--r-0` throughout. No wells, no cards, no keylines around the name block. The three columns are held by their two hairlines and nothing else.

### 5.8 Imagery

**None — and this is the section where the absence is a considered refusal rather than a deferral.**

The obvious execution is a partner logo strip. We reject it for four independent reasons: (1) licensing 700 institutional marks is not shippable, and licensing eight looks like the other 692 do not exist; (2) a logo marquee is an infinite animation, which the canon bans outright; (3) full-colour institutional marks would import six palettes into a page whose whole argument is two; (4) a grey logo strip is exactly what GO's current site already does, and the research names it as the most under-exploited trust asset *because* it is rendered as silent grey.

**v2:** still no logos. If the client insists after launch, the maximum permitted is **eight marks engraved as single-colour `--ink` SVGs at a uniform cap height, static, in a ruled row** — never full-colour, never a marquee, never more than eight.

### 5.9 CTA placement & conversion note

**No primary CTA.** One lateral link (`See the full register of 700+ →`).

The CRO research ranks the partner-university evidence as trust tier 2 — above testimonials — for parent co-deciders, and specifically prescribes placing it high. We honour the **information** and reject the **form**: the parent's need is to recognise a name, and a name set in type is more recognisable, more accessible and more auditable than a 40KB PNG of the same name.

The conversion mechanism is delayed and page-wide. A parent who finds Monash or Manchester in this list carries that recognition into `still-page`, `branch-atlas` and `for-parents`, and it is what makes the eventual ₹0 disclosure in `reckoning` (`03-sections-part2.md` § 11) believable rather than suspicious. Putting a `Book free counselling` button here would spend that recognition immediately and cheaply.

### 5.10 Accessibility

- Landmark: `<section id="register" aria-labelledby="register-h2">`.
- Heading level: **H2**. The three column heads are **H3**s.
- The country split is a real `<table>` with `<caption>Partner universities by country</caption>`, `<th scope="col">`, `<th scope="row">`. Not a CSS-grid pastiche — this is tabular data and screen-reader users need the row/column relationship.
- The twenty-four names are a single `<ul>` per country group, laid out in CSS columns. **DOM order is reading order**; CSS multi-column does not reorder content for assistive technology, which is why it is used here rather than a grid with `order`.
- `<StatFigure>` renders `700+` in the server HTML at its final value with `aria-live` explicitly off. GO's current site renders animated counters as literal `0` without JS; that failure mode is structurally impossible here and this section is where it would have been most damaging.
- Contrast: `--marine` figure on `--paper-laid` ≥11:1; `--ink` names ≥16:1; `--ink-muted` heads ≥6.5:1 — **the `--ink-muted` on `--paper-laid` measurement must be recorded in the accessibility register**, as the canon's 6.8:1 is quoted against `--paper`.
- Touch targets: only two focusable elements (the lateral link and the footnote marker); both padded to ≥44px.
- Screen-reader flow: heading 2 → deck → "700 plus partner universities, footnote 3" → table caption → eight rows → three name lists by heading → link.

### 5.11 Motion cue

- **Owner: Anime.js** for the eight country counters and the `700+` figure: tabular odometers animating **from 92% of the final value**, once, on scroll into view, inside `createScope({ root })` with `scope.revert()` cleanup, dynamically imported at the section boundary.
- **Owner: Motion** for the three name columns: a once-only `whileInView` opacity reveal with `--stagger` between columns. Columns, not names — twenty-four staggered items would read as a slot machine.
- Counters are locked to tabular figures so no cell width changes during the roll; CLS contribution is zero.
- Reduced motion lands on the final values with no roll. `05-motion-blueprint.md` § 5.

---

## 6. `what-we-do` — Fifteen Things We Do

> **Chapter:** II Explore → III Trust (the bridge) · **Surface:** `--paper` · **Motion owner:** CSS (row rules), Motion (reveal)

### 6.1 Purpose & UX objective

Fifteen services and the money question, answered in one move. Every competitor lists services; nobody prices them. This section sets GO's fifteen services as a ruled ledger in which **every single row carries what it costs you** — eleven of them `FREE`, four of them `AT COST` with the third party named. It answers, 40% of the way down the page, the question the PG persona is actually carrying (*is this person selling me the university that pays them most?*) and the question the parent is carrying (*where are the hidden fees?*). It is also the structural bridge from Explore to Trust: the last section about the world, and the first section about GO's own conduct.

**Think:** "They have told me the price of every single thing before I asked." **Feel:** the specific disarming effect of an unprompted disclosure. **Do:** read the four AT COST rows carefully, then follow the link into `reckoning` for the full accounting.

### 6.2 Story chapter

**II Explore → III Trust.** `[data-chapter="explore"]` for type axis; the content pivots to Trust. The chapter opener for III is deferred to `still-page` (§ 7) so the pivot happens inside a section rather than across a rule.

### 6.3 Content hierarchy

1. Running head — `WHAT WE DO`
2. **H2** — `Fifteen things we do, and what each one costs you.`
3. Deck
4. Ledger column heads — `NO.` · `SERVICE` · `WHO PAYS` · `WHAT YOU PAY`
5. **Block A — `FREE TO YOU (11)`** — eleven ruled rows
6. Pulled callout on row 09 — visa supervision
7. Chapter rule — `0.125rem --rule-strong`
8. **Block B — `AT COST, NO MARKUP (4)`** — four ruled rows
9. Closing line + two CTAs
10. Footnotes

**Reading the canon's phrase "ruled two-column ledger":** the two columns are the two **money** columns — `WHO PAYS` and `WHAT YOU PAY` — running down a single full-width ruled table, grouped into two blocks. It is not two side-by-side lists of rows. This reading is recorded here so it is not re-interpreted at build time.

### 6.4 Draft copy

**Running head:** `WHAT WE DO`

**H2:** `Fifteen things we do, and what each one costs you.`

**Deck** (`--fs-deck`):
> *Eleven of the fifteen cost you nothing, because a partner university pays us when you enrol. The other four are third-party costs, and we pass them through at the provider's price. The full accounting is in* The Reckoning*, further down.*

**Block A head:** `FREE TO YOU (11)`
**Block B head:** `AT COST, NO MARKUP (4)`

**The ledger:**

| No. | Service | Who pays | What you pay |
|---|---|---|---|
| `01` | Education Counselling | Global Opportunities | `FREE` |
| `02` | Country Information | Global Opportunities | `FREE` |
| `03` | Profile Shortlisting | Global Opportunities | `FREE` |
| `04` | Selection of Course | Global Opportunities | `FREE` |
| `05` | Career Guidance | Global Opportunities | `FREE` |
| `06` | Admission Guidance | The university, on enrolment | `FREE` |
| `07` | Financial Estimation | Global Opportunities | `FREE` |
| `08` | Interview Preparation | Global Opportunities | `FREE` |
| `09` | **Visa Services** | Global Opportunities | `FREE` |
| `10` | Education Loan | The lender | `FREE` |
| `11` | Travel Guidance | Global Opportunities | `FREE` |
| `12` | Forex Exchange | You, to the provider | `AT COST` |
| `13` | GIC Account (Canada) | You, to the bank | `AT COST` |
| `14` | Medical Insurance | You, to the insurer | `AT COST` |
| `15` | Accommodation | You, to the provider | `AT COST` |

**Row 09 pulled callout** (in an `--ochre-tint` well):
> `SUPERVISION` — Visa files are prepared under the supervision of former visa officials. `[VERIFY — GO's own published claim. The register must record how many, in which posts, and since when, before this line ships.]`

**Row-level microcopy** (`--fs-body-sm`, `--ink-muted`, shown beneath the four AT COST rows):

- `12` Forex Exchange — `You pay the provider's rate on the day. Global Opportunities adds nothing to it.`
- `13` GIC Account — `A Canadian bank deposit required for the student direct stream. The money remains yours and is returned to you in Canada.`
- `14` Medical Insurance — `Premium set by the insurer and by your destination's rules.`
- `15` Accommodation — `Rent and deposit go to the university or the landlord. There is no placement fee.`

**Closing line** (Newsreader italic, `--fs-deck`, `--marine`):
> *Nothing in the first eleven rows becomes chargeable later.*

**CTAs:** `See the full reckoning →` (lateral, to `#reckoning`) and `Book free counselling` (primary) with the canonical proof line beneath it.

### 6.5 Layout

**Desktop ≥1280px.** `--content-max`, `padding-block: var(--section-y)`.

- Running head + H2: columns 1–7. Deck: columns 1–6.
- Ledger: full 12 columns. `NO.` column 1; `SERVICE` columns 2–7; `WHO PAYS` columns 8–9; `WHAT YOU PAY` columns 10–12, right-aligned.
- Row height 56px, `0.0625rem --rule` between rows.
- Block A and Block B separated by `0.125rem --rule-strong` and the Block B head at `--fs-mono-label`.
- Row 09's callout: an `--ochre-tint` well spanning columns 2–12, sitting directly beneath row 09 inside the ledger, with a 2px `--ochre` left rule.
- Closing line: columns 1–8. CTAs: columns 1–6, side by side, primary first.

**Tablet 768–1023px.** `WHO PAYS` moves beneath the service name as a `--fs-mono-label` line; the ledger becomes three effective columns (`NO.`, `SERVICE` + payer, `WHAT YOU PAY`). Row height rises to 64px.

**Mobile <768px.** Each row becomes a **two-line block** at ≥64px: line 1 is `NO.` + service name; line 2 is the `FREE` / `AT COST` chip left-aligned with the payer at `--fs-body-sm` beside it. The block heads (`FREE TO YOU (11)`, `AT COST, NO MARKUP (4)`) become sticky-free ruled dividers. CTAs stack full width.

### 6.6 Wireframe — desktop

```
 col  1    2    3    4    5    6    7    8    9   10   11   12      rail
     WHAT WE DO
     Fifteen things we do, and what each one costs you.
     /Eleven of the fifteen cost you nothing, because a partner/
     /university pays us when you enrol…/

     NO. SERVICE                       WHO PAYS          WHAT YOU PAY
     ─────────────────────────────────────────────────────────────────
     FREE TO YOU (11)
     ─────────────────────────────────────────────────────────────────
     01  Education Counselling         Global Opportunities      FREE
     02  Country Information           Global Opportunities      FREE
     03  Profile Shortlisting          Global Opportunities      FREE
     04  Selection of Course           Global Opportunities      FREE
     05  Career Guidance               Global Opportunities      FREE
     06  Admission Guidance            The university, on enrol. FREE
     07  Financial Estimation          Global Opportunities      FREE
     08  Interview Preparation         Global Opportunities      FREE
     09  Visa Services                 Global Opportunities      FREE
       ┃▒▒ SUPERVISION — Visa files are prepared under the ▒▒▒▒▒▒▒▒▒▒
       ┃▒▒ supervision of former visa officials.           ▒▒  --ochre-tint
     10  Education Loan                The lender                FREE
     11  Travel Guidance               Global Opportunities      FREE
     ═════════════════════════════════════════ 0.125rem --rule-strong ═
     AT COST, NO MARKUP (4)
     ─────────────────────────────────────────────────────────────────
     12  Forex Exchange                You, to the provider   AT COST
         /You pay the provider's rate on the day…/
     13  GIC Account (Canada)          You, to the bank       AT COST
     14  Medical Insurance             You, to the insurer    AT COST
     15  Accommodation                 You, to the provider   AT COST
     ─────────────────────────────────────────────────────────────────
     /Nothing in the first eleven rows becomes chargeable later./

     ( Book free counselling )   See the full reckoning →
       A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST.
       No fee, no obligation.
   hover any row → its rule draws left→right in --sienna (CSS scaleX)
```

### 6.7 Visual direction

Surface `--paper`. The ledger is the whole visual: **no cards, no zebra striping, no shadows, no tinted tiles.**

> **Changed 2026-08-04 · client override.** This passage previously read *"no cards, no zebra striping, no icons — fifteen service icons is what every competitor does and it is why every competitor's services section is illegible."* Following the site-wide adoption of Lucide (`01-creative-vision-and-brand.md §3.6`, `04-design-system.md §5`), the ledger **does** now carry **one icon per service row**. The original objection is recorded because it was aimed at a different thing: what makes a competitor's services section illegible is not the presence of a glyph but the **card grid** the glyph is the excuse for — fifteen rounded tiles, each with a tinted circle, each 200px tall, no two facts comparable. That failure mode is still banned here.
>
> **Why this is still a ledger.** The row is still a `<tr>` in a real `<table>`, still one line tall, still ruled top and bottom with a `0.0625rem --rule`, still aligned on four columns so that `NO.`, service, payer and price read down the page as columns rather than across as tiles. Fifteen prices remain comparable at a glance, which is the section's entire argument. The icon is a **label accelerant inside an existing cell**, not a new visual unit: it adds no height, no fill, no border and no radius to the row. If an icon ever forces a row taller or a rule off-grid, the icon goes, not the rule.
>
> **What is fixed.** One glyph per service, no more; passed through `<Icon as={Glyph} />` and never imported from `lucide-react` at the call site; decorative and `aria-hidden`, since the service name is right beside it; `currentColor`, so it takes the row's ink and never the chip's `--verdigris` or the well's `--ochre`; and none of the banned subjects — no `Plane` on Travel Guidance, no `GraduationCap` on Career Guidance, no `Luggage` on Accommodation, no `Handshake` on Admission Guidance.
>
> **What is settled.** The glyph is a genuine **third column of the row** — ordinal, glyph, then clause — and not a mark floated inside the service name. It renders at **`size="sm"`** (16px, 1.75 stroke) so it carries the weight of the mono ordinal beside it rather than the weight of the service name, and it inherits the ordinal column's existing muted ink — `text-plate-grey` in the shipped component — rather than introducing a colour of its own; the `currentColor` rule above is what makes that inheritance automatic rather than a per-row decision. It sits inside the `<th scope="row">` with the service name and is `aria-hidden` (§6.10), so the row header's accessible name is the service name and nothing else. The mapping is a property of the **service**, not of the row that happens to carry it, so it is stored once — `components/sections/what-we-do/cards.ts` — and never at fifteen call sites:
>
> | No. | Service | Glyph | Why this one |
> |---|---|---|---|
> | 01 | Education counselling | `MessagesSquare` | The conversation itself, and more than one of them |
> | 02 | Career guidance | `Signpost` | A direction taken at a junction — not a graduation cap |
> | 03 | Profile shortlisting | `ListFilter` | A long list reduced to a short one |
> | 04 | Country information | `Scale` | Countries weighed against each other — not a globe, not a flag |
> | 05 | Selection of course | `BookOpen` | The course, opened |
> | 06 | Admission guidance | `FileCheck2` | An application checked before it goes — not a handshake |
> | 07 | Financial estimation | `Calculator` | Arithmetic on a sheet, with no currency symbol attached |
> | 08 | Interview preparation | `Mic` | Being asked questions out loud |
> | 09 | Visa services | `FileSearch` | A file read closely — see below |
> | 10 | Education loan | `Landmark` | The lender as an institution; a rupee sign here would read as a fee |
> | 11 | Forex exchange | `ArrowLeftRight` | One currency for another — the transaction, not the money |
> | 12 | GIC account | `PiggyBank` | Money held, not money spent |
> | 13 | Medical insurance | `ShieldPlus` | Cover, and medical cover specifically |
> | 14 | Accommodation | `BedDouble` | A room — not a suitcase and not a house |
> | 15 | Travel guidance | `ClipboardList` | The pre-departure checklist — see below |
>
> **Why visa is `FileSearch` and travel is `ClipboardList`.** These are the two rows where the category's picture language is strongest, and both clichés were rejected outright. A passport on `Visa Services` describes the *document the student already has*; what GO does is read a file closely before it is submitted, which is what `FileSearch` draws and what the supervision callout beneath row 09 claims in words. An aircraft on `Travel Guidance` describes the flight, which GO does not sell; the work is the pre-departure checklist, which is what `ClipboardList` draws. A briefcase was rejected for anything at all — it is the stock mark for "professional services" and it says nothing about which service. Every glyph in the table above names the **action**, never the motif.
>
> **The wireframe.** §6.6 predates this change and does not show the icon column. The ordinals above are the shipped ones; they differ from the draft copy's numbering in §6.4 and §6.6 for rows 02–05, and the two should be reconciled to `cards.ts`.

- `NO.` column: `--fs-mono-label`, `--ink-muted`, tabular.
- Service names: `--fs-body` (Hanken 400), `--ink`.
- `WHO PAYS`: `--fs-body-sm`, `--ink-muted`.
- `FREE` chip: `--verdigris` text on `--verdigris-tint`, `--r-2`, `--fs-mono-label`.
- `AT COST` chip: `--ink-muted` text on `--paper-tracing`, `1px --rule`, `--r-2`, `--fs-mono-label`.
- Row rules `0.0625rem --rule`. **Hover/focus draws the row's own rule left→right in `--sienna`** via `transform: scaleX()` on a pseudo-element with `transform-origin: left`, `--dur-3`, `--ease-cubic`. Nothing else changes; the row does not lift, tint or move.
- Block separator: `0.125rem --rule-strong`.
- Row 09 well: `--ochre-tint` fill with a `2px --ochre` left rule — `--ochre` is 2.1:1 and is used here **only as a rule and a background**, never as text. The `SUPERVISION` label inside the well is `--ink`.
- Closing italic line: Newsreader italic at `--fs-deck`, `--marine`.
- `--r-0` on the ledger; `--r-2` on chips only.

### 6.8 Imagery

**None, in v1 and in v2.** A ledger with a photograph on it is a brochure. The evidence in this section is fifteen prices, and any image would be the thing the eye goes to instead. This is recorded as a permanent refusal so that a later editor does not "warm it up" with a counsellor portrait — the counsellor portraits have their own section (`03-sections-part2.md` § 9) and they earn their place there.

### 6.9 CTA placement & conversion note

Two CTAs at the block foot, primary first: `Book free counselling` with the canonical proof line, and the lateral `See the full reckoning →`.

- **This is the page's second ask, and it is placed correctly.** By this point the visitor has been given six footnoted statistics, fifteen indexed destinations with four facts each, twenty-four named institutions, and fifteen prices. NN/g's rule — no commitment without a reason — is satisfied several times over.
- The section directly disarms the PG persona's most-cited fear: agent commissions steering the recommendation. Row 06 says the university pays on enrolment, in the open, before the visitor has to ask. The research is explicit that transparency and the absence of hidden fees is the most-cited parent criterion; publishing a per-service price is the strongest available expression of it, and no competitor does it.
- The lateral link is deliberately given equal visual weight to a text CTA rather than being buried in the closing line: a reader whose next question is "yes, but what does the *year* cost" must be able to jump straight to `reckoning` without scrolling past three trust sections. Missing that hand-off is how a page loses its highest-intent reader.

### 6.10 Accessibility

- Landmark: `<section id="what-we-do" aria-labelledby="what-we-do-h2">`.
- Heading level: **H2**, plus **H3** for each of the two block heads (`Free to you`, `At cost, no markup`) so the ledger's structure is navigable by heading.
- The ledger is a real `<table>` with `<caption class="sr-only">Fifteen services, who pays for each, and what you pay</caption>`, `<th scope="col">` on the four heads and `<th scope="row">` on each service name. Two `<tbody>` elements, one per block.
- `FREE` and `AT COST` are **text**, not colour-coded glyphs — WCAG 1.4.1 is satisfied by the word, and the chip colour is reinforcement only.
- The per-service icon added on 2026-08-04 sits inside the `<th scope="row">` alongside the service name and is `aria-hidden`. It is decoration: the row header's accessible name is the service name and nothing else, so the screen-reader flow below is unchanged. No service is identified by its glyph alone.
- Row 09's callout is inside the table as a full-width `<td colspan>` row so it is announced in document order immediately after the visa row it modifies, not floated out of sequence.
- Nothing in the table is focusable; the only tab stops in the section are the two CTAs and the footnote markers. This keeps the tab order short on a page with sixteen sections.
- The row-hover rule draw is decorative, `pointer-events: none`, and is not exposed to AT.
- Contrast to verify and record: `--verdigris` on `--verdigris-tint` and `--ink-muted` on `--paper-tracing` are **not in the canon's contrast table** (which quotes both against `--paper`). Both must be measured against their actual chip backgrounds and recorded before ship; if either falls below 4.5:1 at `--fs-mono-label` size, the chip background changes, not the text colour.
- `--ink` on `--paper` 17:1; `--ink-muted` 6.8:1; white on `--sienna-press` 5.4:1.
- Screen-reader flow: heading 2 → deck → table caption → "Free to you, heading level 3" → eleven rows read as "Education Counselling, who pays, Global Opportunities, what you pay, free" → supervision callout → "At cost, no markup, heading level 3" → four rows → closing line → CTAs.

### 6.11 Motion cue

- **Owner: CSS** for the row-rule draw on hover and `:focus-within` — `scaleX`, `--dur-3`, `--ease-cubic`, zero JavaScript. Fifteen rows animated by JS would be fifteen listeners for a two-pixel effect.
- **Owner: Motion** for a single once-only `whileInView` reveal of the two blocks: opacity plus `y`, `--stagger-tight`, capped at `--dur-5`.
- No ScrollTrigger, no scrub, no pin, no counters.
- Reduced motion removes both. `05-motion-blueprint.md` § 6.

---

## 7. `still-page` — Nothing Here Casts a Shadow

> **Chapter:** III Trust · **Surface:** `--paper-still` (`#FDFBF7`) · **Motion owner:** CSS only — **zero motion**

### 7.1 Purpose & UX objective

This is the anti-moment: the one section of the page with no motion at all beyond a single 400ms fade, set on the flattest and brightest paper in the system, under a headline that is a literal description of the art direction rather than a claim about the company. Six accreditations are engraved as typographic blocks — each with its full name, what it means for the reader, and how often the accrediting body re-examines GO — and the legal entity is named in full. Where the category puts a scrolling grey logo strip, this page puts six paragraphs and a quotation. **The stillness is the signal**, and it is aimed squarely at the parent whose first-ranked fear is fraud: fraud is loud, and this section is the quietest thing on the internet in this category.

**Think:** "Somebody outside this company checks it, on a published schedule, and I can see who." **Feel:** the drop in pulse rate that follows a page that has stopped moving. **Do:** read two or three blocks, register that AIRC re-examines on a five-then-ten-year cycle, and continue.

### 7.2 Story chapter

**III — Trust.** `[data-chapter="trust"]`, `--nr-opsz: 44` — the optical size drops here, which makes the type slightly sturdier and less display-like. This is the chapter opener for III: roman `III` in the margin with a rule running from it, label `TRUST`.

### 7.3 Content hierarchy

1. Chapter opener — `III` roman numeral, `TRUST` at `--fs-label`, chapter rule `0.125rem --rule-strong`
2. **H2** — `Nothing here casts a shadow.`
3. Deck
4. Six accreditation blocks — AIRC, ICEF, AAERI, British Council, Education New Zealand, PTE Pearson
5. The AIRC standard, quoted verbatim, as a pull quote with a linked source
6. Legal entity block
7. Footnotes
8. **No CTA**

### 7.4 Draft copy

**H2:** `Nothing here casts a shadow.`

**Deck** (`--fs-deck`):
> *That is a description of this page, not a promise about your application. There are no drop shadows in this design and there are no guarantees in this business. What there is: six external bodies that review us, a published re-examination cycle, and a registered company you can look up.*

**The six blocks.** Each block: mark name (H3) → full name (mono label) → what this means for you (two sentences) → re-review cadence (mono).

**AIRC**
`AMERICAN INTERNATIONAL RECRUITMENT COUNCIL`
> An independent US body that certifies agencies recruiting students to American institutions against a published standard. It means a US university can check us against that standard before it accepts a student from us, rather than taking our word for it.
`RE-EXAMINED: 5 YEARS (FIRST ROUND), 10 YEARS THEREAFTER`

**ICEF**
`ICEF AGENCY STATUS`
> A screening programme used across the international education industry to vet recruitment agencies. It means the institutions we introduce you to have a common reference for who we are, and it is how we get access to vetted partners rather than cold-emailing universities.
`RE-EXAMINED: [VERIFY CADENCE]`

**AAERI**
`ASSOCIATION OF AUSTRALIAN EDUCATION REPRESENTATIVES IN INDIA`
> The Indian industry body for representatives of Australian institutions, with a code of conduct and a complaints process. It means that if we handle your Australian application badly, there is a body **in India** you can complain to about us.
`RE-EXAMINED: [VERIFY CADENCE]`

**BRITISH COUNCIL**
`CERTIFIED AGENT AND COUNSELLOR TRAINING`
> The British Council's training and ethics programme for agents advising on UK study. It means the counsellor advising you on a UK application sat an examined course rather than learning on your file.
`RE-EXAMINED: [VERIFY CADENCE]`

**EDUCATION NEW ZEALAND**
`RECOGNISED AGENCY`
> The New Zealand government education agency's recognition scheme for overseas representatives. It means our New Zealand advice is given under a scheme the destination government itself operates.
`RE-EXAMINED: [VERIFY CADENCE]`

**PTE PEARSON**
`AUTHORISED TEST PARTNER`
> Pearson's authorisation covering the PTE English test. It means you can book and prepare for PTE through us at the published fee, with no arrangement fee added.
`RE-EXAMINED: [VERIFY CADENCE]`

**The AIRC pull quote** (`--fs-quote`, Newsreader italic, hanging quotation mark in the margin):
> *"for a designated period of time of five years (first round), and ten years (thereafter)"*
> `— AIRC, ON THE TERM OF ITS CERTIFICATION. SOURCE LINKED. LAST VERIFIED AUG 2026.`

**Legal entity block:**
> `GLOBAL OPPORTUNITIES PRIVATE LIMITED`
> `HS-27, 2ND FLOOR, KAILASH COLONY MARKET, NEW DELHI 110048`
> `TOLL-FREE 1800 111 119 · DELHI SOUTH +91 11 4714 1414`
> `CIN [VERIFY]`

**Closing microcopy** (`--fs-body-sm`, `--ink-muted`):
> No percentage appears on this page. Every competitor publishes a visa success rate; independent guidance to parents treats that specific claim as a warning sign, so we do not make it.

That last paragraph is the most counter-category sentence on the page, and it belongs here, in the section that has nothing else to do.

### 7.5 Layout

**Desktop ≥1280px.** `--content-max`, `padding-block: var(--section-y)` — and this section takes the **upper** end of the clamp. Whitespace is the material.

- Chapter opener: `III` in the outer margin, rule across 1–12.
- H2: columns 1–7. Deck: columns 1–6, `--measure-deck`.
- Six blocks: a **3 × 2 grid**, each block spanning 4 columns, with `--s-9` (6rem) between rows and `--grid-gap` between columns. **No keylines, no boxes, no wells.** The grid is held by alignment alone.
- Pull quote: columns 3–10, with the opening quotation mark hung into column 2.
- Legal entity block: columns 1–6.
- Closing microcopy: columns 1–7.

**Tablet 768–1023px.** Blocks become a 2 × 3 grid, `--s-8` between rows. Pull quote full width with the mark hung into the gutter. No marginalia rail below 1024px; the two source links become inline anchors within their blocks.

**Mobile <768px.** One column, blocks stacked with `--s-7` between them. The H3 mark name, the mono full name, the paragraph and the cadence line all left-align to the same gutter. **The paragraph is never collapsed behind a disclosure** — see § 7.10.

### 7.6 Wireframe — desktop

```
 col  1    2    3    4    5    6    7    8    9   10   11   12      rail
   III ────────────────────────── 0.125rem --rule-strong ─────────
   TRUST

   Nothing here casts a shadow.

   /That is a description of this page, not a promise about your/
   /application. There are no drop shadows in this design and there/
   /are no guarantees in this business./

   AIRC                  ICEF                  AAERI
   AMERICAN INTERNATIONAL ICEF AGENCY STATUS   ASSOCIATION OF AUSTRALIAN
   RECRUITMENT COUNCIL                         EDUCATION REPRESENTATIVES
   An independent US body A screening programme IN INDIA
   that certifies agenc… used across the inter… The Indian industry body…
   RE-EXAMINED: 5 YEARS  RE-EXAMINED: [VERIFY] RE-EXAMINED: [VERIFY]
   (FIRST ROUND), 10
   YEARS THEREAFTER
                                                        ← --s-9 (6rem) gap
   BRITISH COUNCIL       EDUCATION NEW ZEALAND PTE PEARSON
   CERTIFIED AGENT AND   RECOGNISED AGENCY     AUTHORISED TEST PARTNER
   COUNSELLOR TRAINING
   The British Council's The New Zealand gov… Pearson's authorisation…
   RE-EXAMINED: [VERIFY] RE-EXAMINED: [VERIFY] RE-EXAMINED: [VERIFY]

        "for a designated period of time of five years
    ”   (first round), and ten years (thereafter)"
        — AIRC, ON THE TERM OF ITS CERTIFICATION. SOURCE LINKED.

   GLOBAL OPPORTUNITIES PRIVATE LIMITED
   HS-27, 2ND FLOOR, KAILASH COLONY MARKET, NEW DELHI 110048
   TOLL-FREE 1800 111 119 · DELHI SOUTH +91 11 4714 1414

   No percentage appears on this page. Every competitor publishes a visa
   success rate; independent guidance to parents treats that claim as a
   warning sign, so we do not make it.

   surface --paper-still #FDFBF7 · NO boxes · NO rules between blocks
   NO motion beyond one 400ms opacity fade on entry
```

### 7.7 Visual direction

Surface `--paper-still` (`#FDFBF7`) — the brightest, flattest paper in the system, used **only here**. The section-to-section transition from `--paper` into `--paper-still` is a two-value lightening that reads, correctly, as a page held closer to the light.

- The **only** ink besides type is one `0.125rem --rule-strong` beneath the H2 and the chapter rule above it. There is not a single keyline, well, tint, chip or box in the section.
- Mark names (H3): `--fs-d2` (Newsreader 400, opsz 32), `--ink`.
- Full names: `--fs-mono-label`, `--ink-muted`, letterspaced uppercase — a sanctioned use (data label).
- "What this means for you": `--fs-body`, `--ink`, max `--measure-prose`. **Set in the primary ink, not the muted ink** — this is the payload of the section and it is not secondary text.
- Cadence lines: `--fs-mono-label`, `--verdigris` where the cadence is verified, `--ink-muted` where it is `[VERIFY]`. Verdigris is the page's verified state and it is earned here.
- Pull quote: `--fs-quote` (Newsreader italic 300, opsz 32), `--ink`, with the opening mark hung into the margin at `--ink-faint` (a non-text decorative use at display size — permitted).
- Legal entity block: `--fs-data`, mono, `--ink`.
- The paper grain tile remains, because it is page-level and static. The section's flatness is achieved by removing **surfaces**, not by removing texture.
- `--r-0` everywhere. There is nothing here with a corner.

### 7.8 Imagery

**None, in v1 and in v2. This is the one section of the page where a photograph is forbidden permanently.**

The section's entire argument is absence — no shadow, no motion, no image, no percentage. Adding a photograph of an office or a certificate would make it a section *about* trust rather than a section that *is* trustworthy. The accreditation logos are likewise excluded: rendering six third-party marks as images would reproduce exactly the silent grey strip that GO's current site already runs and that the brand research names as its most under-exploited asset. The marks are set as type, at display size, with an explanation each. That is the upgrade.

### 7.9 CTA placement & conversion note

**No CTA of any kind.** No primary, no secondary, no lateral link except the two source links (AIRC, and the accrediting bodies' own pages).

This is a specification, and it is the hardest one in the document to hold at review. The argument: the section makes exactly one promise — that it is still, quiet and not selling — and a button would break it in the only place on the page where breaking it costs something. The nav pill remains one glance away at all times, and on mobile the bar is present from 25% scroll; nobody who wants to act is prevented from acting.

The conversion function is structural. NN/g's credibility model treats trust as the multiplier on every subsequent ask; this section raises that multiplier for the five conversion surfaces that follow it (`branch-atlas`, `contributors`, `for-parents`, `reckoning`, `enquiry`). The nearest CTA in either direction is `what-we-do`'s `Book free counselling` above and `branch-atlas`'s `Walk in tomorrow, 11:00 AM` below — and the second of those is much more persuasive *because* this section sits in front of it.

### 7.10 Accessibility

- Landmark: `<section id="still-page" aria-labelledby="still-page-h2">`.
- Heading levels: **H2** for the section, **H3** for each of the six marks. Six H3s give a clean heading list of the accreditations.
- The pull quote is `<blockquote cite="…">` with a `<cite>` naming AIRC and carrying the last-verified date; the quotation is reproduced verbatim, including its parentheses and lower-case opening.
- The legal entity block is an `<address>` with `tel:` anchors on both numbers.
- **Every "what this means for you" paragraph is permanently visible.** In `colophon-strip` (§ 3) the accreditation row is compact and the explanation is a disclosure; here it is prose in the flow. That difference is the point of having both sections, and it means this page never depends on hover to deliver an accreditation's meaning — WCAG 1.4.13 is not merely satisfied, it is not engaged.
- Focus order: chapter anchor → two source links → two `tel:` anchors. Four tab stops in the whole section.
- Contrast on `--paper-still` (`#FDFBF7`, brighter than `--paper`): `--ink` ≥17:1, `--ink-muted` ≥6.9:1, `--marine` ≥11.8:1, `--verdigris` ≥5.9:1. All exceed their `--paper` values because the background is lighter; no re-measurement risk in this direction, but record the figures anyway.
- `--ink-faint` appears once, as the hung quotation mark, at `--fs-quote` display size and as a decorative glyph. It is `aria-hidden`.
- Touch targets: the four anchors are padded to ≥44px.
- **Reduced motion:** the 400ms entry fade is removed entirely and the section renders at full opacity on first paint.

### 7.11 Motion cue

- **Zero motion, by specification.** One `opacity: 0 → 1` fade over **400ms** on section entry, `--ease-quad`, implemented in **CSS only** with no library involved.
- No ScrollTrigger instance, no Motion component, no Anime.js scope. This section spends nothing from the 14-instance ScrollTrigger budget and adds nothing to the JS bundle.
- Under `prefers-reduced-motion` the fade is zeroed by the CSS backstop and the content is visible immediately.
- `05-motion-blueprint.md` § 7 records this as the page's one deliberate motion vacuum and must not be "improved".

---

## 8. `branch-atlas` — Eighteen Doors

> **Chapter:** III Trust · **Surface:** `--paper-still` · **Motion owner:** Anime.js (SVG draw), Motion (drawer)

### 8.1 Purpose & UX objective

The atlas performs its oldest trick: the fold-out map. India draws itself in hairline and eighteen offices ink in as crosshairs, each resolving to a street address, a phone number, opening hours and an invitation — *walk in tomorrow, 11:00 AM*. The section converts an abstract claim ("18 offices") into a door the reader can physically walk through this week, which the brand research identifies as the parent's most direct antidote to the fraud fear: a company with eighteen leases and eighteen landlines is a company that can be found. It is also the page's most under-priced conversion surface, because a branch visit is a higher-intent action than a form fill and nobody in the category offers it as a first-class CTA.

**Think:** "There is one of these fourteen minutes from my house." **Feel:** the concreteness of a street address after four sections of numbers. **Do:** find their city, read the address, and either call that office directly or plan a walk-in.

### 8.2 Story chapter

**III — Trust**, second beat. `[data-chapter="trust"]`, `--nr-opsz: 44`, continuing on `--paper-still` — the two Trust sections share a surface so they read as one spread.

### 8.3 Content hierarchy

1. Running head — `THE FOLD-OUT MAP`
2. **H2** — `Eighteen doors you can walk through.`
3. Deck
4. **The India map** — hairline SVG outline, eighteen crosshair nodes, Delhi South marked as HQ
5. **The branch list** — eighteen entries, alphabetical, keyboard-operable, the accessible source of truth
6. **The branch drawer** — name, `<address>`, phone, hours, walk-in line, three actions, and a reserved plate
7. Footnote `⁵`
8. Section foot: a note on how the walk-in line is computed

### 8.4 Draft copy

**Running head:** `THE FOLD-OUT MAP`

**H2:** `Eighteen doors you can walk through.`

**Deck** (`--fs-deck`):
> *Every branch below is listed with a street address and a phone number. We publish the number we can name.*

**The eighteen, alphabetical:** Ahmedabad · Amritsar · Bangalore · Bathinda · Chandigarh · Chennai · **Delhi South (head office)** · Delhi West · Hyderabad · Jalandhar · Ludhiana · Mohali · Mumbai Andheri · Mumbai Bandra · Mumbai Dadar · Mumbai Thane · Patiala · Pune

**Drawer copy, worked in full for the one branch we can fully evidence:**

```
DELHI SOUTH                                   HEAD OFFICE
HS-27, 2ND FLOOR, KAILASH COLONY MARKET
NEW DELHI 110048
+91 11 4714 1414
MON–SAT · 10:00–18:30 IST                     [VERIFY]

Walk in tomorrow, 11:00 AM. No appointment needed.

( Call this office )  ( WhatsApp this office )  Get directions →
```

**The other seventeen** ship with `[VERIFY — street address, phone and hours to be pulled from GO's own contact pages]`. A branch whose address cannot be evidenced **does not appear as a node on the map**; it appears in the list with the city name and a `Call the toll-free line for this branch` action. Footnote `⁵` says *we publish the number we can name*, and that sentence must remain true of every row.

**Walk-in line — the computation.** The string is generated server-side from the branch's real opening hours:

- If the branch is open tomorrow: `Walk in tomorrow, 11:00 AM. No appointment needed.`
- If tomorrow is a closed day: `Walk in Monday, 11:00 AM. No appointment needed.`
- If the branch has no published hours: the line is omitted entirely.

It is never a countdown, never "today only", and never resets. This is the same honest-urgency discipline applied to Application Days in `eleven-months` (`03-sections-part2.md` § 12).

**Section foot** (`--fs-body-sm`, `--ink-muted`):
> Hours are the branch's own published hours and are dated in the colophon. Walk-in times are an open invitation, not an appointment; if you would rather have a fixed slot, book a call and ask for one.

**Map accessible name:** `India, with eighteen Global Opportunities branch locations marked.`

### 8.5 Layout

**Desktop ≥1280px.** `--content-max`, `padding-block: var(--section-y)`.

- Running head, H2, deck: columns 1–6.
- **Map: columns 1–7**, `aspect-ratio: 4/5` (India's own proportion), inset from the column edges by `--s-6` so the hairline never touches a grid line.
- **Branch list: columns 8–12**, two sub-columns of nine entries, each entry a `<button>` at ≥44px.
- **Drawer:** a right-side panel, 420px wide, `--z-drawer`, `--paper` surface, `--shadow-drawer` — the **only** blurred shadow permitted on the page, and permitted here precisely because a drawer floats above the page plane. Scrim at `--z-scrim`, `--ink` at 22% opacity.
- Delhi South is marked on the map with a larger crosshair and a `HQ` label; it is also pinned to the top of the list above the alphabetical run.

**Tablet 768–1023px.** Map spans columns 1–12 above; list below in three sub-columns of six. The drawer becomes a **full-width in-flow expansion** beneath the list rather than a floating panel — at this width a 420px drawer would cover the map it refers to.

**Mobile <768px — structurally different.** The map is rendered at `aspect-ratio: 1/1`, is **non-interactive and `aria-hidden`**, and exists as an illustration. Eighteen 12px crosshairs cannot carry a 44px target and pretending otherwise is worse than not trying. The **list is the interface**: eighteen full-width rows at ≥56px, tapping expands the branch **in place** as an accordion. No drawer, no scrim — a modal here would fight the mobile bar for the same thumb.

### 8.6 Wireframe — desktop

```
 col  1    2    3    4    5    6    7    8    9   10   11   12      rail
     THE FOLD-OUT MAP
     Eighteen doors you can walk through.
     /Every branch below is listed with a street address and a phone/
     /number. We publish the number we can name./⁵

     ┌───────────────────────────────┐   DELHI SOUTH        HEAD OFFICE
     │            ╭─╮                │   ─────────────────────────────
     │        ╭───╯ ╰──╮             │   ✛ Ahmedabad     ✛ Mohali
     │      ╭─╯ ✛Amritsar╮           │   ✛ Amritsar      ✛ Mumbai Andheri
     │     ╭╯ ✛Jalandhar  ╰╮         │   ✛ Bangalore     ✛ Mumbai Bandra
     │    ╭╯  ✛Chandigarh   ╲        │   ✛ Bathinda      ✛ Mumbai Dadar
     │   ╭╯    ✛Delhi West   ╲       │   ✛ Chandigarh    ✛ Mumbai Thane
     │  ╭╯     ⊕Delhi South   ╲      │   ✛ Chennai       ✛ Patiala
     │  │   ✛Ahmedabad         ╲     │   ✛ Delhi West    ✛ Pune
     │  ╰╮  ✛Mumbai ×4          ╲    │   ✛ Hyderabad
     │   ╰╮  ✛Pune  ✛Hyderabad  ╱    │   ✛ Jalandhar
     │    ╰╮  ✛Bangalore       ╱     │   ✛ Ludhiana
     │     ╰╮   ✛Chennai      ╱      │
     │      ╰───╮        ╭───╯       │   ⊕ = HQ, --sienna + 6px ring
     │          ╰────────╯           │   ✛ = --marine crosshair, 1px
     └───────────────────────────────┘   44px transparent hit circle
     outline 1px --rule-strong, drawn once (Anime.js createDrawable)

  ┌─ DRAWER (--z-drawer, 420px, --shadow-drawer) ─────────────┐
  │ DELHI SOUTH                              HEAD OFFICE   ×  │
  │ ┌──────────────────────────────────────────────────────┐  │
  │ │ PLATE VIII · 28.5562° N · 77.1000° E                 │  │  3:2
  │ │ HS-27, KAILASH COLONY MARKET · 10:00 IST             │  │  (Plate A v1
  │ └──────────────────────────────────────────────────────┘  │   → photo v2)
  │ HS-27, 2ND FLOOR, KAILASH COLONY MARKET                   │
  │ NEW DELHI 110048                                          │
  │ +91 11 4714 1414                                          │
  │ MON–SAT · 10:00–18:30 IST                                 │
  │ Walk in tomorrow, 11:00 AM. No appointment needed.        │
  │ ( Call this office )  ( WhatsApp this office )            │
  │ Get directions →                                          │
  └───────────────────────────────────────────────────────────┘
```

### 8.7 Visual direction

Surface `--paper-still`, continuing from `still-page` so the two Trust sections read as one spread and the map appears to be printed on the same sheet as the accreditations.

- **India outline:** `1px --rule-strong` stroke, no fill, `stroke-linejoin: round`. Simplified silhouette — this is a locator diagram, not a political map, and it carries no internal state borders.
- **Latitude ticks:** `0.0625rem --rule`, short marks at the frame edge. Cartographic furniture, not decoration.
- **Branch nodes:** crosshair marks, `1px --marine`, ~12px across. **Delhi South:** `--sienna` crosshair with a 6px `--sienna` ring and an `HQ` label at `--fs-mono-label`.
- **Selected node:** an `--ochre` filled dot at the crosshair centre — `--ochre` is 2.1:1 and is used here as a **non-text mark only**; the selection is simultaneously announced in the list by a `--sienna-tint` row background and a 2px `--sienna` left rule, so selection is never colour-alone.
- **List rows:** `--fs-body` (Hanken 400), `--ink`, `0.0625rem --rule` between, `--r-0`.
- **Drawer:** `--paper` surface, `--r-0`, `--shadow-drawer`. Address at `--fs-data` (mono — it is a verified fact). Hours at `--fs-mono-label`. The walk-in line at `--fs-body`, `--ink`, in an `--ochre-tint` well with a 2px `--ochre` left rule.
- **Drawer actions:** `Call this office` as a solid `--sienna-press` pill; `WhatsApp this office` as an outlined pill — **`--ink` text with a `1px --rule-strong` border, never WhatsApp brand green.** Green on this page means *verified* (`--verdigris`) and that semantic must not leak. `Get directions →` as a `--marine` text link.

### 8.8 Imagery

**Plate D variant — the India map with eighteen nodes.** This plus the fifteen destination coastlines are the only bespoke SVG assets v1 requires, sharing a **≤40KB gzipped** budget. The India path must be simplified aggressively: silhouette only, no state borders, no islands below a size threshold, and the crosshair and graticule reused as `<symbol>` definitions across both this section and the gazetteer.

**v2:** the map is **permanent**; no photograph replaces it.

**Each branch drawer, however, reserves one plate.** In v1 it is a **Plate A** at 3:2 carrying the branch's coordinates, street name and local time — `PLATE VIII · 28.5562° N · 77.1000° E · HS-27, KAILASH COLONY MARKET · 10:00 IST`. In v2 a commissioned photograph **of the actual office door** drops into the identical 3:2 box behind the identical caption, `data-plate="field"` → `data-plate="photo"`. This is the concept's "photo of the actual door", correctly deferred: an eighteen-door claim is enormously strengthened by eighteen photographs of doors, and enormously weakened by one stock image of an office.

### 8.9 CTA placement & conversion note

**Three CTAs per branch, inside the drawer, all real anchors:** `Call this office` (`tel:`), `WhatsApp this office` (`wa.me`), `Get directions →` (maps link). The walk-in line sits above them as a statement rather than a button, because a walk-in is not a click.

- `tel:` and `wa.me` are real `<a href>` elements that **work with JavaScript disabled** (canon build note 11). On the target device class — budget Androids at 3–6 Mbps, >55% of Indian web traffic — this is not a theoretical fallback.
- WhatsApp's response economics in India are decisive: 60–70% response rates against 20–30% for web forms, ~98% opened within three hours, median replies in 45–90 seconds. Putting a branch-specific WhatsApp anchor beside a branch-specific phone number gives a parent two channels they already use, in the place where they have just found their own city.
- The walk-in invitation is the page's only **zero-digital** conversion path and is aimed at the parent who does not fill forms and does not trust links. It is also FTC-clean by construction: computed from real hours, never a countdown, never scarce.
- The section deliberately carries **no** `Book free counselling`. A visitor who has just found the office nearest them should be given that office's own number, not routed back into a national form.

### 8.10 Accessibility

- Landmark: `<section id="branch-atlas" aria-labelledby="branch-atlas-h2">`.
- Heading levels: **H2** for the section; each branch name inside the drawer is an **H3**.
- **The map is `<svg role="img">` with `aria-label="India, with eighteen Global Opportunities branch locations marked."` and every node inside it is `aria-hidden`.** The accessible, keyboard-operable control is the adjacent `<ul>` of eighteen `<button>` elements. This satisfies the canon's floor — *all 18 branches reachable by keyboard* — without attempting to make eighteen SVG paths into focusable widgets.
- On desktop the nodes are pointer-operable: each carries a transparent ≥44px hit circle. Hovering a node highlights its list row and vice versa, so pointer and keyboard users share one selection model.
- Drawer: `role="dialog" aria-modal="true" aria-labelledby="branch-name"`, focus trapped, `Esc` closes, focus returns to the invoking list button, `<body>` scroll locked while open.
- **No-JS contract:** the drawer's content is server-rendered inside each list item as a native `<details>` and progressively upgraded to a dialog. With JS off, every address, phone number and `wa.me` link is still present and operable.
- Below 768px there is no dialog at all — the accordion pattern avoids a modal competing with the mobile bar for the same thumb region.
- Contrast: `--ink` on `--paper-still` ≥17:1; `--marine` nodes ≥11.8:1 (non-text, but comfortably clear); `--sienna` HQ ring is a non-text mark; `--ochre` selection dot is non-text and is always paired with a text-and-rule change in the list.
- Touch targets: list rows ≥56px on mobile, ≥44px on desktop; drawer action pills ≥48px.
- Screen-reader flow: heading 2 → deck → "India, with eighteen Global Opportunities branch locations marked, image" → "Branches, list, 18 items" → "Delhi South, head office, button" → on activation, dialog announced → heading 3 → address → phone link → hours → walk-in line → three action links.

### 8.11 Motion cue

- **Owner: Anime.js** for the SVG: the India outline draws once via `svg.createDrawable` over **900ms**, `power2.inOut`; the eighteen nodes then stamp in **geographic sequence, north to south**, on a `stagger`. Dynamically imported at the section boundary, inside `createScope({ root })`, with `scope.revert()` on cleanup.
- **Owner: Motion** for the drawer: open/close via `AnimatePresence`, transform and opacity only, `--dur-4`, `--ease-quart`. The scrim fades at `--dur-3`.
- List-row and node highlight: CSS colour transitions at `--dur-2`. No JS.
- One ScrollTrigger-equivalent trigger fires the draw once and never again; there is no scrub and no pin in this section.
- Reduced motion renders the map fully drawn and all eighteen nodes present on first paint, and the drawer appears at its final state. `05-motion-blueprint.md` § 8.

---

*End of Part 1. Sections 9–16 and the mobile bar continue in `03-sections-part2.md`.*
