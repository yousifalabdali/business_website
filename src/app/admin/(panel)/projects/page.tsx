import Image from "next/image";
import Link from "next/link";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { requireAdmin } from "@/lib/admin";
import type { Project } from "@/lib/types";
import { deleteProject, toggleProject } from "../../actions";

function Toggle({ p, field, label }: { p: Project; field: "published" | "featured"; label: string }) {
  const on = p[field];
  return (
    <form action={toggleProject}>
      <input type="hidden" name="id" value={p.id} />
      <input type="hidden" name="field" value={field} />
      <input type="hidden" name="value" value={String(!on)} />
      <button
        className={`rounded-full px-3 py-1 text-xs transition ${
          on ? "bg-fg text-bg" : "border border-border text-muted hover:text-fg"
        }`}
      >
        {label}
      </button>
    </form>
  );
}

export default async function AdminProjects() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(200);
  const projects = (data as Project[]) ?? [];

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">الأعمال</h1>
        <Link href="/admin/projects/new" className="btn-primary">+ عمل جديد</Link>
      </div>

      {projects.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted">
          لا توجد أعمال. ابدأ بإضافة أول عمل.
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-2xl border border-border">
          {projects.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-subtle">
                {p.cover_url && <Image src={p.cover_url} alt="" fill sizes="56px" className="object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <Link href={`/admin/projects/${p.id}`} className="font-medium hover:underline">
                  {p.title}
                </Link>
                <p className="truncate text-sm text-muted">
                  {[p.category, p.year].filter(Boolean).join(" · ") || "—"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Toggle p={p} field="published" label={p.published ? "منشور" : "مسودة"} />
                <Toggle p={p} field="featured" label="مميز" />
                <Link href={`/admin/projects/${p.id}`} className="btn-ghost px-3 py-1 text-xs">تعديل</Link>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmButton message={`حذف "${p.title}"؟`} className="rounded-full px-3 py-1 text-xs text-red-600 hover:bg-red-600/10">
                    حذف
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
