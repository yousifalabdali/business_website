import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KineticHeading } from "@/components/motion/kinetic-heading";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Socials } from "@/components/socials";
import { getSettings } from "@/lib/data";
import { getDict, isLang, localePath } from "@/lib/i18n";

export const revalidate = 60;
export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  return isLang(lang) ? { title: getDict(lang).about.title } : {};
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const s = await getSettings(lang);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-muted">{s.job_title}</p>
      <KineticHeading text={s.name} className="text-display mt-2" />

      <div className="mt-14 grid gap-4 md:grid-cols-6">
        <Reveal className="md:col-span-2 md:row-span-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-subtle shadow-[0_0_60px_-15px_rgb(var(--glow)/0.6)] md:aspect-auto md:h-full">
            {s.avatar_url ? (
              <Image src={s.avatar_url} alt={s.name} fill preload sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            ) : (
              <div className="grid h-full min-h-[280px] place-items-center text-8xl font-bold text-muted/30">
                {s.name.slice(0, 1)}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-4">
          <div className="glass h-full whitespace-pre-line rounded-3xl p-6 text-lg leading-loose sm:p-10">{s.about}</div>
        </Reveal>

        {s.skills.length > 0 && (
          <Reveal delay={0.14} className="md:col-span-4">
            <div className="glass h-full rounded-3xl p-6 sm:p-8">
              <h2 className="mb-5 font-semibold">{t.about.skills}</h2>
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
          <div className="glass flex flex-col gap-6 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <Socials socials={s.socials} />
            <Magnetic>
              <Link href={localePath(lang, "/contact")} className="btn-primary">
                {t.home.contactMe}
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
