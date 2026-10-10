import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project, preload }: { project: Project; preload?: boolean }) {
  return (
    <Link href={`/works/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-subtle">
        {project.cover_url ? (
          <Image
            src={project.cover_url}
            alt={project.title}
            fill
            preload={preload}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center text-4xl font-semibold text-muted/40">
            {project.title.slice(0, 1)}
          </div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{project.title}</h3>
          {project.summary && <p className="mt-1 line-clamp-2 text-sm text-muted">{project.summary}</p>}
        </div>
        {project.category && (
          <span className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted">
            {project.category}
          </span>
        )}
      </div>
    </Link>
  );
}
