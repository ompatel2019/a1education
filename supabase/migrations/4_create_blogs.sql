-- Create a table for blog posts

create table blogs (
  id bigserial primary key,
  slug text not null unique, -- URL-friendly identifier (e.g., "understanding-hsc-economics")
  blog_hero text, -- Image URL/path for the hero background
  blog_header text not null, -- Main title/heading
  blog_subheading text not null, -- Subtitle/excerpt
  blog_tags jsonb default '[]'::jsonb, -- Array of tag strings: ["Economics", "HSC", "8 min read"]
  blog_text jsonb default '[]'::jsonb, -- Array of section objects: [{"section_heading": "...", "section_text": "..."}]
  blog_context jsonb default '{}'::jsonb, -- Object with metadata: {"date": "2025-01-05", "author": "Sarah Johnson", "readTime": "8 min read"}
  draft boolean default true, -- Draft flag
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create index on slug for fast lookups
create index idx_blogs_slug on blogs (slug);

-- Create index on created_at for sorting
create index idx_blogs_created_at on blogs (created_at desc);

-- Enable row level security
alter table blogs enable row level security;

-- Policy: Anyone can view published blogs
create policy "public can view published blogs" on blogs
  for select to anon, authenticated using (draft = false);

-- Policy: Only authenticated users (admins) can insert blogs
create policy "authenticated users can insert blogs" on blogs
  for insert to authenticated with check (true);

-- Policy: Only authenticated users (admins) can update blogs
create policy "authenticated users can update blogs" on blogs
  for update to authenticated using (true);

-- Policy: Only authenticated users (admins) can delete blogs
create policy "authenticated users can delete blogs" on blogs
  for delete to authenticated using (true);

-- Function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at on blog updates
create trigger update_blogs_updated_at
  before update on blogs
  for each row
  execute function update_updated_at_column();
