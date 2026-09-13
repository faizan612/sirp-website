import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { resolveSupabaseCredentials } from './credentials'

/**
 * Builds a Supabase client wired to the proxy request/response cookies and
 * returns it alongside the response object whose cookies it mutates.
 *
 * Calling `supabase.auth.getUser()` with this client both validates and, when
 * needed, refreshes the session — writing rotated tokens back onto `response`.
 * Used only by the root `proxy.tsx` for the optimistic `/admin/*` gate; real
 * authorization happens in the DAL (`@/lib/auth/dal`).
 */
export function createSupabaseProxyClient(request: NextRequest) {
  // Start from a pass-through response we can attach refreshed cookies to.
  let response = NextResponse.next({ request })
  const { url, key } = resolveSupabaseCredentials()

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value)
        }
        response = NextResponse.next({ request })
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options)
        }
      },
    },
  })

  return { supabase, response: () => response }
}
