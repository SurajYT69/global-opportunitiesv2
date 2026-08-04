/**
 * THE FIRST CALL — static data for `#enquiry`.
 *
 * Canon: direction.md §15. Evidence: research-cro.md (three-step escalation,
 * PII last, <=6 fields, tel: + wa.me as equal first-class siblings).
 *
 * Plain data only — importable from Server or Client Components.
 */

export interface ChipOption {
  value: string;
  label: string;
}

/* ---------------------------------------------------------------------------
   STEP 1 — DESTINATION (one tap, zero typing, counsellor-routing signal)
   Canon §15: UK, USA, Canada, Australia, NZ, Ireland, Germany, Other.
   ------------------------------------------------------------------------ */
export const DESTINATIONS = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "new-zealand", label: "New Zealand" },
  { value: "ireland", label: "Ireland" },
  { value: "germany", label: "Germany" },
  { value: "other", label: "Somewhere else" },
] as const satisfies readonly ChipOption[];

/* ---------------------------------------------------------------------------
   STEP 2 — DEGREE LEVEL + INTAKE (two taps)
   ------------------------------------------------------------------------ */
export const DEGREE_LEVELS = [
  { value: "bachelors", label: "Bachelors" },
  { value: "masters", label: "Masters" },
  { value: "mba", label: "MBA" },
  { value: "phd", label: "PhD" },
  { value: "diploma", label: "Diploma" },
] as const satisfies readonly ChipOption[];

export const INTAKES = [
  { value: "sep-2027", label: "September 2027" },
  { value: "jan-2028", label: "January 2028" },
  { value: "later", label: "Later — still deciding" },
] as const satisfies readonly ChipOption[];

/* ---------------------------------------------------------------------------
   CONTACT ROUTES — real anchors, functional with JavaScript disabled.
   WhatsApp is rendered as ink + outline, never in WhatsApp green: on this page
   green means *verified*, and the semantic must not leak.
   ------------------------------------------------------------------------ */
export const GO_PHONE_DISPLAY = "1800 111 119";
export const GO_PHONE_HREF = "tel:1800111119";
export const GO_WHATSAPP_NUMBER = "918282828215";

/* ---------------------------------------------------------------------------
   CANON COPY — verbatim. Do not paraphrase.
   ------------------------------------------------------------------------ */
export const PROOF_LINE =
  "A GO counsellor calls you within 15 minutes, 9 AM–9 PM IST. No fee, no obligation.";
export const CTA_SUBLABEL = "No cost · no obligation · 30–45 min";
export const ACCREDITATION_ROW =
  "AIRC · ICEF · AAERI · BRITISH COUNCIL · EDUCATION NEW ZEALAND · PTE PEARSON";
export const SUBMIT_LABEL = "Book a free guidance session";

/** Version stamp logged alongside the consent decision (DPDP requirement). */
export const FORM_VERSION = "enquiry-v1";

/* ---------------------------------------------------------------------------
   LABEL LOOKUP
   ------------------------------------------------------------------------ */
function labelOf(options: readonly ChipOption[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? "";
}

export const destinationLabel = (value: string) => labelOf(DESTINATIONS, value);
export const degreeLabel = (value: string) => labelOf(DEGREE_LEVELS, value);
export const intakeLabel = (value: string) => labelOf(INTAKES, value);

/* ---------------------------------------------------------------------------
   WHATSAPP DEEP LINK
   Pre-filled from whatever the student has already tapped. Callable from the
   very first chip onward — a parent who will never fill a form still leaves
   with a routed conversation.
   ------------------------------------------------------------------------ */
export interface WhatsappSeed {
  destination?: string;
  degree?: string;
  intake?: string;
  name?: string;
}

export function whatsappMessage(seed: WhatsappSeed): string {
  const lines = [
    "Hello Global Opportunities. I would like to book a free guidance session.",
  ];

  const destination = destinationLabel(seed.destination ?? "");
  const degree = degreeLabel(seed.degree ?? "");
  const intake = intakeLabel(seed.intake ?? "");
  const name = seed.name?.trim();

  if (name) lines.push(`Name: ${name}`);
  if (destination) lines.push(`Destination: ${destination}`);
  if (degree) lines.push(`Degree level: ${degree}`);
  if (intake) lines.push(`Intake: ${intake}`);

  return lines.join("\n");
}

export function whatsappHref(seed: WhatsappSeed): string {
  return `https://wa.me/${GO_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage(seed),
  )}`;
}
