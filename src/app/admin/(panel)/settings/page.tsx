import { SettingsForm } from "@/components/admin/settings-form";
import { requireAdmin } from "@/lib/admin";
import { DEFAULT_SETTINGS } from "@/lib/data";
import type { Settings } from "@/lib/types";

export default async function AdminSettings() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();
  const s: Settings = { ...DEFAULT_SETTINGS, ...(data ?? {}) };
  return (
    <>
      <h1 className="mb-8 text-2xl font-bold">الإعدادات</h1>
      <SettingsForm s={s} />
    </>
  );
}
