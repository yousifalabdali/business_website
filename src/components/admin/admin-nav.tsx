"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "نظرة عامة" },
  { href: "/admin/projects", label: "الأعمال" },
  { href: "/admin/messages", label: "الرسائل" },
  { href: "/admin/settings", label: "الإعدادات" },
];

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto md:flex-col">
      {LINKS.map((l) => {
        const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`flex shrink-0 items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-sm transition ${
              active ? "bg-subtle font-medium text-fg" : "text-muted hover:text-fg"
            }`}
          >
            {l.label}
            {l.href === "/admin/messages" && unread > 0 && (
              <span className="rounded-full bg-accent px-2 text-xs text-accent-fg">{unread}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
