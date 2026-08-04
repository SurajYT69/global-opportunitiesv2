# Reference only — not built, not imported, not maintained

Client-supplied source, kept byte-identical to what was delivered, for
provenance against `GO-homev2-BRIEF.md` and the two SVGs in the parent folder.

**`GlobeReveal.as-supplied.tsx`** is the ORIGINAL of what now ships as
`components/GlobeReveal.tsx`. It is stale and has been since the day it landed.
It was renamed out of `files/GlobeReveal.tsx` on 2026-08-04 because a filename
search for "GlobeReveal" returned it first, and a fix nearly went into it.

Known divergences from the live file, so nobody mistakes this for a variant
worth merging:

- refs are typed `SVGSVGElement` and GSAP transforms the `<svg>` elements
  directly — that never landed the percentage offsets, so both plates hung
  down-and-right of the section centre. The live file wraps each SVG in a div.
- `measure()` reads `getBoundingClientRect()` on the lockup, which render()
  has already written a transform onto; the live file uses `offsetWidth`.
- no dev-only reset of the `go-hero-intro-seen` session key.
- no globe offset in the SSR markup — the bug fixed on 2026-08-04.

If the artwork is ever re-exported, the numbers to change are in
`components/globe-reveal-geometry.ts`, not here.
