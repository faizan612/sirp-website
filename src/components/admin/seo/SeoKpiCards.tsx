import { AlertTriangle, FileWarning, Gauge, Link2Off } from 'lucide-react'
import type { ScoreTrend } from '@/lib/seo/aggregate'

type IconType = React.ComponentType<{ size?: number; color?: string }>

function KpiCard({ icon: Icon, label, value, sub }: { icon: IconType; label: string; value: string | number; sub?: string }) {
  return (
    <div className="cms-stat">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon size={16} color="var(--cms-purple-lt)" />
        <div className="cms-stat-num">{value}</div>
      </div>
      <div className="cms-stat-label">{label}</div>
      {sub && (
        <div className="cms-list-meta" style={{ marginTop: '0.3rem' }}>
          {sub}
        </div>
      )}
    </div>
  )
}

export function SeoKpiCards({
  overallScore,
  trend,
  pagesAudited,
  criticalIssues,
  brokenLinks,
}: {
  overallScore: number | null
  trend: ScoreTrend
  pagesAudited: number
  criticalIssues: number
  brokenLinks: number
}) {
  const trendLabel = trend.delta === null ? undefined : `${trend.delta > 0 ? '+' : ''}${trend.delta} vs last run`

  return (
    <div className="cms-stats">
      <KpiCard icon={Gauge} label="Overall score" value={overallScore ?? '—'} sub={trendLabel} />
      <KpiCard icon={AlertTriangle} label="Critical issues" value={criticalIssues} />
      <KpiCard icon={FileWarning} label="Pages audited" value={pagesAudited} />
      <KpiCard icon={Link2Off} label="Broken links" value={brokenLinks} />
    </div>
  )
}
