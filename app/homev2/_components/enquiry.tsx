"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { NativeSelect } from "@/components/shadcn/native-select";
import { STATIONS } from "@/app/(home)/_components/branch-atlas/branches";
import { DESTINATIONS } from "@/app/(home)/_components/gazetteer/data";

/* ===========================================================================
   ENQUIRY — one screen
   ---------------------------------------------------------------------------
   `/` runs this as a three-step machine: a useReducer, a progress bar, four
   step components and a confirmation, across ~1,000 lines. Six fields do not
   need a state machine. This is one screen, one useState, and native
   validation.

   NATIVE SELECT, NOT RADIX SELECT. Three dropdowns of long, boring options on
   a marketing form: a native <select> gets the platform picker on mobile
   (which is better than any popover), needs no JavaScript to open, and ships
   nothing. Radix's Select is installed and is the right call when options need
   custom rendering — these do not.

   OPTIONS ARE IMPORTED, not retyped: branches from branch-atlas/branches.ts,
   destinations from gazetteer/data.ts. The intake windows are GO's own, read
   off global-opportunities.net on 2026-08-21.

   COMPLIANCE, load-bearing:
     · The CTA is "Book a free guidance session". "Free counselling" is banned
       site-wide, and it is the phrase GO's own live homepage currently uses —
       do not copy it back in.
     · The qualifier under the button is canon copy: no cost, no obligation,
       30–45 minutes with an admissions counsellor.
     · No promise about a visa or an admission appears anywhere on this form.

   NO BACKEND. There is no endpoint to post to yet, so submit is intercepted
   and the form renders its own confirmation. Wire `onSubmit` to the real
   handler when there is one — do NOT add a fake success state that pretends a
   lead was captured when it was not.
   ======================================================================== */

const INTAKES = [
  "Sep 2026 – Dec 2026",
  "Jan 2027 – Apr 2027",
  "May 2027 – Aug 2027",
  "Sep 2027 – Dec 2027",
] as const;

/**
 * OFFICE options — 16, deliberately NOT the 15 of CITY_COUNT/CITY_NAMES.
 *
 * Those two collapse "Delhi South" and "Delhi West" into one city, which is
 * the right answer for the claim "18 offices in 15 cities". It is the WRONG
 * answer here: this is a picker for the office a person will physically walk
 * into, and someone in Delhi has to be able to choose between the two. GO's
 * own enquiry form lists them separately for the same reason.
 *
 * So the count mismatch against the footer is intentional. Do not "fix" it to
 * CITY_NAMES.
 */
const OFFICES = [...new Set(STATIONS.map((s) => s.city))].sort();

export default function Enquiry() {
  const [sent, setSent] = useState(false);

  return (
    <section id="enquiry" className="scroll-mt-20 bg-secondary py-section-y">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <header className="flex max-w-prose flex-col gap-4">
          <p className="text-caption text-muted-foreground">
            Talk to someone
          </p>
          <h2 className="text-d2 text-ink">Book a free guidance session.</h2>
          <p className="text-body text-muted-foreground">
            No cost, no obligation. Thirty to forty-five minutes with an
            admissions counsellor who will tell you what your marks and your
            budget can actually reach.
          </p>
          <p className="text-body-sm text-muted-foreground">
            Between 9 AM and 9 PM IST a counsellor calls within fifteen minutes.
            Outside those hours, the next morning — we do not call at night.
          </p>
          <p className="font-mono text-body-sm text-muted-foreground tabular-figures">
            Or call 1800 111 119, free from any Indian number.
          </p>
        </header>

        {sent ? (
          /* Deliberately modest: this says the form was completed, NOT that a
             lead reached anyone, because there is no endpoint behind it yet. */
          <div
            role="status"
            className="flex flex-col gap-3 self-start rounded-2 bg-background p-6"
          >
            <h3 className="text-h4 text-ink">Details captured</h3>
            <p className="text-body text-muted-foreground">
              This form is not connected to a backend yet, so nothing has been
              sent. Call 1800 111 119 and a counsellor will pick up between 9 AM
              and 9 PM IST.
            </p>
            <p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-body text-sienna underline underline-offset-4"
              >
                Edit the details
              </button>
            </p>
          </div>
        ) : (
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Your name">
                <Input id="name" name="name" autoComplete="name" required />
              </Field>

              <Field id="phone" label="Phone">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  className="font-mono tabular-figures"
                />
              </Field>
            </div>

            <Field id="email" label="Email">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="branch" label="Nearest office">
                <NativeSelect id="branch" name="branch" defaultValue="" required>
                  <option value="" disabled>
                    Select a city
                  </option>
                  {OFFICES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </NativeSelect>
              </Field>

              <Field id="destination" label="Destination">
                <NativeSelect
                  id="destination"
                  name="destination"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  {DESTINATIONS.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                  <option value="undecided">Not decided yet</option>
                </NativeSelect>
              </Field>
            </div>

            <Field id="intake" label="Intake you are aiming for">
              <NativeSelect id="intake" name="intake" defaultValue="" required>
                <option value="" disabled>
                  Select an intake
                </option>
                {INTAKES.map((intake) => (
                  <option key={intake} value={intake}>
                    {intake}
                  </option>
                ))}
              </NativeSelect>
            </Field>

            <div className="flex flex-col gap-3">
              <Button type="submit" size="lg" fullWidth>
                Book a free guidance session
              </Button>
              <p className="text-footnote text-muted-foreground">
                No cost, no obligation. 30–45 minutes with an admissions
                counsellor. We never ask for payment over WhatsApp, and no
                counsellor will ask you to transfer money to a personal account.
              </p>
            </div>
          </form>
        )}
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-body-sm text-ink">
        {label}
      </Label>
      {children}
    </div>
  );
}
