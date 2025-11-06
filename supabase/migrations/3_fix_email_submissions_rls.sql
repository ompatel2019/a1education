-- Fix RLS policies for email_marketing_submissions

-- Drop existing policies if they exist
drop policy if exists "public can insert email submissions" on email_marketing_submissions;
drop policy if exists "admin can select all submissions" on email_marketing_submissions;
drop policy if exists "authenticated users can select all submissions" on email_marketing_submissions;

-- Allow anonymous users to insert (for newsletter signups)
create policy "public can insert email submissions" on email_marketing_submissions
  for insert to anon with check (true);

-- Allow authenticated users to read all submissions (for admin panel)
create policy "authenticated users can select all submissions" on email_marketing_submissions
  for select to authenticated using (true);
