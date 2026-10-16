-- =========================================================
-- Portfolio schema — شغّل هذا الملف كامل في Supabase > SQL Editor
-- =========================================================

-- الأدمن: المستخدمين المسموح لهم بالتحكم
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- إعدادات الموقع (صف واحد)
create table if not exists public.settings (
  id int primary key default 1 check (id = 1),
  name text not null default 'اسمك هنا',
  job_title text not null default 'مصمم ومطور',
  hero_title text not null default 'أصمّم تجارب رقمية بسيطة وواضحة',
  hero_subtitle text not null default 'هنا تجد مجموعة مختارة من أعمالي ومشاريعي.',
  about text not null default 'اكتب نبذة عنك من لوحة التحكم.',
  avatar_url text,
  email text,
  phone text,
  location text,
  skills text[] not null default '{}',
  socials jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.settings (id) values (1) on conflict do nothing;

-- الأعمال
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null default '',
  description text not null default '',
  category text not null default '',
  cover_url text,
  images text[] not null default '{}',
  tags text[] not null default '{}',
  link text,
  year int,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists projects_order_idx on public.projects (sort_order, created_at desc);

-- رسائل التواصل
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  body text not null check (char_length(body) between 1 and 5000),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ===================== RLS =====================
alter table public.admins   enable row level security;
alter table public.settings enable row level security;
alter table public.projects enable row level security;
alter table public.messages enable row level security;

drop policy if exists "admins self read" on public.admins;
create policy "admins self read" on public.admins for select using (user_id = auth.uid());

drop policy if exists "settings public read" on public.settings;
create policy "settings public read" on public.settings for select using (true);
drop policy if exists "settings admin write" on public.settings;
create policy "settings admin write" on public.settings for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "projects public read" on public.projects;
create policy "projects public read" on public.projects for select using (published or public.is_admin());
drop policy if exists "projects admin insert" on public.projects;
create policy "projects admin insert" on public.projects for insert with check (public.is_admin());
drop policy if exists "projects admin update" on public.projects;
create policy "projects admin update" on public.projects for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "projects admin delete" on public.projects;
create policy "projects admin delete" on public.projects for delete using (public.is_admin());

drop policy if exists "messages anyone insert" on public.messages;
create policy "messages anyone insert" on public.messages for insert with check (read = false);
drop policy if exists "messages admin read" on public.messages;
create policy "messages admin read" on public.messages for select using (public.is_admin());
drop policy if exists "messages admin update" on public.messages;
create policy "messages admin update" on public.messages for update using (public.is_admin());
drop policy if exists "messages admin delete" on public.messages;
create policy "messages admin delete" on public.messages for delete using (public.is_admin());

-- ===================== Storage =====================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert" on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects for update using (bucket_id = 'media' and public.is_admin());
drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects for delete using (bucket_id = 'media' and public.is_admin());

-- =========================================================
-- بعد ما تسوي حسابك من Authentication > Users، شغّل هذا السطر
-- (غيّر الإيميل لإيميلك) عشان تصير أدمن:
--
-- insert into public.admins (user_id)
-- select id from auth.users where email = 'you@example.com';
-- =========================================================

-- =========================================================
-- v2: English content + testimonials
-- آمن للتشغيل أكثر من مرة. شغّله على أي قاعدة قديمة عشان تضيف الأعمدة الجديدة.
-- =========================================================

-- English versions (empty = fall back to Arabic on the English site)
alter table public.settings add column if not exists name_en text not null default '';
alter table public.settings add column if not exists job_title_en text not null default '';
alter table public.settings add column if not exists hero_title_en text not null default '';
alter table public.settings add column if not exists hero_subtitle_en text not null default '';
alter table public.settings add column if not exists about_en text not null default '';
alter table public.settings add column if not exists location_en text not null default '';

alter table public.projects add column if not exists title_en text not null default '';
alter table public.projects add column if not exists summary_en text not null default '';
alter table public.projects add column if not exists description_en text not null default '';
alter table public.projects add column if not exists category_en text not null default '';

-- آراء العملاء
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_en text not null default '',
  role text not null default '',
  role_en text not null default '',
  quote text not null,
  quote_en text not null default '',
  avatar_url text,
  rating int not null default 5 check (rating between 1 and 5),
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists testimonials_order_idx on public.testimonials (sort_order, created_at desc);

alter table public.testimonials enable row level security;

drop policy if exists "testimonials public read" on public.testimonials;
create policy "testimonials public read" on public.testimonials for select using (published or public.is_admin());
drop policy if exists "testimonials admin insert" on public.testimonials;
create policy "testimonials admin insert" on public.testimonials for insert with check (public.is_admin());
drop policy if exists "testimonials admin update" on public.testimonials;
create policy "testimonials admin update" on public.testimonials for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "testimonials admin delete" on public.testimonials;
create policy "testimonials admin delete" on public.testimonials for delete using (public.is_admin());
