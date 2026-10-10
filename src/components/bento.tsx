import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, EnvelopeSimple, MapPin } from "@phosphor-icons/react/ssr";
import { Reveal } from "./motion/reveal";
import { Spotlight } from "./motion/spotlight";
import type { Project, Settings } from "@/lib/types";

const tile = "glass h-full rounded-3xl p-6 sm:p-8";

/**
 * Asymmetric tile grid. Only tiles that have real content are rendered;
 * grid-flow-dense backfills so a missing tile never leaves a hole.
 */
export function Bento({ s, projects }: { s: Settings; projects: Project[] }) {
  const cover = projects.find((p) => p.cover_url);
  const categories = new Set(projects.map((p) => p.category).filter(Boolean)).size;
  const years = projects.map((p) => p.year).filter((y): y is number => !!y);
  const stats = [
    { v: projects.length, k: "مشروع منشور" },
    categories > 0 && { v: categories, k: "مجال عمل" },
    years.length > 0 && { v: Math.max(...years), k: "آخر مشروع" },
  ].filter(Boolean) as { v: number; k: string }[];

  return (
    <div className="grid grid-flow-dense auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-6">
      <Reveal className="md:col-span-4 md:row-span-2">
        <Spotlight className={`${tile} flex flex-col justify-between gap-10`}>
          <h2 className="text-2xl font-bold sm:text-3xl">نبذة</h2>
          <p className="line-clamp-6 max-w-[60ch] text-lg leading-loose text-fg/85">{s.about}</p>
          <Link href="/about" className="inline-flex items-center gap-2 text-sm font-medium text-accent">
            المزيد عنّي <ArrowUpLeft size={14} weight="bold" />
          </Link>
        </Spotlight>
      </Reveal>

      {cover && (
        <Reveal delay={0.08} className="md:col-span-2 md:row-span-2">
          <Link
            href={`/works/${cover.slug}`}
            className="group relative block h-full min-h-[320px] overflow-hidden rounded-3xl border border-border"
          >
            <Image
              src={cover.cover_url!}
              alt={cover.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition duration-700 ease-out-expo group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden />
            <p className="absolute inset-x-6 bottom-6 text-lg font-semibold text-white">{cover.title}</p>
          </Link>
        </Reveal>
      )}

      {projects.length > 0 && (
        <Reveal delay={0.12} className="md:col-span-3">
          <div className={`${tile} grid grid-cols-3 items-end gap-4`}>
            {stats.map((st) => (
              <div key={st.k}>
                <p className="text-4xl font-bold tabular-nums text-accent sm:text-5xl">{st.v}</p>
                <p className="mt-2 text-sm text-muted">{st.k}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {s.skills.length > 0 && (
        <Reveal delay={0.16} className="md:col-span-3">
          <div className={tile}>
            <h3 className="mb-5 font-semibold">أدوات أعمل بها</h3>
            <ul className="flex flex-wrap gap-2">
              {s.skills.map((k) => (
                <li key={k} className="neu rounded-full px-4 py-1.5 text-sm">
                  {k}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.2} className="md:col-span-6">
        <Link
          href="/contact"
          className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-3xl bg-accent p-6 text-accent-fg sm:flex-row sm:items-center sm:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -top-1/2 h-full rounded-full bg-white/25 blur-3xl transition duration-700 group-hover:translate-y-6"
          />
          <div className="relative">
            <p className="text-2xl font-bold sm:text-3xl">عندك مشروع؟</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-80">
              {s.email && (
                <span className="inline-flex items-center gap-1.5" dir="auto">
                  <EnvelopeSimple size={16} /> {s.email}
                </span>
              )}
              {s.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={16} /> {s.location}
                </span>
              )}
            </div>
          </div>
          <span className="relative inline-flex items-center gap-2 self-start rounded-full bg-accent-fg px-6 py-3 text-sm font-medium text-accent transition duration-300 group-hover:-translate-y-0.5 sm:self-auto">
            تواصل معي <ArrowUpLeft size={16} weight="bold" />
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
