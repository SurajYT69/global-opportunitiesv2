"use client";

import { useMemo, useState } from "react";
import { INDIA_OUTLINE_PATH } from "@/app/(home)/_components/branch-atlas/india-outline";
import { BranchDrawer } from "@/app/(home)/_components/branch-atlas/branch-drawer";
import type { Station } from "@/app/(home)/_components/branch-atlas/branches";
import { cn } from "@/lib/cn";
import {
  CLUSTERS,
  COASTLINE_FIXUPS,
  GUTTER,
  PLACED,
  VIEWBOX,
  labelSide,
  type Cluster,
} from "./geo";

/* ===========================================================================
   BRANCH LOCATOR — /homev2 only
   ---------------------------------------------------------------------------
   Replaces <AtlasClient/> on this route. That component is a single copy `/`
   also imports, and CLAUDE.md allows a second LAYOUT its own directory while
   forbidding a variant flag inside a shared component — so `/` keeps its
   crosshair plate untouched and this is a sibling. The DATA is not duplicated:
   the outline, the station register and the drawer are all imported.

   WHAT CHANGED FROM THE CROSSHAIR PLATE, and why:

   · Markers are projected from real latitude and longitude (see geo.ts), not
     from the register's hand-nudged x/y. Nothing is moved to make the map look
     balanced. Overlap is solved by clustering instead.
   · The 22u crosshair with its ticks to +/-11 is gone. It was the actual cause
     of "markers outside the outline": any city within 11u of the coast had
     ticks in the sea even when the centre was on land. A dot has no ticks.
   · The floating numeral beside each dot is gone with it. It sat at a hand-set
     +/-10u offset, which put Chennai's "15" in the Bay of Bengal. Names now
     ride a leader line out to a gutter.
   · Only the active marker is named. Sixteen permanent labels is an
     infographic; one is a locator.

   THE HQ IS THE ONE PERMANENT EXCEPTION. Delhi South carries its label, its
   leader and its red at rest, because a head office that looks like every
   other dot until you touch it is not a head office.

   GO RED ON A MARKER IS A DELIBERATE OVERRIDE of the palette rule that red is
   the primary button fill and nothing else. Instructed 2026-08-21: the HQ and
   the active selection both use it. Nothing else on this plate may.

   Motion: colour and opacity only, on CSS transitions. No library, no
   ScrollTrigger, nothing added to the 14-instance budget.
   ======================================================================== */

/** Rendered ~0.67px per unit at this viewBox, so sizes are scaled to suit. */
const DOT = { normal: 6, hq: 9 } as const;
const STUB = 13;
const FONT = { key: 15, city: 15, badge: 11, count: 12 } as const;

export function Locator() {
  /* Coastline corrections, keyed by cluster id. BAKED, not measured: sampling
     the outline at runtime cost 3.7s of blocked main thread and broke the hero
     intro. See COASTLINE_FIXUPS in geo.ts before changing any of the geometry
     it was derived from. */
  const fixups = COASTLINE_FIXUPS;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [drawerStation, setDrawerStation] = useState<Station | null>(null);

  /** Which station the map and the list are both pointing at right now. */
  const focusId = hoverId ?? activeId;

  const clusterOf = useMemo(() => {
    const map = new Map<string, Cluster>();
    for (const c of CLUSTERS) for (const m of c.members) map.set(m.id, c);
    return map;
  }, []);

  const focusCluster = focusId ? clusterOf.get(focusId) : undefined;


  // 2.2fr, not 1.5fr (2026-08-22). Centring the plate widened its viewBox by
  // ~15%, and at a fixed column width that is a 15% smaller drawing. The row
  // gives the map the space back; the index rows are short and still fit.
  // Change these two together or the plate shrinks again.
  return (
    <div className="grid gap-8 lg:grid-cols-[2.2fr_1fr] lg:gap-10">
      {/* --- the plate --------------------------------------------------- */}
      <div className="min-w-0">
        <svg
          viewBox={VIEWBOX}
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Map of Global Opportunities offices across India"
        >
          <path
            d={INDIA_OUTLINE_PATH}
            fill="none"
            stroke="var(--ink-faint)"
            strokeWidth="2"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {CLUSTERS.map((raw) => {
            /* The corrected position, if the coastline needed one. */
            const fix = fixups[raw.id];
            const cluster = fix ? { ...raw, x: fix.x, y: fix.y } : raw;
            const isFocus = focusCluster?.id === cluster.id;
            /* The HQ is labelled at rest. Everything else earns its label. */
            const labelled = cluster.hq || isFocus;
            const red = cluster.hq || isFocus;
            const side = labelSide(cluster.x);
            const dir = side === "left" ? -1 : 1;
            const gutterX = side === "left" ? GUTTER.left : GUTTER.right;
            const r = cluster.hq ? DOT.hq : DOT.normal;

            return (
              <g
                key={cluster.id}
                className={cn(
                  "cursor-pointer transition-colors duration-300",
                  red ? "text-sienna-press" : "text-marine",
                )}
                onMouseEnter={() => setHoverId(cluster.lead.id)}
                onMouseLeave={() => setHoverId(null)}
                onClick={() => {
                  setActiveId(cluster.lead.id);
                  setDrawerStation(cluster.lead);
                }}
              >
                {/* Generous invisible hit target, mouse and touch only. */}
                <circle cx={cluster.x} cy={cluster.y} r={18} fill="transparent" />

                {/* The short stub every marker keeps, and the full leader the
                    labelled one extends into. Two lines rather than one so the
                    stub never animates its own length. */}
                <line
                  x1={cluster.x + dir * (r + 2)}
                  y1={cluster.y}
                  x2={cluster.x + dir * (r + 2 + STUB)}
                  y2={cluster.y}
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  className={cn(
                    "transition-opacity duration-300",
                    red ? "opacity-100" : "opacity-45",
                  )}
                />
                <line
                  x1={cluster.x + dir * (r + 2 + STUB)}
                  y1={cluster.y}
                  x2={gutterX}
                  y2={cluster.y}
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  className={cn(
                    "transition-opacity duration-300",
                    labelled ? "opacity-100" : "opacity-0",
                  )}
                />

                <circle
                  cx={cluster.x}
                  cy={cluster.y}
                  r={r}
                  fill="currentColor"
                  className={cn(
                    "transition-opacity duration-300",
                    red ? "opacity-100" : "opacity-70",
                  )}
                />
                {/* The HQ reads as a ring around a core, so it carries weight
                    without being a bigger blob. */}
                {cluster.hq && (
                  <circle
                    cx={cluster.x}
                    cy={cluster.y}
                    r={r + 6}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    className="opacity-40"
                  />
                )}

                <Label
                  cluster={cluster}
                  side={side}
                  gutterX={gutterX}
                  visible={labelled}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* --- the index ---------------------------------------------------- */}
      <div className="w-full">
        <p className="text-label uppercase text-ink-faint">
          The branch index · north to south
        </p>
        <ul className="mt-4 flex list-none flex-col p-0">
          {PLACED.map((station) => {
            const cluster = clusterOf.get(station.id);
            const isFocus = focusCluster?.id === cluster?.id;
            return (
              <li key={station.id}>
                <button
                  type="button"
                  onMouseEnter={() => setHoverId(station.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onFocus={() => setHoverId(station.id)}
                  onBlur={() => setHoverId(null)}
                  onClick={() => {
                    setActiveId(station.id);
                    setDrawerStation(station);
                  }}
                  className={cn(
                    "flex w-full items-baseline gap-4 border-b border-rule py-3 text-left transition-colors duration-200",
                    isFocus ? "bg-secondary" : "bg-transparent",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-caption tabular-figures transition-colors duration-200",
                      station.hq
                        ? "text-sienna-press"
                        : isFocus
                          ? "text-ink"
                          : "text-ink-faint",
                    )}
                  >
                    {station.key}
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-heading transition-colors duration-200",
                      isFocus ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {station.city}
                    {station.hq && (
                      <span className="ml-2 align-middle text-label uppercase text-sienna-press">
                        HQ
                      </span>
                    )}
                    {station.branchCount > 1 && (
                      <span className="ml-2 align-middle font-mono text-caption text-ink-faint tabular-figures">
                        {`${station.branchCount} branches`}
                      </span>
                    )}
                  </span>
                  <span className="text-small text-muted-foreground">
                    {station.state}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {drawerStation && (
        <BranchDrawer
          station={drawerStation}
          onClose={() => setDrawerStation(null)}
        />
      )}
    </div>
  );
}

/**
 * The label at the end of a leader.
 *
 * Drawn as SVG text rather than an HTML overlay so it shares the plate's
 * coordinate space and cannot drift out of register when the container
 * resizes. The paper-coloured stroke under each run is a halo: it lets a label
 * cross the coastline hairline without the line reading through the letters.
 */
function Label({
  cluster,
  side,
  gutterX,
  visible,
}: {
  cluster: Cluster;
  side: "left" | "right";
  gutterX: number;
  visible: boolean;
}) {
  const anchor = side === "left" ? "end" : "start";
  const pad = side === "left" ? -10 : 10;
  const x = gutterX + pad;
  const extra =
    cluster.branchCount > cluster.lead.branchCount
      ? `+${cluster.branchCount - cluster.lead.branchCount} nearby`
      : cluster.branchCount > 1
        ? `${cluster.branchCount} branches`
        : null;

  return (
    /* `hidden lg:block` is a horizontal-overflow guard, not a style choice.
       The label is anchored at the gutter and runs OUTWARD, past the viewBox
       edge, which only paints because the <svg> is overflow-visible. At one
       column that overhang leaves the viewport and the whole document scrolls
       sideways, which is the exact failure CLAUDE.md logs against the old
       atlas. Below lg the plate is dots only and the index carries the names. */
    <g
      className={cn(
        "pointer-events-none hidden transition-opacity duration-300 lg:block",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <text
        x={x}
        y={cluster.y - (extra ? 7 : 0)}
        textAnchor={anchor}
        dominantBaseline="middle"
        stroke="var(--paper-still)"
        strokeWidth="5"
        paintOrder="stroke"
        className="fill-current font-mono"
        style={{ fontSize: FONT.key, letterSpacing: "0.06em" }}
      >
        {`${cluster.lead.key} ${cluster.lead.city}`}
        {cluster.hq && (
          <tspan
            dx={8}
            style={{ fontSize: FONT.badge, letterSpacing: "0.14em" }}
          >
            HQ
          </tspan>
        )}
      </text>
      {extra && (
        <text
          x={x}
          y={cluster.y + 11}
          textAnchor={anchor}
          dominantBaseline="middle"
          stroke="var(--paper-still)"
          strokeWidth="4"
          paintOrder="stroke"
          className="fill-ink-faint font-mono"
          style={{ fontSize: FONT.count, letterSpacing: "0.06em" }}
        >
          {extra}
        </text>
      )}
    </g>
  );
}
