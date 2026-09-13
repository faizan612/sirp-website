import 'server-only'
import { createSupabaseClient } from '@/lib/supabase/server'
import type { LandingPageSeo, PageDocument } from './types'

export type PublicLandingPage = {
  id: string
  slug: string
  rootAlias: string | null
  title: string
  document: PageDocument
  seo: LandingPageSeo
  publishedAt: string
}

function isPublished(publishedAt: string | null): boolean {
  if (!publishedAt) return false
  return new Date(publishedAt).getTime() <= Date.now()
}

const COLUMNS = 'id, slug, root_alias, title, document, seo, published_at'

export async function getPublishedLandingPageBySlug(slug: string): Promise<PublicLandingPage | null> {
  const supabase = createSupabaseClient()
  if (!supabase) return null

  const { data, error } = await supabase.from('landing_pages').select(COLUMNS).eq('slug', slug).maybeSingle()
  if (error) {
    console.error('[pagebuilder] getPublishedLandingPageBySlug:', error.message)
    return null
  }
  if (!data || !isPublished(data.published_at)) return null

  return {
    id: data.id,
    slug: data.slug,
    rootAlias: data.root_alias,
    title: data.title,
    document: data.document,
    seo: data.seo ?? {},
    publishedAt: data.published_at,
  }
}

export async function getPublishedLandingPageByRootAlias(alias: string): Promise<PublicLandingPage | null> {
  const supabase = createSupabaseClient()
  if (!supabase) return null

  const { data, error } = await supabase.from('landing_pages').select(COLUMNS).eq('root_alias', alias).maybeSingle()
  if (error) {
    console.error('[pagebuilder] getPublishedLandingPageByRootAlias:', error.message)
    return null
  }
  if (!data || !isPublished(data.published_at)) return null

  return {
    id: data.id,
    slug: data.slug,
    rootAlias: data.root_alias,
    title: data.title,
    document: data.document,
    seo: data.seo ?? {},
    publishedAt: data.published_at,
  }
}

export async function getPublishedLandingSlugs(): Promise<{ slug: string; rootAlias: string | null }[]> {
  const supabase = createSupabaseClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('landing_pages')
    .select('slug, root_alias, published_at')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())

  if (error) {
    console.error('[pagebuilder] getPublishedLandingSlugs:', error.message)
    return []
  }
  return (data ?? []).filter((r) => isPublished(r.published_at)).map((r) => ({ slug: r.slug, rootAlias: r.root_alias }))
}

/**
 * Looks up a redirect for a path that didn't match a live page — checked by
 * both public route components before falling back to a genuine 404, so a
 * slug/root-alias rename doesn't silently break existing links.
 */
export async function findRedirect(sourcePath: string): Promise<string | null> {
  const supabase = createSupabaseClient()
  if (!supabase) return null

  const { data, error } = await supabase.from('redirects').select('destination_path').eq('source_path', sourcePath).maybeSingle()
  if (error) {
    console.error('[pagebuilder] findRedirect:', error.message)
    return null
  }
  return data?.destination_path ?? null
}
