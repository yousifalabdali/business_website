"use server";

import { publicClient } from "@/lib/supabase/public";

export type ContactState = { ok?: boolean; error?: string };

export async function sendMessage(_: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: bots fill hidden fields.
  if (form.get("website")) return { ok: true };

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const body = String(form.get("body") ?? "").trim();

  if (!name || !body || !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "تأكد من تعبئة الحقول بشكل صحيح." };
  }
  if (!publicClient) return { error: "الخدمة غير مهيأة بعد." };

  const { error } = await publicClient
    .from("messages")
    .insert({ name: name.slice(0, 120), email: email.slice(0, 200), body: body.slice(0, 5000) });
  if (error) return { error: "صار خطأ، حاول مرة ثانية." };
  return { ok: true };
}
