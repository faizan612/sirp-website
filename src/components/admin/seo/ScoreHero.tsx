import { CATEGORY_ORDER } from '@/lib/seo/aggregate'
import { CATEGORY_LABELS, scoreColor } from '@/lib/seo/labels'
import type { SeoCategory } from '@/lib/seo/types'
import type { ScoreTrend } from '@/lib/seo/aggregate'

function ScoreRing({ score, size = 132, stroke = 11 }: { score: number; size?: number; stroke?: number }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - Math.max(0, Math.min(100, score)) / 100)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Overall SEO score: ${score}`}>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--cms-line-strong)" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={scoreColor(score)}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize={size * 0.28} fontWeight={700} fill="var(--cms-fg)">
        {score}
      </text>
    </svg>
  )
}

function TrendBadge({ trend }: { trend: ScoreTrend }) {
  if (trend.delta === null) {
    return <span className="cms-list-meta">No prior run to compare yet</span>
  }
  const up = trend.delta > 0
  const flat = trend.delta === 0
  const color = flat ? 'var(--cms-fg-dim)' : up ? '#4ade80' : '#ff6b6b'
  const arrow = flat ? '→' : up ? '↑' : '↓'
  return (
    <span style={{ color, fontSize: '0.85rem', fontWeight: 600 }}>
      {arrow} {Math.abs(trend.delta)} pt{Math.abs(trend.delta) === 1 ? '' : 's'} vs previous run
    </span>
  )
}

export function ScoreHero({
  overallScore,
  trend,
  categories,
  activeCategory,
  onSelectCategory,
}: {
  overallScore: number | null
  trend: ScoreTrend
  categories: Record<SeoCategory, number>
  activeCategory: SeoCategory | null
  onSelectCategory: (cat: SeoCategory) => void
}) {
  return (
    <div className="cms-card">
      <div className="cms-card-body" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <ScoreRing score={overallScore ?? 0} />
          <TrendBadge trend={trend} />
        </div>

        <div style={{ flex: 1, minWidth: 260, display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className="cms-badge"
              style={{
                cursor: 'pointer',
                border: activeCategory === cat ? '1px solid var(--cms-purple)' : '1px solid transparent',
                color: scoreColor(categories[cat] ?? 0),
                background: 'var(--cms-elevated)',
              }}
            >
              {CATEGORY_LABELS[cat]}: {categories[cat] ?? '—'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
