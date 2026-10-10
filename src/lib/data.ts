import { publicClient } from "./supabase/public";
import type { Project, Settings } from "./types";

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
};

export async function getSettings(): Promise<Settings> {
  if (!publicClient) return DEFAULT_SETTINGS;
  const { data } = await publicClient.from("settings").select("*").eq("id", 1).maybeSingle();
  return { ...DEFAULT_SETTINGS, ...(data ?? {}) };
}

export async function getProjects(opts: { featured?: boolean; limit?: number } = {}): Promise<Project[]> {
  if (!publicClient) return [];
  let q = publicClient
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (opts.featured) q = q.eq("featured", true);
  if (opts.limit) q = q.limit(opts.limit);
  const { data } = await q;
  return (data as Project[]) ?? [];
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!publicClient) return null;
  const { data } = await publicClient
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Project) ?? null;
}
