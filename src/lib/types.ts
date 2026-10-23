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
  name_en: string;
  job_title_en: string;
  hero_title_en: string;
  hero_subtitle_en: string;
  about_en: string;
  location_en: string;
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
  title_en: string;
  summary_en: string;
  description_en: string;
  category_en: string;
};

export type Testimonial = {
  id: string;
  name: string;
  name_en: string;
  role: string;
  role_en: string;
  quote: string;
  quote_en: string;
  avatar_url: string | null;
  rating: number;
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
