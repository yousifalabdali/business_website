import Image from "next/image";
import Link from "next/link";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { requireAdmin } from "@/lib/admin";
import type { Testimonial } from "@/lib/types";
import { deleteTestimonial, toggleTestimonial } from "../../actions";

export default async function AdminTestimonials() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(200);
  const items = (data as Testimonial[]) ?? [];

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">آراء العملاء</h1>
        <Link href="/admin/testimonials/new" className="btn-primary">+ رأي جديد</Link>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted">
          لا توجد آراء بعد. أضف أول رأي، وبيظهر في الصفحة الرئيسية.
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-2xl border border-border">
          {items.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center gap-4 p-4">
              <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-subtle font-semibold text-muted">
                {t.avatar_url ? <Image src={t.avatar_url} alt="" fill sizes="48px" className="object-cover" /> : t.name.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <Link href={`/admin/testimonials/${t.id}`} className="font-medium hover:underline">
                  {t.name}
                </Link>
                <span className="ms-2 text-sm text-amber-500" aria-label={`${t.rating} من 5`}>{"★".repeat(t.rating)}</span>
                <p className="line-clamp-1 text-sm text-muted">{t.quote}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <form action={toggleTestimonial}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="value" value={String(!t.published)} />
                  <button
                    className={`rounded-full px-3 py-1 text-xs transition ${
                      t.published ? "bg-fg text-bg" : "border border-border text-muted hover:text-fg"
                    }`}
                  >
                    {t.published ? "منشور" : "مخفي"}
                  </button>
                </form>
                <Link href={`/admin/testimonials/${t.id}`} className="btn-ghost px-3 py-1 text-xs">تعديل</Link>
                <form action={deleteTestimonial}>
                  <input type="hidden" name="id" value={t.id} />
                  <ConfirmButton message={`حذف رأي "${t.name}"؟`} className="rounded-full px-3 py-1 text-xs text-red-600 hover:bg-red-600/10">
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
