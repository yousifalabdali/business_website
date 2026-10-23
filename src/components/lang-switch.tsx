"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, stripLang, type Lang } from "@/lib/i18n";

/** Links to the same page in the other language. */
export function LangSwitch({ lang, label, aria }: { lang: Lang; label: string; aria: string }) {
  const other: Lang = lang === "ar" ? "en" : "ar";
  const href = localePath(other, stripLang(usePathname()));
  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      aria-label={aria}
      className="neu grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-semibold transition duration-300 hover:text-accent active:scale-90"
    >
      {label}
    </Link>
  );
}
