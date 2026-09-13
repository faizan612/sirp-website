'use server'

import { ValidationError } from 'yup'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server-auth'
import { verifySession } from '@/lib/auth/dal'
import { landingPageSchema } from './pageSchema'
import { getBlockEntry } from './registry'
import './blocks'
import { getLandingPageCanonicalPath, isRootAliasAvailable } from './routing'
import { getAllLandingPagesForRouting } from './queries'
import type { LandingPageActionState, PageDocument } from './types'

/** Collect Yup field errors into a flat map for inline display — mirrors src/lib/cms/actions.ts. */
function toFieldErrors(err: ValidationError): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const inner of err.inner.length ? err.inner : [err]) {
    if (inner.path && !errors[inner.path]) errors[inner.path] = inner.message
  }
  return errors
}

/** Validates every block's own props against its registry entry — separate from the document's structural Yup schema, so one invalid block never blocks saving the rest of the page. */
function validateBlocks(document: PageDocument): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const block of document.blocks) {
    const entry = getBlockEntry(block.type)
    if (!entry) {
      errors[`block:${block.id}`] = `Unknown block type "${block.type}"`
      continue
    }
    try {
      entry.validate(block.props)
    } catch (err) {
      errors[`block:${block.id}`] = err instanceof Error ? err.message : 'Invalid block data'
    }
  }
  return errors
}

async function parseFormInput(formData: FormData) {
  const rawDocument = String(formData.get('document') ?? '{"version":1,"blocks":[]}')
  let document: unknown
  try {
    document = JSON.parse(rawDocument)
  } catch {
    throw new ValidationError('Document is not valid JSON', rawDocument, 'document')
  }

  return landingPageSchema.validate(
    {
      title: formData.get('title'),
      slug: formData.get('slug'),
      rootAlias: formData.get('rootAlias') || undefined,
      document,
      seo: {
        title: formData.get('seoTitle') || undefined,
        description: formData.get('seoDescription') || undefined,
        ogImage: formData.get('seoOgImage') || undefined,
        canonical: formData.get('seoCanonical') || undefined,
        noindex: formData.get('seoNoindex') === 'on' || formData.get('seoNoindex') === 'true',
      },
      publish: formData.get('publish') === 'on' || formData.get('publish') === 'true',
    },
    { abortEarly: false, stripUnknown: true },
  )
}

/** Create a page. Shape matches `useActionState`: (prevState, formData) => Promise<LandingPageActionState>. */
export async function createLandingPageAction(
  _prev: LandingPageActionState,
  formData: FormData,
): Promise<LandingPageActionState> {
  const session = await verifySession()
  const supabase = await createSupabaseServerClient()

  let values
  try {
    values = await parseFormInput(formData)
  } catch (err) {
    if (err instanceof ValidationError) return { ok: false, errors: toFieldErrors(err) }
    throw err
  }

  const blockErrors = validateBlocks(values.document as PageDocument)
  if (Object.keys(blockErrors).length > 0) return { ok: false, errors: blockErrors }

  if (values.rootAlias) {
    const existingPages = await getAllLandingPagesForRouting()
    const availability = isRootAliasAvailable(values.rootAlias, { pages: existingPages })
    if (!availability.available) {
      return { ok: false, errors: { rootAlias: availability.reason ?? 'That URL is not available' } }
    }
  }

  const { data, error } = await supabase
    .from('landing_pages')
    .insert({
      title: values.title,
      slug: values.slug,
      root_alias: values.rootAlias ?? null,
      document: values.document,
      seo: values.seo,
      published_at: values.publish ? new Date().toISOString() : null,
      author_id: session.userId,
    })
    .select('id')
    .single()

  if (error) {
    if (error.code === '23505') return { ok: false, errors: { slug: 'That slug or URL is already in use' } }
    return { ok: false, message: error.message }
  }

  const { error: versionError } = await supabase.from('landing_page_versions').insert({
    page_id: data.id,
    document: values.document,
    seo: values.seo,
    label: 'Initial version',
    created_by: session.userId,
  })
  if (versionError) console.error('[pagebuilder] initial version insert:', versionError.message)

  revalidatePath('/admin/pages')
  revalidatePath(`/lp/${values.slug}`)
  if (values.rootAlias) revalidatePath(`/${values.rootAlias}`)
  revalidatePath('/sitemap.xml')
  redirect('/admin/pages')
}

/** Update an existing page. */
export async function updateLandingPageAction(
  id: string,
  _prev: LandingPageActionState,
  formData: FormData,
): Promise<LandingPageActionState> {
  const session = await verifySession()
  const supabase = await createSupabaseServerClient()

  let values
  try {
    values = await parseFormInput(formData)
  } catch (err) {
    if (err instanceof ValidationError) return { ok: false, errors: toFieldErrors(err) }
    throw err
  }

  const blockErrors = validateBlocks(values.document as PageDocument)
  if (Object.keys(blockErrors).length > 0) return { ok: false, errors: blockErrors }

  const { data: existing, error: fetchError } = await supabase
    .from('landing_pages')
    .select('slug, root_alias')
    .eq('id', id)
    .maybeSingle()

  if (fetchError || !existing) return { ok: false, message: fetchError?.message ?? 'Page not found' }

  if (values.rootAlias) {
    const existingPages = await getAllLandingPagesForRouting()
    const availability = isRootAliasAvailable(values.rootAlias, { pages: existingPages, excludePageId: id })
    if (!availability.available) {
      return { ok: false, errors: { rootAlias: availability.reason ?? 'That URL is not available' } }
    }
  }

  const { error } = await supabase
    .from('landing_pages')
    .update({
      title: values.title,
      slug: values.slug,
      root_alias: values.rootAlias ?? null,
      document: values.document,
      seo: values.seo,
      published_at: values.publish ? new Date().toISOString() : null,
    })
    .eq('id', id)

  if (error) {
    if (error.code === '23505') return { ok: false, errors: { slug: 'That slug or URL is already in use' } }
    return { ok: false, message: error.message }
  }

  const { error: versionError } = await supabase.from('landing_page_versions').insert({
    page_id: id,
    document: values.document,
    seo: values.seo,
    created_by: session.userId,
  })
  if (versionError) console.error('[pagebuilder] version insert:', versionError.message)

  // Redirect the old address(es) to the new one if the slug or root alias
  // changed, so existing links/bookmarks/backlinks don't silently 404.
  const newCanonical = getLandingPageCanonicalPath({ id, slug: values.slug, rootAlias: values.rootAlias ?? null })
  const oldCanonical = getLandingPageCanonicalPath({ id, slug: existing.slug, rootAlias: existing.root_alias })
  const oldLpPath = `/lp/${existing.slug}`

  const redirectSources = new Set([oldCanonical, oldLpPath])
  redirectSources.delete(newCanonical) // never redirect a path to itself
  const redirectRows = [...redirectSources].map((source_path) => ({
    source_path,
    destination_path: newCanonical,
    reason: 'landing_page_slug_change',
    landing_page_id: id,
  }))

  if (redirectRows.length > 0) {
    const { error: redirectError } = await supabase.from('redirects').upsert(redirectRows, { onConflict: 'source_path' })
    if (redirectError) console.error('[pagebuilder] redirect insert:', redirectError.message)
  }

  revalidatePath('/admin/pages')
  revalidatePath(`/lp/${existing.slug}`)
  revalidatePath(`/lp/${values.slug}`)
  if (existing.root_alias) revalidatePath(`/${existing.root_alias}`)
  if (values.rootAlias) revalidatePath(`/${values.rootAlias}`)
  revalidatePath('/sitemap.xml')
  redirect('/admin/pages')
}

/** Delete a page. Invoked from a small form in the list view. */
export async function deleteLandingPageAction(formData: FormData): Promise<void> {
  await verifySession()
  const supabase = await createSupabaseServerClient()

  const id = String(formData.get('id') ?? '')
  if (!id) return

  const { data: existing } = await supabase.from('landing_pages').select('slug, root_alias').eq('id', id).maybeSingle()

  const { error } = await supabase.from('landing_pages').delete().eq('id', id)
  if (error) {
    console.error('[pagebuilder] deleteLandingPageAction:', error.message)
    return
  }

  revalidatePath('/admin/pages')
  if (existing) {
    revalidatePath(`/lp/${existing.slug}`)
    if (existing.root_alias) revalidatePath(`/${existing.root_alias}`)
  }
  revalidatePath('/sitemap.xml')
}
