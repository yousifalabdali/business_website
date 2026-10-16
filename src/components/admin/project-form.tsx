"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveProject, type FormState } from "@/app/admin/actions";
import type { Project } from "@/lib/types";
import { ImageUpload } from "./image-upload";

export function ProjectForm({ project }: { project?: Project }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProject, {});
  const p = project;

  return (
    <form action={action} className="grid max-w-3xl gap-6">
      {p && <input type="hidden" name="id" value={p.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="title">العنوان *</label>
          <input id="title" name="title" required defaultValue={p?.title} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="slug">الرابط (slug)</label>
          <input id="slug" name="slug" defaultValue={p?.slug} placeholder="يُولَّد تلقائياً من العنوان" dir="ltr" className="input" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="summary">وصف مختصر</label>
        <input id="summary" name="summary" defaultValue={p?.summary} className="input" />
      </div>

      <div>
        <label className="label" htmlFor="description">التفاصيل</label>
        <textarea id="description" name="description" rows={7} defaultValue={p?.description} className="input resize-y" />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="label" htmlFor="category">التصنيف</label>
          <input id="category" name="category" defaultValue={p?.category} placeholder="مثال: هوية بصرية" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="year">السنة</label>
          <input id="year" name="year" type="number" defaultValue={p?.year ?? ""} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="sort_order">الترتيب</label>
          <input id="sort_order" name="sort_order" type="number" defaultValue={p?.sort_order ?? 0} className="input" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="tags">الأدوات / الوسوم</label>
          <input id="tags" name="tags" defaultValue={p?.tags.join("، ")} placeholder="Figma، Next.js" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="link">رابط خارجي</label>
          <input id="link" name="link" type="url" defaultValue={p?.link ?? ""} dir="ltr" placeholder="https://" className="input" />
        </div>
      </div>

      <fieldset className="grid gap-5 rounded-2xl border border-border p-5 sm:p-6" dir="ltr">
        <legend className="px-2 font-semibold">English</legend>
        <p className="-mt-2 text-sm text-muted" dir="rtl">اختياري. أي حقل فاضي يظهر بالعربي في النسخة الإنجليزية.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="title_en">Title</label>
            <input id="title_en" name="title_en" defaultValue={p?.title_en} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="category_en">Category</label>
            <input id="category_en" name="category_en" defaultValue={p?.category_en} placeholder="e.g. Branding" className="input" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="summary_en">Short summary</label>
          <input id="summary_en" name="summary_en" defaultValue={p?.summary_en} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="description_en">Details</label>
          <textarea id="description_en" name="description_en" rows={7} defaultValue={p?.description_en} className="input resize-y" />
        </div>
      </fieldset>

      <ImageUpload name="cover_url" label="صورة الغلاف" defaultValue={p?.cover_url ? [p.cover_url] : []} />
      <ImageUpload name="images" label="معرض الصور" multiple defaultValue={p?.images} />

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={p?.published ?? true} className="size-4 accent-current" />
          منشور
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={p?.featured ?? false} className="size-4 accent-current" />
          يظهر في الرئيسية
        </label>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex gap-3 border-t border-border pt-6">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "جارِ الحفظ…" : "حفظ"}
        </button>
        <Link href="/admin/projects" className="btn-ghost">إلغاء</Link>
      </div>
    </form>
  );
}
