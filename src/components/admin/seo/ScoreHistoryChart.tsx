'use client'

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { ScoreHistoryPoint } from '@/lib/seo/aggregate'

const TOOLTIP_STYLE = { background: '#1b1b26', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 10, fontSize: 12 }

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

/** Real history only — sparse (or empty) until enough "Run audit" clicks have accumulated. Never interpolated or fabricated to look fuller. */
export function ScoreHistoryChart({ history }: { history: ScoreHistoryPoint[] }) {
  if (history.length < 2) {
    return (
      <div className="cms-card">
        <div className="cms-card-head">
          <div className="cms-card-title">Score history</div>
          <div className="cms-card-desc">Site-wide average score across every audit run.</div>
        </div>
        <div className="cms-card-body">
          <p className="cms-subtitle" style={{ margin: 0 }}>
            {history.length === 0 ? 'No runs yet.' : 'Only one run so far — run the audit again to start a trend line.'}
          </p>
        </div>
      </div>
    )
  }

  const data = history.map((p) => ({ date: formatDate(p.checkedAt), score: p.avgScore }))

  return (
    <div className="cms-card">
      <div className="cms-card-head">
        <div className="cms-card-title">Score history</div>
        <div className="cms-card-desc">Site-wide average score across every audit run.</div>
      </div>
      <div className="cms-card-body" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="seoScoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8e2dff" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#8e2dff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="rgba(244,242,255,0.38)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis domain={[0, 100]} stroke="rgba(244,242,255,0.38)" fontSize={11} tickLine={false} axisLine={false} width={32} />
            <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: '#f4f2ff' }} />
            <Area type="monotone" dataKey="score" stroke="#8e2dff" strokeWidth={2} fill="url(#seoScoreGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
