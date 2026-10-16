"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { localePath, stripLang, type Dict, type Lang } from "@/lib/i18n";

const LINKS = [
  { href: "/", key: "home" },
  { href: "/works", key: "works" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function NavLinks({ lang, t }: { lang: Lang; t: Dict["nav"] }) {
  const pathname = stripLang(usePathname());
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="hidden items-center gap-1 sm:flex">
        {LINKS.map((l) => {
          const active = isActive(pathname, l.href);
          return (
            <Link
              key={l.href}
              href={localePath(lang, l.href)}
              className={`relative isolate rounded-full px-4 py-2 text-sm transition-colors ${
                active ? "font-medium text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="neu absolute inset-0 -z-10 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {t[l.key]}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t.menu}
        aria-expanded={open}
        className="grid size-10 place-items-center rounded-full transition hover:bg-subtle active:scale-95 sm:hidden"
      >
        {open ? <X size={18} /> : <List size={18} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute inset-x-0 top-full mt-2 rounded-3xl p-2 sm:hidden"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={localePath(lang, l.href)}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-sm ${
                  isActive(pathname, l.href) ? "neu font-medium" : "text-muted"
                }`}
              >
                {t[l.key]}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
