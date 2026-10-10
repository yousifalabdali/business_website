import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "دخول الأدمن", robots: { index: false } };

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  const { error } = await searchParams;
  return (
    <div className="grid min-h-dvh place-items-center px-4">
      <div className="absolute left-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6"><LogoMark className="h-8" preload /></div>
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <p className="mb-8 mt-1 text-sm text-muted">سجّل دخولك للمتابعة</p>
        <LoginForm notAdmin={error === "not-admin"} />
        <Link href="/" className="mt-6 block text-center text-sm text-muted hover:text-fg">
          → العودة للموقع
        </Link>
      </div>
    </div>
  );
}
