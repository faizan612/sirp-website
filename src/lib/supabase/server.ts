import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { resolveSupabaseCredentials } from './credentials'

/**
 * Anonymous, cookie-less Supabase client for public reads (blog listing/detail).
 * Uses only the publishable key and is subject to the "public read published
 * posts" RLS policy. For authenticated admin work use the SSR client in
 * `./server-auth`, which binds to the request's session cookies.
 */
export function createSupabaseClient(): SupabaseClient | null {
  const { url, key } = resolveSupabaseCredentials()
  return createClient(url, key)
}
