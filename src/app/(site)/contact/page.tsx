import type { Metadata } from "next";
import { Socials } from "@/components/socials";
import { getSettings } from "@/lib/data";
import { ContactForm } from "./contact-form";

export const revalidate = 60;
export const metadata: Metadata = { title: "تواصل" };

export default async function ContactPage() {
  const s = await getSettings();
  const info = [
    s.email && { k: "البريد", v: s.email, href: `mailto:${s.email}` },
    s.phone && { k: "الجوال", v: s.phone, href: `tel:${s.phone}` },
    s.location && { k: "الموقع", v: s.location },
  ].filter(Boolean) as { k: string; v: string; href?: string }[];

  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[1fr_1.4fr]">
      <div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">لنتحدث</h1>
        <p className="mt-4 text-lg text-muted">عندك مشروع أو فكرة؟ أرسل لي رسالة وبأرد عليك.</p>
        <dl className="mt-10 grid gap-5">
          {info.map((i) => (
            <div key={i.k}>
              <dt className="text-xs text-muted">{i.k}</dt>
              <dd className="mt-1 font-medium" dir="auto">
                {i.href ? <a href={i.href} className="hover:underline">{i.v}</a> : i.v}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <Socials socials={s.socials} />
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
