-- Create a table for email marketing subscriptions

create table email_marketing_submissions (
  id bigserial primary key,
  name text, -- user's name
  email text not null, -- user's email
  source text, -- e.g., 'blog', 'cta', 'resource', 'popup'
  created_at timestamptz default now()
);

-- (Optional) For privacy, ensure emails are unique
create unique index on email_marketing_submissions (email);

-- Enable row level security by default
alter table email_marketing_submissions enable row level security;

-- Simple RLS: Allow inserts and selects for anonymous users (public site capture)
create policy "public can insert email submissions" on email_marketing_submissions
  for insert to anon with check (true);

create policy "admin can select all submissions" on email_marketing_submissions
  for select to service_role using (true);
