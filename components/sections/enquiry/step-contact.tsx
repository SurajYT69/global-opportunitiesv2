"use client";

import { useId } from "react";
import { Mail, Smartphone, User } from "lucide-react";
import { Field } from "./field";
import type { EnquiryErrors, EnquiryValues, FieldKey } from "./state";

/**
 * Step 3 of 3 — the only personal data on the page, asked last.
 *
 * Name + mobile are the whole ask; email is optional and labelled *optional*
 * rather than the required fields being asterisked (Baymard 2024: ~25% lift).
 * `+91` is set type beside the caret, never an input.
 *
 * Two consents, deliberately separate (DPDP Rules, enforceable May 2027):
 *   1. IMPLIED — sending the form asks for a call about this enquiry. Stated
 *      in plain words with its retention period, not hidden in a checkbox.
 *   2. MARKETING — one unticked checkbox, itemised purpose, withdrawable,
 *      and it changes nothing about the call. TCCCPR: no promotional contact
 *      between 9 PM and 9 AM.
 */
export interface StepContactProps {
  values: EnquiryValues;
  errors: EnquiryErrors;
  onChange: (field: FieldKey, value: string) => void;
  onMarketingChange: (value: boolean) => void;
}

export function StepContact({
  values,
  errors,
  onChange,
  onMarketingChange,
}: StepContactProps) {
  const consentId = useId();

  return (
    <div className="flex flex-col gap-7">
      <Field
        label="Your name"
        icon={User}
        name="name"
        value={values.name}
        onChange={(value) => onChange("name", value)}
        autoComplete="name"
        error={errors.name}
        hint="The name your counsellor should ask for."
      />

      <Field
        label="Mobile number"
        icon={Smartphone}
        name="mobile"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        adornment="+91"
        maxLength={13}
        value={values.mobile}
        onChange={(value) => onChange("mobile", value)}
        error={errors.mobile}
        hint="Ten digits. This is the number we call — the +91 is already applied."
      />

      <Field
        label="Email"
        icon={Mail}
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        optional
        value={values.email}
        onChange={(value) => onChange("email", value)}
        error={errors.email}
        hint="Only if you want the written summary as well as the call."
      />

      <div className="flex flex-col gap-4 border-t border-rule pt-6">
        <p className="max-w-prose font-ui text-body-sm text-ink-muted">
          Sending this asks a GO counsellor to call you about this enquiry, and
          nothing else. We keep what you enter for 24 months so your counsellor
          can follow up, then delete it. Ask us to delete it sooner and we will.
        </p>

        <label
          htmlFor={consentId}
          className="flex min-h-12 cursor-pointer items-start gap-3"
        >
          <input
            id={consentId}
            name="marketing-consent"
            type="checkbox"
            checked={values.marketing}
            onChange={(event) => onMarketingChange(event.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 rounded-0 border border-rule-strong accent-sienna-press"
          />
          <span className="max-w-prose font-ui text-body-sm text-ink-muted">
            Separately: send me intake deadlines, scholarship dates and
            invitations to GO Application Days on WhatsApp, SMS and email.
            Leaving this unticked changes nothing about your call. We send
            nothing promotional between 9 PM and 9 AM, and you can stop it at
            any time.
          </span>
        </label>
      </div>
    </div>
  );
}
