"use client";

import { useEffect, useId, useReducer, useRef } from "react";
import type { CSSProperties, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Rule } from "@/components/ui/rule";
import { SectionHeading } from "@/components/ui/section-heading";
import { stepTransition } from "@/lib/motion";
import { Confirmation } from "./enquiry/confirmation";
import {
  ACCREDITATION_ROW,
  CTA_SUBLABEL,
  GO_PHONE_DISPLAY,
  GO_PHONE_HREF,
  PROOF_LINE,
  SUBMIT_LABEL,
  destinationLabel,
  whatsappHref,
} from "./enquiry/data";
import { StepProgress } from "./enquiry/progress";
import { StepContact } from "./enquiry/step-contact";
import { StepDestination } from "./enquiry/step-destination";
import { StepStudy } from "./enquiry/step-study";
import {
  TOTAL_STEPS,
  enquiryReducer,
  initialEnquiryState,
} from "./enquiry/state";
import type { FieldKey } from "./enquiry/state";

/* ===========================================================================
   XV · THE FIRST CALL — `#enquiry`
   ---------------------------------------------------------------------------
   Chapter VI · Success. Surface: --paper-tracing (canon: the form bed).

   The conversion climax, built as a form set in a book: fields on ruled lines
   with no boxes, labels in tracked caps, page-number progress.

   Six fields, three of them non-PII taps, PII last. The evidence
   (research-cro.md): the field cliff runs 23.1% @3 -> 11.4% @7 and GO's live
   site sits at 7+; multi-step re-sequencing is the single highest-leverage
   change available. `tel:` and `wa.me` run as equal first-class siblings, not
   as a fallback, because a parent may never fill a form at all.

   NOTE: there is no backend in v1. The submit is simulated (600ms pending),
   then the success state renders. The routing in that success state — the
   WhatsApp deep link and the `tel:` anchor — is real.
   ======================================================================== */

/** Chapter VI's Newsreader optical size, set without `data-chapter`. See §DEVIATIONS. */
const CHAPTER_AXIS = { "--nr-opsz": "72" } as CSSProperties;

const STEP_TITLES = [
  "Where you want to go",
  "What, and when",
  "Who we should call",
] as const;

export default function Enquiry() {
  const [state, dispatch] = useReducer(enquiryReducer, initialEnquiryState);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const uid = useId();
  const honeypotId = `${uid}-hp`;

  const { step, direction, values, errors, status } = state;
  const isLastStep = step === TOTAL_STEPS - 1;
  const done = status === "done";

  /* Simulated send. No backend exists in v1 — this is the pending state only. */
  useEffect(() => {
    if (status !== "pending") return;
    const timer = setTimeout(() => dispatch({ type: "submitted" }), 600);
    return () => clearTimeout(timer);
  }, [status]);

  const setField = (field: FieldKey, value: string) =>
    dispatch({ type: "set", field, value });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") return;

    // Honeypot. A human never sees this field, so a value in it is a bot.
    // Nothing is sent; the screen behaves exactly as it would otherwise.
    if (honeypotRef.current?.value) {
      dispatch({ type: "submitted" });
      return;
    }

    dispatch({ type: "submit" });
  }

  const chosenDestination = destinationLabel(values.destination);
  const wa = whatsappHref({
    destination: values.destination,
    degree: values.degree,
    intake: values.intake,
    name: values.name,
  });

  const announcement = done
    ? "Enquiry logged. A GO counsellor calls you within 15 minutes, 9 AM to 9 PM IST."
    : `Step ${step + 1} of ${TOTAL_STEPS}: ${STEP_TITLES[step]}`;

  return (
    <section
      id="enquiry"
      style={CHAPTER_AXIS}
      className="relative bg-paper-tracing py-section-y"
    >
      <Container>
        <SectionHeading
          chapter="VI"
          chapterName="SUCCESS"
          eyebrow="SIX FIELDS · THREE OF THEM TAPS"
          deck="No cost, no obligation. 30–45 minutes with an admissions counsellor."
        >
          Free guidance session
        </SectionHeading>

        {/* Step announcements. Present from first paint so changes are spoken. */}
        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>

        <div className="mt-12 grid gap-grid-gap md:mt-16 md:grid-cols-12">
          {/* ---------------------------------------------------------------
              THE FORM — a sheet laid on the tracing bed, 3px out of register.
              --------------------------------------------------------------- */}
          <div className="md:col-span-7">
            <div className="relative border border-rule-strong bg-paper p-6 shadow-reg-sienna sm:p-8">
              {done ? (
                <Confirmation values={values} />
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  aria-label="Book a free guidance session"
                  className="relative flex flex-col"
                >
                  {/* Honeypot. Off-screen, unfocusable, hidden from AT. */}
                  <div
                    aria-hidden="true"
                    className="absolute h-px w-px overflow-hidden"
                    style={{ left: "-9999px", top: "auto" }}
                  >
                    <label htmlFor={honeypotId}>Company</label>
                    <input
                      ref={honeypotRef}
                      id={honeypotId}
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </div>

                  <StepProgress step={step} title={STEP_TITLES[step]} />

                  {/* Fixed floor under the step area: with `mode="wait"` the
                      outgoing step unmounts before the next one mounts, and
                      without this the footer would collapse and rebound. */}
                  <div className="mt-8 min-h-[22rem] sm:min-h-[19rem]">
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                      <motion.div
                        key={step}
                        custom={direction}
                        variants={stepTransition}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        {step === 0 && (
                          <StepDestination
                            values={values}
                            errors={errors}
                            onChange={(value) => setField("destination", value)}
                          />
                        )}
                        {step === 1 && (
                          <StepStudy
                            values={values}
                            errors={errors}
                            onDegreeChange={(value) => setField("degree", value)}
                            onIntakeChange={(value) => setField("intake", value)}
                          />
                        )}
                        {step === 2 && (
                          <StepContact
                            values={values}
                            errors={errors}
                            onChange={setField}
                            onMarketingChange={(value) =>
                              dispatch({ type: "marketing", value })
                            }
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {step > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dispatch({ type: "back" })}
                        className="shrink-0"
                      >
                        <Icon as={ArrowLeft} size="sm" />
                        Back
                      </Button>
                    )}

                    {/* The glyphs here point; they never carry the word. Each
                        control keeps its own visible label, so `label` is
                        withheld and the icons stay decoration. */}
                    {isLastStep ? (
                      <Button
                        type="submit"
                        size="lg"
                        aria-disabled={status !== "idle"}
                        className="min-w-0 grow"
                      >
                        {status === "pending" ? "Sending" : SUBMIT_LABEL}
                        <Icon as={Send} size="sm" />
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        onClick={() => dispatch({ type: "next" })}
                        className="min-w-0 grow"
                      >
                        Continue
                        <Icon as={ArrowRight} size="sm" />
                      </Button>
                    )}
                  </div>

                  {/* Proof line + published callback promise, under the submit. */}
                  <p className="mt-4 font-mono text-caption text-ink-muted">
                    {CTA_SUBLABEL}
                  </p>
                  <p className="mt-1 font-mono text-caption text-ink-muted">
                    {PROOF_LINE}
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* ---------------------------------------------------------------
              EQUAL SIBLINGS — call and WhatsApp. Real anchors, JS-free.
              --------------------------------------------------------------- */}
          <aside className="flex flex-col gap-6 md:col-span-5 md:border-l md:border-rule md:pl-8">
            <div>
              <h3 className="font-display text-d2 opsz-32 text-ink">
                Or just talk to us.
              </h3>
              <p className="mt-3 max-w-prose font-ui text-body text-ink-muted">
                Some families would rather not type anything. Both of these
                reach the same desk as the form, and both work with JavaScript
                switched off.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                href={GO_PHONE_HREF}
                variant="secondary"
                size="md"
                fullWidth
              >
                <Icon as={Phone} size="sm" />
                Call {GO_PHONE_DISPLAY}
              </Button>
              <Button
                href={wa}
                variant="secondary"
                size="md"
                fullWidth
                target="_blank"
                rel="noopener"
              >
                <Icon as={MessageCircle} size="sm" />
                WhatsApp us
              </Button>
            </div>

            <p className="font-ui text-body-sm text-ink-muted">
              {chosenDestination
                ? `Your WhatsApp message is already written, with ${chosenDestination} filled in.`
                : "Tap a destination and the WhatsApp message writes itself."}
            </p>

            <Rule weight="chapter" />

            <dl className="flex flex-col gap-1">
              <dt className="font-ui text-label uppercase text-ink-muted">
                Callback window
              </dt>
              <dd className="font-mono text-data text-ink tabular-figures">
                09:00–21:00 IST · SEVEN DAYS
              </dd>
            </dl>

            <p className="max-w-prose font-ui text-body-sm text-ink-muted">
              Or walk in. Every office is listed with its street address and its
              own phone number at the foot of this page.
            </p>

            <Rule weight="chapter" />

            <p className="font-mono text-mono-label uppercase text-ink-muted">
              {ACCREDITATION_ROW}
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
