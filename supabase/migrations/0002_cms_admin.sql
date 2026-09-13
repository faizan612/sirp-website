-- sirp.io CMS — admin authoring layer on top of 0001_init.sql
-- Adds: structured Tiptap content, an admin allowlist, write-side RLS, and a
-- storage bucket for cover thumbnails. Auth is Supabase Auth (see AGENTS/CLAUDE
-- notes); NO service-role key is used by the app, so every write below is gated
-- by RLS against auth.uid().

-- ── 1. Structured content ────────────────────────────────────────────────
-- Tiptap emits a JSON document. We keep the legacy `content` (markdown/html)
-- column so existing posts still render, and add a nullable jsonb column that
-- new posts write to. The public renderer prefers content_json when present.
alter table public.blog_posts
  add column if not exists content_json jsonb;

-- Authoring bookkeeping (nullable so legacy rows are untouched).
alter table public.blog_posts
  add column if not exists updated_at timestamptz not null default now();

alter table public.blog_posts
  add column if not exists author_id uuid references auth.users (id);

-- Keep updated_at honest.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ── 2. Admin allowlist ───────────────────────────────────────────────────
-- Being able to authenticate is NOT the same as being allowed to author.
-- A user only gains write access once their auth.uid() is added here (e.g. by
-- a super-admin via the Supabase SQL editor). This is our authorization row.
create table if not exists public.cms_admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

alter table public.cms_admins enable row level security;

-- Admins may read the allowlist (used by the DAL to confirm role). No one can
-- write to it through the API — membership is granted out-of-band by a DBA.
drop policy if exists "admins read allowlist" on public.cms_admins;
create policy "admins read allowlist"
  on public.cms_admins for select
  to authenticated
  using (exists (select 1 from public.cms_admins a where a.user_id = auth.uid()));

-- Reusable predicate: is the current caller an allowlisted admin?
create or replace function public.is_cms_admin()
returns boolean language sql stable as $$
  select exists (select 1 from public.cms_admins a where a.user_id = auth.uid());
$$;

-- ── 3. Write-side RLS on blog_posts ──────────────────────────────────────
-- 0001 created only a public SELECT policy for published rows. Admins need to
-- see drafts and to write. These policies are additive.

-- Admins can read every row (drafts + scheduled + published).
drop policy if exists "admins read all posts" on public.blog_posts;
create policy "admins read all posts"
  on public.blog_posts for select
  to authenticated
  using (public.is_cms_admin());

drop policy if exists "admins insert posts" on public.blog_posts;
create policy "admins insert posts"
  on public.blog_posts for insert
  to authenticated
  with check (public.is_cms_admin());

drop policy if exists "admins update posts" on public.blog_posts;
create policy "admins update posts"
  on public.blog_posts for update
  to authenticated
  using (public.is_cms_admin())
  with check (public.is_cms_admin());

drop policy if exists "admins delete posts" on public.blog_posts;
create policy "admins delete posts"
  on public.blog_posts for delete
  to authenticated
  using (public.is_cms_admin());

-- ── 4. Storage bucket for cover thumbnails ───────────────────────────────
-- Public-read (blog images are shown to every visitor; next.config already
-- whitelists **.supabase.co/storage/v1/object/public/**), admin-only write.
insert into storage.buckets (id, name, public)
values ('blog-assets', 'blog-assets', true)
on conflict (id) do nothing;

drop policy if exists "public read blog assets" on storage.objects;
create policy "public read blog assets"
  on storage.objects for select
  using (bucket_id = 'blog-assets');

drop policy if exists "admins upload blog assets" on storage.objects;
create policy "admins upload blog assets"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-assets' and public.is_cms_admin());

drop policy if exists "admins update blog assets" on storage.objects;
create policy "admins update blog assets"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-assets' and public.is_cms_admin())
  with check (bucket_id = 'blog-assets' and public.is_cms_admin());

drop policy if exists "admins delete blog assets" on storage.objects;
create policy "admins delete blog assets"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-assets' and public.is_cms_admin());
