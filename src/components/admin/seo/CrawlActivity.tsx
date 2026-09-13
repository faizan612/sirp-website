import type { CrawlActivitySummary } from '@/lib/seo/aggregate'

export function CrawlActivity({ summary }: { summary: CrawlActivitySummary }) {
  const problemPages = [...summary.brokenPages, ...summary.unreachablePages]

  return (
    <div className="cms-card">
      <div className="cms-card-head">
        <div className="cms-card-title">Crawl activity</div>
        <div className="cms-card-desc">
          {summary.lastCrawlAt ? `Last crawl ${new Date(summary.lastCrawlAt).toLocaleString('en-GB')}` : 'No crawl yet'}
        </div>
      </div>
      <div className="cms-card-body cms-stats" style={{ marginBottom: 0 }}>
        <div className="cms-stat">
          <div className="cms-stat-num">{summary.brokenPages.length}</div>
          <div className="cms-stat-label">Broken pages (4xx/5xx)</div>
        </div>
        <div className="cms-stat">
          <div className="cms-stat-num">{summary.unreachablePages.length}</div>
          <div className="cms-stat-label">Unreachable pages</div>
        </div>
        <div className="cms-stat">
          <div className="cms-stat-num">{summary.totalBrokenLinks}</div>
          <div className="cms-stat-label">Broken internal links</div>
        </div>
      </div>
      {problemPages.length > 0 && (
        <div className="cms-card-body" style={{ paddingTop: 0 }}>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: 0, padding: 0, listStyle: 'none' }}>
            {problemPages.map((p) => (
              <li key={p.route} className="cms-list-meta">
                {p.route} — HTTP {p.httpStatus || 'unreachable'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
