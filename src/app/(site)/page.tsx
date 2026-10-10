import Link from "next/link";
import { ArrowUpLeft } from "@phosphor-icons/react/ssr";
import { Bento } from "@/components/bento";
import { KineticHeading } from "@/components/motion/kinetic-heading";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/project-card";
import { Story } from "@/components/story";
import { getProjects, getSettings } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [s, all] = await Promise.all([getSettings(), getProjects()]);
  const featured = all.filter((p) => p.featured);
  const works = (featured.length ? featured : all).slice(0, 5);

  return (
    <>
      <section className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6">
        <Reveal y={12}>
          <p className="glass mb-8 inline-flex rounded-full px-4 py-1.5 text-sm text-muted">{s.job_title}</p>
        </Reveal>
        <KineticHeading text={s.hero_title} className="text-display max-w-5xl" />
        <Reveal delay={0.35} className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          <p>{s.hero_subtitle}</p>
        </Reveal>
        <Reveal delay={0.5} className="mt-10 flex flex-wrap gap-3">
          <Magnetic>
            <Link href="/works" className="btn-primary">
              تصفّح الأعمال
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/contact" className="btn-ghost">
              تواصل معي
            </Link>
          </Magnetic>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Bento s={s} projects={all} />
      </section>

      <Story />

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <KineticHeading as="h2" text="أعمال مختارة" className="text-4xl font-bold sm:text-5xl" />
          {works.length > 0 && (
            <Link href="/works" className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted transition hover:text-accent">
              كل الأعمال <ArrowUpLeft size={14} weight="bold" />
            </Link>
          )}
        </div>
        {works.length ? (
          <div className="grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:auto-rows-[280px] lg:grid-cols-3">
            {works.map((p, i) => (
              <Reveal
                key={p.id}
                delay={i * 0.06}
                className={i === 0 ? `sm:col-span-2 sm:row-span-2 ${works.length === 1 ? "lg:col-span-3" : ""}` : undefined}
              >
                <ProjectCard
                  project={p}
                  preload={i === 0}
                  className="h-full"
                  sizes={i === 0 ? "(min-width: 640px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="glass rounded-3xl p-12 text-center text-muted">
            لا توجد أعمال بعد. أضف أول مشروع من لوحة التحكم.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-border px-6 py-20 text-center sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]"
          />
          <KineticHeading as="h2" text="لنصنع شيئاً يستحق الزيارة" className="text-display relative mx-auto max-w-4xl" />
          <div className="relative mt-10">
            <Magnetic>
              <Link href="/contact" className="btn-primary px-8 py-4 text-base">
                تواصل معي
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  );
}
