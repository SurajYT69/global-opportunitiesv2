# 05 — Motion Blueprint

**Purpose.** This document is the buildable motion specification for the Global Opportunities landing page. It converts the creative canon (`direction.md`, §"Motion personality" and §"V1 BUILD NOTES") into per-section triggers, durations, easings, library ownership and reduced-motion fallbacks that a developer can implement without re-opening a single creative decision. Every duration, easing curve and token quoted here is verbatim from the canon. Nothing new is invented; where the canon was silent, the resolution is marked **[GAP RESOLVED]** with its reasoning.

**Siblings.** `01-concept.md` (narrative) · `02-information-architecture.md` (section order & IDs) · `03-section-specs.md` (per-section content & copy) · `04-design-system.md` (tokens, contrast table, components) · **`05-motion-blueprint.md`** (this file) · `06-strategy.md` (responsive, conversion, accessibility, performance/SEO, handoff).

---

## Table of contents

1. [Motion principles](#1-motion-principles)
2. [Per-section animation specs](#2-per-section-animation-specs)
3. [GSAP timeline plan](#3-gsap-timeline-plan)
4. [Framer Motion plan](#4-framer-motion-plan)
5. [Anime.js micro-interaction plan](#5-animejs-micro-interaction-plan)
6. [Scroll storyboard](#6-scroll-storyboard)
7. [3D & depth](#7-3d--depth)
8. [Motion governance](#8-motion-governance)

---

## 1. Motion principles

### 1.1 The Atlas motion personality

> *"The feel is **paper being read**, not **a machine performing**."* — canon, §Motion personality

Five rules follow from that sentence, and every spec in §2 is derived from them.

**1. Letterpress restraint.** Motion on this page imitates the physical acts of a press and a reader: type rising behind a mask as a page turns, a rule inking left-to-right at pen speed, a value settling into a fixed-width cell, a status mark stamping. Nothing eases, glides, floats, drifts, bounces (except the single sanctioned `back.out(1.4)` status-mark stamp), pulses or breathes. If an effect could be described as *animated*, it is wrong; if it could be described as *set, inked or stamped*, it is right.

**2. The page contains no infinite animation. Anywhere.** Not one loop, not one breathing glow, not one drifting mesh, not one marquee, not one shimmer. This is canon, and it is the single most counter-category decision on the page. It also removes the largest sustained CPU cost on the ₹15,000 Android that is our target device.

**3. Stillness as signal — and `still-page` is where the signal is loudest.** Section 7 (`still-page`, *Nothing here casts a shadow*) has **zero motion beyond a single 400ms opacity fade**. That is a specification, not an omission. It is the chapter where a parent is being asked to believe six accreditation claims, it is set on `--paper-still` (`#FDFBF7`, the flattest and brightest surface on the page), and it deliberately withholds the one thing every competitor supplies at that exact moment — movement. See §2.7 for the full spec.

**4. The motion budget is fixed and small.** Canon: *"one one-shot hero sequence (≤1.4s), one user-triggered interaction per chapter, one scroll-scrubbed pinned chapter, and reveals that fire once."* No section gets a second signature move. If a section needs an eighth idea, it does not get one.

**5. Nothing reflows, ever.** Values in the Departure Card resolve inside fixed-width tabular cells. Counters are server-rendered at their final value and animate only the last 12%. Every figure carries `font-variant-numeric: tabular-nums lining-nums slashed-zero`. GO's current site renders literal zeros without JS; that bug is structurally impossible here because the final number is already in the server HTML.

### 1.2 Global duration and easing standards (canon, verbatim)

**Easing curves.** These six are the complete permitted set. No other curve appears on the page.

| Token | `cubic-bezier` | GSAP ease | Anime.js v4 ease | Use |
|---|---|---|---|---|
| `--ease-quad` | `cubic-bezier(0.25,0.46,0.45,0.94)` | `power1.out` | `outQuad` | Colour, opacity, hover |
| `--ease-cubic` | `cubic-bezier(0.215,0.61,0.355,1)` | `power2.out` | `outCubic` | Small reveals, chip states |
| `--ease-quart` | `cubic-bezier(0.165,0.84,0.44,1)` | `power3.out` | `outQuart` | Plate wipes, drawer open |
| `--ease-expo` | `cubic-bezier(0.19,1,0.22,1)` | `expo.out` | `outExpo` | Headline / SplitText reveals |
| `--ease-inout` | `cubic-bezier(0.65,0,0.35,1)` | `power2.inOut` | `inOutQuad` | Rule draws, map draws |
| `--ease-press` | `cubic-bezier(0.34,1.4,0.64,1)` | `back.out(1.4)` | `outBack(1.4)` | Status pill flip, button press **only** |
| *(scrub)* | — | `none` | `linear` | All scrubbed timelines; `scrub: 0.6` |

> **[GAP RESOLVED]** The canon easing table gives CSS and GSAP equivalents but not Anime.js v4 names. The third column above is the v4 `eases` mapping and is the only place Anime.js easing names may be sourced from. `outBack(1.4)` is v4's parameterised form and matches `back.out(1.4)` exactly.

**Duration scale.**

```css
--dur-1: 120ms;  /* press feedback */
--dur-2: 200ms;  /* hover, colour, focus ring */
--dur-3: 320ms;  /* small reveal, chip, accordion */
--dur-4: 480ms;  /* plate wipe, drawer, rule draw */
--dur-5: 700ms;  /* chapter reveal — HARD CAP for all non-hero motion */
--dur-hero: 900ms; /* hero headline only; full hero sequence <=1400ms */
--stagger-tight: 0.045s; --stagger: 0.08s; --stagger-loose: 0.12s;
```

**Two envelope rules, distinguished.** `--dur-5` (700ms) caps the duration of any *individual* non-hero tween. A staggered *sequence* may run longer than 700ms because each of its members is ≤700ms. Exactly two sequences on the page exceed a 700ms envelope, and both are declared:

| Sequence | Envelope | Longest single tween |
|---|---|---|
| `hero` boot sequence | **1400ms** (canon cap) | 900ms (`--dur-hero`, H1 lines) |
| `branch-atlas` map draw + 18 node stamps | **1416ms** (declared, §5.2) | 900ms (India outline draw) |

No third sequence may be added to this table without re-opening the canon.

### 1.3 Division of labour — the three-library decision table

Canon, §Motion personality: *"Library ownership is strict: **GSAP + ScrollTrigger** owns anything measured against scroll position; **Motion** owns React state and pointer; **Anime.js** owns SVG stroke draws and tabular odometers only, scoped and dynamically imported; **Lenis** owns scroll feel and is skipped entirely under reduced motion."*

The table below is that rule expanded to every pattern on the page, with the reason each assignment is correct rather than merely permitted.

| Pattern | Owner | Why this library and not the others |
|---|---|---|
| Pinned horizontal chapter (`eleven-months`) | **GSAP ScrollTrigger** | `pin` + `scrub` + `containerAnimation` has no competitor. Motion's `useScroll` cannot pin, and re-implementing pin from scratch reintroduces every layout bug ScrollTrigger already solved. |
| Scrubbed colour inversion (`endpaper`, `questions`) | **GSAP ScrollTrigger** | Needs a scrub value (`0.6`) tied to a precise scroll band with `invalidateOnRefresh`. Motion's `useScroll` + `useTransform` could do it, but ScrollTrigger is already in the bundle for the pin, so marginal cost is ~0 and there is one scroll authority instead of two. |
| Masked line reveal of a display headline | **GSAP SplitText** | 3.13's rewrite ships `mask:"lines"` and `autoSplit` built in, plus automatic `aria-label`/`aria-hidden` — canon build note 16 forbids overriding those. Hand-rolling a split in Motion loses the a11y attributes and the font-load re-split. |
| Scramble-resolve of Departure Card values | **GSAP ScrambleTextPlugin** | Must run inside the same one-shot hero timeline as the SplitText rise, at an exact position parameter. A second library in the hero is a second RAF loop on the LCP frame. |
| Stroke draws on rules and totals | **GSAP DrawSVGPlugin** | Used where the draw is a member of a GSAP timeline (hero masthead rule, reckoning total rule, colophon closing rule). Anime's `svg.createDrawable` is equivalent but would import a second library into three otherwise-GSAP sections. |
| One-shot viewport reveals (`colophon-strip`, `what-we-do`, `contributors`, `for-parents`, `register` columns) | **Motion `whileInView`** | IntersectionObserver-backed and therefore free on `ScrollTrigger.refresh()` — which is O(n) re-measurement and fires on every mobile address-bar resize. Using ScrollTrigger here would burn budget for no gain. |
| Nav state on scroll (rule strengthen, wordmark 1→0.92, spine fill) | **Motion `useScroll`/`useTransform`** | Continuous, unpinned, driven by one scalar, and it lives in a component that is already client-side for the mega-panel. `useMotionValue` writes bypass React render entirely (zero re-renders). |
| Shared-element morphs (gazetteer margin plate, contributors drawer) | **Motion `layoutId`** | FLIP shared-element transitions across mount/unmount boundaries are Motion's single strongest capability. GSAP's Flip plugin can do it but not across React unmount without manual state parking. |
| Enter/exit of transient UI (drawers, form steps, mega-panel) | **Motion `AnimatePresence`** | Exit animations require holding an unmounting React subtree. Nothing else in the stack does this. |
| Pointer state (`whileHover`, `whileTap`, chip select, CTA press) | **Motion** | Declarative, colocated with the component, and `MotionConfig reducedMotion="user"` gates all of it centrally. |
| Bar/meter fills driven by user input (reckoning ₹ bar) | **Motion `useMotionValue` + `useSpring` → `scaleX`** | Canon prescribes it exactly; spring physics off a motion value is a Motion primitive, and `scaleX` keeps it inside the transform-only law. |
| SVG path draw of the India outline + 18 node stamps | **Anime.js v4 `svg.createDrawable`** | Canon assigns it. `createDrawable` returns proxied elements exposing a normalised `draw: "start end"` property, which is a cleaner authoring surface than dash-offset maths for a 19-element geographic sequence. Dynamically imported at the section boundary so it is not in the initial bundle. |
| Tabular odometer counters (`register`, `endpaper`, `reckoning`, dual clock) | **Anime.js v4 `animate` + `utils.round`** | Canon assigns it. Anime animates a plain JS object and writes `textContent` in `onUpdate`, which is exactly what an odometer over a server-rendered final value needs. Dynamically imported. |
| Caption letterpress re-set | **Anime.js v4 `text.splitText`** | Canon assigns text micro-effects outside the hero to Anime; the effect only ever runs after the section is already interactive, so the dynamic import cost is invisible. |
| Smooth scroll feel | **Lenis 1.3.25** | `autoRaf: false`, driven by `gsap.ticker`, `lagSmoothing(0)`, `syncTouch: false`. **Not initialised at all under reduced motion.** |
| FAQ accordion (`questions`) | **CSS only, zero JS** | Native `<details>` + `grid-template-rows: 0fr→1fr`. No library earns its bytes here. |
| `still-page` 400ms fade | **CSS only** | One shared page-level IntersectionObserver toggles `data-seen`; the animation itself is a CSS `transition`. |

**Bundle consequence.** GSAP + ScrollTrigger + SplitText + DrawSVG + ScrambleText load with the initial bundle because the hero needs SplitText, ScrambleText and DrawSVG on the LCP frame. Motion loads as `LazyMotion` + `domAnimation` (4.6 kB shell + 15 kB features, vs 34 kB for the full `motion` import). Anime.js is **never** in the initial bundle — it is dynamically imported at three section boundaries (`register`, `branch-atlas`, `endpaper`) and on first interaction in two more (`reckoning`, `for-parents`).

---

## 2. Per-section animation specs

Every section below is specified with: **Trigger · Sequence · Duration · Easing · Scroll behaviour · Library + why · Performance · Mobile · Reduced motion.**

### 2.1 `sticky-nav` — The Running Head

- **Trigger.** Continuous scroll position, from `0` to document end. No discrete trigger.
- **Sequence.**
  1. `scrollY` `0 → 40px`: wordmark `scale` `1 → 0.92`, transform-origin `left center`.
  2. Same range: the `0.25rem` `--rule-strong` rule beneath goes `opacity` `0.55 → 1`.
  3. Same range: nav background `--paper` opacity `0.92 → 0.96` (canon: solid `--paper` at 96%, **never** `backdrop-filter`).
  4. Whole-document range: the chapter spine in the outer left gutter fills top-down with `--grad-spine-fill` via `scaleY` `0 → 1`, transform-origin `top`.
  5. Chapter label beside the spine re-typesets at each of the six chapter boundaries (`I DREAM` → `II EXPLORE` → …), `opacity` cross-fade only.
- **Duration.** Steps 1–3 are position-mapped, not timed. Step 5 cross-fade `--dur-2` (200ms). Mega-panel open `--dur-4` (480ms).
- **Easing.** Steps 1–4 `none` (position-mapped, no easing on a scroll-linked value). Step 5 `--ease-quad` / `power1.out`. Mega-panel `--ease-quart` / `power3.out`.
- **Scroll behaviour.** No ScrollTrigger. `useScroll()` on the window for steps 1–3; `useScroll({ target: pageRef, offset: ["start start", "end end"] })` for the spine. Zero pins, zero scrubs, zero refresh cost.
- **Library + why.** **Motion.** The nav is already a client component (mega-panel state); `useTransform` off a `MotionValue` writes styles without a single React re-render.
- **Performance.** All four mapped properties are `transform` or `opacity`. The spine is one `<div>` with a static gradient background and an animated `scaleY` — it is never repainted, only recomposited. `will-change: transform` is set on the wordmark and the spine only, via CSS, and only inside `@media (min-width: 1024px)`.
- **Mobile (<1024px).** Wordmark scale and rule strengthen still apply. `VOL. XXV` is dropped at <1280px. The six nav items collapse into a `Contents` disclosure (see `06-strategy.md` §1). The spine is **removed entirely** below 1024px — canon removes the marginalia rail below 1024px and the spine lives in the same gutter. No replacement progress bar: the mobile bar occupies the persistent-chrome budget.
- **Reduced motion.** `MotionConfig reducedMotion="user"` disables the transform mappings; the wordmark renders at `scale: 1`, the rule at full opacity, the spine at `scaleY: 1` (filled). Mega-panel opens instantly with an opacity-only transition. Content is never hidden.

### 2.2 `hero` — The Departure Card

- **Trigger.** Page load, gated on `document.fonts.ready` so SplitText measures against the real Newsreader metrics. Fires exactly once. **No ScrollTrigger, no parallax** — canon: *"No parallax in hero, ever."*
- **Sequence.** One paused GSAP timeline, played on font-ready. Position parameters in seconds; full sketch in §3.2.

  | # | Step | Position | Duration | Easing |
  |---|---|---|---|---|
  | 1 | H1 masked lines rise `yPercent 110 → 0`, stagger `--stagger` (0.08) | `0.00` | `0.90` | `expo.out` |
  | 2 | Masthead rule `drawSVG "0%" → "100%"` | `0.00` | `0.60` | `power2.inOut` |
  | 3 | Eyebrow `opacity 0→1, y 8→0` | `0.10` | `0.32` | `power2.out` |
  | 4 | Departure Card rows stamp `opacity 0→1, y 10→0`, stagger **0.07** (canon) | `0.20` | `0.32` | `power2.out` |
  | 5 | Deck `opacity 0→1, y 12→0` | `0.40` | `0.48` | `power3.out` |
  | 6 | Card values resolve via `scrambleText` into fixed-width cells, stagger `--stagger-tight` | `0.52` | `0.40` | *(scramble; no ease)* |
  | 7 | Dual CTA + proof line + accreditation micro-row, stagger `--stagger-tight` | `0.55` | `0.32` | `power2.out` |
  | 8 | Six status marks flip to `--verdigris`, `scale 0.6→1`, stagger 0.04 | `0.90` | **0.22** (canon) | `back.out(1.4)` |
  | 9 | `STATUS: GO · SEPTEMBER 2027 INTAKE` bar, last | `1.08` | `0.32` | `power3.out` |

  **Timeline ends at 1.40s.** This is the canon cap, hit exactly, not approached.
- **Duration.** Full sequence **≤1400ms**; H1 `--dur-hero` (900ms); nothing else above `--dur-4`.
- **Easing.** As tabulated. Note that `back.out(1.4)` appears **only** at step 8 — it is the sanctioned "press" curve and the status-mark flip is one of only two places on the entire page it is permitted.
- **Scroll behaviour.** None. The hero does not respond to scroll at all.
- **Library + why.** **GSAP** (SplitText + DrawSVG + ScrambleText in one timeline). Three effects must share one clock at exact positions; three libraries would mean three RAF loops competing on the LCP frame.
- **Performance.** The **LCP element is the H1 text, never a plate** (canon build note 2). SplitText `mask:"lines"` wraps each line in an `overflow:hidden` div and translates the inner line — no clip-path, no filter, no layout animation, zero CLS. Card values are inside cells with an explicit `min-width` in `ch` and `tabular-nums`, so the scramble cannot reflow. `autoSplit: true` re-splits on font load and resize; the timeline is rebuilt inside `onSplit` so a resize never leaves half-animated lines. Newsreader and Hanken Grotesk are preloaded; IBM Plex Mono is not, so the mono card values may swap — which is why the cells are width-locked.
- **Mobile.** Identical sequence, identical timings. Single column: H1 above the Departure Card, Plate A below the card. The card keeps all six stations. No reduction of steps — the boot sequence *is* the hero and it costs 1.4s of a one-shot timeline on ~40 elements.
- **Reduced motion.** `gsap.set()` to the final state and `return` before the timeline is built: H1 lines at `yPercent: 0`, masthead rule at `drawSVG: "100%"`, all card values at their **server-rendered final text**, all six status marks at `--verdigris` and `scale: 1`, `STATUS: GO` bar visible. Canon build note 4: *"The Departure Card renders complete and cleared on first paint."* Under reduced motion there is no fade, no stagger, nothing — the page simply *is*.

### 2.3 `colophon-strip` — The Colophon Strip

- **Trigger.** `whileInView`, `viewport={{ once: true, amount: 0.3 }}`. Plus pointer/focus on each footnote superscript.
- **Sequence.**
  1. The six canonical stats, set as one running line, reveal as a group: `opacity 0→1`, `y 24→0`, stagger `--stagger-tight` (0.045s) across the six stat spans.
  2. The six accreditation marks below reveal with the same stagger, offset `+0.10s`.
  3. **On hover/focus of a footnote superscript:** the superscript goes `--sienna` → `--sienna-press` and the matching line in the marginalia rail gets `background: --ochre-tint` and `opacity 0.55 → 1`. This is the *illumination* effect.
  4. **On hover/tap of an accreditation mark:** its "what this means for you" line discloses.
- **Duration.** Steps 1–2 `--dur-5` (700ms) per item. Steps 3–4 `--dur-2` (200ms).
- **Easing.** Steps 1–2 `--ease-quart` / `power3.out`. Steps 3–4 `--ease-quad` / `power1.out`.
- **Scroll behaviour.** IntersectionObserver via Motion. **Zero ScrollTrigger instances.**
- **Library + why.** **Motion.** A once-only fade-up group is the exact case research names as cheaper in Motion than ScrollTrigger, because IO does not participate in `ScrollTrigger.refresh()`.
- **Performance.** `y 24→0` is `transform: translateY`. The rail illumination animates `background-color` and `opacity` on a single ≤96px-wide element — a paint on a tiny region, at `--dur-2`, on a discrete pointer event; this is the sanctioned colour-transition exception (§8.3).
- **Mobile (<1024px).** The rail does not exist. Each footnote becomes an inline native `<details>` disclosure directly beneath its figure (canon). Step 3 therefore has no target on mobile and is not registered. Steps 1–2 unchanged.
- **Reduced motion.** `opacity: 1`, `y: 0` on first paint via `MotionConfig`. Footnote illumination reduces to the colour change only (colour is preserved under `reducedMotion="user"`).

### 2.4 `gazetteer` — The Gazetteer

- **Trigger.** Pointer hover (≥768px) or tap (<768px) on a destination row. Nothing here is scroll-triggered.
- **Sequence.** On row activation:
  1. Row rule (`--rule` → `--rule-strong`) and row background (`transparent` → `--sienna-tint`).
  2. Row expands to a micro-spread: the hidden detail block enters with `opacity 0→1`, `y 8→0`.
  3. Simultaneously, the Plate D cartographic panel morphs into the margin via `layoutId` — the shared element is the plate keyline box, so the previously-active country's panel *becomes* the new one rather than cross-fading.
  4. The plate's caption performs the letterpress re-set (§5.3): characters settle with an 8ms stagger.
  5. Previously-open row collapses via `AnimatePresence` exit: `opacity 1→0`, `y 0→-6`.
- **Duration.** Step 1 `--dur-2` (200ms). Steps 2, 5 `--dur-3` (320ms). Step 3 `--dur-4` (480ms). Step 4 ≤512ms envelope (8ms × chars + 200ms).
- **Easing.** Step 1 `--ease-quad`. Steps 2, 5 `--ease-cubic`. Step 3 `--ease-quart`. Step 4 `--ease-cubic`.
- **Scroll behaviour.** **Zero ScrollTrigger.** Canon states this explicitly for this section, and it is the reason the gazetteer — the longest section on the page — costs nothing on refresh.
- **Library + why.** **Motion** (`layout`, `layoutId`, `AnimatePresence`) for 1–3 and 5; **Anime.js** for 4, dynamically imported when the section first enters the viewport.
- **Performance.** Motion's `layout` animation is FLIP: it measures once and animates `transform` + `scale`, never `width`/`height`. The margin plate is a single `<figure>` at a locked `aspect-ratio` so the morph cannot cause CLS. Only one row may be expanded at a time — enforced in state, which caps the number of simultaneously-animating elements at two rows plus one plate.
- **Mobile (<768px).** Collapses to a tap-accordion (canon). The margin plate moves inline, directly beneath the row's data block, at the same locked aspect ratio. The `layoutId` morph is dropped — with the plate inline there is no shared element to morph *between*, so the plate simply enters with `opacity 0→1` at `--dur-3`. The accordion opens with `grid-template-rows: 0fr → 1fr` (§8.3, sanctioned exception), never `height: auto`.
- **Reduced motion.** `layout` and `layoutId` animations are disabled by `MotionConfig reducedMotion="user"` — the plate jumps to position, opacity is preserved. The accordion transition is zeroed by the CSS backstop. The row still expands; it just expands instantly. The letterpress re-set does not run at all (its Anime import is gated on the same media query).

### 2.5 `register` — The Register

- **Trigger.** IntersectionObserver, `rootMargin: "0px 0px -20% 0px"`, fires once. On fire: dynamic-import Anime.js, then run.
- **Sequence.**
  1. `700+` headline figure counts from **92% of final** (server-rendered value `700`, animates `644 → 700`).
  2. The eight country-split counters (USA 150+, UK 80+, Canada 60+, Australia 45+, Germany 30+, New Zealand 30+, Ireland 20+, Singapore 7) count from 92% with a `stagger(45)`.
  3. The three typeset columns of ~24 named partner universities reveal `opacity 0→1`, `y 16→0`, stagger `--stagger-tight` **per column**, not per name — 3 groups, not 24 items.
- **Duration.** Steps 1–2 `--dur-5` (700ms) each. Step 3 `--dur-5` (700ms) per column; sequence envelope 700 + 2×90 = 880ms.
- **Easing.** Steps 1–2 `outQuart` (`--ease-quart`). Step 3 `--ease-quart` / `power3.out`.
- **Scroll behaviour.** IntersectionObserver only. **Zero ScrollTrigger instances.**
- **Library + why.** **Anime.js** for the odometers (canon assigns tabular counters to Anime) and **Motion** `whileInView` for the column reveal. The Anime scope is created inside the IO callback and reverted on unmount.
- **Performance.** Counters write `textContent` on a `<span>` with `font-variant-numeric: tabular-nums lining-nums slashed-zero` and an explicit `min-width` in `ch`, so digit changes cannot reflow the line. Counting from 92% means a maximum of 56 integer steps for the `700+` figure — cheap, and it means the number is *already correct* in the HTML for crawlers, for no-JS users, and for the 12% of sessions where the animation never fires.
- **Mobile.** Three columns collapse to one. Step 3 becomes a single group reveal (one 700ms fade-up). Counters unchanged.
- **Reduced motion.** The IO callback checks `matchMedia("(prefers-reduced-motion: reduce)")` and returns **before the dynamic import** — Anime.js is never fetched. The server-rendered final values stay on screen untouched. Columns render visible.

### 2.6 `what-we-do` — Fifteen Things We Do

- **Trigger.** `whileInView` once for the reveal; pointer hover / keyboard focus for the row treatment.
- **Sequence.**
  1. The fifteen ruled rows reveal `opacity 0→1`, `y 16→0`, stagger `--stagger-tight` (0.045s).
  2. **On row hover/focus:** the row's underlying rule draws left→right via CSS `transform: scaleX(0) → scaleX(1)`, `transform-origin: left`, and the row's `FREE` / `PAID` mark shifts from `--ink-muted` to `--verdigris` (FREE) or `--marine` (PAID).
- **Duration.** Step 1 `--dur-5` (700ms) per row; envelope 700 + 14×45 = 1330ms — under the hero cap, and it is a stagger envelope, not a tween duration. Step 2 `--dur-3` (320ms), canon.
- **Easing.** Step 1 `--ease-quart`. Step 2 `--ease-cubic`.
- **Scroll behaviour.** IntersectionObserver via Motion. **Zero ScrollTrigger instances.**
- **Library + why.** **Motion** for the reveal; **pure CSS** for the hover rule draw. Canon specifies "CSS `scaleX`" explicitly — a hover effect that repeats hundreds of times per session should not allocate a JS animation each time.
- **Performance.** `scaleX` on a `1px`-tall element is a composite-only operation. `will-change` is **not** set on the rows — fifteen promoted layers on a mid-range Android is exactly the anti-pattern; the rule is cheap enough without it.
- **Mobile.** Two-column ledger collapses to a single stacked column: service name on line 1, `FREE`/`PAID` + figure right-aligned on line 2, hairline beneath. Hover step is not applicable; the rule renders at `scaleX(1)` permanently and the `FREE`/`PAID` marks render in their coloured state from first paint (see `06-strategy.md` §1.4, touch replacements).
- **Reduced motion.** Rows render visible. The CSS backstop zeroes the `scaleX` transition duration, so the rule appears instantly on hover — the affordance survives, the motion does not.

### 2.7 `still-page` — Nothing Here Casts a Shadow

**This section's specification is the deliberate absence of motion. It is written out in full so that no future contributor mistakes it for an unfinished spec.**

- **Trigger.** One shared, page-level IntersectionObserver (owned by the motion provider, not by this section) adds `data-seen="true"` to `[data-reveal]` when the element is 25% visible. Fires once.
- **Sequence.** **One step.** The section container transitions `opacity: 0 → 1`. That is the complete sequence. There is no stagger. There is no `y`. The six accreditation blocks do not reveal individually. The `--paper-still` surface does not fade in separately. The AIRC quotation does not type out. Nothing scales, draws, counts, morphs or stamps.
- **Duration.** **400ms.** Exactly. Not `--dur-4` (480ms) and not `--dur-5` (700ms) — canon specifies 400ms for this one fade and this one fade only.
- **Easing.** `--ease-quad` — `cubic-bezier(0.25,0.46,0.45,0.94)`. The flattest curve in the set, on the flattest surface on the page.
- **Scroll behaviour.** **Zero ScrollTrigger instances. Zero scrub. Zero pin. Zero parallax.** The section does not respond to scroll position in any way after it has faded in.
- **Library + why.** **CSS only** (canon). The transition is `transition: opacity 400ms cubic-bezier(0.25,0.46,0.45,0.94)`. The only JavaScript involved is the shared observer that sets one attribute — and that observer serves the whole page, so this section imports nothing.

  ```css
  [data-reveal="still"] { opacity: 0; }
  [data-reveal="still"][data-seen="true"] { opacity: 1; }
  [data-reveal="still"] { transition: opacity 400ms var(--ease-quad); }

  /* Never hidden without JS, and never hidden under reduced motion. */
  @media (scripting: none) { [data-reveal="still"] { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) {
    [data-reveal="still"] { opacity: 1; transition: none; }
  }
  ```
- **Performance.** One opacity transition on one element. The cheapest section on the page by an order of magnitude, and the one where a parent spends the longest reading.
- **Mobile.** Identical. The six typographic blocks restack from a 3×2 grid to a single column; the fade is unchanged. The "what this means for you" line becomes a tap disclosure rather than a hover disclosure — a discrete content toggle, not an animation.
- **Reduced motion.** The section renders at `opacity: 1` with `transition: none`. Under reduced motion this section is byte-for-byte, pixel-for-pixel identical to its animated state at rest, which is the point: *the stillness is the signal, and the signal does not depend on the reader's settings.*

### 2.8 `branch-atlas` — Eighteen Doors

- **Trigger.** IntersectionObserver, `rootMargin: "0px 0px -20% 0px"`, fires once → dynamic-import Anime.js → run. Separately: click/tap/Enter on any of the 18 crosshairs opens the city drawer.
- **Sequence.**
  1. India outline draws in hairline: `svg.createDrawable` `draw: ["0 0", "0 1"]`.
  2. From `t = 620ms` (overlapping the tail of the draw), the 18 crosshairs stamp in **geographic sequence, north to south** — the DOM order of the nodes is authored N→S so the stagger reads as a hand inking down the map. `opacity 0→1`, `scale 0.6→1`, `stagger(28)`.
  3. Delhi South (HQ) receives its `--sienna` emphasis ring last, at `t = 1180ms`, as a separate 240ms tween.
  4. **On crosshair activation:** the city drawer enters from the right (≥768px) or bottom (<768px): `opacity 0→1`, `x 24→0` / `y 24→0`, with `--shadow-drawer` — the only blurred shadow permitted on the page, and permitted here because the drawer floats above the page plane.
- **Duration.** Step 1 **900ms** (canon). Step 2 320ms per node; **sequence envelope 1416ms** (declared in §1.2). Step 3 240ms. Step 4 `--dur-4` (480ms).
- **Easing.** Step 1 `inOutQuad` (`--ease-inout` / `power2.inOut`, canon). Step 2 `outBack(1.4)` — the second and final sanctioned use of the press curve. Step 3 `outQuart`. Step 4 `--ease-quart` / `power3.out`.
- **Scroll behaviour.** IntersectionObserver only. **Zero ScrollTrigger instances.** The map is not scrubbed — the canon concept document floated a scrubbed draw, but the final canon assigns a fixed 900ms `power2.inOut` draw, which is a one-shot, not a scrub. Fixed beats scrubbed here because a scrubbed draw on a 19-element SVG re-rasterises the path on every scroll frame.
- **Library + why.** **Anime.js** for 1–3 (canon: Anime owns SVG stroke draws), **Motion** `AnimatePresence` for 4 (canon: Motion owns the city drawer).
- **Performance.** The India path plus 18 nodes is the single largest bespoke asset on the page and is inside the ≤40 kB gzipped SVG budget shared with the fifteen country coastlines. `draw` animates `stroke-dashoffset` — a paint-only property on a stroke, with no layout implication (§8.3, sanctioned exception 2). The stamp uses `scale`, not `r`, so the crosshairs composite. Each crosshair carries an invisible ≥44×44px hit target (a transparent `<rect>`), which is an accessibility requirement, not a motion one, but it also stops the browser hit-testing an 8px path on every pointermove.
- **Mobile.** Map renders at a taller aspect ratio with the node labels suppressed until tap. Draw and stamp sequence unchanged — it is one-shot and 1.4s, and it is the emotional payoff of Chapter III. The drawer becomes a bottom sheet at ≥48px targets, entering on `y`, dismissible by swipe-down, backdrop click and `Escape`.
- **Reduced motion.** The IO callback returns before the dynamic import. The India path renders fully drawn (`stroke-dasharray: none` in the base CSS — the dash is only ever applied by Anime), all 18 crosshairs render visible at `scale: 1`, and Delhi South renders with its ring. The drawer opens with an opacity-only transition. **Anime.js is never fetched on this route under reduced motion.**

### 2.9 `contributors` — The Contributors' Page

- **Trigger.** `whileInView` once for the grid; click/tap/Enter on a cartouche for the drawer.
- **Sequence.**
  1. Plate C cartouches reveal `opacity 0→1`, `y 20→0`, stagger `--stagger` (0.08s).
  2. **On hover/focus:** the cartouche's registration offset intensifies — the `--reg-sienna` pseudo-element moves from `3px 3px` to `4px 4px` via `transform: translate(1px, 1px)` (**not** by animating the `box-shadow` offsets, which is banned). Reads as the press pulling slightly further out of register.
  3. **On activation:** the cartouche morphs into the full drawer via `layoutId` — the monogram field, the keyline and the data block are all shared elements, so the counsellor's initials travel from card to drawer rather than cross-fading.
  4. Inside the drawer, `tel:` and `wa.me` anchors and the `Book <name>` CTA reveal `opacity 0→1` with a 60ms offset after the morph lands.
- **Duration.** Step 1 `--dur-5` (700ms) per card. Step 2 `--dur-2` (200ms). Step 3 `--dur-4` (480ms). Step 4 `--dur-3` (320ms).
- **Easing.** Step 1 `--ease-quart`. Step 2 `--ease-quad`. Step 3 `--ease-quart` (canon: "drawer open"). Step 4 `--ease-cubic`.
- **Scroll behaviour.** IntersectionObserver via Motion. **Zero ScrollTrigger instances.**
- **Library + why.** **Motion** throughout — `layoutId` shared-element morph across a mount boundary is the one thing only Motion does well, and canon assigns it here by name.
- **Performance.** The morph is FLIP: measured once, animated as `transform` + `scale`. Because Plate C is a locked 4:5 aspect ratio in both card and drawer states, the FLIP correction is a pure scale with no aspect distortion. `--shadow-drawer` is applied to the drawer *after* the morph completes (a `--dur-2` opacity fade on a pseudo-element), so the blurred shadow is never composited during the moving frames.
- **Mobile.** Cartouches go from a 4-up to a 2-up grid (768–1023px) to a 1-up list (<768px). The drawer becomes a full-screen sheet; the `layoutId` morph is retained because the shared element still exists. `tel:` and `wa.me` sit above the fold of the sheet at ≥48px.
- **Reduced motion.** Cards render visible. The registration-offset hover is zeroed by the CSS backstop. The `layoutId` morph is disabled by `MotionConfig`; the drawer cross-fades at `--dur-2`. **Canon build note 11 is a motion-independent requirement: `tel:` and `wa.me` inside the drawer are real `<a href>` anchors that work with JavaScript disabled.** The drawer content is server-rendered inside a `<details>` fallback so a no-JS visitor can still reach every counsellor's phone number.

### 2.10 `for-parents` — Step Out Without Doubt

**The lowest-motion chapter on the page after `still-page`. Canon: "lowest-motion chapter otherwise — reveals are opacity only."**

- **Trigger.** `whileInView` once per block. Separately: a `setInterval` aligned to the top of each minute drives the dual clock.
- **Sequence.**
  1. Each of the seven content blocks (finances, safety, course recognition, accreditation, who calls you, what we are paid, visa refusal) reveals **`opacity 0 → 1` only**. No `y`. No stagger within a block. No scale.
  2. **Dual clock:** two `Intl.DateTimeFormat` clocks (`Asia/Kolkata` + the destination timezone) render server-side at their correct values. Once per minute, only the digits that changed roll: `y 100% → 0%` inside a fixed-width, `overflow: hidden`, `tabular-nums` cell.
  3. **Hindi toggle:** on activation, `IBM_Plex_Sans_Devanagari` loads on demand and the body copy cross-fades `opacity 1 → 0 → 1`.
- **Duration.** Step 1 `--dur-5` (700ms). Step 2 `--dur-3` (320ms) per digit. Step 3 `--dur-3` (320ms) out, 320ms in.
- **Easing.** Step 1 `--ease-quad` (opacity, so the flattest curve). Step 2 `--ease-quart` — a digit falling into a slot. Step 3 `--ease-quad`.
- **Scroll behaviour.** IntersectionObserver via Motion. **Zero ScrollTrigger instances.**
- **Library + why.** **Motion** for 1 and 3; **Anime.js** for 2 (canon assigns digit odometers to Anime). The Anime import for this chapter is deferred until the section is in view **and** the first minute boundary is approaching, so a visitor who scrolls past in under 60s never pays for it.
- **Performance.** Opacity-only reveals mean this entire chapter — the longest reading surface on the page, in serif at `1.125rem/1.72` — never triggers a single layout or paint beyond the fade. The clock writes to at most four digit cells per minute. **Canon note: `--ochre` at 2.1:1 is used for the wells (`--ochre-tint`) only; it never carries text here.**
- **Mobile.** Identical, opacity-only. The dual clock moves from a margin element to a full-width ruled band above the "who calls you" block. The printable summary and WhatsApp handoff become full-width `≥48px` anchors.
- **Reduced motion.** Everything renders visible at `opacity: 1`. The clock **still updates** — it is information, not decoration — but the digits swap instantly with no roll. The Hindi toggle swaps instantly. **Reduced motion must never remove information; it removes only the transition between two informative states.**

### 2.11 `reckoning` — The Reckoning

**Canon: "User-triggered, never scroll-triggered."** This is the only section whose signature moment is guaranteed to be deliberate.

- **Trigger.** Tap/click on any of the three chips (destination × degree × city tier). Never scroll. On first chip interaction: dynamic-import Anime.js.
- **Sequence.** On any chip change:
  1. Chip state: selected chip background `transparent → --sienna-tint`, border `--rule → --sienna`, label `--ink-muted → --ink`.
  2. The ledger re-typesets **line by line**: each of the eight cost rows (tuition, living, visa, IHS, forex, GIC, insurance, flights) plus the scholarship subtraction line and the loan EMI line goes `opacity 1 → 0.35 → 1` with `stagger --stagger-tight`, while its label performs the letterpress re-set (§5.3).
  3. The ₹ figures roll as odometers **in place, inside tabular cells**, from the previous value to the new one.
  4. The single stacked ₹ bar re-proportions: each segment's `scaleX` is driven by `useMotionValue` → `useSpring` → `scaleX`. **`scaleX` only** — never `width`.
  5. The total rule draws left→right via `drawSVG "0%" → "100%"`.
  6. The closing italic line — *What Global Opportunities charges you: ₹0. Here is who pays us, and how.* — is **static**. It never animates on chip change. It is the one sentence on the page that must never look like it is being recalculated.
- **Duration.** Step 1 `--dur-2` (200ms). Step 2 `--dur-3` (320ms) per row; envelope 320 + 9×45 = 725ms. Step 3 `--dur-5` (700ms). Step 4 spring: `stiffness: 210, damping: 30, mass: 1` — settles ≈600ms, no overshoot beyond 1%. Step 5 `--dur-4` (480ms).
- **Easing.** Step 1 `--ease-quad`. Step 2 `--ease-cubic`. Step 3 `outQuart`. Step 4 spring (the only spring on the page; canon prescribes `useSpring` here by name). Step 5 `--ease-inout` / `power2.inOut` (canon: "rule draws").
- **Scroll behaviour.** **None. Zero ScrollTrigger instances.** The ledger's initial state is fully server-rendered with a default chip selection, so a visitor who never touches a chip still sees a complete, footnoted, honest ledger.
- **Library + why.** **Motion** for chip state and the ₹ bar spring; **Anime.js** for the odometers and the letterpress re-set; **GSAP DrawSVG** for the total rule. Three libraries in one section is justified only because each owns a pattern the others handle worse, and because the section is below the fold and interaction-gated — none of it is on the critical path.
- **Performance.** All ten ledger rows are already in the DOM at every chip permutation's *default* state; a chip change rewrites `textContent` in width-locked cells, so the ledger cannot reflow and cannot cause CLS. The ₹ bar is one flex row of `<span>`s with `transform-origin: left` — the spring writes `scaleX` directly to the DOM without a React render.
- **Mobile.** Chips wrap to two rows at ≥44px each. The ledger keeps its two-column ruled form (label left, figure right) — this is the section a parent screenshots and sends to a spouse, so its printed structure survives at every width. The ₹ bar goes full-bleed edge to edge. The footnote superscripts become inline `<details>`.
- **Reduced motion.** Chip colour change is preserved (colour survives `reducedMotion="user"`). The ledger re-typeset does not run — figures swap instantly. The odometers do not run — Anime.js is never imported. The ₹ bar jumps to its new proportions (Motion sets the spring target instantly). The total rule renders at `drawSVG: "100%"`. **Every number is correct at every instant; only the transitions between them are removed.**

### 2.12 `eleven-months` — Your Next Eleven Months

**THE ONLY PINNED SECTION ON THE PAGE. ≥1024px only.**

- **Trigger.** ScrollTrigger `pin` on the section, `start: "top top"`, `end: "+=" + trackDistance`.
- **Sequence.**
  1. The section pins. The ruled calendar track (AUG → JUL) tweens on `x` from `0` to `-(track.scrollWidth - window.innerWidth)`, `ease: "none"`, `scrub: 0.6`.
  2. As each month's block crosses 78% of the viewport width, its content reveals — GO's real durations, the owner of each step — via a child ScrollTrigger using `containerAnimation`.
  3. The **ochre ticks** (GO Application Days: Pune, Mumbai, Delhi, Amritsar, Ludhiana, Chandigarh, Hyderabad, Chennai — real dates) and **sienna ticks** (cited third-party deadlines: UCAS, German winter semester 15 July, AU Feb intake) stamp in as they cross, `scaleY 0 → 1`, `transform-origin: bottom`, stagger 0.045.
  4. The three Plate B specimen sheets (offer letter, CAS statement, visa vignette) tip in as they cross: `opacity 0→1`, `y 24→0`, `rotate -0.6deg → 0` — a sheet settling onto the page. Each has its own child trigger.
  5. Each specimen's ochre annotation leader draws to the one clause that matters, via Anime `svg.createDrawable`, fired from the specimen's own trigger callback.
  6. The margin note — *This is a real timeline. It is not a promise.* — reveals at the far right of the track, `opacity 0→1` only, no transform. It is the honesty statement; it does not perform.
- **Duration.** Step 1 is fully scrubbed (no duration). Steps 2, 4 `--dur-4` (480ms). Step 3 `--dur-3` (320ms) per tick. Step 5 `--dur-5` (700ms). Step 6 `--dur-5` (700ms).
- **Easing.** Step 1 **`none`** — mandatory: `containerAnimation` requires a linear container tween or child trigger positions drift. Steps 2, 4 `power3.out`. Step 3 `power2.out`. Step 5 `inOutQuad`. Step 6 `power1.out`.
- **Scroll behaviour.** `pin: true`, `anticipatePin: 1`, `scrub: 0.6`, `invalidateOnRefresh: true`, `end` as a function so it re-measures on resize. Child triggers use `containerAnimation: scroller` with `start: "left 78%"`, `toggleActions: "play none none none"`, `once: true`. **Pin distance ≈ 200vh** for a track ≈ 300vw wide on a 1440px viewport (see §6). **Six ScrollTrigger instances** — one pin plus five children.
- **Library + why.** **GSAP ScrollTrigger** — pin + scrub + `containerAnimation` is unreplicable in the other two libraries. **Anime.js** for step 5's leader draws only, fired from GSAP callbacks so there is still exactly one scroll authority.
- **Performance.** Canon: *"never two pins active."* This is the only pin, so that rule is satisfied structurally. `anticipatePin: 1` pre-pins one frame early to kill the jump on fast scroll. The track is a single flex row; the `x` tween is one transform on one element regardless of how many months it contains. **`content-visibility: auto` must never be applied to this section or any ancestor** — GSAP documents that it breaks ScrollTrigger measurement. Pinning also breaks under transformed ancestors; if a parent ever gains a transform, `pinReparent: true` is the escape hatch, but the correct fix is to remove the ancestor transform.
- **Mobile / tablet (<1024px).** **The pin does not exist.** `matchMedia` never creates it. The track renders as a **static vertical list**: eleven month blocks stacked, ticks inline as ruled markers, the three specimen sheets as full-width figures at their locked aspect ratio, the margin note as a ruled pull-quote at the end. Each block reveals `opacity 0→1`, `y 16→0` at `--dur-5` via Motion `whileInView`. This removes six of the page's ten ScrollTriggers on the majority of traffic.
- **Reduced motion.** The `reduce` branch of `matchMedia` never builds the pin, even at ≥1024px — it renders the same static vertical list as mobile, with `gsap.set()` landing every element on its final visible state: ticks at `scaleY: 1`, specimens at `opacity: 1, y: 0, rotate: 0`, leaders fully drawn, margin note visible.

### 2.13 `endpaper` — The Endpaper

- **Trigger.** Two ScrollTriggers: one scrubbed across the 30vh `--grad-endpaper-turn` band; one `once: true` at section entry.
- **Sequence.**
  1. **The inversion.** A fixed, full-viewport backdrop layer painted `--endpaper` (`#0E2029`) scrubs `opacity 0 → 1` across the 30vh turn band. **No element moves.** The nav, the rail and the type all sit above it and simply find themselves on a dark ground. Simultaneously `data-chapter="success"` is set on the document root, which flips ink tokens to `--plate-white` / `--plate-grey` / `--sienna-on-dark` / `--ochre-on-dark` / `--verdigris-on-dark` and the focus ring to `--ochre-on-dark`, all via a `--dur-2` CSS colour transition.
  2. **On section entry (once):** the chapter headline — *Forty thousand people have already done this.* — rises behind a SplitText line mask.
  3. The same trigger hands off to Anime.js: the cited counters animate their **final 12% only**, from server-rendered values.
  4. The named-student Plate C cartouches (Rittik Panchal / UK / Avinash; Vanshika Sheel / Germany / Nivesh Bisht; Simarpreet Kaur / Centennial / Jasmeet Kaur) reveal `opacity 0→1`, `y 20→0`, stagger `--stagger`.
  5. The five institutional testimonials (University of Auckland, RMIT, National College of Ireland, St. George's, WITT) reveal with the same treatment, offset `+0.24s`.
- **Duration.** Step 1 scrubbed (`scrub: 0.6`). Step 2 `--dur-5` (700ms) — **not** `--dur-hero`; 900ms belongs to the H1 alone. Step 3 `--dur-5` (700ms). Steps 4–5 `--dur-5` (700ms) each.
- **Easing.** Step 1 `none`. Step 2 `expo.out` (`--ease-expo`). Step 3 `outQuart`. Steps 4–5 `power3.out`.
- **Scroll behaviour.** `st-endpaper-turn`: `trigger: [data-endpaper-turn-band]`, `start: "top bottom"`, `end: "bottom top"`, `scrub: 0.6`, `invalidateOnRefresh: true`. `st-endpaper-enter`: `start: "top 75%"`, `once: true`, `toggleActions: "play none none none"`. **Two ScrollTrigger instances.**
- **Library + why.** **GSAP** for the scrub, the headline split and the trigger; **Anime.js** for the counters (canon). Steps 4–5 are Motion `whileInView` — they are simple once-only reveals and do not need to share the GSAP clock.
- **Performance.** Scrubbing `opacity` on a single fixed, childless `<div>` is a compositor-only operation — one layer, no repaint of content, no layout. **This is why the inversion is implemented as an opacity cross-fade of two stacked fixed layers rather than as a `backgroundColor` interpolation** (see §8.3 and the [GAP RESOLVED] note below). Counters from 92% cap the integer work at a few dozen steps.

  > **[GAP RESOLVED]** Canon describes the inversion as a *"scrubbed background tween … on one fixed backdrop div — no element moves."* Implemented literally as a `backgroundColor` scrub, it repaints a full-viewport layer on every scrub frame. Implemented as two stacked fixed layers (cream below, `--endpaper` above at `opacity: 0`) with the top layer's `opacity` scrubbed, it is visually equivalent, compositor-only, and strictly inside the transform/opacity law of canon build note 3. The canon's stated intent — *no element moves*, one fixed backdrop, scrubbed across the 30vh band — is preserved exactly. This is the specified implementation.

- **Mobile.** Identical inversion — it is the narrative payoff of the page and it costs one composited layer. Cartouches go 3-up → 1-up. The headline split still runs (one element, one trigger).
- **Reduced motion.** The dark layer renders at `opacity: 1` from first paint for the whole chapter (set by `gsap.set()` in the reduce branch, with the band's static gradient doing the visual work). `data-chapter="success"` is applied without transition. The headline renders with lines at `yPercent: 0`. Counters render at their **server-rendered final values**; Anime.js is never imported.

### 2.14 `questions` — Questions People Actually Ask

- **Trigger.** One scrubbed ScrollTrigger for the return band; native `<details>` toggle for each question. **No JS on the accordion.**
- **Sequence.**
  1. Across the 24vh `--grad-endpaper-return` band at the top of the section, the fixed dark layer scrubs `opacity 1 → 0`, returning the page to paper. `data-chapter` is cleared at the midpoint.
  2. **On `<details>` toggle:** the answer panel expands via `grid-template-rows: 0fr → 1fr` on a wrapper with `overflow: hidden`, and the marker rotates 90°.
- **Duration.** Step 1 scrubbed. Step 2 `--dur-3` (320ms), canon.
- **Easing.** Step 1 `none`. Step 2 `--ease-cubic` — `cubic-bezier(0.215,0.61,0.355,1)`, canon.
- **Scroll behaviour.** `st-questions-return`: `trigger: [data-endpaper-return-band]`, `start: "top bottom"`, `end: "bottom top"`, `scrub: 0.6`. **One ScrollTrigger instance.**
- **Library + why.** **GSAP** for the scrub (same layer, same authority as the endpaper turn). **Zero JS** for the accordion, per canon — native `<details>` is keyboard-accessible, screen-reader-correct, `Ctrl+F`-findable in Chrome, and works before hydration. This section is a candidate for `content-visibility: auto` **only** if the return-band trigger is moved to the preceding section's DOM (see §8.2).
- **Performance.** `grid-template-rows` is the single sanctioned layout-animating property on the page (§8.3). It is used here because canon specifies it, and because the alternative — animating `height` — is banned outright and the alternative to *that* — a JS-measured max-height — costs a library and a measurement per toggle.
- **Mobile.** Identical. The eight questions become full-width rows with ≥48px `<summary>` targets. Question text wraps to two lines at ≤400px without changing the target height.
- **Reduced motion.** The dark layer is already at `opacity: 0` here (set in the reduce branch). The CSS backstop zeroes the `grid-template-rows` transition — questions open instantly. **All eight answers remain in the DOM and remain findable; the accordion is a disclosure, never a content gate.**

### 2.15 `enquiry` — The First Call

- **Trigger.** User interaction only: chip tap, Next/Back, submit. Never scroll.
- **Sequence.**
  1. **Step transition.** Outgoing step exits `opacity 1→0`, `x 0 → ∓16px`; incoming step enters `opacity 0→1`, `x ±16px → 0`. Direction is signed: forward is `+16 → 0`, back is `-16 → 0`.
  2. **Progress rule.** A hairline beneath the step heading scales `scaleX` to `0.333 / 0.667 / 1` as the step advances, `transform-origin: left`.
  3. **Chip select (step 1).** Background `transparent → --sienna-tint`, border `--rule → --sienna`, and a `scale 1 → 0.98 → 1` press.
  4. **Submit press.** `scale 1 → 0.98`, then release.
  5. **Validation error.** The field's border goes `--rule → --clay` and the error text fades in beneath. **No shake. No wobble.** An atlas does not scold.
- **Duration.** Step 1 `--dur-3` (320ms), canon. Step 2 `--dur-3` (320ms). Step 3 `--dur-1` (120ms) press + `--dur-2` (200ms) colour. Step 4 `--dur-1` (120ms). Step 5 `--dur-2` (200ms).
- **Easing.** Steps 1–2 `--ease-cubic`. Steps 3–4 `--ease-press` / `back.out(1.4)` — sanctioned for "button press ONLY". Step 5 `--ease-quad`.
- **Scroll behaviour.** **None. Zero ScrollTrigger instances.**
- **Library + why.** **Motion `AnimatePresence`** with `mode="wait"` and a `custom` direction prop — holding the outgoing step's subtree through its exit is precisely the capability nothing else in the stack has.
- **Performance.** All three steps' markup is server-rendered; `AnimatePresence` only controls which is mounted. Both steps are absolutely positioned inside a container with an explicit `min-height` set to the tallest step, so a step change causes **zero CLS**. The `+91` adornment is rendered text, not a field, so it never participates in layout changes.
- **Mobile.** Full-width chips at ≥48px in a 2-column wrap. Step transitions identical (16px is deliberately small enough to read as a page turn at 375px, not a swipe). `tel:` and `wa.me` siblings sit directly beneath the submit button, full-width, ≥48px, above the mobile bar's safe area.
- **Reduced motion.** `x` offsets are removed by `MotionConfig reducedMotion="user"`; steps cross-fade at `--dur-2`. The progress rule jumps. Press feedback is removed; the focus ring and the colour change carry the affordance. **Form function is completely independent of motion: with JS disabled, all three steps render stacked as one long form and POST natively.**

### 2.16 `colophon` — The Colophon

- **Trigger.** One ScrollTrigger, `once: true`.
- **Sequence.**
  1. The closing rule above *Volume XXV. Set in Newsreader, Hanken Grotesk and IBM Plex Mono. New Delhi, 2026.* draws `drawSVG "0%" → "100%"`.
  2. **Nothing else.** The eighteen branch addresses, the Sources & Last-Verified table, the three phone numbers, the fifteen destinations, the socials and the legal block all render statically. The muted dual clock updates once per minute with an instant digit swap — no roll (it is the *muted* clock; the roll belongs to `for-parents`).
- **Duration.** Step 1 **600ms** (canon: "Closing rule draws once, 600ms `power2.inOut`").
- **Easing.** `power2.inOut` / `--ease-inout`.
- **Scroll behaviour.** `st-colophon-rule`: `start: "top 85%"`, `once: true`, `toggleActions: "play none none none"`. **One ScrollTrigger instance.**
- **Library + why.** **GSAP DrawSVG.** DrawSVG is already in the bundle for the hero and the reckoning total; one more `fromTo` costs nothing.
- **Performance.** One `stroke-dashoffset` tween on one `<line>`. The Sources & Last-Verified table is the heaviest DOM in the footer and is deliberately motion-free — it is the auditability promise, and an auditable thing does not perform.
- **Mobile.** Branch addresses go from a 3-column to a 1-column list inside a `<details>` grouped by region so the footer does not become 4000px tall. Rule draw unchanged.
- **Reduced motion.** Rule renders at `drawSVG: "100%"`.

### 2.17 `mobile-bar` — The Mobile Bar (<1024px only)

- **Trigger.** Scroll depth ≥25% of document height, once. Never re-hides.
- **Sequence.**
  1. Bar enters `translateY(100%) → translateY(0)`, `opacity 0 → 1`.
  2. **On press of any of the three targets:** `scale 1 → 0.98` release.
- **Duration.** Step 1 `--dur-4` (480ms). Step 2 `--dur-1` (120ms).
- **Easing.** Step 1 `--ease-quart` / `power3.out` — it slides up and settles like a drawer. Step 2 `--ease-press`.
- **Scroll behaviour.** Motion `useScroll()` with a `useMotionValueEvent` threshold at `0.25` progress, latched to fire once. **Zero ScrollTrigger instances.**
- **Library + why.** **Motion.** One scalar threshold on a component that is already client-side; a ScrollTrigger here would burn budget on the breakpoint where budget matters most.
- **Performance.** The bar reserves its own height in the document (`padding-bottom` on `<body>` equal to bar height + gesture inset) **from first paint**, so its entrance causes zero CLS. It is `position: fixed`, `--paper` at 98%, top hairline `--rule-strong`, **no `backdrop-filter`**. `z-index: var(--z-mobilebar)` (40).
- **Mobile.** This section *is* mobile. Three real anchors — **Call · WhatsApp · Book** — at ≥48px, padded above the Android gesture inset via `env(safe-area-inset-bottom)`. `tel:+918282828215`, a `wa.me` link with the message pre-filled from the last destination chip tapped, and `#enquiry`. **Functional with JavaScript disabled** (canon build note 11) — with JS off the bar renders visible from first paint, since the entrance animation is the only JS-dependent part. **WhatsApp is rendered as ink + outline, never in WhatsApp brand green** — green on this page means *verified*.
- **Reduced motion.** The bar renders at `translateY(0)`, `opacity: 1` from first paint. No entrance. Press feedback removed.

---

## 3. GSAP timeline plan

### 3.1 Provider: Lenis + ScrollTrigger + plugin registration

One `"use client"` provider owns Lenis, the `gsap.ticker` wiring, plugin registration, `MotionConfig`, `LazyMotion`, and the single shared reveal observer. Mounted once in `app/layout.tsx`.

```tsx
// components/providers/motion-provider.tsx
"use client"

import { useRef, type ReactNode } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import Lenis from "lenis"
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion"

// Module scope. Registered exactly once for the whole app — never per component.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, ScrambleTextPlugin)

export function MotionProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // Canon build note 4: Lenis is NOT initialised at all under reduced motion.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        autoRaf: false,   // gsap.ticker is the single RAF authority on this page
        syncTouch: false, // native Android/iOS inertia beats JS-smoothed touch
        duration: 1.05,
        // --ease-expo, expressed as a Lenis easing function
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      lenisRef.current = lenis

      const onLenisScroll = () => ScrollTrigger.update()
      lenis.on("scroll", onLenisScroll)

      const raf = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      return () => {
        lenis.off("scroll", onLenisScroll)
        gsap.ticker.remove(raf)
        gsap.ticker.lagSmoothing(500, 33) // restore GSAP's default on teardown
        lenis.destroy()
        lenisRef.current = null
      }
    })

    // SplitText measures against real font metrics; re-measure once fonts land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    // One shared reveal observer for the whole page (see §2.7, still-page).
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.setAttribute("data-seen", "true")
          io.unobserve(e.target)
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    )
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el))

    return () => {
      io.disconnect()
      mm.revert() // reverts every branch, including all ScrollTriggers created inside
    }
  })

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  )
}
```

**Notes on this file.**

- **`ScrambleTextPlugin` is registered.** Canon build note 15 lists four plugins; the `hero` spec in the same document requires ScrambleText for the Departure Card values. **[GAP RESOLVED]** — five plugins are registered. All are free in the public npm package since GSAP 3.13; there is no licence, token or registry implication.
- **`LazyMotion … strict`** forbids `motion.div` and requires `m.div`, which is how the 34 kB full import is kept out of the bundle. With `framer-motion@12.43.0` installed, import `m`, `LazyMotion` and `domAnimation` from `"framer-motion"`. **[GAP RESOLVED]** — canon build note 15 says *"`LazyMotion` + `motion/react-m`"*, which is the package name of the `motion` alias; the installed package is `framer-motion`. Both are the same library at the same version; `framer-motion` exposes `m` from its root entry. Migrating to `motion` is optional and non-breaking in v12; it would additionally unlock `motion/react-client`. Documented in `06-strategy.md` §5.5.
- **`mm.revert()` in cleanup** reverts every branch and every ScrollTrigger created inside it, which is what makes React 19 StrictMode double-invocation safe.
- `useGSAP` is used **everywhere** instead of `useEffect`/`useLayoutEffect`; it is `useIsomorphicLayoutEffect` + `gsap.context()`, so it is SSR-safe.

### 3.2 Hero load timeline

```tsx
// components/sections/hero/hero-motion.tsx
"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/SplitText"

export function useHeroTimeline() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          ok: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          // ---- REDUCED BRANCH: land on the final, fully visible state and stop.
          if (ctx.conditions!.reduce) {
            gsap.set(
              "[data-hero-line], [data-eyebrow], [data-deck], [data-cta], [data-card-row], [data-status-bar]",
              { opacity: 1, y: 0, yPercent: 0 }
            )
            gsap.set("[data-status-mark]", { opacity: 1, scale: 1 })
            gsap.set("[data-masthead-rule]", { drawSVG: "100%" })
            // Card values are already at their server-rendered final text. Do not touch.
            return
          }

          // ---- FULL BRANCH
          SplitText.create("[data-hero-h1]", {
            type: "lines",
            mask: "lines",     // 3.13+ built-in masking wrapper — no hand-rolled overflow div
            autoSplit: true,   // re-splits on font load and on resize
            linesClass: "hero-line",
            // Returning the animation from onSplit lets autoSplit rebuild it cleanly.
            onSplit: (self) => {
              const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

              tl.fromTo(self.lines,                                   // 1
                  { yPercent: 110 },
                  { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0)
                .fromTo("[data-masthead-rule]",                       // 2
                  { drawSVG: "0%" },
                  { drawSVG: "100%", duration: 0.6, ease: "power2.inOut" }, 0)
                .fromTo("[data-eyebrow]",                             // 3
                  { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.32 }, 0.10)
                .fromTo("[data-card-row]",                            // 4  (canon: 70ms stagger)
                  { opacity: 0, y: 10 },
                  { opacity: 1, y: 0, duration: 0.32, stagger: 0.07 }, 0.20)
                .fromTo("[data-deck]",                                // 5
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 0.48, ease: "power3.out" }, 0.40)
                .to("[data-card-value]", {                            // 6
                  duration: 0.4,
                  stagger: 0.045,
                  scrambleText: {
                    text: (i, el) => (el as HTMLElement).dataset.final!, // final value already in DOM
                    chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ·/",
                    speed: 0.4,
                    revealDelay: 0.08,
                  },
                }, 0.52)
                .fromTo("[data-cta], [data-proof], [data-accred]",     // 7
                  { opacity: 0, y: 10 },
                  { opacity: 1, y: 0, duration: 0.32, stagger: 0.045 }, 0.55)
                .fromTo("[data-status-mark]",                          // 8
                  { opacity: 0, scale: 0.6 },
                  { opacity: 1, scale: 1, duration: 0.22, ease: "back.out(1.4)", stagger: 0.04 }, 0.90)
                .fromTo("[data-status-bar]",                           // 9
                  { opacity: 0, y: 6 },
                  { opacity: 1, y: 0, duration: 0.32, ease: "power3.out" }, 1.08)
              // Timeline ends at exactly 1.40s — the canon cap for the full hero sequence.

              return tl
            },
          })
        }
      )

      return () => mm.revert()
    },
    { scope: root }
  )

  return root
}
```

**Position parameters are absolute seconds, not relative labels**, so the 1400ms envelope is verifiable by reading the file: the last tween starts at `1.08` and runs `0.32`.

### 3.3 `branch-atlas` — the GSAP→Anime handoff

Canon assigns the India draw to Anime.js. GSAP's role here is **nothing** — deliberately. The gate is an IntersectionObserver, not a ScrollTrigger, because an IO does not participate in `ScrollTrigger.refresh()` and this section only needs a one-shot boolean.

```tsx
// components/sections/branch-atlas/use-atlas-draw.ts
"use client"

import { useEffect, useRef } from "react"

export function useAtlasDraw() {
  const root = useRef<HTMLDivElement>(null)
  const revert = useRef<(() => void) | null>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    // Reduced motion: never fetch Anime.js. The SVG is already fully drawn in CSS.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let cancelled = false
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const { mountAtlasDraw } = await import("@/lib/motion/atlas-draw") // §5.2
        if (cancelled) return
        revert.current = mountAtlasDraw(el)
      },
      { rootMargin: "0px 0px -20% 0px" }
    )
    io.observe(el)

    return () => { cancelled = true; io.disconnect(); revert.current?.() }
  }, [])

  return root
}
```

This pattern — IO gate → reduced-motion early return → dynamic import → `createScope` → revert — is reused verbatim for `register` and for the deferred parts of `endpaper`, `reckoning` and `for-parents`.

### 3.4 `eleven-months` — pinned x-tween with `containerAnimation`

```tsx
// components/sections/eleven-months/use-eleven-months.ts
"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export function useElevenMonths() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          // Canon: pinning is >=1024px only, and never under reduced motion.
          pinned: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          stacked: "(max-width: 1023.98px), (prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          // ---- STATIC VERTICAL LIST BRANCH (mobile, tablet, reduced motion)
          if (ctx.conditions!.stacked) {
            gsap.set("[data-11m-reveal]", { opacity: 1, y: 0, rotate: 0 })
            gsap.set("[data-11m-tick]", { scaleY: 1, opacity: 1 })
            return // CSS drops the flex track to a stacked column at <1024px.
          }

          // ---- PINNED HORIZONTAL BRANCH (>=1024px, motion allowed)
          const track = root.current!.querySelector<HTMLElement>("[data-11m-track]")!
          const distance = () => track.scrollWidth - window.innerWidth

          const scroller = gsap.fromTo(
            track,
            { x: 0 },
            {
              x: () => -distance(),
              ease: "none",              // MANDATORY: containerAnimation needs a linear container
              immediateRender: false,
              scrollTrigger: {
                id: "st-11m-pin",
                trigger: root.current!,
                pin: true,
                anticipatePin: 1,
                scrub: 0.6,
                start: "top top",
                end: () => "+=" + distance(),
                invalidateOnRefresh: true,
              },
            }
          )

          // Children are measured against the horizontal tween, not the page.
          // NOTE: with containerAnimation, start/end use left/right, not top/bottom.
          const child = (
            id: string,
            targets: gsap.TweenTarget,
            from: gsap.TweenVars,
            to: gsap.TweenVars,
            triggerEl: Element
          ) =>
            gsap.fromTo(targets, from, {
              ...to,
              immediateRender: false,
              scrollTrigger: {
                id,
                trigger: triggerEl,
                containerAnimation: scroller,
                start: "left 78%",
                toggleActions: "play none none none",
                once: true,
              },
            })

          // st-11m-specimen-1..3 — the three Plate B sheets tip in.
          gsap.utils.toArray<HTMLElement>("[data-11m-specimen]").forEach((el, i) => {
            child(
              `st-11m-specimen-${i + 1}`,
              el,
              { opacity: 0, y: 24, rotate: -0.6 },
              { opacity: 1, y: 0, rotate: 0, duration: 0.48, ease: "power3.out",
                onComplete: () => el.dispatchEvent(new CustomEvent("atlas:draw-leader")) },
              el
            )
          })

          // st-11m-ticks — ochre (GO Application Days) + sienna (cited deadlines).
          child(
            "st-11m-ticks",
            "[data-11m-tick]",
            { scaleY: 0, opacity: 0 },
            { scaleY: 1, opacity: 1, duration: 0.32, ease: "power2.out", stagger: 0.045,
              transformOrigin: "bottom center" },
            root.current!.querySelector("[data-11m-tick-band]")!
          )

          // st-11m-marginnote — "This is a real timeline. It is not a promise."
          // Opacity only. The honesty statement does not perform.
          child(
            "st-11m-marginnote",
            "[data-11m-note]",
            { opacity: 0 },
            { opacity: 1, duration: 0.7, ease: "power1.out" },
            root.current!.querySelector("[data-11m-note]")!
          )
        }
      )

      return () => mm.revert()
    },
    { scope: root }
  )

  return root
}
```

**Six ScrollTriggers** created in the `pinned` branch: `st-11m-pin`, `st-11m-specimen-1..3`, `st-11m-ticks`, `st-11m-marginnote`. **Zero** in the `stacked` branch.

### 3.5 `endpaper` inversion colour scrub, and the `questions` return

Both bands drive the **same** fixed layer, so the inversion and the return are one continuous state with two triggers.

```tsx
// components/sections/endpaper/use-inversion.ts
"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

export function useInversion() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        { ok: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const dark = "[data-endpaper-layer]" // fixed, inset:0, background:var(--endpaper), z-index:-1

          if (ctx.conditions!.reduce) {
            gsap.set(dark, { opacity: 1 })
            gsap.set("[data-endpaper-h2] .line", { yPercent: 0 })
            document.documentElement.setAttribute("data-chapter", "success")
            return // counters keep their server-rendered final values; Anime is never imported
          }

          // st-endpaper-turn — scrub the dark layer IN across the 30vh turn band.
          gsap.fromTo(dark, { opacity: 0 }, {
            opacity: 1,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              id: "st-endpaper-turn",
              trigger: "[data-endpaper-turn-band]",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
              onToggle: (self) =>
                document.documentElement.setAttribute(
                  "data-chapter", self.progress > 0.5 ? "success" : "apply"
                ),
            },
          })

          // st-questions-return — scrub the same layer OUT across the 24vh return band.
          gsap.fromTo(dark, { opacity: 1 }, {
            opacity: 0,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              id: "st-questions-return",
              trigger: "[data-endpaper-return-band]",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })

          // st-endpaper-enter — headline split + hand off to the Anime odometers.
          SplitText.create("[data-endpaper-h2]", {
            type: "lines", mask: "lines", autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(self.lines, { yPercent: 110 }, {
                yPercent: 0, duration: 0.7, ease: "expo.out", stagger: 0.08,
                immediateRender: false,
                scrollTrigger: {
                  id: "st-endpaper-enter",
                  trigger: root.current!,
                  start: "top 75%",
                  once: true,
                  toggleActions: "play none none none",
                  onEnter: () =>
                    import("@/lib/motion/odometer").then(({ mountOdometers }) =>
                      mountOdometers(root.current!)
                    ),
                },
              }),
          })
        }
      )

      return () => mm.revert()
    },
    { scope: root }
  )

  return root
}
```

### 3.6 SplitText usage — the complete list

SplitText is used in **exactly two places on the page**, and nowhere else:

| Element | Config | Why here and not elsewhere |
|---|---|---|
| `hero` H1 — *Step out without doubt.* | `type: "lines"`, `mask: "lines"`, `autoSplit: true` | The LCP element and the brand statement. A masked line rise is the "page turning" gesture the whole art direction is built on. |
| `endpaper` H2 — *Forty thousand people have already done this.* | `type: "lines"`, `mask: "lines"`, `autoSplit: true` | The emotional peak of Chapter VI, on the page's one dark surface, inside a section GSAP already owns. It reuses `st-endpaper-enter` and costs no additional trigger. |

Every other headline on the page reveals as a **whole element** via Motion `whileInView` (`opacity` + `y`). Splitting the other four chapter openers would add four ScrollTriggers, four re-split-on-resize listeners and four sets of wrapper DOM for an effect the reader would stop noticing by Chapter III. **Restraint here is the spec.**

Two hard rules from canon build note 16: **SplitText's automatic `aria-label`/`aria-hidden` must not be overridden** — do not add your own `aria-*` to a split element, and do not set `aria-hidden="false"` on the generated lines. And `autoSplit: true` is mandatory on both, because Newsreader is a variable font loaded with `display: swap` and the line breaks *will* change when it lands.

### 3.7 Plugin registration list

Registered once, at module scope, in `components/providers/motion-provider.tsx`:

```ts
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, ScrambleTextPlugin)
```

| Plugin | Used by | Would removing it break anything? |
|---|---|---|
| `useGSAP` | Every animated section | Yes — StrictMode safety and scoped selectors. |
| `ScrollTrigger` | `eleven-months`, `endpaper`, `questions`, `colophon` | Yes — the pin and both scrubs. |
| `SplitText` | `hero` H1, `endpaper` H2 | Yes — §3.6. |
| `DrawSVGPlugin` | `hero` masthead rule, `reckoning` total rule, `colophon` closing rule | Yes — three rule draws. |
| `ScrambleTextPlugin` | `hero` Departure Card values | Yes — step 6 of the boot sequence. |

**Not registered, and must not be added:** `MorphSVGPlugin` (canon explicitly rejects Meridian's Unbroken Line), `ScrollSmoother` (Lenis owns scroll feel), `MotionPathPlugin`, `Flip` (Motion's `layoutId` owns shared-element morphs), `Observer`, `Draggable`, `InertiaPlugin`, `GSDevTools` (dev only, never shipped). Every one of these is free and available; none is needed, and each would be dead weight in a 150 kB JS budget.

---

## 4. Framer Motion plan

### 4.1 Shared variants and constants

```tsx
// lib/motion/variants.ts
import type { Variants, Transition, Easing } from "framer-motion"

/** Canon easing curves, as cubic-bezier arrays. No other curve may be used. */
export const EASE = {
  quad:  [0.25, 0.46, 0.45, 0.94],
  cubic: [0.215, 0.61, 0.355, 1],
  quart: [0.165, 0.84, 0.44, 1],
  expo:  [0.19, 1, 0.22, 1],
  inout: [0.65, 0, 0.35, 1],
  press: [0.34, 1.4, 0.64, 1],
} as const satisfies Record<string, Easing>

/** Canon duration scale, in seconds. */
export const DUR = {
  d1: 0.12, d2: 0.20, d3: 0.32, d4: 0.48, d5: 0.70, hero: 0.90,
} as const

/** Canon stagger scale, in seconds. */
export const STAGGER = { tight: 0.045, base: 0.08, loose: 0.12 } as const

/** The default viewport for every once-only reveal on the page. */
export const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -8% 0px" } as const

const t = (duration: number, ease: Easing, delay = 0): Transition => ({ duration, ease, delay })

/** Default chapter reveal: opacity + y, once, 700ms, --ease-quart. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown:  { opacity: 1, y: 0, transition: t(DUR.d5, EASE.quart) },
}

/** Group parent for staggered rows/cards. Children use `rise` or `riseTight`. */
export const riseGroup = (stagger: number = STAGGER.tight, delayChildren = 0): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: stagger, delayChildren } },
})

export const riseTight: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown:  { opacity: 1, y: 0, transition: t(DUR.d5, EASE.quart) },
}

/** for-parents and still-page: opacity ONLY. No transform, ever. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  shown:  { opacity: 1, transition: t(DUR.d5, EASE.quad) },
}

/** Drawers and sheets. --dur-4 / --ease-quart, per canon "drawer open". */
export const drawer: Variants = {
  hidden: (side: "right" | "bottom" = "right") =>
    side === "bottom" ? { opacity: 0, y: 24 } : { opacity: 0, x: 24 },
  shown:  { opacity: 1, x: 0, y: 0, transition: t(DUR.d4, EASE.quart) },
  exit:   { opacity: 0, transition: t(DUR.d2, EASE.quad) },
}

/** enquiry step transition. `custom` is +1 forward, -1 back. */
export const step: Variants = {
  hidden: (dir: number) => ({ opacity: 0, x: dir * 16 }),
  shown:  { opacity: 1, x: 0, transition: t(DUR.d3, EASE.cubic) },
  exit:   (dir: number) => ({ opacity: 0, x: dir * -16, transition: t(DUR.d3, EASE.cubic) }),
}

/** The only press treatment on the page. CTA pills and chips only. */
export const press = { whileTap: { scale: 0.98, transition: t(DUR.d1, EASE.press) } } as const
```

Usage, with `LazyMotion strict` in force (`m`, never `motion`):

```tsx
import { m } from "framer-motion"
import { rise, riseGroup, VIEWPORT, STAGGER } from "@/lib/motion/variants"

<m.ul variants={riseGroup(STAGGER.tight)} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
  {services.map((s) => (
    <m.li key={s.id} variants={rise}>{/* … */}</m.li>
  ))}
</m.ul>
```

### 4.2 `whileInView` defaults

Every once-only reveal on the page uses `VIEWPORT` above: `once: true`, `amount: 0.25`, `margin: "0px 0px -8% 0px"`.

- `once: true` is **mandatory** — canon's motion budget is "reveals that fire once". A re-firing reveal is a loop by another name.
- `amount: 0.25` fires when a quarter of the element is visible; on a tall section this means the reveal starts as the reader arrives, not after they have already read it.
- `margin: "0px 0px -8% 0px"` pulls the trigger line 8% up from the viewport bottom so a reveal never completes below the fold on a short mobile viewport.
- **Never** set `viewport={{ once: false }}` anywhere on this page. It is a review-blocking violation of the motion budget.

### 4.3 `sticky-nav` state

```tsx
// components/sections/sticky-nav/nav-motion.tsx
"use client"

import { m, useScroll, useTransform, useSpring } from "framer-motion"

export function NavMotion({ pageRef }: { pageRef: React.RefObject<HTMLElement> }) {
  const { scrollY } = useScroll()

  // 1. Wordmark 1 -> 0.92 past 40px. Canon.
  const wordmarkScale = useTransform(scrollY, [0, 40], [1, 0.92], { clamp: true })
  // 2. Hairline beneath strengthens.
  const ruleOpacity   = useTransform(scrollY, [0, 40], [0.55, 1], { clamp: true })
  // 3. Nav ground 92% -> 96%. NO backdrop-filter, anywhere, ever.
  const groundAlpha   = useTransform(scrollY, [0, 40], [0.92, 0.96], { clamp: true })

  // 4. Chapter spine fills top-down across the whole document.
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] })
  const spineScaleY = useSpring(scrollYProgress, { stiffness: 180, damping: 40, mass: 1 })

  return (
    <>
      <m.span data-nav-wordmark style={{ scale: wordmarkScale, transformOrigin: "left center" }}>
        Global Opportunities
      </m.span>
      <m.span data-nav-rule style={{ opacity: ruleOpacity }} aria-hidden="true" />
      <m.div  data-nav-ground style={{ opacity: groundAlpha }} aria-hidden="true" />
      {/* >=1024px only; removed with the marginalia rail below that. */}
      <m.div
        data-chapter-spine
        aria-hidden="true"
        style={{ scaleY: spineScaleY, transformOrigin: "top center",
                 backgroundImage: "var(--grad-spine-fill)" }}
      />
    </>
  )
}
```

The mega-panel (Destinations only — canon: *"Only `Destinations` opens a mega-panel"*) uses `AnimatePresence` with `drawer` variants at `--dur-4` / `--ease-quart`. It opens on **click, not hover**, at every breakpoint: a hover-opened panel must satisfy WCAG 2.2 SC 1.4.13 (hoverable, dismissible, persistent), and a click-opened one satisfies it for free.

### 4.4 `gazetteer` row expand + `layoutId` margin plate morph

```tsx
// components/sections/gazetteer/gazetteer-row.tsx
"use client"

import { m, AnimatePresence } from "framer-motion"
import { DUR, EASE, VIEWPORT } from "@/lib/motion/variants"

export function Gazetteer({ rows }: { rows: Destination[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = rows.find((r) => r.id === openId)

  return (
    <div data-gazetteer>
      <ul>
        {rows.map((r) => (
          <m.li key={r.id} layout="position" data-row
            onHoverStart={() => setOpenId(r.id)}          /* >=768px */
            onFocus={() => setOpenId(r.id)}
            onTap={() => setOpenId((v) => (v === r.id ? null : r.id))}>
            <RowSummary row={r} />
            <AnimatePresence initial={false}>
              {openId === r.id && (
                <m.div key="detail"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: DUR.d3, ease: EASE.cubic } }}
                  exit={{ opacity: 0, y: -6, transition: { duration: DUR.d3, ease: EASE.cubic } }}>
                  <RowDetail row={r} />
                </m.div>
              )}
            </AnimatePresence>
          </m.li>
        ))}
      </ul>

      {/* Margin rail, >=1024px. ONE plate element that morphs between countries. */}
      <div data-gazetteer-margin aria-live="polite">
        <AnimatePresence mode="wait">
          {open && (
            <m.figure
              key={open.id}
              layoutId="gazetteer-plate"                  /* the shared element */
              data-plate="cartographic"
              transition={{ duration: DUR.d4, ease: EASE.quart }}
              style={{ aspectRatio: "4 / 5" }}            /* locked: no CLS on morph */
            >
              <PlateD country={open} />
              <figcaption data-letterpress>{open.plateCaption}</figcaption>
            </m.figure>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
```

`layoutId="gazetteer-plate"` is shared by every country's plate, so the plate *travels and re-typesets* between destinations instead of cross-fading — the effect canon describes as *"the margin cartographic panel morphs in"*. `mode="wait"` guarantees exactly one plate is ever mounted, which caps the animating element count at one regardless of how fast the reader scans the index.

### 4.5 `contributors` `layoutId` drawer

```tsx
// components/sections/contributors/contributors.tsx
"use client"

import { m, AnimatePresence } from "framer-motion"
import { DUR, EASE, drawer, VIEWPORT, riseGroup, rise, STAGGER } from "@/lib/motion/variants"

export function Contributors({ people }: { people: Counsellor[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = people.find((p) => p.id === openId)

  return (
    <>
      <m.ul variants={riseGroup(STAGGER.base)} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
        {people.map((p) => (
          <m.li key={p.id} variants={rise}>
            <m.button layoutId={`cartouche-${p.id}`} onClick={() => setOpenId(p.id)}
              transition={{ duration: DUR.d4, ease: EASE.quart }}
              aria-haspopup="dialog" aria-expanded={openId === p.id}>
              <m.div layoutId={`monogram-${p.id}`}>{p.initials}</m.div>
              <m.div layoutId={`data-${p.id}`}>
                {p.name} · {p.city} · {p.destinations} · {p.years} YEARS
              </m.div>
            </m.button>
          </m.li>
        ))}
      </m.ul>

      <AnimatePresence>
        {open && (
          <>
            <m.div data-scrim initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: DUR.d2, ease: EASE.quad }} onClick={() => setOpenId(null)} />
            <m.div role="dialog" aria-modal="true" aria-labelledby={`c-${open.id}-name`}
              layoutId={`cartouche-${open.id}`} data-drawer
              transition={{ duration: DUR.d4, ease: EASE.quart }}>
              <m.div layoutId={`monogram-${open.id}`}>{open.initials}</m.div>
              <m.div layoutId={`data-${open.id}`} id={`c-${open.id}-name`}>{/* … */}</m.div>

              {/* Real anchors. These work with JavaScript disabled. Canon build note 11. */}
              <a href={`tel:${open.tel}`}>Call {open.firstName}</a>
              <a href={open.waHref} rel="noopener">WhatsApp {open.firstName}</a>
              <a href={`#enquiry?counsellor=${open.id}`}>Book {open.firstName}</a>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
```

Three `layoutId` pairs (`cartouche`, `monogram`, `data`) rather than one, so the initials monogram and the data block each travel independently — the cartouche *unfolds* into the drawer rather than scaling as a single rigid image. `--shadow-drawer` is applied to `[data-drawer]` with its own `--dur-2` opacity fade after the morph settles, so no blurred shadow is composited while the element is moving.

### 4.6 Accordion height animation

**There is exactly one accordion technique on this page, and it is not a height animation.**

`questions` (canon): native `<details>` + `grid-template-rows: 0fr → 1fr`, `--dur-3` (320ms), `--ease-cubic`, **zero JS**.

```css
/* Used by #questions AND by #gazetteer's <768px tap-accordion. */
[data-accordion-panel] {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--dur-3) var(--ease-cubic);
}
[data-accordion-panel] > * { overflow: hidden; min-height: 0; }
details[open] [data-accordion-panel],
[data-accordion-panel][data-open="true"] { grid-template-rows: 1fr; }

@media (prefers-reduced-motion: reduce) {
  [data-accordion-panel] { transition: none; }
}
```

> **[GAP RESOLVED]** Canon build note 3 bans animated `width`/`height` outright, and canon §14 prescribes `grid-template-rows: 0fr→1fr` for `questions`. The gazetteer's `<768px` tap-accordion had no stated technique. It uses the identical CSS above. **`grid-template-rows` is therefore the single sanctioned layout-animating property on the entire page** (§8.3), used in exactly two places, and Motion's `animate={{ height: "auto" }}` is banned everywhere.

### 4.7 Multi-step form transitions

```tsx
// components/sections/enquiry/enquiry-form.tsx
"use client"

import { m, AnimatePresence } from "framer-motion"
import { step, DUR, EASE, press } from "@/lib/motion/variants"

export function EnquiryForm() {
  const [stepIndex, setStepIndex] = useState(0)
  const [dir, setDir] = useState(1)          // +1 forward, -1 back
  const go = (next: number) => { setDir(next > stepIndex ? 1 : -1); setStepIndex(next) }

  return (
    <form action="/api/enquiry" method="post" data-enquiry>
      {/* Progress rule — scaleX only, never width. Canon. */}
      <m.span data-progress-rule aria-hidden="true"
        animate={{ scaleX: (stepIndex + 1) / 3 }}
        transition={{ duration: DUR.d3, ease: EASE.cubic }}
        style={{ transformOrigin: "left center" }} />
      <p className="sr-only" aria-live="polite">Step {stepIndex + 1} of 3</p>

      {/* min-height locked to the tallest step: zero CLS across transitions. */}
      <div data-step-frame>
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <m.fieldset key={stepIndex} custom={dir} variants={step}
            initial="hidden" animate="shown" exit="exit">
            {stepIndex === 0 && <StepDestination onNext={() => go(1)} />}
            {stepIndex === 1 && <StepDegreeIntake onNext={() => go(2)} onBack={() => go(0)} />}
            {stepIndex === 2 && <StepContact onBack={() => go(1)} />}
          </m.fieldset>
        </AnimatePresence>
      </div>

      <m.button type="submit" {...press}>Book free counselling</m.button>
      <p data-proof>A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST. No fee, no obligation.</p>

      {/* Equal first-class siblings. Real anchors, JS-free. */}
      <a href="tel:1800111119">Call 1800 111 119</a>
      <a href={waHref} rel="noopener">WhatsApp us</a>
    </form>
  )
}
```

`mode="wait"` means the outgoing step fully exits before the incoming one enters — a page turn, not a cross-dissolve. `initial={false}` stops step 1 from animating in on first paint, which protects INP on hydration. **With JS disabled, all three fieldsets render stacked and the form POSTs natively** (see `06-strategy.md` §2.3).

### 4.8 Magnetic and hover treatments — the sanctioned set

**There are no magnetic buttons on this page.** Pointer-following, cursor-attraction, 3D tilt and parallax-on-hover are all rejected: the canon's motion personality is *paper being read*, and paper does not chase the reader. Motion's `useMotionValue` + `useSpring` + `useTransform` → `rotateX/rotateY` capability is deliberately unused. This is a decision, not an oversight.

The complete permitted hover/focus set, at `--dur-2` (200ms) `--ease-quad` unless noted:

| Element | Treatment | Property | Notes |
|---|---|---|---|
| Primary CTA pill | `--sienna-press` → `--sienna-deep`; press `scale 0.98` | `background-color`, `transform` | Press at `--dur-1` / `--ease-press` |
| Secondary / ghost CTA | Border `--rule-strong` → `--marine`; label → `--marine` | `border-color`, `color` | |
| Text link | Sienna underline swell: `scaleY 1 → 2` on a `1px` pseudo-element | `transform` | Never `text-decoration-thickness` |
| `what-we-do` row | Rule draws left→right | `transform: scaleX` | `--dur-3`, `--ease-cubic`, canon |
| `gazetteer` row | Background → `--sienna-tint`; rule → `--rule-strong` | `background-color`, `border-color` | |
| Footnote superscript | Marks its rail line: `--ochre-tint` ground, `opacity 0.55 → 1` | `background-color`, `opacity` | ≥1024px only |
| Plate C cartouche | Registration offset `3px → 4px` via `translate(1px, 1px)` on the offset pseudo-element | `transform` | **Never** animate the `box-shadow` offsets |
| Destination / degree chip | Ground → `--sienna-tint`, border → `--sienna`; press `scale 0.98` | `background-color`, `border-color`, `transform` | |
| Branch crosshair | Stroke `--sienna` → `--sienna-press`, `scale 1 → 1.15` | `stroke`, `transform` | ≥44×44px invisible hit target |
| Any focusable element | `:focus-visible` ring: `2px solid var(--sienna-press)`, offset `2px` | `outline` | `--ochre-on-dark` inside `[data-chapter="success"]`; `3px` under `prefers-contrast: more` |

`:focus-visible` only, never bare `:focus` (canon). Every hover treatment above has a `:focus-visible` equivalent, and every one is reachable by keyboard.

---

## 5. Anime.js micro-interaction plan

Anime.js v4 is a **named-export** API — there is no default `anime()`. It is never in the initial bundle. Every use below is dynamically imported at a section boundary, wrapped in `createScope({ root })`, and torn down with `scope.revert()`.

### 5.1 Ledger odometers

```ts
// lib/motion/odometer.ts
import { animate, utils, stagger, createScope } from "animejs"

/**
 * Animates only the final 12% of every [data-odometer] inside `root`.
 * The FINAL value is already server-rendered in textContent — we briefly
 * rewind to 92% and count back up. If this module never loads, the page
 * is already correct. GO's current placeholder-zero bug cannot occur here.
 */
export function mountOdometers(root: HTMLElement) {
  const scope = createScope({ root }).add(() => {
    const cells = root.querySelectorAll<HTMLElement>("[data-odometer]")

    cells.forEach((el, i) => {
      const final = Number(el.dataset.final)
      if (!Number.isFinite(final)) return
      const start = Math.round(final * 0.92)   // canon: animate the last 12% only
      const suffix = el.dataset.suffix ?? ""   // "+", "₹", "L" etc. — never animated
      const proxy = { v: start }

      el.textContent = format(start) + suffix

      animate(proxy, {
        v: final,
        duration: 700,                          // --dur-5, the hard cap
        ease: "outQuart",                       // == --ease-quart
        delay: stagger(45, { start: 0 })[i] ?? 0,
        modifier: utils.round(0),
        onUpdate: () => { el.textContent = format(proxy.v) + suffix },
        onComplete: () => { el.textContent = format(final) + suffix }, // exact, always
      })
    })
  })

  return () => scope.revert()
}

const nf = new Intl.NumberFormat("en-IN")
const format = (n: number) => nf.format(n)
```

**Non-negotiables around every odometer cell**, enforced in `04-design-system.md`:

```css
[data-odometer] {
  font-variant-numeric: tabular-nums lining-nums slashed-zero;
  display: inline-block;
  min-width: var(--odometer-ch); /* set per instance from the final value's digit count */
  text-align: right;
}
```

Tabular figures plus a `ch`-locked minimum width mean a digit change can never alter the cell's width, which means an odometer can never cause a reflow, a repaint of neighbouring type, or CLS. **Every odometer on the page counts from 92% of a server-rendered final value, once.** Used in: `register` (700+ and eight country counts), `endpaper` (cited count-ups), `reckoning` (ledger figures on chip change), `for-parents` (dual-clock digits, via the same primitive at `--dur-3`).

### 5.2 `branch-atlas` — `svg.createDrawable` India draw

```ts
// lib/motion/atlas-draw.ts
import { animate, stagger, svg, createScope } from "animejs"

export function mountAtlasDraw(root: HTMLElement) {
  const scope = createScope({ root }).add(() => {
    // createDrawable returns proxies exposing `draw` as a normalised "start end" string.
    const outline = svg.createDrawable("[data-india-path]")

    // 1. India inks itself in hairline. 900ms, power2.inOut (canon).
    animate(outline, {
      draw: ["0 0", "0 1"],
      duration: 900,
      ease: "inOutQuad",           // == --ease-inout == power2.inOut
    })

    // 2. Eighteen crosshairs stamp in geographic sequence (DOM order authored N->S).
    //    Starts at 620ms, overlapping the tail of the draw.
    animate("[data-branch-node]", {
      opacity: [0, 1],
      scale: [0.6, 1],
      duration: 320,               // each tween <= --dur-5
      ease: "outBack(1.4)",        // == --ease-press == back.out(1.4)
      delay: stagger(28, { start: 620 }),
    })
    // Sequence envelope: 620 + 17*28 + 320 = 1416ms. Declared in 05 section 1.2.

    // 3. Delhi South HQ gets its sienna ring last.
    animate("[data-branch-node='delhi-south'] [data-hq-ring]", {
      opacity: [0, 1], scale: [0.8, 1],
      duration: 240, ease: "outQuart", delay: 1180,
    })
  })

  return () => scope.revert()
}
```

The same `createDrawable` primitive draws the three ochre **annotation leaders** on the Plate B specimen sheets in `eleven-months`, fired from the `atlas:draw-leader` custom event dispatched by each specimen's `containerAnimation` child trigger (§3.4): `draw: ["0 0", "0 1"]`, `duration: 700`, `ease: "inOutQuad"`.

**Base CSS must leave the paths fully drawn.** The dash is applied only by `createDrawable` at runtime. If Anime.js never loads — no JS, reduced motion, slow network, failed chunk — the India map and every leader render complete. This is the same principle as server-rendered counters, applied to vector art.

### 5.3 Caption letterpress re-set

```ts
// lib/motion/letterpress.ts
import { animate, stagger, text, createScope } from "animejs"

/**
 * A caption being re-set in the chase: characters settle into place,
 * left to right, at 8ms intervals. Used on gazetteer plate captions
 * (on country change) and reckoning ledger labels (on chip change).
 */
export function letterpressReset(root: HTMLElement, selector = "[data-letterpress]") {
  const scope = createScope({ root }).add(() => {
    const { chars } = text.splitText(selector, { chars: true, accessible: true })

    animate(chars, {
      opacity: [0, 1],
      y: [2, 0],                   // 2px. A character settling, not a character flying in.
      duration: 200,               // per character
      ease: "outCubic",            // == --ease-cubic
      delay: stagger(8),
    })
    // A 40-character caption resolves in 8*39 + 200 = 512ms. Under --dur-5.
  })

  return () => scope.revert()
}
```

`accessible: true` keeps the original string available to assistive technology and marks the generated character spans `aria-hidden` — the same contract SplitText enforces in GSAP, and the same rule applies: **do not override the generated ARIA.**

The effect is deliberately *not* a scramble. Scramble is the hero's gesture and belongs to GSAP; repeating it in Chapter II would spend the hero's one distinctive move twice.

### 5.4 The React pattern — `createScope({ root })` + `revert()`

Every Anime.js entry point on the page follows this exact shape. There are five: `register`, `branch-atlas`, `endpaper` (via the GSAP handoff in §3.5), `reckoning` (interaction-gated) and `for-parents` (interaction- and time-gated).

```tsx
// components/sections/register/use-register-counters.ts
"use client"

import { useEffect, useRef } from "react"

export function useRegisterCounters() {
  const root = useRef<HTMLElement>(null)
  const revert = useRef<(() => void) | null>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    // 1. Reduced motion: return BEFORE the dynamic import. Anime.js is never fetched.
    //    The server-rendered final values are already on screen and are already correct.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let cancelled = false

    // 2. IntersectionObserver gate — costs nothing on ScrollTrigger.refresh().
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()

        // 3. Dynamic import at the section boundary — never in the initial bundle.
        const { mountOdometers } = await import("@/lib/motion/odometer")
        if (cancelled) return

        // 4. mountOdometers wraps everything in createScope({ root }) and returns revert.
        revert.current = mountOdometers(el)
      },
      { rootMargin: "0px 0px -20% 0px" }
    )
    io.observe(el)

    // 5. Cleanup: disconnect the observer and revert the scope. StrictMode-safe.
    return () => { cancelled = true; io.disconnect(); revert.current?.() }
  }, [])

  return root
}
```

Five properties of this pattern are load-bearing, and all five are review-blocking:

1. **The reduced-motion check happens before the import**, so a reduced-motion user downloads zero bytes of Anime.js on the whole page.
2. **`cancelled`** guards against the component unmounting during the `await`, which React 19 StrictMode makes routine in development.
3. **`createScope({ root })`** confines every selector string to the section, so `[data-odometer]` in `register` can never reach into `endpaper`.
4. **`scope.revert()`** restores every touched property, which is what makes StrictMode's double-invoke a no-op rather than a double-animation.
5. **`io.disconnect()` on first intersection** — these are one-shot animations and the observer has no further job.

### 5.5 Dynamic-import boundary map

| Section | Gate | Module | Approx. cost when it loads |
|---|---|---|---|
| `register` | IntersectionObserver, `-20%` | `lib/motion/odometer` | Anime core + `utils` |
| `branch-atlas` | IntersectionObserver, `-20%` | `lib/motion/atlas-draw` | Anime core + `svg` |
| `endpaper` | `st-endpaper-enter` ScrollTrigger callback | `lib/motion/odometer` | cached — already loaded by `register` |
| `reckoning` | First chip interaction (`onPointerDown`, capture) | `lib/motion/odometer` + `lib/motion/letterpress` | cached + `text` |
| `for-parents` | In view **and** <20s to the next minute boundary | `lib/motion/odometer` | cached |
| `gazetteer` | First row expand | `lib/motion/letterpress` | cached |

Because every module resolves to the same Anime.js chunk, whichever section fires first pays for it and the rest are free. In practice `register` (≈ 320vh) is almost always first, which places the cost well past the LCP frame and well past the INP-critical hydration window.

---

## 6. Scroll storyboard

Scroll positions are design-time estimates on a 1440×900 desktop viewport, to be re-measured against the built page. `0vh` is the top of the document.

| vh | Section | Chapter | Pins / scrubs | What the reader sees and feels | Handoff |
|---|---|---|---|---|---|
| **0–100** | `hero` | I Dream | none | The page boots. Three lines rise from behind a mask; a hairline inks across the masthead; six card rows stamp down; six values resolve out of scramble in fixed cells; six status marks flip green; `STATUS: GO · SEPTEMBER 2027 INTAKE`. It reads as a form being *cleared*, not a website loading. Over in 1.4s, then completely still. | — |
| **100–140** | `colophon-strip` | I Dream | none | One running line of set text — 25 years, 40,000+, 700+, 15, 18, 47 — each with a sienna superscript. Hovering one lights its line in the right rail. The page has said "check me" before it has asked for anything. | I → II: the strip's bottom rule is the chapter break |
| **140–320** | `gazetteer` | II Explore | none | Four anchor plates, then eleven ruled rows in alphabetical order. The reader scans like an index. A row opens, a cartographic panel morphs into the margin and its caption re-sets character by character. Reading, not shopping. | — |
| **320–400** | `register` | II Explore | none (IO gate) | `700+` ticks the last 12% into place. Eight country counts follow. Then twenty-four institution names in three typeset columns — Monash, Auckland, QMUL, Northeastern, UCD, Alberta. A parent recognises three of them and relaxes. | — |
| **400–500** | `what-we-do` | II → III | none | Fifteen services as a ruled two-column ledger, each marked `FREE` or `PAID` with the actual figure. Hovering draws the row's rule left to right. The free/paid line is drawn before anyone asked. | II → III: surface goes `--paper` → `--paper-still` |
| **500–570** | `still-page` | III Trust | none | **The page stops.** One 400ms fade and then nothing at all, on the brightest, flattest surface on the page, under *Nothing here casts a shadow.* Six accreditations as typographic blocks; AIRC's actual standard quoted. The absence of motion is the argument. | — |
| **570–690** | `branch-atlas` | III Trust | none (IO gate) | India inks itself in hairline over 900ms; eighteen crosshairs stamp down the country north to south; Delhi South takes a sienna ring. Tap one: an address, a phone number, and *Walk in tomorrow, 11:00 AM.* An abstraction becomes a door. | — |
| **690–800** | `contributors` | III Trust | none | Cartouches: initials at 5rem, city, destinations, years. Hover and the plate pulls a pixel further out of register. Tap and the cartouche unfolds into a drawer with a phone number that works. You book a person. | — |
| **800–950** | `for-parents` | III Trust | none | Warmer paper, serif body, larger type, slower. Money, safety, recognition, accreditation, who calls you, what we are paid, what happens if the visa is refused. **Opacity-only reveals — nothing moves.** The dual clock ticks once a minute: *You'll always know what time it is where they are.* | III → IV: surface goes `--paper-warm` → `--paper-tracing` |
| **950–1080** | `reckoning` | IV Choose | none (user-triggered) | Three chips. Tap one and the ledger re-typesets line by line while the ₹ figures roll in their cells and one stacked bar re-proportions. Then the total rule draws, and beneath it, static and unanimated: *What Global Opportunities charges you: ₹0. Here is who pays us, and how.* | IV → V |
| **1080–1180** | `eleven-months` (pin engages) | V Apply | **PIN + `scrub: 0.6`** | The section locks to the viewport. The ruled calendar begins travelling left. AUG. SEP. Real durations, real owners. | — |
| **1180–1280** | `eleven-months` (mid-track) | V Apply | **PIN active** | Ochre ticks stamp up from the rule — Pune, Mumbai, Delhi, Amritsar, Ludhiana, Chandigarh, Hyderabad, Chennai. Sienna ticks — UCAS, 15 July, AU February — each with a source and a last-verified date. Three specimen sheets tip in and an ochre leader draws to the one clause that matters. | — |
| **1280–1380** | `eleven-months` (pin releases) | V Apply | **PIN releases** | JUN. JUL. The margin note fades in — opacity only, no movement: *This is a real timeline. It is not a promise.* The pin lets go. | V → VI |
| **1380–1410** | `endpaper` turn band | VI Success | **`scrub: 0.6`** | Over 30vh the whole page goes dark. Nothing moves — cream simply becomes `#0E2029` beneath everything. The nav's ink inverts. It reads as turning to the endpapers of a bound book. | The one earned inversion on the page |
| **1410–1590** | `endpaper` | VI Success | none after the band | *Forty thousand people have already done this.* rises behind a mask. Counters settle their last 12%. Named students with named universities, named years and named counsellors. Then five partner institutions vouching back. | — |
| **1590–1614** | `questions` return band | VI Success | **`scrub: 0.6`** | Over 24vh the paper returns. The dark layer scrubs back out. | Back to `--paper` |
| **1614–1700** | `questions` | VI Success | none | Eight questions, native `<details>`. *What do you charge? Who pays you? What if my visa is refused? Is it safe for my daughter?* Each opens at 320ms with no JavaScript involved. | Last objection cleared |
| **1700–1810** | `enquiry` | VI Success | none | Three steps, six fields, three of them taps. A progress rule scales. `Call 1800 111 119` and `WhatsApp us` sit beside the submit as equals. PII arrives last, after two commitments have already been made. | — |
| **1810–1880** | `colophon` | — | none | One rule draws over 600ms and then the book closes: legal entity, eighteen addresses, three numbers, the Sources & Last-Verified table, and *Volume XXV. Set in Newsreader, Hanken Grotesk and IBM Plex Mono. New Delhi, 2026.* | End |

**Total desktop scroll ≈ 1880vh.** Removing the pin below 1024px drops ≈200vh of pinned scroll distance and adds back roughly the same in stacked height, so mobile lands in the same order of magnitude with **four** ScrollTriggers instead of ten.

**Chapter handoff rule.** Every chapter boundary is marked by exactly three things, and never by an animation: a surface change (`--paper` → `--paper-laid` → `--paper-still` → `--paper-warm` → `--paper-tracing` → `--endpaper`), a `0.125rem` `--rule-strong` chapter rule, and the margin numeral re-setting (`I DREAM` → `II EXPLORE` → …). The only chapter transition that is animated at all is V → VI, and that is the point of it.

---

## 7. 3D & depth

### 7.1 The registration-offset depth system

There is **no elevation shadow on any in-flow element on this page.** Depth is made by four things, in this order of importance:

1. **Print misregistration.** A plate sits proud of its grid cell and its "shadow" is a 1px rule offset by 3px, exactly like a two-colour press slightly out of register:

   ```css
   --reg-sienna: 3px 3px 0 0 #C2562B;
   --reg-marine: 3px 3px 0 0 #14384A;
   --reg-rule:   2px 2px 0 0 #C7B9A1;
   ```

   These are `box-shadow` values with **zero blur radius**. They are static. **They are never animated** — canon build note 3 bans animated `box-shadow` outright. The `contributors` hover treatment (§4.8) achieves its 3px→4px shift by translating the *offset pseudo-element* by `1px, 1px`, not by tweening the shadow.
2. **Overlap and scale.** Anchor cells are ≥2× the area of supporting cells; plates overlap their grid cell boundaries.
3. **Generous whitespace.** 20–30% inner whitespace per bento cell.
4. **Paper layering.** Six paper tokens (`--paper`, `--paper-still`, `--paper-laid`, `--paper-warm`, `--paper-tracing`, plus `--endpaper`) that read as different stocks, not as different elevations.

The one blurred shadow token on the page:

```css
--shadow-drawer: 0 1px 2px rgba(23,19,16,0.05), 0 24px 48px -20px rgba(23,19,16,0.22);
```

Permitted **solely** on modal and drawer surfaces — the counsellor drawer, the branch drawer, the Destinations mega-panel — because those genuinely float above the page plane and need the separation to be legible. It is faded in with an opacity transition on a pseudo-element *after* the drawer's morph completes, so it is never composited on a moving element.

### 7.2 Perspective and 3D transforms

**Zero.** No `perspective`, no `transform-style: preserve-3d`, no `rotateX`, no `rotateY`, no `rotateZ` beyond the single `-0.6deg → 0` settle on the `eleven-months` specimen sheets (a 2D rotation, imitating a physical sheet being tipped into a book). No card tilt. No 3D flip. No cube. No carousel with depth.

GSAP's `force3D: "auto"` is left at its default — it promotes an element to its own compositor layer for the duration of a tween and strips the promotion afterwards. That is the *only* 3D anything on this page, it is invisible, and it exists purely as a rasterisation hint.

### 7.3 Ambient background rules

| Layer | Rule |
|---|---|
| Paper grain | **One baked ~8 kB AVIF tile**, `background-repeat`, `mix-blend-mode: multiply`, 4% opacity, page-level. **Static. Never animated. Never a live filter.** Suppressed under `prefers-reduced-transparency`. It survives Mali and Adreno GPUs precisely because it is a bitmap and not a shader. |
| Gradients | **Exactly six exist** (`--grad-paper-vignette`, `--grad-endpaper-turn`, `--grad-endpaper-return`, `--grad-plate-marine`, `--grad-plate-laid`, `--grad-spine-fill`). All static CSS. The only one that participates in motion is `--grad-spine-fill`, and only as the paint of an element whose `scaleY` is mapped to scroll. **No gradient's colour stops are ever animated.** |
| Parallax | **None. Anywhere on the page.** Canon forbids it in the hero explicitly, and the motion budget — one hero sequence, one interaction per chapter, one scrubbed pin, once-only reveals — has no slot for it. **[GAP RESOLVED]** Canon states *"No parallax in hero, ever"*; extending the prohibition page-wide is the only reading consistent with the stated budget and with "an atlas that jitters is not an atlas". |
| Ambient loops | **None.** Zero infinite animations anywhere on the page — no breathing glow, no drifting mesh, no marquee, no shimmer, no pulse, no auto-advancing carousel. This is canon and it is the single largest sustained-CPU saving on the target device. |
| Cursor effects | **None.** No custom cursor, no trailing dot, no magnetic attraction, no spotlight. |

### 7.4 The explicit no-WebGL guardrail

**No WebGL. No WebGPU. No `<canvas>` used for decoration. No Three.js, no React Three Fiber, no OGL, no Pixi, no Lottie, no Rive, no shader of any kind, at any breakpoint, in v1 or v2.**

Four reasons, any one of which is sufficient:

1. **The target device.** A ₹15,000 Android on a Mali or Adreno GPU at 3–6 Mbps. A WebGL context is the fastest available way to lose the INP budget and heat the device.
2. **The bundle.** The JS budget is 150 kB gzipped for the entire page. Three.js alone is roughly twice that.
3. **The art direction.** Depth on this page is a 3px sienna rule offset by 3px. There is nothing for a GPU to do. A shader would be answering a question the design does not ask.
4. **The argument to the client.** *In a noisy category, quiet design is the loudest move.* A WebGL scene is the noisiest available move.

The only `<canvas>` permitted anywhere near this project is the build-time Open Graph image generator (`next/og`), which runs on the server and ships a static PNG. See `06-strategy.md` §4.6.

---

## 8. Motion governance

### 8.1 ScrollTrigger budget — ≤14, ten declared

Canon build note 3: *"≤14 ScrollTrigger instances total, never two pins active."*

| # | ID | Section | Type | Breakpoint |
|---|---|---|---|---|
| 1 | `st-11m-pin` | `eleven-months` | pin + scrub 0.6 | ≥1024px |
| 2 | `st-11m-specimen-1` | `eleven-months` | `containerAnimation`, once | ≥1024px |
| 3 | `st-11m-specimen-2` | `eleven-months` | `containerAnimation`, once | ≥1024px |
| 4 | `st-11m-specimen-3` | `eleven-months` | `containerAnimation`, once | ≥1024px |
| 5 | `st-11m-ticks` | `eleven-months` | `containerAnimation`, once | ≥1024px |
| 6 | `st-11m-marginnote` | `eleven-months` | `containerAnimation`, once | ≥1024px |
| 7 | `st-endpaper-turn` | `endpaper` | scrub 0.6 | all |
| 8 | `st-endpaper-enter` | `endpaper` | once | all |
| 9 | `st-questions-return` | `questions` | scrub 0.6 | all |
| 10 | `st-colophon-rule` | `colophon` | once | all |

**Desktop total: 10. Headroom: 4. Mobile/tablet total: 4** (1–6 are never created below 1024px).

Everything else that responds to viewport position uses **IntersectionObserver** — via Motion's `whileInView` or the shared observer in the provider. This is deliberate: `ScrollTrigger.refresh()` is O(n) re-measurement over every registered instance and it fires on every mobile address-bar resize. Ten instances refresh imperceptibly; forty would not.

**Enforcement.** Every ScrollTrigger carries an explicit `id`. A dev-only assertion in the provider fails loudly if the count exceeds the budget:

```ts
if (process.env.NODE_ENV !== "production") {
  requestIdleCallback(() => {
    const n = ScrollTrigger.getAll().length
    if (n > 14) console.error(`[motion] ScrollTrigger budget exceeded: ${n}/14`,
      ScrollTrigger.getAll().map((t) => t.vars.id ?? "(unnamed)"))
    const pins = ScrollTrigger.getAll().filter((t) => t.pin).length
    if (pins > 1) console.error(`[motion] More than one pin declared: ${pins}`)
  })
}
```

### 8.2 One-active-pin rule

**`eleven-months` is the only pinned section on the page.** There is no second pin, and adding one requires re-opening the canon.

Rules that follow:

- The pin exists **only** at `≥1024px` **and only** under `prefers-reduced-motion: no-preference`. Both conditions live in one `gsap.matchMedia()` branch (§3.4), so the pin is created and destroyed atomically when either query flips.
- `anticipatePin: 1` is mandatory — it pre-pins one frame early and removes the jump on fast scroll.
- `end` is a **function** (`() => "+=" + distance()`) and `invalidateOnRefresh: true` is set, so the pin distance re-measures on resize instead of stranding the track.
- **`content-visibility: auto` must never be applied to `eleven-months`, to any of its ancestors, or to any section carrying a ScrollTrigger.** GSAP documents that it breaks measurement. It is permitted only on `questions` and `colophon` — and on `questions` only if the return-band trigger element is hoisted into `endpaper`'s DOM.
- **Pinning breaks under transformed ancestors.** No ancestor of `eleven-months` may carry a `transform`, a `filter`, a `will-change: transform`, or `contain: paint`. `pinReparent: true` exists as an escape hatch; using it is a signal that an ancestor needs fixing, not that the hatch was needed.

### 8.3 The transform/opacity law, and its three sanctioned exceptions

**The law** (canon build note 3): *"Animate `transform` and `opacity` only — animated `width`/`height`/`top`/`left`/`box-shadow`/`filter`/`backdrop-filter` is banned outright."*

Rationale, from the research: `transform` drops ~1% of frames; `top`/`left` drops ~50%. `filter: blur()` and `backdrop-filter` are the single biggest killers on Adreno and Mali GPUs — which is also why `backdrop-filter` appears nowhere on this page, including the sticky nav.

**The three sanctioned exceptions**, exhaustively:

| # | Property | Where | Why it is permitted |
|---|---|---|---|
| 1 | `stroke-dashoffset` (GSAP `drawSVG`, Anime `draw`) | `hero` masthead rule, `reckoning` total rule, `colophon` closing rule, `branch-atlas` India outline, `eleven-months` annotation leaders | Paint-only on a stroke. No layout implication, no reflow, no ancestor invalidation. It is the only way to draw a line, and drawing lines is the entire graphic system. |
| 2 | `grid-template-rows: 0fr → 1fr` | `questions` accordion, `gazetteer` <768px accordion | Canon prescribes it for `questions`. It is the CLS-safe, JS-free disclosure technique; the alternatives are a banned `height` animation or a JS-measured `max-height` that costs a library and a measurement per toggle. Used in exactly two places. |
| 3 | `background-color`, `border-color`, `color`, `outline-color`, `stroke` | Discrete hover / focus / selected state changes, ≤`--dur-2` (200ms) | Sanctioned by the canon easing table itself, which assigns `--ease-quad` to *"Colour, opacity, hover"*. These are paint-only, run on small elements, and fire on discrete pointer or focus events — never on scroll, never in a sequence, never scrubbed. |

**Explicitly still banned, with no exception:** animated `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding`, `box-shadow`, `filter`, `backdrop-filter`, `border-radius`, `font-variation-settings`, `clip-path` (SplitText's built-in `mask` uses an `overflow: hidden` wrapper, not `clip-path`), and any `background-image` gradient stop.

> **[GAP RESOLVED]** Canon's `endpaper` spec says *"scrubbed background tween"*, which read literally would be a fourth exception. It is implemented instead as an opacity cross-fade of two stacked fixed layers (§2.13), which is visually equivalent, cheaper, and inside the law. No exception is needed.

### 8.4 `will-change` discipline

**Never global. Never on a list. Never left on after a tween.**

- GSAP's `force3D: "auto"` (the default) promotes an element to its own layer for the duration of a tween and strips the promotion on completion. **This is the preferred mechanism and requires no CSS.** Do not add `will-change` to anything GSAP animates.
- Motion applies its own transient promotion during animation. Do not add `will-change` to anything Motion animates.
- CSS `will-change: transform` is permitted on exactly **three** elements on the whole page, each of which animates continuously against scroll and is not a GSAP or Motion target:
  1. `[data-nav-wordmark]` — scales continuously across the first 40px of every scroll (≥1024px only).
  2. `[data-chapter-spine]` — `scaleY` mapped to whole-document progress (≥1024px only).
  3. `[data-endpaper-layer]` — the fixed inversion layer, scrubbed twice across the page.
- **Nothing else.** In particular: not the fifteen `what-we-do` rows, not the eleven `gazetteer` rows, not the eighteen `branch-atlas` crosshairs, not the Departure Card rows. Promoting a list is how a mid-range Android runs out of GPU memory and starts dropping frames on everything, including scroll itself.
- A dev-only audit in the provider counts promoted layers and warns above three.

### 8.5 The full reduced-motion contract

**Three coordinated layers, and one inviolable rule: every reduced branch must land on the final, fully visible state. Reduced motion must never hide content.**

**Layer 1 — GSAP, the primary gate.**

```ts
// The shape every GSAP-animated section uses. See sections 3.2, 3.4, 3.5 for real instances.
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

useGSAP(
  () => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        // Compound conditions: pinning is >=1024px AND motion-allowed.
        pinned:  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        flowing: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
        reduce:  "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { reduce } = ctx.conditions!

        // ---- REDUCED BRANCH: set the FINAL state, then return. Build nothing.
        if (reduce) {
          gsap.set("[data-reveal-target]", { opacity: 1, y: 0, yPercent: 0, scale: 1, rotate: 0 })
          gsap.set("[data-draw]",          { drawSVG: "100%" })
          gsap.set("[data-endpaper-layer]",{ opacity: 1 })
          // Counters, ledger figures and card values are ALREADY at their
          // server-rendered final values. Do not touch them.
          return
        }

        // ---- FULL BRANCH: timelines and ScrollTriggers are only ever created here.
        /* … */
      }
    )

    // matchMedia auto-reverts an entire branch — including every ScrollTrigger
    // created inside it — the moment its query stops matching.
    return () => mm.revert()
  },
  { scope: containerRef }
)
```

**Layer 2 — Motion, at the app root.** `<MotionConfig reducedMotion="user">` in `MotionProvider` (§3.1). This disables transform and layout animations across every `m.*` component on the page while **preserving opacity and colour transitions**, which is exactly the right trade: a reader who has asked for reduced motion still gets state feedback, just not movement. For bespoke cases — the nav wordmark scale, the mobile bar entrance — use `useReducedMotion()` and return the static value early:

```tsx
const reduced = useReducedMotion()
const wordmarkScale = useTransform(scrollY, [0, 40], reduced ? [1, 1] : [1, 0.92], { clamp: true })
```

**Layer 3 — the CSS backstop.** Catches every transition the two libraries do not own — the `what-we-do` rule draw, both accordions, the `still-page` fade, every hover treatment, and native smooth scrolling.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  html { scroll-behavior: auto; }

  /* Never hidden. Every reveal's resting state is its final state. */
  [data-reveal],
  [data-reveal="still"] { opacity: 1 !important; transform: none !important; }

  /* Grain is decorative; drop it with transparency preferences too. */
  [data-grain] { display: none; }
}

@media (prefers-reduced-transparency: reduce) { [data-grain] { display: none; } }

/* No-JS: nothing on this page may depend on JavaScript to become visible. */
@media (scripting: none) {
  [data-reveal], [data-reveal="still"] { opacity: 1; transform: none; }
  [data-mobile-bar] { transform: none; opacity: 1; }
}
```

**Lenis.** Not initialised at all under reduced motion — the `mm.add("(prefers-reduced-motion: no-preference)", …)` branch in §3.1 is the entire lifecycle. Native scrolling takes over, `html { scroll-behavior: auto }` applies, and zero bytes of scroll-hijacking run.

**Anime.js.** Never fetched. Every entry point checks `matchMedia("(prefers-reduced-motion: reduce)")` **before** its dynamic `import()` (§5.4). A reduced-motion visitor downloads no part of Anime.js on any section.

**The verification checklist**, run against every section before it is marked done:

1. Toggle OS reduced-motion on. Reload. **Every number, every heading, every plate, every drawn rule, every crosshair, every status mark is visible and correct at first paint.**
2. Toggle it on *mid-session*, without reloading. `gsap.matchMedia()` reverts the full branch and lands on the final state; nothing is left half-animated.
3. Disable JavaScript entirely. Every number is correct, the mobile bar is visible, `tel:` and `wa.me` work, the form submits, every FAQ answer is present.
4. `document.querySelectorAll('[style*="opacity: 0"]').length === 0` after settle, in every mode.

---

*End of `05-motion-blueprint.md`. Responsive rules, conversion architecture, accessibility, performance budgets, SEO and developer handoff are in `06-strategy.md`. Tokens, components and the contrast table are in `04-design-system.md`.*
