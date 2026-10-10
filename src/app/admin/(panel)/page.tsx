import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { logout } from "../actions";

export default async function AdminHome() {
  const { supabase } = await requireAdmin();
  const [projects, published, messages, unread] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("published", true),
    supabase.from("messages").select("id", { count: "exact", head: true }),
    supabase.from("messages").select("id", { count: "exact", head: true }).eq("read", false),
  ]);

  const stats = [
    { label: "كل الأعمال", value: projects.count ?? 0, href: "/admin/projects" },
    { label: "منشورة", value: published.count ?? 0, href: "/admin/projects" },
    { label: "الرسائل", value: messages.count ?? 0, href: "/admin/messages" },
    { label: "غير مقروءة", value: unread.count ?? 0, href: "/admin/messages" },
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
