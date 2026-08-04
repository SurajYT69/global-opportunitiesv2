# Global Opportunities — Landing Page Blueprint

**Concept: THE DEPARTURE ATLAS** — the page as Volume XXV of a bound atlas of global education, published by Global Opportunities since 2001. Light-first warm paper, marine + sienna cartographic palette, Newsreader/Hanken Grotesk/IBM Plex Mono type system, and one governing ethic: *every number on the page is auditable.*

Story arc: **Dream → Explore → Trust → Choose → Apply → Success**, told across 16 canonical sections plus persistent mobile chrome.

## Documents

| Doc | Contents |
|---|---|
| [01-creative-vision-and-brand.md](01-creative-vision-and-brand.md) | Creative vision, cliché-subversion table, mood board (20 refs with URLs), brand direction, tone-of-voice do/don't, v1 Plate System, v2 photography brief, information architecture with pacing curve and lead-capture map |
| [02-sections-part1.md](02-sections-part1.md) | Page opening strategy + full specs: sticky-nav, hero, colophon-strip, gazetteer, register, what-we-do, still-page, branch-atlas |
| [03-sections-part2.md](03-sections-part2.md) | Full specs: contributors, for-parents, reckoning, eleven-months, endpaper, questions (10 FAQs with answers), enquiry (3-step form contract), colophon, mobile-bar |
| [04-design-system.md](04-design-system.md) | High-fidelity visual direction, complete token sheet (CSS vars + Tailwind v4 @theme), computed WCAG contrast tables, grid/rail system, 15 component specs with TS interfaces and ARIA patterns, dark-chapter remapping |
| [05-motion-blueprint.md](05-motion-blueprint.md) | Motion principles, per-section animation specs (all 17), GSAP timeline plan, Framer Motion plan, Anime.js v4 plan, 18-row scroll storyboard, depth system, motion governance + reduced-motion contract |
| [06-strategy.md](06-strategy.md) | Responsive strategy, conversion strategy (30-CTA table, form evidence), WCAG 2.2 AA accessibility strategy, performance + SEO (budgets, JSON-LD), developer handoff (milestones, gotchas, definition of done) |

## Provenance

Produced 2026-08-03 by a multi-agent pipeline: 5 research agents (brand audit, competitor teardown, 2026 design trends, motion stack verification, CRO/SEO evidence) → 3 competing creative concepts (Departure Atlas, Meridian, All Stations GO) → executive synthesis with cross-concept grafts (Departure Card hero, mono-for-facts law, dual clock, "Nothing here casts a shadow") → parallel authoring → implementation in this repository.

## Amendments

| Date | Change | Where |
|---|---|---|
| **2026-08-04** | **Client override — Lucide adopted site-wide.** The blueprint originally banned every icon library. The client decided otherwise, and the documents are restated to match. Icons ship through one primitive, `components/ui/icon.tsx`, at three sizes with pinned stroke weights, in `currentColor`, decorative unless an icon is a control's sole content. **Unchanged by the override:** the drafted-marks vocabulary, the banned-imagery list (flags, globes, aircraft, passports, suitcases, graduation caps, handshakes, dotted flight paths, isometric illustration, 3D clay), the WhatsApp-brand-green prohibition, the toll-free number as real text, text labels on every mobile-bar action, and mono superscripts as footnote markers. The superseded position is preserved verbatim in `01 §3.6` rather than deleted. | `01 §1.3` (cliché 3) · `01 §3.6` · `02 §1.3`, `§6.7`, `§6.10` · `03 §10.7`, `§15.1`, `§17.7`, `§17.8`, `§17.10` · `04 §4.1 ARIA`, `§5`, `§7` row 13 · `06 §2.2`, `§2.5`, `§4.1`, `§5.1`, `§5.3`, `§5.4` |

## Relationship to the code

The live implementation lives in this repo (`app/` — home sections in `app/(home)/_components/` — `components/ui/`, `components/providers/`, `lib/`). The canonical tokens are implemented in `app/globals.css`; section components map 1:1 to the canonical section ids. Where a document flags `[VERIFY]`, the figure needs client confirmation before production; a `[VERIFY]` figure may not ship set in the mono (proof) typeface.

## Key operational commitments the design creates

1. **Sources & Last-Verified registry** — every footnoted figure needs an owner and a review cadence; a stale date damages more than no date.
2. **v2 photography commission** — the Plate System is designed to receive the 12-shot documentary brief in 01; plates A/C are placeholders, plates B/D are permanent typographic treatments.
3. **Named counsellors** — requires an HR-agreed reassignment state for departures.
4. **DPDP/TCCCPR compliance** — consent language and logging per 03/06 before the form goes to production.
