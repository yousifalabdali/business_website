// Explicit column lists — avoid select("*") so Postgres/PostgREST only ship what we use.
export const SETTINGS_COLUMNS =
  "id,name,job_title,hero_title,hero_subtitle,about,avatar_url,email,phone,location,skills,socials,name_en,job_title_en,hero_title_en,hero_subtitle_en,about_en,location_en";

export const PROJECT_COLUMNS =
  "id,title,slug,summary,description,category,cover_url,images,tags,link,year,featured,published,sort_order,created_at,title_en,summary_en,description_en,category_en";

export const TESTIMONIAL_COLUMNS =
  "id,name,name_en,role,role_en,quote,quote_en,avatar_url,rating,published,sort_order,created_at";

export const MESSAGE_COLUMNS = "id,name,email,body,read,created_at";
