"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveTestimonial, type FormState } from "@/app/admin/actions";
import type { Testimonial } from "@/lib/types";
import { ImageUpload } from "./image-upload";

export function TestimonialForm({ item }: { item?: Testimonial }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveTestimonial, {});
  const t = item;

  return (
    <form action={action} className="grid max-w-3xl gap-6">
      {t && <input type="hidden" name="id" value={t.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">اسم العميل *</label>
          <input id="name" name="name" required defaultValue={t?.name} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="role">الصفة / الشركة</label>
          <input id="role" name="role" defaultValue={t?.role} placeholder="مثال: مؤسس متجر ورد" className="input" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="quote">رأي العميل *</label>
        <textarea id="quote" name="quote" required rows={5} defaultValue={t?.quote} className="input resize-y" />
      </div>

      <fieldset className="grid gap-5 rounded-2xl border border-border p-5 sm:p-6" dir="ltr">
        <legend className="px-2 font-semibold">English</legend>
        <p className="-mt-2 text-sm text-muted" dir="rtl">اختياري. أي حقل فاضي يظهر بالعربي في النسخة الإنجليزية.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="name_en">Client name</label>
            <input id="name_en" name="name_en" defaultValue={t?.name_en} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="role_en">Role / company</label>
            <input id="role_en" name="role_en" defaultValue={t?.role_en} className="input" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="quote_en">Testimonial</label>
          <textarea id="quote_en" name="quote_en" rows={5} defaultValue={t?.quote_en} className="input resize-y" />
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="rating">التقييم</label>
          <select id="rating" name="rating" defaultValue={t?.rating ?? 5} className="input">
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {"★".repeat(n)} ({n})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="sort_order">الترتيب</label>
          <input id="sort_order" name="sort_order" type="number" defaultValue={t?.sort_order ?? 0} className="input" />
        </div>
      </div>

      <ImageUpload name="avatar_url" label="صورة العميل (اختياري)" defaultValue={t?.avatar_url ? [t.avatar_url] : []} />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={t?.published ?? true} className="size-4 accent-current" />
        منشور في الموقع
      </label>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex gap-3 border-t border-border pt-6">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "جارِ الحفظ…" : "حفظ"}
        </button>
        <Link href="/admin/testimonials" className="btn-ghost">إلغاء</Link>
      </div>
    </form>
  );
}
