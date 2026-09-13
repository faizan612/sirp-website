import { PurplePill } from '@/components/shared/PurplePill'
import './KeyInsightsSection.css'

const CARD_PILL = 'The trust threshold'

const INSIGHT_CARDS = [
  {
    title: 'L2 to L3 Transition',
    body:
      'The transition from automated triage to conditional autonomy requires the system to reason about novel situations, not just follow playbooks. This is the hardest architectural leap.',
  },
  {
    title: 'L3 to L4 Transition',
    body:
      'Moving from human approves to system acts autonomously is primarily a trust challenge requiring calibrated confidence, governed boundaries, and auditable decision traces.',
  },
  {
    title: 'Full Autonomy',
    body:
      'Full autonomy may be technically achievable but ethically undesirable. The value of human judgment in security is not processing speed, it\'s moral reasoning about proportional response.',
  },
] as const

export function KeyInsightsSection() {
  return (
    <section className="manifesto-key-insights" aria-label="Key insights">
      <div className="manifesto-key-insights-inner">
        <div className="manifesto-key-insights-stack">
          <PurplePill className="manifesto-key-insights-kicker">Key Insights</PurplePill>

          <div className="manifesto-key-insights-grid">
            {INSIGHT_CARDS.map((card) => (
              <article key={card.title} className="manifesto-insight-card">
                <PurplePill className="manifesto-insight-card-pill">{CARD_PILL}</PurplePill>
                <h3 className="manifesto-insight-card-title">{card.title}</h3>
                <p className="manifesto-insight-card-body">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
