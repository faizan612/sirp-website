/* ─── Integrations — shared data ─────────────────────────── *
 * Single source of truth for the integration logo list, consumed by
 * both the homepage IntegrationsSection (logo marquee) and the
 * /integrations page (searchable grid).
 *
 * The current dataset is logos + placeholder names only. Real product
 * names, categories, descriptions, and links are not yet available, so
 * those fields are intentionally absent rather than invented. Optional
 * fields are kept on the type so curated metadata can be filled in
 * later without a refactor — populate only what is real.
 */

export type Integration = {
  name: string
  logo: string
  category?: string
  description?: string
  href?: string
}

/* logo-1.svg … logo-18.svg are the only assets that exist on disk.
 * (An earlier 19th entry had no asset and was hidden at render; it is
 * dropped here so the data matches what actually renders.) The names
 * are placeholders pending the real connector list. */
export const INTEGRATIONS: readonly Integration[] = Array.from(
  { length: 18 },
  (_, i) => ({
    name: `Integration ${i + 1}`,
    logo: `/images/integrations/logo-${i + 1}.svg`,
  }),
)

/** True when any entry carries a category, gating the chip filter UI. */
export const HAS_CATEGORIES = INTEGRATIONS.some((i) => Boolean(i.category))

/**
 * Filter integrations by a free-text query (matches name, case-insensitive)
 * and an optional category. Pure + client-safe so it can be unit-tested and
 * reused by the page's live filter.
 */
export function filterIntegrations(
  list: readonly Integration[],
  query: string,
  category?: string,
): Integration[] {
  const q = query.trim().toLowerCase()
  return list.filter((item) => {
    const matchesQuery = q === '' || item.name.toLowerCase().includes(q)
    const matchesCategory = !category || item.category === category
    return matchesQuery && matchesCategory
  })
}

/** Alphabetical by name, locale-aware, returns a new array. */
export function sortIntegrations(list: readonly Integration[]): Integration[] {
  return [...list].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }),
  )
}
