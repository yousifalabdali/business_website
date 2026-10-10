import type { Socials as SocialsT } from "@/lib/types";

const LABELS: Record<string, string> = {
  instagram: "Instagram",
  x: "X",
  linkedin: "LinkedIn",
  behance: "Behance",
  dribbble: "Dribbble",
  github: "GitHub",
  whatsapp: "WhatsApp",
};

export function Socials({ socials }: { socials: SocialsT }) {
  const entries = Object.entries(socials).filter(([, v]) => v);
  if (!entries.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {entries.map(([k, v]) => (
        <li key={k}>
          <a
            href={v}
            target="_blank"
            rel="noopener noreferrer"
            className="neu inline-block rounded-full px-4 py-1.5 text-sm text-muted transition duration-300 hover:-translate-y-0.5 hover:text-accent active:scale-95"
          >
            {LABELS[k] ?? k}
          </a>
        </li>
      ))}
    </ul>
  );
}
