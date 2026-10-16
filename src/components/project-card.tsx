import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { Spotlight } from "./motion/spotlight";
import { localePath, type Lang } from "@/lib/i18n";
import type { Project } from "@/lib/types";

export function ProjectCard({
  project,
  lang,
  preload,
  className = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  project: Project;
  lang: Lang;
  preload?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={localePath(lang, `/works/${project.slug}`)}
      className={`group block rounded-3xl outline-none transition duration-500 ease-out-expo hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      <Spotlight className="h-full rounded-3xl border border-border bg-subtle">
        {project.cover_url ? (
          <Image
            src={project.cover_url}
            alt={project.title}
            fill
            preload={preload}
            sizes={sizes}
            className="object-cover transition duration-700 ease-out-expo group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid h-full place-items-center text-6xl font-bold text-muted/30">
            {project.title.slice(0, 1)}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent" aria-hidden />
        <div className="glass absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{project.title}</h3>
            {project.category && <p className="truncate text-xs text-muted">{project.category}</p>}
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-accent-fg transition duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
            <ArrowUpRight size={16} weight="bold" className="rtl:-scale-x-100" />
          </span>
        </div>
      </Spotlight>
    </Link>
  );
}
