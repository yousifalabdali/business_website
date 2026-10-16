import type { Metadata } from "next";
import { arabicFont, ThemeScript } from "@/lib/root";
import "../globals.css";

export const metadata: Metadata = { robots: { index: false } };

// The dashboard stays Arabic-only; it has its own root layout separate from the public site.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={arabicFont.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
