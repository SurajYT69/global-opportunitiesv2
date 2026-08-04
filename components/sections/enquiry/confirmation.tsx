"use client";

import { useEffect, useRef } from "react";
import { CircleCheck, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Rule } from "@/components/ui/rule";
import {
  GO_PHONE_DISPLAY,
  GO_PHONE_HREF,
  PROOF_LINE,
  degreeLabel,
  destinationLabel,
  intakeLabel,
  whatsappHref,
} from "./data";
import { normaliseMobile } from "./state";
import type { EnquiryValues } from "./state";

/**
 * The success state. Replaces the form in place.
 *
 * There is no backend in v1: the submit is simulated. What is real is the
 * routing — the WhatsApp deep link carries every choice the student made, and
 * the toll-free number is a live `tel:` anchor. Both survive JavaScript being
 * switched off, and both sit as visually equal siblings (research-cro.md:
 * WhatsApp enquiry response in India is 60–70% against 20–30% for web forms).
 *
 * Focus moves here on mount because the form the user was operating no longer
 * exists in the DOM.
 */
export interface ConfirmationProps {
  values: EnquiryValues;
}

function formatMobile(raw: string): string {
  const digits = normaliseMobile(raw);
  if (digits.length !== 10) return `+91 ${digits}`;
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export function Confirmation({ values }: ConfirmationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const rows: { label: string; value: string }[] = [
    { label: "Name", value: values.name.trim() },
    { label: "Mobile", value: formatMobile(values.mobile) },
    { label: "Destination", value: destinationLabel(values.destination) },
    { label: "Degree level", value: degreeLabel(values.degree) },
    { label: "Intake", value: intakeLabel(values.intake) },
  ];

  const email = values.email.trim();
  if (email) rows.push({ label: "Email", value: email });

  const wa = whatsappHref({
    destination: values.destination,
    degree: values.degree,
    intake: values.intake,
    name: values.name,
  });

  return (
    <div className="flex flex-col gap-6">
      {/* The mark rides the STATUS line rather than standing in for it — the
          word LOGGED is what says the enquiry landed, in every mode. */}
      <p className="flex items-center gap-2 font-mono text-mono-label uppercase text-verdigris">
        <Icon as={CircleCheck} size="sm" />
        STATUS: LOGGED
      </p>

      <h3
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-d2 opsz-32 text-ink"
      >
        Your counsellor has your number.
      </h3>

      <p className="max-w-prose font-ui text-body text-ink-muted">
        A named GO counsellor — the one who covers{" "}
        {destinationLabel(values.destination) || "your destination"} — calls you
        within 15 minutes, between 9 AM and 9 PM IST. If you sent this outside
        those hours, the first call comes at 9 AM. They will introduce
        themselves by name, and that is the person who stays with your file.
      </p>

      <Rule weight="chapter" />

      <dl className="grid grid-cols-1 gap-x-8 gap-y-3 xs:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1">
            <dt className="font-ui text-label uppercase text-ink-muted">
              {row.label}
            </dt>
            <dd className="font-mono text-data text-ink tabular-figures">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <Rule weight="chapter" />

      <div>
        <p className="font-ui text-label uppercase text-ink-muted">
          Rather not wait
        </p>
        <div className="mt-4 flex flex-col gap-3 xs:flex-row">
          <Button
            href={wa}
            variant="secondary"
            size="md"
            className="xs:flex-1"
            rel="noopener"
            target="_blank"
          >
            <Icon as={MessageCircle} size="sm" />
            WhatsApp us
          </Button>
          <Button
            href={GO_PHONE_HREF}
            variant="secondary"
            size="md"
            className="xs:flex-1"
          >
            <Icon as={Phone} size="sm" />
            Call {GO_PHONE_DISPLAY}
          </Button>
        </div>
        <p className="mt-3 font-ui text-body-sm text-ink-muted">
          The WhatsApp message is already written with what you chose. Send it
          as it is, or change it first.
        </p>
      </div>

      <p className="font-mono text-caption uppercase text-ink-muted">
        {PROOF_LINE}
      </p>
    </div>
  );
}
