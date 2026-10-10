"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/works", label: "أعمالي" },
  { href: "/about", label: "عنّي" },
  { href: "/contact", label: "تواصل" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function NavLinks() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="hidden items-center gap-1 sm:flex">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`rounded-full px-4 py-2 text-sm transition ${
              isActive(pathname, l.href) ? "bg-subtle font-medium text-fg" : "text-muted hover:text-fg"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="القائمة"
        aria-expanded={open}
        className="grid size-9 place-items-center rounded-full border border-border sm:hidden"
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full border-b border-border bg-bg/95 px-4 py-3 backdrop-blur sm:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm ${
                isActive(pathname, l.href) ? "bg-subtle font-medium" : "text-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
