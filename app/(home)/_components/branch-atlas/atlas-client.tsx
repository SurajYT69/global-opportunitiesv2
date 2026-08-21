"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { Scope } from "animejs/scope";
import { ChevronRight, MapPin } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { DUR_MS, MQ, STAGGER } from "@/lib/motion";
import { BranchDrawer } from "./branch-drawer";
import { STATIONS } from "./branches";
import {
  INDIA_OUTLINE_PATH,
  MAP_VIEWBOX,
  MAP_WIDTH,
  TROPIC_LABEL,
  TROPIC_Y,
} from "./india-outline";

/* Hoisted so React's style diff is a no-op on every re-render — Anime.js owns
   `opacity` and `transform` on these nodes and must never be clobbered. */
const MARK_STYLE: CSSProperties = {
  transformBox: "fill-box",
  transformOrigin: "center",
};
const HALO_STYLE: CSSProperties = { paintOrder: "stroke" };

/** useLayoutEffect on the client, useEffect on the server — no SSR warning. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia(MQ.reduce).matches
  );
}

export function AtlasClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<Scope | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeStation = useMemo(
    () => STATIONS.find((station) => station.id === activeId) ?? null,
    [activeId],
  );

  const closeDrawer = useCallback(() => setActiveId(null), []);

  /* ---------------------------------------------------------------------
     1. Arm the plate BEFORE paint, with plain DOM writes.

     The server renders the map fully inked, so JS-off and reduced-motion
     users get the finished state with no work at all. Under full motion we
     hide it synchronously in a layout effect, which means there is never a
     frame where the drawn map flashes before the draw begins.

     The dash state is written as ATTRIBUTES, not inline styles, because
     Anime.js's drawable proxy writes `stroke-dasharray` / `stroke-dashoffset`
     as attributes — an inline style here would silently outrank it and freeze
     the draw.

     `pathLength` is deliberately NOT set here. `createDrawable` initialises
     itself only when it finds `pathLength !== "1000"`, and that initialisation
     is what stamps the literal `draw` attribute onto the node — without which
     Anime.js never classifies `draw` as an attribute tween and the whole draw
     silently becomes a no-op. Leave `pathLength` to the proxy.

     A zero-length dash with a 100000 gap hides the outline in user units, which
     is exactly the state the proxy hands over to.
     ------------------------------------------------------------------ */
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const outline = root.querySelector<SVGPathElement>("[data-atlas-outline]");
    const marks = root.querySelectorAll<SVGGElement>("[data-atlas-mark]");
    const keys = root.querySelectorAll<SVGTextElement>("[data-atlas-key]");
    if (!outline) return;

    outline.setAttribute("stroke-dasharray", "0 100000");
    outline.setAttribute("stroke-dashoffset", "0");
    marks.forEach((mark) => {
      mark.style.opacity = "0";
    });
    keys.forEach((key) => {
      key.style.opacity = "0";
    });

    /** Restore the finished state if the animation never gets to run. */
    return () => {
      outline.removeAttribute("stroke-dasharray");
      outline.removeAttribute("stroke-dashoffset");
      marks.forEach((mark) => mark.style.removeProperty("opacity"));
      keys.forEach((key) => key.style.removeProperty("opacity"));
    };
  }, []);

  /* ---------------------------------------------------------------------
     2. Ink the map once, on scroll into view.

     CANON library assignment for this section: Anime.js owns the SVG stroke
     draw (`svg.createDrawable` + `stagger`). It is imported by subpath, at the
     section boundary, only once the section is actually approaching the
     viewport, inside `createScope({ root })`, and reverted on unmount.
     ------------------------------------------------------------------ */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    let cancelled = false;

    const reveal = () => {
      const outline = root.querySelector<SVGPathElement>(
        "[data-atlas-outline]",
      );
      outline?.removeAttribute("stroke-dasharray");
      outline?.removeAttribute("stroke-dashoffset");
      root
        .querySelectorAll<SVGElement>("[data-atlas-mark], [data-atlas-key]")
        .forEach((node) => node.style.removeProperty("opacity"));
    };

    const run = async () => {
      try {
        const [{ createScope }, { createDrawable }, { animate }, { stagger }, { cubicBezier }] =
          await Promise.all([
            import("animejs/scope"),
            import("animejs/svg"),
            import("animejs/animation"),
            import("animejs/utils"),
            import("animejs/easings/cubic-bezier"),
          ]);
        if (cancelled || !rootRef.current) return;

        /* Canon easing tokens, verbatim: --ease-inout for the map draw,
           --ease-quart for the crosshair stamp, --ease-quad for the keys. */
        const easeInOut = cubicBezier(0.65, 0, 0.35, 1);
        const easeQuart = cubicBezier(0.165, 0.84, 0.44, 1);
        const easeQuad = cubicBezier(0.25, 0.46, 0.45, 0.94);

        const stampStart = Math.round(DUR_MS.hero * 0.55);
        const step = STAGGER.tight * 1000;

        scopeRef.current = createScope({ root: rootRef }).add(() => {
          animate(createDrawable("[data-atlas-outline]"), {
            draw: ["0 0", "0 1"],
            duration: DUR_MS.hero,
            ease: easeInOut,
          });

          animate("[data-atlas-mark]", {
            opacity: [0, 1],
            scale: [1.5, 1],
            duration: DUR_MS.d3,
            delay: stagger(step, { start: stampStart }),
            ease: easeQuart,
          });

          animate("[data-atlas-key]", {
            opacity: [0, 1],
            duration: DUR_MS.d2,
            delay: stagger(step, { start: stampStart + DUR_MS.d1 }),
            ease: easeQuad,
          });
        });
      } catch {
        /* Never leave the plate blank because a chunk failed to load. */
        if (!cancelled) reveal();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        /* An in-page anchor jump can skip the whole plate in one frame, so it
           is never once reported as intersecting. Treat "already scrolled past"
           as a trigger too — otherwise the map would stay armed and blank for
           anyone who arrives via the nav's Offices link and then scrolls back. */
        const scrolledPast = entry.boundingClientRect.bottom < 0;
        if (!entry.isIntersecting && !scrolledPast) return;
        observer.disconnect();
        void run();
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(root);

    return () => {
      cancelled = true;
      observer.disconnect();
      scopeRef.current?.revert();
      scopeRef.current = null;
    };
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-10 md:gap-grid-gap">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:items-start md:gap-grid-gap">
        {/* ---------------------------------------------------------------
            THE PLATE — decorative. aria-hidden, not focusable, never the
            only route to a branch. Everything it shows is also in the index
            below/beside it.
            ------------------------------------------------------------ */}
        <div className="mx-auto w-full max-w-[26rem] md:mx-0 md:max-w-none">
          <svg
            viewBox={MAP_VIEWBOX}
            aria-hidden="true"
            focusable="false"
            role="presentation"
            className="block h-auto w-full overflow-visible"
          >
            {/* Furniture: one latitude line that is also a fact. */}
            <line
              x1="8"
              y1={TROPIC_Y}
              x2={MAP_WIDTH - 8}
              y2={TROPIC_Y}
              stroke="var(--rule)"
              strokeWidth="1"
              strokeDasharray="4 7"
              vectorEffect="non-scaling-stroke"
            />
            <text
              x="8"
              y={TROPIC_Y - 8}
              className="fill-ink-muted font-mono"
              style={{ fontSize: 11, letterSpacing: "0.1em" }}
            >
              {TROPIC_LABEL}
            </text>

            {/* Bearing mark. */}
            <g stroke="var(--rule-strong)" vectorEffect="non-scaling-stroke">
              <line x1="572" y1="46" x2="572" y2="74" strokeWidth="1" />
              <line x1="565" y1="53" x2="572" y2="42" strokeWidth="1" />
              <line x1="579" y1="53" x2="572" y2="42" strokeWidth="1" />
            </g>
            <text
              x="572"
              y="90"
              textAnchor="middle"
              className="fill-ink-muted font-mono"
              style={{ fontSize: 11, letterSpacing: "0.1em" }}
            >
              N
            </text>

            {/* The outline. One stroke, drawn once. */}
            {/* `butt` caps: a zero-length dash must render nothing at all
                while the outline is armed. The path is closed, so the cap is
                never visible anyway. */}
            <path
              data-atlas-outline
              d={INDIA_OUTLINE_PATH}
              fill="none"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              strokeLinejoin="round"
              strokeLinecap="butt"
              vectorEffect="non-scaling-stroke"
            />

            {STATIONS.map((station) => {
              const lit = hoveredId === station.id || activeId === station.id;
              return (
                <g
                  key={station.id}
                  transform={`translate(${station.x} ${station.y})`}
                  className={cn(
                    "group cursor-pointer transition-colors duration-200 ease-quad",
                    lit
                      ? "text-sienna-press"
                      : station.hq
                        ? "text-sienna"
                        : "text-marine",
                  )}
                  onClick={() => setActiveId(station.id)}
                  onMouseEnter={() => setHoveredId(station.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Hit target — generous, invisible, mouse/touch only. */}
                  <circle r="15" fill="transparent" />

                  <g data-atlas-mark style={MARK_STYLE}>
                    <circle
                      r="4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d="M0,-11 V-6.5 M0,6.5 V11 M-11,0 H-6.5 M6.5,0 H11"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    {station.hq && <circle r="1.8" fill="currentColor" />}
                  </g>

                  <text
                    data-atlas-key
                    x={station.dx}
                    y={station.dy}
                    textAnchor={station.anchor}
                    dominantBaseline="middle"
                    className="fill-current font-mono"
                    style={{
                      ...HALO_STYLE,
                      fontSize: 11,
                      letterSpacing: "0.1em",
                    }}
                    stroke="var(--paper-still)"
                    strokeWidth="3.5"
                  >
                    {station.key}
                  </text>

                  {/* City name — appears on hover, or when its drawer is open. */}
                  <text
                    x="0"
                    y="24"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    stroke="var(--paper-still)"
                    strokeWidth="4"
                    style={{
                      ...HALO_STYLE,
                      fontSize: 12,
                      letterSpacing: "0.1em",
                    }}
                    className={cn(
                      "fill-ink font-mono transition-opacity duration-200 ease-quad group-hover:opacity-100",
                      lit ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {station.city}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ---------------------------------------------------------------
            THE INDEX — the accessible surface. Every branch is reachable by
            keyboard here, with or without the plate.
            ------------------------------------------------------------ */}
        <div className="flex flex-col gap-4">
          {/* Icons live out here in the index HTML only. The plate above is a
              drafted cartographic mark and takes none of them. */}
          <h3 className="font-mono text-mono-label uppercase text-marine tabular-figures">
            <Icon as={MapPin} size="sm" className="mr-2 align-[-0.24em]" />
            THE BRANCH INDEX · NORTH TO SOUTH
          </h3>
          <ol className="m-0 flex list-none flex-col p-0 hairline-strong-b">
            {STATIONS.map((station) => (
              <li key={station.id} className="hairline-t">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={activeId === station.id}
                  onClick={() => setActiveId(station.id)}
                  onMouseEnter={() => setHoveredId(station.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(station.id)}
                  onBlur={() => setHoveredId(null)}
                  className="flex min-h-12 w-full cursor-pointer items-baseline gap-4 rounded-0 py-3 text-left transition-colors duration-200 ease-quad hover:bg-sienna-tint"
                >
                  <span className="w-8 shrink-0 font-mono text-mono-label uppercase text-marine tabular-figures">
                    {station.key}
                  </span>
                  <span className="font-ui text-h4 text-ink">
                    {station.city}
                  </span>
                  {station.hq && (
                    <span className="font-mono text-caption text-sienna-press">
                      HQ
                    </span>
                  )}
                  {station.branches.length > 1 && (
                    <span className="font-mono text-caption text-ink-muted tabular-figures">
                      {`${station.branches.length} BRANCHES`}
                    </span>
                  )}
                  <span className="ml-auto pr-1 text-right font-mono text-caption text-ink-muted">
                    {station.state}
                  </span>
                  {/* The row IS the drawer's trigger; this says so. `self-center`
                      because the row is baseline-aligned and a glyph has none. */}
                  <Icon
                    as={ChevronRight}
                    size="sm"
                    className="self-center text-ink-muted"
                  />
                </button>
              </li>
            ))}
          </ol>

        </div>
      </div>

      <BranchDrawer station={activeStation} onClose={closeDrawer} />
    </div>
  );
}
