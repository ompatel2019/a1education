alter table public.blogs
add column if not exists blog_downloadables jsonb null default '[]'::jsonb;
