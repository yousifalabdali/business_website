"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error?: string; ok?: boolean };

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const list = (f: FormData, k: string) =>
  str(f, k)
    .split(/[,،\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

function slugify(input: string) {
  const s = input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9؀-ۿ-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return s || Math.random().toString(36).slice(2, 8);
}

function refreshSite() {
  revalidatePath("/", "layout");
}

// ---------- Auth ----------

export async function login(_: FormState, form: FormData): Promise<FormState> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: str(form, "email"),
    password: String(form.get("password") ?? ""),
  });
  if (error) return { error: "البريد أو كلمة المرور غير صحيحة." };
  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------- Projects ----------

export async function saveProject(_: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const id = str(form, "id");
  const title = str(form, "title");
  if (!title) return { error: "العنوان مطلوب." };

  const year = parseInt(str(form, "year"), 10);
  const row = {
    title,
    slug: slugify(str(form, "slug") || title),
    summary: str(form, "summary"),
    description: str(form, "description"),
    category: str(form, "category"),
    cover_url: str(form, "cover_url") || null,
    images: form.getAll("images").map(String).filter(Boolean),
    tags: list(form, "tags"),
    link: str(form, "link") || null,
    year: Number.isFinite(year) ? year : null,
    featured: form.get("featured") === "on",
    published: form.get("published") === "on",
    sort_order: parseInt(str(form, "sort_order"), 10) || 0,
  };

  const { error } = id
    ? await supabase.from("projects").update(row).eq("id", id)
    : await supabase.from("projects").insert(row);

  if (error) {
    return { error: error.code === "23505" ? "الرابط (slug) مستخدم في مشروع آخر." : error.message };
  }
  refreshSite();
  redirect("/admin/projects");
}

export async function deleteProject(form: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("projects").delete().eq("id", str(form, "id"));
  refreshSite();
  revalidatePath("/admin/projects");
}

export async function toggleProject(form: FormData) {
  const { supabase } = await requireAdmin();
  const field = str(form, "field");
  if (field !== "published" && field !== "featured") return;
  await supabase
    .from("projects")
    .update({ [field]: str(form, "value") === "true" })
    .eq("id", str(form, "id"));
  refreshSite();
  revalidatePath("/admin/projects");
}

// ---------- Messages ----------

export async function markMessage(form: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("messages").update({ read: str(form, "read") === "true" }).eq("id", str(form, "id"));
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(form: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("messages").delete().eq("id", str(form, "id"));
  revalidatePath("/admin", "layout");
}

// ---------- Settings ----------

export async function saveSettings(_: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const socials: Record<string, string> = {};
  for (const k of ["instagram", "x", "linkedin", "behance", "dribbble", "github", "whatsapp"]) {
    const v = str(form, `social_${k}`);
    if (v) socials[k] = v;
  }
  const { error } = await supabase
    .from("settings")
    .update({
      name: str(form, "name"),
      job_title: str(form, "job_title"),
      hero_title: str(form, "hero_title"),
      hero_subtitle: str(form, "hero_subtitle"),
      about: str(form, "about"),
      avatar_url: str(form, "avatar_url") || null,
      email: str(form, "email") || null,
      phone: str(form, "phone") || null,
      location: str(form, "location") || null,
      skills: list(form, "skills"),
      socials,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
  if (error) return { error: error.message };
  refreshSite();
  return { ok: true };
}
