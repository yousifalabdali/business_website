"use client";

import { useActionState } from "react";
import { login, type FormState } from "../actions";

export function LoginForm({ notAdmin }: { notAdmin: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});
  const error = state.error ?? (notAdmin ? "هذا الحساب ليس له صلاحية أدمن." : undefined);
  return (
    <form action={action} className="grid gap-4">
      <div>
        <label className="label" htmlFor="email">البريد الإلكتروني</label>
        <input id="email" name="email" type="email" required dir="ltr" autoComplete="email" className="input" />
      </div>
      <div>
        <label className="label" htmlFor="password">كلمة المرور</label>
        <input id="password" name="password" type="password" required dir="ltr" autoComplete="current-password" className="input" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={pending} className="btn-primary mt-2 w-full">
        {pending ? "جارِ الدخول…" : "دخول"}
      </button>
    </form>
  );
}
