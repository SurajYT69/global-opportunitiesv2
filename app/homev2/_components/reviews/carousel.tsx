"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import aashirwadJain from "./assets/aashirwad-jain.jpg";
import dhairyaNayyar from "./assets/dhairya-nayyar.jpg";
import patelMisva from "./assets/patel-misva.jpg";
import rittikPanchal from "./assets/rittik-panchal.jpg";
import swatiJadav from "./assets/swati-jadav.jpg";

const reviews: {
    name: string;
    tag: string;
    text: string;
    image: StaticImageData;
}[] = [
    {
        name: "Rittik Panchal",
        tag: "Master's in UK",
        text: "Global Opportunity has been a great support in my journey to study in the UK for masters. From the very beginning, they guided me at every step and made the entire process smooth and hassle-free. I would especially like to thank Mr. Avinash, my counselor, who went above and beyond to help me.",
        image: rittikPanchal,
    },
    {
        name: "Dhairya Nayyar",
        tag: "IELTS",
        text: "Such a fantastic experience with Global Opportunities and successfully getting my visa months before my course started. Special thanks to the team, especially Mr. Anjandeep, as he was so helpful throughout my journey and guided me in every possible way, along with Ms. Pallavi, who is also an excellent IELTS teacher.",
        image: dhairyaNayyar,
    },
    {
        name: "Aashirwad Jain",
        tag: "College Admission Process",
        text: "I recently went through the college admission process and it was a stressful and overwhelming experience. Thankfully, I had the help of a great counsellor, Ms. Monika, who made the process much smoother. She was always available to answer my questions and provide sound advice and support throughout.",
        image: aashirwadJain,
    },
    {
        name: "Swati Jadav",
        tag: "Seminar",
        text: "Global Opportunities is the best scope to go abroad. I have not attended a seminar like this; my interest to go abroad has increased with this session. I thank all the facilitators for the wonderful chance; I have informed all my friends about this too. Again, thank you for this session!",
        image: swatiJadav,
    },
    {
        name: "Patel Misva Alpesh Kumar",
        tag: "Seminar",
        text: "Global Opportunities is the best way to go abroad. I like this seminar; it is the best opportunity to improve my career. Thank you for the information!",
        image: patelMisva,
    },
];

function wrapOffset(index: number, active: number, total: number) {
    let offset = (index - active) % total;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
}

export function ReviewsCarousel() {
    const [active, setActive] = useState(0);
    const prefersReducedMotion = useReducedMotion();
    const total = reviews.length;

    const next = () => setActive((current) => (current + 1) % total);
    const prev = () => setActive((current) => (current - 1 + total) % total);

    return (
        <div className="relative">
            <div
                className="relative mx-auto h-105 max-w-5xl sm:h-100 lg:h-95"
                style={{ perspective: "1400px" }}
            >
                {reviews.map((review, index) => {
                    const offset = wrapOffset(index, active, total);
                    const isCenter = offset === 0;
                    const isVisible = Math.abs(offset) <= 1;

                    return (
                        <motion.div
                            key={review.name}
                            onClick={() => !isCenter && setActive(index)}
                            initial={false}
                            animate={{
                                x: `${offset * 106 - 50}%`,
                                rotateY: prefersReducedMotion ? 0 : offset * 18,
                                scale: prefersReducedMotion ? 1 : isCenter ? 1 : 0.88,
                                opacity: isVisible ? 1 : 0,
                                zIndex: 10 - Math.abs(offset),
                            }}
                            transition={
                                prefersReducedMotion
                                    ? { duration: 0 }
                                    : { type: "spring", stiffness: 240, damping: 28 }
                            }
                            style={{
                                transformStyle: "preserve-3d",
                                pointerEvents: isVisible ? "auto" : "none",
                            }}
                            className={`absolute left-1/2 top-0 h-full w-[80vw] py-3 sm:w-[52vw] lg:w-110 ${
                                isCenter ? "" : "cursor-pointer"
                            }`}
                        >
                            <article
                                className={`flex h-full flex-col rounded-2 p-6 ring-1 transition-colors duration-300 ${
                                    isCenter
                                        ? "bg-white ring-marine/25"
                                        : "bg-secondary ring-rule"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div aria-hidden className="flex gap-0.5 text-sienna-press">
                                        {Array.from({ length: 5 }, (_, star) => (
                                            <svg key={star} viewBox="0 0 20 20" fill="currentColor" className="size-4">
                                                <path d="m10 1.8 2.3 4.8 5.2.7-3.8 3.6.9 5.2L10 13.6l-4.6 2.5.9-5.2L2.5 7.3l5.2-.7L10 1.8Z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <svg
                                        aria-hidden
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className={`size-9 transition-colors duration-300 ${isCenter ? "text-sienna-press/25" : "text-marine/10"}`}
                                    >
                                        <path d="M10 7H6a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2v-4H5.5V10c0-.3.2-.5.5-.5h4V7Zm11 0h-4a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2v-4h-2.5V10c0-.3.2-.5.5-.5h4V7Z" />
                                    </svg>
                                </div>

                                <p className="mt-3 flex-1 overflow-hidden text-small text-muted-foreground">
                                    &ldquo;{review.text}&rdquo;
                                </p>

                                <div className="mt-4 flex items-center gap-3 border-t border-rule pt-4">
                                    <Image
                                        src={review.image}
                                        alt={review.name}
                                        className="size-11 rounded-full object-cover ring-2 ring-sienna-tint"
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate font-bold text-ink">{review.name}</p>
                                        <p className="mt-0.5 inline-block rounded-full bg-sienna-tint px-2.5 py-0.5 text-small font-semibold text-marine">
                                            {review.tag}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </motion.div>
                    );
                })}
            </div>

            <button
                type="button"
                aria-label="Previous review"
                onClick={prev}
                className="absolute -left-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-marine ring-1 ring-rule transition-colors hover:bg-marine hover:text-white lg:-left-6"
            >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                    <path d="m12 4-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <button
                type="button"
                aria-label="Next review"
                onClick={next}
                className="absolute -right-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-marine ring-1 ring-rule transition-colors hover:bg-marine hover:text-white lg:-right-6"
            >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                    <path d="m8 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <div className="mt-6 flex items-center justify-center gap-2">
                {reviews.map((review, index) => (
                    <button
                        key={review.name}
                        type="button"
                        aria-label={`Go to review ${index + 1}`}
                        aria-current={index === active}
                        onClick={() => setActive(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            index === active ? "w-6 bg-sienna-press" : "w-2 bg-rule hover:bg-rule-strong"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
