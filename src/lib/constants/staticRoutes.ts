import type { MetadataRoute } from 'next'

/**
 * The code-authored half of the site's route registry — every hand-coded
 * marketing page. Kept dependency-free (no server-only imports) so both
 * `sitemap.ts` and client-safe modules like `pagebuilder/routing.ts` can
 * import it without either dragging the other's concerns along.
 */
export const STATIC_ROUTES: Array<{
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}> = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/omnisense', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/autonomous-security', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/enterprise-soc', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/how-autonomous-soc-works', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/what-is-autonomous-soc', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/soar-alternatives', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/soar-vs-autonomous-soc', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/security-outcomes-and-metrics', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/manifesto', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technical-white-paper', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
]
