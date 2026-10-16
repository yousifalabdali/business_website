import Image from "next/image";
import { Quotes, Star } from "@phosphor-icons/react/ssr";
import { KineticHeading } from "./motion/kinetic-heading";
import { Reveal } from "./motion/reveal";
import type { Dict } from "@/lib/i18n";
import type { Testimonial } from "@/lib/types";

export function Testimonials({
  items,
  title,
  t,
}: {
  items: Testimonial[];
  title: string;
  t: Dict["testimonials"];
}) {
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <KineticHeading as="h2" text={title} className="mb-10 text-4xl font-bold sm:text-5xl" />
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((it, i) => (
          <Reveal key={it.id} delay={(i % 3) * 0.06} className="mb-4 break-inside-avoid">
            <figure className="glass flex flex-col gap-6 rounded-3xl p-6 sm:p-8">
              <Quotes size={28} weight="fill" className="text-accent rtl:-scale-x-100" aria-hidden />
              <blockquote className="whitespace-pre-line text-lg leading-loose text-fg/90">{it.quote}</blockquote>
              <div className="mt-auto flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-subtle font-semibold text-muted">
                    {it.avatar_url ? (
                      <Image src={it.avatar_url} alt="" fill sizes="44px" className="object-cover" />
                    ) : (
                      it.name.slice(0, 1)
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{it.name}</p>
                    {it.role && <p className="truncate text-sm text-muted">{it.role}</p>}
                  </div>
                </div>
                <span className="flex shrink-0 gap-0.5 text-accent" role="img" aria-label={t.rating(it.rating)}>
                  {Array.from({ length: 5 }, (_, n) => (
                    <Star key={n} size={14} weight={n < it.rating ? "fill" : "regular"} className={n < it.rating ? "" : "opacity-30"} />
                  ))}
                </span>
              </div>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
