import Image from "next/image";
import { cn } from "@/lib/cn";

/* ===========================================================================
   PLATE I  ·  hero photograph  ·  Chapter I DREAM
   ---------------------------------------------------------------------------
   The one photograph in the hero, composed as a plate rather than a banner:
   a 1px --rule-strong keyline, the 3px GO-Blue registration offset
   (--shadow-reg-sienna), a graticule overprint that ties the photograph into
   the Plate system, and a mono legend.

   Composed LOCALLY rather than through <Plate>: ui/plate.tsx is shared and
   its `field` variant owns its own gradient/graticule/crosshair furniture.
   Adding an `image` capability there would have meant branching every one of
   its four variants. Nothing here invents a token.

   THE FIELD BED IS --grad-plate-marine, exactly as <Plate variant="field">.
   That is deliberate: the photograph paints ON TOP of a canonical plate
   field, so a slow connection (or a missing asset) degrades to the designed
   Plate A field, never to a white box or a broken-image glyph.

   LCP: on desktop this is the likely LCP element. It is therefore
   `priority` (never lazy), never carries `.reveal`, and is NEVER animated —
   an image that boots from opacity:0 defers its own LCP. It simply is
   there, at full opacity, on first paint, while the type rises around it.

   The legend reads BELOW the frame on mobile (conventional) and ABOVE it on
   desktop (`md:order-first`), where the Departure Card overlaps the frame's
   lower-left and would otherwise collide with a caption set beneath.
   ======================================================================== */

/** Portrait 4:5 master; cropped to 3:2 below 1024px. */
export const HERO_PLATE_SRC = "/images/plates/hero-departure.jpg";

export function HeroPlate({ className }: { className?: string }) {
  return (
    <figure data-hero-plate className={cn("m-0 flex flex-col", className)}>
      <div
        style={{ backgroundImage: "var(--grad-plate-marine)" }}
        className={cn(
          "relative w-full overflow-hidden rounded-1",
          "border border-rule-strong shadow-reg-sienna",
          /* 3:2 crop on mobile, the 4:5 master on desktop. */
          "aspect-[3/2] md:aspect-[4/5]",
        )}
      >
        <Image
          src={HERO_PLATE_SRC}
          alt="The departures hall at Terminal 3, Indira Gandhi International, New Delhi, before dawn."
          fill
          priority
          sizes="(min-width:1024px) 40vw, 100vw"
          className="object-cover"
        />
        {/* Graticule overprint — the same 48px tile the Plate system uses,
            8% white, static. Prints the photograph as a survey plate. */}
        <div
          aria-hidden="true"
          className="plate-graticule pointer-events-none absolute inset-0"
        />
      </div>

      <figcaption className="order-last mt-3 font-mono text-caption uppercase text-ink-muted tabular-figures md:order-first md:mt-0 md:mb-3">
        Plate I · Departures, Terminal 3, New Delhi · 04:40
      </figcaption>
    </figure>
  );
}
