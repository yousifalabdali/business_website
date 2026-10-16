import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KineticHeading } from "@/components/motion/kinetic-heading";
import { Reveal } from "@/components/motion/reveal";
import { WorksGrid } from "@/components/works-grid";
import { getProjects } from "@/lib/data";
import { getDict, isLang } from "@/lib/i18n";

export const revalidate = 60;
export async function generateMetadata({ params }: PageProps<"/[lang]/works">): Promise<Metadata> {
  const { lang } = await params;
  return isLang(lang) ? { title: getDict(lang).works.title } : {};
}

export default async function WorksPage({ params }: PageProps<"/[lang]/works">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang).works;
  const projects = await getProjects(lang);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <KineticHeading text={t.title} className="text-display" />
      <Reveal delay={0.2}>
        <p className="mb-10 mt-4 text-lg text-muted">{t.count(projects.length)}</p>
      </Reveal>
      {projects.length ? (
        <WorksGrid projects={projects} lang={lang} allLabel={t.all} />
      ) : (
        <p className="glass rounded-3xl p-12 text-center text-muted">{t.empty}</p>
      )}
    </section>
  );
}
