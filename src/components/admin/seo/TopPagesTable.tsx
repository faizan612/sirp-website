'use client'

import { CATEGORY_LABELS, scoreBadgeClass, SEVERITY_COLOR } from '@/lib/seo/labels'
import type { SeoAuditRow, SeoCategory } from '@/lib/seo/types'

function statusLabel(httpStatus: number): { text: string; ok: boolean } {
  if (httpStatus === 0) return { text: 'Unreachable', ok: false }
  if (httpStatus !== 200) return { text: `HTTP ${httpStatus}`, ok: false }
  return { text: 'OK', ok: true }
}

export function TopPagesTable({ audits, activeCategory }: { audits: SeoAuditRow[]; activeCategory: SeoCategory | null }) {
  const filtered = activeCategory ? audits.filter((a) => a.issues.some((i) => i.category === activeCategory)) : audits

  return (
    <div className="cms-card">
      <div className="cms-card-head">
        <div className="cms-card-title">Top pages{activeCategory ? ` — ${CATEGORY_LABELS[activeCategory]} issues` : ''}</div>
        <div className="cms-card-desc">Click a category chip above to filter; click "Run audit" to refresh.</div>
      </div>
      {filtered.length === 0 ? (
        <div className="cms-card-body">
          <p className="cms-subtitle" style={{ margin: 0 }}>
            {audits.length === 0 ? 'No audit yet — click "Run audit" to crawl the site.' : 'No pages match this filter.'}
          </p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Status</th>
                <th>Score</th>
                <th>Issues</th>
                <th>Last crawl</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const status = statusLabel(a.httpStatus)
                return (
                  <tr key={a.route}>
                    <td>{a.route}</td>
                    <td>
                      <span className={`cms-badge ${status.ok ? 'cms-badge--published' : 'cms-badge--danger'}`}>{status.text}</span>
                    </td>
                    <td>
                      <span className={`cms-badge ${scoreBadgeClass(a.score)}`}>{a.score}</span>
                    </td>
                    <td>
                      {a.issues.length === 0 ? (
                        <span className="cms-list-meta">None</span>
                      ) : (
                        <details>
                          <summary className="cms-list-meta" style={{ cursor: 'pointer' }}>
                            {a.issues.length} issue{a.issues.length === 1 ? '' : 's'}
                          </summary>
                          <ul style={{ marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {a.issues.map((issue, i) => (
                              <li key={i} className="cms-list-meta">
                                <strong style={{ color: SEVERITY_COLOR[issue.severity] }}>{issue.severity.toUpperCase()}</strong>{' '}
                                {issue.message}
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </td>
                    <td>
                      <span className="cms-list-meta">{new Date(a.checkedAt).toLocaleString('en-GB')}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
