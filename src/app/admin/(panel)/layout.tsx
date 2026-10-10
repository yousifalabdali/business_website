import type { Metadata } from "next";
import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { requireAdmin } from "@/lib/admin";
import { logout } from "../actions";

export const metadata: Metadata = { title: "لوحة التحكم", robots: { index: false } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { supabase, user } = await requireAdmin();
  const { count } = await supabase
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("read", false);

  return (
    <div className="mx-auto grid min-h-dvh max-w-7xl md:grid-cols-[240px_1fr]">
      <aside className="border-b border-border p-4 md:sticky md:top-0 md:h-dvh md:border-b-0 md:border-l md:p-6">
        <div className="mb-4 flex items-center justify-between md:mb-8">
          <Link href="/admin" className="font-bold">لوحة التحكم</Link>
          <ThemeToggle />
        </div>
        <AdminNav unread={count ?? 0} />
        <div className="mt-4 hidden border-t border-border pt-4 text-sm md:mt-8 md:block">
          <p className="truncate text-muted" dir="ltr">{user.email}</p>
          <div className="mt-3 flex gap-2">
            <Link href="/" target="_blank" className="btn-ghost px-3 py-1.5 text-xs">عرض الموقع ↗</Link>
            <form action={logout}>
              <button className="btn-ghost px-3 py-1.5 text-xs">خروج</button>
            </form>
          </div>
        </div>
      </aside>
      <main className="page-in min-w-0 p-4 sm:p-8">{children}</main>
    </div>
  );
}
