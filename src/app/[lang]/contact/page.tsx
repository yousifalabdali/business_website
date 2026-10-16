import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/ssr";
import { KineticHeading } from "@/components/motion/kinetic-heading";
import { Reveal } from "@/components/motion/reveal";
import { Socials } from "@/components/socials";
import { getSettings } from "@/lib/data";
import { getDict, isLang } from "@/lib/i18n";
import { ContactForm } from "./contact-form";

export const revalidate = 60;
export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  return isLang(lang) ? { title: getDict(lang).contact.title } : {};
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang).contact;
  const s = await getSettings(lang);
  const info = [
    s.email && { k: t.email, v: s.email, href: `mailto:${s.email}`, Icon: EnvelopeSimple },
    s.phone && { k: t.phone, v: s.phone, href: `tel:${s.phone}`, Icon: Phone },
    s.location && { k: t.location, v: s.location, Icon: MapPin },
  ].filter(Boolean) as { k: string; v: string; href?: string; Icon: typeof EnvelopeSimple }[];

  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[1fr_1.3fr]">
      <div>
        <KineticHeading text={t.heading} className="text-display" />
        <Reveal delay={0.2}>
          <p className="mt-6 text-lg leading-relaxed text-muted">{t.intro}</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 grid gap-3">
          {info.map(({ k, v, href, Icon }) => (
            <div key={k} className="flex items-center gap-4">
              <span className="neu grid size-11 shrink-0 place-items-center rounded-full text-accent">
                <Icon size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted">{k}</p>
                <p className="truncate font-medium" dir="auto">
                  {href ? (
                    <a href={href} className="transition hover:text-accent">
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.4} className="mt-8">
          <Socials socials={s.socials} />
        </Reveal>
      </div>
      <Reveal delay={0.15}>
        <ContactForm lang={lang} t={t} />
      </Reveal>
    </section>
  );
}
