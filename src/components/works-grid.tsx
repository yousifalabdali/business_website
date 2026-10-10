"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProjectCard } from "./project-card";
import type { Project } from "@/lib/types";

export function WorksGrid({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
    [projects],
  );
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? projects.filter((p) => p.category === active) : projects;

  return (
    <>
      {categories.length > 1 && (
        <div className="glass mb-10 inline-flex max-w-full flex-wrap gap-1 rounded-full p-1.5">
          {[null, ...categories].map((c) => (
            <button
              key={c ?? "all"}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`relative isolate rounded-full px-4 py-2 text-sm transition-colors active:scale-95 ${
                active === c ? "font-medium text-accent-fg" : "text-muted hover:text-fg"
              }`}
            >
              {active === c && (
                <motion.span
                  layoutId="works-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {c ?? "الكل"}
            </button>
          ))}
        </div>
      )}
      <motion.div layout={!reduce} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p, i) => (
            <motion.div
              key={p.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={p} preload={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
