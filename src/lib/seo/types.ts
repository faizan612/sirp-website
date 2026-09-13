export type SeoIssueSeverity = 'critical' | 'high' | 'medium' | 'low'

export type SeoCategory = 'technical' | 'content' | 'security' | 'schema' | 'links' | 'accessibility'

export type SeoIssue = {
  field: string
  category: SeoCategory
  severity: SeoIssueSeverity
  message: string
}

export type SeoCategoryScores = Record<SeoCategory, number>

export type SeoPageMetrics = {
  wordCount: number
  readingTimeMinutes: number
  headingCounts: { h1: number; h2: number; h3: number }
  readabilityScore: number
  internalLinkCount: number
  brokenLinkCount: number
  structuredDataTypes: string[]
  /** Cybersecurity glossary terms found on the page — informational, not scored. */
  cybersecurityTerms: string[]
}

/** Result of auditing one rendered page. */
export type SeoPageResult = {
  route: string
  httpStatus: number
  score: number
  categories: SeoCategoryScores
  issues: SeoIssue[]
  metrics: SeoPageMetrics
}

/** A persisted audit result, as read back from `seo_audits`. */
export type SeoAuditRow = SeoPageResult & { checkedAt: string }
