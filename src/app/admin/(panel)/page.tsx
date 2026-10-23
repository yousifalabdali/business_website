import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { logout } from "../actions";

export default async function AdminHome() {
  const { supabase } = await requireAdmin();
  const [{ data: projectRows }, { data: messageRows }] = await Promise.all([
    supabase.from("projects").select("published").limit(500),
    supabase.from("messages").select("read").limit(500),
  ]);
  const projects = projectRows ?? [];
  const messages = messageRows ?? [];

  const stats = [
    { label: "كل الأعمال", value: projects.length, href: "/admin/projects" },
    { label: "منشورة", value: projects.filter((p) => p.published).length, href: "/admin/projects" },
    { label: "الرسائل", value: messages.length, href: "/admin/messages" },
    { label: "غير مقروءة", value: messages.filter((m) => !m.read).length, href: "/admin/messages" },
  ];

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">نظرة عامة</h1>
        <div className="flex gap-2">
          <Link href="/admin/projects/new" className="btn-primary">+ عمل جديد</Link>
          <form action={logout} className="md:hidden">
            <button className="btn-ghost">خروج</button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-2xl border border-border p-5 transition hover:bg-subtle">
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-2 text-3xl font-bold tabular-nums">{s.value}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
