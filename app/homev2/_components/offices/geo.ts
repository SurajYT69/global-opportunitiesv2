import { STATIONS, type Station } from "@/app/(home)/_components/branch-atlas/branches";

/* ===========================================================================
   LOCATOR GEOMETRY — real coordinates, projected once
   ---------------------------------------------------------------------------
   THE STORED x/y IN branches.ts ARE NOT USED HERE, DELIBERATELY.

   Those were hand-placed and then, in the register's own words, "displaced a
   few units so that neighbouring crosshairs stay legible". That hand-tuning is
   what put markers off the coast: measured against the outline, Amritsar sat
   1.4u outside the landmass and Mumbai 3.5u outside, and Chennai's numeral
   landed 3.5u into the Bay of Bengal. Nudging pins to make a map look balanced
   is exactly what this component is not allowed to do.

   So every marker is projected from a real latitude and longitude through the
   plate's own projection, and overlap is solved by CLUSTERING instead of by
   moving anything. `Station.x`, `Station.y`, `dx`, `dy` and `anchor` are left
   untouched on the shared type because `/` still renders from them.

   THE PROJECTION IS THE PLATE'S, NOT A TRUE ONE. The two scales are not in
   ratio (0.82 against ~0.93 correct at this latitude), so the plate reads
   about 12% narrower than the ground. That is the existing proportion of
   india-outline.ts, which was fitted to it. Changing one without the other
   slides every office off its coast, so both stay as they are.
   ======================================================================== */

/** lon 67E..98E -> 0..600 */
const LON_ORIGIN = 67;
const LON_SCALE = 19.354;
/** lat 37.5N..7N -> 0..720 */
const LAT_ORIGIN = 37.5;
const LAT_SCALE = 23.607;

export function project(lat: number, lon: number): { x: number; y: number } {
  return {
    x: (lon - LON_ORIGIN) * LON_SCALE,
    y: (LAT_ORIGIN - lat) * LAT_SCALE,
  };
}

/**
 * City coordinates, decimal degrees. Delhi West and Delhi South are the two
 * localities GO names, not the city centroid twice — they are ~3.6 plate units
 * apart, which is why they cluster.
 */
const COORDS: Record<string, [lat: number, lon: number]> = {
  amritsar: [31.634, 74.873],
  jalandhar: [31.326, 75.576],
  ludhiana: [30.901, 75.857],
  chandigarh: [30.733, 76.779],
  mohali: [30.704, 76.717],
  bathinda: [30.211, 74.945],
  patiala: [30.34, 76.386],
  "delhi-west": [28.652, 77.121],
  "delhi-south": [28.548, 77.251],
  ahmedabad: [23.023, 72.571],
  thane: [19.218, 72.978],
  mumbai: [19.076, 72.877],
  pune: [18.52, 73.857],
  hyderabad: [17.385, 78.487],
  chennai: [13.083, 80.27],
  bangalore: [12.972, 77.594],
};

export interface PlacedStation extends Station {
  /** Projected from COORDS. Overrides the register's hand-placed x/y. */
  px: number;
  py: number;
  branchCount: number;
}

export const PLACED: PlacedStation[] = STATIONS.map((s) => {
  const ll = COORDS[s.id];
  if (!ll) throw new Error(`offices/geo: no coordinates for station "${s.id}"`);
  const { x, y } = project(ll[0], ll[1]);
  return { ...s, px: x, py: y, branchCount: s.branches.length };
});

export interface Cluster {
  id: string;
  /** Where the marker is drawn. A single station sits on its own coordinate. */
  x: number;
  y: number;
  members: PlacedStation[];
  /** Branches, not stations. Mumbai + Thane is 4 doors across 2 cities. */
  branchCount: number;
  /** Delhi South. Never absorbed silently — see below. */
  hq: boolean;
  /** The station a cluster is named and anchored by. */
  lead: PlacedStation;
}

/**
 * Single-link agglomerative clustering at 9 plate units.
 *
 * CLUSTER ONLY WHAT ACTUALLY COLLIDES. An earlier 22u threshold chained all
 * six Punjab cities into a single marker, which is not overlap resolution —
 * it is hiding five offices because they are in the same state. A marker is
 * merged only when its dot would physically sit on top of another.
 *
 * At 9u exactly three pairs qualify, and they are the three that are genuinely
 * co-located rather than merely regional:
 *
 *   Chandigarh + Mohali      1.4u apart — adjacent cities, one urban area
 *   Delhi West + Delhi South 3.6u apart — two localities of one city
 *   Mumbai + Thane           3.8u apart — Thane is Mumbai metropolitan
 *
 * Sixteen offices therefore draw as THIRTEEN markers. The next-closest pair,
 * Mohali and Patiala at 10.8u, stays as two dots: at r=6 they touch without
 * occluding, which reads as two neighbours rather than a collision.
 *
 * A CLUSTER CONTAINING THE HQ IS ANCHORED ON THE HQ, not on the centroid.
 * Delhi West and Delhi South are 3.6u apart, closer than one dot diameter, so
 * they must group or they collide. Drawing that group at the centroid would
 * put the head office 1.8u off its real position for the sake of tidiness,
 * which is the thing this file exists to avoid. Anchoring on the HQ keeps the
 * red marker exactly on Delhi South and lets the count carry Delhi West.
 */
const THRESHOLD = 9;

function distance(a: PlacedStation, b: PlacedStation) {
  return Math.hypot(a.px - b.px, a.py - b.py);
}

export function clusterStations(stations: PlacedStation[]): Cluster[] {
  const groups: PlacedStation[][] = stations.map((s) => [s]);

  // Single-link: merge the closest pair of groups until nothing is within
  // THRESHOLD. Sixteen stations, so the O(n^3) shape is irrelevant.
  for (;;) {
    let best = THRESHOLD;
    let pair: [number, number] | null = null;
    for (let i = 0; i < groups.length; i++) {
      for (let j = i + 1; j < groups.length; j++) {
        for (const a of groups[i]) {
          for (const b of groups[j]) {
            const d = distance(a, b);
            if (d < best) {
              best = d;
              pair = [i, j];
            }
          }
        }
      }
    }
    if (!pair) break;
    const [i, j] = pair;
    groups[i] = groups[i].concat(groups[j]);
    groups.splice(j, 1);
  }

  return groups.map((members) => {
    const hqMember = members.find((m) => m.hq);
    // Largest branch count wins the name, ties broken by register order so the
    // result is stable rather than dependent on clustering order.
    const lead =
      hqMember ??
      members.reduce((a, b) => (b.branchCount > a.branchCount ? b : a), members[0]);
    const anchor = hqMember ?? null;
    const x = anchor
      ? anchor.px
      : members.reduce((t, m) => t + m.px, 0) / members.length;
    const y = anchor
      ? anchor.py
      : members.reduce((t, m) => t + m.py, 0) / members.length;
    return {
      id: lead.id,
      x,
      y,
      members,
      branchCount: members.reduce((t, m) => t + m.branchCount, 0),
      hq: Boolean(hqMember),
      lead,
    };
  });
}

export const CLUSTERS = clusterStations(PLACED);

/* --- the label gutter -------------------------------------------------------
   Leader lines run out of the landmass to a fixed column on whichever side is
   nearer, so labels stack in two clean rails rather than tracking the coast.
   The viewBox is widened to make room; the outline itself does not move. */
export const PLATE = { w: 600, h: 720 };
export const GUTTER = { left: -110, right: 636 };

/**
 * SYMMETRIC MARGINS (2026-08-22, client instruction: "the India map should be
 * centred"). The left gutter carries every leader label — all sixteen offices
 * project to x < 260, so nothing labels right — and the viewBox used to stop
 * 12 units past the plate on the right. That is correct use of space and it
 * reads as a map shoved to the right of its column, which is what the client
 * saw. Matching the right margin to the left one costs ~13% of drawn size and
 * puts the landmass on the column's centre line.
 *
 * `labelSide` still returns "right" past x = 300 and GUTTER.right now sits
 * well inside the viewBox, so an eastern office would label legibly rather
 * than clipping.
 */
const MARGIN = 10 - GUTTER.left;
export const VIEWBOX = `${-MARGIN} -12 ${PLATE.w + 2 * MARGIN} ${PLATE.h + 24}`;

/** Left rail for the western half, right rail for the eastern half. */
export function labelSide(x: number): "left" | "right" {
  return x < 300 ? "left" : "right";
}

/* --- coastline correction ---------------------------------------------------
   THIS IS NOT PIN-NUDGING, AND THE DISTINCTION IS THE WHOLE POINT.

   Measured against the rendered outline, two markers land wrong: the
   Mumbai+Thane centroid sits 5.2u OUTSIDE the landmass, and Chennai is only
   3.7u inside, so half a 6u dot hangs in the Bay of Bengal. Neither is a
   coordinate error. Both cities are projected from their real latitude and
   longitude; it is india-outline.ts that is simplified, and its west coast at
   Mumbai and east coast at Chennai are drawn inboard of the true shoreline.

   So the correction is applied to the PLATE'S error, by a rule, identically to
   every marker: if a point is outside the mainland or closer to the coast than
   `inset`, it moves along the inward normal to exactly `inset` from the edge.
   Nothing is moved for balance, nothing is hand-placed, and a marker already
   clear of the coast is returned untouched. If the outline is ever redrawn
   accurately, every correction silently becomes a no-op.

   The polygon has to be sampled from the rendered <path>, which needs the DOM,
   so the caller does the measuring and passes the points in. These helpers are
   pure so they stay unit-testable and run identically on both sides.
   ------------------------------------------------------------------------ */

export type Point = [x: number, y: number];

export function isInside(poly: Point[], x: number, y: number): boolean {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      hit = !hit;
    }
  }
  return hit;
}

/** Closest point on the polygon's perimeter, and how far away it is. */
export function nearestEdge(poly: Point[], x: number, y: number) {
  let bx = poly[0][0];
  let by = poly[0][1];
  let best = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [x1, y1] = poly[j];
    const [x2, y2] = poly[i];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len2 = dx * dx + dy * dy || 1e-9;
    const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / len2));
    const px = x1 + t * dx;
    const py = y1 + t * dy;
    const d = Math.hypot(x - px, y - py);
    if (d < best) {
      best = d;
      bx = px;
      by = py;
    }
  }
  return { x: bx, y: by, distance: best };
}

/**
 * Pull a point onto land if the plate's coastline has left it in water.
 * Returns the original point when it is already `inset` clear of the coast.
 */
export function snapInside(
  poly: Point[],
  x: number,
  y: number,
  inset: number,
): { x: number; y: number; corrected: number } {
  const inside = isInside(poly, x, y);
  const edge = nearestEdge(poly, x, y);
  if (inside && edge.distance >= inset) return { x, y, corrected: 0 };

  let nx = x - edge.x;
  let ny = y - edge.y;
  const len = Math.hypot(nx, ny);
  if (len < 1e-6) {
    // Sitting exactly on the edge: no direction to read, so step along the
    // segment normal and let the inside test below pick the correct sign.
    nx = 0;
    ny = -1;
  } else {
    nx /= len;
    ny /= len;
  }
  // Outside, the vector from the edge points away from land, so flip it.
  if (!inside) {
    nx = -nx;
    ny = -ny;
  }
  const cx = edge.x + nx * inset;
  const cy = edge.y + ny * inset;
  return { x: cx, y: cy, corrected: Math.hypot(cx - x, cy - y) };
}

/* --- baked coastline corrections -------------------------------------------
   THIS USED TO BE COMPUTED IN THE BROWSER ON EVERY LOAD, AND IT COST 3.7
   SECONDS OF BLOCKED MAIN THREAD (measured 2026-08-22, production build).

   The locator sampled the mainland subpath with 1200 `getPointAtLength` calls
   to find any marker the simplified coastline had left in the sea. Chrome
   walks the path from the start on every one of those calls, and this outline
   is ~9.6KB of `d` — 3.1ms per call, 3.7s in one task. It landed inside the
   hero's 3s intro, so GSAP's tween time-jumped straight to the end and the
   globe reveal never rendered: the hero looked broken on /homev2 and was fine
   on `/`, which does not mount this component.

   Nothing about the correction is runtime data. The outline, the projection
   and the register are all constants, so the answer is the same on every load
   and it is baked here instead.

   REGENERATE if INDIA_OUTLINE_PATH, the projection in this file, or a
   station's coordinates change: temporarily restore the sampling effect (git
   history has it, in locator.tsx), log `next` before setFixups, and paste the
   result here. Only clusters that actually move need an entry.
   ------------------------------------------------------------------------ */
export const COASTLINE_FIXUPS: Record<string, { x: number; y: number }> = {
  amritsar: { x: 162.37, y: 140.36 },
  mumbai: { x: 128.84, y: 431.4 },
  chennai: { x: 251.56, y: 575.66 },
};
