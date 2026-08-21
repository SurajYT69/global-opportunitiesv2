import type { ReactNode } from "react";
import { OurProcess } from "./our-process";

const services: { label: string; description: string; icon: ReactNode }[] = [
    {
        label: "Education Counselling",
        description: "Personalised guidance from expert counsellors.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <path d="M12 6C10 4.5 7 4 3 4v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2Zm0 0v14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Selection of Course",
        description: "Find your perfect course fit.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <path d="M6 3h9l4 4v14H6V3Zm9 0v4h4M9 12h6m-6 4h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Financial Estimation",
        description: "Plan your study budget smartly.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <rect x="3" y="7" width="18" height="12" rx="2" />
                <circle cx="12" cy="13" r="2.5" />
                <path d="M7 7V5h10v2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Profile Shortlisting",
        description: "Universities matched to your profile.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <path d="M4 6h10M4 12h10M4 18h6m5-2 2.5 2.5L21 14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "GIC Account",
        description: "Easy GIC setup for Canada.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <circle cx="12" cy="12" r="8" />
                <path d="M14.5 9.5a3 3 0 1 0 0 5M12 6.5v-2m0 15v-2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Country Information",
        description: "Know your destination inside out.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
            </svg>
        ),
    },
    {
        label: "Admission Guidance",
        description: "Applications done right, on time.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="9" cy="11" r="2" />
                <path d="M6.5 16a2.5 2.5 0 0 1 5 0M15 9h3m-3 3h3m-3 3h2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Interview Preparation",
        description: "Mock sessions that build confidence.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Visa Services",
        description: "Stress-free visa filing support.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <circle cx="12" cy="10" r="3" />
                <path d="M8 16h8" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Medical Insurance",
        description: "Right coverage for students abroad.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z" strokeLinejoin="round" />
                <path d="M12 8.5v6M9 11.5h6" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Travel Guidance",
        description: "Smooth journey from day one.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <path d="M10.5 13.5 3 11l1.5-1.5L10 10l4-4.5c.5-.5 1.5-1 2 0s0 1.5 0 1.5L11.5 11l.5 5.5L10.5 18l-2-4.5-4.5-2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 20h16" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Accommodation",
        description: "Safe housing near your campus.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <path d="M3 18v-8l9-6 9 6v8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 18h18M9 18v-5h6v5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Forex Exchange",
        description: "Best rates for overseas transfers.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <path d="M4 7h13m0 0-3-3m3 3-3 3M20 17H7m0 0 3-3m-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Education Loan",
        description: "Funding support made simple.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4.5">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <circle cx="12" cy="12" r="2.5" />
                <path d="M6 9h.01M18 15h.01" strokeLinecap="round" />
            </svg>
        ),
    },
];

/* PORTED 2026-08-21 from the sibling repo (global-oppertunities-nextjs).
   Design tokens were remapped onto the GO palette: their `primary` -> marine
   (GO Navy), `accent` -> sienna-press (GO Red), `primary-light` -> sienna-tint,
   `accent-dark` -> sienna-deep. Their `secondary` was a DARK navy used for
   text; ours is a pale cream, so `text-secondary` became `text-ink` rather
   than being left to render invisible.

   `id="how-it-works"` IS LOAD-BEARING. This section replaced the standalone
   how-it-works section — it renders the same five-step flow in its
   <OurProcess> column — and the masthead still links to that anchor. Without
   the id the "How it works" nav item scrolls nowhere. */
export function WaysWeAssist() {
    return (
        <section id="how-it-works" className="scroll-mt-20 py-section-y">

            <div className="mx-auto grid w-full max-w-content gap-12 px-gutter lg:grid-cols-[1.25fr_1fr] lg:gap-16">
                <div>
                    <p className="text-label uppercase text-ink-faint">
                        End-To-End Support
                    </p>
                    <h2 className="mt-3 font-display text-title text-ink">
                        Ways We Can Assist You
                    </h2>

                    <ul className="mt-8 grid auto-rows-fr gap-3 sm:grid-cols-2">
                        {services.map((service, index) => (
                            <li
                                key={service.label}
                                className="group flex items-center gap-3.5 rounded-2 bg-secondary p-3.5 transition-colors duration-200 hover:bg-muted"
                            >
                                <span
                                    className={`grid size-10 shrink-0 place-items-center rounded-2 transition-all duration-300 group-hover:bg-marine group-hover:text-white ${
                                        index % 2 === 0
                                            ? "bg-sienna-tint text-marine"
                                            : "bg-sienna-tint text-marine"
                                    }`}
                                >
                                    {service.icon}
                                </span>
                                <span className="min-w-0">
                                    <span className="block text-body font-semibold text-ink transition-colors duration-300 group-hover:text-marine">
                                        {service.label}
                                    </span>
                                    <span className="mt-0.5 block text-small text-muted-foreground">
                                        {service.description}
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <OurProcess />
            </div>
        </section>
    );
}
