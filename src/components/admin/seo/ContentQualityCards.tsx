import type { ContentQualitySummary } from '@/lib/seo/aggregate'

export function ContentQualityCards({ summary }: { summary: ContentQualitySummary }) {
  return (
    <div className="cms-card">
      <div className="cms-card-head">
        <div className="cms-card-title">Content quality</div>
        <div className="cms-card-desc">Averages across every page with body text.</div>
      </div>
      <div className="cms-card-body cms-stats" style={{ marginBottom: 0 }}>
        <div className="cms-stat">
          <div className="cms-stat-num">{summary.avgWordCount}</div>
          <div className="cms-stat-label">Avg. word count</div>
        </div>
        <div className="cms-stat">
          <div className="cms-stat-num">{summary.avgReadingTimeMinutes}m</div>
          <div className="cms-stat-label">Avg. reading time</div>
        </div>
        <div className="cms-stat">
          <div className="cms-stat-num">{summary.avgReadabilityScore}</div>
          <div className="cms-stat-label">Avg. readability</div>
        </div>
        <div className="cms-stat">
          <div className="cms-stat-num">
            {summary.properH1Count}/{summary.totalPages}
          </div>
          <div className="cms-stat-label">Proper H1 structure</div>
        </div>
      </div>
    </div>
  )
}
