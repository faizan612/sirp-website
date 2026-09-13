import 'server-only'
import { createSupabaseServerClient } from '@/lib/supabase/server-auth'
import { verifySession } from '@/lib/auth/dal'
import type { AdminLandingPageListItem, AdminLandingPageRow } from './types'
import type { LandingPageForRouting } from './routing'

function statusOf(publishedAt: string | null): AdminLandingPageListItem['status'] {
  if (!publishedAt) return 'draft'
  return new Date(publishedAt).getTime() <= Date.now() ? 'published' : 'scheduled'
}

/** All pages (drafts included) for the admin list view. RLS scopes this to admins. */
export async function getAdminLandingPages(): Promise<AdminLandingPageListItem[]> {
  await verifySession()
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('landing_pages')
    .select('id, title, slug, root_alias, published_at, updated_at')
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('[pagebuilder] getAdminLandingPages:', error.message)
    return []
  }

  return (data ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    rootAlias: r.root_alias,
    status: statusOf(r.published_at),
    updatedAt: r.updated_at,
  }))
}

/** A single page for the editor. Returns null if not found. */
export async function getAdminLandingPageById(id: string): Promise<AdminLandingPageRow | null> {
  await verifySession()
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('landing_pages')
    .select('id, slug, root_alias, title, document, seo, published_at, is_template, updated_at, created_at')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('[pagebuilder] getAdminLandingPageById:', error.message)
    return null
  }
  if (!data) return null

  return {
    id: data.id,
    slug: data.slug,
    rootAlias: data.root_alias,
    title: data.title,
    document: data.document,
    seo: data.seo ?? {},
    publishedAt: data.published_at,
    isTemplate: data.is_template,
    updatedAt: data.updated_at,
    createdAt: data.created_at,
  }
}

/** Every page's routing identity (regardless of publish status) — feeds isRootAliasAvailable's collision check. */
export async function getAllLandingPagesForRouting(): Promise<LandingPageForRouting[]> {
  await verifySession()
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase.from('landing_pages').select('id, slug, root_alias')
  if (error) {
    console.error('[pagebuilder] getAllLandingPagesForRouting:', error.message)
    return []
  }
  return (data ?? []).map((r) => ({ id: r.id, slug: r.slug, rootAlias: r.root_alias }))
}
