import type { MetadataRoute } from 'next'
import { getPublishedBlogSlugs } from '@/lib/blog/queries'
import { SITE_URL } from '@/lib/constants'

export const dynamic = 'force-static'

const STATIC_ROUTES: Array<{
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
  { path: '/soar-vs-autonomous-soc', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/buyers-guide', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/security-outcomes-and-metrics', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/manifesto', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technical-white-paper', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const slugs = await getPublishedBlogSlugs()
  const blogEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries]
}
