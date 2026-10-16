"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDict, localePath } from "@/lib/i18n";

export default function NotFound() {
  const lang = usePathname().startsWith("/en") ? "en" : "ar";
  const t = getDict(lang).notFound;
  return (
    <div className="grid min-h-[60dvh] place-items-center px-4 text-center">
      <div>
        <p className="text-7xl font-bold">404</p>
        <p className="mt-3 text-muted">{t.title}</p>
        <Link href={localePath(lang, "/")} className="btn-primary mt-8">
          {t.home}
        </Link>
      </div>
    </div>
  );
}
