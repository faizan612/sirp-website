-- 0006 — SEO audit results, refreshed on demand from /admin/seo.
--
-- One row per route (page path), holding the last audit run's score and
-- issue list. Overwritten on each "Run audit" click — this is a cache of the
-- last crawl, not a history table. Admin-only, same trust model as
-- blog_posts: RLS gated by is_cms_admin(), no service-role client needed.

create table if not exists public.seo_audits (
  route       text primary key,
  http_status int not null,
  score       int not null,
  issues      jsonb not null default '[]'::jsonb,
  checked_at  timestamptz not null default now()
);

alter table public.seo_audits enable row level security;

drop policy if exists "admins read seo audits" on public.seo_audits;
create policy "admins read seo audits"
  on public.seo_audits for select
  to authenticated
  using (public.is_cms_admin());

drop policy if exists "admins insert seo audits" on public.seo_audits;
create policy "admins insert seo audits"
  on public.seo_audits for insert
  to authenticated
  with check (public.is_cms_admin());

drop policy if exists "admins update seo audits" on public.seo_audits;
create policy "admins update seo audits"
  on public.seo_audits for update
  to authenticated
  using (public.is_cms_admin())
  with check (public.is_cms_admin());

drop policy if exists "admins delete seo audits" on public.seo_audits;
create policy "admins delete seo audits"
  on public.seo_audits for delete
  to authenticated
  using (public.is_cms_admin());
