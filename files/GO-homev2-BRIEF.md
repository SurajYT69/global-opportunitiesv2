# Global Opportunities — `/homev2` hero brief

Everything needed to build this is in this file. The earlier scroll-driven version
(`GO-globe-reveal-BRIEF.md`) is **superseded — ignore it.**

---

## Build it at a new route

Create `app/homev2/page.tsx`. Reachable at `localhost:3000/homev2`.

**Do not modify the existing home page or any component it imports.** This is a
parallel version for comparison. If you need something from the current home page
(masthead, footer, sections below the fold), import it — don't edit it. If a shared
component needs a change to work here, copy it rather than modifying it in place.

---

## What this is

A study-abroad consultancy. The site runs paid traffic at roughly ₹9L/month, so the
hero has to convert: headline, proposition and CTA visible without scrolling.

The hero opens with a short branded animation. The GO logo holds for a beat, then
the globe — the "o" in *Global* — opens into the hero film, and the headline and
CTAs arrive. **1.5 seconds, on page load. Not scroll-driven.**

An earlier attempt tied this to scroll and it failed: it turned the first viewport
into a splash screen with no headline and no CTA, and put a 360vh empty track above
the real content. Don't reintroduce that. The hero is a normal `h-svh` section and
scrolling goes straight to the next section.

---

## Files

| File | What it is |
|---|---|
| `GlobeReveal.tsx` | The hero component, complete and ready to drop in |
| `GO-logo-brand-palette.svg` | Full lockup, if you need the logo elsewhere on the page |
| `GO-globe-mark.svg` | Globe alone — favicon, loading states |

`GlobeReveal.tsx` already contains the traced logo paths inline. **Do not edit the
path data or the `transform="translate(0,1024) scale(0.1,-0.1)"` on those groups.**
The coordinates are at 10× and y-flipped (potrace output); normalising them will
silently break the shapes.

---

## Page structure

```tsx
// app/homev2/page.tsx
import GlobeReveal from "@/components/GlobeReveal";

export default function HomeV2() {
  return (
    <>
      <GlobeReveal
        src="/video/hero-placeholder.mp4"
        poster="/img/hero-placeholder.jpg"
      />
      {/* everything below the fold — reuse the existing home sections */}
    </>
  );
}
```

The masthead is fixed/overlaid on the current site; keep that behaviour. The hero
is navy under the film, so the masthead reads fine over it.

---

## How the animation works

One progress value `p` runs 0→1 over 1.5s with `power3.inOut`. Every beat is a
window on `p`, all inside a single `render(p)` function:

| p | Beat |
|---|---|
| 0.00 – 0.22 | Wordmark holds. Reads as the GO logo — cream letters, white globe, navy windows. No film visible. |
| 0.22 – 0.38 | Navy windows fade → film appears **through the window shapes** |
| 0.22 – 0.70 | Globe grows and travels to viewport centre; film ellipse grows with it |
| 0.28 – 0.45 | White globe body + letters fade → clean ellipse of film |
| 0.70 – 1.00 | Eyebrow, headline, subhead and CTAs fade up |

The film appearing through the windows before the grid goes is the moment that
sells it. Don't collapse those two fades into one.

The grid must be gone by `p ≈ 0.45`, before the mark gets large. Past about 3× it
stops reading as a globe and becomes a lattice of rectangles.

**Mechanism:** the film is a single full-bleed `<video>` with an animated
`clip-path: ellipse(...)`. The globe mark is an SVG overlay transformed in lockstep.
Nothing is counter-scaled, and there's only ever one video element.

---

## Hero film

The real GO film doesn't exist yet. Placeholder:

- **Source:** Pexels 7969488, "Students climb campus stairs", George Pak — free licence, no attribution required
- **MP4 (1080p, 7.4 MB):** `https://videos.pexels.com/video-files/7969488/7969488-hd_1920_1080_30fps.mp4`
- **Poster:** `https://images.pexels.com/videos/7969488/pexels-photo-7969488.jpeg?auto=compress&w=1600`

**Download both into the repo** — `/public/video/hero-placeholder.mp4` and
`/public/img/hero-placeholder.jpg`. Do not hotlink the Pexels CDN: the file will
rotate eventually and it's slow from India.

`muted` + `playsInline` together are what allow autoplay on iOS. Missing either
gives a frozen poster on every iPhone. Both are already in the component — keep them.

---

## Non-negotiables

1. **Once per session.** `sessionStorage` key `go-hero-intro-seen`. Already
   implemented. A 1.5s gate on every pageview would be costly on paid traffic.
2. **`prefers-reduced-motion` skips the animation** and renders the final state.
3. **The `h1`, subhead and CTAs are in the DOM from first paint**, hidden with
   opacity only — never conditionally mounted. Mounting them after the animation
   hurts LCP and serves crawlers a blank hero.
4. **No `ScrollTrigger` in this component.** No scroll track, no pinning.
5. `sessionStorage` is read inside the GSAP effect, not at module or render level —
   it will throw during SSR otherwise.
6. GSAP owns the centring transform on the two SVGs (`xPercent: -50, yPercent: -50`).
   Do not add Tailwind `-translate-x-1/2` classes back onto them — `gsap.set` writes
   the whole `transform` property and would wipe them.

---

## Copy

Defaults are in the component as props. Current values:

- Eyebrow: `September 2027 intake · Admissions open`
- H1: `Step out without doubt.`
- Sub: `Overseas education consultants since 2001. We've placed students in 700+ partner universities across 15 countries — admissions, education loans, GIC and forex handled in-house.`
- CTAs: `Book a free guidance session` (red, primary) / `Explore 15 destinations`
- Reassurance: `No cost, no obligation · 30–45 minutes with an admissions counsellor`

Two things to check with the client rather than assume:

- Whether September 2027 is the intake to lead with
- The previous build had a stray superscript `3` after "700+". It's not in this
  component — don't reintroduce it from whatever source it came from.

---

## Palette and type

- Navy `#0E2A47` · Blue `#0B77B7` · Red `#B70000` · Yellow `#FFC800` · Cream `#F3EFE9`
- The wordmark in the intro is traced vector artwork, not live text, so it matches
  the masthead logo exactly regardless of what fonts load.
- Body/headline type follows whatever the site already uses. Don't introduce a new face.

---

## Acceptance

1. `/homev2` first load: logo reads clearly, opens into the film, copy lands, ~1.5s.
   Hero is immediately usable — headline and CTA visible without scrolling.
2. Reload in the same tab: no animation, hero complete on first paint.
3. Scroll goes straight to the next section. No empty space above the fold.
4. No layout shift — the `h1` sits in its final position from first paint.
5. Film fills the viewport at the end with no navy sliver at any edge. Test 21:9
   and a tall phone; a sliver means the coverage-scale maths is off.
6. Resize mid-animation and after it — geometry re-measures, nothing jumps.
7. The existing home page still renders identically.
