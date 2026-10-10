import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

// Verifies the current request belongs to an admin; redirects to login otherwise.
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/admin/login?error=not-admin");
  return { supabase, user };
}
