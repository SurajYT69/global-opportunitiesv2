"use client";

import { useRef } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from "framer-motion";

const steps: { title: string; description: string }[] = [
    { title: "Register", description: "Create your free profile in minutes." },
    { title: "Walk in to Nearest Office", description: "Meet our expert counsellors in 18+ cities." },
    { title: "Share Documents", description: "Submit your academics, scores & passport." },
    { title: "Shortlisting & Application", description: "We shortlist courses that fit your profile." },
    { title: "Apply For University", description: "We file error-free applications for you." },
    { title: "Visa & Offer Letter", description: "Receive your offer & fly with visa support." },
];

function StepItem({
    index,
    title,
    description,
    progress,
    staticRender,
}: {
    index: number;
    title: string;
    description: string;
    progress: MotionValue<number>;
    staticRender: boolean;
}) {
    const start = index / steps.length;
    const end = (index + 0.6) / steps.length;
    const fill = useTransform(progress, [start, end], [0, 1]);
    const x = useTransform(progress, [start, end], [24, 0]);
    const contentOpacity = useTransform(progress, [start, end], [0.35, 1]);

    return (
        <li className="relative flex items-center gap-5">
            <div className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-white text-body font-semibold text-ink-faint ring-2 ring-rule">
                <span>{index + 1}</span>
                <motion.span
                    style={staticRender ? undefined : { opacity: fill }}
                    className="absolute inset-0 grid place-items-center rounded-full bg-linear-to-br from-sienna-press to-sienna-deep text-white"
                >
                    {index + 1}
                </motion.span>
            </div>
            <motion.div style={staticRender ? undefined : { x, opacity: contentOpacity }}>
                <p className="font-bold text-ink">{title}</p>
                <p className="mt-0.5 text-small text-muted-foreground">{description}</p>
            </motion.div>
        </li>
    );
}

export function OurProcess() {
    const containerRef = useRef<HTMLOListElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.75", "end 0.55"],
    });
    const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

    const staticRender = Boolean(prefersReducedMotion);

    return (
        <div className="lg:pl-8">
            <p className="text-label uppercase text-ink-faint">
                How It Works
            </p>
            <h3 className="mt-3 text-heading text-ink">Our Process</h3>

            <ol ref={containerRef} className="relative mt-8 flex flex-col gap-9">
                {/* track */}
                <span aria-hidden className="absolute bottom-6 left-6 top-6 w-0.5 -translate-x-1/2 rounded-full bg-rule" />
                {/* scroll-linked progress line */}
                <motion.span
                    aria-hidden
                    style={staticRender ? undefined : { scaleY: progress }}
                    className="absolute bottom-6 left-6 top-6 w-0.5 origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-sienna-press to-marine"
                />
                {steps.map((step, index) => (
                    <StepItem
                        key={step.title}
                        index={index}
                        title={step.title}
                        description={step.description}
                        progress={progress}
                        staticRender={staticRender}
                    />
                ))}
            </ol>
        </div>
    );
}
