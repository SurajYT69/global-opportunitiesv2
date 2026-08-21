import Link from "next/link";
import { ReviewsCarousel } from "./carousel";

export function Reviews() {
    /* overflow-x-clip, not overflow-hidden: the carousel parks its side cards
       outside the viewport on purpose, and without a clip they add 92px of
       horizontal page scroll. `clip` keeps the y axis visible, so nothing
       inside loses sticky positioning. */
    return (
        <section className="overflow-x-clip py-section-y">
            <div className="mx-auto w-full max-w-content px-gutter">
                <div className="max-w-2xl">
                    <p className="text-label uppercase text-ink-faint">
                        Trusted By 100,000+ Students
                    </p>
                    <h2 className="mt-3 font-display text-title text-ink">
                        Students&apos; Reviews
                    </h2>
                </div>

                <div className="mt-8">
                    <ReviewsCarousel />
                </div>

                {/* CENTRED, not left-ranged (2026-08-21, client). The carousel and its
                    dot pagination are both centred on the column, so a CTA hard
                    against the left gutter read as belonging to the heading above
                    rather than to the rail it closes. */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {/* The ported version had TWO buttons here, to
                        /write-review and /reviews. Neither route exists in
                        this project — both returned 404 — so they were
                        replaced with the one CTA the page can actually honour.
                        Restore them if those routes get built. */}
                    <Link
                        href="#enquiry"
                        className="group flex items-center gap-2 rounded-full bg-sienna-press px-6 py-3 text-body font-semibold text-white transition-colors hover:bg-sienna-deep"
                    >
                        Book a free guidance session
                        <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="size-4 transition-transform group-hover:translate-x-0.5"
                        >
                            <path d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
