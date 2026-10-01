import Image from 'next/image'
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react'
import type { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import { Badge } from '@/components/homepage/ui/badge'
import { Container } from '@/components/homepage/ui/container'
import './ScoreGrid.css'

type ScoreGridProps = { data: (typeof buyersGuideContent)['omniSenseScores'] }

export function ScoreGrid({ data }: ScoreGridProps) {
  return (
    <section className="bg-score-grid-section" aria-labelledby="guide-omnisense-title">
      <Container>
        <div className="bg-score-grid-intro">
          <div className="bg-score-grid-art">
            <Image
              src="/images/omnisense/pillar-orchestrator.png"
              alt="OmniSense decision loop connecting the Planner, Policy Gate, Executor, and Governor."
              width={3312}
              height={2960}
              sizes="(max-width: 800px) 90vw, (max-width: 1600px) 42vw, 600px"
            />
          </div>
          <div className="bg-score-grid-copy">
            <Badge variant="light">{data.eyebrow}</Badge>
            <h2 id="guide-omnisense-title" className="bg-score-grid-heading">{data.heading}</h2>
            <p className="bg-score-grid-lead">{data.lead}</p>
            <a href="/omnisense" className="bg-score-grid-explore">Explore the OmniSense platform <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="bg-score-grid">
          {data.rows.map((row) => (
            <article key={row.label} className="bg-score-item">
              <div className="bg-score-item-top">
                <span className="bg-score-item-number">{row.label.slice(0, 2)}</span>
                <span className={`bg-score-status${row.checked ? '' : ' is-open'}`}>
                  {row.checked ? <Check size={16} aria-label="Meets this criterion" /> : <MessageCircle size={16} aria-label="Discuss with SIRP" />}
                </span>
              </div>
              <h3>{row.label.slice(3)}</h3>
              <p>{row.answer}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
