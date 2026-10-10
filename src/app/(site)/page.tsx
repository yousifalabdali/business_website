import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { getProjects, getSettings } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [s, featured] = await Promise.all([getSettings(), getProjects({ featured: true, limit: 6 })]);
  const works = featured.length ? featured : await getProjects({ limit: 6 });

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          {s.job_title}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.25] tracking-tight sm:text-6xl sm:leading-[1.2]">
          {s.hero_title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{s.hero_subtitle}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/works" className="btn-primary">
            تصفّح الأعمال
          </Link>
          <Link href="/contact" className="btn-ghost">
            تواصل معي
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold">أعمال مختارة</h2>
          <Link href="/works" className="text-sm text-muted transition hover:text-fg">
            عرض الكل ←
          </Link>
        </div>
        {works.length ? (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((p, i) => (
              <ProjectCard key={p.id} project={p} preload={i < 3} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted">
            لا توجد أعمال بعد — أضفها من لوحة التحكم.
          </p>
        )}
      </section>
    </>
  );
}
