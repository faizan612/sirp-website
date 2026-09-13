import { SEVERITY_ORDER, type IssueWithRoute } from '@/lib/seo/aggregate'
import { SEVERITY_COLOR, SEVERITY_LABELS } from '@/lib/seo/labels'
import type { SeoIssueSeverity } from '@/lib/seo/types'

const MAX_VISIBLE_PER_COLUMN = 25

export function IssuesKanban({ grouped }: { grouped: Record<SeoIssueSeverity, IssueWithRoute[]> }) {
  return (
    <div className="cms-card">
      <div className="cms-card-head">
        <div className="cms-card-title">Issues</div>
        <div className="cms-card-desc">Every finding across the crawl, grouped by severity.</div>
      </div>
      <div className="cms-card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.1rem' }}>
        {SEVERITY_ORDER.map((severity) => {
          const issues = grouped[severity]
          return (
            <div key={severity}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
                <span
                  style={{ width: 8, height: 8, borderRadius: '50%', background: SEVERITY_COLOR[severity], display: 'inline-block' }}
                />
                <strong style={{ fontSize: '0.85rem' }}>{SEVERITY_LABELS[severity]}</strong>
                <span className="cms-list-meta">({issues.length})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: 300, overflowY: 'auto' }}>
                {issues.length === 0 ? (
                  <span className="cms-list-meta">None</span>
                ) : (
                  issues.slice(0, MAX_VISIBLE_PER_COLUMN).map((issue, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '0.6rem 0.75rem',
                        background: 'var(--cms-surface-2)',
                        border: '1px solid var(--cms-line)',
                        borderRadius: 10,
                        fontSize: '0.8rem',
                      }}
                    >
                      <div style={{ color: 'var(--cms-fg)' }}>{issue.message}</div>
                      <div className="cms-list-meta" style={{ marginTop: '0.3rem' }}>
                        {issue.route}
                      </div>
                    </div>
                  ))
                )}
                {issues.length > MAX_VISIBLE_PER_COLUMN && (
                  <span className="cms-list-meta">+{issues.length - MAX_VISIBLE_PER_COLUMN} more</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
