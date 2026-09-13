import 'server-only'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server-auth'

export type AdminSession = {
  userId: string
  email: string | null
}

/**
 * Data Access Layer — the authoritative auth check, run close to the data
 * (Next 16 guidance: the proxy is only an optimistic gate). Verifies there is a
 * valid Supabase Auth session AND that the user is an allowlisted `cms_admin`.
 * Redirects to the login page otherwise, so callers can treat a return value as
 * proof of authorization.
 *
 * Memoized per render pass with React `cache` to avoid duplicate round-trips.
 */
export const verifySession = cache(async (): Promise<AdminSession> => {
  const supabase = await createSupabaseServerClient()

  // getUser() revalidates the token with Supabase; never trust getSession()
  // alone for authorization.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Authorization: authentication is not authoring rights. RLS enforces this at
  // the row level too, but we fail fast here for a clean redirect.
  const { data: admin, error } = await supabase
    .from('cms_admins')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()

  // A query error here (e.g. a broken RLS policy) is NOT the same as "not an
  // admin" — surface it so it can't hide behind the not_authorized redirect.
  if (error) {
    console.error('[auth] cms_admins lookup failed:', error.message)
  }

  if (!admin) {
    redirect('/admin/login?error=not_authorized')
  }

  return { userId: user.id, email: user.email ?? null }
})

/** Non-redirecting variant for places that need to branch on auth state. */
export const getAdminSession = cache(async (): Promise<AdminSession | null> => {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: admin, error } = await supabase
    .from('cms_admins')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    console.error('[auth] cms_admins lookup failed:', error.message)
  }

  return admin ? { userId: user.id, email: user.email ?? null } : null
})
