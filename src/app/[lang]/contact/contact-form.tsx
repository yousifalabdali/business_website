"use client";

import { useActionState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle, CircleNotch, PaperPlaneTilt } from "@phosphor-icons/react";
import type { Dict, Lang } from "@/lib/i18n";
import { sendMessage, type ContactState } from "./actions";

export function ContactForm({ lang, t }: { lang: Lang; t: Dict["contact"] }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, {});
  const reduce = useReducedMotion();

  if (state.ok) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="glass grid place-items-center rounded-[2rem] p-12 text-center"
      >
        <motion.span
          initial={reduce ? false : { scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
          className="grid size-16 place-items-center rounded-full bg-accent text-accent-fg shadow-[0_0_40px_-5px_rgb(var(--glow))]"
        >
          <CheckCircle size={32} weight="fill" />
        </motion.span>
        <p className="mt-6 text-2xl font-semibold">{t.sent}</p>
        <p className="mt-2 text-muted">{t.thanks}</p>
      </motion.div>
    );
  }

  return (
    <form action={action} className="glass grid gap-5 rounded-[2rem] p-6 sm:p-8">
      <input type="hidden" name="lang" value={lang} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">{t.name}</label>
          <input id="name" name="name" required maxLength={120} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="email">{t.emailField}</label>
          <input id="email" name="email" type="email" required dir="ltr" className="input rtl:text-right" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="body">{t.message}</label>
        <textarea id="body" name="body" required rows={6} maxLength={5000} className="input resize-y" />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-red-500">
          {state.error}
        </p>
      )}
      <div>
        <button type="submit" disabled={pending} className="btn-primary min-w-36">
          {pending ? (
            <>
              <CircleNotch size={16} className="animate-spin" /> {t.sending}
            </>
          ) : (
            <>
              {t.send} <PaperPlaneTilt size={16} weight="bold" className="rtl:-scale-x-100" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
