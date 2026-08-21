import Image from "next/image";
import { cn } from "@/lib/cn";

/* ===========================================================================
   THE KITCHEN-TABLE PLATE
   ---------------------------------------------------------------------------
   The one photograph in the Trust chapter, and the chapter's opening visual.

   It is built here rather than through <Plate> because every <Plate> variant
   draws something INTO its field — the marine gradient and graticule, the
   contour wash, the crosshair mark — and a photograph wants none of that. The
   frame is otherwise identical to <Plate> by construction: the same 1px
   --rule-strong keyline, the same rounded-1, the same 3px registration offset,
   the same mono caption as a figcaption sibling three units beneath. Swapping
   this for <Plate ratio="3 / 2"> would change the picture, not the frame.

   Never eager: this sits well below the fold in every viewport, so it must not
   compete with the hero for the LCP.
   ======================================================================== */

const SRC = "/images/plates/kitchen-table.jpg";

const ALT =
  "A family talking across a kitchen table at night — a laptop, a printed " +
  "shortlist and cups of tea between them.";

export function KitchenPlate({ className }: { className?: string }) {
  return (
    <figure
      data-plate="photograph"
      className={cn("m-0 flex flex-col", className)}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-1 border border-rule-strong bg-paper-tracing shadow-reg-sienna">
        <Image
          src={SRC}
          alt={ALT}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 36vw, (min-width: 768px) 88vw, 100vw"
          className="object-cover"
        />
      </div>

      <figcaption className="mt-3 font-mono text-caption text-ink-muted tabular-figures">
        THE KITCHEN TABLE · WHERE THIS DECISION ACTUALLY HAPPENS
      </figcaption>
    </figure>
  );
}
