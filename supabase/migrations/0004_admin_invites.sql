-- 0004 — teammate invites without a service-role key.
--
-- Flow: an existing admin pre-authorises an email from the CMS (insert into
-- cms_admin_invites, gated by is_cms_admin()). When that person's Supabase Auth
-- account is later created (by a super-admin in the dashboard), a trigger on
-- auth.users auto-promotes them into cms_admins and clears the invite. The app
-- only ever writes to an RLS-gated table — nothing here bypasses RLS from the
-- application, keeping the "no service-role key" invariant.

-- ── 1. Pending invites ────────────────────────────────────────────────────
create table if not exists public.cms_admin_invites (
  email      text primary key,           -- stored lower-cased by the app
  invited_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

alter table public.cms_admin_invites enable row level security;

-- Admins may fully manage invites; no one else can see or touch them.
drop policy if exists "admins read invites" on public.cms_admin_invites;
create policy "admins read invites"
  on public.cms_admin_invites for select
  to authenticated using (public.is_cms_admin());

drop policy if exists "admins insert invites" on public.cms_admin_invites;
create policy "admins insert invites"
  on public.cms_admin_invites for insert
  to authenticated with check (public.is_cms_admin());

drop policy if exists "admins delete invites" on public.cms_admin_invites;
create policy "admins delete invites"
  on public.cms_admin_invites for delete
  to authenticated using (public.is_cms_admin());

-- ── 2. Let admins see the full admin roster (for the Team page) ────────────
-- 0002/0003 only granted each admin a read of their OWN cms_admins row. The
-- Team page needs the whole list; is_cms_admin() is SECURITY DEFINER so this
-- does not recurse.
drop policy if exists "admins read all admins" on public.cms_admins;
create policy "admins read all admins"
  on public.cms_admins for select
  to authenticated using (public.is_cms_admin());

-- ── 3. Auto-promote invited users on account creation ─────────────────────
-- SECURITY DEFINER so it can read invites / write cms_admins regardless of the
-- (nonexistent) RLS context during the auth signup transaction.
create or replace function public.promote_invited_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (
    select 1 from public.cms_admin_invites i
    where lower(i.email) = lower(new.email)
  ) then
    insert into public.cms_admins (user_id, email)
    values (new.id, new.email)
    on conflict (user_id) do nothing;

    delete from public.cms_admin_invites where lower(email) = lower(new.email);
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_promote on auth.users;
create trigger on_auth_user_created_promote
  after insert on auth.users
  for each row execute function public.promote_invited_admin();
