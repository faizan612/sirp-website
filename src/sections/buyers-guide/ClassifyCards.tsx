import type { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import './ClassifyCards.css'

type ClassifyCardsProps = {
  data: (typeof buyersGuideContent)['classify']
}

export function ClassifyCards({ data }: ClassifyCardsProps) {
  return (
    <section className="bg-classify">
      <div className="container-sirp">
        <div className="bg-classify-eyebrow">{data.eyebrow}</div>
        <h2 className="bg-classify-heading">{data.heading}</h2>
        <p className="bg-classify-lead">{data.lead}</p>

        <div className="bg-classify-cards">
          {data.cards.map((card) => (
            <div key={card.title} className={`bg-classify-card${card.active ? ' is-active' : ''}`}>
              <span className="bg-classify-card-tag">{card.tag}</span>
              <h3 className="bg-classify-card-title">{card.title}</h3>
              <p className="bg-classify-card-body">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
