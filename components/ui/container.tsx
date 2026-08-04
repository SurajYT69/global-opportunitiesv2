import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Container widths (CANON):
 *   frame   1600px  outer page frame
 *   content 1200px  default content column
 *   prose   66ch    Hanken body measure
 *   serif   62ch    For-Parents serif measure
 *   deck    52ch    hero deck measure
 *   full    no cap  full-bleed, gutters still applied
 */
export type ContainerWidth =
  | "frame"
  | "content"
  | "prose"
  | "serif"
  | "deck"
  | "full";

const WIDTH: Record<ContainerWidth, string> = {
  frame: "max-w-frame",
  content: "max-w-content",
  prose: "max-w-prose",
  serif: "max-w-serif",
  deck: "max-w-deck",
  full: "",
};

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `div`. */
  as?: Extract<
    ElementType,
    | "div"
    | "section"
    | "header"
    | "footer"
    | "main"
    | "nav"
    | "article"
    | "aside"
    | "figure"
  >;
  /** Max-width band. Defaults to `content` (1200px). */
  width?: ContainerWidth;
  /** Set false to drop the page side gutter (nested containers). */
  gutter?: boolean;
}

export function Container({
  as: Component = "div",
  width = "content",
  gutter = true,
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full",
        WIDTH[width],
        gutter && "px-gutter",
        className,
      )}
      {...props}
    />
  );
}
