'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CATEGORY_ORDER } from '@/lib/seo/aggregate'
import { CATEGORY_LABELS, scoreColor } from '@/lib/seo/labels'
import type { SeoCategory } from '@/lib/seo/types'

const TOOLTIP_STYLE = { background: '#1b1b26', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 10, fontSize: 12 }

export function CategoryDonut({ categories }: { categories: Record<SeoCategory, number> }) {
  const data = CATEGORY_ORDER.map((cat) => ({ name: CATEGORY_LABELS[cat], value: categories[cat] ?? 0, cat }))

  return (
    <div className="cms-card">
      <div className="cms-card-head">
        <div className="cms-card-title">Health breakdown</div>
        <div className="cms-card-desc">Each category's site-wide average score.</div>
      </div>
      <div className="cms-card-body">
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3} strokeWidth={0}>
                {data.map((d) => (
                  <Cell key={d.cat} fill={scoreColor(d.value)} />
                ))}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginTop: '0.75rem' }}>
          {data.map((d) => (
            <span key={d.cat} className="cms-list-meta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: scoreColor(d.value), display: 'inline-block' }} />
              {d.name}: {d.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
