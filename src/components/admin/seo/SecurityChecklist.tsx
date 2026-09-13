import { Check, X } from 'lucide-react'
import type { SecurityCheck } from '@/lib/seo/aggregate'

export function SecurityChecklist({ checklist }: { checklist: SecurityCheck[] }) {
  return (
    <div className="cms-card">
      <div className="cms-card-head">
        <div className="cms-card-title">Security SEO</div>
        <div className="cms-card-desc">Pass/fail across every crawled page.</div>
      </div>
      <ul className="cms-list">
        {checklist.map((c) => {
          const allPass = c.total > 0 && c.passing === c.total
          return (
            <li key={c.key}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {allPass ? <Check size={16} color="#4ade80" /> : <X size={16} color="#ff6b6b" />}
                {c.label}
              </span>
              <span className="cms-list-meta">
                {c.passing}/{c.total} pages
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
