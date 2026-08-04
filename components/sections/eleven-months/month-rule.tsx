"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Milestone } from "lucide-react";
import { useRef, type CSSProperties } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { DUR, GSAP_EASE, MQ, SCRUB, STAGGER } from "@/lib/motion";
import {
  APPLICATION_DAY_CITIES,
  APPLICATION_DAY_SUMMARY,
  APPLICATION_DAY_TICKS,
  CITED_DEADLINES,
  MARGIN_NOTE,
  MILESTONES,
  MONTHS,
  MONTH_COUNT,
} from "./data";

/* ===========================================================================
   THE ELEVEN-MONTH RULE
   ---------------------------------------------------------------------------
   THE ONLY PINNED SECTION ON THE PAGE (canon build note 3), >=1024px only.

   Desktop: the calendar track is pinned and scrubbed horizontally —
   ease "none", scrub 0.6, anticipatePin 1, explicit fromTo, invalidateOnRefresh.
   The six annotated blocks reveal through `containerAnimation`, once each.
   A sienna survey mark rides the rule, driven by the same ScrollTrigger's
   progress through a quickSetter — transform only, and zero extra triggers.

   <1024px: no pin, no horizontal scroll. The identical markup reflows into a
   static vertical ruled list with one batched reveal.

   Reduced motion: no pin, no reveal — gsap.set() straight to the final state,
   backed by the CSS `.reveal` backstop in globals.css.

   ScrollTrigger budget for this component:
     >=1024px   1 pin  +  6 containerAnimation child reveals  = 7
     <1024px    1 batched reveal                              = 1

   LAYOUT NOTE. All horizontal geometry is carried on inline custom properties
   (`--x`, `--w`, `--track-w`) so the calc() expressions are authored as raw
   CSS. The Tailwind arbitrary values only ever dereference a variable, which
   keeps every generated declaration trivially valid. The properties themselves
   are applied by `md:` utilities, so below 1024px the same markup simply
   reflows.
   ======================================================================== */

/**
 * gsap.matchMedia() only invokes its callback when at least one condition
 * matches, so `isCompact` is carried as the explicit complement of `isDesktop`
 * (the canonical --bp-md is 1024px). Without it, every viewport below 1024px
 * that is NOT in reduced motion would skip the callback entirely and leave the
 * `.reveal` blocks at opacity 0.
 */
const MEDIA = {
  isDesktop: MQ.md,
  isCompact: "(max-width: 1023.98px)",
  reduce: MQ.reduce,
} as const;

/** Layout plumbing, scoped to this component. Not design tokens. */
const TRACK_VARS = {
  "--month-w": "clamp(15rem, 22vw, 22rem)",
  "--track-pad": "var(--gutter)",
  /** Clearance between the rule and the annotated blocks. */
  "--rule-offset": "calc(50% + 3.5rem)",
} as CSSProperties;

/** Twelve month columns, a leading gutter, and a tail wide enough for the
    July deadline annotation to finish inside the clipped viewport. */
const TRACK_SIZE = {
  "--track-w": "calc(var(--month-w) * 12 + var(--track-pad) + 24rem)",
} as CSSProperties;

/** Absolute x for a position measured in month columns (fractions allowed). */
function atMonth(columns: number): CSSProperties {
  return {
    "--x": `calc(var(--track-pad) + var(--month-w) * ${columns})`,
  } as CSSProperties;
}

function blockGeometry(start: number, span: number): CSSProperties {
  return {
    "--x": `calc(var(--track-pad) + var(--month-w) * ${start})`,
    "--w": `calc(var(--month-w) * ${span})`,
  } as CSSProperties;
}

/** The survey mark is 9px; centre it on the rule without a CSS transform,
    which GSAP owns on this element. */
const MARK_OFFSET: CSSProperties = { marginTop: "-4.5px", marginLeft: "-4.5px" };

export function MonthRule() {
  const root = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const mark = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const viewportEl = viewport.current;
      const trackEl = track.current;
      const listEl = list.current;
      const markEl = mark.current;
      if (!viewportEl || !trackEl || !listEl) return;

      const blocks = gsap.utils.toArray<HTMLElement>(listEl.children);

      const mm = gsap.matchMedia();

      // `isCompact` is the explicit complement of `isDesktop`: gsap.matchMedia
      // only invokes the callback when at least one condition matches, so a
      // desktop-only condition set would silently skip every phone.
      mm.add(MEDIA, (ctx) => {
        const conditions = ctx.conditions ?? {};

        // ---- Layer 1 of the reduced-motion contract: land on the final state.
        if (conditions.reduce) {
          gsap.set(blocks, { opacity: 1, y: 0 });
          gsap.set(trackEl, { x: 0 });
          if (markEl) gsap.set(markEl, { x: 0 });
          return;
        }

        // ---- <1024px: static vertical list, one batched reveal, no pin.
        if (!conditions.isDesktop) {
          gsap.set(trackEl, { x: 0 });
          gsap.fromTo(
            blocks,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: DUR.d5,
              ease: GSAP_EASE.quart,
              stagger: STAGGER.base,
              immediateRender: false,
              scrollTrigger: {
                trigger: listEl,
                start: "top 85%",
                once: true,
                invalidateOnRefresh: true,
              },
            },
          );
          return;
        }

        // ---- >=1024px: the page's one pin.
        const distance = () =>
          Math.max(0, trackEl.offsetWidth - viewportEl.clientWidth);

        const setMark = markEl
          ? gsap.quickSetter(markEl, "x", "px")
          : undefined;
        const rideMark = (progress: number) => {
          if (setMark) setMark(progress * trackEl.offsetWidth);
        };

        const trackTween = gsap.fromTo(
          trackEl,
          { x: 0 },
          {
            x: () => -distance(),
            ease: GSAP_EASE.scrub,
            immediateRender: false,
            scrollTrigger: {
              trigger: viewportEl,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: viewportEl,
              pinSpacing: true,
              anticipatePin: 1,
              scrub: SCRUB,
              invalidateOnRefresh: true,
              onUpdate: (self) => rideMark(self.progress),
              onRefresh: (self) => rideMark(self.progress),
            },
          },
        );

        // Child reveals ride the container animation, not the page scroll.
        blocks.forEach((block) => {
          gsap.fromTo(
            block,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: DUR.d5,
              ease: GSAP_EASE.quart,
              immediateRender: false,
              scrollTrigger: {
                trigger: block,
                containerAnimation: trackTween,
                start: "left 88%",
                once: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} style={TRACK_VARS}>
      <div
        ref={viewport}
        className="relative mt-10 md:mt-0 md:flex md:h-[100svh] md:flex-col md:overflow-hidden md:pt-20 md:pb-10"
      >
        {/* ---- Running head --------------------------------------------- */}
        <header className="px-gutter md:shrink-0">
          <p className="font-mono text-mono-label uppercase text-marine tabular-figures">
            AUG 2026 <span aria-hidden="true">&rarr;</span> JUL 2027 · ELEVEN
            MONTHS · FOR THE SEPTEMBER 2027 INTAKE
          </p>
        </header>

        {/* ---- The rule band -------------------------------------------- */}
        <div className="relative mt-8 md:mt-0 md:min-h-0 md:flex-1">
          <div
            ref={track}
            style={TRACK_SIZE}
            className="relative md:absolute md:inset-y-0 md:left-0 md:w-[var(--track-w)]"
          >
            {/* The calendar rule itself. */}
            <div
              aria-hidden="true"
              className="absolute top-1/2 right-0 left-0 hidden h-px bg-rule-strong md:block"
            />

            {/* Month ticks + labels. Decorative: every date they carry is
                repeated in the annotated blocks and in the legend. */}
            <ul
              aria-hidden="true"
              className="absolute top-1/2 right-0 left-0 m-0 hidden list-none p-0 md:block"
            >
              {MONTHS.map((month, index) => (
                <li
                  key={`${month.label}-${index}`}
                  style={atMonth(index)}
                  className="absolute top-0 left-[var(--x)] w-[var(--month-w)]"
                >
                  <span className="absolute -top-1.5 left-0 h-3 w-px bg-rule-strong" />
                  <span className="absolute top-3 left-2 font-mono text-mono-label uppercase text-ink-muted tabular-figures">
                    {month.label}
                  </span>
                  {month.year && (
                    <span className="absolute top-8 left-2 font-mono text-caption uppercase text-ink-muted tabular-figures">
                      {month.year}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* Ochre marks — GO's own dated Application Days. Ochre is 2.1:1,
                so it is a NON-TEXT mark here and nothing else. */}
            <ul
              aria-hidden="true"
              className="absolute top-1/2 right-0 left-0 m-0 hidden list-none p-0 md:block"
            >
              {APPLICATION_DAY_TICKS.map((tick) => (
                <li
                  key={tick.id}
                  style={atMonth(tick.month + tick.frac)}
                  className="absolute bottom-0 left-[var(--x)]"
                >
                  <span className="absolute bottom-0 left-0 h-4 w-px bg-ochre" />
                </li>
              ))}
              <li
                style={atMonth(0.226)}
                className="absolute bottom-5 left-[var(--x)]"
              >
                <span className="block font-mono text-caption whitespace-nowrap uppercase text-ink-muted tabular-figures">
                  {APPLICATION_DAY_SUMMARY}
                </span>
              </li>
            </ul>

            {/* Clay marks — cited third-party deadlines, with the source and
                the last-verified stamp set beside each one. */}
            <ul
              aria-hidden="true"
              className="absolute top-1/2 right-0 left-0 m-0 hidden list-none p-0 md:block"
            >
              {CITED_DEADLINES.map((deadline) => (
                <li
                  key={deadline.id}
                  style={atMonth(deadline.month + deadline.frac)}
                  className="absolute bottom-0 left-[var(--x)]"
                >
                  <span className="absolute bottom-0 left-0 h-8 w-px bg-clay" />
                  <span className="absolute bottom-8 left-2 font-mono text-caption whitespace-nowrap uppercase text-ink-muted tabular-figures">
                    {deadline.source} · VERIFIED {deadline.lastVerified}
                  </span>
                  <span className="absolute bottom-13 left-2 font-mono text-caption whitespace-nowrap uppercase text-clay tabular-figures">
                    {deadline.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* The survey mark that rides the rule. */}
            <span
              ref={mark}
              aria-hidden="true"
              style={MARK_OFFSET}
              className="absolute top-1/2 left-0 hidden md:block"
            >
              <span className="block h-[9px] w-[9px] rotate-45 rounded-0 bg-sienna" />
            </span>

            {/* ---- The six annotated blocks ---------------------------- */}
            <ol
              ref={list}
              className="m-0 flex list-none flex-col p-0 md:absolute md:inset-0 md:block"
            >
              {MILESTONES.map((milestone) => {
                const above = milestone.side === "above";
                return (
                  <li
                    key={milestone.id}
                    style={blockGeometry(milestone.start, milestone.span)}
                    className={cn(
                      "reveal relative border-b border-rule px-gutter py-6",
                      "md:absolute md:border-b-0 md:px-0 md:py-0",
                      "md:left-[var(--x)] md:w-[var(--w)] md:pr-10",
                      above
                        ? "md:bottom-[var(--rule-offset)]"
                        : "md:top-[var(--rule-offset)]",
                    )}
                  >
                    <div className={above ? "md:pb-4" : "md:pt-4"}>
                      {/* The step mark. Decorative beside the ordinal it sits
                          next to, so it stays aria-hidden; the ochre, clay and
                          marine rules on the track are the load-bearing marks
                          and none of them is an icon. */}
                      <p className="flex items-center gap-2 font-mono text-mono-label uppercase text-marine tabular-figures">
                        <Icon as={Milestone} size="sm" />
                        {milestone.n} · {milestone.duration}
                      </p>
                      <h3 className="mt-2 font-ui text-h4 text-ink">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 max-w-prose font-ui text-body-sm text-ink-muted">
                        {milestone.body}
                      </p>
                      <p className="mt-3 font-mono text-caption uppercase text-ink-muted tabular-figures">
                        {milestone.range} · {milestone.owner}
                      </p>
                    </div>

                    {/* Duration bar, end caps, and the drop line to the rule. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute right-10 left-0 hidden h-px bg-marine md:block",
                        above ? "bottom-0" : "top-0",
                      )}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 hidden h-2 w-px bg-marine md:block",
                        above ? "bottom-0" : "top-0",
                      )}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute right-10 hidden h-2 w-px bg-marine md:block",
                        above ? "bottom-0" : "top-0",
                      )}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 hidden h-14 w-px bg-rule md:block",
                        above ? "-bottom-14" : "-top-14",
                      )}
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* ---- Margin note + legend ------------------------------------- */}
        <footer className="mt-10 flex flex-col gap-4 px-gutter md:mt-0 md:shrink-0 md:flex-row md:items-end md:justify-between md:gap-10">
          <p className="max-w-deck font-display text-deck text-ink-muted">
            {MARGIN_NOTE}
          </p>

          <ul className="m-0 flex list-none flex-col gap-2 p-0 md:items-end md:text-right">
            <li className="flex items-center gap-2 md:flex-row-reverse">
              <span aria-hidden="true" className="h-3 w-px shrink-0 bg-ochre" />
              <span className="font-mono text-caption uppercase text-ink-muted tabular-figures">
                GO APPLICATION DAYS · {APPLICATION_DAY_CITIES}
              </span>
            </li>
            <li className="flex items-center gap-2 md:flex-row-reverse">
              <span aria-hidden="true" className="h-3 w-px shrink-0 bg-clay" />
              <span className="font-mono text-caption uppercase text-ink-muted tabular-figures">
                CITED THIRD-PARTY DEADLINES ·{" "}
                <a
                  href="https://www.ucas.com/"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  className="text-clay underline decoration-rule-strong underline-offset-2 hover:decoration-clay"
                >
                  UCAS.COM
                </a>{" "}
                ·{" "}
                <a
                  href="https://www.uni-assist.de/en/"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  className="text-clay underline decoration-rule-strong underline-offset-2 hover:decoration-clay"
                >
                  UNI-ASSIST.DE
                </a>{" "}
                · VERIFIED AUG 2026
              </span>
            </li>
            <li className="font-mono text-caption uppercase text-ink-muted tabular-figures">
              {MONTH_COUNT} TICKS · ELEVEN MONTHS · DURATIONS AS DOCUMENTED BY
              GLOBAL OPPORTUNITIES
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
