import { STATIC_ROUTES } from '@/lib/constants/staticRoutes'

export type LandingPageForRouting = { id: string; slug: string; rootAlias: string | null }

/**
 * The page's current primary public URL — its root alias if it has one, else
 * its stable /lp/ address. Used everywhere a URL for the page is needed
 * (generateMetadata, JsonLd, the sitemap entry) so canonical/OG/sitemap
 * values can never drift from each other.
 */
export function getLandingPageCanonicalPath(page: LandingPageForRouting): string {
  return page.rootAlias ? `/${page.rootAlias}` : `/lp/${page.slug}`
}

export type AliasAvailability = { available: boolean; reason?: string }

/**
 * Checks a candidate root-level alias against code-authored routes
 * (STATIC_ROUTES — the file-system routes always win at request time
 * regardless, but this lets the save action warn an admin proactively
 * instead of silently publishing to a URL that will never actually resolve)
 * and other landing pages' slugs/aliases (CMS-authored routes).
 */
export function isRootAliasAvailable(
  alias: string,
  existing: { pages: LandingPageForRouting[]; excludePageId?: string },
): AliasAvailability {
  const normalized = alias.replace(/^\/+/, '')
  const path = `/${normalized}`

  if (STATIC_ROUTES.some((r) => r.path === path)) {
    return { available: false, reason: 'A code-authored page already uses this URL.' }
  }

  const collision = existing.pages.some(
    (p) => p.id !== existing.excludePageId && (p.rootAlias === normalized || p.slug === normalized),
  )
  if (collision) {
    return { available: false, reason: 'Another landing page already uses this URL.' }
  }

  return { available: true }
}
