"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "./actions";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, {});

  if (state.ok) {
    return (
      <div className="rounded-3xl border border-border bg-subtle p-10 text-center">
        <p className="text-2xl font-semibold">وصلت رسالتك ✓</p>
        <p className="mt-2 text-muted">شكراً لك، بأرد عليك قريباً.</p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">الاسم</label>
          <input id="name" name="name" required maxLength={120} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="email">البريد الإلكتروني</label>
          <input id="email" name="email" type="email" required dir="ltr" className="input text-right" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="body">الرسالة</label>
        <textarea id="body" name="body" required rows={6} maxLength={5000} className="input resize-y" />
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <div>
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "جارِ الإرسال…" : "إرسال"}
        </button>
      </div>
    </form>
  );
}
