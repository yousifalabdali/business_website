import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { Socials } from "@/components/socials";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div className="ambient" aria-hidden />
      <div className="grain" aria-hidden />

      <header className="sticky top-3 z-40 px-3 sm:top-4">
        <div className="glass relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full pe-2 ps-5">
          <Link href="/" className="text-base font-bold">
            {s.name}
          </Link>
          <div className="flex items-center gap-1.5">
            <NavLinks />
            <ThemeToggle />
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
              © {new Date().getFullYear()} {s.name}. جميع الحقوق محفوظة.
            </p>
            <Socials socials={s.socials} />
          </div>
        </div>
      </footer>
    </div>
  );
}
