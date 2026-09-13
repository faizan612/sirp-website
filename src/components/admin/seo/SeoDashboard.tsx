'use client'

import { useState } from 'react'
import { Gauge, KeyRound, Sparkles } from 'lucide-react'
import { ScoreHero } from './ScoreHero'
import { SeoKpiCards } from './SeoKpiCards'
import { ScoreHistoryChart } from './ScoreHistoryChart'
import { CategoryDonut } from './CategoryDonut'
import { TopPagesTable } from './TopPagesTable'
import { IssuesKanban } from './IssuesKanban'
import { StructuredDataChecklist } from './StructuredDataChecklist'
import { SecurityChecklist } from './SecurityChecklist'
import { ContentQualityCards } from './ContentQualityCards'
import { CrawlActivity } from './CrawlActivity'
import { NotConnectedCard } from './NotConnectedCard'
import type {
  ContentQualitySummary,
  CrawlActivitySummary,
  IssueWithRoute,
  ScoreHistoryPoint,
  ScoreTrend,
  SecurityCheck,
  StructuredDataCheck,
} from '@/lib/seo/aggregate'
import type { SeoAuditRow, SeoCategory, SeoIssueSeverity } from '@/lib/seo/types'

const GRID_TWO_COL: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '1.25rem',
}

export function SeoDashboard({
  audits,
  overallScore,
  trend,
  history,
  categories,
  criticalIssues,
  brokenLinks,
  groupedIssues,
  structuredData,
  security,
  contentQuality,
  crawlActivity,
}: {
  audits: SeoAuditRow[]
  overallScore: number | null
  trend: ScoreTrend
  history: ScoreHistoryPoint[]
  categories: Record<SeoCategory, number>
  criticalIssues: number
  brokenLinks: number
  groupedIssues: Record<SeoIssueSeverity, IssueWithRoute[]>
  structuredData: StructuredDataCheck[]
  security: SecurityCheck[]
  contentQuality: ContentQualitySummary
  crawlActivity: CrawlActivitySummary
}) {
  const [activeCategory, setActiveCategory] = useState<SeoCategory | null>(null)

  return (
    <div className="cms-stack">
      <ScoreHero
        overallScore={overallScore}
        trend={trend}
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory((prev) => (prev === cat ? null : cat))}
      />

      <SeoKpiCards
        overallScore={overallScore}
        trend={trend}
        pagesAudited={audits.length}
        criticalIssues={criticalIssues}
        brokenLinks={brokenLinks}
      />

      <div style={GRID_TWO_COL}>
        <ScoreHistoryChart history={history} />
        <CategoryDonut categories={categories} />
      </div>

      <TopPagesTable audits={audits} activeCategory={activeCategory} />

      <IssuesKanban grouped={groupedIssues} />

      <div style={GRID_TWO_COL}>
        <StructuredDataChecklist checklist={structuredData} />
        <SecurityChecklist checklist={security} />
      </div>

      <ContentQualityCards summary={contentQuality} />
      <CrawlActivity summary={crawlActivity} />

      <div>
        <div className="cms-card-title">Not yet connected</div>
        <div className="cms-card-desc" style={{ marginTop: '0.25rem' }}>
          These sections need external data sources this app doesn't have wired up yet — shown here rather than hidden, but
          deliberately with no numbers.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <NotConnectedCard
          icon={Gauge}
          title="Search Console & PageSpeed Insights"
          description="Organic clicks, impressions, average position, CTR, indexed pages, and Core Web Vitals."
          requirement="Needs a Google Cloud service account (Search Console) and an API key (PageSpeed Insights)."
        />
        <NotConnectedCard
          icon={KeyRound}
          title="Keyword rank tracking"
          description="Search volume, ranking position and trend for tracked keywords."
          requirement="Needs a paid rank-tracking vendor (e.g. Ahrefs, SEMrush, DataForSEO) — not buildable in-house."
        />
        <NotConnectedCard
          icon={Sparkles}
          title="AI recommendations & content-gap opportunities"
          description="Per-page suggestions, comparison-page ideas, and competitor content gaps."
          requirement="Needs an LLM integration (suggestions only, no auto-write) and, for gaps, competitor crawling."
        />
      </div>
    </div>
  )
}
