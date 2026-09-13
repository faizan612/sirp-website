-- 0005 — self-service account creation for invited teammates, no
-- service-role key required.
--
-- The join page lets a pre-invited teammate create their own account (email +
-- password they choose) via the ordinary anon-key `auth.signUp()` — the same
-- call underlying any public sign-up form. To make this safe without an open
-- public signup surface, an anonymous visitor must first pass this check:
-- "is this exact email already in cms_admin_invites?". The check runs via a
-- SECURITY DEFINER function so anon callers can test membership without ever
-- being granted a raw SELECT on cms_admin_invites.

create or replace function public.is_invited_email(p_email text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.cms_admin_invites i
    where lower(i.email) = lower(p_email)
  );
$$;

-- anon: the join page runs unauthenticated. authenticated: harmless, and
-- keeps the check usable from any session state.
grant execute on function public.is_invited_email(text) to anon, authenticated;
