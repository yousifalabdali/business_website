import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Socials } from "@/components/socials";
import { getSettings } from "@/lib/data";

export const revalidate = 60;
export const metadata: Metadata = { title: "عنّي" };

export default async function AboutPage() {
  const s = await getSettings();
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[320px_1fr]">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-subtle">
          {s.avatar_url ? (
            <Image src={s.avatar_url} alt={s.name} fill preload sizes="320px" className="object-cover" />
          ) : (
            <div className="grid h-full place-items-center text-7xl font-bold text-muted/30">{s.name.slice(0, 1)}</div>
          )}
        </div>
      </div>
      <div>
        <p className="text-sm text-muted">{s.job_title}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{s.name}</h1>
        <div className="mt-8 whitespace-pre-line text-lg leading-loose">{s.about}</div>

        {s.skills.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 font-semibold">المهارات</h2>
            <ul className="flex flex-wrap gap-2">
              {s.skills.map((k) => (
                <li key={k} className="rounded-full bg-subtle px-4 py-1.5 text-sm">
                  {k}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/contact" className="btn-primary">
            لنعمل معاً
          </Link>
          <Socials socials={s.socials} />
        </div>
      </div>
    </section>
  );
}
