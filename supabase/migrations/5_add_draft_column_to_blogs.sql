-- Ensure draft column exists for existing deployments
alter table blogs
  add column if not exists draft boolean default true;

-- Remove legacy is_published column if it still exists
alter table blogs
  drop column if exists is_published;

-- Normalize existing records
update blogs
set draft = coalesce(draft, true)
where draft is null;

-- Index to quickly filter out drafts
create index if not exists idx_blogs_draft on blogs (draft);

-- Refresh public select policy to ensure only non-draft posts are exposed
drop policy if exists "public can view published blogs" on blogs;

create policy "public can view published blogs" on blogs
  for select to anon, authenticated
  using (draft = false);
