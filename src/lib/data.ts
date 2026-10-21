import { publicClient } from "./supabase/public";
import type { Lang } from "./i18n";
import type { Project, Settings, Testimonial } from "./types";

export const DEFAULT_SETTINGS: Settings = {
  id: 1,
  name: "اسمك هنا",
  job_title: "مصمم ومطور",
  hero_title: "أصمّم تجارب رقمية بسيطة وواضحة",
  hero_subtitle: "هنا تجد مجموعة مختارة من أعمالي ومشاريعي.",
  about: "اكتب نبذة عنك من لوحة التحكم.",
  avatar_url: null,
  email: null,
  phone: null,
  location: null,
  skills: [],
  socials: {},
  name_en: "",
  job_title_en: "",
  hero_title_en: "",
  hero_subtitle_en: "",
  about_en: "",
  location_en: "",
};

// English fields are optional: an empty one falls back to the Arabic text.
const pick = (base: string, en: string | null | undefined, lang: Lang) => (lang === "en" && en?.trim() ? en : base);

function localizeSettings(s: Settings, lang: Lang): Settings {
  return {
    ...s,
    name: pick(s.name, s.name_en, lang),
    job_title: pick(s.job_title, s.job_title_en, lang),
    hero_title: pick(s.hero_title, s.hero_title_en, lang),
    hero_subtitle: pick(s.hero_subtitle, s.hero_subtitle_en, lang),
    about: pick(s.about, s.about_en, lang),
    location: s.location ? pick(s.location, s.location_en, lang) : s.location,
  };
}

function localizeProject(p: Project, lang: Lang): Project {
  return {
    ...p,
    title: pick(p.title, p.title_en, lang),
    summary: pick(p.summary, p.summary_en, lang),
    description: pick(p.description, p.description_en, lang),
    category: pick(p.category, p.category_en, lang),
  };
}

function localizeTestimonial(t: Testimonial, lang: Lang): Testimonial {
  return {
    ...t,
    name: pick(t.name, t.name_en, lang),
    role: pick(t.role, t.role_en, lang),
    quote: pick(t.quote, t.quote_en, lang),
  };
}

export async function getSettings(lang: Lang = "ar"): Promise<Settings> {
  if (!publicClient) return DEFAULT_SETTINGS;
  const { data } = await publicClient.from("settings").select("*").eq("id", 1).maybeSingle();
  return localizeSettings({ ...DEFAULT_SETTINGS, ...(data ?? {}) }, lang);
}

export async function getProjects(lang: Lang = "ar", opts: { featured?: boolean; limit?: number } = {}): Promise<Project[]> {
  if (!publicClient) return [];
  let q = publicClient
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (opts.featured) q = q.eq("featured", true);
  q = q.limit(opts.limit ?? 60);
  const { data } = await q;
  return ((data as Project[]) ?? []).map((p) => localizeProject(p, lang));
}

export async function getProject(slug: string, lang: Lang = "ar"): Promise<Project | null> {
  if (!publicClient) return null;
  const { data } = await publicClient
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .limit(1)
    .maybeSingle();
  return data ? localizeProject(data as Project, lang) : null;
}

export async function getTestimonials(lang: Lang = "ar"): Promise<Testimonial[]> {
  if (!publicClient) return [];
  const { data } = await publicClient
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(30);
  return ((data as Testimonial[]) ?? []).map((t) => localizeTestimonial(t, lang));
}
