import 'server-only'
import { createSupabaseServerClient } from '@/lib/supabase/server-auth'
import { verifySession } from '@/lib/auth/dal'
import type { AdminPostListItem, AdminPostRow, AdminUser } from './types'

function statusOf(publishedAt: string | null): AdminPostListItem['status'] {
  if (!publishedAt) return 'draft'
  return new Date(publishedAt).getTime() <= Date.now() ? 'published' : 'scheduled'
}

/** All posts (drafts included) for the admin list view. RLS scopes this to
 *  admins; verifySession fails fast for everyone else. */
export async function getAdminPosts(): Promise<AdminPostListItem[]> {
  await verifySession()
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, type, published_at, updated_at')
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('[cms] getAdminPosts:', error.message)
    return []
  }

  return (data ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    type: r.type,
    status: statusOf(r.published_at),
    publishedAt: r.published_at,
    updatedAt: r.updated_at,
  }))
}

/** A single post for the editor. Returns null if not found. */
export async function getAdminPostById(id: string): Promise<AdminPostRow | null> {
  await verifySession()
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, cover_image, content_json, type, published_at, updated_at, created_at')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('[cms] getAdminPostById:', error.message)
    return null
  }
  return (data as AdminPostRow) ?? null
}

/** Current admins for the Team page. */
export async function getTeam(): Promise<{ admins: AdminUser[] }> {
  await verifySession()
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('cms_admins')
    .select('user_id, email, created_at')
    .order('created_at', { ascending: true })

  if (error) console.error('[cms] getTeam admins:', error.message)

  return {
    admins: (data ?? []).map((a) => ({ userId: a.user_id, email: a.email, createdAt: a.created_at })),
  }
}
