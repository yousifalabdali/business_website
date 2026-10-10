"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./project-card";
import type { Project } from "@/lib/types";

export function WorksGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
    [projects],
  );
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? projects.filter((p) => p.category === active) : projects;

  return (
    <>
      {categories.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {[null, ...categories].map((c) => (
            <button
              key={c ?? "all"}
              type="button"
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active === c ? "bg-fg text-bg" : "border border-border text-muted hover:text-fg"
              }`}
            >
              {c ?? "الكل"}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <ProjectCard key={p.id} project={p} preload={i < 3} />
        ))}
      </div>
    </>
  );
}
