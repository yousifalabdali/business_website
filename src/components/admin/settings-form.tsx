"use client";

import { useActionState } from "react";
import { saveSettings, type FormState } from "@/app/admin/actions";
import type { Settings } from "@/lib/types";
import { ImageUpload } from "./image-upload";

const SOCIALS = [
  ["instagram", "Instagram"],
  ["x", "X"],
  ["linkedin", "LinkedIn"],
  ["behance", "Behance"],
  ["dribbble", "Dribbble"],
  ["github", "GitHub"],
  ["whatsapp", "WhatsApp (wa.me/...)"],
] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-5 rounded-2xl border border-border p-5 sm:p-6">
      <legend className="px-2 font-semibold">{title}</legend>
      {children}
    </fieldset>
  );
}

export function SettingsForm({ s }: { s: Settings }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveSettings, {});

  return (
    <form action={action} className="grid max-w-3xl gap-8">
      <Section title="الهوية">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="name">الاسم</label>
            <input id="name" name="name" required defaultValue={s.name} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="job_title">المسمى</label>
            <input id="job_title" name="job_title" defaultValue={s.job_title} className="input" />
          </div>
        </div>
        <ImageUpload name="avatar_url" label="الصورة الشخصية" defaultValue={s.avatar_url ? [s.avatar_url] : []} />
      </Section>

      <Section title="الصفحة الرئيسية">
        <div>
          <label className="label" htmlFor="hero_title">العنوان الرئيسي</label>
          <input id="hero_title" name="hero_title" defaultValue={s.hero_title} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="hero_subtitle">النص التعريفي</label>
          <textarea id="hero_subtitle" name="hero_subtitle" rows={2} defaultValue={s.hero_subtitle} className="input" />
        </div>
      </Section>

      <Section title="عنّي">
        <div>
          <label className="label" htmlFor="about">النبذة</label>
          <textarea id="about" name="about" rows={7} defaultValue={s.about} className="input resize-y" />
        </div>
        <div>
          <label className="label" htmlFor="skills">المهارات (افصل بفاصلة)</label>
          <input id="skills" name="skills" defaultValue={s.skills.join("، ")} className="input" />
        </div>
      </Section>

      <Section title="English">
        <div dir="ltr" className="grid gap-5">
          <p className="-mt-2 text-sm text-muted" dir="rtl">اختياري. أي حقل فاضي يظهر بالعربي في النسخة الإنجليزية.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="name_en">Name</label>
              <input id="name_en" name="name_en" defaultValue={s.name_en} className="input" />
            </div>
            <div>
              <label className="label" htmlFor="job_title_en">Job title</label>
              <input id="job_title_en" name="job_title_en" defaultValue={s.job_title_en} className="input" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="hero_title_en">Hero headline</label>
            <input id="hero_title_en" name="hero_title_en" defaultValue={s.hero_title_en} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="hero_subtitle_en">Hero subtitle</label>
            <textarea id="hero_subtitle_en" name="hero_subtitle_en" rows={2} defaultValue={s.hero_subtitle_en} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="about_en">About</label>
            <textarea id="about_en" name="about_en" rows={7} defaultValue={s.about_en} className="input resize-y" />
          </div>
          <div>
            <label className="label" htmlFor="location_en">Location</label>
            <input id="location_en" name="location_en" defaultValue={s.location_en} className="input" />
          </div>
        </div>
      </Section>

      <Section title="التواصل">
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="label" htmlFor="email">البريد</label>
            <input id="email" name="email" type="email" dir="ltr" defaultValue={s.email ?? ""} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="phone">الجوال</label>
            <input id="phone" name="phone" dir="ltr" defaultValue={s.phone ?? ""} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="location">الموقع</label>
            <input id="location" name="location" defaultValue={s.location ?? ""} className="input" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {SOCIALS.map(([k, label]) => (
            <div key={k}>
              <label className="label" htmlFor={`social_${k}`}>{label}</label>
              <input
                id={`social_${k}`}
                name={`social_${k}`}
                type="url"
                dir="ltr"
                placeholder="https://"
                defaultValue={s.socials[k] ?? ""}
                className="input"
              />
            </div>
          ))}
        </div>
      </Section>

      <div className="sticky bottom-4 flex items-center gap-4 rounded-2xl border border-border bg-bg/90 p-3 backdrop-blur">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "جارِ الحفظ…" : "حفظ الإعدادات"}
        </button>
        {state.ok && !pending && <span className="text-sm text-emerald-600">تم الحفظ ✓</span>}
        {state.error && <span className="text-sm text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}
