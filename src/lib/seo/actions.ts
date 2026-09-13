'use server'

import { revalidatePath } from 'next/cache'
import { verifySession } from '@/lib/auth/dal'
import { createSupabaseServerClient } from '@/lib/supabase/server-auth'
import { getPublishedBlogSlugs } from '@/lib/blog/queries'
import { STATIC_ROUTES } from '@/lib/constants/staticRoutes'
import { SITE_URL } from '@/lib/constants'
import { auditPage, extractInternalLinks } from './checks'
import type { SeoPageResult } from './types'

const FETCH_TIMEOUT_MS = 10_000
const LINK_CHECK_CONCURRENCY = 8

async function timedFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: controller.signal, cache: 'no-store' })
  } finally {
    clearTimeout(timeout)
  }
}

type FetchedPage = { route: string; httpStatus: number; html: string; headers: Headers }

async function fetchPage(route: string): Promise<FetchedPage> {
  try {
    const res = await timedFetch(`${SITE_URL}${route}`)
    const html = await res.text()
    return { route, httpStatus: res.status, html, headers: res.headers }
  } catch {
    return { route, httpStatus: 0, html: '', headers: new Headers() }
  }
}

/** True if the URL responds OK to a HEAD (falling back to GET for servers that reject HEAD). */
async function isLinkAlive(url: string): Promise<boolean> {
  try {
    const head = await timedFetch(url, { method: 'HEAD' })
    if (head.status === 405 || head.status === 501) {
      const get = await timedFetch(url, { method: 'GET' })
      return get.ok
    }
    return head.ok
  } catch {
    return false
  }
}

/** Runs `fn` over `items` with at most `limit` in flight at once — a small crawl of a few dozen links doesn't need a queue library. */
async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let next = 0
  async function worker() {
    while (next < items.length) {
      const index = next++
      results[index] = await fn(items[index])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

/**
 * Crawl every marketing page and published blog post as a search engine
 * would see it, score each one, and cache the results in `seo_audits` for
 * the /admin/seo dashboard to read. Routes come from the same list
 * `sitemap.ts` already maintains, so there's nothing extra to keep in sync.
 */
export async function runSeoAuditAction(): Promise<{ ok: boolean; error?: string }> {
  await verifySession()

  const slugs = await getPublishedBlogSlugs()
  const routes = [...STATIC_ROUTES.map((r) => r.path), ...slugs.map((slug) => `/blog/${slug}`)]

  const pages = await Promise.all(routes.map(fetchPage))

  // Site-wide resources are fetched once per run, not once per page, and
  // attributed to the homepage row so they show up somewhere concrete.
  const [robotsRes, securityTxtRes, sitemapRes] = await Promise.all([
    timedFetch(`${SITE_URL}/robots.txt`).catch(() => null),
    timedFetch(`${SITE_URL}/.well-known/security.txt`).catch(() => null),
    timedFetch(`${SITE_URL}/sitemap.xml`).catch(() => null),
  ])
  const siteWide = {
    robotsTxtOk: Boolean(robotsRes?.ok),
    securityTxtOk: Boolean(securityTxtRes?.ok),
    sitemapOk: Boolean(sitemapRes?.ok),
  }

  // Internal links, deduped across the whole crawl and checked once each —
  // a broken footer link would otherwise trigger one HEAD request per page.
  const siteOrigin = new URL(SITE_URL).origin
  const linksByRoute = new Map(
    pages.map((p) => [p.route, extractInternalLinks(p.html, `${SITE_URL}${p.route}`, siteOrigin)]),
  )
  const allLinks = [...new Set([...linksByRoute.values()].flat())]
  const linkChecks = await mapWithConcurrency(
    allLinks,
    LINK_CHECK_CONCURRENCY,
    async (url) => [url, await isLinkAlive(url)] as const,
  )
  const brokenLinks = new Set(linkChecks.filter(([, alive]) => !alive).map(([url]) => url))

  const results: SeoPageResult[] = pages.map((p) => {
    const links = linksByRoute.get(p.route) ?? []
    return auditPage({
      route: p.route,
      httpStatus: p.httpStatus,
      html: p.html,
      headers: p.headers,
      internalLinks: links,
      brokenLinks: links.filter((l) => brokenLinks.has(l)),
      siteWide: p.route === '/' ? siteWide : undefined,
    })
  })

  // One timestamp for the whole run, so every row belongs to the same batch —
  // that's what lets getSeoTrend() group history rows back into "runs".
  const runAt = new Date().toISOString()

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('seo_audits').upsert(
    results.map((r) => ({
      route: r.route,
      http_status: r.httpStatus,
      score: r.score,
      categories: r.categories,
      issues: r.issues,
      metrics: r.metrics,
      checked_at: runAt,
    })),
    { onConflict: 'route' },
  )

  if (error) return { ok: false, error: error.message }

  const { error: historyError } = await supabase.from('seo_audit_history').insert(
    results.map((r) => ({ route: r.route, checked_at: runAt, score: r.score, categories: r.categories })),
  )
  // A history-write failure shouldn't hide a successful audit — trends just won't
  // have this run's data point until the next successful one.
  if (historyError) console.error('[seo] seo_audit_history insert:', historyError.message)

  revalidatePath('/admin/seo')
  return { ok: true }
}
