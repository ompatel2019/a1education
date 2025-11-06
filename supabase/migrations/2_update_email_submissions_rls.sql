-- Update RLS policy to allow authenticated users to read submissions
drop policy if exists "admin can select all submissions" on email_marketing_submissions;

-- Allow authenticated users (including admin users) to read all submissions
create policy "authenticated users can select all submissions" on email_marketing_submissions
  for select to authenticated using (true);
