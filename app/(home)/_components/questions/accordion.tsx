"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

/* ===========================================================================
   THE ACCORDION — the only client code in `questions`.
   ---------------------------------------------------------------------------
   CANON (direction.md, section 14): "grid-template-rows: 0fr -> 1fr
   transition, --dur-3, --ease-cubic." The height animation is therefore a
   pure CSS transition on the grid track — no measured pixel height, no
   layout thrash, no CLS, and the global reduced-motion backstop in
   globals.css collapses it to 1ms, so it opens instantly under `reduce`.

   Accessibility follows the APG disclosure pattern:
     - the trigger is a real <button> inside the <h3>
     - aria-expanded / aria-controls on the button
     - role="region" is deliberately OMITTED — APG warns against landmark
       proliferation above ~6 panels, and there are ten here
     - the collapsed panel is `inert`, so it is out of the tab order and out
       of the accessibility tree while its content stays in the DOM for
       search engines and for JS-disabled readers
   Multiple panels may be open at once: each disclosure owns its own state.
   ======================================================================== */

export interface QuestionDisclosureProps {
  /** Stable slug from the FAQ data — ids must be deterministic across SSR. */
  id: string;
  /** 1-based index, printed as an atlas entry number. */
  index: number;
  question: string;
  /** The answer, rendered on the server and passed through as children. */
  children: ReactNode;
  className?: string;
}

export function QuestionDisclosure({
  id,
  index,
  question,
  children,
  className,
}: QuestionDisclosureProps) {
  const [open, setOpen] = useState(false);
  const buttonId = `faq-${id}-q`;
  const panelId = `faq-${id}-a`;

  return (
    <li className={cn("hairline-b list-none", className)}>
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((previous) => !previous)}
          className="flex min-h-12 w-full cursor-pointer items-start gap-4 rounded-0 bg-transparent py-5 text-left"
        >
          <span
            aria-hidden="true"
            className="mt-1 w-6 shrink-0 font-mono text-mono-label uppercase text-marine tabular-figures"
          >
            {String(index).padStart(2, "0")}
          </span>

          <span className="flex-1 font-ui text-h4 text-ink">{question}</span>

          {/* The expand/collapse affordance. Rotation only — a transform, per
              the motion contract, on the same --dur-3 / --ease-cubic as the
              panel it belongs to. It is decoration: `aria-expanded` on this
              button is what states open or shut, so the glyph takes no name
              and stays out of the accessibility tree. */}
          <Icon
            as={ChevronDown}
            size="sm"
            className={cn(
              "mt-1 text-sienna-press",
              "transition-transform duration-320 ease-cubic",
              open ? "rotate-180" : "rotate-0",
            )}
          />
        </button>
      </h3>

      <div
        id={panelId}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-320 ease-cubic",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="max-w-prose pb-8 sm:pl-10">{children}</div>
        </div>
      </div>
    </li>
  );
}
