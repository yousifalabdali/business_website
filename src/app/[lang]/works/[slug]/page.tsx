import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { KineticHeading } from "@/components/motion/kinetic-heading";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { getProject, getProjects } from "@/lib/data";
import { getDict, isLang, localePath } from "@/lib/i18n";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects("ar");
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/works/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const p = await getProject(decodeURIComponent(slug), lang);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    openGraph: p.cover_url ? { images: [p.cover_url] } : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/works/[slug]">) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const p = await getProject(decodeURIComponent(slug), lang);
  if (!p) notFound();
  const t = getDict(lang).works;

  const meta = [
    p.category && { k: t.category, v: p.category },
    p.year && { k: t.year, v: String(p.year) },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href={localePath(lang, "/works")} className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-accent">
        <ArrowLeft size={14} weight="bold" className="rtl:-scale-x-100" /> {t.back}
      </Link>

      <header className="mt-8">
        <KineticHeading text={p.title} className="text-display max-w-5xl" />
        {p.summary && (
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{p.summary}</p>
          </Reveal>
        )}
      </header>

      {p.cover_url && (
        <Reveal delay={0.3} className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[2rem] border border-border bg-subtle">
          <Image src={p.cover_url} alt={p.title} fill preload sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
        </Reveal>
      )}

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_300px]">
        {p.description ? (
          <Reveal className="max-w-2xl whitespace-pre-line text-lg leading-loose">{p.description}</Reveal>
        ) : (
          <div />
        )}

        {(meta.length > 0 || p.tags.length > 0 || p.link) && (
          <div>
            <aside className="glass sticky top-24 grid gap-6 rounded-3xl p-6">
              {meta.map((m) => (
                <div key={m.k}>
                  <p className="text-xs text-muted">{m.k}</p>
                  <p className="mt-1 font-medium">{m.v}</p>
                </div>
              ))}
              {p.tags.length > 0 && (
                <div>
                  <p className="mb-2 text-xs text-muted">{t.tools}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li key={t} className="neu rounded-full px-3 py-1 text-sm">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {p.link && (
                <Magnetic strength={0.15}>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    {t.visit} <ArrowUpRight size={16} weight="bold" className="rtl:-scale-x-100" />
                  </a>
                </Magnetic>
              )}
            </aside>
          </div>
        )}
      </div>

      {p.images.length > 0 && (
        <div className="mt-16 grid gap-6">
          {p.images.map((src, i) => (
            <Reveal key={src} className="overflow-hidden rounded-[2rem] border border-border bg-subtle">
              <Image
                src={src}
                alt={`${p.title} (${i + 1})`}
                width={1600}
                height={1000}
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="h-auto w-full"
              />
            </Reveal>
          ))}
        </div>
      )}
    </article>
  );
}
