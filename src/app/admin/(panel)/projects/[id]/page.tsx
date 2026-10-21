import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/admin";
import type { Project } from "@/lib/types";
import { PROJECT_COLUMNS } from "@/lib/columns";

export default async function EditProject({ params }: PageProps<"/admin/projects/[id]">) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("projects").select(PROJECT_COLUMNS).eq("id", id).maybeSingle();
  if (!data) notFound();
  const p = data as Project;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">تعديل: {p.title}</h1>
        {p.published && (
          <Link href={`/works/${p.slug}`} target="_blank" className="text-sm text-muted hover:text-fg">
            عرض في الموقع ↗
          </Link>
        )}
      </div>
      <ProjectForm project={p} />
    </>
  );
}
