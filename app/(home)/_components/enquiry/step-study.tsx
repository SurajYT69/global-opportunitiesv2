"use client";

import { BookOpen, CalendarDays } from "lucide-react";
import { ChipGroup } from "./chip-group";
import { DEGREE_LEVELS, INTAKES } from "./data";
import type { EnquiryErrors, EnquiryValues } from "./state";

/**
 * Step 2 of 3 — degree level and intake. Two taps, still no typing and still
 * no personal data. Commitment escalates before anything identifying is asked.
 */
export interface StepStudyProps {
  values: EnquiryValues;
  errors: EnquiryErrors;
  onDegreeChange: (value: string) => void;
  onIntakeChange: (value: string) => void;
}

export function StepStudy({
  values,
  errors,
  onDegreeChange,
  onIntakeChange,
}: StepStudyProps) {
  return (
    <div className="flex flex-col gap-8">
      <ChipGroup
        name="degree"
        legend="What are you applying for"
        icon={BookOpen}
        options={DEGREE_LEVELS}
        value={values.degree}
        onChange={onDegreeChange}
        error={errors.degree}
        columns={3}
      />

      <ChipGroup
        name="intake"
        legend="Which intake are you aiming at"
        icon={CalendarDays}
        options={INTAKES}
        value={values.intake}
        onChange={onIntakeChange}
        error={errors.intake}
        columns={3}
      />
    </div>
  );
}
