/**
 * Single source of truth for the project's public Supabase identifiers.
 *
 * The URL and the *publishable/anon* key are NOT secrets — they are shipped to
 * every browser by design. They are baked in as a fallback because deployment
 * env vars have pointed at a deleted project before (July 2026 outage) and we
 * cannot always edit them. The service-role key is deliberately absent: the CMS
 * never uses it, so nothing in this app can bypass Row Level Security.
 */
const FALLBACK_URL = 'https://iamrjfypqtdfmmdxkozo.supabase.co'
const FALLBACK_KEY = 'sb_publishable_D_q5QdDDrsJ99C_79v_jHg_ih27YxxT'

/** Project refs that no longer exist; env pointing here must be ignored. */
const DEAD_PROJECT_REFS = ['wyqlabvqcrgdiebgwden']

/** Resolve the URL/anon-key pair, healing missing or dead env config. */
export function resolveSupabaseCredentials(): { url: string; key: string } {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL
  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Missing or dead env config: fall back to the known-good pair. The key is
  // swapped together with the URL because keys are bound to one project.
  if (!url || !key || DEAD_PROJECT_REFS.some((ref) => url!.includes(ref))) {
    url = FALLBACK_URL
    key = FALLBACK_KEY
  }

  return { url, key }
}
