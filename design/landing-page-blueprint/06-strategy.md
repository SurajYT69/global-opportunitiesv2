# 06 — Strategy: Responsive, Conversion, Accessibility, Performance & SEO, Handoff

**Purpose.** This is the last document before code. It converts the creative canon (`direction.md`) and the CRO/SEO evidence base into the five operational strategies a developer needs: how the page reflows at every breakpoint, how it converts, how it stays WCAG 2.2 AA, what it is allowed to weigh, and in what order it gets built. Every token, copy string, budget and rule quoted here is verbatim from canon. Where canon was silent, the resolution is marked **[GAP RESOLVED]** with its reasoning. Research claims are attributed inline so a reviewer can separate evidence from opinion.

**Siblings.** `01-concept.md` (narrative) · `02-information-architecture.md` (section order & IDs) · `03-section-specs.md` (per-section content & copy) · `04-design-system.md` (tokens, components, contrast table) · `05-motion-blueprint.md` (motion specs, timelines, governance) · **`06-strategy.md`** (this file).

---

## Table of contents

1. [Responsive strategy](#1-responsive-strategy)
2. [Conversion strategy](#2-conversion-strategy)
3. [Accessibility strategy](#3-accessibility-strategy)
4. [Performance + SEO](#4-performance--seo)
5. [Developer handoff](#5-developer-handoff)

---

## 1. Responsive strategy

### 1.1 Canon breakpoints

```css
--bp-xs: 480px; --bp-sm: 768px; --bp-md: 1024px; --bp-lg: 1280px; --bp-xl: 1600px;
```

Three canon rules are keyed to these and are not negotiable:

- **Pinning and the marginalia rail are ≥1024px only.**
- **The gazetteer collapses to tap-accordion <768px.**
- **The mobile bar exists <1024px only.**

**Why mobile is the primary design target, not the fallback.** Budget Androids are >55% of Indian web traffic and congested tier-2 4G delivers 3–6 Mbps real (CRO research). The canon target device is a ₹15,000 Android on 3–6 Mbps. Every rule below is written mobile-out; the desktop rules describe what is *added* above 1024px, not what is taken away below it.

### 1.2 Per-breakpoint global rules

| Concern | **<480px** | **480–767px** | **768–1023px** | **1024–1279px** | **1280–1599px** | **≥1600px** |
|---|---|---|---|---|---|---|
| **Type — H1 `--fs-d0`** | `clamp(3.25rem, 8.4vw, 7.5rem)` → 52px (min floor) | 52px → 64px | 64px → 86px | 86px → 107px | 107px → 134px, caps at 120px | 120px (cap) |
| **Type — H2 `--fs-d1`** | 36px (min floor) | 36–37px | 37–49px | 49–61px | 61–64px (cap) | 64px (cap) |
| **Body** | `--fs-body` 1.0625rem/1.62 everywhere. Never scaled down. | same | same | same | same | same |
| **Serif body (`for-parents`)** | `--fs-serif-body` 1.125rem/1.72, max `--measure-serif` 62ch | same | same | same | same | same |
| **Gutter `--gutter`** | `clamp(1.25rem, 4vw, 4rem)` → 20px | 20–30px | 31–41px | 41–51px | 51–64px | 64px (cap) |
| **Section spacing `--section-y`** | `clamp(5rem, 10vw, 9rem)` → 80px | 80px | 80–102px | 102–128px | 128–144px | 144px (cap) |
| **Container** | full-bleed minus gutter | same | same | `--content-max` 1200px | 1200px + 96px rail | `--frame-max` 1600px frame, 1200px content |
| **Grid** | 12 cols, everything spans 12 or 6 | 12 cols, spans 12/6 | 12 cols, spans 12/6/4 | 12 cols, full span vocabulary | same | same |
| **Marginalia rail** | none — footnotes become inline `<details>` | none | none | **`--rail-md` 64px**, numbers only, text on hover/focus | **`--rail` 96px**, full footnote text | 96px |
| **Chapter spine** | none | none | none | present | present | present |
| **Nav** | wordmark + `Contents` disclosure | same | same | full 6 items + phone + pill, `VOL. XXV` hidden | full + `VOL. XXV` | full + `VOL. XXV` |
| **Mobile bar** | **present**, ≥48px targets | present | present | **absent** | absent | absent |
| **Pinning** | none | none | none | `eleven-months` pins | pins | pins |
| **ScrollTriggers live** | 4 | 4 | 4 | 10 | 10 | 10 |

**The grid does not change column count.** It stays 12 at every breakpoint; what changes is span allocation. A 12-column grid at 375px with a 20px gutter yields ~27px columns, which are never used individually — every element spans 12 or 6. Keeping the column count constant means one grid definition, one mental model, and no re-authoring of span classes at each breakpoint.

**The margin rail → inline `<details>` collapse.** Canon: *"<1024px: the rail is removed and each footnote becomes an inline native `<details>` disclosure directly beneath its figure. (No bottom sheet — it needs JS and collides with the mobile bar.)"* This is the single most consequential responsive decision on the page, because the rail is the structural signature and 55%+ of traffic never sees it. The mitigation is that the *auditability* survives intact: every footnote's text is still one tap away, still adjacent to the figure it cites, still crawlable, and still works with JavaScript disabled. What is lost is the visual argument, not the evidence.

> **[GAP RESOLVED — nav below 1024px]** Canon specifies the nav contents (wordmark, `VOL. XXV`, six items, phone as text, `Book free counselling` pill) but not how they survive at 375px, where they cannot all fit. Resolution: below 1024px the nav carries the **wordmark and a `Contents` disclosure only**. `Contents` opens a full-screen sheet containing the six nav items, all three phone numbers, and the `For Parents` link. The `Book free counselling` pill is **removed from the nav** below 1024px because the mobile bar already carries `Book` in the thumb zone — duplicating it costs a target and gains nothing. `VOL. XXV` is dropped below 1280px. The naming is on-brand: an atlas has a table of contents.

### 1.3 The 17-row section adaptation table

Desktop = ≥1024px. Tablet = 768–1023px. Mobile = <768px.

| # | Section | Desktop (≥1024px) | Tablet (768–1023px) | Mobile (<768px) |
|---|---|---|---|---|
| 1 | `sticky-nav` | Full running head: wordmark, `VOL. XXV` (≥1280), six items, phone as text, pill. Destinations mega-panel on click. Chapter spine in the left gutter. | Wordmark + `Contents` disclosure. No pill, no spine. Phone moves into the sheet. | Same as tablet. Nav height reduces to 52px to protect vertical space. |
| 2 | `hero` | Asymmetric spread: H1 + deck + dual CTA + proof line + accreditation row in cols 1–7; Departure Card cols 1–7 beneath; Plate A cols 9–12. | Single column: H1 → deck → Departure Card → dual CTA → proof → accreditation. Plate A drops below the CTA at 3:2. | Same order. H1 at 52px. Plate A at 4:5. CTAs stack full-width at ≥48px. Departure Card keeps **all six stations** — it is the hero and it does not get abridged. |
| 3 | `colophon-strip` | Six stats as **one running line** of set text with superscripts; six accreditation marks beneath with hover disclosure. | Stats wrap to two lines, still running text with `·` separators — never a stat bar. Marks in a 3×2 grid. | Stats wrap to four lines; the `·` separators are retained so it still reads as one sentence. Marks in a 2×3 grid, tap disclosure. Footnotes become inline `<details>`. |
| 4 | `gazetteer` | Four anchor plates (≥2× area) + eleven hairline rows. Hover/focus expands a row; Plate D morphs into the 96px margin rail via `layoutId`. | Anchor plates 2-up. Rows still hover/focus-expand; **Plate D moves inline** beneath the expanded row (no rail to morph into). | **Tap-accordion** (canon). Anchor plates 1-up full-bleed. Each row is a ≥48px `<summary>`; the panel opens via `grid-template-rows: 0fr→1fr`; Plate D renders inline at a locked 4:5. |
| 5 | `register` | `700+` headline, eight country counts, ~24 named partners in **three** typeset columns, `see the full list →`. | Two columns. | One column, alphabetical, with a hairline every fourth name so the list stays scannable. Counters unchanged (they are the point). |
| 6 | `what-we-do` | Fifteen services as a ruled **two-column** ledger: name left, `FREE`/`PAID` + figure right. Row hover draws the rule. | Same two-column ledger, tighter gutter. | Stacked: name on line 1, `FREE`/`PAID` + figure right-aligned on line 2, hairline beneath. Rule renders at `scaleX(1)` permanently; the `FREE`/`PAID` colour states render from first paint. |
| 7 | `still-page` | Six accreditations as typographic blocks in a 3×2 grid on `--paper-still`; "what this means for you" on hover; AIRC standard quoted; legal entity named. | 2×3 grid. | Single column. "What this means for you" becomes a tap disclosure. **The 400ms fade and the absolute stillness are identical at every breakpoint** — this section does not adapt its motion, because its motion *is* the argument. |
| 8 | `branch-atlas` | Hairline India map with 18 crosshairs, labels visible on hover; city drawer enters from the right at 420px wide with `--shadow-drawer`. | Map at a taller aspect; labels for the eight largest cities only. Drawer from the right at 60vw. | Map fills the column at ~4:5; **all labels suppressed until tap**. Each crosshair carries an invisible ≥44×44px hit target. Drawer becomes a **bottom sheet** at ≥48px targets, dismissible by swipe-down, backdrop tap and `Escape`. A plain text list of all 18 branches with addresses renders beneath the map for anyone who would rather read than tap. |
| 9 | `contributors` | Plate C cartouches 4-up; hover intensifies the registration offset; click morphs the cartouche into a right-hand drawer via `layoutId`. | 2-up. Drawer at 60vw. | 1-up list. Drawer becomes a full-screen sheet; the `layoutId` morph is retained. `tel:` and `wa.me` sit above the sheet's fold at ≥48px. |
| 10 | `for-parents` | Warm paper, serif body at `--measure-serif` 62ch, seven blocks in a two-column reading spread; dual clock in the margin; Hindi toggle, print and WhatsApp actions in a ruled action bar. | Single reading column at 62ch. Dual clock moves above the "who calls you" block. | Single column. Dual clock becomes a full-width ruled band. Action bar stacks to three full-width ≥48px rows. **Type does not shrink** — this chapter is read by a 45–55-year-old and 1.125rem/1.72 is the floor, not the target. |
| 11 | `reckoning` | Three chip rows above a two-column typeset ledger (label left, ₹ figure right) on `--paper-tracing`; stacked ₹ bar; footnote superscripts to the rail. | Same ledger, chips wrap to two rows. | Chips wrap at ≥44px each. **The two-column ledger form is preserved** — this is the section a parent screenshots and forwards, and its printed structure must survive at 375px. ₹ bar goes full-bleed. Footnotes become inline `<details>`. |
| 12 | `eleven-months` | **PINNED horizontal chapter.** Ruled calendar AUG→JUL travels on `x` at `scrub: 0.6`; ochre and sienna ticks stamp; three Plate B specimens tip in with ochre leaders; margin note at the far right. | **No pin.** Static **vertical** list of eleven month blocks; ticks inline as ruled markers; specimens full-width at locked aspect; margin note as a ruled pull-quote. | Same static vertical list. Specimens at a taller aspect with the annotated clause called out above the sheet rather than beside it, since a leader line has nowhere to go at 375px. |
| 13 | `endpaper` | Inversion across the 30vh turn band; masked headline; cited counters; named-student cartouches 3-up; five institutional testimonials 2-up. | Cartouches 2-up, testimonials 1-up. | Cartouches and testimonials 1-up. **The inversion is identical** — it is the narrative payoff and it costs one composited layer. |
| 14 | `questions` | Eight native `<details>` in a single 66ch column with the question in `--fs-h4` and the answer in `--fs-body`. | Same. | Same, full-width. `<summary>` targets ≥48px; question text may wrap to two lines without changing the target height. |
| 15 | `enquiry` | Three steps on `--paper-tracing`; step 1 chips 4-up; progress rule above; `tel:` and `wa.me` as equal siblings beside the submit. | Chips 3-up. Siblings beside submit. | Chips 2-up at ≥48px. Submit full-width. **`Call` and `WhatsApp` stack full-width directly beneath the submit**, above the mobile bar's safe area — they are siblings, not fallbacks, and on mobile they are the more likely conversion. |
| 16 | `colophon` | Three-column footer: entity + HQ + numbers; 18 branches with addresses; 15 destinations; socials; legal; Sources & Last-Verified table as a first-class element; muted dual clock. | Two columns. Branches in a 2-column list. | Single column. **Branches and destinations collapse into `<details>` grouped by region** (North, West, South) so the footer does not run 4000px. The Sources & Last-Verified table stays open and un-collapsed — hiding the auditability promise inside a disclosure would defeat it. |
| — | `mobile-bar` | **Absent.** | **Present** — three anchors, ≥48px, `--paper` @98%, top hairline `--rule-strong`, `z-index: var(--z-mobilebar)`. | Present. `env(safe-area-inset-bottom)` padding above the Android gesture inset. Body carries matching `padding-bottom` from first paint so the bar's entrance causes zero CLS. |

### 1.4 Touch replacements for hover-dependent features

Nothing on this page is reachable *only* by hover. Every entry below has a tap equivalent and a keyboard equivalent.

| Hover feature | Breakpoint where hover is unavailable | Touch replacement | Keyboard equivalent |
|---|---|---|---|
| `gazetteer` row expand | <768px | Tap-accordion: `<summary>` at ≥48px, `grid-template-rows: 0fr→1fr` | `Enter`/`Space` on `<summary>` |
| Plate D margin morph | <1024px | Plate renders inline beneath the expanded row | follows the accordion |
| Footnote superscript → rail illumination | <1024px | Superscript becomes an inline `<details>` disclosure beneath the figure | `Enter`/`Space` |
| Accreditation "what this means for you" (`colophon-strip`, `still-page`) | all touch | Tap disclosure on the mark | `Enter`/`Space`; `:focus-visible` also discloses on desktop |
| `what-we-do` row rule draw | all touch | No replacement needed — decorative. Rule renders at `scaleX(1)` and `FREE`/`PAID` colours render from first paint | `:focus-visible` draws the rule |
| Plate C registration-offset intensify | all touch | No replacement — decorative | `:focus-visible` applies the same treatment |
| `branch-atlas` crosshair label | all touch | Labels suppressed; tap opens the drawer directly. Invisible ≥44×44px `<rect>` hit target per crosshair | `Tab` through 18 nodes in geographic order; `Enter` opens the drawer |
| `contributors` cartouche hover | all touch | Tap opens the drawer directly (hover was never the affordance) | `Enter`/`Space`; drawer is `role="dialog" aria-modal="true"` with a focus trap |
| Nav `Destinations` mega-panel | all | **Click/tap at every breakpoint, never hover-open.** A hover-opened menu must separately satisfy WCAG 2.2 SC 1.4.13 (hoverable, dismissible, persistent); a click-opened one satisfies it for free | `Enter`/`Space` toggles; `Escape` closes and returns focus |
| Text-link underline swell | all touch | Underline renders at full weight from first paint on coarse pointers | `:focus-visible` ring |

Detection uses `@media (hover: hover) and (pointer: fine)` for hover-enhanced states, never a width query — a 1366px touch laptop and a 1024px tablet both need the touch treatment regardless of viewport width.

---

## 2. Conversion strategy

### 2.1 The funnel: three parallel paths, not one form

The CRO research is unambiguous that this is not a single-funnel page. **Parents may never fill a form; some students only use WhatsApp.** So three paths run in parallel from the first screen to the last, and the page never forces one.

**Primary action — `Book free counselling`.** The three-step form at `#enquiry`, plus every CTA that routes to it. Six fields, three of them non-PII taps, PII last. Outcome: a named counsellor calls within 15 minutes, 9 AM–9 PM IST.

**Secondary actions — the channel bypasses.** `Call 1800 111 119` (`tel:`) and `WhatsApp us` (`wa.me`). These are **equal first-class siblings to the form, not fallbacks** — canon states it in the section table and in build note 11. *Why:* WhatsApp enquiry response in India runs 60–70% versus 20–30% for web forms, ~98% open within three hours, median reply 45–90 seconds (CRO research). A form is the *slowest* of the three paths for a large share of this audience.

**Tertiary actions — the exploratory and evidence paths.** `Explore 15 destinations`, the reckoning chip interactions, `Book <named counsellor>`, `Walk in tomorrow, 11:00 AM`, Application Day booking, `see the full list →`, and every footnote. These convert intent into *reasons*, and per NN/g a CTA placed before any credibility evidence asks for commitment without a reason. This page supplies eleven sections of reasons before the form appears.

### 2.2 Every CTA on the page

| # | Location | Label (verbatim) | Action | Intent tier |
|---|---|---|---|---|
| 1 | `sticky-nav` (≥1024px) | `Book free counselling` | Anchor → `#enquiry` | **Primary** |
| 2 | `sticky-nav` | `1800 111 119` (as text, with a supporting icon — never a glyph alone) | `tel:1800111119` | Secondary |
| 3 | `sticky-nav` → Contents sheet (<1024px) | `Call 1800 111 119` · `WhatsApp us` | `tel:` · `wa.me` | Secondary |
| 4 | `hero` | `Book free counselling` + sub-label `30 min · free · no obligation` | Anchor → `#enquiry` | **Primary** |
| 5 | `hero` | `Explore 15 destinations` | Anchor → `#gazetteer` | Tertiary (exploratory) |
| 6 | `colophon-strip` | Six superscripts ¹–⁶ | Rail (≥1024px) / inline `<details>` | Tertiary (evidence) |
| 7 | `gazetteer` expanded row | `Talk to a counsellor about <country>` | Anchor → `#enquiry?dest=<code>`, chip pre-selected | **Primary** |
| 8 | `register` | `See the full list →` | Link → `/partner-universities/` | Tertiary |
| 9 | `what-we-do` | *(none)* | — | — |
| 10 | `still-page` | *(none — deliberate)* | — | — |
| 11 | `branch-atlas` drawer | `Call <branch>` | `tel:<branch number>` | Secondary |
| 12 | `branch-atlas` drawer | `Walk in tomorrow, 11:00 AM` | Anchor → `#enquiry?office=<slug>`, office pre-selected | **Primary** |
| 13 | `branch-atlas` drawer | `Directions` | `https://maps.google.com/?q=<address>` | Tertiary |
| 14 | `contributors` cartouche | `Book <first name>` | Anchor → `#enquiry?counsellor=<id>` | **Primary** |
| 15 | `contributors` drawer | `Call <first name>` · `WhatsApp <first name>` | `tel:` · `wa.me` | Secondary |
| 16 | `for-parents` | `Call 1800 111 119` (as a display element) | `tel:1800111119` | Secondary |
| 17 | `for-parents` | `Send this summary on WhatsApp` | `wa.me` with the parent summary pre-filled | Secondary |
| 18 | `for-parents` | `Print this page` | `window.print()`, with a `@media print` stylesheet | Tertiary |
| 19 | `for-parents` | `हिन्दी` toggle | Client state; loads `IBM_Plex_Sans_Devanagari` on demand | Tertiary |
| 20 | `reckoning` | `Get this ledger on WhatsApp` | `wa.me` pre-filled from the three chips | **Primary** (lead magnet v1) |
| 21 | `reckoning` | `Talk to a counsellor about funding` | Anchor → `#enquiry?topic=finance` | **Primary** |
| 22 | `eleven-months` | `Book a place at the <city> Application Day` | Anchor → `#enquiry?event=<city>-<date>` | **Primary** |
| 23 | `endpaper` | `Book free counselling` | Anchor → `#enquiry` | **Primary** |
| 24 | `questions` (below the eighth) | `Still unsure? Book a 30-minute call.` | Anchor → `#enquiry` | **Primary** |
| 25 | `enquiry` | `Book free counselling` (submit) | `POST /api/enquiry` | **Primary** |
| 26 | `enquiry` | `Call 1800 111 119` | `tel:1800111119` | Secondary (equal sibling) |
| 27 | `enquiry` | `WhatsApp us` | `wa.me` pre-filled from the chips already tapped | Secondary (equal sibling) |
| 28 | `colophon` | `+91 8282828215` · `+91 11 47141414` · `1800 111 119` | `tel:` ×3 | Secondary |
| 29 | `colophon` | 18 branch addresses, 15 destinations, socials, legal | Links | Tertiary |
| 30 | `mobile-bar` (<1024px) | `Call` · `WhatsApp` · `Book` | `tel:+918282828215` · `wa.me` · `#enquiry` | **Primary + Secondary** |

**Placement rule, applied without exception:** *one line of proof under every primary CTA.* The canonical proof line, verbatim:

> `A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST. No fee, no obligation.`

Set in IBM Plex Mono at `--fs-caption`. *Why:* NN/g — a CTA without adjacent credibility is a commitment without a reason. And speed-to-lead is a page-design constraint, not an ops detail: a 5-minute response yields ~21× the qualification rate of a 30-minute one (Oldroyd/InsideSales, 15k+ leads), and HBR's 1.25M-lead study puts 1 hour at 7× versus 2 hours and 60× versus 24 hours. **Publishing a real callback window is therefore a conversion mechanic, not a courtesy** — and it is only permitted because GO can actually honour it.

**`still-page` deliberately carries no CTA.** It is the one surface on the page that asks for nothing. A parent evaluating six accreditation claims should not be sold to mid-evaluation; the absence of an ask is itself the trust signal, and it costs one CTA slot out of thirty.

### 2.3 The three-step form, and why each decision is what it is

Canon build note 9 fixes the contract: **three steps, six fields, three of them non-PII taps, PII in step 3.**

| Step | Fields | Input type | Why |
|---|---|---|---|
| **1 — Destination** | Destination chips: UK, USA, Canada, Australia, NZ, Ireland, Germany, Other | Tap chips, `role="radiogroup"`, ≥48px | Zero-friction entry (one tap, no typing) **and** the counsellor-routing signal. Step-1 completion raises finish rates ~73% (CRO research), so the cheapest possible first step is the highest-leverage one. |
| **2 — Degree + intake** | Degree level (Bachelors / Masters / MBA / PhD / Diploma) × Intake (Sep 2027 / Jan 2028 / later) | Tap chips ×2 | Two taps. Escalating commitment with still zero PII disclosed. |
| **3 — Contact** | Name · Mobile · Email *(optional)* · Nearest office | `text` + `tel` + `email` + native `<select>` | PII last. Users are ~3.2× more likely to disclose sensitive data after clearing early steps (CRO research). |

**Why multi-step at all.** GO's current homepage asks 7+ fields on one screen — squarely inside the documented collapse zone: ~23.1% completion at 3 fields, 17.0% at 5, **11.4% at 7**, 6.9% at 10+, with a sharp cliff between 5 and 7 (Baymard). 2024–25 aggregate data puts multi-step at ~13.85% versus ~4.53% single-page; HubSpot reports 86% higher. Re-sequencing is the single highest-leverage change available on this page.

**Why a progress indicator on every step.** +28% (CRO research). Implemented as a hairline rule scaling `scaleX` to `0.333 / 0.667 / 1` (canon), plus a visually-hidden `aria-live="polite"` announcement of `Step N of 3`.

**Why optional fields are labelled *optional* and required fields are never asterisked.** Baymard 2024: labelling *optional* rather than asterisking *required* lifted conversion ~25%. Only `email` is optional, and its label reads `Email (optional)`.

**Why `+91` is a rendered adornment, not a field.** It removes a field from the count, removes a formatting failure mode, and lets `autoComplete="tel-national"` do its job. `type="tel" inputMode="numeric"` raises the numeric keypad on Android.

**Why a native `<select>` for the office list.** Native selects beat custom dropdowns on low-end Android — canon forbids a custom dropdown outright. The office is smart-defaulted from IP and remains freely editable.

**Why the proof line sits under submit, not above the form.** It answers the question that is actually being asked at the moment of submission: *what happens next?*

**Zero-JS behaviour.** All three fieldsets are server-rendered. With JavaScript disabled they render stacked as one long form and POST natively to `/api/enquiry`. The step machinery is an enhancement, never a gate.

**OTP.** Not on the form. Verification cuts raw completions 15–30% but drops cost-per-qualified-lead 40–60% (CRO research), so it belongs **after** the lead is banked: capture on submit, request OTP on the thank-you screen to unlock the ledger PDF. Verification becomes a value exchange, not a gate.

### 2.4 WhatsApp and call channel strategy

**Every `tel:` and `wa.me` on this page is a real `<a href>` that works with JavaScript disabled** — canon build note 11, applied on the mobile bar, in the nav, in every counsellor drawer, in every branch drawer, and beside the form.

**The numbers.** National `+91 8282828215` · Delhi South `+91 11 47141414` · Toll-free `1800 111 119`. The mobile bar uses `tel:+918282828215` (canon). Nav and form siblings use the toll-free number, because a toll-free number reads as an institution to a parent.

**WhatsApp deep links, pre-filled from the chip already tapped.**

```ts
// lib/links.ts
const WA_NUMBER = "918282828215" // E.164, no +, no spaces

export function waHref(ctx?: {
  destination?: string; degree?: string; intake?: string; counsellor?: string; ledger?: string
}) {
  const text = ctx?.ledger
    ? `Hi Global Opportunities — please send me the cost ledger for ${ctx.ledger}.`
    : ctx?.counsellor
    ? `Hi Global Opportunities — I'd like to speak to ${ctx.counsellor}.`
    : ctx?.destination
    ? `Hi Global Opportunities — I'm looking at ${ctx.destination}` +
      `${ctx.degree ? ` for a ${ctx.degree}` : ""}` +
      `${ctx.intake ? `, ${ctx.intake} intake` : ""}. Please call me.`
    : `Hi Global Opportunities — I'd like free counselling.`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}
```

**The default, JS-free `href` is server-rendered** with the generic message; client state upgrades it in place as chips are tapped. A visitor with JS disabled still gets a working, sensibly-worded WhatsApp link. *Why pre-fill at all:* it removes the "what do I even say" hesitation and it hands the counsellor a qualified opening, which is where the 45–90-second median reply time actually pays off.

**Rendering rule, canon build note 11:** *"Render WhatsApp as ink + outline, never in WhatsApp brand green — green on this page means verified, and the semantic must not leak."* `--verdigris` is the *verified/cleared* token. A green WhatsApp button would tell a parent that WhatsApp is an accreditation.

**`rel="noopener"` on every `wa.me` anchor.** No `target="_blank"` on mobile — the WhatsApp app handles the intent and a forced new tab strands the user in a browser tab behind the app.

### 2.5 Mobile sticky bar spec

| Property | Value |
|---|---|
| Breakpoint | `<1024px` only (canon) |
| Contents | Three real anchors: **Call · WhatsApp · Book** |
| Targets | ≥48px height each (canon), full-width thirds, `env(safe-area-inset-bottom)` padding above the Android gesture inset |
| Surface | `--paper` at 98%, top hairline `--rule-strong`. **No `backdrop-filter`** (canon build note 8) |
| Stacking | `z-index: var(--z-mobilebar)` (40) — above the rail (20) and the nav (30), below scrim (50), drawer (60), toast (70), skip link (80) |
| CLS | `<body>` carries `padding-bottom: calc(56px + env(safe-area-inset-bottom))` **from first paint**, so the bar's entrance shifts nothing |
| Entrance | `translateY(100%) → 0`, `--dur-4` (480ms), `--ease-quart`, at 25% scroll depth, **once**, never re-hides (`05-motion-blueprint.md` §2.17) |
| JS-free | Renders visible at `translateY(0)` under `@media (scripting: none)` and under reduced motion |
| Colour | WhatsApp anchor in ink + outline, never brand green |
| Labels | Text labels, **never icons alone** — an icon-only bar fails a 50-year-old parent and fails SC 1.1.1. Unchanged by the 2026-08-04 adoption of Lucide: a glyph may accompany each label, `aria-hidden`, and the label is what is removed last, meaning never |

*Why:* a sticky bottom bar in the thumb zone is worth a documented 5–12% mobile completion lift (CRO research), and it is the only persistent conversion surface on the breakpoint that carries 55%+ of traffic.

### 2.6 Trust-signal placement rationale

The order below is NN/g's credibility model applied to this page, and it is the order the sections already run in — which is the point.

| Order | Signal | Where | Why here |
|---|---|---|---|
| 1 | **Verified specifics in the deck** — since 2001, 700+ partner universities, 15 countries, 18 offices, a counsellor you'll know by name | `hero`, above the fold | Specific integers beat adjectives. This is the evidence that licenses the hero CTA to exist at all. |
| 2 | **Footnoted proof line** — six canonical stats as running text with superscripts | `colophon-strip`, immediately below the fold | Evidence *before* the second ask. The superscripts announce auditability in the first 140vh. |
| 3 | **Recognisable institutional names** | `register` | For a parent, a recognisable university name outweighs any testimonial. GO's 700+ partner list is its strongest single asset and no competitor typesets it as a readable list. |
| 4 | **Six accreditations, explained, on the stillest surface** | `still-page` | AIRC's actual standard quoted verbatim (five years first round, ten thereafter). A logo strip asserts; an explanation with a re-review cadence proves. |
| 5 | **Eighteen doors, addressed and walk-in-able** | `branch-atlas` | Physical presence is the single strongest anti-fraud signal for a parent. Not "20+ offices" — eighteen, each with a street address and a phone number we can name. |
| 6 | **Named, credentialed counsellors** | `contributors` | IDP and Leverage Edu show **zero** named counsellors above the fold (CRO research) — an open flank. GO already has named counsellors inside its own testimonials. |
| 7 | **A chapter written only for the parent** | `for-parents` | Transparency and no-hidden-fees is the most-cited parent criterion. No competitor addresses the person who pays. |
| 8 | **Published money, including what GO charges (₹0) and who pays** | `reckoning` | The decisive parent artifact. HSBC India: overseas education can consume up to 64% of retirement savings and only ~53% of affluent Indian parents have an education savings plan. No competitor surfaces a cost instrument. |
| 9 | **Two-sided validation** — named students *and* partner institutions vouching back | `endpaper` | Partner-side praise (Auckland, RMIT, National College of Ireland, St. George's, WITT) is rare and extremely persuasive. |
| 10 | **Sources & Last-Verified table** | `colophon` | Makes auditability structural rather than rhetorical. A competitor can copy the layout; they cannot copy the operational obligation. |

**Two absences are themselves trust signals.** No visa-success or admit-rate percentage appears anywhere on this page — every rival shouts one, and independent guidance tells parents that exact claim is a red flag. And **no `AggregateRating` or `Review` structured data is ever emitted** (§4.7): Google's policy makes entities that control their own reviews ineligible for stars, so emitting it would be both futile and a self-served rating.

### 2.7 Honest-urgency mechanics

The FTC's 2022 dark-patterns report names false urgency (resetting countdowns) and false scarcity as §5 deceptive. Canon build note 12 encodes this as a hard rule. Three permitted mechanics, all live on this page:

1. **Cited third-party deadlines** — `eleven-months`, sienna ticks. UCAS equal-consideration, German winter semester 15 July, Australian February intake closing Oct–Dec prior, US Spring closing Sep–Nov prior. **Every date carries a named, linked source and a `last verified` stamp**, resolved through the Sources & Methods registry.
2. **GO's own Application Days** — `eleven-months`, ochre ticks. Real dated city events: Pune, Mumbai, Delhi, Amritsar, Ludhiana, Chandigarh, Hyderabad, Chennai. Genuine, dated, verifiable, and bookable (CTA #22).
3. **A published callback window** — `A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST.` Real availability beats manufactured scarcity: *"Next available: Tue 4:30 PM, Delhi"* outperforms *"only 3 slots left"* and is not deceptive.

**Banned outright, at review:** resetting countdowns, seat counts, viewer counts, "only N slots left", any visa or admission guarantee, any star rating, any scholarship rupee total.

**The mono law makes this enforceable.** IBM Plex Mono is reserved for verified fact — every number, date, cost, deadline, coordinate, station label and citation. If a date is set in mono it must resolve to a source and a last-verified date in the registry. **A 404ing footnote does more damage than no footnote**, so the registry must be data-driven (JSON or CMS) with an owner and a last-verified date per entry.

**Exit-intent.** Not in v1. Desktop exit-intent averages 2.8–3.9% (top decile ~19.6%), but the offer must *differ* from the main CTA — and v1's differentiated offer (the cost ledger) is already on the page as a section. Revisit in v2 with the eligibility check as the exit offer, mobile-gated to 60–70% scroll depth or ~6s dwell rather than a mouse-out event.

### 2.8 Lead-magnet roadmap

Static PDFs convert 3–5%; quizzes and calculators convert 30–40%+, with interactive assets running ~2.4× static and ~85% completion versus ~12% for whitepapers (CRO research). Both magnets below are therefore **interactive, on-page, and result-first**.

**v1 — The Cost Ledger (`reckoning`), shipping now.**
Three taps (destination × degree × city tier) produce a typeset rupee ledger: tuition, living, visa, IHS, forex, GIC, insurance, flights; *less* scholarships and bursaries with a typical range and four named funders linked; a loan EMI line; a total as a **range**; a footnote on every figure; and the closing line, verbatim: *What Global Opportunities charges you: ₹0. Here is who pays us, and how.*
**Value-first, gate-second:** the full result renders on screen with no email required. The gate is `Get this ledger on WhatsApp` (CTA #20) — the *delivery* is gated, the *answer* is not. This is the parent artifact no competitor surfaces, and it is the highest-value asset on the page.

**v2 — The Eligibility / Profile Check.**
Six taps (marks/GPA band, test status, degree level, budget band, destination preference, intake) → *"You're a strong fit for X, Y, Z."* Highest intent correlation of the four candidates. Result on screen first; full report on WhatsApp. Feeds the same `/api/enquiry` endpoint with a `source: "eligibility"` flag so routing and reporting stay unified.

**v3 candidates, ranked and deferred:** Scholarship Finder (every result linked to the funder's own page) and University Matcher (700+ partners made queryable). Both are content-operations projects before they are front-end projects.

### 2.9 Consent and compliance, built on day one

Canon build note 10. DPDP Rules were notified Nov 2025 and are enforceable May 2027; TCCCPR governs promotional contact today.

- **One unticked marketing-consent checkbox, separate from the implied consent to be called about this enquiry.** Itemised, plain-language, purpose-specific, with the retention period stated.
- **Log consent timestamp, IP and form version** on every submission.
- **No promotional contact 9 PM–9 AM IST** (TCCCPR). The published callback window (9 AM–9 PM IST) is written to match, so the promise and the compliance rule are the same sentence.
- Never pre-tick, never bundle, never infer marketing consent from an enquiry.

---

## 3. Accessibility strategy

**Standard: WCAG 2.2 Level AA** (canon build note 16). Everything below is a build requirement, not a recommendation.

### 3.1 Landmark map

```
<body>
  <a class="skip-link" href="#main">Skip to content</a>        z-index: var(--z-skiplink) (80)
  <header role="banner">                                        #sticky-nav
    <nav aria-label="Primary">…</nav>
  </header>
  <main id="main" tabindex="-1">
    <section id="hero"            aria-labelledby="h-hero">
    <section id="colophon-strip"  aria-labelledby="h-record">
    <section id="gazetteer"       aria-labelledby="h-gazetteer">
    <section id="register"        aria-labelledby="h-register">
    <section id="what-we-do"      aria-labelledby="h-services">
    <section id="still-page"      aria-labelledby="h-trust">
    <section id="branch-atlas"    aria-labelledby="h-offices">
    <section id="contributors"    aria-labelledby="h-counsellors">
    <section id="for-parents"     aria-labelledby="h-parents">
    <section id="reckoning"       aria-labelledby="h-costs">
    <section id="eleven-months"   aria-labelledby="h-timeline">
    <section id="endpaper"        aria-labelledby="h-outcomes">
    <section id="questions"       aria-labelledby="h-faq">
    <section id="enquiry"         aria-labelledby="h-book">
    <aside role="complementary" aria-label="Sources and footnotes">   marginalia rail, >=1024px
  </main>
  <footer role="contentinfo">                                   #colophon
  <nav aria-label="Quick contact" data-mobile-bar>              <1024px only
</body>
```

Rules: exactly one `<main>`, one `role="banner"`, one `role="contentinfo"`. Every `<section>` is labelled by its heading id — an unlabelled `<section>` is not a landmark and adds nothing. The mobile bar is a `<nav>` with an explicit `aria-label` because it is a second navigation region. The chapter numerals (I–VI), the chapter spine, the registration-offset pseudo-elements, the grain layer, the hairline rules and the cartographic furniture are all `aria-hidden="true"` — decorative SVG must never enter the accessibility tree.

### 3.2 Full heading outline (h1–h3)

One `h1`. No skipped levels. **CTAs are buttons, never headings** (CRO research). FAQ questions are `<summary>` elements, not headings.

```
h1  Step out without doubt.                                              #hero
h2  The record, in numbers                          (visually hidden)    #colophon-strip
h2  Fifteen places, indexed.                                             #gazetteer
    h3  Study in the United Kingdom                                      (×15, one per destination)
    h3  Study in the United States
    h3  Study in Canada
    h3  Study in Australia            … + New Zealand, Ireland, Germany, Europe, Dubai,
                                        Switzerland, Singapore, Malaysia, Italy, France, Spain
h2  700+ partner universities, named                                     #register
h2  Fifteen things we do — and what each one costs                       #what-we-do
h2  Nothing here casts a shadow.                                         #still-page
    h3  AIRC
    h3  ICEF
    h3  AAERI
    h3  British Council
    h3  Education New Zealand
    h3  PTE Pearson
h2  Eighteen doors you can walk through                                  #branch-atlas
    h3  <City> — <street address>                   (×18, inside each drawer)
h2  The counsellors, named                                               #contributors
    h3  Avinash — Delhi South — UK & Ireland        (×N, one per counsellor)
h2  For parents: money, safety, recognition, accreditation               #for-parents
    h3  What it costs, and how families pay for it
    h3  Is my child safe there?
    h3  Will the degree be recognised in India?
    h3  Who are you accredited by?
    h3  Who calls you, and when
    h3  What we are paid, and by whom
    h3  What happens if the visa is refused
h2  What it costs, in rupees, with the ranges shown.                     #reckoning
    h3  Scholarships and bursaries
    h3  Education loan, monthly
h2  Your next eleven months.                                             #eleven-months
    h3  Application Days 2026–27
    h3  Specimen documents
h2  Forty thousand people have already done this.                        #endpaper
    h3  Students, named
    h3  What our partner universities say
h2  Questions people actually ask                                        #questions
        (eight <details><summary> — questions are summaries, not headings)
h2  Book your free counselling call                                      #enquiry
    h3  Step 1 — Where do you want to study?
    h3  Step 2 — Degree level and intake
    h3  Step 3  — Your name and mobile
h2  Colophon                                        (visually hidden)    #colophon
    h3  Sources and last-verified dates
    h3  Eighteen offices
    h3  Fifteen destinations
```

**Why the chapter headlines are not the only h2s.** Canon locks six chapter headlines, but a chapter contains several sections and each needs its own addressable heading. The six locked headlines appear verbatim as the h2 of their *lead* section (`gazetteer`, `still-page`, `reckoning`, `eleven-months`, `endpaper`, and the H1 for Dream); the remaining sections take descriptive h2s written to searcher questions — destinations, universities, services, offices, counsellors, parents, costs, process, outcomes, FAQ, booking. This satisfies both the canon and the SEO requirement that H2s map to searcher intent.

### 3.3 Focus management

**Ring spec (canon, verbatim):**

```css
:focus { outline: none; }
:focus-visible {
  outline: 2px solid var(--sienna-press);
  outline-offset: 2px;
  border-radius: inherit;
}
[data-chapter="success"] :focus-visible { outline-color: var(--ochre-on-dark); }
@media (prefers-contrast: more) { :focus-visible { outline-width: 3px; } }
```

`:focus-visible` only, never bare `:focus`. `--sienna-press` (`#B24A22`) against `--paper` (`#FBF8F2`) and `--ochre-on-dark` (`#E8B75C`) against `--endpaper` (`#0E2029`) both clear the 3:1 non-text contrast minimum for focus indicators (SC 1.4.11). The ring is never clipped: no ancestor of a focusable element may carry `overflow: hidden` without `outline-offset` headroom — this is a real hazard on the SplitText line masks, so **no focusable element may live inside a split headline**.

**Skip link.** `Skip to content` → `#main`, first element in the DOM, `z-index: var(--z-skiplink)` (80), visually hidden until `:focus-visible`, then rendered as a `--sienna-press` pill at the top-left with a ≥44px target. `<main id="main" tabindex="-1">` so the focus actually lands.

**Drawer and modal traps.** Three surfaces trap focus: the counsellor drawer, the branch drawer and the Destinations mega-panel.

- `role="dialog" aria-modal="true"` with `aria-labelledby` pointing at the drawer's own heading.
- Focus moves to the drawer's first focusable element on open, and **returns to the invoking element** on close.
- `Escape` closes. Backdrop click closes. On the mobile bottom sheet, swipe-down closes.
- Focus is trapped between the first and last focusable descendants while open; background content gets `inert` (with a `aria-hidden` + `tabindex="-1"` polyfill path where `inert` is unsupported).
- The drawer's content is **also server-rendered inside a `<details>` fallback**, so `tel:` and `wa.me` for every counsellor and every branch are reachable with JavaScript disabled.

**Keyboard reachability, canon build note 16:** *"All 15 destinations and all 18 branches reachable by keyboard."* The gazetteer rows are `<summary>` elements or buttons in DOM order. The 18 branch crosshairs are `<button>` elements inside the SVG's DOM order (authored north→south, which is also the stamp order), each with an accessible name of the form `Delhi South office — HS-27, 2nd Floor, Kailash Colony Market`.

**Focus order never depends on motion.** In the pinned `eleven-months` chapter, tabbing to an off-screen month must not fight the pin: each month block sets `scroll-margin` and the pin's `scrub` follows because focus scrolls the container. Under reduced motion the section is a static vertical list and the problem does not exist.

### 3.4 Target sizes

**WCAG 2.2 SC 2.5.8 (Target Size, Minimum) is Level AA and requires 24×24 CSS px.** Canon sets a stricter floor: **every interactive target ≥44×44px; mobile bar targets ≥48px.**

| Target | Size | Notes |
|---|---|---|
| Mobile bar anchors | ≥48px height, full-width thirds | Plus `env(safe-area-inset-bottom)` |
| Form chips | ≥48px height, ≥88px width | 2-up at <768px, 4-up at ≥1024px |
| `<summary>` rows (FAQ, gazetteer accordion, footnote `<details>`) | ≥48px height | Full row width is the target, not just the text |
| Branch crosshairs | 8px visual, **≥44×44px invisible `<rect>` hit target** | Adjacent crosshairs (Delhi South / Delhi West, four Mumbai branches) are offset so hit targets do not overlap |
| Footnote superscripts (≥1024px) | ≥24×24px with spacing exception | Inline within body text; SC 2.5.8's inline exception applies, but the tap target is padded to 24px regardless |
| CTA pills | ≥48px height, `--r-pill` | The only radius on the page above 4px |
| Nav items | ≥44px height | `Contents` disclosure ≥48px below 1024px |
| Drawer close | ≥44×44px | Plus `Escape` and backdrop |

Adjacent targets carry ≥8px of spacing so a mis-tap costs nothing.

### 3.5 Contrast policy

The authoritative per-token contrast table lives in **`04-design-system.md`**. This section states the *policy* that table enforces.

- **Normal text ≥4.5:1; large text (≥24px, or ≥18.66px bold) ≥3:1; non-text UI and focus indicators ≥3:1.**
- **`--ink-faint` (`#8A7F72`, 3.4:1 on `--paper`) is permitted only at ≥24px or ≥18.66px bold, or as non-text.** It carries marginalia and footnote refs and never body copy. Canon states this as a hard rule; `04-design-system.md` tabulates it.
- **`--ochre` (`#D9A441`, 2.1:1 on `--paper`) is never text on paper.** It is annotation highlight and GO Application Day ticks only. On the dark chapter, `--ochre-on-dark` (`#E8B75C`, 9.4:1) is text-safe.
- **Colour is never the only carrier of meaning.** `FREE`/`PAID` in `what-we-do` carry their word, not just their colour. Ochre versus sienna ticks in `eleven-months` differ in shape and carry a text label. `--verdigris` status marks in the Departure Card carry a glyph and an `aria-label`. `--clay` validation errors carry text announced via `aria-live`.
- **`prefers-contrast: more`** thickens the focus ring to 3px and promotes `--rule` to `--rule-strong` throughout; type colours already exceed AA and do not change.
- **Dark chapter tokens are all verified**: `--plate-white` ~15:1, `--plate-grey` 6.4:1, `--sienna-on-dark` 7.0:1, `--ochre-on-dark` 9.4:1, `--verdigris-on-dark` 7.3:1 on `--endpaper`.

### 3.6 Motion accessibility contract

Full technical contract in **`05-motion-blueprint.md` §8.5**. The accessibility commitments it delivers:

1. **`prefers-reduced-motion: reduce` is honoured in three coordinated layers** — `gsap.matchMedia()`, `<MotionConfig reducedMotion="user">`, and a CSS backstop that also sets `scroll-behavior: auto`.
2. **Every reduced branch lands on the final, fully visible state. Reduced motion never hides content.** The Departure Card renders complete and cleared on first paint; every counter shows its true final value; every SVG renders fully drawn.
3. **Lenis is not initialised at all under reduced motion.** Native scrolling, no hijacking, no scroll-position surprises for a user relying on keyboard paging or a screen reader's reading cursor.
4. **Anime.js is never downloaded under reduced motion** — every entry point checks the media query before its dynamic `import()`.
5. **Zero infinite animation anywhere on the page** satisfies SC 2.2.2 (Pause, Stop, Hide) structurally: there is nothing that moves for more than five seconds, so there is nothing to pause.
6. **No parallax anywhere**, which removes the most common vestibular trigger on long-form landing pages.
7. **SplitText's automatic `aria-label`/`aria-hidden` must not be overridden** (canon build note 16). Anime's `text.splitText` runs with `accessible: true` for the same reason. A split headline reads as one string to a screen reader.
8. **No content is gated behind an animation.** Every reveal's resting state is its final state; `[data-reveal] { opacity: 1 }` under `@media (scripting: none)`.

### 3.7 Form accessibility

- **Every field has a real, persistent `<label>`.** No placeholder-as-label anywhere. Placeholders, where used at all, show format examples only.
- **`autocomplete` tokens on every PII field** — SC 1.3.5 (Identify Input Purpose) and a direct conversion lever on Android:

  ```html
  <label for="given-name">First name</label>
  <input id="given-name" name="given-name" type="text" autocomplete="given-name" required>

  <label for="family-name">Last name</label>
  <input id="family-name" name="family-name" type="text" autocomplete="family-name" required>

  <label for="mobile">Mobile number</label>
  <span aria-hidden="true" data-adornment>+91</span>
  <input id="mobile" name="mobile" type="tel" inputmode="numeric"
         autocomplete="tel-national" maxlength="10"
         aria-describedby="mobile-hint mobile-err" required>
  <p id="mobile-hint">10 digits. We will call you on this number.</p>

  <label for="email">Email <span data-optional>(optional)</span></label>
  <input id="email" name="email" type="email" autocomplete="email">

  <label for="office">Nearest office</label>
  <select id="office" name="office" autocomplete="address-level2">…18 branches…</select>
  ```

- **Optional fields are labelled *optional*; required fields are never asterisked** (canon build note 9, and Baymard's ~25% lift). `required` is still set for validation and for the accessibility tree.
- **Errors are announced, not just coloured.**

  ```html
  <div aria-live="assertive" aria-atomic="true" id="mobile-err" data-error>
    Enter a 10-digit mobile number so a counsellor can call you.
  </div>
  ```

  The field gets `aria-invalid="true"`, its border goes `--clay`, and focus moves to the first invalid field on submit. Error text explains *what to do*, never just *what is wrong*. **No shake, no wobble** — an atlas does not scold (`05-motion-blueprint.md` §2.15).
- **Step changes are announced.** A visually-hidden `aria-live="polite"` region reads `Step 2 of 3 — Degree level and intake`. Focus moves to the new step's `<legend>` on advance.
- **Each step is a `<fieldset>` with a `<legend>`.** Destination and degree chips are `role="radiogroup"` with arrow-key navigation and roving `tabindex`.
- **Consent checkboxes are individually labelled** and never bundled: one for the enquiry callback (implied, explained) and one unticked for marketing (explicit, separate, itemised, with retention stated).
- **The submit button is a `<button type="submit">`**, never a styled `<div>`, and it is never disabled pending validation — a disabled submit is unannounced and untabbable.

### 3.8 Hero screen-reader narration script

This is what a screen reader user hears from the top of the page, in DOM order, on the built hero. It is included so the team can verify the *experience*, not just the markup — and because the Departure Card is a visual metaphor that must survive being read aloud.

> **"Skip to content, link."**
> **"Banner. Primary navigation. Global Opportunities, link. Volume 25. Destinations, button, collapsed. Costs, link. Process, link. Counsellors, link. Offices, link. For Parents, link. Call 1 8 0 0 1 1 1 1 1 9, link. Book free counselling, link."**
> **"Main."**
> **"Study abroad guidance for Indian families. Since 2001."**
> **"Heading level 1. Step out without doubt."**
> **"Study abroad guidance for Indian families. One office in Amritsar in 2001; today 700 plus partner universities across 15 countries, 18 offices you can walk into, and a counsellor you'll know by name."**
> **"Book free counselling, link. 30 minutes, free, no obligation."**
> **"Explore 15 destinations, link."**
> **"A GO counsellor calls you within 15 minutes, 9 AM to 9 PM I S T. No fee, no obligation."**
> **"Accredited by A I R C, I C E F, A A E R I, British Council, Education New Zealand, P T E Pearson."**
> **"Heading level 2. Your departure card. A checklist of six steps, showing what is already cleared for a September 2027 intake."**
> **"List with 6 items."**
> **"Course shortlist. Cleared."**
> **"Finance plan. Cleared."**
> **"English test. Cleared."**
> **"Documents. Cleared."**
> **"Visa file. Cleared."**
> **"Your counsellor. Assigned."**
> **"Status: Go. September 2027 intake."**
> **"Figure. Plate 1. 28.5562 degrees north, 77.1000 degrees east. Indira Gandhi International, Terminal 3. 04:40 India Standard Time."**

**What this script commits the build to.**

- The Departure Card gets a **visually-hidden `h2`** that explains the metaphor in one sentence, because "Departure Card" alone means nothing to someone who cannot see the typeset form.
- The card is a `<ul>` of six `<li>`s. Each station's status mark is **not** a bare glyph — it carries `<span class="sr-only">Cleared</span>` (or `Assigned`), so the six `--verdigris` marks are read as words. Colour is never the only carrier (§3.5).
- Phone numbers are marked up so they are read digit-by-digit, not as a single large integer.
- `IST`, `AIRC`, `ICEF`, `AAERI` and `PTE` are given `aria-label` expansions or `<abbr title>` where the initialism would otherwise be read as a word.
- The eyebrow is a `<p>`, not a heading — it precedes the `h1` and must not create a phantom level.
- **Plate A is a `<figure>` with a real `<figcaption>`.** The coordinates, place and time are the caption; the plate has no `<img>` and needs no `alt`. The SVG graticule inside it is `aria-hidden="true"`.
- SplitText's generated line wrappers are `aria-hidden` and the H1 carries the automatic `aria-label` — **do not override it**. The heading reads as one sentence, not three fragments.

---

## 4. Performance + SEO

### 4.1 Budgets, enforced in CI

Canon build note 1, plus the CRO research's Core Web Vitals thresholds. **Target device: a ₹15,000 Android on 3–6 Mbps tier-2 4G.**

| Budget | Limit | Enforcement |
|---|---|---|
| **LCP** | **≤2.5s** at p75 on 4G mid-Android | Lighthouse CI + CrUX 28-day, mobile segment |
| **INP** | **<200ms** at p75 | CrUX; the most-failed CWV (~43% of sites) and the one a React landing page most risks |
| **CLS** | **<0.05** (stricter than canon's 0.1 and than the 0.1 CWV threshold) | Lighthouse CI; a page with zero photography and locked aspect ratios has no excuse for 0.1 |
| **JS** | **<150 KB gzipped**, initial | `@next/bundle-analyzer` in CI, hard fail. **The budget did not move when Lucide was adopted on 2026-08-04** — each glyph is a named import and tree-shakes individually, so the set costs what the glyphs actually used cost. A barrel or namespace import (`import * as Icons from "lucide-react"`) would pull the whole library and is banned. The analyser check is the enforcement; the per-glyph cost is not asserted here and should be **measured** at M2 rather than estimated. **The bytes are not the problem — see the callout below.** |
| **Fonts** | **≤82 KB woff2 total; preloaded faces ≤46 KB** | Byte check on the `next/font` output |
| **CSS** | **<60 KB gzipped** | CI |
| **HTML** | **<50 KB** | CI |
| **Bespoke SVG** | **≤40 KB gzipped** (15 coastlines + India-with-18-nodes) | CI |
| **Total initial payload** | **<540 KB** | CI |

> **[KNOWN ISSUE — Lucide drags a client runtime across the server boundary]** Verified against the installed package, not estimated, and it changes the shape of the M2 measurement rather than waiting for it. **`lucide-react@1.28.0` ships a `"use client"` directive on its base `Icon` module.** Three modules in `dist/esm` carry the directive — `Icon.mjs`, `context.mjs` and `DynamicIcon.mjs`, six files counting their sourcemaps — and every named glyph is built by `createLucideIcon`, which renders that `Icon` and calls `useLucideContext()` inside it. The consequence is not about weight: **any Server Component that renders a single glyph now pulls the Lucide runtime client-side and hydrates its SVGs.** Two sections that previously shipped **zero client JavaScript** are affected — `colophon.tsx` and `still-page.tsx`. Neither declares `"use client"` itself; the boundary arrives through the icon. `still-page` is the page's declared anti-moment and `colophon` is static reference matter, so a hydration pass in either is a regression against what those sections were designed to be, well before it is a byte in the 150 KB budget.
>
> **The candidate fix, which has *not* been applied.** Each icon module also exports its raw path data alongside the component — `export { __iconNode, Phone as default }` — and `__iconNode` is plain serialisable arrays with no React in it. A **server-safe inline-SVG renderer inside `components/ui/icon.tsx`** could read `__iconNode` and emit the `<svg>` itself, keeping `<Icon>` a Server Component and returning both sections to zero JS. That is the candidate, not the state of the code. Until it lands, treat *"placing a glyph makes an otherwise static section hydrate"* as a real cost when siting icons, and record the per-glyph number at M2 as planned.

> **[GAP RESOLVED — CLS]** Canon build note 1 sets CLS ≤0.1 (matching the CWV threshold). This document tightens the *internal* target to **<0.05**, because every structural CLS source has been designed out: no photography, locked `aspect-ratio` on every plate, `min-height` on the form step frame, `padding-bottom` reserved for the mobile bar from first paint, tabular width-locked counters, and `overflow`-masked SplitText reveals. 0.1 remains the CI failure threshold; 0.05 is the review threshold.

### 4.2 Fonts — subsetting and preload

```ts
import { Newsreader, Hanken_Grotesk, IBM_Plex_Mono, IBM_Plex_Sans_Devanagari } from 'next/font/google'

const display = Newsreader({ subsets:['latin'], style:['normal','italic'], axes:['opsz'],
  weight:'variable', display:'swap', variable:'--font-display', preload:true })
const ui = Hanken_Grotesk({ subsets:['latin'], weight:'variable',
  display:'swap', variable:'--font-ui', preload:true })
const mono = IBM_Plex_Mono({ subsets:['latin'], weight:['400','500'],
  display:'swap', variable:'--font-mono', preload:false })
// Loaded ONLY when the For-Parents Hindi toggle is activated:
const deva = IBM_Plex_Sans_Devanagari({ subsets:['devanagari'], weight:['400','600'],
  display:'swap', variable:'--font-deva', preload:false })
```

- **Preloaded: Newsreader (variable, roman + italic, `opsz` axis) and Hanken Grotesk (variable).** These two render the LCP element (the H1) and all UI chrome. Budget ≤46 KB.
- **Not preloaded: IBM Plex Mono.** It first appears in the Departure Card values and the proof line, both below the H1 in paint order. Its swap is invisible because **every mono cell is width-locked in `ch` with `tabular-nums`** — a font swap in a tabular cell shifts nothing.
- **Not preloaded, loaded on demand: IBM Plex Sans Devanagari.** Fetched only when the `for-parents` Hindi toggle is activated. A visitor who never toggles pays zero bytes.
- **Remedy if the 82 KB budget breaks in build** (canon, verbatim): a `unicode-range` subset of IBM Plex Mono covering `0-9 A-Z . , : · – — / % + ° ₹ £ $ €` (~9 KB). **Do not drop Newsreader italic** — the italic deck is a brand signature.
- `display: swap` on all four. `document.fonts.ready.then(() => ScrollTrigger.refresh())` in the motion provider re-measures once the real metrics land (`05-motion-blueprint.md` §3.1).

### 4.3 The no-photography payload, quantified

This is the performance case for the v1 art direction, and it is large enough to be the deciding argument.

| Asset class | v1 (Plate System) | A conventional photographic v1 |
|---|---|---|
| Hero image | **0 KB** — Plate A is a CSS gradient + inline SVG graticule + type | 80–120 KB AVIF, `priority`, never lazy-loaded |
| Destination imagery ×15 | **≤30 KB gz total** — Plate D coastline SVGs | 15 × 60 KB = ~900 KB (lazy-loaded, but still fetched on scroll) |
| India branch map | **≤10 KB gz** — one SVG, 18 nodes | ~120 KB raster or a map-tile dependency |
| Counsellor portraits ×N | **0 KB** — Plate C is an initials monogram in Newsreader | N × ~40 KB |
| Student portraits ×3 | **0 KB** — Plate C | 3 × ~40 KB |
| Specimen documents ×3 | **0 KB** — Plate B is HTML/SVG facsimile | 3 × ~70 KB, **plus DPDP consent exposure** |
| Paper grain | **~8 KB AVIF**, one tile, `background-repeat` | same |
| Logo + favicon + OG card | **~14 KB** (OG card generated at build via `next/og`) | same |
| **Total image payload** | **≈ 52 KB** | **≈ 1.4 MB** |

**≈ 52 KB of imagery for the entire page.** That is roughly 3.5% of a photographic build, it is well inside the ≤40 KB bespoke-SVG budget plus the 8 KB grain tile, and it is why the <540 KB total-initial-payload budget is comfortable rather than heroic. It also removes the "never lazy-load the LCP hero (+200–500ms)" hazard entirely: **the LCP element is the H1 text, and there is no hero image to get wrong.**

Every plate is a `<figure data-plate="field|specimen|cartouche|cartographic">` with a locked `aspect-ratio` and a real typeset caption. In v2, a commissioned photograph drops into the identical box behind the identical caption with **zero layout shift and zero CSS change beyond the `data-plate` attribute**.

### 4.4 Code-splitting map

Next.js App Router, RSC by default. Copy, data and structure stay in Server Components; only the animating or stateful shell becomes a `"use client"` leaf.

| Section | Server / Client | Splitting decision |
|---|---|---|
| `sticky-nav` | Client leaf (nav state + mega-panel) | In initial bundle. Small. |
| `hero` | Server, with a client `HeroMotion` leaf | **In initial bundle.** LCP-critical; nothing above the fold is ever lazy-loaded. |
| `colophon-strip` | Server + `m.*` reveal wrapper | Initial bundle (it is ~100vh down). |
| `gazetteer` | Server rows + client interaction shell | Initial bundle. `letterpress` module dynamic-imported on first row expand. |
| `register` | Server | `next/dynamic({ ssr: false })` from a client parent; odometer module IO-gated. |
| `what-we-do` | Server + reveal wrapper | Initial bundle. Cheap. |
| `still-page` | **Pure Server Component. Zero client JS.** | Uses only the shared reveal observer. |
| `branch-atlas` | Server SVG + client drawer | `next/dynamic({ ssr: false })`; `atlas-draw` module IO-gated. |
| `contributors` | Server cards + client drawer | `next/dynamic({ ssr: false })`. |
| `for-parents` | Server | `next/dynamic({ ssr: false })`; clock + Devanagari font on demand. |
| `reckoning` | Server default ledger + client chips | `next/dynamic({ ssr: false })`; Anime modules on first chip interaction. |
| `eleven-months` | Server content + client GSAP shell | `next/dynamic({ ssr: false })`. The GSAP pin code is the heaviest client leaf on the page and it is ≥1024px-only. |
| `endpaper` | Server + client inversion shell | `next/dynamic({ ssr: false })`. |
| `questions` | **Pure Server Component. Zero client JS.** | Native `<details>`. Candidate for `content-visibility: auto` *only* if the return-band trigger element is hoisted into `endpaper`'s DOM. |
| `enquiry` | Client (form state) | `next/dynamic({ ssr: false })` is **not** used — the form must be server-rendered so it works with JS disabled. Client-hydrated in place. |
| `colophon` | Server + tiny client rule-draw | Initial bundle. |
| `mobile-bar` | Client | Initial bundle. Must exist before 25% scroll depth. |

**Three hard rules.**

1. **`next/dynamic({ ssr: false })` only works inside a Client Component in Next 16** — it errors in a Server Component. Every dynamic import above is called from a thin `"use client"` section-loader.
2. **Never combine `content-visibility: auto` with a ScrollTrigger section** (canon build note 15; GSAP documents that it breaks measurement). Permitted on `questions` and `colophon` only, with `contain-intrinsic-size` set, and never above the fold.
3. **Never lazy-load anything above the fold** (canon build note 2).

**INP protection.** Hydration weight is the primary INP threat on a React landing page. `LazyMotion` + `m` keeps Motion at 4.6 KB shell + 15 KB features instead of 34 KB. Anime.js is never in the initial bundle. Below-fold chapters hydrate on demand. `ScrollTrigger.normalizeScroll(true)` is **not** enabled — it mitigates Android address-bar thrash but takes scrolling onto the JS thread, which is the wrong trade on the target device.

### 4.5 CLS-safe reveal rules

1. **Never animate from `height: 0`. Never toggle `display`.** Both are banned outright (`05-motion-blueprint.md` §8.3).
2. **Every plate carries a locked `aspect-ratio`** so its box exists before anything paints into it.
3. **Reveals are `opacity` + `translateY` only** — a translated element occupies its final box throughout.
4. **SplitText `mask: "lines"`** wraps each line in an `overflow: hidden` div and translates the inner line; the outer box never changes size. `autoSplit: true` re-splits on font load, so the swap from fallback to Newsreader does not strand a half-animated headline.
5. **Every counter is `tabular-nums lining-nums slashed-zero` with a `ch`-locked `min-width`.** A digit change cannot alter cell width.
6. **The form step frame has a `min-height` equal to the tallest step.**
7. **`<body>` reserves the mobile bar's height from first paint.**
8. **Initial hidden states are set in CSS, not by JS**, with `@media (scripting: none)` and `prefers-reduced-motion` overrides forcing `opacity: 1` — so there is no flash of hidden content and no flash of unstyled reveal.
9. **Never render different markup server versus client based on a motion flag.** Render the final layout; let GSAP `set()` the initial state inside `useGSAP`. `suppressHydrationWarning` on `<body>` covers ScrollTrigger's inline style writes during pin setup.

### 4.6 Measurement plan

| Stage | Tool | Gate |
|---|---|---|
| Pre-commit | ESLint + `tsc --noEmit` | Blocking |
| CI, every PR | Lighthouse CI, mobile preset, 4G throttle | LCP ≤2.5s, INP proxy (TBT) ≤200ms, CLS ≤0.1 — blocking |
| CI, every PR | `@next/bundle-analyzer` byte assertions | JS <150 KB gz, CSS <60 KB gz, fonts ≤82 KB, SVG ≤40 KB gz — blocking |
| CI, every PR | Motion budget assertion (`05-motion-blueprint.md` §8.1) | ≤14 ScrollTriggers, ≤1 pin, ≤3 `will-change` elements — blocking |
| CI, every PR | `axe-core` on the built page, plus keyboard-path smoke test | Zero serious/critical — blocking |
| Pre-launch | Manual run on a real ₹12–15k Android over throttled 4G | Hairline legibility, scroll smoothness, tap accuracy, form completion — sign-off |
| Post-launch, continuous | CrUX 28-day, mobile and desktop segmented | LCP ≤2.5s, INP <200ms, CLS <0.1 at p75 |
| Post-launch, continuous | Form funnel by step, channel split (form / `tel:` / `wa.me`), scroll depth to `#reckoning` and `#enquiry` | Reviewed monthly |

Analytics and any chat widget are deferred to idle and never on the critical path. The Google review widget, if added, is rendered **server-side from fetched data**, never as a third-party script.

### 4.7 SEO — the shipping metadata

**Title tag (51 characters, canon, verbatim):**

```
Study Abroad Consultants in India | Free Counselling
```

Front-loaded with the primary intent phrase, offer second, inside the 50–60 character window. Brand is deliberately absent — GO's brand has no search volume advantage here and the characters are worth more to the intent phrase.

**Meta description (canon, verbatim; payload inside the first 115 characters for mobile truncation):**

```
Free counselling with a named GO counsellor — 700+ partner universities, 15 countries, 18 offices across India. Real costs in rupees, real intake deadlines, no visa guarantees. Since 2001.
```

**`app/layout.tsx` metadata:**

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://www.global-opportunities.net"),
  title: "Study Abroad Consultants in India | Free Counselling",
  description:
    "Free counselling with a named GO counsellor — 700+ partner universities, 15 countries, " +
    "18 offices across India. Real costs in rupees, real intake deadlines, no visa guarantees. Since 2001.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.global-opportunities.net/",
    siteName: "Global Opportunities",
    locale: "en_IN",
    title: "Study Abroad Consultants in India | Free Counselling",
    description:
      "700+ partner universities. 15 countries. 18 offices you can walk into. " +
      "Real costs in rupees, real intake deadlines, no visa guarantees. Since 2001.",
    images: [{
      url: "/opengraph-image",   // generated at build by next/og — see note below
      width: 1200, height: 630,
      alt: "Global Opportunities — An Atlas of Departures, Volume XXV. Est. Amritsar 2001.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Consultants in India | Free Counselling",
    description:
      "700+ partner universities. 15 countries. 18 offices you can walk into. Since 2001.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true, "max-image-preview": "large",
            "max-snippet": -1, "max-video-preview": -1 },
}
```

**The OG image is typeset, not photographed.** `app/opengraph-image.tsx` uses `next/og` `ImageResponse` at build time to render a 1200×630 Plate A: `--grad-plate-marine` field, an 8%-white SVG graticule, `GLOBAL OPPORTUNITIES · AN ATLAS OF DEPARTURES · VOL. XXV` in Hanken, and *Step out without doubt.* in Newsreader with the final word italic. It is on-brand, needs no photographer, weighs ~14 KB, and is the only `<canvas>`-adjacent code on the project (`05-motion-blueprint.md` §7.4).

### 4.8 JSON-LD to ship

Three blocks ship in `app/page.tsx` as `<script type="application/ld+json">`. Canon build note 14 also requires `LocalBusiness` × 18 as `subOrganization`, plus `WebSite` / `WebPage` / `BreadcrumbList`; those are mechanical and are generated from the same branch and page data as the visible markup.

**1 — `Organization`** (**not** `EducationalOrganization`: schema.org defines that as an actual educational institution, and GO is a consultancy).

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.global-opportunities.net/#organization",
  "name": "Global Opportunities",
  "legalName": "GLOBAL OPPORTUNITIES PRIVATE LIMITED",
  "url": "https://www.global-opportunities.net/",
  "foundingDate": "2001",
  "foundingLocation": { "@type": "Place", "name": "Amritsar, Punjab, India" },
  "founder": { "@type": "Person", "name": "Sidharth Gupta", "jobTitle": "Chief Executive Officer" },
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.global-opportunities.net/brand/go-logo-512.png",
    "width": 512,
    "height": 512
  },
  "telephone": "+91-8282828215",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "HS-27, 2nd Floor, Kailash Colony Market",
    "addressLocality": "New Delhi",
    "addressRegion": "Delhi",
    "postalCode": "110048",
    "addressCountry": "IN"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+91-1800-111-119",
      "contactOption": "TollFree",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "09:00",
        "closes": "21:00"
      }
    },
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "telephone": "+91-11-47141414",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    }
  ],
  "sameAs": [],
  "subOrganization": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.global-opportunities.net/contact/study-abroad-consultants-in-delhi-south/#branch",
      "name": "Global Opportunities — Delhi South",
      "telephone": "+91-11-47141414",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "HS-27, 2nd Floor, Kailash Colony Market",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110048",
        "addressCountry": "IN"
      },
      "parentOrganization": { "@id": "https://www.global-opportunities.net/#organization" }
    }
  ]
}
```

> **`sameAs` ships empty until verified profile URLs are supplied.** No social URL was verified in `research-brand.json`, and inventing one on a page whose entire argument is auditability would be self-defeating. This is **open question 3** in §5.7. `subOrganization` is shown with Delhi South only; the remaining 17 branches (Ahmedabad, Amritsar, Bangalore, Bathinda, Chandigarh, Chennai, Delhi West, Hyderabad, Jalandhar, Ludhiana, Mohali, Mumbai Andheri, Mumbai Bandra, Mumbai Dadar, Mumbai Thane, Patiala, Pune) are generated from the same branch data that renders `branch-atlas` and the colophon. **`ProfessionalService` is deprecated and must not be used.**

**2 — `Service` with `hasOfferCatalog`.**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.global-opportunities.net/#service",
  "name": "Study abroad guidance for Indian families",
  "serviceType": "Overseas education consultancy",
  "provider": { "@id": "https://www.global-opportunities.net/#organization" },
  "areaServed": { "@type": "Country", "name": "India" },
  "audience": { "@type": "Audience", "audienceType": "Students and parents in India" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Fifteen things we do",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Education counselling" },
        "price": "0", "priceCurrency": "INR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Country information" },
        "price": "0", "priceCurrency": "INR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Profile shortlisting" },
        "price": "0", "priceCurrency": "INR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Selection of course" },
        "price": "0", "priceCurrency": "INR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Admission guidance" },
        "price": "0", "priceCurrency": "INR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Career guidance" },
        "price": "0", "priceCurrency": "INR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Financial estimation" },
        "price": "0", "priceCurrency": "INR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interview preparation" },
        "price": "0", "priceCurrency": "INR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Visa services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Education loan assistance" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Forex exchange" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "GIC account setup" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Medical insurance" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Accommodation guidance" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Travel guidance" } }
    ]
  }
}
```

`price: "0"` appears only on services the page marks `FREE` in `what-we-do`. Services marked `PAID` or `at cost` carry **no** `price` property rather than a guessed one — the visible ledger in `what-we-do` is the source of truth and the JSON-LD must never claim more precision than it does.

**3 — `FAQPage`**, mirroring the eight questions in `#questions`. **The `text` values below are abbreviated stubs: the shipping answers are owned by `03-section-specs.md` and the JSON-LD must mirror that copy verbatim.** Markup that does not match the visible answer is a policy violation.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.global-opportunities.net/#faq",
  "mainEntity": [
    { "@type": "Question", "name": "Why use a consultant at all?",
      "acceptedAnswer": { "@type": "Answer", "text": "…verbatim from 03-section-specs.md…" } },
    { "@type": "Question", "name": "What do you charge?",
      "acceptedAnswer": { "@type": "Answer", "text": "Global Opportunities charges you ₹0. …" } },
    { "@type": "Question", "name": "Who pays you?",
      "acceptedAnswer": { "@type": "Answer", "text": "…verbatim from 03-section-specs.md…" } },
    { "@type": "Question", "name": "What if my visa is refused?",
      "acceptedAnswer": { "@type": "Answer", "text": "…verbatim from 03-section-specs.md…" } },
    { "@type": "Question", "name": "Is my course recognised in India?",
      "acceptedAnswer": { "@type": "Answer", "text": "…verbatim from 03-section-specs.md…" } },
    { "@type": "Question", "name": "Is it safe for my daughter?",
      "acceptedAnswer": { "@type": "Answer", "text": "…verbatim from 03-section-specs.md…" } },
    { "@type": "Question", "name": "Which intake should I apply for?",
      "acceptedAnswer": { "@type": "Answer", "text": "…verbatim from 03-section-specs.md…" } },
    { "@type": "Question", "name": "Do you guarantee a visa or an admission?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Nobody can. …verbatim from 03…" } }
  ]
}
```

**Budget zero SERP payoff from `FAQPage`.** FAQ rich results were restricted in Aug 2023 and fully deprecated on 7 May 2026. The markup remains valid, harmless, and useful for AI-answer retrieval — that is the entire justification for shipping it.

**Never emit `AggregateRating` or `Review`.** Google's policy makes entities that control their own reviews ineligible for star treatment. Reviews are displayed visually in `endpaper` and linked to the Google Business Profile. This is canon build note 14 and it is review-blocking.

### 4.9 Keyword-intent notes

| Intent | Query shape | Where the page answers it |
|---|---|---|
| **Primary — transactional** | *study abroad consultants in India*, *free study abroad counselling* | Title tag, deck, `#enquiry`, proof line |
| **Destination — informational→commercial** | *study in UK from India*, *study in Canada cost* | `#gazetteer` h3s (one per destination, ×15) with real partner counts, intake windows, tuition bands and post-study-work rights |
| **Cost — high-intent parent** | *cost of studying abroad from India*, *study abroad in rupees* | `#reckoning` h2, the rupee ledger, the loan EMI line. **The single biggest unclaimed lever** — neither IDP nor Leverage Edu surfaces a cost instrument |
| **Process** | *study abroad process step by step*, *when to apply for Sep 2027 intake* | `#eleven-months` h2 + Application Days h3 |
| **Trust / verification** | *is <consultant> genuine*, *AIRC certified consultant India* | `#still-page` h2 + six accreditation h3s with the AIRC standard quoted |
| **Local — the money terms** | *study abroad consultants in Delhi / Amritsar / Ludhiana / Pune…* | `#branch-atlas` h3s (×18, each with a street address), the `<select>` of 18 offices in the form, and the colophon branch list. **City modifiers are the money terms; the national page carries a city selector that doubles as a form field.** |
| **Scholarship** | *scholarships to study abroad for Indian students* | `#reckoning` h3 "Scholarships and bursaries", with four named funders linked to their own pages |
| **Parent** | *is it safe to send my daughter abroad*, *education loan for study abroad* | `#for-parents` h2 + seven h3s |
| **Objection** | *do study abroad consultants charge fees*, *who pays study abroad agents* | `#questions` — *What do you charge? Who pays you?* |

**The named SEO trade-off, carried over from the concept and accepted in canon:** the H1 *Step out without doubt.* has **zero keyword weight**. The title tag and the deck carry the intent payload instead. This is a deliberate exchange of a keyword slot for the strongest four words the brand owns, and it is the reason the deck is real crawlable text rather than a graphic.

**City pages remain a separate workstream.** This landing page is the national surface. The 18 branch pages already exist on the WordPress site and must be migrated with their local intent intact; do not let this page cannibalise them.

---

## 5. Developer handoff

### 5.1 Repo structure

```
global-opportunities/
├── app/
│   ├── layout.tsx                  # fonts, metadata, MotionProvider, skip link, JSON-LD
│   ├── page.tsx                    # the landing page — composes all 16 sections
│   ├── template.tsx                # enter animations (AnimatePresence exit ≠ App Router nav)
│   ├── globals.css                 # tokens, reset, grain, reduced-motion backstop, print styles
│   ├── opengraph-image.tsx         # next/og — typeset Plate A OG card, 1200×630
│   ├── favicon.ico
│   └── api/
│       └── enquiry/route.ts        # POST handler: validation, consent log, routing
├── components/
│   ├── providers/
│   │   └── motion-provider.tsx     # Lenis + gsap.ticker + plugins + MotionConfig + LazyMotion
│   ├── sections/
│   │   ├── sticky-nav/             # nav.tsx, nav-motion.tsx, mega-panel.tsx, contents-sheet.tsx
│   │   ├── hero/                   # hero.tsx, hero-motion.tsx, departure-card.tsx
│   │   ├── colophon-strip/
│   │   ├── gazetteer/              # gazetteer.tsx, row.tsx, plate-d.tsx
│   │   ├── register/               # register.tsx, use-register-counters.ts
│   │   ├── what-we-do/
│   │   ├── still-page/             # pure server component — zero client JS
│   │   ├── branch-atlas/           # atlas.tsx, india-map.tsx, branch-drawer.tsx, use-atlas-draw.ts
│   │   ├── contributors/           # contributors.tsx, cartouche.tsx, counsellor-drawer.tsx
│   │   ├── for-parents/            # parents.tsx, dual-clock.tsx, hindi-toggle.tsx
│   │   ├── reckoning/              # ledger.tsx, chips.tsx, rupee-bar.tsx
│   │   ├── eleven-months/          # calendar.tsx, use-eleven-months.ts, specimen.tsx
│   │   ├── endpaper/               # endpaper.tsx, use-inversion.ts
│   │   ├── questions/              # pure server component — native <details>, zero client JS
│   │   ├── enquiry/                # enquiry-form.tsx, step-1/2/3.tsx, consent.tsx
│   │   ├── colophon/               # colophon.tsx, sources-table.tsx
│   │   └── mobile-bar/
│   ├── ui/                         # SPLIT-A exports — SPLIT-B consumes, never extends
│   │   ├── plate.tsx               # variants: field | specimen | cartouche | cartographic
│   │   ├── footnote.tsx            # + rail context provider
│   │   ├── rail.tsx                # marginalia rail, >=1024px
│   │   ├── stat-figure.tsx         # server-rendered final value, tabular
│   │   ├── cta.tsx                 # primary | secondary | ghost
│   │   ├── rule.tsx                # hairline | chapter | masthead
│   │   ├── chip.tsx
│   │   ├── disclosure.tsx          # <details> + grid-template-rows accordion
│   │   └── icon.tsx                # 2026-08-04 — the only file that RENDERS a Lucide glyph
│   │                               # (~30 section files import glyphs as values and pass them in)
│   └── seo/
│       └── json-ld.tsx             # Organization, Service, FAQPage, LocalBusiness ×18
├── lib/
│   ├── motion/
│   │   ├── variants.ts             # EASE, DUR, STAGGER, VIEWPORT, shared variants
│   │   ├── odometer.ts             # Anime.js — dynamic import target
│   │   ├── atlas-draw.ts           # Anime.js — dynamic import target
│   │   └── letterpress.ts          # Anime.js — dynamic import target
│   ├── data/
│   │   ├── destinations.ts         # 15 — partner counts, intakes, tuition bands, PSW rights
│   │   ├── branches.ts             # 18 — name, address, phone, hours, coordinates
│   │   ├── counsellors.ts          # name, initials, city, destinations, years, outcome
│   │   ├── services.ts             # 15 — label, FREE|PAID, figure
│   │   ├── costs.ts                # ledger matrix: destination × degree × city tier
│   │   ├── application-days.ts     # city, date, source
│   │   ├── deadlines.ts            # third-party deadlines: date, source URL, last verified
│   │   └── sources.json            # Sources & Methods registry — owner + last-verified per entry
│   ├── links.ts                    # waHref(), telHref(), enquiry deep links
│   └── consent.ts                  # DPDP consent record shape + form version
├── public/
│   ├── grain.avif                  # ~8 KB, one tile
│   └── brand/go-logo-512.png       # >=112×112 for Organization schema
├── AGENTS.md · CLAUDE.md · README.md
├── next.config.ts · tsconfig.json · postcss.config.mjs · eslint.config.mjs
└── package.json
```

### 5.2 Component tree of the page

```
<RootLayout>                                          app/layout.tsx (Server)
 ├── <SkipLink>                                        z-index 80
 ├── <MotionProvider>                                  "use client" — Lenis, GSAP, MotionConfig, LazyMotion
 │    ├── <StickyNav>                                  "use client"
 │    │    ├── <NavMotion>                             useScroll → wordmark, rule, ground, spine
 │    │    ├── <MegaPanel>                             AnimatePresence, click-open, Destinations only
 │    │    └── <ContentsSheet>                         <1024px
 │    ├── <main id="main" tabIndex={-1}>
 │    │    ├── <Hero>                                  Server + <HeroMotion> client leaf
 │    │    │    ├── <DepartureCard>                    6 stations, tabular, server-rendered cleared
 │    │    │    ├── <CTA variant="primary"> + <ProofLine> + <AccreditationRow>
 │    │    │    └── <Plate variant="field">            Plate A — gradient + graticule + type
 │    │    ├── <ColophonStrip>                         6 stats + <Footnote> ×6
 │    │    ├── <Gazetteer>                             4 anchor plates + 11 rows
 │    │    │    └── <GazetteerRow> → <Plate variant="cartographic">   layoutId morph
 │    │    ├── <Register>                              dynamic, ssr:false
 │    │    ├── <WhatWeDo>                              15 rows, FREE|PAID
 │    │    ├── <StillPage>                             PURE SERVER — 6 accreditations, 400ms fade
 │    │    ├── <BranchAtlas>                           dynamic, ssr:false
 │    │    │    ├── <IndiaMap>                         SVG, 18 <button> crosshairs
 │    │    │    └── <BranchDrawer>                     dialog + <details> no-JS fallback
 │    │    ├── <Contributors>                          dynamic, ssr:false
 │    │    │    └── <Cartouche> → <CounsellorDrawer>   layoutId morph, tel:/wa.me anchors
 │    │    ├── <ForParents>                            dynamic, ssr:false
 │    │    │    ├── <DualClock> · <HindiToggle> · <PrintSummary> · <WhatsAppSummary>
 │    │    ├── <Reckoning>                             dynamic, ssr:false
 │    │    │    ├── <Chips> ×3 → <Ledger> → <RupeeBar>  useMotionValue + useSpring → scaleX
 │    │    ├── <ElevenMonths>                          dynamic, ssr:false — THE ONLY PIN
 │    │    │    └── <Specimen> ×3                      <Plate variant="specimen">
 │    │    ├── <Endpaper>                              dynamic, ssr:false
 │    │    │    └── <Plate variant="cartouche"> ×3 + institutional testimonials ×5
 │    │    ├── <Questions>                             PURE SERVER — 8 native <details>
 │    │    ├── <Enquiry>                               "use client", server-rendered, POSTs without JS
 │    │    │    └── <Step1|2|3> + <Consent> + tel:/wa.me siblings
 │    │    └── <Rail>                                  >=1024px, role="complementary"
 │    ├── <Colophon>                                   footer + <SourcesTable>
 │    └── <MobileBar>                                  "use client", <1024px, 3 real anchors
 └── <JsonLd>                                          Organization · Service · FAQPage · LocalBusiness ×18
```

### 5.3 Install list — already installed, versions documented

Nothing needs installing. This is the verified state of `package.json`:

```jsonc
"dependencies": {
  "@gsap/react":   "^2.1.2",    // useGSAP — peers gsap ^3.12.5, react >=17
  "animejs":       "^4.5.0",    // v4 named exports only — no default anime()
  "framer-motion": "^12.43.0",  // maintained alias of `motion`; React 19 supported
  "gsap":          "^3.15.0",   // all ex-Club plugins free since 3.13
  "lenis":         "^1.3.25",
  "lucide-react":  "^1.28.0",    // added 2026-08-04 — site-wide icon set, DRAWN
                                 // only by `components/ui/icon.tsx` (04 §5). ~30
                                 // component files now import glyphs as values and
                                 // pass them to <Icon as={…}>; none renders one.
                                 // Tree-shakes per named import; never `import *`.
                                 // Ships "use client" on its base Icon module — §4.1.
  "next":          "16.2.12",
  "react":         "19.2.4",
  "react-dom":     "19.2.4"
},
"devDependencies": {
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20", "@types/react": "^19", "@types/react-dom": "^19",
  "eslint": "^9", "eslint-config-next": "16.2.12",
  "tailwindcss": "^4", "typescript": "^5"
}
```

**Licensing is a non-issue.** GSAP has been fully free since 3.13 (Webflow acquired GreenSock, Oct 2024). Every former Club plugin — ScrollTrigger, SplitText, DrawSVG, ScrambleText, MorphSVG, ScrollSmoother, MotionPath, Flip, Observer, Draggable, Inertia, GSDevTools — ships in the public npm package under a standard no-charge licence. **No auth token, no private registry, no licence key, no `.npmrc` entry.** If any onboarding doc says otherwise, it is out of date.

**Optional, non-breaking:** migrating `framer-motion` → `motion` (`import { motion } from "motion/react"`) has zero breaking changes in v12 and unlocks `motion/react-client` (use `<motion.div>` inside a Server Component without converting the file). Not required for v1. If it is done, `import { m, LazyMotion, domAnimation } from "framer-motion"` becomes `import { LazyMotion, domAnimation } from "motion/react"` + `import * as m from "motion/react-m"`.

### 5.4 Build order — seven milestones

The author split is canon: **SPLIT-A** owns the token layer, font loading, the Lenis/GSAP provider, the Plate System primitives and the marginalia rail, and must export them before **SPLIT-B** begins.

| # | Milestone | Contents | Definition of complete |
|---|---|---|---|
| **M1** | **Foundation** | `globals.css` with the complete token set; `next/font` wiring; `MotionProvider` (Lenis + `gsap.ticker` + 5 plugins + `MotionConfig` + `LazyMotion` + shared reveal observer); reduced-motion CSS backstop; skip link; grain layer; print stylesheet | Token stylesheet complete and frozen. Lenis drives scroll and is absent under reduced motion. `mm.revert()` verified StrictMode-safe. Zero visual regressions on a blank page. |
| **M2** | **SPLIT-A primitives** | `<Plate>` (4 variants), `<Footnote>` + rail context, `<Rail>`, `<StatFigure>`, `<CTA>`, `<Rule>`, `<Chip>`, `<Disclosure>`, `<Icon>` (added 2026-08-04; the sole gate for Lucide — see `04-design-system.md §5`); the `data-chapter` root contract | Every primitive renders at all six breakpoints, keyboard-operable, `:focus-visible` correct, and documented in Storybook or an `/dev` route. **This is the hard gate: SPLIT-B does not start until M2 ships.** No section may **render** a `lucide-react` glyph directly; a section imports the glyph as a value and hands it to `<Icon as={…}>`, which is the only thing that draws a Lucide path. The grep that must return nothing is for a Lucide glyph used as JSX (`<Phone `) or a barrel import (`import * as`) outside `components/ui/icon.tsx` — roughly 30 component files across every chapter now consume `<Icon>` and legitimately name glyphs at the top of the file. |
| **M3** | **Chapter I–II** | `sticky-nav`, `hero` (+ boot timeline), `colophon-strip`, `gazetteer`, `register`, `what-we-do` | LCP is the H1 and lands ≤2.5s on throttled 4G. Hero sequence measures ≤1400ms. Zero ScrollTriggers created so far. |
| **M4** | **Chapter III** | `still-page`, `branch-atlas`, `contributors`, `for-parents` | `still-page` ships with zero client JS. All 18 branches and all counsellors keyboard-reachable. Anime.js confirmed absent from the initial bundle. |
| **M5** | **Chapters IV–V** | `reckoning`, `eleven-months` | The pin works at ≥1024px, degrades to a static vertical list below it and under reduced motion. ScrollTrigger count = 6. Ledger correct at every chip permutation, server-rendered by default. |
| **M6** | **Chapter VI + conversion** | `endpaper`, `questions`, `enquiry`, `colophon`, `mobile-bar` | Inversion scrubs both ways. Form completes with JS disabled. `tel:`/`wa.me` verified on a real Android. Consent record written with timestamp, IP and form version. ScrollTrigger count = 10. |
| **M7** | **Hardening** | SEO metadata + JSON-LD + OG image; a11y audit; performance audit; Sources registry wired; real-device pass | Every CI gate in §4.6 green. Zero serious/critical axe findings. Real ₹12–15k Android sign-off. No footnote 404s. |

### 5.5 Per-library setup gotchas

Cross-referenced to `05-motion-blueprint.md` throughout.

**Next 16 / App Router**

- **`AGENTS.md` warns that this Next.js version has breaking changes versus training data. Read `node_modules/next/dist/docs/` before writing framework code.** Heed deprecation notices.
- **`next/dynamic({ ssr: false })` only works inside a Client Component.** It errors in a Server Component. Wrap each below-fold chapter in a thin `"use client"` loader (§4.4).
- **`AnimatePresence` exit animations do not work reliably across App Router navigations.** Use `app/template.tsx` (unique key per segment) for enter animations. `experimental.viewTransition` is explicitly not production-ready.
- Keep copy, data and structure in Server Components; wrap only the animating shell in `"use client"`. Hydration weight is the primary INP threat.

**GSAP**

- **Register plugins once, at module scope, inside a single `"use client"` provider** — never per component. Five plugins: `useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, ScrambleTextPlugin` (`05-motion-blueprint.md` §3.7).
- **Use `useGSAP` everywhere**, never `useEffect`/`useLayoutEffect`. Always pass `{ scope: containerRef }`; wrap handler-triggered animation in `contextSafe()`.
- **`gsap.from()` records the current state as the end value** → drift and flicker under StrictMode and on refresh. Use `fromTo()` with explicit values, `immediateRender: false` on any non-zero-position from/fromTo, and `invalidateOnRefresh: true` for function-based values.
- **Hydration mismatch** comes from ScrollTrigger writing inline styles on `<body>` during pin setup before hydration finishes. Fixes: never render different markup server vs client based on a motion flag; `suppressHydrationWarning` on `<body>`; set initial hidden states in CSS so there is no flash.
- **`content-visibility: auto` breaks ScrollTrigger measurement.** Permitted only on `questions` and `colophon`.
- **Pinning breaks under transformed ancestors.** No ancestor of `eleven-months` may carry `transform`, `filter`, `will-change: transform` or `contain: paint`. `pinReparent: true` is an escape hatch, not a fix.
- **`containerAnimation` children use `left`/`right` in `start`/`end`, not `top`/`bottom`**, and require the container tween to be `ease: "none"`.
- **Do not override SplitText's automatic `aria-label`/`aria-hidden`.** Set `autoSplit: true` and rebuild the timeline inside `onSplit`.

**Motion (framer-motion 12.43.0)**

- **`LazyMotion … strict` forbids `motion.div`.** Import `m` and use `<m.div>`. Anything importing `motion` directly re-introduces the 34 KB bundle and will throw under `strict`.
- **`<MotionConfig reducedMotion="user">` at the app root** disables transform and layout animations while preserving opacity and colour. For bespoke values use `useReducedMotion()` and return the static value early.
- **`viewport={{ once: true }}` on every reveal.** `once: false` anywhere is a review-blocking violation of the motion budget.
- **`layoutId` requires the shared element to exist in both trees.** `AnimatePresence mode="wait"` is what keeps exactly one gazetteer plate mounted.
- **Never `animate={{ height: "auto" }}`.** Use `grid-template-rows: 0fr→1fr` (`05-motion-blueprint.md` §4.6).

**Anime.js v4**

- **Named exports only — there is no default `anime()`.** `import { animate, stagger, svg, text, utils, createScope } from "animejs"`.
- **Always `createScope({ root })` + `scope.revert()` in cleanup**, and **always check `prefers-reduced-motion` before the dynamic `import()`** so the library is never fetched for a reduced-motion visitor (`05-motion-blueprint.md` §5.4).
- **`svg.createDrawable()` returns proxies** whose `draw` property takes normalised `"start end"` strings: `draw: ["0 0", "0 1"]`. **Leave the base CSS with paths fully drawn** — the dash is applied only at runtime, so a failed chunk still renders complete art.
- **Anime runs its own RAF loop**, competing with `gsap.ticker` on the main thread. Keep it confined to the five declared entry points.
- **Ease names differ from GSAP**: `outQuart`, `inOutQuad`, `outBack(1.4)` (`05-motion-blueprint.md` §1.2).

**Lenis 1.3.25**

- **`autoRaf: false` is mandatory** — otherwise Lenis runs a second RAF loop alongside `gsap.ticker`.
- Wire `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`. Restore `lagSmoothing(500, 33)` on teardown.
- **Leave `syncTouch: false`** (the default). Native Android/iOS inertia beats JS-smoothed touch and `syncTouch` misbehaves on iOS <16.
- **Do not initialise Lenis at all under reduced motion.** Its entire lifecycle lives inside the `(prefers-reduced-motion: no-preference)` matchMedia branch.

### 5.6 Asset checklist for v2 photography

v1 ships with **zero photographs**, deliberately. v2 drops commissioned images into the identical boxes behind the identical captions, with **zero layout shift and zero CSS change beyond a `data-plate` attribute**. What the photographer needs to deliver:

| Plate | Slot | Count | Aspect | Brief | Caption (unchanged from v1) |
|---|---|---|---|---|---|
| **A** | `hero` | 1 | 4:5 | Departure, IGI Terminal 3, ~04:40. Natural light, visible grain, real family. No cap-toss, no globe, no aircraft exterior. | `PLATE I · 28.5562° N · 77.1000° E · INDIRA GANDHI INTERNATIONAL, TERMINAL 3 · 04:40 IST` |
| **A** | Chapter openers | 5 | 4:5 or 3:2 | One per chapter II–VI. Kitchen table with a printed cost sheet; the Amritsar or Kailash Colony desk mid-call; a lecture theatre; a first winter coat; a graduation with parents present. | Place · time · name, set in Plex Mono |
| **D** | `gazetteer` destination heroes | 4 (anchors first) | 3:2 | Real place, real hour, no landmark clichés. UK, USA, Canada, Australia. | Existing cartographic caption retained beneath |
| **C** | `contributors` | 1 per counsellor | **4:5** | Environmental portrait at the actual office desk. Natural light. No studio white. | `AVINASH · DELHI SOUTH · UK & IRELAND · 11 YEARS` — data block never changes |
| **C** | `endpaper` students | 3+ | **4:5** | Named students, with written release. Real settings. | Name · university · year · counsellor |
| **—** | Branch exteriors | 18 | 3:2 | The actual door, in daylight, with the signage legible. Feeds the branch drawers. | Street address |
| **B** | `eleven-months` specimens | **0 — never photographed** | — | **Plate B stays a typeset facsimile permanently.** Photographing a real CAS, offer letter or visa vignette creates DPDP exposure and is off-brand: an atlas reproduces facsimiles. | `SPECIMEN · ILLUSTRATIVE · NOT A STUDENT RECORD` |

**Delivery spec:** AVIF primary with WebP fallback, ≤100 KB per image at the rendered size, `next/image` with explicit `width`/`height`, `priority` + `fetchPriority="high"` on the hero only, everything else lazy. Archival images (2001 founding, historic offices) get a **baked** sienna/marine duotone at build time — **never a live CSS `filter`**.

**Still banned in v2, exactly as in v1:** empty `<img>` placeholders, grey boxes, "image coming soon", skeleton shimmers standing in for content, AI-generated imagery of any kind, stock photography of any kind, flags, landmarks, globes, aircraft, passports, cap-tosses, handshakes, isometric illustration, 3D clay, gradient blobs.

### 5.7 Definition of done — per section

**Every section, without exception, must satisfy all ten:**

1. Renders correctly at 375, 480, 768, 1024, 1280 and 1600px.
2. Fully keyboard-operable; visible `:focus-visible` ring on every interactive element; logical tab order.
3. Zero serious or critical `axe-core` findings; heading level correct per §3.2; landmark labelled.
4. Reduced motion: content fully visible on first paint, no half-animated state, verified both on reload **and** on a mid-session toggle.
5. JavaScript disabled: all content present, all numbers correct, all `tel:`/`wa.me` anchors working.
6. Zero CLS attributable to the section (locked aspect ratios, reserved heights, tabular counters).
7. Motion matches `05-motion-blueprint.md` §2 exactly — trigger, sequence, duration, easing, library.
8. **Mono law:** every mono string is a verified fact, and every mono figure's superscript resolves to a live entry in `sources.json` with an owner and a last-verified date. **No 404ing footnotes.**
9. **Tone law:** no superlatives; the words *leading, top, best, #1, trusted partner, world-class* do not appear; no exclamation marks; *journey* appears at most once on the whole page; *avail* does not appear.
10. No token, radius, shadow, easing or type size that is not in `04-design-system.md`. SPLIT-B authors none.

**Section-specific additions:**

| Section | Additional gate |
|---|---|
| `hero` | LCP is the H1 text. Boot sequence measures ≤1400ms. Departure Card renders complete and cleared under reduced motion and with JS off. |
| `colophon-strip` | Exactly the six canonical stats, verbatim, each footnoted. **No retired figure appears** (`100,000+`, `125,000`, `20+ offices` as a headline, any percentage, any star rating). |
| `gazetteer` | All 15 destinations keyboard-reachable. No "Berlin" or "Paris" as countries. Zero ScrollTriggers. |
| `still-page` | **Zero client JS. Exactly one 400ms opacity fade and nothing else.** AIRC's standard quoted verbatim. Legal entity named. |
| `branch-atlas` | All 18 branches keyboard-reachable with real addresses and phone numbers. Anime.js absent from the initial bundle. |
| `for-parents` | Opacity-only reveals — no transform anywhere in the chapter. Serif body at 62ch. Hindi toggle loads Devanagari on demand only. |
| `reckoning` | Every figure footnoted. Total is a **range**. The ₹0 line appears verbatim. **User-triggered only — zero ScrollTriggers.** |
| `eleven-months` | Pin ≥1024px only; static vertical list below and under reduced motion. Every date has a named linked source and a last-verified stamp. The margin note appears verbatim. |
| `endpaper` | Counters server-rendered at final value, animating the last 12% only. **No `AggregateRating` or `Review` emitted anywhere.** |
| `enquiry` | Six fields, three non-PII taps, PII in step 3. Optional labelled *optional*; nothing asterisked. Progress indicator on every step. Consent unticked and separate. Submits with JS disabled. |
| `mobile-bar` | ≥48px targets above the gesture inset. Three real anchors. Works with JS off. **WhatsApp in ink + outline, never brand green.** |

### 5.8 Open questions for the client — five, maximum

1. **Sources & Methods ownership.** Every number, date and cost on this page carries a footnote that must resolve to a source and a last-verified date, maintained in `sources.json` (or a CMS). **Who owns that registry, and what is the review cadence?** This is an ongoing operational commitment, not a launch task — and a 404ing footnote does more reputational damage than no footnote. *Without an owner, the marginalia rail cannot ship.*

2. **The student-count reconciliation, on the record.** Canon uses **40,000+ students placed** — the most conservative and most frequently published of GO's own figures — and **withdraws `100,000+` and `125,000 global graduates` pending audit**. Those larger figures currently appear on GO's live About page. **Please confirm they will be corrected or removed sitewide**, so the new landing page is not contradicted by the site it links to.

3. **Verified social profile URLs.** The `Organization` JSON-LD ships with `sameAs: []` because no social URL was verified in research. **Please supply the canonical URLs** for every profile GO controls (and only those). We will not invent them.

4. **Named counsellors: consent and reassignment.** The contributors' page names real counsellors with cities, destinations, years and student outcomes — a genuine competitive advantage no rival has taken. **Do we have each named counsellor's written consent, and what is the process when one leaves or changes city?** A reassignment state must be built on day one, not retrofitted.

5. **Photography commissioning decision for v2.** V1 ships deliberately with zero photographs and looks complete. **Is there a budget and a timeline for the commissioned documentary shoot in §5.6, or should v1's Plate System be treated as the permanent art direction?** Both are defensible; the answer changes nothing in the v1 build, but it determines whether the branch-exterior and counsellor-portrait shot lists get scheduled now.

---

*End of `06-strategy.md`. Motion specifications, timelines and governance are in `05-motion-blueprint.md`. Tokens, components and the per-token contrast table are in `04-design-system.md`. Per-section content and copy are in `03-section-specs.md`.*

