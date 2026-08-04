"use client";

import { MapPin } from "lucide-react";
import { ChipGroup } from "./chip-group";
import { DESTINATIONS } from "./data";
import type { EnquiryErrors, EnquiryValues } from "./state";

/**
 * Step 1 of 3 — destination. One tap, no typing. Zero-friction entry and the
 * counsellor-routing signal in a single gesture; it also seeds the WhatsApp
 * deep link, so a student who abandons the form still leaves routed.
 */
export interface StepDestinationProps {
  values: EnquiryValues;
  errors: EnquiryErrors;
  onChange: (value: string) => void;
}

export function StepDestination({
  values,
  errors,
  onChange,
}: StepDestinationProps) {
  return (
    <div className="flex flex-col gap-6">
      <ChipGroup
        name="destination"
        legend="Where are you thinking of studying"
        icon={MapPin}
        hint="One tap. Nothing is fixed — you can change it on the call."
        options={DESTINATIONS}
        value={values.destination}
        onChange={onChange}
        error={errors.destination}
        columns={4}
      />
    </div>
  );
}
