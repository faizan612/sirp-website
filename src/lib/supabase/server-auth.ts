import 'server-only'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { resolveSupabaseCredentials } from './credentials'

/**
 * Cookie-bound Supabase client for authenticated server work (Server
 * Components, Server Actions, Route Handlers). Reads the Supabase Auth session
 * from the request cookies so all queries run as the signed-in user and are
 * subject to RLS — writes only succeed for allowlisted `cms_admins`.
 *
 * Next 16: `cookies()` is async and must be awaited (sync access was removed).
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  const { url, key } = resolveSupabaseCredentials()

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options)
          }
        } catch {
          // `setAll` was called from a Server Component, where mutating cookies
          // is disallowed. Safe to ignore: the proxy refreshes the session on
          // the next request. (Supabase-recommended pattern.)
        }
      },
    },
  })
}
