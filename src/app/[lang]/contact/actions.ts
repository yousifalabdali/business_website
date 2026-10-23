"use server";

import { getDict, isLang } from "@/lib/i18n";
import { publicClient } from "@/lib/supabase/public";

export type ContactState = { ok?: boolean; error?: string };

export async function sendMessage(_: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: bots fill hidden fields.
  if (form.get("website")) return { ok: true };
  const lang = String(form.get("lang") ?? "");
  const t = getDict(isLang(lang) ? lang : "ar").contact;

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const body = String(form.get("body") ?? "").trim();

  if (!name || !body || !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: t.invalid };
  }
  if (!publicClient) return { error: t.notReady };

  const { error } = await publicClient
    .from("messages")
    .insert({ name: name.slice(0, 120), email: email.slice(0, 200), body: body.slice(0, 5000) });
  if (error) return { error: t.failed };
  return { ok: true };
}
