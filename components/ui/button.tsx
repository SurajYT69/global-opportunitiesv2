import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/**
 * CTA (CANON):
 *   primary   solid --sienna-press, white type (5.4:1). NEVER a gradient.
 *   secondary --marine outline — the institutional anchor.
 *   ghost     no fill, no border; sienna underline swell on hover.
 *
 * The pill radius (--r-pill) exists for CTA buttons and nothing else.
 * Letterspaced uppercase is banned on CTAs.
 * The focus-visible ring is global (globals.css) — do not re-declare it.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-sienna-press text-paper rounded-pill hover:bg-sienna-deep active:bg-sienna-deep",
  secondary:
    "bg-transparent text-marine rounded-pill border border-marine hover:bg-marine hover:text-paper",
  ghost:
    "bg-transparent text-ink rounded-0 underline decoration-rule-strong underline-offset-[0.3em] decoration-1 hover:decoration-sienna hover:decoration-2",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "min-h-12 px-5 text-body-sm", // 48px — the floor, everywhere
  md: "min-h-13 px-6 text-body",
  lg: "min-h-15 px-8 text-body",
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to the container. Used in the mobile bar and step 3 of the form. */
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

type AsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    /** Renders an <a>. `tel:` and `wa.me` must always be real anchors. */
    href: string;
  };

type AsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

export type ButtonProps = AsAnchor | AsButton;

const BASE =
  "inline-flex items-center justify-center gap-2 font-ui font-semibold leading-none " +
  "no-underline select-none cursor-pointer " +
  "transition-colors duration-200 ease-quad " +
  "active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-50";

export function Button(props: ButtonProps) {
  const classes = cn(
    BASE,
    VARIANT[props.variant ?? "primary"],
    SIZE[props.size ?? "md"],
    props.fullWidth && "w-full",
    props.className,
  );

  if (props.href !== undefined) {
    const { variant, size, fullWidth, className, children, ...anchorProps } =
      props;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const {
    variant,
    size,
    fullWidth,
    className,
    children,
    href,
    type = "button",
    ...buttonProps
  } = props;
  return (
    <button className={classes} type={type} {...buttonProps}>
      {children}
    </button>
  );
}

/** Canon interface-contract alias. SPLIT-B imports either name. */
export const CTA = Button;
