/**
 * THE FIRST CALL — reducer + validation for `#enquiry`.
 *
 * Six fields total, three of them non-PII taps, PII last (research-cro.md:
 * students are ~3.2x more likely to disclose sensitive data after clearing
 * earlier steps). Back navigation preserves every entry — the reducer never
 * clears a value, only errors.
 */

export type StepIndex = 0 | 1 | 2;
export const TOTAL_STEPS = 3;

export type FieldKey =
  | "destination"
  | "degree"
  | "intake"
  | "name"
  | "mobile"
  | "email";

export interface EnquiryValues {
  destination: string;
  degree: string;
  intake: string;
  name: string;
  mobile: string;
  email: string;
  /** Unticked by default. SEPARATE from the implied consent to be called. */
  marketing: boolean;
}

export type EnquiryErrors = Partial<Record<FieldKey, string>>;

export type SubmitStatus = "idle" | "pending" | "done";

export interface EnquiryState {
  step: StepIndex;
  /** 1 = forward, -1 = back. Drives the direction-aware step transition. */
  direction: 1 | -1;
  values: EnquiryValues;
  errors: EnquiryErrors;
  status: SubmitStatus;
  /** ISO timestamp of the consent decision — DPDP requires it be logged. */
  consentedAt: string | null;
}

export const initialEnquiryState: EnquiryState = {
  step: 0,
  direction: 1,
  values: {
    destination: "",
    degree: "",
    intake: "",
    name: "",
    mobile: "",
    email: "",
    marketing: false,
  },
  errors: {},
  status: "idle",
  consentedAt: null,
};

export type EnquiryAction =
  | { type: "set"; field: FieldKey; value: string }
  | { type: "marketing"; value: boolean }
  | { type: "next" }
  | { type: "back" }
  | { type: "submit" }
  | { type: "submitted" };

/* ---------------------------------------------------------------------------
   VALIDATION
   Inline, plain-language, never blaming. No asterisks anywhere — optional
   fields are labelled "optional" instead (Baymard 2024).
   ------------------------------------------------------------------------ */

const DIGITS = /\D+/g;
/** Deliberately permissive: one @, a dot in the domain, no spaces. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normaliseMobile(raw: string): string {
  return raw.replace(DIGITS, "").slice(-10);
}

export function validateStep(
  step: StepIndex,
  values: EnquiryValues,
): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (step === 0) {
    if (!values.destination) {
      errors.destination = "Tap the place you have in mind. Change it later if you like.";
    }
    return errors;
  }

  if (step === 1) {
    if (!values.degree) {
      errors.degree = "Tap the level you are applying for.";
    }
    if (!values.intake) {
      errors.intake = "Tap the intake you are aiming at.";
    }
    return errors;
  }

  if (values.name.trim().length < 2) {
    errors.name = "Tell us the name your counsellor should ask for.";
  }

  const mobile = normaliseMobile(values.mobile);
  if (mobile.length !== 10 || !/^[6-9]/.test(mobile)) {
    errors.mobile = "Enter the 10-digit mobile number we should call.";
  }

  const email = values.email.trim();
  if (email && !EMAIL.test(email)) {
    errors.email = "That email address looks incomplete. You can leave it blank.";
  }

  return errors;
}

export const hasErrors = (errors: EnquiryErrors) =>
  Object.keys(errors).length > 0;

/* ---------------------------------------------------------------------------
   REDUCER
   ------------------------------------------------------------------------ */

export function enquiryReducer(
  state: EnquiryState,
  action: EnquiryAction,
): EnquiryState {
  switch (action.type) {
    case "set": {
      // Editing a field clears that field's error and nothing else.
      const errors: EnquiryErrors = { ...state.errors };
      delete errors[action.field];
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors,
      };
    }

    case "marketing":
      return {
        ...state,
        values: { ...state.values, marketing: action.value },
        consentedAt: new Date().toISOString(),
      };

    case "next": {
      const errors = validateStep(state.step, state.values);
      if (hasErrors(errors)) return { ...state, errors };
      if (state.step >= TOTAL_STEPS - 1) return state;
      return {
        ...state,
        step: (state.step + 1) as StepIndex,
        direction: 1,
        errors: {},
      };
    }

    case "back": {
      if (state.step === 0) return state;
      // Values are never cleared — every earlier entry survives the trip back.
      return {
        ...state,
        step: (state.step - 1) as StepIndex,
        direction: -1,
        errors: {},
      };
    }

    case "submit": {
      const errors = validateStep(state.step, state.values);
      if (hasErrors(errors)) return { ...state, errors };
      return { ...state, errors: {}, status: "pending" };
    }

    case "submitted":
      return { ...state, status: "done" };

    default:
      return state;
  }
}
