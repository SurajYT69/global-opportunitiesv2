/**
 * Geometry for the scroll-driven plane. Kept free of React and anime.js so the
 * path maths is testable on its own (see flightPath.test.ts).
 */

/** One switchback per this many px of page height. */
export const PX_PER_TURN = 1500;
export const MIN_TURNS = 4;
/** Fraction of the width left clear at each edge. */
export const EDGE_INSET = 0.09;
/** Reversal radius, px. Larger = lazier turn. */
export const CORNER = 200;

/**
 * Top-down airliner silhouette, nose at +X — createMotionPath aligns +X with
 * the path tangent, so the plane banks into every turn for free.
 * Spans x -23..22, y -15..15, centred on the origin; size is --plane-scale.
 */
export const PLANE_GLYPH = [
  "M 22 0",
  "C 19 0.9 16.5 1.8 14.5 2.2", // nose taper
  "L 7 2.6 -8 15 -13 15 -6 3", // right wing: leading edge, tip chord, trailing edge
  "L -15 3 -20 7.5 -22.5 7.5 -19.5 2.6", // right tailplane
  "L -23 1.8 -23 -1.8", // tail cone
  "L -19.5 -2.6 -22.5 -7.5 -20 -7.5 -15 -3", // left tailplane
  "L -6 -3 -13 -15 -8 -15 7 -2.6", // left wing
  "L 14.5 -2.2",
  "C 16.5 -1.8 19 -0.9 22 0",
  "Z",
].join(" ");

/**
 * Pencil, drawn nose-first like the plane so createMotionPath banks it into the
 * turns the same way — but with the graphite tip *on the origin* rather than
 * the glyph centred there. The origin is the point the mask has revealed up to,
 * so putting the tip on it is what makes the pencil look like it is drawing the
 * trail rather than dragging it.
 *
 * One flat fill, so the only cues that read as "pencil" are silhouette: a sharp
 * point, a long parallel barrel, a step out to a wider ferrule, and a squared
 * eraser. Spans x -46..0, y -6..6 — about the plane's footprint, so the two
 * swap without retuning --plane-scale.
 */
export const PENCIL_GLYPH = [
  "M 0 0", // graphite tip, riding the path
  "L -15 -3.4", // long sharpened point — short tapers read as a blunt cylinder
  "L -36 -3.4", // barrel
  "L -36 -2.6 -41 -2.6", // pinched waist at the ferrule
  "L -41 -4.2 -46 -4.2", // eraser, flared back out
  "L -46 4.2 -41 4.2", // and around
  "L -41 2.6 -36 2.6",
  "L -36 3.4", // back out to the barrel
  "L -15 3.4",
  "Z",
].join(" ");

/**
 * Which glyph rides the trail. Swap to PENCIL_GLYPH for the pencil — nothing
 * else changes, both are centred for the same --plane-scale.
 */
export const TRAIL_GLYPH = PLANE_GLYPH;

export type Pt = { x: number; y: number };

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Point `dist` along from -> to, never past the midpoint. */
export function towards(from: Pt, to: Pt, dist: number): Pt {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const t = Math.min(dist, len / 2) / len;
  return { x: from.x + dx * t, y: from.y + dy * t };
}

/** Straight runs joined by quadratic-rounded corners. */
export function roundedPolyline(pts: Pt[], radius: number): string {
  let d = `M${r1(pts[0].x)} ${r1(pts[0].y)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const a = towards(p, pts[i - 1], radius);
    const b = towards(p, pts[i + 1], radius);
    d += `L${r1(a.x)} ${r1(a.y)}Q${r1(p.x)} ${r1(p.y)} ${r1(b.x)} ${r1(b.y)}`;
  }
  const last = pts[pts.length - 1];
  return `${d}L${r1(last.x)} ${r1(last.y)}`;
}

export function turnCount(h: number): number {
  return Math.max(MIN_TURNS, Math.round(h / PX_PER_TURN));
}

/** The zig-zag vertices: edge to edge, descending one step per traverse. */
export function zigzagPoints(w: number, h: number): Pt[] {
  const turns = turnCount(h);
  const left = w * EDGE_INSET;
  const right = w * (1 - EDGE_INSET);
  const step = h / turns;

  const pts: Pt[] = [{ x: left, y: 0 }];
  for (let i = 1; i <= turns; i++) {
    pts.push({ x: i % 2 === 1 ? right : left, y: i * step });
  }
  // The last traverse lands mid-column rather than at an edge: the trail ends
  // over the centre of the closing CTA plate, which is where the flight is
  // meant to arrive, instead of running off the side of the page.
  pts[pts.length - 1] = { x: w / 2, y: h };
  return pts;
}

/**
 * Straight diagonal traverses with a rounded reversal at each edge.
 *
 * The runs being *straight* is load-bearing: arc length is then very nearly
 * proportional to y, so mapping scroll progress straight onto path length keeps
 * the plane drifting through the viewport. Swap these for plain S-curves and the
 * plane races ahead of the scroll near the turns and lags in the middle.
 */
export function zigzag(w: number, h: number): string {
  return roundedPolyline(zigzagPoints(w, h), CORNER);
}
