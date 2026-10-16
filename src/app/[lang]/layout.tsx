import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LangSwitch } from "@/components/lang-switch";
import { Brand } from "@/components/logo";
import { NavLinks } from "@/components/nav-links";
import { Socials } from "@/components/socials";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSettings } from "@/lib/data";
import { dirOf, getDict, isLang, LANGS, localePath } from "@/lib/i18n";
import { arabicFont, ThemeScript } from "@/lib/root";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const s = await getSettings(lang);
  return {
    title: { default: `${s.name} | ${s.job_title}`, template: `%s | ${s.name}` },
    description: s.hero_subtitle,
    alternates: { languages: { ar: "/", en: "/en" } },
  };
}

export default async function SiteLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const [s, t] = [await getSettings(lang), getDict(lang)];

  return (
    <html lang={lang} dir={dirOf(lang)} className={arabicFont.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh">
        <div className="relative flex min-h-dvh flex-col">
          <div className="ambient" aria-hidden />
          <div className="grain" aria-hidden />

          <header className="sticky top-3 z-40 px-3 sm:top-4">
            <div className="glass relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full pe-2 ps-5">
              <Link href={localePath(lang, "/")} aria-label={s.name}>
                <Brand name={s.name} />
              </Link>
              <div className="flex items-center gap-1.5">
                <NavLinks lang={lang} t={t.nav} />
                <LangSwitch lang={lang} label={t.switchLang} aria={t.switchLangLabel} />
                <ThemeToggle label={t.theme} />
              </div>
            </div>
          </header>

          <main className="page-in flex-1 pt-6">{children}</main>

          <footer className="border-t border-border">
            <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6">
              <p className="text-display select-none text-fg/10" aria-hidden>
                {s.name}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                  © {new Date().getFullYear()} {s.name}. {t.rights}
                </p>
                <Socials socials={s.socials} />
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
