insert into storage.buckets (id, name, public)
values ('blog-downloadables', 'blog-downloadables', true)
on conflict (id) do nothing;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public read for blog downloadables'
  ) then
    execute $policy$
      create policy "Public read for blog downloadables"
      on storage.objects for select
      using (bucket_id = 'blog-downloadables');
    $policy$;
  end if;
end
$$;
