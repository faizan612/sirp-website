import { Check, X } from 'lucide-react'
import type { StructuredDataCheck } from '@/lib/seo/aggregate'

export function StructuredDataChecklist({ checklist }: { checklist: StructuredDataCheck[] }) {
  return (
    <div className="cms-card">
      <div className="cms-card-head">
        <div className="cms-card-title">Structured data</div>
        <div className="cms-card-desc">Which schema.org types appear anywhere on the site.</div>
      </div>
      <ul className="cms-list">
        {checklist.map((c) => (
          <li key={c.type}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {c.present ? <Check size={16} color="#4ade80" /> : <X size={16} color="var(--cms-fg-faint)" />}
              {c.type}
            </span>
            <span className="cms-list-meta">{c.present ? `${c.pageCount} page${c.pageCount === 1 ? '' : 's'}` : 'Not found'}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
