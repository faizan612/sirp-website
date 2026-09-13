import 'server-only'
import { createSupabaseServerClient } from '@/lib/supabase/server-auth'
import { verifySession } from '@/lib/auth/dal'
import { computeScoreHistorySeries, computeTrend, type ScoreHistoryPoint, type ScoreTrend } from './aggregate'
import type { SeoAuditRow } from './types'

/** Last audit run for every crawled route, worst score first. */
export async function getSeoAudits(): Promise<SeoAuditRow[]> {
  await verifySession()
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('seo_audits')
    .select('route, http_status, score, categories, issues, metrics, checked_at')
    .order('score', { ascending: true })

  if (error) {
    console.error('[seo] getSeoAudits:', error.message)
    return []
  }

  return (data ?? []).map((r) => ({
    route: r.route,
    httpStatus: r.http_status,
    score: r.score,
    categories: r.categories ?? {},
    issues: r.issues ?? [],
    metrics: r.metrics ?? {},
    checkedAt: r.checked_at,
  }))
}

/** Real site-wide score per run, oldest first — sparse until enough "Run audit" clicks have accumulated history. Never fabricated to fill gaps. */
export async function getSeoScoreHistory(limit = 20): Promise<ScoreHistoryPoint[]> {
  await verifySession()
  const supabase = await createSupabaseServerClient()

  // Enough rows to cover several recent runs across every route, without
  // scanning the whole table as history grows indefinitely.
  const { data, error } = await supabase
    .from('seo_audit_history')
    .select('checked_at, score')
    .order('checked_at', { ascending: false })
    .limit(2000)

  if (error) {
    console.error('[seo] getSeoScoreHistory:', error.message)
    return []
  }

  const series = computeScoreHistorySeries((data ?? []).map((r) => ({ checkedAt: r.checked_at, score: r.score })))
  return series.slice(-limit)
}

/** Current vs. previous run's site-wide average score. `previous`/`delta` are null until a second audit run exists. */
export async function getSeoTrend(): Promise<ScoreTrend> {
  const series = await getSeoScoreHistory(2)
  return computeTrend(series)
}
