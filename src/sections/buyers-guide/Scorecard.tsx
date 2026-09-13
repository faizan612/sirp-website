import type { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import './Scorecard.css'

type ScorecardProps = {
  data: (typeof buyersGuideContent)['scorecard']
}

export function Scorecard({ data }: ScorecardProps) {
  return (
    <section className="bg-scorecard" id="scorecard">
      <div className="container-sirp">
        <div className="bg-scorecard-eyebrow">{data.eyebrow}</div>
        <h2 className="bg-scorecard-heading">{data.heading}</h2>
        <p className="bg-scorecard-lead">{data.lead}</p>

        <div className="bg-scorecard-log">
          {data.rows.map((row) => (
            <div key={row.num} className="bg-scorecard-row">
              <div className="bg-scorecard-row-head">
                <div className="bg-scorecard-num">
                  {row.num} / {data.rows.length.toString().padStart(2, '0')}
                </div>
                <div className="bg-scorecard-title">{row.title}</div>
              </div>
              <div className="bg-scorecard-body">
                <div className="bg-scorecard-line">
                  <span className="bg-scorecard-key bg-scorecard-key--ask">Ask</span>
                  <span className="bg-scorecard-value">{row.ask}</span>
                </div>
                <div className="bg-scorecard-line">
                  <span className="bg-scorecard-key bg-scorecard-key--weak">Weak</span>
                  <span className="bg-scorecard-value">{row.weak}</span>
                </div>
                <div className="bg-scorecard-line">
                  <span className="bg-scorecard-key bg-scorecard-key--strong">Strong</span>
                  <span className="bg-scorecard-value">{row.strong}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
