"use client";

import { ArrowLeftRight } from "lucide-react";
import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/icon";

/* ===========================================================================
   THE DUAL CLOCK
   ---------------------------------------------------------------------------
   Grafted from MERIDIAN by the judge's ruling: in the nav it is decoration;
   in the For-Parents chapter it is an argument. Two zones, `Intl.DateTimeFormat`,
   one update per minute, no odometer and no easing — this chapter's motion
   budget is one opacity fade and the clock does not spend it.

   The digits are client-only by design. A statically prerendered page would
   otherwise ship a build-time clock in the HTML, and a wrong time in a section
   whose whole argument is that our numbers can be checked is worse than no
   time at all. The zone rules ARE static facts, so they render on the server
   and stand alone with JavaScript disabled. The digit line reserves its own
   height, so nothing shifts when the time arrives.

   NO CLOCK FACE. There are no dials and no hands in this component, and there
   is no clock glyph either — a drawn dial beside real digits is a picture of
   the thing the digits already are. The single mark is on the gap caption, and
   it is a two-way arrow, because that line states a difference between two
   places rather than a time.
   ======================================================================== */

interface Zone {
  id: string;
  city: string;
  /** IANA time zone. */
  zone: string;
  /** The static, server-renderable fact about this zone. */
  rule: string;
}

const ZONES: readonly Zone[] = [
  {
    id: "delhi",
    city: "New Delhi",
    zone: "Asia/Kolkata",
    rule: "IST · UTC+5:30 · NO DAYLIGHT SAVING",
  },
  {
    id: "london",
    city: "London",
    zone: "Europe/London",
    rule: "GMT · UTC+0 · UTC+1 FROM LATE MARCH TO LATE OCTOBER",
  },
] as const;

function timeIn(date: Date, zone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function weekdayIn(date: Date, zone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    weekday: "short",
  }).format(date);
}

/** Minutes east of UTC for `zone` at `date`. Derived, never hard-coded. */
function offsetMinutes(date: Date, zone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);

  const read = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  const asUtc = Date.UTC(
    read("year"),
    read("month") - 1,
    read("day"),
    read("hour") % 24,
    read("minute"),
    read("second"),
  );

  return Math.round((asUtc - date.getTime()) / 60000);
}

function describeGap(date: Date): string {
  const delta =
    offsetMinutes(date, ZONES[0].zone) - offsetMinutes(date, ZONES[1].zone);
  if (delta === 0) return "LONDON IS ON THE SAME CLOCK AS NEW DELHI";

  const behind = delta > 0;
  const total = Math.abs(delta);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const span =
    minutes === 0
      ? `${hours} HR${hours === 1 ? "" : "S"}`
      : `${hours} HR${hours === 1 ? "" : "S"} ${minutes} MIN`;

  return `LONDON IS ${span} ${behind ? "BEHIND" : "AHEAD OF"} NEW DELHI`;
}

/* ---------------------------------------------------------------------------
   The wall clock as an external store.

   Wall time is not React state — it is a platform fact that changes on its own,
   which is precisely what `useSyncExternalStore` exists for. The snapshot is
   floored to the minute, so it changes once a minute and not sixty times a
   second, and the server snapshot is `0`, so the server renders no digits and
   hydration matches exactly. One timer, shared, torn down when nothing is
   listening.
   ------------------------------------------------------------------------ */

const MINUTE = 60_000;
const listeners = new Set<() => void>();
let snapshot = 0;
let timer: number | undefined;

function scheduleTick() {
  timer = window.setTimeout(() => {
    snapshot = Math.floor(Date.now() / MINUTE) * MINUTE;
    for (const listener of listeners) listener();
    scheduleTick();
  }, MINUTE - (Date.now() % MINUTE));
}

function subscribe(listener: () => void): () => void {
  if (listeners.size === 0) {
    snapshot = Math.floor(Date.now() / MINUTE) * MINUTE;
    scheduleTick();
  }
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== undefined) {
      window.clearTimeout(timer);
      timer = undefined;
    }
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => 0;

export function DualClock() {
  const stamp = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const now = stamp === 0 ? null : new Date(stamp);

  return (
    <div className="rounded-0 border border-rule bg-ochre-tint p-6 sm:p-8">
      <p className="font-ui text-label uppercase text-ink-muted">
        Two clocks, one family
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
        {ZONES.map((zone) => (
          <div key={zone.id} className="flex flex-col gap-2">
            <p className="font-mono text-mono-label uppercase text-marine tabular-figures">
              {zone.city}
            </p>

            {/* Height reserved whether or not the digits have arrived. */}
            <p
              data-figure
              className="flex min-h-[1em] items-center font-mono text-figure text-ink tabular-figures"
            >
              {now && (
                <>
                  <span className="sr-only">{`Current time in ${zone.city}: `}</span>
                  {timeIn(now, zone.zone)}
                </>
              )}
            </p>

            <p className="font-mono text-caption uppercase text-ink-muted tabular-figures">
              {now ? `${weekdayIn(now, zone.zone)} · ${zone.rule}` : zone.rule}
            </p>
          </div>
        ))}
      </div>

      {now && (
        <p className="mt-6 flex items-center gap-2 font-mono text-caption uppercase text-ink-muted tabular-figures">
          <Icon as={ArrowLeftRight} size="sm" />
          {describeGap(now)}
        </p>
      )}

      <p className="mt-6 max-w-serif font-display text-quote opsz-32 text-ink">
        You&rsquo;ll always know what time it is where they are.
      </p>

      <p className="mt-4 max-w-serif font-display text-serif-body opsz-16 text-ink-muted">
        It sounds like a small thing. It is the thing parents ask us about most
        in the first month &mdash; whether they are calling at a reasonable
        hour, and whether no answer means something is wrong. Usually it means
        it is four in the morning there.
      </p>
    </div>
  );
}
