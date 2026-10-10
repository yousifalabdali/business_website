import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { Socials } from "@/components/socials";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/80 backdrop-blur-xl">
        <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="text-base font-bold tracking-tight">
            {s.name}
          </Link>
          <div className="flex items-center gap-2">
            <NavLinks />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="page-in flex-1">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {s.name}. جميع الحقوق محفوظة.
          </p>
          <Socials socials={s.socials} />
        </div>
      </footer>
    </div>
  );
}
