import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <p className="text-7xl font-bold">404</p>
        <p className="mt-3 text-muted">الصفحة غير موجودة</p>
        <Link href="/" className="btn-primary mt-8">
          الرئيسية
        </Link>
      </div>
    </div>
  );
}
