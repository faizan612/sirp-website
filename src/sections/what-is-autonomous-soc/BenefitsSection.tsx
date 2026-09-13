'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { BellOff, ChartNoAxesColumnIncreasing, Hand, RefreshCcw } from 'lucide-react'
import { Eyebrow } from './Eyebrow'
import './BenefitsSection.css'

type BenefitCard = {
  icon: 'chart' | 'mute' | 'hand' | 'refresh'
  title: string
  mechanism: string
  paragraphs: readonly string[]
}

type Gloss = {
  term: string
  definition: string
}

export type BenefitsData = {
  badgeText: string
  heading: string
  glosses: readonly Gloss[]
  cards: readonly BenefitCard[]
}

type BenefitsSectionProps = {
  data: BenefitsData
}

const iconMap = {
  chart: ChartNoAxesColumnIncreasing,
  mute: BellOff,
  hand: Hand,
  refresh: RefreshCcw,
} as const

/**
 * S6 — outcome-led benefit cards. The outcome leads in the display face, with
 * the mechanism as a mono "signal" line beneath it. OmniFlex / OmniCollective
 * get a short plain gloss so a cold search visitor isn't lost on the names.
 */
export function BenefitsSection({ data }: BenefitsSectionProps) {
  const reduce = useReducedMotion()
  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay },
        }

  const glossTerms = new Set(data.glosses.map((g) => g.term))

  return (
    <section className="wsoc-benefits" aria-labelledby="wsoc-benefits-eyebrow">
      <div className="container-sirp wsoc-benefits-inner">
        <motion.div {...reveal()} className="wsoc-benefits-head">
          <Eyebrow id="wsoc-benefits-eyebrow">{data.badgeText}</Eyebrow>
          <h2 className="wsoc-benefits-heading">{data.heading}</h2>
        </motion.div>

        <div className="wsoc-benefits-grid">
          {data.cards.map((card, index) => {
            const Icon = iconMap[card.icon]
            const showGlosses = card.paragraphs.some((p) =>
              [...glossTerms].some((term) => p.includes(term)),
            )
            return (
              <motion.article key={card.title} {...reveal(index * 0.08)} className="wsoc-benefit-card">
                <span className="wsoc-benefit-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h3 className="wsoc-benefit-outcome">{card.title}</h3>
                <span className="wsoc-benefit-mechanism">{card.mechanism}</span>
                <div className="wsoc-benefit-body">
                  {card.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {showGlosses ? (
                  <dl className="wsoc-benefit-glosses">
                    {data.glosses.map((gloss) => (
                      <div key={gloss.term} className="wsoc-benefit-gloss">
                        <dt>{gloss.term}</dt>
                        <dd>{gloss.definition}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
