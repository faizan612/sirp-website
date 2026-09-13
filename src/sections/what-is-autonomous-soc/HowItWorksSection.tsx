'use client'

import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Eyebrow } from './Eyebrow'
import './HowItWorksSection.css'

type LoopStage = {
  token: string
  verb: string
  generic: string
  sirp: {
    title: string
    description: string
  }
}

export type HowItWorksData = {
  eyebrow: string
  layer1Label: string
  layer2Label: string
  stages: readonly LoopStage[]
}

type HowItWorksSectionProps = {
  heading: string
  intro: string
  data: HowItWorksData
}

/**
 * S4 — two layers. Layer 1: the vendor-neutral category loop (generic verb +
 * plain one-liner, no product names) as a horizontal flow on desktop / vertical
 * on mobile, with muted-purple connectors. Layer 2: the SIRP mapping beneath,
 * reusing the existing step copy. Reveal animations gated by reduced-motion.
 */
export function HowItWorksSection({ heading, intro, data }: HowItWorksSectionProps) {
  const reduce = useReducedMotion()
  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.45, delay },
        }

  return (
    <section className="wsoc-how" aria-labelledby="wsoc-how-eyebrow">
      <div className="container-sirp wsoc-how-inner">
        <motion.div {...reveal()} className="wsoc-how-head">
          <Eyebrow id="wsoc-how-eyebrow">{data.eyebrow}</Eyebrow>
          <h2 className="wsoc-how-heading">{heading}</h2>
          <p className="wsoc-how-intro">{intro}</p>
        </motion.div>

        {/* ── Layer 1: vendor-neutral loop ─────────────────────── */}
        <p className="wsoc-how-layer-label">{data.layer1Label}</p>
        <div className="wsoc-loop-flow" role="list">
          {data.stages.map((stage, index) => (
            <Fragment key={stage.token}>
              {index > 0 ? <span className="wsoc-loop-connector" aria-hidden="true" /> : null}
              <motion.div
                {...reveal(index * 0.05)}
                role="listitem"
                className="wsoc-loop-node"
              >
                <span className="wsoc-loop-token">{stage.token}</span>
                <span className="wsoc-loop-verb">{stage.verb}</span>
                <span className="wsoc-loop-generic">{stage.generic}</span>
              </motion.div>
            </Fragment>
          ))}
        </div>

        {/* ── Layer 2: SIRP mapping ────────────────────────────── */}
        <p className="wsoc-how-layer-label wsoc-how-layer-label--mapping">{data.layer2Label}</p>
        <div className="wsoc-map-grid">
          {data.stages.map((stage, index) => (
            <motion.article key={stage.token} {...reveal(index * 0.04)} className="wsoc-map-row">
              <div className="wsoc-map-stage">
                <span className="wsoc-map-token">{stage.token}</span>
                <span className="wsoc-map-verb">{stage.verb}</span>
              </div>
              <div className="wsoc-map-detail">
                <h3 className="wsoc-map-title">{stage.sirp.title}</h3>
                <p className="wsoc-map-description">{stage.sirp.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
