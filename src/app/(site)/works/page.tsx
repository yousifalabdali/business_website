import type { Metadata } from "next";
import { WorksGrid } from "@/components/works-grid";
import { getProjects } from "@/lib/data";

export const revalidate = 60;
export const metadata: Metadata = { title: "أعمالي" };

export default async function WorksPage() {
  const projects = await getProjects();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight">أعمالي</h1>
      <p className="mb-10 mt-3 text-muted">{projects.length} مشروع</p>
      {projects.length ? (
        <WorksGrid projects={projects} />
      ) : (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted">
          لا توجد أعمال بعد.
        </p>
      )}
    </section>
  );
}
