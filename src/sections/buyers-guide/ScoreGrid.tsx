import type { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import './ScoreGrid.css'

type ScoreGridProps = {
  data: (typeof buyersGuideContent)['omniSenseScores']
}

export function ScoreGrid({ data }: ScoreGridProps) {
  return (
    <section className="bg-score-grid-section">
      <div className="container-sirp">
        <div className="bg-score-grid-eyebrow">{data.eyebrow}</div>
        <h2 className="bg-score-grid-heading">{data.heading}</h2>
        <p className="bg-score-grid-lead">{data.lead}</p>

        <div className="bg-score-grid">
          {data.rows.map((row) => (
            <div key={row.label} className="bg-score-item">
              <div className="bg-score-item-label">{row.label}</div>
              <div className="bg-score-item-answer">
                {row.checked ? (
                  <span className="bg-score-check">
                    <span aria-hidden="true">✓</span>
                    <span className="sr-only">Meets this criterion:</span>
                  </span>
                ) : (
                  <span className="bg-score-unchecked">
                    <span className="sr-only">Not claimed:</span>
                  </span>
                )}
                {row.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
