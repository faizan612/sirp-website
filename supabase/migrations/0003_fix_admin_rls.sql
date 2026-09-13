-- 0003 — fix cms_admins RLS recursion introduced in 0002.
--
-- The 0002 "admins read allowlist" policy was self-referential: reading
-- cms_admins required a subquery on cms_admins, which is itself RLS-filtered by
-- the same policy → "infinite recursion detected in policy for relation
-- cms_admins". That made verifySession() error out and reject every user, even
-- allowlisted ones. (The SQL editor runs as the RLS-bypassing `postgres` role,
-- which is why the row looked fine there but the app — the `authenticated`
-- role — could not see it.)

-- 1. Non-recursive self-read: a user may read only their OWN allowlist row.
--    This is all verifySession() needs (it filters by user_id = auth.uid()).
drop policy if exists "admins read allowlist" on public.cms_admins;
drop policy if exists "read own admin row" on public.cms_admins;
create policy "read own admin row"
  on public.cms_admins for select
  to authenticated
  using (user_id = auth.uid());

-- 2. Make the membership predicate SECURITY DEFINER so the checks embedded in
--    the blog_posts / storage.objects write policies bypass cms_admins RLS
--    cleanly (no recursion, no dependence on the reader's own visibility).
--    It only ever returns a boolean about the current auth.uid(); search_path
--    is pinned to prevent hijacking.
create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.cms_admins a where a.user_id = auth.uid());
$$;
