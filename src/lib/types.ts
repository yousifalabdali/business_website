export type Socials = Partial<
  Record<"instagram" | "x" | "linkedin" | "behance" | "dribbble" | "github" | "whatsapp", string>
>;

export type Settings = {
  id: number;
  name: string;
  job_title: string;
  hero_title: string;
  hero_subtitle: string;
  about: string;
  avatar_url: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  skills: string[];
  socials: Socials;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  cover_url: string | null;
  images: string[];
  tags: string[];
  link: string | null;
  year: number | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  body: string;
  read: boolean;
  created_at: string;
};
