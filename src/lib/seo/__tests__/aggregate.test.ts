import { describe, it, expect } from 'vitest'
import {
  categoryAverages,
  computeScoreHistorySeries,
  computeTrend,
  contentQualitySummary,
  countBySeverity,
  crawlActivitySummary,
  groupIssuesBySeverity,
  securityChecklist,
  structuredDataChecklist,
} from '../aggregate'
import type { SeoAuditRow } from '../types'

function makeAudit(overrides: Partial<SeoAuditRow> = {}): SeoAuditRow {
  return {
    route: '/page',
    httpStatus: 200,
    score: 100,
    categories: { technical: 100, content: 100, security: 100, schema: 100, links: 100, accessibility: 100 },
    issues: [],
    metrics: {
      wordCount: 500,
      readingTimeMinutes: 3,
      headingCounts: { h1: 1, h2: 2, h3: 0 },
      readabilityScore: 70,
      internalLinkCount: 5,
      brokenLinkCount: 0,
      structuredDataTypes: [],
      cybersecurityTerms: [],
    },
    checkedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

describe('categoryAverages', () => {
  it('averages each category across all pages', () => {
    const a = makeAudit({ categories: { technical: 80, content: 100, security: 100, schema: 100, links: 100, accessibility: 100 } })
    const b = makeAudit({ categories: { technical: 60, content: 100, security: 100, schema: 100, links: 100, accessibility: 100 } })
    const result = categoryAverages([a, b])
    expect(result.technical).toBe(70)
    expect(result.content).toBe(100)
  })

  it('returns all zeros for an empty audit list', () => {
    const result = categoryAverages([])
    expect(result.technical).toBe(0)
  })
})

describe('groupIssuesBySeverity / countBySeverity', () => {
  it('buckets issues by severity and tags them with their route', () => {
    const audits = [
      makeAudit({ route: '/a', issues: [{ field: 'title', category: 'technical', severity: 'critical', message: 'x' }] }),
      makeAudit({ route: '/b', issues: [{ field: 'og:title', category: 'technical', severity: 'low', message: 'y' }] }),
    ]
    const grouped = groupIssuesBySeverity(audits)
    expect(grouped.critical).toEqual([{ field: 'title', category: 'technical', severity: 'critical', message: 'x', route: '/a' }])
    expect(grouped.low).toHaveLength(1)
    expect(grouped.high).toEqual([])
  })

  it('counts issues of a given severity across all pages', () => {
    const audits = [
      makeAudit({ issues: [{ field: 'a', category: 'technical', severity: 'critical', message: 'x' }] }),
      makeAudit({ issues: [{ field: 'b', category: 'technical', severity: 'critical', message: 'y' }] }),
    ]
    expect(countBySeverity(audits, 'critical')).toBe(2)
    expect(countBySeverity(audits, 'low')).toBe(0)
  })
})

describe('structuredDataChecklist', () => {
  it('reports a type as present when any page has it, with the correct page count', () => {
    const audits = [
      makeAudit({ route: '/a', metrics: { ...makeAudit().metrics, structuredDataTypes: ['Article'] } }),
      makeAudit({ route: '/b', metrics: { ...makeAudit().metrics, structuredDataTypes: ['Article', 'FAQPage'] } }),
    ]
    const checklist = structuredDataChecklist(audits)
    const article = checklist.find((c) => c.type === 'Article')
    const faq = checklist.find((c) => c.type === 'FAQPage')
    const product = checklist.find((c) => c.type === 'Product')
    expect(article).toEqual({ type: 'Article', present: true, pageCount: 2 })
    expect(faq).toEqual({ type: 'FAQPage', present: true, pageCount: 1 })
    expect(product).toEqual({ type: 'Product', present: false, pageCount: 0 })
  })
})

describe('securityChecklist', () => {
  it('passes a check for every page that has no matching issue', () => {
    const audits = [
      makeAudit({ route: '/a', issues: [] }),
      makeAudit({ route: '/b', issues: [{ field: 'hsts', category: 'security', severity: 'high', message: 'missing' }] }),
    ]
    const checklist = securityChecklist(audits)
    const hsts = checklist.find((c) => c.key === 'hsts')
    expect(hsts).toEqual({ key: 'hsts', label: 'Strict-Transport-Security', passing: 1, total: 2 })
  })

  it('scores "reachable over HTTPS" from httpStatus rather than a fabricated flag', () => {
    const audits = [makeAudit({ httpStatus: 200 }), makeAudit({ httpStatus: 500 })]
    const https = securityChecklist(audits).find((c) => c.key === 'https')
    expect(https).toEqual({ key: 'https', label: 'Reachable over HTTPS', passing: 1, total: 2 })
  })
})

describe('contentQualitySummary', () => {
  it('averages metrics only across pages that actually have body text', () => {
    const withText = makeAudit({ metrics: { ...makeAudit().metrics, wordCount: 400, readingTimeMinutes: 2, readabilityScore: 60 } })
    const noText = makeAudit({ metrics: { ...makeAudit().metrics, wordCount: 0, readingTimeMinutes: 0, readabilityScore: 0 } })
    const summary = contentQualitySummary([withText, noText])
    expect(summary.avgWordCount).toBe(400)
    expect(summary.totalPages).toBe(2)
  })

  it('counts pages with exactly one H1 as "proper" heading structure', () => {
    const good = makeAudit({ metrics: { ...makeAudit().metrics, headingCounts: { h1: 1, h2: 1, h3: 0 } } })
    const bad = makeAudit({ metrics: { ...makeAudit().metrics, headingCounts: { h1: 0, h2: 1, h3: 0 } } })
    expect(contentQualitySummary([good, bad]).properH1Count).toBe(1)
  })
})

describe('crawlActivitySummary', () => {
  it('separates broken pages (real HTTP errors) from unreachable pages (fetch failed entirely)', () => {
    const audits = [
      makeAudit({ route: '/ok', httpStatus: 200 }),
      makeAudit({ route: '/broken', httpStatus: 500 }),
      makeAudit({ route: '/down', httpStatus: 0 }),
    ]
    const summary = crawlActivitySummary(audits)
    expect(summary.brokenPages.map((p) => p.route)).toEqual(['/broken'])
    expect(summary.unreachablePages.map((p) => p.route)).toEqual(['/down'])
  })

  it('takes the most recent checkedAt across all pages as the last crawl time', () => {
    const audits = [
      makeAudit({ checkedAt: '2026-01-01T00:00:00.000Z' }),
      makeAudit({ checkedAt: '2026-01-02T00:00:00.000Z' }),
    ]
    expect(crawlActivitySummary(audits).lastCrawlAt).toBe('2026-01-02T00:00:00.000Z')
  })

  it('sums broken link counts across all pages', () => {
    const audits = [
      makeAudit({ metrics: { ...makeAudit().metrics, brokenLinkCount: 2 } }),
      makeAudit({ metrics: { ...makeAudit().metrics, brokenLinkCount: 3 } }),
    ]
    expect(crawlActivitySummary(audits).totalBrokenLinks).toBe(5)
  })
})

describe('computeScoreHistorySeries / computeTrend', () => {
  it('groups rows sharing the same run timestamp into one averaged point', () => {
    const rows = [
      { checkedAt: '2026-01-01T00:00:00.000Z', score: 80 },
      { checkedAt: '2026-01-01T00:00:00.000Z', score: 100 },
      { checkedAt: '2026-01-02T00:00:00.000Z', score: 90 },
    ]
    expect(computeScoreHistorySeries(rows)).toEqual([
      { checkedAt: '2026-01-01T00:00:00.000Z', avgScore: 90 },
      { checkedAt: '2026-01-02T00:00:00.000Z', avgScore: 90 },
    ])
  })

  it('sorts runs oldest first regardless of input order', () => {
    const rows = [
      { checkedAt: '2026-03-01T00:00:00.000Z', score: 50 },
      { checkedAt: '2026-01-01T00:00:00.000Z', score: 90 },
    ]
    const series = computeScoreHistorySeries(rows)
    expect(series.map((p) => p.checkedAt)).toEqual(['2026-01-01T00:00:00.000Z', '2026-03-01T00:00:00.000Z'])
  })

  it('reports no trend yet when there is only one run', () => {
    const series = computeScoreHistorySeries([{ checkedAt: '2026-01-01T00:00:00.000Z', score: 90 }])
    expect(computeTrend(series)).toEqual({ current: 90, previous: null, delta: null })
  })

  it('computes a real delta between the last two runs', () => {
    const series = computeScoreHistorySeries([
      { checkedAt: '2026-01-01T00:00:00.000Z', score: 80 },
      { checkedAt: '2026-01-02T00:00:00.000Z', score: 92 },
    ])
    expect(computeTrend(series)).toEqual({ current: 92, previous: 80, delta: 12 })
  })

  it('reports nothing at all for an empty history', () => {
    expect(computeTrend([])).toEqual({ current: null, previous: null, delta: null })
  })
})
