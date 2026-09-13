/** A landing page's content: an ordered list of block instances. */
export type PageDocument = {
  version: number
  blocks: BlockInstance[]
}

export type BlockInstance = {
  /** Stable within the page — React key, undo/redo identity, error-log identity. */
  id: string
  /** Registry key, e.g. 'cta-section'. */
  type: string
  /** Shape version this instance's `props` were saved under — see registry.ts migrate(). */
  schemaVersion: number
  /** JSON-safe; validated via this block's own registry entry before rendering. */
  props: unknown
  visibility?: { desktop?: boolean; tablet?: boolean; mobile?: boolean }
  /** When true, `props` live in `global_sections` (looked up by `globalSectionId`) instead of inline. */
  isGlobal?: boolean
  globalSectionId?: string
}

export type LandingPageSeo = {
  title?: string
  description?: string
  ogImage?: string
  canonical?: string
  noindex?: boolean
}

/** Full admin-side row, including drafts and the structured document. */
export type AdminLandingPageRow = {
  id: string
  slug: string
  rootAlias: string | null
  title: string
  document: PageDocument
  seo: LandingPageSeo
  publishedAt: string | null
  isTemplate: boolean
  updatedAt: string
  createdAt: string
}

/** Compact shape rendered in the admin pages list. */
export type AdminLandingPageListItem = {
  id: string
  title: string
  slug: string
  rootAlias: string | null
  status: 'published' | 'scheduled' | 'draft'
  updatedAt: string
}

/** Result returned by the create/update server actions to `useActionState`. */
export type LandingPageActionState = {
  ok: boolean
  message?: string
  /** Field-keyed validation messages for inline display — block-level errors are keyed `block:<id>`. */
  errors?: Record<string, string>
  /** The saved/created page id, so the client can redirect after a create. */
  pageId?: string
}
