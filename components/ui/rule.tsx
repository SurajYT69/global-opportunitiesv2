import { cn } from "@/lib/cn";

/**
 * Hairline divider. Rules are furniture, not decoration.
 *
 * Weights (CANON):
 *   hairline  1px       body rules, plate keylines, table rows      --rule
 *   chapter   1px       chapter rules, table rules                  --rule-strong
 *   colophon  0.125rem  the colophon's top rule                     --rule-strong
 *   masthead  0.25rem   beneath the sticky nav                      --rule-strong
 */
export type RuleWeight = "hairline" | "chapter" | "colophon" | "masthead";
export type RuleTone = "rule" | "rule-strong" | "sienna" | "plate-rule";

const WEIGHT: Record<RuleWeight, { h: string; v: string; tone: RuleTone }> = {
  hairline: { h: "h-px", v: "w-px", tone: "rule" },
  chapter: { h: "h-px", v: "w-px", tone: "rule-strong" },
  colophon: { h: "h-0.5", v: "w-0.5", tone: "rule-strong" },
  masthead: { h: "h-1", v: "w-1", tone: "rule-strong" },
};

const TONE: Record<RuleTone, string> = {
  rule: "bg-rule",
  "rule-strong": "bg-rule-strong",
  sienna: "bg-sienna",
  "plate-rule": "bg-plate-rule",
};

export interface RuleProps {
  weight?: RuleWeight;
  /** Overrides the weight's default colour. */
  tone?: RuleTone;
  orientation?: "horizontal" | "vertical";
  /**
   * `true` renders an aria-hidden <div> (pure furniture). `false` renders an
   * <hr>, which AT announces as a thematic break. Default `true`.
   */
  decorative?: boolean;
  className?: string;
}

export function Rule({
  weight = "hairline",
  tone,
  orientation = "horizontal",
  decorative = true,
  className,
}: RuleProps) {
  const spec = WEIGHT[weight];
  const classes = cn(
    "shrink-0 border-0 rounded-0",
    orientation === "horizontal" ? cn("w-full", spec.h) : cn("h-full", spec.v),
    TONE[tone ?? spec.tone],
    className,
  );

  if (decorative) {
    return <div aria-hidden="true" className={classes} />;
  }
  return (
    <hr
      className={classes}
      aria-orientation={orientation === "vertical" ? "vertical" : undefined}
    />
  );
}
