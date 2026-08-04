# 04 — Design System

This document is the implementable half of the Global Opportunities landing-page blueprint: the surface strategy for all sixteen sections, the complete token sheet in both plain CSS and Tailwind v4 form, a computed WCAG verification of every text/background pairing in the canon, the grid and margin-rail behaviour at each breakpoint, and a full component library with anatomy, variants, states, token usage, TypeScript prop interfaces, ARIA patterns and keyboard behaviour. It is written so that SPLIT-A can build the token layer and primitives from it without further direction, and SPLIT-B can consume those primitives without authoring a single new token. Narrative, brand voice and page architecture live in `01-creative-vision-and-brand.md`; section-level layout and copy live in `02-sections-part1.md` and `03-sections-part2.md`; every timeline, easing application and reduced-motion branch lives in `05-motion-blueprint.md`; SEO, structured data, consent and measurement live in `06-strategy.md`. Nothing here introduces a value the creative canon does not already contain — where the canon is ambiguous or internally inconsistent, the resolution is recorded explicitly and stays inside canon values.

---

## Table of contents

1. [High-fidelity visual direction](#1-high-fidelity-visual-direction)
   - 1.1 [Surface strategy, section by section](#11-surface-strategy-section-by-section)
   - 1.2 [Gradient usage map](#12-gradient-usage-map)
   - 1.3 [Plate and duotone treatment recipe](#13-plate-and-duotone-treatment-recipe)
   - 1.4 [Grain recipe](#14-grain-recipe)
   - 1.5 [Depth model — the no-shadow registration-offset system](#15-depth-model--the-no-shadow-registration-offset-system)
2. [Design tokens](#2-design-tokens)
   - 2.1 [CSS custom properties](#21-css-custom-properties)
   - 2.2 [Tailwind v4 `@theme` block](#22-tailwind-v4-theme-block)
   - 2.3 [WCAG contrast verification](#23-wcag-contrast-verification)
3. [Grid & layout](#3-grid--layout)
   - 3.1 [The twelve-column spec](#31-the-twelve-column-spec)
   - 3.2 [Container widths](#32-container-widths)
   - 3.3 [Margin-rail behaviour by breakpoint](#33-margin-rail-behaviour-by-breakpoint)
   - 3.4 [Section vertical rhythm](#34-section-vertical-rhythm)
   - 3.5 [Bento and anchor-cell rules](#35-bento-and-anchor-cell-rules)
4. [Component library](#4-component-library)
   - 4.1 [Masthead / sticky nav](#41-masthead--sticky-nav)
   - 4.2 [CTA / Button](#42-cta--button)
   - 4.3 [Plate](#43-plate)
   - 4.4 [Gazetteer row](#44-gazetteer-row)
   - 4.5 [Register list](#45-register-list)
   - 4.6 [Accreditation block](#46-accreditation-block)
   - 4.7 [Counsellor card + drawer](#47-counsellor-card--drawer)
   - 4.8 [Ledger row + odometer figure](#48-ledger-row--odometer-figure)
   - 4.9 [Timeline month block](#49-timeline-month-block)
   - 4.10 [FAQ item](#410-faq-item)
   - 4.11 [Form controls](#411-form-controls)
   - 4.12 [Footnote marker + marginalia rail](#412-footnote-marker--marginalia-rail)
   - 4.13 [CTA banner](#413-cta-banner)
   - 4.14 [Footer colophon](#414-footer-colophon)
   - 4.15 [Mobile sticky bar](#415-mobile-sticky-bar)
5. [Iconography & marks](#5-iconography--marks)
6. [Dark chapter — endpaper token remapping](#6-dark-chapter--endpaper-token-remapping)
7. [Resolutions recorded](#7-resolutions-recorded)

---

## 1. High-fidelity visual direction

### 1.1 Surface strategy, section by section

The page reads as a bound volume, so surfaces alternate the way paper stocks alternate in a printed book: cartridge for the body, laid for the alternating spreads, tracing for inset instruments, warm laid for the one chapter addressed to a different reader, noon-white for the still page, and deep marine for the endpapers. **There is exactly one dark chapter — `endpaper` — and it is entered and left through gradient bands rather than a hard edge.**

| # | `id` | Surface token | Hex | Why this stock | Rule treatment at its upper edge |
|---|---|---|---|---|---|
| 1 | `sticky-nav` | `--paper` @ 96% opacity | `#FBF8F2` | Solid paper at 96%, **never** `backdrop-filter`. Glass fails on the ₹15,000 Android target device and would break the no-material rule. | `0.25rem` `--rule-strong` **beneath** — the masthead rule, the heaviest rule on the page |
| 2 | `hero` | `--grad-paper-vignette` | `#FDFBF7 → #FBF8F2 → #F3EDE2` | The only vignette on the page. Lifts the top of the spread so the H1 sits on the brightest area without a box. | none — the masthead rule is the boundary |
| 3 | `colophon-strip` | `--paper-laid` | `#F3EDE2` | First stock change. Signals "this is a different kind of information" — evidence, not argument. | `0.0625rem` `--rule` hairline |
| 4 | `gazetteer` | `--paper` | `#FBF8F2` | Return to body stock for the longest reading surface in Explore. | `0.125rem` `--rule-strong` — chapter break into II |
| 5 | `register` | `--paper-laid` | `#F3EDE2` | Alternating spread; sets the partner list apart from the destination index. | `0.0625rem` `--rule` |
| 6 | `what-we-do` | `--paper` | `#FBF8F2` | Body stock; the FREE/PAID ledger is a table and wants the flattest available reading surface. | `0.0625rem` `--rule` |
| 7 | `still-page` | `--paper-still` | `#FDFBF7` | **Noon.** The flattest, brightest stock on the page, used once, for the chapter with zero motion. The brightness *is* the signal. | `0.125rem` `--rule-strong` — chapter break into III |
| 8 | `branch-atlas` | `--paper-still` | `#FDFBF7` | Continues the still stock so the map reads as part of the same held breath. | `0.0625rem` `--rule` |
| 9 | `contributors` | `--paper` | `#FBF8F2` | Returns to body stock; the cartouches carry their own `--paper-tracing` fields and need a contrasting bed. | `0.0625rem` `--rule` |
| 10 | `for-parents` | `--paper-warm` + wells in `--ochre-tint` | `#F7EFE1` / `#F7EDD8` | **Warm Laid**, used once, for the one chapter addressed to the buyer. The stock change *is* the tonal shift, alongside serif body and larger type. | `0.125rem` `--rule-strong` |
| 11 | `reckoning` | `--paper-tracing` | `#EDE5D7` | Tracing paper is the ledger bed. An accounting spread belongs on a working stock, not a presentation stock. | `0.125rem` `--rule-strong` — chapter break into IV |
| 12 | `eleven-months` | `--paper` | `#FBF8F2` | Body stock so the ruled calendar line and its ochre/sienna ticks read at maximum clarity. Plate B specimens sit on `--paper-tracing` fields inside it. | `0.125rem` `--rule-strong` — chapter break into V |
| 13 | `endpaper` | `--endpaper`, entered via `--grad-endpaper-turn` | `#0E2029` | **The one dark surface on the page**, earned narratively at the Success chapter. Raised elements inside it use `--endpaper-2` `#142E3A`. | The 30vh turn band replaces the rule entirely |
| 14 | `questions` | `--paper`, entered via `--grad-endpaper-return` | `#FBF8F2` | The page returns to paper for the questions. The 24vh return band is the page-turn back out of the endpapers. | The 24vh return band replaces the rule |
| 15 | `enquiry` | `--paper-tracing` | `#EDE5D7` | Form bed. Same working stock as the ledger — the two instruments on the page share a surface so they read as the same kind of object. | `0.0625rem` `--rule` |
| 16 | `colophon` | `--paper-laid` | `#F3EDE2` | Closing spread stock. | `0.125rem` `--rule-strong` at the top edge |
| — | `mobile-bar` | `--paper` @ 98% opacity | `#FBF8F2` | Solid, no blur. 98% rather than 96% because it sits over content at the bottom of a scrolling page where legibility beats transparency. | `0.0625rem` `--rule-strong` hairline at its **top** edge |

**Adjacency rule.** No two consecutive sections may share a surface token *unless* they are inside the same chapter and the pairing is deliberate — the only permitted repeat is `still-page` → `branch-atlas` on `--paper-still`, which exists so the Trust chapter's still moment reads as one continuous held surface rather than two sections.

### 1.2 Gradient usage map

**Exactly six gradients exist. No others are permitted, and no gradient may be authored inline.** Primary CTAs are solid `--sienna-press`, never gradient.

| Gradient | Exact recipe | Permitted only on | Explicitly forbidden |
|---|---|---|---|
| `--grad-paper-vignette` | `radial-gradient(120% 90% at 50% 0%, #FDFBF7 0%, #FBF8F2 45%, #F3EDE2 100%)` | `#hero` section background — the hero canvas, once. | Any other section; any card; any plate |
| `--grad-endpaper-turn` | `linear-gradient(180deg, #FBF8F2 0%, #1B3240 55%, #0E2029 100%)` | A **30vh band immediately above `#endpaper`**, painted on a single fixed backdrop div. No element moves during the scrub — the intensity is chromatic, not kinetic. | Any band of a different height; any element other than the fixed backdrop div |
| `--grad-endpaper-return` | `linear-gradient(180deg, #0E2029 0%, #1B3240 30%, #FBF8F2 100%)` | A **24vh band at the top of `#questions`**. | Anywhere else; any reuse as a section background |
| `--grad-plate-marine` | `linear-gradient(152deg, #0E2029 0%, #14384A 38%, #4A5A5E 68%, #C2562B 100%)` | The field of **Plate A** (`data-plate="field"`) only. | Buttons, section backgrounds, text fills, borders |
| `--grad-plate-laid` | `linear-gradient(152deg, #C7B9A1 0%, #EDE5D7 55%, #F3EDE2 100%)` | The field of **Plate D** (`data-plate="cartographic"`), and the light variant of Plate A used inside the Trust chapter where `--grad-plate-marine` would be too loud against `--paper-still`. | Plate B and Plate C, which are flat `--paper-tracing` by definition |
| `--grad-spine-fill` | `linear-gradient(180deg, #C2562B 0%, #D9A441 100%)` | The **chapter spine** in the outer gutter — the vertical progress rule that fills as the reader advances and re-typesets its label at each chapter boundary. | Progress bars inside components; the form's step rule (which is solid `--sienna-press`) |

**Plate A type-safe zone (binding).** `--grad-plate-marine` terminates at `#C2562B`, against which `--plate-white` measures **3.77:1** — below AA for normal text. All typographic content inside a Plate A field must therefore be positioned within the **0–68% band of the ramp**, where the darkest stop against `--plate-white` is `#4A5A5E` at **6.02:1**. In practice this means the coordinate/place/time block occupies the upper-left two-thirds of the plate and the sienna corner stays empty except for the SVG graticule. This is a layout constraint, not a suggestion; a comp that centres type on a Plate A fails review.

### 1.3 Plate and duotone treatment recipe

Every image slot on the page is a `<figure data-plate="field|specimen|cartouche|cartographic">` with a locked `aspect-ratio`, a keyline, a registration offset and a typeset caption block. In v2 a commissioned photograph drops into the identical box behind the identical caption with **zero layout shift and zero CSS change beyond the `data-plate` value**.

```
PLATE ANATOMY (all four treatments share this shell)

        ┌─────────────────────────────────────────┐
    ┌   │ ┌─┐                               ┌─┐   │ ┐  registration corners
    │   │ └ ┘                               └ ┘   │ │  (8px L-marks, --rule-strong,
    │   │                                         │ │   inset 4px)
    │   │                                         │ │
 locked │            THE FIELD                    │ │  1px --rule-strong keyline
 aspect │      (treatment-specific)               │ │
  ratio │                                         │ │
    │   │                                         │ │
    │   │ ┌─┐                               ┌─┐   │ │
    └   │ └─┘                               └─┘   │ ┘
        └─────────────────────────────────────────┘
          ╲  3px offset, 1px --sienna rule — the "shadow"
           ╲ (box-shadow: var(--reg-sienna), NOT a blur)
        ────────────────────────────────────────────  0.0625rem --rule
        PLATE I                                        --fs-mono-label, --ink-muted
        28.5562° N · 77.1000° E                        --fs-caption, --ink
        INDIRA GANDHI INTERNATIONAL, TERMINAL 3        --fs-caption, --ink-muted
        04:40 IST                                      --fs-caption, --ink-muted
```

| | **Plate A — field** | **Plate B — specimen** | **Plate C — cartouche** | **Plate D — cartographic** |
|---|---|---|---|---|
| **Aspect ratio** | `4 / 5` portrait (hero), `3 / 2` landscape (chapter openers) | `1 / 1.294` — ISO-A proportion, upright | `4 / 5` | `16 / 10` |
| **Field fill** | `--grad-plate-marine` | flat `--paper-tracing` | flat `--paper-tracing` | `--grad-plate-laid` |
| **Overlay** | SVG graticule, `stroke: #FFFFFF`, `stroke-opacity: 0.08`, 1px, 48px lattice; one large cartographic mark | hairline `--rule` field rules at 24px rhythm; `██████` redaction blocks in `--ink-muted`; ochre annotation leader to one clause | hairline contour ring (3 concentric arcs, `--rule`, non-uniform spacing) behind the monogram | simplified country coastline, `--marine` 1.5px stroke; crosshair on primary city, `--sienna` 1px; latitude ticks `--rule-strong` |
| **Type in field** | `PLATE I` `--fs-mono-label`; coordinates `--fs-caption`; place `--fs-d2` Newsreader; time `--fs-data` — all `--plate-white`, confined to the 0–68% ramp band | mono field labels `--fs-mono-label` `--ink-muted`; stamp `SPECIMEN · ILLUSTRATIVE · NOT A STUDENT RECORD` `--fs-mono-label` in `--clay`, rotated −4° | initials, **Newsreader 300 at 5rem**, `--ink`, optically centred | destination name `--fs-h4` `--ink` over the panel, upper-left |
| **Keyline** | 1px `--rule-strong` | 1px `--rule-strong`, radius `--r-1` (2px) | 1px `--rule-strong` | 1px `--rule-strong` |
| **Registration offset** | `--reg-sienna` | `--reg-rule` | `--reg-marine` | `--reg-rule` |
| **Caption block** | Plate number, coordinates, place, time | Document type + the annotated clause | `AVINASH · DELHI SOUTH · UK & IRELAND · 11 YEARS` | Destination + primary-city coordinates + the row's data line |
| **v2 photograph** | Yes — shots 1, 2, 3, 6, 9 | No — remains a facsimile permanently (DPDP) | Yes — shots 7, 10, 11, 12 | No — remains SVG permanently |

**Duotone recipe (v2 only).** Archival and secondary photography — the 2001 founding material, branch exteriors, historic offices — receives a systematic duotone: shadows mapped to `--marine` `#14384A`, highlights mapped to `--sienna` `#C2562B`, with a linear ramp between. It is **baked into the AVIF at build time and is never a runtime CSS `filter`**, because animated or live `filter` is banned outright and because a runtime filter costs GPU on the target device. Hero imagery is never duotoned. There is no `--plate-duotone` token; the treatment is a build-pipeline step, not a CSS value.

**SVG asset budget.** Fifteen destination coastline paths plus India-with-eighteen-nodes are the only bespoke assets v1 requires: **≤40KB gzipped total**. Paths are simplified to ≤400 points each, `stroke-linecap: butt`, `stroke-linejoin: miter`, `vector-effect: non-scaling-stroke` so hairlines survive scaling. Decorative SVG carries `aria-hidden="true"`; informative SVG (the India map) carries `role="img"` and an `<title>`.

### 1.4 Grain recipe

One baked paper-grain tile over the whole canvas. Static, never animated, never a live filter — it must survive Mali and Adreno GPUs.

```css
/* Page-level grain. Applied once, on a single ::after over the page frame. */
.page-frame::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: var(--z-base);
  pointer-events: none;
  background-image: url("/texture/paper-grain-256.avif");
  background-repeat: repeat;
  background-size: 256px 256px;
  mix-blend-mode: multiply;
  opacity: 0.04;
}

@media (prefers-reduced-transparency: reduce) {
  .page-frame::after { display: none; }
}
```

**Tile specification.** 256 × 256px, seam-matched (tiles must be verified by 4× repetition at 100% zoom with no visible grid), 8-bit greyscale noise, Gaussian sigma ≈ 0.35 with a mild 2px low-pass so the grain reads as paper fibre and not as digital noise, exported to AVIF at **≤8KB**. It is `position: fixed` so it does not scroll with content — paper texture belongs to the page, not to the passage. It sits at `--z-base` with `pointer-events: none` and therefore never intercepts a click. It is **never** applied per-section, per-card or per-plate; one instance, page-level, or it becomes a compositing cost multiplied by section count.

**Prohibitions.** No `filter: url(#noise)`. No SVG `feTurbulence` at runtime. No animated grain, no grain opacity transition, no per-scroll grain shift. Under `prefers-reduced-transparency: reduce` the layer is removed entirely rather than reduced, because a blend layer at any opacity is the thing the preference is asking to remove.

### 1.5 Depth model — the no-shadow registration-offset system

**There is no elevation shadow on any in-flow element on this page.** The Trust chapter headline — *Nothing here casts a shadow* — is a factual description of the CSS, and it is the sentence that kills the entire category's Bootstrap-card look.

Depth is produced by four devices, in this order of preference:

1. **Overlap.** A plate sits proud of its grid cell by 6–8px, breaking the column edge. Overlap reads as physical layering without a single shadow pixel.
2. **Scale.** An anchor cell is ≥2× the area of the largest supporting cell. Size difference is the strongest depth cue available and it costs nothing.
3. **Generous whitespace.** 20–30% inner whitespace per cell. Space around an object reads as space *behind* it.
4. **Print misregistration.** A 1px rule offset by 3px on the x and y axes — exactly like a two-colour press slightly out of register. This is the page's only "shadow", and it is a hard-edged offset rule, not a blur.

```css
/* Print misregistration — the ONLY "depth" on the page plane. */
--reg-sienna: 3px 3px 0 0 #C2562B;   /* Plate A, hero plate, anchor plates      */
--reg-marine: 3px 3px 0 0 #14384A;   /* Plate C cartouches, institutional blocks */
--reg-rule:   2px 2px 0 0 #C7B9A1;   /* Plate B, Plate D, ledger frame, quiet use */

/* Sole blurred shadow — modal/drawer surfaces ABOVE the page plane ONLY. */
--shadow-drawer:
  0 1px 2px rgba(23,19,16,0.05),
  0 24px 48px -20px rgba(23,19,16,0.22);
```

**Where each offset is licensed.** `--reg-sienna` on the hero plate, the four gazetteer anchor plates and any Plate A. `--reg-marine` on Plate C cartouches and the six accreditation blocks in `still-page`. `--reg-rule` on Plate B specimen sheets, Plate D panels, the ledger frame in `reckoning` and the specimen frame in `eleven-months`. **No registration offset on:** buttons, chips, inputs, nav, the mobile bar, table rows, the wordmark, or any text element.

**The single shadow exception.** `--shadow-drawer` is permitted **only** on the counsellor drawer and the branch drawer — surfaces that float above the page plane and must be legible as overlays. It appears at `--z-drawer` above a scrim at `--z-scrim`. It may not be applied to a sticky nav, a mobile bar, a dropdown, a tooltip, a toast, or any in-flow card.

**Absolute prohibitions restated.** No `backdrop-filter` anywhere on the page, including the sticky nav (solid `--paper` at 96% plus a hairline). No glassmorphism. No `box-shadow` with a blur radius outside `--shadow-drawer`. No animated `box-shadow` or `filter` — the motion contract permits `transform` and `opacity` only. Radii never exceed 4px except the CTA pill.

---

## 2. Design tokens

### 2.1 CSS custom properties

The complete, implementable token sheet. Every value is taken verbatim from the creative canon. Blocks marked **alias** introduce no new values — they are semantic names bound to canon tokens so components can be authored against intent rather than against a hex.

```css
/* ══════════════════════════════════════════════════════════════════
   GLOBAL OPPORTUNITIES · THE DEPARTURE ATLAS · VOL. XXV
   Token sheet — single source of truth.
   SPLIT-B must not author new tokens, radii, shadows, easings or type sizes.
   ══════════════════════════════════════════════════════════════════ */

:root {
  /* ── COLOR · light chapters ─────────────────────────────────── */
  --paper:            #FBF8F2;  /* Cartridge  · page canvas, default surface  */
  --paper-still:      #FDFBF7;  /* Noon       · still-page + branch-atlas ONLY */
  --paper-laid:       #F3EDE2;  /* Laid       · alternating section surface    */
  --paper-warm:       #F7EFE1;  /* Warm Laid  · for-parents ONLY               */
  --paper-tracing:    #EDE5D7;  /* Tracing    · inset panels, ledger, form bed */
  --rule:             #DDD2BF;  /* Rule       · hairline rules                 */
  --rule-strong:      #C7B9A1;  /* Rule Strong· chapter/masthead/table/plate   */

  --ink:              #171310;  /* Iron Gall  · primary type                   */
  --ink-muted:        #5C5247;  /* Ink Muted  · body, captions, secondary      */
  --ink-faint:        #8A7F72;  /* Ink Faint  · >=24px or >=18.66px bold, or non-text */

  --marine:           #14384A;  /* Institutional anchor: numerals, links, 2ry btn */
  --marine-mid:       #1B3240;  /* Gradient stop ONLY                          */

  --sienna:           #C2562B;  /* Accent: contour lines, registration, underline swell */
  --sienna-press:     #B24A22;  /* PRIMARY CTA FILL                            */
  --sienna-deep:      #8E3A1A;  /* CTA hover / active; sienna text on tracing  */
  --sienna-tint:      #F6E7DE;  /* Wells, selected chip background             */

  --ochre:            #D9A441;  /* Annotation highlight, GO Application Day ticks
                                   — NEVER text on paper                       */
  --ochre-tint:       #F7EDD8;  /* Annotation well; for-parents wells          */

  --verdigris:        #3E6B58;  /* Verified / cited / cleared, STATUS: GO      */
  --verdigris-tint:   #E7EFEA;  /* Cleared-status pill background              */

  --clay:             #9E3B24;  /* Real external deadlines, visa-refusal callouts */

  /* ── COLOR · dark chapter (endpaper only) ───────────────────── */
  --endpaper:         #0E2029;
  --endpaper-2:       #142E3A;
  --plate-white:      #F0EAE0;
  --plate-grey:       #A8A096;
  --plate-rule:       #2A3E48;
  --sienna-on-dark:   #E0794A;
  --ochre-on-dark:    #E8B75C;
  --verdigris-on-dark:#6FA98F;

  /* ── GRADIENTS · exactly six. No others permitted. ──────────── */
  --grad-paper-vignette:  radial-gradient(120% 90% at 50% 0%, #FDFBF7 0%, #FBF8F2 45%, #F3EDE2 100%);
  --grad-endpaper-turn:   linear-gradient(180deg, #FBF8F2 0%, #1B3240 55%, #0E2029 100%);
  --grad-endpaper-return: linear-gradient(180deg, #0E2029 0%, #1B3240 30%, #FBF8F2 100%);
  --grad-plate-marine:    linear-gradient(152deg, #0E2029 0%, #14384A 38%, #4A5A5E 68%, #C2562B 100%);
  --grad-plate-laid:      linear-gradient(152deg, #C7B9A1 0%, #EDE5D7 55%, #F3EDE2 100%);
  --grad-spine-fill:      linear-gradient(180deg, #C2562B 0%, #D9A441 100%);

  /* ── TYPEFACES (bound by next/font/google) ──────────────────── */
  --font-display: var(--font-newsreader);       /* Newsreader, opsz axis, true italic */
  --font-ui:      var(--font-hanken);           /* Hanken Grotesk variable            */
  --font-mono:    var(--font-plex-mono);        /* IBM Plex Mono 400/500 — FACT ONLY  */
  --font-deva:    var(--font-plex-deva);        /* IBM Plex Sans Devanagari, on demand */

  /* Static per-chapter optical size. Set once on the chapter root, NEVER scrubbed. */
  --nr-opsz: 60;                                 /* root default (nav, colophon)      */

  /* ── TYPE SCALE ─────────────────────────────────────────────── */
  --fs-d0:          clamp(3.25rem, 8.4vw, 7.5rem);
  --lh-d0:          0.92;    --ls-d0:          -0.025em;
  --fs-d1:          clamp(2.25rem, 4.8vw, 4rem);
  --lh-d1:          1.04;    --ls-d1:          -0.018em;
  --fs-d2:          clamp(1.625rem, 2.8vw, 2.5rem);
  --lh-d2:          1.12;    --ls-d2:          -0.012em;
  --fs-h4:          clamp(1.25rem, 1.6vw, 1.5rem);
  --lh-h4:          1.25;    --ls-h4:          -0.005em;
  --fs-deck:        clamp(1.25rem, 1.9vw, 1.625rem);
  --lh-deck:        1.42;    --ls-deck:        0;
  --fs-quote:       clamp(1.375rem, 2.2vw, 1.875rem);
  --lh-quote:       1.34;    --ls-quote:       0;
  --fs-serif-body:  1.125rem;
  --lh-serif-body:  1.72;    --ls-serif-body:  0;
  --fs-body:        1.0625rem;
  --lh-body:        1.62;    --ls-body:        0;
  --fs-body-sm:     0.9375rem;
  --lh-body-sm:     1.55;    --ls-body-sm:     0;
  --fs-figure:      clamp(2rem, 4vw, 3.25rem);
  --lh-figure:      1.0;     --ls-figure:      -0.01em;
  --fs-data:        0.9375rem;
  --lh-data:        1.5;     --ls-data:        0;
  --fs-label:       0.6875rem;
  --lh-label:       1.3;     --ls-label:       0.14em;
  --fs-mono-label:  0.6875rem;
  --lh-mono-label:  1.3;     --ls-mono-label:  0.10em;
  --fs-caption:     0.75rem;
  --lh-caption:     1.45;    --ls-caption:     0.04em;
  --fs-footnote:    0.8125rem;
  --lh-footnote:    1.5;     --ls-footnote:    0;

  /* ── SPACING ────────────────────────────────────────────────── */
  --s-1: 0.25rem;  --s-2: 0.5rem;  --s-3: 0.75rem; --s-4: 1rem;
  --s-5: 1.5rem;   --s-6: 2rem;    --s-7: 3rem;    --s-8: 4rem;
  --s-9: 6rem;     --s-10: 8rem;   --s-11: 10rem;  --s-12: 14rem;

  --section-y:       clamp(5rem, 10vw, 9rem);
  --section-y-tight: clamp(3rem, 6vw, 5rem);
  --gutter:          clamp(1.25rem, 4vw, 4rem);
  --grid-gap:        clamp(1rem, 2vw, 2rem);

  /* ── CONTAINERS & GRID ──────────────────────────────────────── */
  --frame-max:     1600px;
  --content-max:   1200px;
  --measure-prose: 66ch;
  --measure-serif: 62ch;
  --measure-deck:  52ch;
  --rail:          96px;
  --rail-md:       64px;
  --grid-cols:     12;

  /* ── RULE WEIGHTS (ink weights) ─────────────────────────────── */
  --rule-hairline: 0.0625rem;   /* margins, dividers   */
  --rule-chapter:  0.125rem;    /* chapter breaks      */
  --rule-masthead: 0.25rem;     /* the masthead rule   */

  /* ── RADII · nothing exceeds 4px except the CTA pill ────────── */
  --r-0: 0;        /* rules, plates, ledger, tables — the DEFAULT */
  --r-1: 2px;      /* plate keylines, specimen sheets             */
  --r-2: 4px;      /* chips, inputs, selects, status pills        */
  --r-pill: 999px; /* CTA buttons ONLY                            */

  /* ── DEPTH ──────────────────────────────────────────────────── */
  --reg-sienna: 3px 3px 0 0 #C2562B;
  --reg-marine: 3px 3px 0 0 #14384A;
  --reg-rule:   2px 2px 0 0 #C7B9A1;
  --shadow-drawer: 0 1px 2px rgba(23,19,16,0.05), 0 24px 48px -20px rgba(23,19,16,0.22);

  /* ── EASING ─────────────────────────────────────────────────── */
  --ease-quad:  cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* power1.out  */
  --ease-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);   /* power2.out  */
  --ease-quart: cubic-bezier(0.165, 0.84, 0.44, 1);    /* power3.out  */
  --ease-expo:  cubic-bezier(0.19, 1, 0.22, 1);        /* expo.out    */
  --ease-inout: cubic-bezier(0.65, 0, 0.35, 1);        /* power2.inOut*/
  --ease-press: cubic-bezier(0.34, 1.4, 0.64, 1);      /* back.out(1.4) */

  /* ── DURATION ───────────────────────────────────────────────── */
  --dur-1: 120ms;   --dur-2: 200ms;  --dur-3: 320ms;
  --dur-4: 480ms;   --dur-5: 700ms;  --dur-hero: 900ms;
  --stagger-tight: 0.045s; --stagger: 0.08s; --stagger-loose: 0.12s;

  /* ── Z-INDEX ────────────────────────────────────────────────── */
  --z-base: 0;      --z-raised: 10;   --z-rail: 20;    --z-nav: 30;
  --z-mobilebar: 40;--z-scrim: 50;    --z-drawer: 60;  --z-toast: 70;
  --z-skiplink: 80;

  /* ── SEMANTIC ALIASES (no new values) ───────────────────────── */
  --surface:        var(--paper);
  --surface-raised: var(--paper-tracing);
  --text:           var(--ink);
  --text-muted:     var(--ink-muted);
  --text-faint:     var(--ink-faint);
  --link:           var(--marine);
  --divider:        var(--rule);
  --divider-strong: var(--rule-strong);
  --focus-ring:     var(--sienna-press);
  --state-verified: var(--verdigris);
  --state-external: var(--clay);
  --field-stroke:   var(--ink-muted);   /* see §2.3 note 3 — SC 1.4.11 */
}

/* ── Per-chapter static optical size ──────────────────────────── */
[data-chapter="dream"],
[data-chapter="success"]   { --nr-opsz: 72; }
[data-chapter="explore"],
[data-chapter="choose"],
[data-chapter="apply"]     { --nr-opsz: 60; }
[data-chapter="trust"]     { --nr-opsz: 44; }

/* ── The dark chapter: remap semantic aliases, never raw tokens ─ */
[data-surface="dark"] {
  --surface:        var(--endpaper);
  --surface-raised: var(--endpaper-2);
  --text:           var(--plate-white);
  --text-muted:     var(--plate-grey);
  --text-faint:     var(--plate-grey);
  --link:           var(--ochre-on-dark);
  --divider:        var(--plate-rule);
  --divider-strong: var(--plate-rule);
  --focus-ring:     var(--ochre-on-dark);
  --state-verified: var(--verdigris-on-dark);
  --state-external: var(--sienna-on-dark);
}

/* ── Numerals: non-negotiable ─────────────────────────────────── */
.mono, [data-mono], .figure, table td, table th {
  font-variant-numeric: tabular-nums lining-nums slashed-zero;
}

/* ── Focus ────────────────────────────────────────────────────── */
:focus { outline: none; }
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
  border-radius: inherit;
}
@media (prefers-contrast: more) { :focus-visible { outline-width: 3px; } }
```

**Font loading, verbatim from the canon.**

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

**Font budget ≤ 82KB woff2 total; preloaded faces ≤ 46KB.** If the budget breaks in build, the required remedy is a `unicode-range` subset of IBM Plex Mono covering `0-9 A-Z . , : · – — / % + ° ₹ £ $ €` (~9KB). **Do not drop Newsreader italic** — the italic deck is a brand signature.

**The mono law, restated as a lint rule.** IBM Plex Mono is reserved for verified fact: numbers, dates, costs, deadlines, coordinates, station labels, citations. *If it is set in mono, we can prove it.* A marketing adjective set in mono fails review. Every mono figure carries a superscript resolving to the Sources & Methods registry.

**Letterspaced uppercase** is reserved exclusively for running heads, captions, data labels, stamps and footnote refs — never headlines, never CTAs, never body.

### 2.2 Tailwind v4 `@theme` block

```css
@import "tailwindcss";

@theme {
  /* ── Colors ─────────────────────────────────────────────────── */
  --color-paper:            #FBF8F2;
  --color-paper-still:      #FDFBF7;
  --color-paper-laid:       #F3EDE2;
  --color-paper-warm:       #F7EFE1;
  --color-paper-tracing:    #EDE5D7;
  --color-rule:             #DDD2BF;
  --color-rule-strong:      #C7B9A1;
  --color-ink:              #171310;
  --color-ink-muted:        #5C5247;
  --color-ink-faint:        #8A7F72;
  --color-marine:           #14384A;
  --color-marine-mid:       #1B3240;
  --color-sienna:           #C2562B;
  --color-sienna-press:     #B24A22;
  --color-sienna-deep:      #8E3A1A;
  --color-sienna-tint:      #F6E7DE;
  --color-ochre:            #D9A441;
  --color-ochre-tint:       #F7EDD8;
  --color-verdigris:        #3E6B58;
  --color-verdigris-tint:   #E7EFEA;
  --color-clay:             #9E3B24;
  --color-endpaper:         #0E2029;
  --color-endpaper-2:       #142E3A;
  --color-plate-white:      #F0EAE0;
  --color-plate-grey:       #A8A096;
  --color-plate-rule:       #2A3E48;
  --color-sienna-on-dark:   #E0794A;
  --color-ochre-on-dark:    #E8B75C;
  --color-verdigris-on-dark:#6FA98F;

  /* ── Font families ──────────────────────────────────────────── */
  --font-display: var(--font-newsreader), Georgia, "Times New Roman", serif;
  --font-ui:      var(--font-hanken), system-ui, -apple-system, sans-serif;
  --font-mono:    var(--font-plex-mono), ui-monospace, "SFMono-Regular", monospace;
  --font-deva:    var(--font-plex-deva), "Noto Sans Devanagari", sans-serif;

  /* ── Type scale (size + line-height + tracking) ─────────────── */
  --text-d0: clamp(3.25rem, 8.4vw, 7.5rem);
  --text-d0--line-height: 0.92;
  --text-d0--letter-spacing: -0.025em;
  --text-d1: clamp(2.25rem, 4.8vw, 4rem);
  --text-d1--line-height: 1.04;
  --text-d1--letter-spacing: -0.018em;
  --text-d2: clamp(1.625rem, 2.8vw, 2.5rem);
  --text-d2--line-height: 1.12;
  --text-d2--letter-spacing: -0.012em;
  --text-h4: clamp(1.25rem, 1.6vw, 1.5rem);
  --text-h4--line-height: 1.25;
  --text-h4--letter-spacing: -0.005em;
  --text-deck: clamp(1.25rem, 1.9vw, 1.625rem);
  --text-deck--line-height: 1.42;
  --text-quote: clamp(1.375rem, 2.2vw, 1.875rem);
  --text-quote--line-height: 1.34;
  --text-serif-body: 1.125rem;
  --text-serif-body--line-height: 1.72;
  --text-body: 1.0625rem;
  --text-body--line-height: 1.62;
  --text-body-sm: 0.9375rem;
  --text-body-sm--line-height: 1.55;
  --text-figure: clamp(2rem, 4vw, 3.25rem);
  --text-figure--line-height: 1;
  --text-figure--letter-spacing: -0.01em;
  --text-data: 0.9375rem;
  --text-data--line-height: 1.5;
  --text-label: 0.6875rem;
  --text-label--line-height: 1.3;
  --text-label--letter-spacing: 0.14em;
  --text-mono-label: 0.6875rem;
  --text-mono-label--line-height: 1.3;
  --text-mono-label--letter-spacing: 0.10em;
  --text-caption: 0.75rem;
  --text-caption--line-height: 1.45;
  --text-caption--letter-spacing: 0.04em;
  --text-footnote: 0.8125rem;
  --text-footnote--line-height: 1.5;

  /* ── Spacing (named steps mirror --s-1 … --s-12) ────────────── */
  --spacing-1: 0.25rem;  --spacing-2: 0.5rem;  --spacing-3: 0.75rem;
  --spacing-4: 1rem;     --spacing-5: 1.5rem;  --spacing-6: 2rem;
  --spacing-7: 3rem;     --spacing-8: 4rem;    --spacing-9: 6rem;
  --spacing-10: 8rem;    --spacing-11: 10rem;  --spacing-12: 14rem;
  --spacing-section:       clamp(5rem, 10vw, 9rem);
  --spacing-section-tight: clamp(3rem, 6vw, 5rem);
  --spacing-gutter:        clamp(1.25rem, 4vw, 4rem);
  --spacing-grid-gap:      clamp(1rem, 2vw, 2rem);
  --spacing-rail:          96px;
  --spacing-rail-md:       64px;

  /* ── Containers & measures ──────────────────────────────────── */
  --container-frame:   1600px;
  --container-content: 1200px;
  --container-prose:   66ch;
  --container-serif:   62ch;
  --container-deck:    52ch;

  /* ── Breakpoints ────────────────────────────────────────────── */
  --breakpoint-xs: 480px;
  --breakpoint-sm: 768px;
  --breakpoint-md: 1024px;
  --breakpoint-lg: 1280px;
  --breakpoint-xl: 1600px;

  /* ── Radii ──────────────────────────────────────────────────── */
  --radius-0: 0px;
  --radius-1: 2px;
  --radius-2: 4px;
  --radius-pill: 999px;

  /* ── Depth (registration offsets, not elevation) ────────────── */
  --shadow-reg-sienna: 3px 3px 0 0 #C2562B;
  --shadow-reg-marine: 3px 3px 0 0 #14384A;
  --shadow-reg-rule:   2px 2px 0 0 #C7B9A1;
  --shadow-drawer: 0 1px 2px rgb(23 19 16 / 0.05), 0 24px 48px -20px rgb(23 19 16 / 0.22);

  /* ── Easing ─────────────────────────────────────────────────── */
  --ease-quad:  cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-expo:  cubic-bezier(0.19, 1, 0.22, 1);
  --ease-inout: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-press: cubic-bezier(0.34, 1.4, 0.64, 1);

  /* ── Duration ───────────────────────────────────────────────── */
  --duration-1: 120ms;  --duration-2: 200ms;  --duration-3: 320ms;
  --duration-4: 480ms;  --duration-5: 700ms;  --duration-hero: 900ms;

  /* ── There are NO --animate-* keyframes in this theme.
        The page contains no infinite animation anywhere. ─────── */
}

/* Gradients are not a Tailwind namespace; expose them as utilities. */
@utility bg-paper-vignette  { background-image: var(--grad-paper-vignette); }
@utility bg-endpaper-turn   { background-image: var(--grad-endpaper-turn); }
@utility bg-endpaper-return { background-image: var(--grad-endpaper-return); }
@utility bg-plate-marine    { background-image: var(--grad-plate-marine); }
@utility bg-plate-laid      { background-image: var(--grad-plate-laid); }
@utility bg-spine-fill      { background-image: var(--grad-spine-fill); }
@utility tabular            { font-variant-numeric: tabular-nums lining-nums slashed-zero; }
```

> **Note.** The Tailwind theme deliberately omits an `--animate-*` namespace. Any `animate-*` utility appearing in the codebase is a build failure: the page contains **zero infinite animations**, and Tailwind's animation utilities are all `infinite` by default.

### 2.3 WCAG contrast verification

All ratios below are **computed** from the canon hex values using the WCAG 2.x relative-luminance formula (sRGB, 8-bit, `c ≤ 0.04045 → c/12.92`, else `((c+0.055)/1.055)^2.4`; `L = 0.2126R + 0.7152G + 0.0722B`; ratio `= (L₁+0.05)/(L₂+0.05)`), rounded to two decimals. Thresholds: **AA normal text 4.5:1**, **AA large text 3:1** (≥24px, or ≥18.66px bold), **AA non-text / UI boundary / focus indicator 3:1** (SC 1.4.11), **AAA normal 7:1**.

#### A. Ink on light surfaces

| Foreground | `--paper` `#FBF8F2` | `--paper-still` `#FDFBF7` | `--paper-laid` `#F3EDE2` | `--paper-warm` `#F7EFE1` | `--paper-tracing` `#EDE5D7` | Verdict |
|---|---|---|---|---|---|---|
| `--ink` `#171310` | **17.42** | **17.87** | **15.85** | **16.17** | **14.77** | AAA everywhere |
| `--ink-muted` `#5C5247` | **7.20** | **7.38** | **6.55** | **6.68** | **6.10** | AA everywhere; AAA on `--paper`/`--paper-still` |
| `--ink-faint` `#8A7F72` | 3.70 | 3.79 | 3.36 | 3.43 | **3.13** | **Large text / non-text only.** Fails AA normal on every surface. Canon already restricts it |
| `--marine` `#14384A` | **11.69** | **11.99** | **10.64** | **10.85** | **9.91** | AAA everywhere — safe for links |
| `--marine-mid` `#1B3240` | 12.56 | 12.89 | 11.43 | 11.66 | 10.65 | Gradient stop only; not used as text |
| `--sienna` `#C2562B` | 4.25 | 4.36 | **3.87** | **3.95** | **3.60** | **Fails AA normal on all five.** Non-text and large-text only — see note 2 |
| `--sienna-press` `#B24A22` | **5.09** | **5.22** | **4.63** | **4.72** | **4.31** | AA normal on four; **fails on `--paper-tracing`** — see note 2 |
| `--sienna-deep` `#8E3A1A` | **7.15** | **7.33** | **6.51** | **6.64** | **6.06** | AA everywhere; AAA on `--paper`/`--paper-still` |
| `--ochre` `#D9A441` | 2.12 | 2.18 | 1.93 | 1.97 | 1.80 | **Never text on paper.** Fails non-text 3:1 too — see note 4 |
| `--verdigris` `#3E6B58` | **5.74** | **5.89** | **5.23** | **5.33** | **4.87** | AA normal everywhere |
| `--clay` `#9E3B24` | **6.38** | **6.54** | **5.80** | **5.92** | **5.41** | AA normal everywhere |
| `--rule` `#DDD2BF` | 1.41 | 1.45 | 1.28 | 1.31 | 1.20 | Decorative hairline only — see note 3 |
| `--rule-strong` `#C7B9A1` | 1.82 | 1.87 | 1.66 | 1.69 | 1.54 | Decorative/structural rule and plate keyline only — see note 3 |

#### B. Ink on tinted wells

| Foreground | `--sienna-tint` `#F6E7DE` | `--ochre-tint` `#F7EDD8` | `--verdigris-tint` `#E7EFEA` | Verdict |
|---|---|---|---|---|
| `--ink` | **15.31** | **15.88** | **15.77** | AAA |
| `--ink-muted` | **6.32** | **6.56** | **6.51** | AA normal |
| `--ink-faint` | 3.25 | 3.37 | 3.35 | Large/non-text only |
| `--marine` | **10.27** | **10.66** | **10.58** | AAA |
| `--sienna-press` | **4.47** | **4.64** | **4.60** | Marginal on `--sienna-tint` (4.47 < 4.5) — use `--sienna-deep` there |
| `--sienna-deep` | **6.28** | **6.52** | **6.47** | AA normal — the correct sienna for text on any tint |
| `--verdigris` | **5.05** | **5.24** | **5.20** | AA normal — `STATUS: GO` on `--verdigris-tint` passes |
| `--clay` | **5.61** | **5.82** | **5.78** | AA normal |

#### C. Type on fills and CTAs

| Pairing | Ratio | Threshold | Verdict |
|---|---|---|---|
| `#FFFFFF` on `--sienna-press` (primary CTA, resting) | **5.39** | 4.5 | **PASS** — matches the canon's stated 5.4:1 exactly |
| `#FFFFFF` on `--sienna-deep` (primary CTA, hover/active) | **7.58** | 4.5 | PASS, AAA |
| `--paper` on `--sienna-press` | **5.09** | 4.5 | PASS — permitted as a warmer alternative to pure white |
| `#FFFFFF` on `--marine` (secondary filled, colophon marks) | **12.39** | 4.5 | PASS, AAA |
| `#FFFFFF` on `--clay` (visa-refusal callout) | **6.76** | 4.5 | PASS |
| `#FFFFFF` on `--verdigris` (cleared pill, filled variant) | **6.09** | 4.5 | PASS |
| `--ink` on `--ochre` (annotation highlight with ink type over it) | **8.21** | 4.5 | PASS — ochre is safe as a *background*, never as ink |
| `--ink` on `--rule-strong` | **9.57** | 4.5 | PASS — ledger header band |
| `--marine` on `--sienna-tint` (selected chip label) | **10.27** | 4.5 | PASS |

#### D. The dark chapter

| Foreground | `--endpaper` `#0E2029` | `--endpaper-2` `#142E3A` | `--plate-rule` `#2A3E48` | Verdict |
|---|---|---|---|---|
| `--plate-white` `#F0EAE0` | **13.96** | **11.85** | **9.33** | AAA everywhere |
| `--plate-grey` `#A8A096` | **6.47** | **5.49** | 4.32 | AA on both canvases; **large-text only over `--plate-rule`** |
| `--sienna-on-dark` `#E0794A` | **5.57** | **4.73** | 3.72 | AA normal on both canvases; large-text only over `--plate-rule` |
| `--ochre-on-dark` `#E8B75C` | **9.03** | **7.67** | **6.04** | AAA on `--endpaper`; AA everywhere. Correct focus-ring colour on dark |
| `--verdigris-on-dark` `#6FA98F` | **6.16** | **5.23** | 4.12 | AA normal on both canvases; large-text only over `--plate-rule` |
| `--ochre` `#D9A441` (light-chapter token) | 7.43 | 6.30 | 4.96 | Passes, but **do not use** — the dark chapter has its own token |
| `--sienna` `#C2562B` (light-chapter token) | 3.71 | 3.15 | 2.48 | **Fails AA normal.** Never use the light sienna on dark; `--sienna-on-dark` exists for this |

#### E. Plate A field — type over `--grad-plate-marine`

| Ramp stop | Position | `--plate-white` on it | Verdict |
|---|---|---|---|
| `#0E2029` | 0% | **13.96** | Safe |
| `#14384A` | 38% | **10.36** | Safe |
| `#4A5A5E` | 68% | **6.02** | Safe — this is the **worst case inside the type-safe zone** |
| `#C2562B` | 100% | **3.77** | **FAILS AA normal.** No type may cross the 68% mark. Large text (≥24px) would pass at 3.77, but the plate's caption metadata is small — the ban is absolute for simplicity |

#### F. Non-text, boundaries and focus indicators (SC 1.4.11 · 3:1)

| Element | Colour vs surface | Ratio | Verdict |
|---|---|---|---|
| Focus ring `--sienna-press` on `--paper` | `#B24A22` vs `#FBF8F2` | **5.09** | PASS |
| Focus ring `--sienna-press` on `--paper-still` | | **5.22** | PASS |
| Focus ring `--sienna-press` on `--paper-laid` | | **4.63** | PASS |
| Focus ring `--sienna-press` on `--paper-warm` | | **4.72** | PASS |
| Focus ring `--sienna-press` on `--paper-tracing` | | **4.31** | PASS |
| Focus ring `--sienna-press` on `--sienna-tint` | | **4.47** | PASS |
| Focus ring `--ochre-on-dark` on `--endpaper` | `#E8B75C` vs `#0E2029` | **9.03** | PASS |
| Focus ring `--ochre-on-dark` on `--paper` | `#E8B75C` vs `#FBF8F2` | **1.74** | **FAIL** — see note 1 |
| Registration offset `--reg-sienna` on `--paper` | `#C2562B` vs `#FBF8F2` | **4.25** | PASS |
| Registration offset `--reg-marine` on `--paper` | `#14384A` vs `#FBF8F2` | **11.69** | PASS |
| Registration offset `--reg-rule` on `--paper` | `#C7B9A1` vs `#FBF8F2` | 1.82 | Decorative — carries no information, exempt |
| Plate keyline `--rule-strong` on `--paper` | | 1.82 | Decorative frame — exempt |
| Form field stroke `--ink-muted` on `--paper-tracing` | `#5C5247` vs `#EDE5D7` | **6.10** | PASS — see note 3 |
| Error stroke `--clay` on `--paper-tracing` | `#9E3B24` vs `#EDE5D7` | **5.41** | PASS |
| GO Application Day tick `--ochre` on `--paper` | `#D9A441` vs `#FBF8F2` | **2.12** | **FAIL as sole carrier** — see note 4 |
| Cited-deadline tick `--sienna` on `--paper` | `#C2562B` vs `#FBF8F2` | **4.25** | PASS |
| Progress rule `--sienna-press` on `--paper-tracing` | | **4.31** | PASS |

#### Notes and resolutions

**Note 1 — the focus-ring override must be scoped to the surface, not the chapter.** The canon writes `[data-chapter="success"] :focus-visible { outline-color: var(--ochre-on-dark); }`. Three sections carry `data-chapter="success"`: `endpaper` (dark), `questions` (`--paper`) and `enquiry` (`--paper-tracing`). On `--paper`, `--ochre-on-dark` measures **1.74:1** and on `--paper-tracing` **1.48:1** — both fail SC 1.4.11 catastrophically. **Resolution:** key the override on the surface instead, `[data-surface="dark"] :focus-visible`, which is exactly what the canon intends ("the dark chapter's focus ring") and which the alias block in §2.1 already implements via `--focus-ring`. `questions` and `enquiry` keep `--sienna-press`. No token value changes.

**Note 2 — sienna as text.** The canon assigns `--sienna` the role "contour lines, footnote markers, registration offset, underline swell". Contour lines, offsets and underline swells are non-text and pass at 4.25:1 on `--paper`. **Footnote markers are text**, and `--sienna` fails AA normal on all five light surfaces (3.60–4.36). **Resolution, staying inside canon tokens:** footnote markers and any other sienna *text* use `--sienna-press` on `--paper`/`--paper-still`/`--paper-laid`/`--paper-warm` (4.63–5.22, all PASS), and `--sienna-deep` on `--paper-tracing` and all three tints (6.06–6.52, all PASS). `--sienna-press` as *text* on `--paper-tracing` is 4.31 and is therefore also replaced by `--sienna-deep` on that surface. `--sienna` itself is retained for strictly non-text use. This preserves the visual family exactly — three sienna values already exist in the canon for this reason.

**Note 3 — `--rule` cannot serve as an input border.** The canon lists `--rule` as "hairline rules, plate keylines, input borders". At 1.41:1 on `--paper` and 1.20:1 on `--paper-tracing`, it fails the 3:1 boundary requirement for a form control. **Resolution:** form controls live on `--paper-tracing` (the `enquiry` surface) and are **ruled, not boxed** — the field-identifying stroke is a 1px bottom rule in `--ink-muted` at **6.10:1**, exposed as the `--field-stroke` alias. This matches the concept's own "ruled-line form" language. `--rule` is retained for decorative hairlines and interior plate rules, which carry no information and are exempt. The canon's plate-keyline assignment is also reconciled here: the *outer* plate keyline is `--rule-strong` (stated twice in the canon's art-direction prose), and `--rule` is used for interior and caption rules.

**Note 4 — ochre ticks are never the sole carrier of information.** `--ochre` at 2.12:1 on `--paper` fails even the non-text threshold, and the canon already says "never text on paper". Because the `eleven-months` ticks encode a category (GO Application Day vs cited third-party deadline), colour alone would be a 1.4.1 *and* 1.4.11 failure. **Resolution:** every tick carries (a) a 1px `--ink-muted` stem drawn to the calendar rule, (b) a mono date label in `--ink` (17.42:1), and (c) a mono category label — `GO APPLICATION DAY` or `CITED DEADLINE`. Ochre supplies category redundantly, never uniquely. The higher-stakes category, cited external deadlines, uses `--sienna` at 4.25:1, which passes the non-text threshold on its own.

**Note 5 — divergences between canon-stated and computed ratios.** The canon annotates several tokens with a ratio. Where the canon's figure is *conservative*, the canon's figure may be quoted in client-facing material; where it is *optimistic*, the computed figure governs. All divergences remain AA-passing at their stated usage.

| Token | Canon states | Computed | Direction | Consequence |
|---|---|---|---|---|
| `--ink` on `--paper` | 17:1 | 17.42 | conservative | none |
| `--ink-muted` on `--paper` | 6.8:1 | 7.20 | conservative | none — it is in fact AAA |
| `--ink-faint` on `--paper` | 3.4:1 | 3.70 | conservative | none — restriction stands regardless |
| `--marine` on `--paper` | 11.7:1 | 11.69 | exact | none |
| white on `--sienna-press` | 5.4:1 | 5.39 | exact | none |
| `--verdigris` on `--paper` | 5.8:1 | 5.74 | ~exact | none |
| `--clay` on `--paper` | 6.1:1 | 6.38 | conservative | none |
| `--ochre` on `--paper` | 2.1:1 | 2.12 | exact | none |
| `--plate-white` on `--endpaper` | ~15:1 | **13.96** | optimistic | none — still AAA |
| `--plate-grey` on `--endpaper` | 6.4:1 | 6.47 | exact | none |
| `--sienna-on-dark` on `--endpaper` | 7.0:1 | **5.57** | **optimistic** | Still AA normal. **Not AAA** — do not claim AAA for accent type on the endpaper, and do not use it over `--endpaper-2` at sizes below 16px without checking (4.73) |
| `--ochre-on-dark` on `--endpaper` | 9.4:1 | 9.03 | slightly optimistic | none — still AAA |
| `--verdigris-on-dark` on `--endpaper` | 7.3:1 | **6.16** | **optimistic** | Still AA normal; not AAA |

**Note 6 — text-size gates that follow from the above.** `--ink-faint` is permitted at ≥24px, or ≥18.66px bold, or as non-text — which excludes it from `--fs-footnote` (13px), `--fs-caption` (12px), `--fs-body-sm` (15px) and `--fs-data` (15px). The marginalia rail therefore sets footnotes in `--ink-muted` (7.20:1), exactly as the canon's type-scale table specifies. `--ink-faint` survives only on `--fs-figure` (32–52px) and on non-text marks.

---

## 3. Grid & layout

### 3.1 The twelve-column spec

A single twelve-column grid governs the entire page. It is declared once on the section shell and inherited; components address columns, never pixels.

```
FRAME (max 1600px)
│
├─ --gutter ──┤                                                      ├── --gutter ──┤
              ┌────────────────────────────────────────┐  gap  ┌─────┐
              │  CONTENT COLUMN  (max 1200px)          │ --s-6 │RAIL │
              │  12 tracks, --grid-gap between         │       │96px │
              │  ┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐ │       │     │
              │  │ 1│ 2│ 3│ 4│ 5│ 6│ 7│ 8│ 9│10│11│12│ │       │ ¹²³ │
              │  └──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘ │       │     │
              └────────────────────────────────────────┘       └─────┘
              ◄── recto: cols 1–7 ──►    ◄─ verso: cols 9–12 ─►
```

```css
.section-shell {
  display: grid;
  grid-template-columns:
    [full-start] var(--gutter)
    [content-start] repeat(var(--grid-cols), minmax(0, 1fr)) [content-end]
    var(--gutter) [full-end];
  column-gap: var(--grid-gap);
  max-inline-size: var(--frame-max);
  margin-inline: auto;
}
@media (min-width: 1024px) {
  .section-shell {
    grid-template-columns:
      [full-start] minmax(var(--gutter), 1fr)
      [content-start] repeat(var(--grid-cols), minmax(0, calc(var(--content-max) / 12)))
      [content-end] var(--s-6) [rail-start] var(--rail-md) [rail-end]
      minmax(var(--gutter), 1fr) [full-end];
  }
}
@media (min-width: 1280px) {
  .section-shell { --rail-md: var(--rail); } /* 64px → 96px */
}
```

**Computed track widths.** All figures assume `--frame-max: 1600px`, `--content-max: 1200px`, `--grid-cols: 12`.

| Viewport | `--gutter` | `--grid-gap` | Rail + gap | Content column | One track | Notes |
|---|---|---|---|---|---|---|
| 1600px | 64px | 32px | 96 + 32 = 128 | **1200px** (capped) | **70.7px** | The design reference width |
| 1440px | 57.6px | 32px | 128 | 1196.8px | 70.4px | Primary desktop comp width |
| 1280px | 51.2px | 25.6px | 128 | 1049.6px | 64.0px | Rail becomes 96px exactly at this breakpoint |
| 1024px | 41.0px | 20.5px | 64 + 20.5 = 84.5 | 857.6px | 52.7px | Rail drops to 64px; pinning and rail both begin here |
| 768px | 30.7px | 15.4px | — (no rail) | 706.6px | 44.8px | Gazetteer collapses to tap-accordion below this |
| 480px | 20px | 16px | — | 440px | **4-col grid**: 98px | The 12-track grid collapses to 4 tracks |
| 390px | 20px | 16px | — | 350px | **4-col grid**: 75.5px | Reference mobile comp width |

**Canonical spans.** The hero spread is `recto = cols 1–7`, `verso = cols 9–12`, with col 8 empty — the gutter of the book. Prose blocks are capped by measure, not by span: `--measure-prose` 66ch for Hanken body, `--measure-serif` 62ch for the For-Parents serif body, `--measure-deck` 52ch for the hero deck. Where measure and span disagree, **measure wins**.

### 3.2 Container widths

| Token | Value | What it bounds |
|---|---|---|
| `--frame-max` | `1600px` | The outer page frame, including gutters and rail. Beyond this the page centres on a `--paper` field; the grain layer extends edge to edge |
| `--content-max` | `1200px` | The twelve-track content column |
| `--rail` | `96px` | Marginalia rail, ≥1280px |
| `--rail-md` | `64px` | Marginalia rail, 1024–1279px |
| `--measure-prose` | `66ch` | Hanken body |
| `--measure-serif` | `62ch` | For-Parents serif body |
| `--measure-deck` | `52ch` | Hero deck |

Two elements are permitted to break `--content-max` and run to `--frame-max`: the **masthead rule** and the **`--grad-endpaper-turn` / `--grad-endpaper-return` bands**. Nothing else bleeds. The `endpaper` section's *background* is full-bleed; its *content* stays inside `--content-max`.

### 3.3 Margin-rail behaviour by breakpoint

The marginalia rail is the structural signature of the page — the visible proof that every claim resolves to a source. Its behaviour is specified exactly, at three breakpoints, and it degrades to something *simpler*, never to something *hidden*.

```
≥1280px                     1024–1279px                 <1024px
┌──────────────┬──────┐     ┌──────────────┬────┐       ┌──────────────────┐
│              │ ¹    │     │              │ ¹  │       │  content         │
│  content     │ ¹⁷⁰⁰+│     │  content     │ ²  │       │  700+ partner…³  │
│              │ part-│     │              │ ³  │       │  ▸ Source 3      │  ← native <details>
│              │ ners…│     │              │    │       │                  │     inline, no JS
│              │      │     │  (numbers    │    │       │  content         │
│              │ ²    │     │   only; text │    │       │                  │
│  96px rail   │      │     │   on hover/  │    │       │  rail removed    │
│  persistent  │      │     │   focus)     │    │       │  entirely        │
└──────────────┴──────┘     └──────────────┴────┘       └──────────────────┘
```

| Breakpoint | Rail width | Behaviour | Interaction | Fallbacks |
|---|---|---|---|---|
| **≥1280px** | `--rail` `96px`, fixed | Persistent right rail carrying the full footnote text for every claim currently in view. Footnote lines are `--fs-footnote` (Newsreader, opsz 8, 13px) in `--ink-muted` (7.20:1). Sits at `--z-rail` | Hovering or focusing a superscript **illuminates** the matching rail line: the line's left edge grows a 2px `--sienna` marker and the text goes from `--ink-muted` to `--ink` over `--dur-2` with `--ease-quad`. No movement, no scale | With JS disabled the rail renders all footnotes for the section, unilluminated. The link `#fn-7` still resolves |
| **1024–1279px** | `--rail-md` `64px`, fixed | Rail carries **numbers only**, set in `--fs-mono-label`. The footnote text is revealed on hover or focus in a `--paper-still` panel that expands leftward into the gutter, 1px `--rule-strong` keyline, `--reg-rule` offset, `--dur-3` `--ease-cubic` | Keyboard: the number is a real `<a>`; focus reveals the panel. Escape closes. Focus never leaves the rail | With JS disabled the numbers link to the Sources table in `colophon` |
| **<1024px** | **removed entirely** | Each footnote becomes an inline native `<details>` disclosure placed directly beneath its figure. `<summary>` reads `Source 3` in `--fs-mono-label`; the open body is `--fs-footnote` in `--ink-muted` | Native disclosure — Enter/Space toggles, no JS | **This is the primary implementation below 1024px, not a fallback.** There is **no bottom sheet**: it would require JS and would collide with `mobile-bar` at `--z-mobilebar` |

**Pinning and the rail share the 1024px gate.** Both are `≥1024px` only. Below it the page has no rail, no pin, and no horizontal movement — and no information is lost, because the `eleven-months` content becomes a static vertical list carrying the identical data.

### 3.4 Section vertical rhythm

```css
.section {
  padding-block: var(--section-y);          /* clamp(5rem, 10vw, 9rem) */
  border-block-start: var(--rule-hairline) solid var(--rule);
}
.section[data-chapter-open] {
  border-block-start-width: var(--rule-chapter);   /* 0.125rem */
  border-block-start-color: var(--rule-strong);
  padding-block-start: calc(var(--section-y) + var(--s-8));  /* chapter lead-in */
}
.section[data-tight] { padding-block: var(--section-y-tight); }  /* colophon-strip, colophon */
```

| Rhythm element | Value | Applies to |
|---|---|---|
| Standard section padding | `--section-y` = `clamp(5rem, 10vw, 9rem)` | Twelve of the sixteen sections |
| Tight section padding | `--section-y-tight` = `clamp(3rem, 6vw, 5rem)` | `colophon-strip`, `colophon` |
| Chapter lead-in | `--section-y` + `--s-8` (4rem) top only | `gazetteer` (II), `still-page` (III), `reckoning` (IV), `eleven-months` (V) |
| Hairline divider | `--rule-hairline` `0.0625rem` `--rule` | Section-to-section within a chapter |
| Chapter rule | `--rule-chapter` `0.125rem` `--rule-strong` | Chapter boundaries; `for-parents` and `colophon` top edges |
| Masthead rule | `--rule-masthead` `0.25rem` `--rule-strong` | Beneath `sticky-nav`, once |
| Heading → deck | `--s-5` (1.5rem) | Every chapter opener |
| Deck → body | `--s-6` (2rem) | Every chapter opener |
| Body block → body block | `--s-5` (1.5rem) | Prose |
| Component internal padding | `--s-6` (2rem) desktop, `--s-5` (1.5rem) <768px | Plates, ledger, form bed, drawers |
| Chapter numeral offset | Roman numeral sits in the outer gutter, baseline-aligned to the chapter H2, with a `--rule-hairline` running from it to the content edge | I–VI |

**The `endpaper` exception.** `endpaper` has no top border; the 30vh `--grad-endpaper-turn` band *is* its upper boundary. `questions` likewise has no top border; the 24vh `--grad-endpaper-return` band is its boundary. These two sections set `border-block-start: none`.

### 3.5 Bento and anchor-cell rules

Bento applies to exactly one section — `gazetteer` — where fifteen destinations must not become fifteen equal tiles. Four anchor plates (United Kingdom, USA, Canada, Australia — the four highest-volume destinations) carry the visual weight; eleven alphabetical hairline rows carry the rest.

| Rule | Value | Rationale |
|---|---|---|
| **Anchor-to-supporting area ratio** | Anchor cell **≥2×** the area of the largest supporting cell | Below 2× the hierarchy reads as an accident; the reference set pushes 3–4× |
| **Inner whitespace per cell** | **20–30%** of cell area | Below 20% the cell reads as a Bootstrap card; above 30% it reads as unfinished |
| **Gutter-to-padding relationship** | `--grid-gap` ≈ **half** the cell's inner padding | Cells must feel like objects on a page, not like a table |
| **Borders** | Hairline `--rule` or **no border at all**; never a boxed card with a shadow | The registration offset supplies the only depth |
| **One idea per cell** | A cell states one destination, one figure, or one claim — never a cluster | |
| **Anchor content** | Plate A or Plate D field + destination name + the four data points: partner count, main intake, tuition band, post-study work rights | |
| **Tablet 768–1023px** | Collapses to **two columns**, with each anchor **spanning both** | |
| **<768px** | **Single column**; the eleven rows become a tap-accordion; anchors become full-width plates | |
| **Aspect ratios** | Mixed and deliberate — anchors `3 / 2`, supporting rows are content-height, never forced square | |
| **Radii** | `--r-0` on cells; `--r-1` on plate keylines only | Nothing exceeds 4px except CTA pills |

```
gazetteer — ≥1280px

┌──────────────────────┬──────────────────────┐
│                      │                      │
│   UNITED KINGDOM     │   UNITED STATES      │   anchors: cols 1–6 / 7–12
│   Plate D + data     │   Plate D + data     │   3:2, ≥2× a supporting row
│   80+ partners       │   150+ partners      │
│                      │                      │
├──────────────────────┼──────────────────────┤
│   CANADA             │   AUSTRALIA          │
│   60+ partners       │   45+ partners       │
└──────────────────────┴──────────────────────┘
──────────────────────────────────────────────  0.0625rem --rule
 DUBAI          7+ partners  ·  rolling  ·  AED …          ▸
──────────────────────────────────────────────
 FRANCE        12+ partners  ·  Sep main  ·  € …           ▸
──────────────────────────────────────────────
 GERMANY       30+ partners  ·  Oct/Apr   ·  € …           ▸
──────────────────────────────────────────────   (11 rows, alphabetical)
```

---

## 4. Component library

Every component below is a SPLIT-A export or a SPLIT-B consumer of one. The interface contract SPLIT-A must ship before SPLIT-B begins is: `<Plate>`, `<Footnote>` plus the rail context provider, `<StatFigure>`, `<CTA>`, `<Rule>`, the `data-chapter` root attribute contract, and the complete token stylesheet.

Conventions used throughout: **all interactive targets ≥44×44px**, mobile-bar targets ≥48px; `:focus-visible` only, never bare `:focus`; every animation is `transform` and `opacity` only; no component may author a token.

---

### 4.1 Masthead / sticky nav

**Anatomy**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ⌐ skip link (visually hidden until focused, --z-skiplink)                     │
│                                                                              │
│  GLOBAL OPPORTUNITIES · VOL. XXV      Destinations ▾  Costs  Process          │
│  ↑ Newsreader 400, 1.125rem            Counsellors  Offices  For Parents      │
│    scales 1→0.92 past 40px                                                   │
│                                          1800 111 119   ┌──────────────────┐  │
│                                          ↑ text, tel:   │ Book free        │  │
│                                                         │ counselling      │  │
│                                                         └──────────────────┘  │
├══════════════════════════════════════════════════════════════════════════════┤  0.25rem --rule-strong
```

**Variants** — `default` (top of page, hairline at `--rule-strong` 0.25rem) · `scrolled` (past 40px: wordmark `scale(0.92)`, rule opacity unchanged, background `--paper` @96%) · `mega-open` (Destinations panel expanded) · `compact` (<1024px: wordmark + phone only; nav items and pill move to `mobile-bar`).

**States** — resting · hovered nav item (2px `--sienna` underline draws left→right, `--dur-2`, `--ease-quad`) · current section (nav item in `--ink`, others `--ink-muted`) · focus-visible (2px `--sienna-press` ring, 2px offset) · mega-open (trigger gets `aria-expanded="true"`, bearing mark rotates 180°).

**Tokens** — background `--paper` @ 96% (`rgb(251 248 242 / 0.96)`), **never** `backdrop-filter`. Bottom rule `--rule-masthead` `--rule-strong`. Wordmark `--ink`, Newsreader 400, `1.125rem`, `0.02em`. Volume mark + running head `--fs-mono-label`, `--ink-muted`. Nav items `--fs-body-sm`, Hanken 500, `--ink-muted` → `--ink` on hover. Phone `--fs-data`, mono, `--marine`. Pill: see §4.2 `primary/md`. `--z-nav`. Height 56px (<1024px) / 64px (≥1024px). The chapter spine in the outer gutter fills with `--grad-spine-fill` driven by Motion `useScroll`.

```ts
export type NavItemId =
  | 'destinations' | 'costs' | 'process'
  | 'counsellors' | 'offices' | 'for-parents';

export interface NavItem {
  id: NavItemId;
  label: string;              // 'Destinations' | 'Costs' | …
  href: `#${string}`;
  /** Only 'destinations' may be true. Enforced at runtime in dev. */
  hasMegaPanel?: boolean;
}

export interface MastheadProps {
  /** Default: 'GLOBAL OPPORTUNITIES' */
  wordmark?: string;
  /** Default: 'VOL. XXV' */
  volume?: string;
  /** Full running head, shown ≥1280px only. */
  runningHead?: string;
  /** Exactly six, in canonical order. */
  navItems: readonly [NavItem, NavItem, NavItem, NavItem, NavItem, NavItem];
  phone: { display: string; href: `tel:${string}` };
  cta: Pick<CTAProps, 'label' | 'href' | 'onClick'>;
  /** id of the section currently in view, for the current-item treatment. */
  activeSectionId?: string;
  /** Controlled scroll state; omit to let the component observe scroll itself. */
  isScrolled?: boolean;
}
```

**ARIA & keyboard** — `<header role="banner">` containing a skip link as the **first focusable element** in the DOM (`href="#main"`, `--z-skiplink`, visually hidden until `:focus-visible`). `<nav aria-label="Primary">`. The Destinations trigger is a `<button aria-expanded aria-controls="mega-destinations">`; the panel is a `<div id="mega-destinations">` — **not** a `role="menu"`, because it contains links, not menu commands. `Escape` closes the panel and returns focus to the trigger. `Tab` moves through panel links in DOM order; the panel does **not** trap focus (it is a disclosure, not a dialog) but closes on `blur` leaving its subtree. The phone is `<a href="tel:1800111119">` with **the number itself as its accessible name**. Since 2026-08-04 a decorative `<Icon as={Phone} size="sm" />` may sit before the number inside the anchor; it is `aria-hidden`, it inherits `currentColor`, and it is additive — the anchor is never reduced to a glyph, because a bare handset in a masthead is exactly the affordance the fifty-year-old parent does not read. The wordmark links to `#hero` and carries `aria-label="Global Opportunities — top of page"`.

---

### 4.2 CTA / Button

**Anatomy**

```
 primary (lg)                              secondary (lg)             ghost
┌───────────────────────────────┐   ┌───────────────────────────┐    Explore ↓
│      Book free counselling    │   │  Explore 15 destinations  │    ──────────
└───────────────────────────────┘   └───────────────────────────┘    2px --sienna
  30 min · free · no obligation        1px --marine, pill             underline swell
  ↑ --fs-caption, mono, --ink-muted
```

**Variants**

| Variant | Fill | Label colour | Border | Radius | Padding | Min block size |
|---|---|---|---|---|---|---|
| `primary` / `lg` | `--sienna-press` | `#FFFFFF` (5.39:1) | none | `--r-pill` | `--s-3` `--s-6` (12px 32px) | 48px |
| `primary` / `md` | `--sienna-press` | `#FFFFFF` | none | `--r-pill` | `--s-2` `--s-5` (8px 24px) | 44px |
| `secondary` / `lg` | transparent | `--marine` (11.69:1 on `--paper`) | `1px solid --marine` | `--r-pill` | `--s-3` `--s-6` | 48px |
| `secondary` / `md` | transparent | `--marine` | `1px solid --marine` | `--r-pill` | `--s-2` `--s-5` | 44px |
| `ghost` | none | `--ink` | none | `--r-0` | `--s-1` `0` | 44px (via padding-block) |

**States**

| State | primary | secondary | ghost |
|---|---|---|---|
| hover | fill → `--sienna-deep` (`--dur-2`, `--ease-quad`); white stays 7.58:1 | border + label → `--marine`, fill → `--sienna-tint` | underline `1px → 2px` `--sienna`, `text-underline-offset: 0.18em` |
| active / press | `--sienna-deep` + `translateY(1px)`, `--dur-1`, `--ease-press` | same offset | same offset |
| focus-visible | `2px solid var(--focus-ring)`, offset 2px, `border-radius: inherit` | identical | identical |
| loading | label swaps to `Booking…`; the progress rule beneath fills `scaleX` — **no spinner**, because a spinner is an infinite animation and the page has none | n/a | n/a |
| disabled | **not used.** The submit button is never disabled; an invalid submit is permitted and produces validation messaging, which avoids both a contrast problem and a dead-end for keyboard users | n/a | n/a |

**Tokens & rules** — primary fill is **solid `--sienna-press`, never gradient**. No registration offset, no shadow, no scale on hover. Label is Hanken 600 at `--fs-body` (`lg`) or `--fs-body-sm` (`md`); **never letterspaced uppercase** — that treatment is reserved for running heads, captions, data labels, stamps and footnote refs. The sub-label (`30 min · free · no obligation`) is Plex Mono `--fs-caption` `--ink-muted`, placed *outside* the pill. The proof line (`A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST. No fee, no obligation.`) is Plex Mono `--fs-caption` `--ink-muted` and accompanies **every** primary CTA.

```ts
export type CTAVariant = 'primary' | 'secondary' | 'ghost';
export type CTASize = 'md' | 'lg';

export interface CTAProps {
  variant?: CTAVariant;            // default 'primary'
  size?: CTASize;                  // default 'lg'
  label: string;                   // 'Book free counselling'
  /** Plex Mono caption rendered beneath the pill, outside it. */
  subLabel?: string;               // '30 min · free · no obligation'
  /** Plex Mono proof line beneath the sub-label. Required on every primary. */
  proofLine?: string;
  href?: string;                   // renders <a>; else <button>
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
  loading?: boolean;               // swaps label; never renders a spinner
  loadingLabel?: string;           // default 'Booking…'
  /** Pre-fills the enquiry form when the CTA routes to #enquiry. */
  prefill?: { destination?: string; counsellor?: string; degree?: string };
  fullWidth?: boolean;             // true below --bp-sm
  'aria-label'?: string;
}
```

**ARIA & keyboard** — renders a native `<button>` when it acts and a native `<a>` when it navigates; never a `<div role="button">`. `Enter` and `Space` both activate `<button>`; `Enter` activates `<a>`. When `loading` is true, the button sets `aria-busy="true"` and the label change is announced by a `aria-live="polite"` region owned by the form, not by the button. `tel:` and `wa.me` CTAs are always real `<a href>` and must function with JavaScript disabled.

---

### 4.3 Plate

The universal image/figure primitive. Four v1 treatments; identical shell; v2 photography drops in behind the identical caption with zero layout shift.

**Anatomy** — see §1.3 for the annotated diagram. Shell: `<figure>` → registration-offset box → 1px `--rule-strong` keyline → locked-aspect field → four registration corners → `<figcaption>` block beneath a `--rule-hairline`.

**Variants** — `field` (Plate A) · `specimen` (Plate B) · `cartouche` (Plate C) · `cartographic` (Plate D). Full recipe table in §1.3.

**States** — `resting` · `hover` (only on interactive plates — the gazetteer anchors and counsellor cartouches: the registration offset grows `3px → 5px` via `box-shadow` **swap at `--dur-2`**, which is the one permitted exception to "no animated box-shadow" because it is a discrete two-value swap with no blur, not an interpolation) · `focus-visible` (ring on the `<figure>`'s focusable child, never on the figure itself) · `expanded` (gazetteer row micro-spread; `layoutId` morph via Motion).

**Tokens** — keyline `1px --rule-strong`, radius `--r-1`. Offsets per §1.5. Caption block: plate number `--fs-mono-label` `--ink-muted`; primary caption line `--fs-caption` `--ink`; supporting lines `--fs-caption` `--ink-muted`. Field fills per §1.3. Plate A type confined to the 0–68% ramp band (§1.2).

```ts
export type PlateVariant = 'field' | 'specimen' | 'cartouche' | 'cartographic';

export interface PlateCaption {
  /** 'PLATE I' — mono label, optional. */
  plateNumber?: string;
  /** Ordered caption lines. First line renders in --ink, rest in --ink-muted. */
  lines: readonly string[];
}

export interface PlateProps {
  variant: PlateVariant;
  /** CSS aspect-ratio string, locked. Defaults per variant: field '4/5',
   *  specimen '1/1.294', cartouche '4/5', cartographic '16/10'. */
  aspectRatio?: string;
  caption: PlateCaption;
  /** field: the coordinate/place/time block. Confined to the 0–68% ramp band. */
  fieldContent?: React.ReactNode;
  /** cartouche: initials rendered at 5rem in Newsreader. */
  monogram?: string;
  /** cartographic: id of the SVG coastline path in the sprite. */
  coastlineId?: string;
  /** cartographic: [lat, lon] of the primary city crosshair. */
  crosshair?: readonly [number, number];
  /** specimen: redaction blocks and the single annotated clause. */
  specimen?: {
    documentType: string;
    fields: readonly { label: string; value: string | '██████' }[];
    annotatedClause: string;
    stamp?: string;   // default 'SPECIMEN · ILLUSTRATIVE · NOT A STUDENT RECORD'
  };
  registration?: 'sienna' | 'marine' | 'rule';   // defaults per variant
  /** v2 only. When present the field is replaced; the caption never changes. */
  photograph?: { src: string; alt: string; priority?: boolean };
  interactive?: boolean;
  layoutId?: string;   // for Motion shared-element morphs
}
```

**ARIA & keyboard** — always a `<figure>` with a `<figcaption>`; the caption is the accessible description and is **never** `aria-hidden`. Decorative SVG inside the field (graticule, contour ring, registration corners) carries `aria-hidden="true"`. Informative SVG (Plate D coastline) carries `role="img"` with a `<title>` naming the country. The Plate C monogram is `aria-hidden="true"` — the person's name is in the caption, and a screen reader must not announce "A V". When `interactive`, the whole figure is wrapped by a single `<button>` or `<a>`; focus lands on that element, `Enter`/`Space` activate, and the accessible name is composed from the caption's first line.

---

### 4.4 Gazetteer row

**Anatomy**

```
────────────────────────────────────────────────────────────────────────────  --rule
 UNITED KINGDOM      80+ partners · Sep/Oct main intake ·                  ⌐
 ↑ --fs-h4, --ink    £9,000–30,000 PG/yr · Graduate Route 2 yrs⁷           ⌐  bearing mark
                     ↑ --fs-data, mono, --ink-muted, tabular
────────────────────────────────────────────────────────────────────────────
   ↓ expanded (Motion layout + layoutId + AnimatePresence)
┌───────────────────────────────────────────────┬──────────────────────────┐
│  Main intakes    Sep/Oct · secondary Jan/Feb  │   ┌────────────────────┐ │
│  Tuition PG      £9,000–30,000 / yr⁷          │   │  Plate D           │ │
│  Living          £1,483/mo London⁸            │   │  coastline +       │ │
│  Work rights     Graduate Route 2 yrs⁹        │   │  crosshair         │ │
│  Partners        80+ universities³            │   └────────────────────┘ │
│  ┌───────────────────────────────┐            │   UNITED KINGDOM         │
│  │ Book a counsellor for the UK  │            │   51.5074° N · 0.1278° W │
│  └───────────────────────────────┘            │                          │
└───────────────────────────────────────────────┴──────────────────────────┘
```

**Variants** — `anchor` (one of the four ≥2×-area plates: UK, USA, Canada, Australia) · `row` (one of the eleven alphabetical hairline rows) · `accordion` (<768px: the row becomes a full-width tap target with the micro-spread stacking beneath).

**States** — resting · hover (the row's `--rule` draws from left to right via CSS `scaleX` on a pseudo-element, `--dur-3`; the bearing mark shifts 2px right) · focus-visible · expanded (`aria-expanded="true"`, bearing mark rotates 90°, Plate D morphs into the margin via `layoutId`) · collapsed.

**Tokens** — divider `--rule-hairline` `--rule`; hover rule `--rule-strong`. Destination name `--fs-h4` Hanken 600 `--ink`. Data line `--fs-data` Plex Mono 400 `--ink-muted`, `font-variant-numeric: tabular-nums lining-nums slashed-zero`. Footnote markers `--sienna-press` (see §2.3 note 2). Expanded panel background `--paper` with a `--paper-tracing` inset for the data table. Row min-height 44px; expanded CTA is `secondary/md`. **Zero ScrollTrigger** — this section is entirely user-driven.

```ts
export interface GazetteerDatum {
  label: string;                 // 'Main intakes'
  value: string;                 // 'Sep/Oct · secondary Jan/Feb'
  footnoteId?: string;           // resolves in the marginalia rail
  mono?: boolean;                // default true — these are verified facts
}

export interface GazetteerRowProps {
  variant: 'anchor' | 'row';
  destination: string;           // 'UNITED KINGDOM'
  /** The single-line summary shown when collapsed. */
  summary: string;               // '80+ partners · Sep/Oct main intake · £9,000–30,000 PG/yr · Graduate Route 2 yrs'
  data: readonly GazetteerDatum[];
  coastlineId: string;
  crosshair: readonly [number, number];
  ctaLabel: string;              // 'Book a counsellor for the United Kingdom'
  expanded?: boolean;            // controlled
  onToggle?: (expanded: boolean) => void;
  layoutId?: string;
}
```

**ARIA & keyboard** — the fifteen destinations render as a `<ul>`; each `<li>` contains a `<button aria-expanded aria-controls="gaz-uk-panel">` whose accessible name is the destination followed by the summary. The panel is `<div id="gaz-uk-panel" role="region" aria-labelledby="gaz-uk-trigger">`. `Enter`/`Space` toggle. `Escape` collapses the open row and returns focus to its trigger. `Home`/`End` move focus to the first/last row. Tab order is natural — no roving tabindex, because each row is independently useful. **All fifteen destinations must be reachable by keyboard**, including the four anchors.

---

### 4.5 Register list

**Anatomy**

```
 700+ PARTNER UNIVERSITIES³                        ← --fs-figure, mono, tabular
 USA 150+ · UK 80+ · Canada 60+ · Australia 45+ · Germany 30+ ·
 New Zealand 30+ · Ireland 20+ · Singapore 7       ← --fs-data, mono
────────────────────────────────────────────────────────────────  --rule
 Monash University          Queen Mary, London      University of Alberta
 Macquarie University       University of Exeter    University of Guelph
 RMIT University            University of Glasgow   Centennial College
 …                          …                       …
                                              see the full list →
```

**Variants** — `three-column` (≥1024px, CSS `columns: 3`) · `two-column` (768–1023px) · `single-column` (<768px).

**States** — resting only. Entry is a once-only column stagger reveal with tabular country counters animating from 92% of final (Anime.js, dynamically imported). No hover state on names — they are not links; the single link is `see the full list →`, a `ghost` CTA.

**Tokens** — headline figure `--fs-figure` Plex Mono 500, tabular, `--marine`. Country split `--fs-data` Plex Mono 400 `--ink-muted`. Names `--fs-body-sm` Hanken 400 `--ink`, `column-gap: var(--s-7)`, `column-rule: var(--rule-hairline) solid var(--rule)`. Surface `--paper-laid`.

```ts
export interface RegisterProps {
  totalLabel: string;            // '700+ PARTNER UNIVERSITIES'
  totalFootnoteId: string;
  countrySplit: readonly { country: string; count: string }[];
  /** ~24 names. Order is editorial, not alphabetical. */
  institutions: readonly string[];
  fullListHref: string;
  columns?: 1 | 2 | 3;           // default responsive
}
```

**ARIA & keyboard** — a `<ul>` laid out with CSS multi-column; the list semantics survive the visual columns. The country split is a `<dl>`. The headline figure uses `<StatFigure>` (§4.8) so its value is server-rendered. `see the full list →` is a real `<a>`.

---

### 4.6 Accreditation block

**Anatomy**

```
┌──────────────────────────────────────────┐
│ AIRC                                     │  --fs-d2, Newsreader, --ink
│ American International Recruitment Council│  --fs-body-sm, --ink-muted
│ ──────────────────────────────────────── │  --rule-hairline
│ Certification runs for five years in the  │  --fs-body, --ink-muted
│ first round and ten years thereafter,     │  (AIRC's standard, quoted)
│ with external review at each renewal.     │
│                                           │
│ WHAT THIS MEANS FOR YOU                   │  --fs-label, --ink-faint (24px+? no →
│ An independent US body has audited how    │   set --fs-label in --ink-muted)
│ this company recruits students.           │  --fs-body-sm, --ink
└──────────────────────────────────────────┘
   ╲ --reg-marine
```

**Variants** — `engraved` (in `still-page`: full block, always-visible explanation, **zero motion**) · `micro` (in `colophon-strip` and the hero accreditation micro-row: mark name only in `--fs-mono-label`, explanation in a native `<details>`).

**States** — `engraved` has no interactive states at all beyond `:focus-visible` on the legal-entity link. `micro` has resting / open / focus-visible.

**Tokens** — surface `--paper-still` (engraved) or `--paper-laid` (micro). Mark name `--fs-d2` Newsreader 400 at `--nr-opsz: 44`. Body `--fs-body` `--ink-muted`. "WHAT THIS MEANS FOR YOU" label `--fs-label` Hanken 600 uppercase `--ink-muted` (**not** `--ink-faint` — at 11px it would fail; see §2.3 note 6). Registration offset `--reg-marine`. Radius `--r-0`. Six marks, in canonical order: `AIRC · ICEF · AAERI · BRITISH COUNCIL · EDUCATION NEW ZEALAND · PTE PEARSON`.

> **Motion contract for `still-page`:** one 400ms opacity fade on section entry, CSS only, and nothing else. No stagger, no transform, no hover motion. The stillness is the argument.

```ts
export interface AccreditationProps {
  variant: 'engraved' | 'micro';
  mark: 'AIRC' | 'ICEF' | 'AAERI' | 'BRITISH COUNCIL' | 'EDUCATION NEW ZEALAND' | 'PTE PEARSON';
  fullName: string;
  /** Quoted verbatim where the body publishes a standard. */
  standard?: string;
  meaningForYou: string;
  sourceHref?: string;
  footnoteId?: string;
}
```

**ARIA & keyboard** — `engraved` renders `<article>` with an `<h3>` naming the mark; the explanation is plain prose in the DOM, never behind a control. `micro` renders a native `<details><summary>` so it works with JavaScript disabled. Accreditation names are **text**, never logo images — a logo strip is the category cliché this component replaces.

---

### 4.7 Counsellor card + drawer

**Anatomy**

```
CARD (Plate C cartouche)                DRAWER (--z-drawer, --shadow-drawer)
┌──────────────────┐                    ┌────────────────────────────────────┐
│ ┌─┐          ┌─┐ │                    │  ✕                                 │
│ │ │   ◜◝     │ │ │                    │  ┌────────┐  AVINASH               │
│ │ │  A       │ │ │  ← 5rem Newsreader │  │  A     │  DELHI SOUTH           │
│ │ │   ◟◞     │ │ │    over contour    │  │        │  UK & IRELAND          │
│ └─┘          └─┘ │    ring            │  └────────┘  11 YEARS              │
└──────────────────┘                    │  ────────────────────────────────  │
  ╲ --reg-marine                        │  "Global Opportunities has been a  │
────────────────────                    │   great support in my journey to   │
AVINASH                                 │   study in the UK in masters."     │
DELHI SOUTH · UK & IRELAND              │   — Rittik Panchal, Master's, UK   │
11 YEARS                                │  ────────────────────────────────  │
                                        │  ┌────────────┐ ┌───────┐ ┌──────┐ │
                                        │  │Book Avinash│ │ Call  │ │WhatsApp│
                                        │  └────────────┘ └───────┘ └──────┘ │
                                        └────────────────────────────────────┘
```

**Variants** — `card` (grid item, Plate C) · `drawer` (overlay) · `reassigned` (a counsellor who has left: the card shows the successor's name with a mono note `REASSIGNED · <date>`; built day one because named counsellors create churn risk).

**States** — card: resting / hover (registration offset `3px → 5px` swap) / focus-visible / active (morphing). Drawer: opening (`layoutId` shared-element morph, `--dur-4`, `--ease-quart`) / open / closing.

**Tokens** — card is `<Plate variant="cartouche" registration="marine">`. Drawer surface `--paper`, `--shadow-drawer`, `--z-drawer`, scrim `rgb(23 19 16 / 0.32)` at `--z-scrim`, radius `--r-2`. Quote `--fs-quote` Newsreader italic with a hanging quote mark in the margin. Buttons: `Book Avinash` = `primary/md`; `Call` and `WhatsApp` = `secondary/md`. **WhatsApp renders in ink + `--marine` outline, never in WhatsApp brand green** — green on this page means *verified*.

```ts
export interface CounsellorProps {
  name: string;                 // 'AVINASH'
  branch: string;               // 'DELHI SOUTH'
  territories: readonly string[];  // ['UK', 'IRELAND']
  years: number;                // 11
  studentsPlaced?: number;
  outcome?: {
    quote: string;
    student: string;            // 'Rittik Panchal'
    programme: string;          // "Master's"
    destination: string;        // 'United Kingdom'
  };
  tel: `tel:${string}`;
  whatsapp: `https://wa.me/${string}`;
  /** Pre-fills #enquiry with counsellor routing. */
  bookHref: string;
  reassignedTo?: { name: string; since: string };
  layoutId?: string;
}
```

**ARIA & keyboard** — the card is a `<button>` wrapping the `<figure>`, accessible name = `"AVINASH, Delhi South, UK and Ireland, 11 years"`. The drawer is `role="dialog" aria-modal="true"` labelled by the counsellor-name heading. On open: focus moves to the drawer's close button, background content receives `inert`, and body scroll locks. `Escape` closes; focus returns to the originating card. `Tab` cycles within the drawer only. The `tel:` and `wa.me` links inside the drawer are **real anchors that function with JavaScript disabled** — if the drawer cannot open, the card's `href` falls back to the counsellor's anchor section.

---

### 4.8 Ledger row + odometer figure

**Anatomy**

```
 THE RECKONING · UNITED KINGDOM · PG · LONDON            --fs-mono-label
─────────────────────────────────────────────────────── --rule-strong
 Tuition                       ₹  9,45,000 – 31,50,000¹⁰
 Living                        ₹  4,80,000 –  6,20,000¹¹
 Visa                          ₹     55,000              ¹²
 IHS                           ₹     81,000 –  1,22,000¹³
 Forex & remittance            ₹     18,000 –    35,000¹⁴
 GIC / blocked account         ₹          —              ¹⁵
 Insurance                     ₹     22,000 –    40,000¹⁶
 Flights                       ₹     45,000 –    80,000¹⁷
─────────────────────────────────────────────────────── --rule
 less: scholarships & bursaries −₹ 1,50,000 – 6,00,000¹⁸
 Education loan EMI, 7 yrs      ₹     —  / month        ¹⁹
═══════════════════════════════════════════════════════ --rule-strong (drawn)
 TOTAL, first year             ₹ 14,96,000 – 33,07,000
 ─────────────────────────────────────────────────────
 What Global Opportunities charges you: ₹0.
 Here is who pays us, and how.            ← --fs-quote, Newsreader italic
```

**Variants** — `line` (a normal ledger line) · `subtraction` (scholarships; the figure is negative and prefixed `less:`) · `derived` (loan EMI; computed, flagged mono `DERIVED`) · `total` (drawn rule above, `--fs-figure`, always a **range**) · `disclosure` (the ₹0 line — Newsreader italic, no figure).

**States** — resting · re-typesetting (when a chip changes, the affected lines re-render line by line and the odometers roll in fixed-width tabular cells — **user-triggered, never scroll-triggered**) · footnote-hover (the superscript illuminates its rail line).

**Tokens** — surface `--paper-tracing`. Labels `--fs-body-sm` Hanken 400 `--ink`. Figures `--fs-data` Plex Mono 400, tabular, `--ink`; total `--fs-figure` Plex Mono 500 `--marine`. Rules: line `--rule-hairline` `--rule`; subtotal `--rule-hairline` `--rule-strong`; total `--rule-chapter` `--rule-strong`, **drawn** via DrawSVG. Footnote markers `--sienna-deep` on this surface (§2.3 note 2). The ₹ bar is a single stacked bar driven by `useMotionValue` + `useSpring` → `scaleX` **only** — never `width`.

```ts
export type LedgerLineKind = 'line' | 'subtraction' | 'derived' | 'total' | 'disclosure';

export interface LedgerLineProps {
  kind: LedgerLineKind;
  label: string;                       // 'Tuition'
  /** Ranges are the default. A single value renders without an en dash. */
  value?: { low: number; high?: number; currency: '₹' };
  footnoteId?: string;
  /** 'DERIVED' | 'AT COST' | 'NOT APPLICABLE' — mono, --ink-muted */
  qualifier?: string;
  /** disclosure only — Newsreader italic, no figure. */
  text?: string;
}

export interface StatFigureProps {
  /** Server-rendered at its FINAL value. Animation only moves toward what is
   *  already in the DOM. GO's placeholder-zero bug is structurally impossible. */
  value: number | string;
  /** Counters animate the final 12% only; ledger odometers roll their full cell. */
  animateFrom?: number;                // default: 0.92 * value for counters
  prefix?: string;                     // '₹' | '£'
  suffix?: string;                     // '+' | '/yr'
  size?: 'figure' | 'data';            // --fs-figure | --fs-data
  footnoteId?: string;
  tabular?: true;                      // always
}
```

**ARIA & keyboard** — the ledger is a `<table>` with a `<caption>` naming the current chip selection, `<th scope="row">` for labels and `<td>` for figures. The odometer's animating digit strips are `aria-hidden="true"`; the accessible text node **is the final value**, present in the server HTML. The table carries `aria-live="polite"` on a wrapper so a chip change announces "Ledger updated — United Kingdom, postgraduate, London". Chips are keyboard operable (§4.11). The total row uses `<th scope="row">` and `<td>` with `<strong>`.

---

### 4.9 Timeline month block

**Anatomy**

```
 ≥1024px — pinned, horizontal, scrub 0.6

   AUG              SEP              OCT              NOV
────┬────────────────┬────────────────┬────────────────┬─────────  the calendar rule
    │                │                │                │
    ▼ ochre          ▼ sienna         ▼ ochre          │
  ┌──────────┐    ┌──────────┐     ┌──────────┐        │
  │ 07 AUG   │    │ 15 SEP   │     │ 09 AUG   │        │
  │ GO APPLI-│    │ CITED    │     │ GO APPLI-│        │
  │ CATION   │    │ DEADLINE │     │ CATION   │        │
  │ DAY      │    │ UCAS     │     │ DAY      │        │
  │ PUNE     │    │ source ↗ │     │ DELHI    │        │
  └──────────┘    │ verified │     └──────────┘        │
                  │ Aug 2026 │                         │
                  └──────────┘                         │
  Shortlist        Applications     Entrance exams
  2–3 yrs prior    8–9 months       concurrent
  OWNER: student   OWNER: GO        OWNER: student
  ↑ --fs-body-sm   ↑ mono duration  ↑ --fs-mono-label

  margin note:  This is a real timeline. It is not a promise.
```

**Variants** — `pinned` (≥1024px: a horizontal x-tween with `ease: "none"`, `scrub: 0.6`, `anticipatePin: 1`; child reveals via `containerAnimation`) · `static` (<1024px: the identical content as a vertical `<ol>`; **no information is desktop-only**).

**States** — resting · active (the month currently under the scrub head gets its rule terminal in `--sienna`) · tick-hover (the tick's source link and last-verified stamp reveal) · specimen-open (Plate B annotation leader draws via Anime.js `createDrawable`).

**Tokens** — calendar rule `--rule-chapter` `--rule-strong`. Ochre ticks `--ochre` = GO Application Days; sienna ticks `--sienna` = cited third-party deadlines. **Every tick carries a mono date label in `--ink`, a mono category label, and a 1px `--ink-muted` stem** — ochre never carries meaning alone (§2.3 note 4). Durations `--fs-data` Plex Mono, tabular. Owners `--fs-mono-label` `--ink-muted`. Margin note `--fs-quote` Newsreader italic `--ink-muted`. Visa-refusal callout in `--clay` (6.38:1). This is **the only pinned section on the page**; never two pins active; total ScrollTrigger budget for the page is ≤14.

```ts
export type TickKind = 'go-application-day' | 'cited-deadline';

export interface TimelineTick {
  kind: TickKind;
  date: string;                 // '07 AUG'
  label: string;                // 'GO APPLICATION DAY' | 'CITED DEADLINE'
  city?: string;                // 'PUNE'
  /** Required for 'cited-deadline'. Enforced by type narrowing in the impl. */
  source?: { name: string; href: string; lastVerified: string };
  bookHref?: string;            // Application Days are bookable
}

export interface TimelineMonthProps {
  month: string;                // 'AUG'
  index: number;                // 0–10
  activity: string;             // 'Shortlist'
  duration: string;             // '2–3 yrs prior'
  owner: 'student' | 'GO' | 'university' | 'consulate';
  ticks?: readonly TimelineTick[];
  specimen?: PlateProps['specimen'];
  footnoteId?: string;
}
```

**ARIA & keyboard** — the timeline is an `<ol>` with `aria-label="Your next eleven months"`; each month is an `<li>`. In `pinned` mode the horizontal container is `role="group"` and each month remains in natural tab order — focusing a month **scrolls the pinned container to it programmatically** so keyboard users are never focused on an off-screen element (`scroll-margin-inline` plus a `focusin` handler). `Escape` is not bound. Ticks with `bookHref` are `<a>`; ticks with a `source` expose the source as a real `<a>` with `rel="noopener"` and the last-verified stamp in the accessible name. Under reduced motion, `gsap.matchMedia()`'s `reduce` branch calls `gsap.set()` to the final state and returns — which renders the static vertical list.

---

### 4.10 FAQ item

**Anatomy**

```
────────────────────────────────────────────────────────────  --rule
 Why use a consultant at all?                              ⌐   ← --fs-h4, --ink
────────────────────────────────────────────────────────────       bearing mark
 (open)
 You do not have to. Applying directly is free and many
 students do it. What we add is …                              ← --fs-body, --ink-muted
                                                                  max --measure-prose
 ┌──────────────────────┐
 │ Book free counselling│                                     ← final item only
 └──────────────────────┘
```

**Variants** — `default` · `with-cta` (the final item carries an inline `primary/md` CTA).

**States** — closed · open · focus-visible · hover (the summary rule strengthens `--rule` → `--rule-strong`).

**Tokens** — question `--fs-h4` Hanken 600 `--ink`. Answer `--fs-body` `--ink-muted`, capped at `--measure-prose`. Divider `--rule-hairline` `--rule`. Bearing mark rotates 90° on open, `--dur-3`, `--ease-cubic`. Transition is `grid-template-rows: 0fr → 1fr` at `--dur-3` `--ease-cubic`. Surface `--paper`. Min tap target 44px on the summary.

> **Zero JavaScript.** This component uses native `<details>`/`<summary>`. It works with JS disabled, it is keyboard-native, and it emits no ScrollTrigger. `FAQPage` JSON-LD is emitted for the eight questions (see `06-strategy.md`).

```ts
export interface FAQItemProps {
  question: string;
  /** Rich answer; may contain footnote markers and one inline CTA. */
  answer: React.ReactNode;
  /** Renders a primary/md CTA inside the answer. Final item only. */
  cta?: Pick<CTAProps, 'label' | 'href'>;
  defaultOpen?: boolean;      // all false — the page opens closed
  footnoteIds?: readonly string[];
}
```

**ARIA & keyboard** — `<details>` + `<summary>`; no `role`, no `aria-expanded` (the browser provides both natively and overriding them degrades support). `Enter` and `Space` toggle. The `<summary>` contains the question as plain text so the accessible name is exact. The bearing mark is a CSS pseudo-element, so it never enters the accessible name. Do **not** replace the native disclosure triangle with `list-style: none` alone on Safari — also set `::-webkit-details-marker { display: none }`.

---

### 4.11 Form controls

The `enquiry` section is **three steps, six fields, three of them non-PII taps, PII in step 3**. Surface is `--paper-tracing`. Fields are **ruled, not boxed** (§2.3 note 3).

#### 4.11.1 Step wizard shell

```
 STEP 2 OF 3                                          --fs-mono-label, --ink-muted
 ████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░     progress rule, scaleX,
                                                       --sienna-press on --rule
 What are you applying for?                           --fs-d2, Newsreader

 [ Bachelor's ]  [ Master's ]  [ MBA ]  [ PhD ]       chips, radiogroup
 [ Sep 2026 ]  [ Jan 2027 ]  [ Sep 2027 ]  [ Later ]  chips, radiogroup

 ← Back                                    Continue →
```

Step transitions are `x ± 16px` + opacity at `--dur-3` via Motion `AnimatePresence`. **The shell's block-size is locked to the tallest step** so the page never shifts (CLS budget 0.1).

```ts
export interface StepWizardProps {
  steps: readonly [StepDef, StepDef, StepDef];
  current: 0 | 1 | 2;
  onNext: () => void;
  onBack: () => void;
  onSubmit: (values: EnquiryValues) => Promise<void>;
  /** Locked block-size, measured from the tallest step at build. */
  minBlockSize: string;
}

export interface EnquiryValues {
  destination: string;          // step 1, chip
  degreeLevel: string;          // step 2, chip
  intake: string;               // step 2, chip
  givenName: string;            // step 3
  familyName: string;           // step 3
  mobile: string;               // step 3, +91 adornment
  email?: string;               // step 3, labelled 'optional'
  nearestOffice: string;        // step 3, native <select>, smart-defaulted
  marketingConsent: boolean;    // unticked, separate from enquiry consent
}
```

**ARIA & keyboard** — each step is a `<fieldset>` with a `<legend>`. The progress rule is `role="progressbar"` with `aria-valuenow`, `aria-valuemin="1"`, `aria-valuemax="3"` and `aria-valuetext="Step 2 of 3"`. A visually-hidden `aria-live="polite"` region announces step changes. `Continue` is a `<button type="button">`; only the final step's button is `type="submit"`. Back/Continue preserve entered values. **No field is asterisked**; optional fields are labelled *optional* in their `<label>`.

#### 4.11.2 Chip

**Anatomy & tokens** — `min-block-size: 44px`, padding `--s-2` `--s-4`, radius `--r-2` (4px), 1px `--ink-muted` stroke, label `--fs-body-sm` Hanken 500 `--ink`. Selected: fill `--sienna-tint`, stroke `--sienna-deep`, label `--marine` (10.27:1). Hover: fill `--paper`. Focus-visible: `2px --sienna-press` ring, offset 2px. Transition `--dur-3` `--ease-cubic`, colour and opacity only.

```ts
export interface ChipProps {
  value: string;
  label: string;
  selected: boolean;
  onSelect: (value: string) => void;
  /** Chips are single-select on every step of this form. */
  name: string;
}
```

**ARIA & keyboard** — a chip group is `role="radiogroup"` with an `aria-labelledby` pointing at the step question; each chip is `role="radio"` with `aria-checked`. **Roving tabindex**: only the selected chip (or the first, if none) has `tabindex="0"`. `ArrowRight`/`ArrowDown` move to and select the next chip; `ArrowLeft`/`ArrowUp` the previous; `Home`/`End` jump; `Space` selects. Selecting a destination chip in step 1 **pre-fills the WhatsApp message body** used by every `wa.me` anchor on the page.

#### 4.11.3 Tel input with `+91` adornment

```
 Mobile number
 +91 │ 98765 43210                                    ← ruled, not boxed
 ────┴──────────────────────────────────────────────  1px --ink-muted (6.10:1)
 We will call you on this number. Nothing else.       ← --fs-caption, --ink-muted
```

`type="tel" inputMode="numeric" autoComplete="tel-national"`. **`+91` is a rendered adornment, not a field** — it is a `<span aria-hidden="true">` separated from the input by a 1px `--rule-strong` vertical rule, and the `<label>` text itself reads "Mobile number, +91" so the country code is in the accessible name. Value is `--fs-data` Plex Mono, tabular.

#### 4.11.4 Native select (nearest office)

**A native `<select>`, never a custom dropdown.** Eighteen branches, smart-defaulted from the destination chip's regional affinity where available and otherwise to `Delhi South`. Ruled underline in `--ink-muted`, radius `--r-2`, `--fs-body-sm`, min-block-size 44px, with the UA's own disclosure affordance left intact (which is what satisfies SC 1.4.11 for this control).

#### 4.11.5 Validation states

| State | Stroke | Message | ARIA |
|---|---|---|---|
| resting | 1px `--ink-muted` (6.10:1) | hint in `--fs-caption` `--ink-muted` | `aria-describedby` → hint id |
| focus | 2px `--sienna-press` (4.31:1 on tracing — PASS non-text) | hint unchanged | — |
| invalid | 2px `--clay` (5.41:1) | error in `--fs-caption` `--clay`, prefixed by a mono `!` | `aria-invalid="true"`, `aria-describedby` → error id **and** hint id |
| valid | 1px `--verdigris` (4.87:1) | no message; a `✓` in `--verdigris` at the field's end | — |

Errors are announced through a single form-level `aria-live="polite"` region; individual fields do **not** carry `role="alert"`, which would interrupt typing. Validation fires on `blur` and on submit, never on every keystroke. The submit button is never disabled (§4.2).

**Consent.** One **unticked** marketing-consent checkbox, **separate** from the implied consent to be called about this enquiry, in itemised plain language stating purpose and retention. Consent timestamp, IP and form version are logged. No promotional contact 9 PM–9 AM (TCCCPR). Full copy and retention schedule in `06-strategy.md`.

---

### 4.12 Footnote marker + marginalia rail

**Anatomy**

```
 700+ partner universities³            │  ³ Formal institutional partner
                          ↑            │    agreements. Country split: USA
                    --sienna-press     │    150+, UK 80+, Canada 60+,
                    superscript, mono  │    Australia 45+, Germany 30+,
                                       │    New Zealand 30+, Ireland 20+,
                                       │    Singapore 7. Last verified
                                       │    Aug 2026.
                                       ↑ --fs-footnote, --ink-muted,
                                         Newsreader opsz 8
```

**Variants** — `marker` (the superscript in flowing text) · `rail-full` (≥1280px) · `rail-numbers` (1024–1279px) · `inline-details` (<1024px). **There is no bottom sheet.**

**States** — resting · linked-hover (marker and rail line illuminate together: rail line's left edge grows a 2px `--sienna` marker, text `--ink-muted` → `--ink`, `--dur-2`) · focus-visible · open (`inline-details` only).

**Tokens** — marker: Plex Mono superscript at `--fs-mono-label`, colour **`--sienna-press`** on `--paper`/`--paper-still`/`--paper-laid`/`--paper-warm` and **`--sienna-deep`** on `--paper-tracing` and all tints (§2.3 note 2); on the endpaper, `--sienna-on-dark`. Rail lines `--fs-footnote` Newsreader opsz 8, `--ink-muted` (7.20:1 — **never `--ink-faint`**, which fails at 13px). Rail `--z-rail`. Rail column rule `--rule-hairline` `--rule` at its left edge.

```ts
export interface FootnoteProps {
  /** Stable id resolving into the Sources & Methods registry. A 404ing
   *  footnote does more damage than no footnote. */
  id: string;
  /** Rendered marker; usually the registry index. */
  index: number;
}

export interface FootnoteEntry {
  id: string;
  index: number;
  text: string;
  source: { name: string; href?: string };
  lastVerified: string;         // 'Aug 2026'
  owner: string;                // registry owner, required
}

export interface FootnoteRailProvider {
  entries: readonly FootnoteEntry[];
  /** Section-scoped: the rail shows only what is in view. */
  activeSectionId: string;
  illuminate: (id: string | null) => void;
}
```

**ARIA & keyboard** — the marker is `<sup><a href="#fn-3" id="fnref-3">3</a></sup>` with `aria-label="Source 3"` so the accessible name is not the bare digit. The rail is `<aside aria-label="Sources">` containing an `<ol>`; each `<li id="fn-3">` ends with a back-link `<a href="#fnref-3" aria-label="Back to reference 3">↩</a>`. Below 1024px the entry is a native `<details>` whose `<summary>` reads `Source 3`. Every entry is data-driven from the Sources & Methods registry (JSON or CMS) with an owner and a last-verified date — enforced at build; a missing entry fails CI.

---

### 4.13 CTA banner

An in-flow conversion band, used exactly three times: at the tail of `what-we-do`, at the tail of `reckoning` after the ₹0 disclosure, and inside the final `questions` answer. It is **never** a floating bar, never a modal, never repeated as decoration.

**Anatomy**

```
─────────────────────────────────────────────────────────────────  --rule-strong
                                                                    (0.125rem)
   Book free counselling with a named GO counsellor.
   ↑ --fs-d2, Newsreader, --ink, max --measure-deck

   ┌──────────────────────────────┐   Call 1800 111 119   WhatsApp us
   │  Book free counselling       │   ↑ ghost CTAs, --marine
   └──────────────────────────────┘
   30 min · free · no obligation
   A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST.
   No fee, no obligation.
─────────────────────────────────────────────────────────────────
```

**Variants** — `standard` (`--paper-tracing` bed, `--rule-chapter` rules top and bottom) · `inline` (inside a FAQ answer: no bed, no rules, CTA + proof line only).

**States** — resting only. No hover state on the band; the CTA carries its own states.

**Tokens** — bed `--paper-tracing`, radius `--r-0`, **no registration offset and no shadow** (it is in flow). Headline `--fs-d2` Newsreader. Primary `primary/lg`. `Call` and `WhatsApp` are `ghost` CTAs in `--marine`; WhatsApp is **ink + outline, never brand green**. Proof line Plex Mono `--fs-caption` `--ink-muted`. Vertical padding `--section-y-tight`.

```ts
export interface CTABannerProps {
  variant?: 'standard' | 'inline';
  headline?: string;
  primary: Pick<CTAProps, 'label' | 'href' | 'subLabel' | 'prefill'>;
  proofLine: string;
  tertiary?: readonly { label: string; href: string }[];  // Call, WhatsApp
}
```

**ARIA & keyboard** — renders `<section aria-labelledby>` when it has a headline, otherwise a plain `<div>`. Tertiary actions are real `<a href="tel:…">` and `<a href="https://wa.me/…">` that work with JavaScript disabled. Natural tab order; no focus management.

---

### 4.14 Footer colophon

**Anatomy**

```
═══════════════════════════════════════════════════════════════  0.125rem --rule-strong
 GLOBAL OPPORTUNITIES PRIVATE LIMITED                --fs-label, --ink
 HS-27, 2nd Floor, Kailash Colony Market,            --fs-body-sm, --ink-muted
 New Delhi 110048
 1800 111 119 · +91 8282828215 · +91 11 47141414     --fs-data, mono, --marine

 EIGHTEEN OFFICES                 FIFTEEN DESTINATIONS       LEGAL
 Ahmedabad   Jalandhar            Australia   Italy          Privacy
 Amritsar    Ludhiana             USA         France         Terms
 Bangalore   Mohali               UK          Spain          DPDP notice
 …           …                    …           …              Grievance officer

────────────────────────────────────────────────────────────  --rule
 SOURCES & LAST VERIFIED                              --fs-label
 ┌──────┬─────────────────────────┬──────────┬──────────────┐
 │ REF  │ CLAIM                   │ SOURCE   │ LAST VERIFIED│
 ├──────┼─────────────────────────┼──────────┼──────────────┤
 │  1   │ Founded 2001, Amritsar  │ About    │ AUG 2026     │
 │  2   │ 40,000+ students placed │ /our-…   │ AUG 2026     │
 │  3   │ 700+ partner universities│ /partn… │ AUG 2026     │
 └──────┴─────────────────────────┴──────────┴──────────────┘

 NEW DELHI 14:32 IST   ·   LONDON 10:02 BST         muted dual clock
────────────────────────────────────────────────────────────
 Volume XXV. Set in Newsreader, Hanken Grotesk and IBM Plex Mono.
 New Delhi, 2026.                            --fs-footnote, Newsreader italic
```

**Variants** — `full` (≥1024px, four columns) · `stacked` (<1024px, single column with the Sources table becoming a definition list).

**States** — resting. One motion event only: the closing rule draws once, 600ms `power2.inOut` (GSAP DrawSVG). Nothing else moves.

**Tokens** — surface `--paper-laid`, top rule `--rule-chapter` `--rule-strong`. Legal entity `--fs-label` Hanken 600 uppercase `--ink`. Address `--fs-body-sm` `--ink-muted`. Numbers `--fs-data` Plex Mono `--marine`, tabular. Column heads `--fs-label` `--ink-muted`. Sources table: `--fs-data` Plex Mono, rules `--rule-hairline` `--rule`, header row `--rule-strong`. Dual clock `--fs-data` Plex Mono `--ink-muted`, digit odometers ticking once per minute. Closing line `--fs-footnote` Newsreader italic `--ink-muted`. Padding `--section-y-tight`.

```ts
export interface ColophonProps {
  legalName: string;            // 'GLOBAL OPPORTUNITIES PRIVATE LIMITED'
  hq: { street: string; city: string; postcode: string };
  phones: readonly { label: string; display: string; href: `tel:${string}` }[];
  branches: readonly { city: string; address: string; tel: `tel:${string}` }[];  // 18
  destinations: readonly string[];  // 15
  legalLinks: readonly { label: string; href: string }[];
  /** First-class element, not a link. Driven by the Sources registry. */
  sources: readonly FootnoteEntry[];
  dualClock: { origin: 'Asia/Kolkata'; destination: string };
  closingLine: string;
}
```

**ARIA & keyboard** — `<footer role="contentinfo">`. The HQ block is an `<address>`. The branch list is a `<ul>` where each city's phone is a real `tel:` anchor — **all eighteen branches must be reachable by keyboard**. The Sources table is a real `<table>` with a `<caption>` reading "Sources and last-verified dates" and `<th scope="col">`. The dual clock is a `<p>` with `aria-live="off"` — a clock that announces every minute is hostile; the times are also rendered as `<time datetime>`.

---

### 4.15 Mobile sticky bar

**Anatomy**

```
──────────────────────────────────────────────  0.0625rem --rule-strong
│                │                │            │
│     Call       │   WhatsApp     │    Book    │   ≥48px targets
│  1800 111 119  │                │            │   --fs-body-sm, Hanken 600
│                │                │            │
──────────────────────────────────────────────
        ↑ padding-block-end: env(safe-area-inset-bottom)
```

**Variants** — `default` only. Exists **below 1024px only**.

**States** — hidden (above 25% scroll depth it has not yet entered) · entering (`translateY(100%) → 0`, once, `--dur-4`, `--ease-quart`, Motion) · resting · pressed (`translateY(1px)`, `--dur-1`).

**Tokens** — surface `--paper` @ 98% (`rgb(251 248 242 / 0.98)`), **no `backdrop-filter`**. Top hairline `--rule-hairline` `--rule-strong`. `--z-mobilebar` (40) — below `--z-scrim` (50) so a drawer's scrim covers it. Labels `--fs-body-sm` Hanken 600. `Call` and `WhatsApp` in `--marine`; `Book` in `--sienna-press` as a filled `--r-pill` segment. Targets **≥48px**, padded above the Android gesture inset via `padding-block-end: env(safe-area-inset-bottom)`.

```ts
export interface MobileBarProps {
  tel: `tel:${string}`;              // 'tel:+918282828215'
  /** Message body pre-filled from the last destination chip tapped. */
  whatsapp: `https://wa.me/${string}`;
  bookHref: '#enquiry';
  /** Scroll fraction at which the bar enters. Default 0.25. */
  enterAt?: number;
}
```

**ARIA & keyboard** — `<nav aria-label="Quick actions">` containing exactly three `<a>` elements. **All three are real anchors that function with JavaScript disabled** — the bar is rendered server-side and is visible without JS; only its entrance animation is client-side. WhatsApp is rendered in ink + `--marine` outline, never brand green. The bar must never overlap the `enquiry` submit button: `#enquiry` carries `scroll-margin-block-end` and a matching `padding-block-end` equal to the bar's height plus the safe-area inset.

---

## 5. Iconography & marks

> **Canon change · 2026-08-04 · client override.** This section previously opened *"There is no icon library on this page. No Lucide, no Heroicons, no Phosphor, not a subset of one."* The client has decided to adopt **Lucide site-wide**, which supersedes that ban. What follows is the implementation contract for the adopted set. The concept-level restatement, and the original paragraph preserved verbatim as recorded history, are in `01-creative-vision-and-brand.md §3.6`. Three things the override did **not** touch: the drafted-marks set, the banned-imagery list, and the WhatsApp-green prohibition.

**Two layers.** **Drafted marks** are structure — they mark a position or a boundary and they are drawn into the layout. **Icons** are labels — they sit beside a word. Neither substitutes for the other, and a glyph never enters a plate.

**Icons: one gate, `components/ui/icon.tsx`.** No section imports a glyph from `lucide-react` and renders it directly. Every glyph passes through `<Icon as={Glyph} />`, and the primitive — not the calling site — owns size, stroke, colour and accessibility. The values it pins:

| Property | Value | Why this value |
|---|---|---|
| Library | `lucide-react`, exclusively | One vocabulary. A second set is a second design system |
| API | `<Icon as={Phone} size="sm" />` — the glyph is passed as a component | Every glyph in the app is reachable from one file, so weight and colour are changed once, not in fifteen sections |
| Sizes | `sm` 16px · `md` 20px (default) · `lg` 24px. **No other value** | Three steps set against the type scale's cap heights. An arbitrary size is how a glyph starts competing with a heading |
| Stroke | `1.75` at 16px · `1.5` at 20px · `1.5` at 24px | **Lucide's default of `2` is explicitly rejected.** Every rule, keyline, crosshair and registration corner on this page is a 1px hairline; a 2px glyph out-weighs the entire drafted layer and reverts the page to a SaaS template with a serif headline. The half-step *up* at 16px is optical compensation, so the smallest glyph does not thin out beside a 1px rule |
| Colour | `currentColor`, always. The primitive sets no colour of its own | An icon inherits its label's colour. This keeps glyphs out of the semantic palette, where `--verdigris` means *verified* and `--clay` means *external deadline* |
| Accessibility | `aria-hidden="true"` by default. Passing `label` — and only when the icon is the **sole** content of a control — emits `role="img"` with that name | An icon beside visible text is decoration; announcing it duplicates the label. An icon alone in a control has no other name, so SC 1.1.1 requires one. There is no third case |
| Layout | `inline-block shrink-0`, `focusable="false"` | A glyph never squashes inside a flex row and never becomes a tab stop in IE-legacy SVG focus order |

**Sizing in practice.** `sm` beside `--fs-body-sm` and mono labels; `md` beside `--fs-body` and in ledger rows; `lg` for the mobile bar and other ≥48px targets. No glyph appears at display sizes — headline-scale iconography is not a case this system has, and if one is proposed it is a new decision, not an extrapolation of this table.

**The drafted-marks set** — eight marks, all SVG strokes, all structural, none decorative: crosshair, latitude tick, bearing mark, registration corner, annotation leader, contour ring, rule terminal, and the footnote marker (which is pure type). Each ships as a `<symbol>` in a single sprite with `vector-effect: non-scaling-stroke`, `stroke-linecap: butt`, `stroke-linejoin: miter`, and `stroke-width: 1` at the parent's `currentColor`. Decorative instances carry `aria-hidden="true"`; the only informative instance on the page is the India map, which carries `role="img"` and a `<title>`. **Adopting Lucide retires none of these.** The bearing mark stays the disclosure affordance — `ChevronDown` does not replace it. The footnote marker stays a superscript mono numeral — no glyph. And the `branch-atlas` SVG plate keeps its crosshairs and gains **no Lucide glyph inside the `<svg>`**: a plate is drawn, not iconified.

**Where a conventional icon would go, use a word — now optionally a word with a glyph beside it.** `1800 111 119` is set as text and stays set as text; an `<Icon>` may precede it, but a handset glyph never replaces the number. `WhatsApp us` remains a labelled anchor in ink plus outline, **never in WhatsApp brand green** — green means *verified* on this page and the semantic must not leak; because icons render in `currentColor`, a WhatsApp glyph inherits `--ink` and cannot introduce the brand green even by accident. Status marks in the Departure Card stay typographic: `✓` set in Plex Mono for cleared, `—` for pending, in `--verdigris` and `--ink-muted` respectively.

**Flag-avoidance strategy for destinations.** Fifteen destinations, zero flags. Identification runs in four layers, in this order: (1) **the country name set in type** at `--fs-h4` — unambiguous, searchable, translatable, screen-reader-native; (2) **coordinates of the primary study city** in Plex Mono; (3) **a simplified coastline** drawn as Plate D with a `--sienna` crosshair on the primary city and `--rule-strong` latitude ticks; (4) **the data itself** — `80+ partners · Sep/Oct main intake · £9,000–30,000 PG/yr · Graduate Route 2 yrs` identifies the United Kingdom more usefully to a comparison-shopping applicant than any flag. Currency symbols (`£ $ € ₹`) are the only nation-adjacent glyphs permitted, and they appear because they carry information, not identity.

**Banned marks, restated — and unchanged by the 2026-08-04 override.** Flags, landmarks, globes, aircraft, passports, suitcases, dotted flight paths, graduation caps, handshakes, isometric illustration, 3D clay. These were never bans on a *library*; they are bans on the category's picture language, and passing one through `<Icon>` does not launder it. `Plane`, `Globe`, `GraduationCap`, `Luggage`, `Handshake` and `Briefcase` all exist in Lucide and none of them may ship on this page.

---

## 6. Dark chapter — endpaper token remapping

`endpaper` is the page's **only** dark surface. It is entered through the 30vh `--grad-endpaper-turn` band and left through the 24vh `--grad-endpaper-return` band at the top of `questions`. Remapping is done **through the semantic aliases**, never by rewriting raw tokens, so a component authored against `--text` and `--divider` works on both surfaces with no branch.

Applied via `[data-surface="dark"]` on the `#endpaper` section root. Note that `data-chapter="success"` is **not** the selector: `questions` and `enquiry` also carry `data-chapter="success"` on light surfaces (§2.3 note 1).

| Alias | Light value | Dark value | Ratio on `--endpaper` | Notes |
|---|---|---|---|---|
| `--surface` | `--paper` `#FBF8F2` | `--endpaper` `#0E2029` | — | Full-bleed background; content stays inside `--content-max` |
| `--surface-raised` | `--paper-tracing` `#EDE5D7` | `--endpaper-2` `#142E3A` | — | Plate C fields, testimonial blocks |
| `--text` | `--ink` `#171310` | `--plate-white` `#F0EAE0` | **13.96** | AAA. Canon states ~15:1; computed 13.96 |
| `--text-muted` | `--ink-muted` `#5C5247` | `--plate-grey` `#A8A096` | **6.47** | AA normal |
| `--text-faint` | `--ink-faint` `#8A7F72` | `--plate-grey` `#A8A096` | **6.47** | **Deliberately not a fainter value** — there is no `--ink-faint` equivalent in the dark set, so faint type is promoted to muted rather than invented |
| `--link` | `--marine` `#14384A` | `--ochre-on-dark` `#E8B75C` | **9.03** | Marine is invisible on endpaper (1.35:1); ochre-on-dark is the correct link colour |
| `--divider` | `--rule` `#DDD2BF` | `--plate-rule` `#2A3E48` | 1.50 | Decorative rule, exempt from 3:1 |
| `--divider-strong` | `--rule-strong` `#C7B9A1` | `--plate-rule` `#2A3E48` | 1.50 | The dark set has one rule value; both weights map to it and differentiate by **thickness**, not colour |
| `--focus-ring` | `--sienna-press` `#B24A22` | `--ochre-on-dark` `#E8B75C` | **9.03** | Canon's intended override, correctly scoped |
| `--state-verified` | `--verdigris` `#3E6B58` | `--verdigris-on-dark` `#6FA98F` | **6.16** | AA normal. Canon states 7.3:1; computed 6.16 — do not claim AAA |
| `--state-external` | `--clay` `#9E3B24` | `--sienna-on-dark` `#E0794A` | **5.57** | AA normal. Canon states 7.0:1; computed 5.57 — do not claim AAA |

**Tokens that do not remap.** `--sienna`, `--sienna-press`, `--sienna-deep`, `--ochre` and `--verdigris` (the light-chapter values) are **forbidden** inside `[data-surface="dark"]`: `--sienna` measures 3.71:1 on endpaper and fails AA for normal text. The dark set exists precisely to prevent this. `--marine` and `--marine-mid` are likewise forbidden as *text* on dark (1.35:1 and 1.19:1) — they survive only as gradient stops inside the turn and return bands.

**Behavioural rules inside the dark chapter.**
- Counters are **server-rendered at their final value** and animate only the final 12%, once, in tabular-locked cells.
- The background transition is a scrubbed tween on **one fixed backdrop div**; **no element moves**. The intensity is chromatic, not kinetic.
- Registration offsets inside the dark chapter use `--reg-sienna` (`#C2562B` on `#0E2029` = 3.71:1, non-text, PASS) or `--reg-rule` (`#C7B9A1` on `#0E2029`, decorative). `--reg-marine` is forbidden here — marine on endpaper is invisible.
- The grain layer is unchanged: it is page-level and `mix-blend-mode: multiply` at 4%, which reads correctly over both cream and marine.
- `--shadow-drawer` still applies to drawers opened from within the dark chapter, because a drawer is above the page plane regardless of the plane's colour.

---

## 7. Resolutions recorded

Recorded so no downstream author re-opens them. Every resolution stays inside canon values; none introduces a new hex, size, radius, easing or shadow. Row 13 is the exception in kind rather than in value: it is not an ambiguity the authors resolved but a position the **client overrode**, and it is logged here so it reads as a decision rather than as drift.

| # | Canon ambiguity or inconsistency | Resolution |
|---|---|---|
| 1 | `[data-chapter="success"] :focus-visible` would apply the `--ochre-on-dark` ring to `questions` (`--paper`, 1.74:1) and `enquiry` (`--paper-tracing`, 1.48:1). | Key the override on `[data-surface="dark"]` via the `--focus-ring` alias. Dark chapter gets ochre; the two light Success sections keep `--sienna-press`. §2.3 note 1. |
| 2 | `--sienna` is assigned to "footnote markers", but at 3.60–4.36:1 it fails AA normal text on all five light surfaces. | Sienna **text** uses `--sienna-press` on `--paper`/`--paper-still`/`--paper-laid`/`--paper-warm` and `--sienna-deep` on `--paper-tracing` and all tints. `--sienna` retained for strictly non-text use. §2.3 note 2. |
| 3 | `--rule` is assigned to "input borders" at 1.20–1.41:1, failing SC 1.4.11's 3:1 boundary requirement. | Form controls are **ruled, not boxed**: a 1px bottom rule in `--ink-muted` (6.10:1 on `--paper-tracing`), exposed as `--field-stroke`. `--rule` retained for decorative hairlines. §2.3 note 3. |
| 4 | The token table assigns "plate keylines" to `--rule`; the art-direction prose specifies "a 1px `--rule-strong` keyline". | Outer plate keyline = `--rule-strong`; interior and caption rules = `--rule`. §2.3 note 3. |
| 5 | `--ochre` ticks at 2.12:1 would be the sole colour-carrier of a category distinction in `eleven-months`. | Every tick carries a mono date label in `--ink`, a mono category label, and an `--ink-muted` stem. Ochre encodes category redundantly. §2.3 note 4. |
| 6 | `--grad-plate-laid` is listed among the six permitted gradients but no placement is specified. | Permitted as the Plate D field fill and as the light Plate A variant inside the Trust chapter, where `--grad-plate-marine` would be too loud on `--paper-still`. §1.2. |
| 7 | `--plate-white` over the sienna end of `--grad-plate-marine` measures 3.77:1. | Plate A type is confined to the **0–68% band of the ramp** (worst case `#4A5A5E`, 6.02:1). Binding layout constraint. §1.2. |
| 8 | The canon annotates several tokens with ratios that a correct WCAG computation does not reproduce. | Hex values are canon and never change. **Computed** ratios govern compliance. The two optimistic dark-set figures (`--sienna-on-dark`, `--verdigris-on-dark`) remain AA-passing; AAA must not be claimed for them. §2.3 note 5. |
| 9 | `sticky-nav` and `colophon` carry no chapter, so `--nr-opsz` is undefined for them. | Root default `--nr-opsz: 60`, a value already present in the canon's axis block. `colophon` is explicitly **not** given `data-chapter="success"`. |
| 10 | "No animated `box-shadow`" versus the plate hover, which grows its registration offset. | Permitted as a **discrete two-value swap** at `--dur-2` — hard-edged offsets with zero blur radius, not an interpolated elevation. No other component may animate `box-shadow`. §4.3. |
| 11 | A loading button would conventionally show a spinner, which is an infinite animation. | **No spinners anywhere.** Loading is a label swap plus the determinate progress rule. The submit button is never disabled. §4.2. |
| 12 | The concept specifies a footnote **bottom sheet** below 1024px; the canon replaces it with inline `<details>` and states "No bottom sheet". | Canon governs. Inline native `<details>` beneath each figure, zero JS, no collision with `mobile-bar`. §3.3, §4.12. |
| 13 | **Client override, 2026-08-04.** The blueprint banned every icon library ("no Lucide, no Heroicons, no Phosphor"). The client has decided to adopt **Lucide site-wide**, which the design documents contradicted. | The ban is superseded; the *look* it protected is not. Lucide ships through one primitive, `components/ui/icon.tsx`, at three sizes (16/20/24), pinned stroke (1.75/1.5/1.5 against Lucide's 2px default), `currentColor` only, `aria-hidden` unless the icon is a control's sole content. Drafted marks, banned imagery and the WhatsApp-green prohibition are unaffected. §5; `01-creative-vision-and-brand.md §3.6`. |

---

*Sibling documents: `00-README.md` (how to use this blueprint) · `01-creative-vision-and-brand.md` (concept, references, voice, IA) · `02-sections-part1.md` and `03-sections-part2.md` (section-by-section layout and copy) · `05-motion-blueprint.md` (timelines, easing application, GSAP/Motion/Anime ownership, reduced-motion contract) · `06-strategy.md` (SEO, structured data, conversion instrumentation, DPDP/TCCCPR compliance, performance budgets).*
