import type { SeoCategory, SeoIssueSeverity } from './types'

/** Single source of truth for how categories/severities are displayed — every SEO dashboard component imports from here instead of re-declaring its own copy. */
export const CATEGORY_LABELS: Record<SeoCategory, string> = {
  technical: 'Technical SEO',
  content: 'Content Quality',
  security: 'Security Headers',
  schema: 'Schema',
  links: 'Internal Linking',
  accessibility: 'Accessibility',
}

export const SEVERITY_LABELS: Record<SeoIssueSeverity, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

/** Hex values matching the hue of the existing .cms-badge variants (published/scheduled/danger) — no new palette introduced. */
export const SEVERITY_COLOR: Record<SeoIssueSeverity, string> = {
  critical: '#ff4d4f',
  high: '#ff6b6b',
  medium: '#fbbf24',
  low: 'var(--cms-fg-dim)',
}

export function scoreColor(score: number): string {
  if (score >= 90) return '#4ade80'
  if (score >= 70) return '#fbbf24'
  return '#ff6b6b'
}

export function scoreBadgeClass(score: number): string {
  if (score >= 90) return 'cms-badge--published'
  if (score >= 70) return 'cms-badge--scheduled'
  return 'cms-badge--danger'
}
