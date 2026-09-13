import type { SeoCategory, SeoCategoryScores, SeoIssue, SeoIssueSeverity, SeoPageMetrics, SeoPageResult } from './types'

const TITLE_MIN = 30
const TITLE_MAX = 65
const DESCRIPTION_MIN = 120
const DESCRIPTION_MAX = 160
const THIN_CONTENT_WORDS = 300
const LOW_READABILITY_SCORE = 30
const WORDS_PER_MINUTE = 200

const CATEGORIES: SeoCategory[] = ['technical', 'content', 'security', 'schema', 'links', 'accessibility']

const SEVERITY_WEIGHT: Record<SeoIssueSeverity, number> = {
  critical: 30,
  high: 15,
  medium: 8,
  low: 3,
}

/** Cybersecurity glossary checked for on every page — informational only, never scored, since penalising e.g. /contact for not mentioning "XDR" would just be noise. */
const CYBERSECURITY_TERMS = ['MITRE ATT&CK', 'SOAR', 'SIEM', 'XDR', 'EDR', 'SOC', 'Threat Intelligence']

function attr(tag: string, name: string): string | null {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'))
  return match ? match[1] : null
}

function getTitle(html: string): string | null {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i)
  return match ? match[1].trim() : null
}

/** Attribute order in a tag isn't guaranteed, so every tag is matched whole first, then its attributes are pulled out independently. */
function getMeta(html: string, key: string, attrName: 'name' | 'property' = 'name'): string | null {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? []
  for (const tag of tags) {
    if ((attr(tag, attrName) ?? '').toLowerCase() === key.toLowerCase()) {
      return attr(tag, 'content')
    }
  }
  return null
}

function getCanonical(html: string): string | null {
  const tags = html.match(/<link\b[^>]*>/gi) ?? []
  for (const tag of tags) {
    if ((attr(tag, 'rel') ?? '').toLowerCase() === 'canonical') return attr(tag, 'href')
  }
  return null
}

function extractJsonLdTypes(html: string): { total: number; valid: number; types: string[] } {
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
  const types = new Set<string>()
  let valid = 0
  for (const block of blocks) {
    try {
      const parsed = JSON.parse(block[1])
      valid += 1
      const nodes = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed]
      for (const node of nodes) {
        const t = node?.['@type']
        if (typeof t === 'string') types.add(t)
        else if (Array.isArray(t)) t.forEach((x) => typeof x === 'string' && types.add(x))
      }
    } catch {
      // left out of `valid`; surfaced as a parse-error issue by the caller
    }
  }
  return { total: blocks.length, valid, types: [...types] }
}

function countHeadings(html: string): { h1: number; h2: number; h3: number } {
  const count = (tag: string) => (html.match(new RegExp(`<${tag}\\b`, 'gi')) ?? []).length
  return { h1: count('h1'), h2: count('h2'), h3: count('h3') }
}

function countImagesMissingAlt(html: string): number {
  const tags = html.match(/<img\b[^>]*>/gi) ?? []
  return tags.filter((tag) => {
    const alt = attr(tag, 'alt')
    return alt === null || alt.trim() === ''
  }).length
}

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function getBodyText(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  return stripTags(bodyMatch ? bodyMatch[1] : html)
}

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!w) return 0
  const groups = w.match(/[aeiouy]+/g) ?? []
  let count = groups.length
  if (w.endsWith('e') && count > 1) count -= 1
  return Math.max(1, count)
}

/** Approximate Flesch Reading Ease — standard vowel-group syllable heuristic, not a dictionary lookup. Good enough as a "how hard is this to read" signal, not a precision score. */
function computeReadability(text: string): { wordCount: number; readingTimeMinutes: number; fleschScore: number } {
  const words = text.split(/\s+/).filter(Boolean)
  const wordCount = words.length
  if (wordCount === 0) return { wordCount: 0, readingTimeMinutes: 0, fleschScore: 0 }

  const sentenceCount = Math.max(1, (text.match(/[.!?]+/g) ?? []).length)
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0)
  const fleschScore = Math.round(206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount))

  return { wordCount, readingTimeMinutes: Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE)), fleschScore }
}

function findCybersecurityTerms(text: string): string[] {
  return CYBERSECURITY_TERMS.filter((term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`\\b${escaped}\\b`, 'i').test(text)
  })
}

/** Internal `<a href>` targets on a page, resolved to absolute URLs and deduped. Mailto/tel/js/hash-only links are excluded; only same-origin links count as "internal". */
export function extractInternalLinks(html: string, baseUrl: string, siteOrigin: string): string[] {
  const tags = html.match(/<a\b[^>]*>/gi) ?? []
  const links: string[] = []
  for (const tag of tags) {
    const href = attr(tag, 'href')
    if (!href || /^(mailto:|tel:|javascript:|#)/i.test(href)) continue
    try {
      const resolved = new URL(href, baseUrl)
      resolved.hash = ''
      if (resolved.origin === siteOrigin) links.push(resolved.toString())
    } catch {
      // malformed href — skip rather than fail the whole audit
    }
  }
  return [...new Set(links)]
}

function pushIssue(issues: SeoIssue[], field: string, category: SeoCategory, severity: SeoIssueSeverity, message: string) {
  issues.push({ field, category, severity, message })
}

function computeCategoryScores(issues: SeoIssue[]): SeoCategoryScores {
  const scores = Object.fromEntries(CATEGORIES.map((c) => [c, 100])) as SeoCategoryScores
  for (const issue of issues) {
    scores[issue.category] = Math.max(0, scores[issue.category] - SEVERITY_WEIGHT[issue.severity])
  }
  return scores
}

function emptyMetrics(): SeoPageMetrics {
  return {
    wordCount: 0,
    readingTimeMinutes: 0,
    headingCounts: { h1: 0, h2: 0, h3: 0 },
    readabilityScore: 0,
    internalLinkCount: 0,
    brokenLinkCount: 0,
    structuredDataTypes: [],
    cybersecurityTerms: [],
  }
}

export type AuditPageInput = {
  route: string
  httpStatus: number
  html: string
  /** Response headers from the page fetch — used for the security-header checks. */
  headers?: Headers | null
  /** Same-origin links found on this page, already resolved to absolute URLs. */
  internalLinks?: string[]
  /** Subset of `internalLinks` that a HEAD/GET check found broken. */
  brokenLinks?: string[]
  /** Site-wide resource checks (robots.txt/security.txt/sitemap.xml), attached to one page only — see actions.ts. */
  siteWide?: { robotsTxtOk: boolean; securityTxtOk: boolean; sitemapOk: boolean }
}

/**
 * Rule-based SEO audit of a single rendered page. Everything here reads only
 * data the caller already fetched (HTML, response headers, link-check
 * results) — no network calls of its own — so it's cheap to unit test.
 */
export function auditPage(input: AuditPageInput): SeoPageResult {
  const { route, httpStatus, html, headers = null, internalLinks = [], brokenLinks = [], siteWide } = input

  if (httpStatus !== 200) {
    const issues: SeoIssue[] = [
      { field: 'status', category: 'technical', severity: 'critical', message: `Page returned HTTP ${httpStatus}` },
    ]
    return { route, httpStatus, score: 0, categories: computeCategoryScores(issues), issues, metrics: emptyMetrics() }
  }

  const issues: SeoIssue[] = []

  // ── Technical: on-page tags ──────────────────────────────────────────
  const title = getTitle(html)
  if (!title) {
    pushIssue(issues, 'title', 'technical', 'critical', 'Missing <title>')
  } else if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
    pushIssue(issues, 'title', 'technical', 'medium', `Title is ${title.length} characters (recommended ${TITLE_MIN}-${TITLE_MAX})`)
  }

  const description = getMeta(html, 'description')
  if (!description) {
    pushIssue(issues, 'description', 'technical', 'critical', 'Missing meta description')
  } else if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) {
    pushIssue(
      issues,
      'description',
      'technical',
      'medium',
      `Description is ${description.length} characters (recommended ${DESCRIPTION_MIN}-${DESCRIPTION_MAX})`,
    )
  }

  if (!getCanonical(html)) pushIssue(issues, 'canonical', 'technical', 'high', 'Missing canonical link tag')
  if (!getMeta(html, 'og:title', 'property')) pushIssue(issues, 'og:title', 'technical', 'low', 'Missing og:title')
  if (!getMeta(html, 'og:description', 'property')) pushIssue(issues, 'og:description', 'technical', 'low', 'Missing og:description')
  if (!getMeta(html, 'og:image', 'property')) pushIssue(issues, 'og:image', 'technical', 'medium', 'Missing og:image')
  if (!getMeta(html, 'twitter:card')) pushIssue(issues, 'twitter:card', 'technical', 'low', 'Missing twitter:card')

  const robots = getMeta(html, 'robots')
  if (robots && /noindex/i.test(robots)) {
    pushIssue(issues, 'robots', 'technical', 'medium', 'Page is marked noindex — confirm this is intentional')
  }

  if (siteWide) {
    if (!siteWide.robotsTxtOk) pushIssue(issues, 'robots.txt', 'technical', 'medium', 'robots.txt is not reachable')
    if (!siteWide.sitemapOk) pushIssue(issues, 'sitemap.xml', 'technical', 'medium', 'sitemap.xml is not reachable')
    if (!siteWide.securityTxtOk) {
      pushIssue(issues, 'security.txt', 'security', 'low', 'No security.txt found at /.well-known/security.txt')
    }
  }

  // ── Schema ────────────────────────────────────────────────────────────
  const jsonLd = extractJsonLdTypes(html)
  if (jsonLd.total === 0) {
    pushIssue(issues, 'jsonLd', 'schema', 'medium', 'No structured data (JSON-LD) found')
  } else if (jsonLd.valid < jsonLd.total) {
    pushIssue(issues, 'jsonLd', 'schema', 'high', 'A structured data block failed to parse as JSON')
  }

  // ── Security headers ─────────────────────────────────────────────────
  const header = (name: string) => headers?.get(name) ?? null
  if (!header('strict-transport-security')) pushIssue(issues, 'hsts', 'security', 'high', 'Missing Strict-Transport-Security header')
  const csp = header('content-security-policy')
  if (!csp) pushIssue(issues, 'csp', 'security', 'medium', 'Missing Content-Security-Policy header')
  if ((header('x-content-type-options') ?? '').toLowerCase() !== 'nosniff') {
    pushIssue(issues, 'x-content-type-options', 'security', 'low', 'Missing X-Content-Type-Options: nosniff')
  }
  if (!header('x-frame-options') && !/frame-ancestors/i.test(csp ?? '')) {
    pushIssue(issues, 'clickjacking', 'security', 'low', 'No clickjacking protection (X-Frame-Options or frame-ancestors)')
  }

  // ── Content quality ───────────────────────────────────────────────────
  const bodyText = getBodyText(html)
  const { wordCount, readingTimeMinutes, fleschScore } = computeReadability(bodyText)
  const headings = countHeadings(html)

  if (headings.h1 === 0) {
    pushIssue(issues, 'h1', 'content', 'medium', 'Page has no <h1> heading')
  } else if (headings.h1 > 1) {
    pushIssue(issues, 'h1', 'content', 'medium', `Page has ${headings.h1} <h1> headings — should have exactly one`)
  }
  if (wordCount > 0 && wordCount < THIN_CONTENT_WORDS) {
    pushIssue(issues, 'wordCount', 'content', 'medium', `Only ${wordCount} words — thin content`)
  }
  if (wordCount > 0 && fleschScore < LOW_READABILITY_SCORE) {
    pushIssue(issues, 'readability', 'content', 'low', `Reading Ease score is ${fleschScore} — difficult to read`)
  }

  // ── Accessibility ─────────────────────────────────────────────────────
  const missingAlt = countImagesMissingAlt(html)
  if (missingAlt > 0) {
    pushIssue(issues, 'imageAlt', 'accessibility', 'medium', `${missingAlt} image${missingAlt === 1 ? '' : 's'} missing alt text`)
  }

  // ── Internal linking ──────────────────────────────────────────────────
  if (internalLinks.length === 0) {
    pushIssue(issues, 'internalLinks', 'links', 'medium', 'Page has no internal links')
  }
  if (brokenLinks.length > 0) {
    const preview = brokenLinks.slice(0, 3).join(', ')
    pushIssue(
      issues,
      'brokenLinks',
      'links',
      'high',
      `${brokenLinks.length} broken internal link${brokenLinks.length === 1 ? '' : 's'}: ${preview}${brokenLinks.length > 3 ? '…' : ''}`,
    )
  }

  const categories = computeCategoryScores(issues)
  const score = Math.round(CATEGORIES.reduce((sum, c) => sum + categories[c], 0) / CATEGORIES.length)

  return {
    route,
    httpStatus,
    score,
    categories,
    issues,
    metrics: {
      wordCount,
      readingTimeMinutes,
      headingCounts: headings,
      readabilityScore: fleschScore,
      internalLinkCount: internalLinks.length,
      brokenLinkCount: brokenLinks.length,
      structuredDataTypes: jsonLd.types,
      cybersecurityTerms: findCybersecurityTerms(bodyText),
    },
  }
}
