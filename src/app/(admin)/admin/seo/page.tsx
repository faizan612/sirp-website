import { getSeoAudits, getSeoScoreHistory, getSeoTrend } from '@/lib/seo/queries'
import { RunSeoAuditButton } from '@/components/admin/RunSeoAuditButton'
import { SeoDashboard } from '@/components/admin/seo/SeoDashboard'
import {
  categoryAverages,
  contentQualitySummary,
  countBySeverity,
  crawlActivitySummary,
  groupIssuesBySeverity,
  securityChecklist,
  structuredDataChecklist,
} from '@/lib/seo/aggregate'
import type { SeoAuditRow } from '@/lib/seo/types'

export const dynamic = 'force-dynamic'

function overallScore(audits: SeoAuditRow[]): number | null {
  if (audits.length === 0) return null
  return Math.round(audits.reduce((sum, a) => sum + a.score, 0) / audits.length)
}

export default async function SeoPage() {
  const [audits, trend, history] = await Promise.all([getSeoAudits(), getSeoTrend(), getSeoScoreHistory()])
  const crawlActivity = crawlActivitySummary(audits)

  return (
    <div className="cms-container">
      <div className="cms-page-head">
        <div>
          <span className="cms-eyebrow">SEO</span>
          <h1 className="cms-title">Site health</h1>
          <p className="cms-subtitle">
            Crawls every marketing page and published post the way a search engine sees it — title, meta
            description, canonical, Open Graph, structured data, security headers and more.
          </p>
        </div>
        <RunSeoAuditButton />
      </div>

      <SeoDashboard
        audits={audits}
        overallScore={overallScore(audits)}
        trend={trend}
        history={history}
        categories={categoryAverages(audits)}
        criticalIssues={countBySeverity(audits, 'critical')}
        brokenLinks={crawlActivity.totalBrokenLinks}
        groupedIssues={groupIssuesBySeverity(audits)}
        structuredData={structuredDataChecklist(audits)}
        security={securityChecklist(audits)}
        contentQuality={contentQualitySummary(audits)}
        crawlActivity={crawlActivity}
      />
    </div>
  )
}
