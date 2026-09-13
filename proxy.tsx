import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseProxyClient } from '@/lib/supabase/proxy'

/**
 * Next 16 Proxy (formerly Middleware — the `middleware.ts` convention is
 * deprecated; the file is `proxy.tsx` and the export is `proxy`). Runs on the
 * Node.js runtime.
 *
 * Responsibilities, intentionally narrow:
 *   1. Refresh the Supabase session on every request (auth.getUser writes any
 *      rotated cookies onto the response) so Server Components see a live token.
 *   2. Perform an OPTIMISTIC redirect for unauthenticated visitors to /admin/*.
 *
 * This is a gate, not the guard. Per Next 16 guidance the proxy must not be the
 * only authorization check — `@/lib/auth/dal#verifySession` re-checks the
 * session (and admin allowlist) close to the data, and Postgres RLS backstops
 * every write. Keeping the proxy to a cookie check keeps it fast on the many
 * prefetch requests that hit it.
 */
export async function proxy(request: NextRequest) {
  const { supabase, response } = createSupabaseProxyClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isLogin = pathname === '/admin/login'
  const isAdminArea = pathname.startsWith('/admin')

  // Unauthenticated user hitting a protected admin path → login.
  if (isAdminArea && !isLogin && !user) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Already signed in but sitting on the login page → dashboard.
  if (isLogin && user) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response()
}

export const config = {
  // Run on admin routes only; skip static assets and the public site entirely.
  matcher: ['/admin/:path*'],
}
