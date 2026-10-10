import type { Metadata } from "next";
import { KineticHeading } from "@/components/motion/kinetic-heading";
import { Reveal } from "@/components/motion/reveal";
import { WorksGrid } from "@/components/works-grid";
import { getProjects } from "@/lib/data";

export const revalidate = 60;
export const metadata: Metadata = { title: "أعمالي" };

export default async function WorksPage() {
  const projects = await getProjects();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <KineticHeading text="أعمالي" className="text-display" />
      <Reveal delay={0.2}>
        <p className="mb-10 mt-4 text-lg text-muted">{projects.length} مشروع</p>
      </Reveal>
      {projects.length ? (
        <WorksGrid projects={projects} />
      ) : (
        <p className="glass rounded-3xl p-12 text-center text-muted">لا توجد أعمال بعد.</p>
      )}
    </section>
  );
}
