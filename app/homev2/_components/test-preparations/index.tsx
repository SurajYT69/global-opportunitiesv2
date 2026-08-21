import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import gmatImage from "./assets/gmat.png";
import greImage from "./assets/gre.png";
import ieltsImage from "./assets/ielts.png";
import pteImage from "./assets/pte.png";
import satImage from "./assets/sat.png";
import toeflImage from "./assets/toefl.png";

const exams: {
    name: string;
    category: string;
    scoreRange: string;
    description: string;
    href: string;
    image: StaticImageData;
}[] = [
    {
        name: "IELTS",
        category: "English Proficiency",
        scoreRange: "Band 1–9",
        description: "The world's most popular English test for study, work, and migration.",
        href: "#enquiry",
        image: ieltsImage,
    },
    {
        name: "TOEFL",
        category: "English Proficiency",
        scoreRange: "Score 0–120",
        description: "The English test widely preferred by universities in the USA and Canada.",
        href: "#enquiry",
        image: toeflImage,
    },
    {
        name: "PTE",
        category: "English Proficiency",
        scoreRange: "Score 10–90",
        description: "A fast, fully computer-based English test with results in just a few days.",
        href: "#enquiry",
        image: pteImage,
    },
    {
        name: "GRE",
        category: "Graduate Admissions",
        scoreRange: "Score 260–340",
        description: "The graduate admissions test for master's and PhD programs worldwide.",
        href: "#enquiry",
        image: greImage,
    },
    {
        name: "SAT",
        category: "Undergraduate Admissions",
        scoreRange: "Score 400–1600",
        description: "The standardised test for undergraduate admissions in the USA and beyond.",
        href: "#enquiry",
        image: satImage,
    },
    {
        name: "GMAT",
        category: "Business School",
        scoreRange: "Score 205–805",
        description: "The business school admissions test for MBA and management programs.",
        href: "#enquiry",
        image: gmatImage,
    },
];

export function TestPreparations() {
    return (
        <section className="py-section-y">

            <div className="mx-auto w-full max-w-content px-gutter">
                <div className="max-w-2xl">
                    <p className="text-label uppercase text-ink-faint">
                        Achieve Your Best Score
                    </p>
                    <h2 className="mt-3 font-display text-title text-ink">
                        Test Preparations
                    </h2>
                </div>

                <div className="mt-6 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {exams.map((exam) => (
                        <article
                            key={exam.name}
                            className="group relative flex gap-4 rounded-2 bg-secondary p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-muted"
                        >
                            <div className="relative h-28 w-36 shrink-0 self-center overflow-hidden rounded-2">
                                <Image
                                    src={exam.image}
                                    alt={`${exam.name} test preparation`}
                                    fill
                                    sizes="144px"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <span className="absolute bottom-1.5 left-1.5 rounded-1 bg-endpaper/80 px-1.5 py-0.5 text-label uppercase font-bold text-white backdrop-blur-sm">
                                    {exam.scoreRange}
                                </span>
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-label uppercase text-ink-faint">
                                    {exam.category}
                                </p>
                                <h3 className="mt-1 flex items-center justify-between gap-2 text-heading text-ink">
                                    <Link href={exam.href} className="transition-colors group-hover:text-marine">
                                        <span className="absolute inset-0" aria-hidden />
                                        {exam.name}
                                    </Link>
                                    <span
                                        aria-hidden
                                        className="grid size-8 shrink-0 place-items-center rounded-full bg-sienna-tint text-marine transition-all duration-300 group-hover:bg-sienna-press group-hover:text-white"
                                    >
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                                        >
                                            <path d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </h3>
                                <p className="mt-1 text-small text-muted-foreground">
                                    {exam.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="relative mt-6 overflow-hidden rounded-2 bg-endpaper px-6 py-5 text-white">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] bg-size-[22px_22px] opacity-40"
                    />
                    <div className="relative flex flex-wrap items-center justify-between gap-4">
                        <p className="font-semibold">
                            Not sure which test is right for you?{" "}
                            <span className="font-normal text-plate-grey">
                                Our experts will guide you based on your dream course &amp; destination.
                            </span>
                        </p>
                        <Link
                            href="#enquiry"
                            className="group flex shrink-0 items-center gap-2 rounded-full bg-sienna-press px-5 py-2.5 text-body font-semibold transition-colors hover:bg-sienna-deep"
                        >
                            Get Free Guidance
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
            </div>
        </section>
    );
}
