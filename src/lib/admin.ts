import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

// Verifies the current request belongs to an admin; redirects to login otherwise.
// cache(): layout + page share one check per request. getClaims() verifies the JWT
// locally against the project's JWKS instead of a round trip to the auth server.
export const requireAdmin = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) redirect("/admin/login");
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/admin/login?error=not-admin");
  return { supabase, user: { id: claims.sub, email: claims.email as string | undefined } };
});
