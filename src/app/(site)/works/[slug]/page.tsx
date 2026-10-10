import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/data";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProject(decodeURIComponent(slug));
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    openGraph: p.cover_url ? { images: [p.cover_url] } : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const p = await getProject(decodeURIComponent(slug));
  if (!p) notFound();

  const meta = [
    p.category && { k: "التصنيف", v: p.category },
    p.year && { k: "السنة", v: String(p.year) },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <article className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <Link href="/works" className="text-sm text-muted transition hover:text-fg">
        → كل الأعمال
      </Link>

      <header className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{p.title}</h1>
          {p.summary && <p className="mt-4 max-w-2xl text-lg text-muted">{p.summary}</p>}
        </div>
        {p.link && (
          <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
            زيارة المشروع ↗
          </a>
        )}
      </header>

      {meta.length > 0 && (
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-y border-border py-5">
          {meta.map((m) => (
            <div key={m.k}>
              <dt className="text-xs text-muted">{m.k}</dt>
              <dd className="mt-1 font-medium">{m.v}</dd>
            </div>
          ))}
          {p.tags.length > 0 && (
            <div>
              <dt className="text-xs text-muted">الأدوات</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-subtle px-2.5 py-0.5 text-sm">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>
      )}

      {p.cover_url && (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-subtle">
          <Image src={p.cover_url} alt={p.title} fill preload sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
      )}

      {p.description && (
        <div className="mx-auto mt-14 max-w-2xl whitespace-pre-line text-lg leading-loose">{p.description}</div>
      )}

      {p.images.length > 0 && (
        <div className="mt-14 grid gap-6">
          {p.images.map((src, i) => (
            <div key={src} className="relative overflow-hidden rounded-3xl border border-border bg-subtle">
              <Image
                src={src}
                alt={`${p.title} — ${i + 1}`}
                width={1600}
                height={1000}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
