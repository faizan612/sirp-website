import { Radar, ShieldCheck, Workflow } from 'lucide-react'
import type { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import { Badge } from '@/components/homepage/ui/badge'
import { Container } from '@/components/homepage/ui/container'
import './ClassifyCards.css'

type ClassifyCardsProps = {
  data: (typeof buyersGuideContent)['classify']
}
const icons = [Workflow, Radar, ShieldCheck]

export function ClassifyCards({ data }: ClassifyCardsProps) {
  return (
    <section className="bg-classify" aria-labelledby="guide-categories-title">
      <Container>
        <div className="bg-classify-layout">
          <div className="bg-classify-intro">
            <Badge variant="light">{data.eyebrow}</Badge>
            <h2 id="guide-categories-title" className="bg-classify-heading">{data.heading}</h2>
            <p className="bg-classify-lead">{data.lead}</p>
          </div>
          <div className="bg-classify-cards">
            {data.cards.map((card, index) => {
              const Icon = icons[index]
              return (
                <article key={card.title} className={`bg-classify-card${card.active ? ' is-active' : ''}`}>
                  <span className="bg-classify-icon"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span>
                  <div>
                    <span className="bg-classify-card-tag">{card.tag}</span>
                    <h3 className="bg-classify-card-title">{card.title}</h3>
                    <p className="bg-classify-card-body">{card.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
