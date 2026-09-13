import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { resolveSupabaseCredentials } from './credentials'

/**
 * Service-role Supabase client — bypasses Row Level Security entirely.
 *
 * Scope this tightly: import it ONLY from the single admin-provisioning
 * action (`createAdminAccountAction`), never from anything reachable by
 * unauthenticated code, and never pass this client (or the key) to the
 * browser. Unlike the anon key, there is deliberately NO hardcoded fallback
 * here — a leaked service-role key is a full database compromise, so a
 * missing env var must fail loudly rather than silently degrade to some
 * baked-in secret.
 */
export function createSupabaseAdminClient() {
  const { url } = resolveSupabaseCredentials()
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set. Add it to your server environment (never NEXT_PUBLIC_*) to enable admin account provisioning.',
    )
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
