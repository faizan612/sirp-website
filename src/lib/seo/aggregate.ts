import type { SeoAuditRow, SeoCategory, SeoIssue, SeoIssueSeverity } from './types'

const CATEGORY_ORDER: SeoCategory[] = ['technical', 'content', 'security', 'schema', 'links', 'accessibility']
const SEVERITY_ORDER: SeoIssueSeverity[] = ['critical', 'high', 'medium', 'low']

function average(nums: number[]): number {
  if (nums.length === 0) return 0
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length)
}

/** Site-wide average for each of the 6 categories, across every audited page. */
export function categoryAverages(audits: SeoAuditRow[]): Record<SeoCategory, number> {
  return Object.fromEntries(
    CATEGORY_ORDER.map((cat) => [cat, average(audits.map((a) => a.categories[cat] ?? 0))]),
  ) as Record<SeoCategory, number>
}

export type IssueWithRoute = SeoIssue & { route: string }

/** Every issue across every page, bucketed by severity — feeds the Kanban view. */
export function groupIssuesBySeverity(audits: SeoAuditRow[]): Record<SeoIssueSeverity, IssueWithRoute[]> {
  const grouped: Record<SeoIssueSeverity, IssueWithRoute[]> = { critical: [], high: [], medium: [], low: [] }
  for (const audit of audits) {
    for (const issue of audit.issues) {
      grouped[issue.severity].push({ ...issue, route: audit.route })
    }
  }
  return grouped
}

export function countBySeverity(audits: SeoAuditRow[], severity: SeoIssueSeverity): number {
  return audits.reduce((sum, a) => sum + a.issues.filter((i) => i.severity === severity).length, 0)
}

const STRUCTURED_DATA_TYPES = [
  'Organization',
  'Article',
  'FAQPage',
  'BreadcrumbList',
  'SoftwareApplication',
  'Product',
  'VideoObject',
  'Review',
]

export type StructuredDataCheck = { type: string; present: boolean; pageCount: number }

/** Which of a reference set of schema.org types show up anywhere on the site, and on how many pages. */
export function structuredDataChecklist(audits: SeoAuditRow[]): StructuredDataCheck[] {
  return STRUCTURED_DATA_TYPES.map((type) => {
    const pages = audits.filter((a) => (a.metrics.structuredDataTypes ?? []).includes(type))
    return { type, present: pages.length > 0, pageCount: pages.length }
  })
}

export type SecurityCheck = { key: string; label: string; passing: number; total: number }

/** Pass/fail rollup of the security-relevant checks already computed per page — nothing here is a new signal, just a site-wide summary of existing issues. */
export function securityChecklist(audits: SeoAuditRow[]): SecurityCheck[] {
  const total = audits.length
  const failingField = (field: string) => audits.filter((a) => a.issues.some((i) => i.field === field)).length

  const checks: Array<{ key: string; label: string; field: string | null }> = [
    { key: 'https', label: 'Reachable over HTTPS', field: null },
    { key: 'hsts', label: 'Strict-Transport-Security', field: 'hsts' },
    { key: 'csp', label: 'Content-Security-Policy', field: 'csp' },
    { key: 'clickjacking', label: 'Clickjacking protection', field: 'clickjacking' },
    { key: 'canonical', label: 'Canonical tag', field: 'canonical' },
    { key: 'ogImage', label: 'Open Graph image', field: 'og:image' },
    { key: 'sitemap', label: 'sitemap.xml reachable', field: 'sitemap.xml' },
    { key: 'robotsTxt', label: 'robots.txt reachable', field: 'robots.txt' },
    { key: 'securityTxt', label: 'security.txt present', field: 'security.txt' },
  ]

  return checks.map(({ key, label, field }) => {
    if (field === null) {
      return { key, label, passing: audits.filter((a) => a.httpStatus === 200).length, total }
    }
    return { key, label, passing: total - failingField(field), total }
  })
}

export type ContentQualitySummary = {
  avgWordCount: number
  avgReadingTimeMinutes: number
  avgReadabilityScore: number
  /** Pages with exactly one <h1> — the recommended heading structure. */
  properH1Count: number
  totalPages: number
}

export function contentQualitySummary(audits: SeoAuditRow[]): ContentQualitySummary {
  const withText = audits.filter((a) => a.metrics.wordCount > 0)
  const avgOf = (fn: (a: SeoAuditRow) => number) => average(withText.map(fn))

  return {
    avgWordCount: avgOf((a) => a.metrics.wordCount),
    avgReadingTimeMinutes: avgOf((a) => a.metrics.readingTimeMinutes),
    avgReadabilityScore: avgOf((a) => a.metrics.readabilityScore),
    properH1Count: audits.filter((a) => a.metrics.headingCounts?.h1 === 1).length,
    totalPages: audits.length,
  }
}

export type CrawlActivitySummary = {
  lastCrawlAt: string | null
  brokenPages: SeoAuditRow[]
  unreachablePages: SeoAuditRow[]
  totalBrokenLinks: number
}

export function crawlActivitySummary(audits: SeoAuditRow[]): CrawlActivitySummary {
  const lastCrawlAt = audits.reduce<string | null>(
    (latest, a) => (!latest || a.checkedAt > latest ? a.checkedAt : latest),
    null,
  )
  return {
    lastCrawlAt,
    brokenPages: audits.filter((a) => a.httpStatus !== 200 && a.httpStatus !== 0),
    unreachablePages: audits.filter((a) => a.httpStatus === 0),
    totalBrokenLinks: audits.reduce((sum, a) => sum + (a.metrics.brokenLinkCount ?? 0), 0),
  }
}

export type ScoreHistoryPoint = { checkedAt: string; avgScore: number }

/** Groups raw history rows (one per route per run) back into per-run averages, oldest first. Rows from the same run share an identical `checkedAt` — see actions.ts's single `runAt`. */
export function computeScoreHistorySeries(rows: { checkedAt: string; score: number }[]): ScoreHistoryPoint[] {
  const byRun = new Map<string, number[]>()
  for (const row of rows) {
    const bucket = byRun.get(row.checkedAt)
    if (bucket) bucket.push(row.score)
    else byRun.set(row.checkedAt, [row.score])
  }
  return [...byRun.entries()]
    .map(([checkedAt, scores]) => ({ checkedAt, avgScore: average(scores) }))
    .sort((a, b) => a.checkedAt.localeCompare(b.checkedAt))
}

export type ScoreTrend = { current: number | null; previous: number | null; delta: number | null }

export function computeTrend(series: ScoreHistoryPoint[]): ScoreTrend {
  const current = series.at(-1)?.avgScore ?? null
  const previous = series.length > 1 ? series.at(-2)!.avgScore : null
  return { current, previous, delta: current !== null && previous !== null ? current - previous : null }
}

export { CATEGORY_ORDER, SEVERITY_ORDER }
