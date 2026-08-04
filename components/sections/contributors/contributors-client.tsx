"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { BadgeCheck, ChevronRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Plate } from "@/components/ui/plate";
import { fadeUp, staggerChildren, VIEWPORT_ONCE } from "@/lib/motion";
import { CounsellorDrawer } from "./counsellor-drawer";
import { COUNSELLORS } from "./counsellors";

/** Matches <Plate variant="cartouche"> so the grid never reflows on morph. */
const CARTOUCHE_RATIO = { aspectRatio: "4 / 5" } as const;

export function ContributorsClient() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = useMemo(
    () => COUNSELLORS.find((counsellor) => counsellor.id === activeId) ?? null,
    [activeId],
  );

  const close = useCallback(() => setActiveId(null), []);

  return (
    <LayoutGroup id="contributors">
      <motion.ul
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="m-0 grid list-none grid-cols-1 gap-x-grid-gap gap-y-10 p-0 xs:grid-cols-2 md:grid-cols-3"
      >
        {COUNSELLORS.map((counsellor) => {
          const open = activeId === counsellor.id;
          return (
            <motion.li
              key={counsellor.id}
              variants={fadeUp}
              className="group relative flex flex-col gap-4"
            >
              {/* The plate travels to the drawer via layoutId. While it is
                  away, a same-ratio spacer holds the grid cell open. */}
              {open ? (
                <div style={CARTOUCHE_RATIO} aria-hidden="true" />
              ) : (
                <motion.div layoutId={`cartouche-${counsellor.id}`}>
                  <Plate
                    variant="cartouche"
                    initials={counsellor.initials}
                    registration="marine"
                  />
                </motion.div>
              )}

              <div className="flex flex-col gap-1">
                {/* Stretched trigger: the name is the affordance and the focus
                    target, and its ::after covers the whole cartouche so the
                    plate is clickable too. One control, valid markup.

                    The chevron is the affordance made visible — until now the
                    only sign a name opened anything was the hover colour, which
                    a touch user never sees. It sits beside the visible name, so
                    it is decoration: no `label`, and the button's accessible
                    name stays the counsellor's name exactly as before. */}
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={open}
                  onClick={() => setActiveId(counsellor.id)}
                  className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-0 text-left font-display text-d2 opsz-32 text-ink transition-colors duration-200 ease-quad hover:text-sienna-press after:absolute after:inset-0 after:content-['']"
                >
                  {counsellor.name}
                  <Icon as={ChevronRight} size="md" />
                </button>
                <span className="font-mono text-caption uppercase text-ink-muted tabular-figures">
                  {`${counsellor.desk.toUpperCase()} · ${counsellor.destinations.toUpperCase()} · ${counsellor.years} YEARS`}
                </span>
                {counsellor.outcome && (
                  /* Same badge the section's count line carries, inheriting
                     --verdigris from the label rather than setting it. */
                  <span className="inline-flex items-center gap-1.5 font-mono text-caption uppercase text-verdigris">
                    <Icon as={BadgeCheck} size="sm" />
                    NAMED IN A PUBLISHED TESTIMONIAL
                  </span>
                )}
              </div>
            </motion.li>
          );
        })}
      </motion.ul>

      <AnimatePresence>
        {active && (
          <CounsellorDrawer
            key={active.id}
            counsellor={active}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
