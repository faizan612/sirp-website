'use server'

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server-auth'

export type LoginState = { error?: string }

/**
 * Email + password sign-in via Supabase Auth. Credentials are validated by
 * Supabase; the SSR client persists the session cookies. Shape matches
 * `useActionState`. We deliberately return a generic error to avoid leaking
 * which of email/password was wrong.
 */
export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '/admin')

  if (!email || !password) {
    return { error: 'Enter your email and password.' }
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'Invalid credentials.' }
  }

  // Only redirect to internal admin paths (open-redirect guard).
  const dest = next.startsWith('/admin') ? next : '/admin'
  redirect(dest)
}

export async function logoutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
