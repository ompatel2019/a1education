-- Track if a blog has already triggered a publish notification email

create table if not exists blog_notifications (
  id bigserial primary key,
  blog_id bigint not null references blogs(id) on delete cascade,
  status text default 'sent', -- sent | failed
  error_message text,
  notified_at timestamptz default now(),
  created_at timestamptz default now()
);

create unique index if not exists idx_blog_notifications_blog_id
  on blog_notifications (blog_id);

-- This table is only written by the server using the service role.
alter table blog_notifications disable row level security;

