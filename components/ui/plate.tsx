import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ===========================================================================
   THE PLATE SYSTEM
   ---------------------------------------------------------------------------
   V1 ships with ZERO photographs. This is a design decision, not a compromise.
   Every place a photograph would eventually live is a <figure> with a locked
   aspect-ratio, a 1px --rule-strong keyline, a 3px sienna registration offset,
   and a typeset caption block beneath.

   Banned, v1 and v2: empty <img>, grey boxes, "image coming soon", skeleton
   shimmers, AI imagery, stock, flags, landmarks, globes, aircraft, passports,
   cap-tosses, handshakes, isometric illustration, 3D clay, gradient blobs.

   V2 PHOTOGRAPHY DROP-IN: the field is `position: relative` and the caption is
   a sibling. A commissioned photograph absolutely-positions into the field
   behind the identical caption — zero layout shift, zero CSS change beyond the
   `data-plate` attribute.
   ======================================================================== */

export type PlateVariant = "field" | "specimen" | "cartouche" | "cartographic";
export type PlateRegistration = "sienna" | "marine" | "rule" | "none";

const DEFAULT_RATIO: Record<PlateVariant, string> = {
  field: "4 / 3",
  specimen: "1 / 1.414",
  cartouche: "4 / 5",
  cartographic: "4 / 3",
};

const REGISTRATION: Record<PlateRegistration, string> = {
  sienna: "shadow-reg-sienna",
  marine: "shadow-reg-marine",
  rule: "shadow-reg-rule",
  none: "",
};

export interface PlateField {
  /** Mono, tracked caps. */
  label: string;
  /** Omit to render an honest ██████ redaction block. */
  value?: string;
}

export interface PlateProps {
  /** Plate A field · Plate B specimen · Plate C cartouche · Plate D cartographic. */
  variant?: PlateVariant;
  /** CSS aspect-ratio for the field. Defaults per variant. */
  ratio?: string;
  /** "PLATE I" — mono, tracked caps, top of the field. */
  plateNumber?: string;
  /** Plate A: "28.5562° N · 77.1000° E" */
  coordinates?: string;
  /** Plate A / D: "INDIRA GANDHI INTERNATIONAL, TERMINAL 3" */
  place?: string;
  /** Plate A: "04:40 IST" */
  time?: string;
  /** Plate C: monogram initials, e.g. "AV". Set at 5rem in Newsreader. */
  initials?: string;
  /** Plate B: mono field labels; omit a value to redact it. */
  fields?: PlateField[];
  /** Plate B: "SPECIMEN · ILLUSTRATIVE · NOT A STUDENT RECORD" */
  stamp?: string;
  /** Caption block beneath the keyline. */
  caption?: ReactNode;
  /** Second caption line — mono data. */
  captionMeta?: ReactNode;
  /** Print misregistration offset. Defaults to sienna. */
  registration?: PlateRegistration;
  /** `dark` recolours the caption for the `endpaper` chapter. */
  tone?: "light" | "dark";
  /** Field contents. Plate D's coastline SVG goes here. */
  children?: ReactNode;
  className?: string;
  fieldClassName?: string;
  id?: string;
}

/** Crosshair location mark. Structure, never decoration. */
function PlateMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      className={className}
    >
      <circle
        cx="60"
        cy="60"
        r="34"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="60" cy="60" r="2.5" fill="currentColor" />
      <path
        d="M60 6v36M60 78v36M6 60h36M78 60h36"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const DEFAULT_SPECIMEN_FIELDS: PlateField[] = [
  { label: "Institution" },
  { label: "Programme" },
  { label: "Reference" },
  { label: "Issued" },
];

export function Plate({
  variant = "field",
  ratio,
  plateNumber,
  coordinates,
  place,
  time,
  initials,
  fields,
  stamp,
  caption,
  captionMeta,
  registration = "sienna",
  tone = "light",
  children,
  className,
  fieldClassName,
  id,
}: PlateProps) {
  const dark = tone === "dark";
  const fieldStyle: CSSProperties = {
    aspectRatio: ratio ?? DEFAULT_RATIO[variant],
  };
  if (variant === "field") {
    fieldStyle.backgroundImage = "var(--grad-plate-marine)";
  }

  return (
    <figure
      id={id}
      data-plate={variant}
      className={cn("m-0 flex flex-col", className)}
    >
      <div
        style={fieldStyle}
        className={cn(
          "relative w-full overflow-hidden rounded-1 border border-rule-strong",
          REGISTRATION[registration],
          variant !== "field" && "bg-paper-tracing",
          fieldClassName,
        )}
      >
        {variant === "field" && (
          <>
            <div className="plate-graticule absolute inset-0" aria-hidden />
            <PlateMark className="absolute right-[6%] bottom-[8%] w-[26%] text-plate-white/25" />
            <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
              {plateNumber && (
                <span className="font-mono text-mono-label uppercase text-plate-white/70 tabular-figures">
                  {plateNumber}
                </span>
              )}
              <div className="flex flex-col gap-2">
                {coordinates && (
                  <span className="font-mono text-caption uppercase text-plate-white tabular-figures">
                    {coordinates}
                  </span>
                )}
                {place && (
                  <span className="font-display text-d2 text-plate-white text-balance">
                    {place}
                  </span>
                )}
                {time && (
                  <span className="font-mono text-mono-label uppercase text-ochre-on-dark tabular-figures">
                    {time}
                  </span>
                )}
              </div>
            </div>
          </>
        )}

        {variant === "specimen" && (
          <div className="relative flex h-full flex-col gap-4 p-5 sm:p-6">
            {plateNumber && (
              <span className="font-mono text-mono-label uppercase text-ink-muted tabular-figures">
                {plateNumber}
              </span>
            )}
            <div aria-hidden className="h-px w-full bg-rule-strong" />
            {children ?? (
              <dl className="m-0 flex flex-col gap-3">
                {(fields ?? DEFAULT_SPECIMEN_FIELDS).map((field) => (
                  <div
                    key={field.label}
                    className="flex flex-col gap-1 border-b border-rule pb-2"
                  >
                    <dt className="font-mono text-mono-label uppercase text-ink-muted">
                      {field.label}
                    </dt>
                    <dd className="m-0 font-mono text-data text-ink tabular-figures">
                      {field.value ?? (
                        <span className="plate-redaction">██████</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            {stamp && (
              <span className="mt-auto -rotate-2 self-start border border-clay px-2 py-1 font-mono text-mono-label uppercase text-clay">
                {stamp}
              </span>
            )}
          </div>
        )}

        {variant === "cartouche" && (
          <>
            <div className="plate-contour absolute inset-0" aria-hidden />
            <div className="relative flex h-full items-center justify-center">
              {initials && (
                <span
                  aria-hidden="true"
                  className="font-display text-[5rem] leading-none text-ink"
                >
                  {initials}
                </span>
              )}
              {children}
            </div>
            {plateNumber && (
              <span className="absolute top-4 left-4 font-mono text-mono-label uppercase text-ink-muted tabular-figures">
                {plateNumber}
              </span>
            )}
          </>
        )}

        {variant === "cartographic" && (
          <div className="relative h-full w-full text-marine">
            {children}
            <PlateMark className="absolute top-1/2 left-1/2 w-[18%] -translate-x-1/2 -translate-y-1/2 text-sienna" />
            {place && (
              <span className="absolute bottom-4 left-4 font-mono text-mono-label uppercase text-marine">
                {place}
              </span>
            )}
          </div>
        )}
      </div>

      {(caption || captionMeta) && (
        <figcaption className="mt-3 flex flex-col gap-1">
          {caption && (
            <span
              className={cn(
                "font-mono text-caption uppercase tabular-figures",
                dark ? "text-plate-white" : "text-ink-muted",
              )}
            >
              {caption}
            </span>
          )}
          {captionMeta && (
            <span
              className={cn(
                "font-mono text-caption uppercase tabular-figures",
                dark ? "text-plate-grey" : "text-ink-muted",
              )}
            >
              {captionMeta}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
