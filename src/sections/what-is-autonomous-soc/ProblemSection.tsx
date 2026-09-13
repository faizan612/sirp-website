'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Eyebrow } from './Eyebrow'
import './ProblemSection.css'

type Pain = {
  label: string
  text: string
}

export type ProblemData = {
  eyebrow: string
  heading: { line1: string; line2: string }
  intro: string
  lead: string
  outro: string
  pains: readonly Pain[]
  curve: {
    caption: string
    linearLabel: string
    leverageLabel: string
    xAxis: string
    yAxis: string
  }
}

type ProblemSectionProps = {
  data: ProblemData
}

/** Linear cost vs leverage curve — inline SVG, accent stroke on the
 *  autonomous (flattening) curve, muted on the traditional (linear) line. */
function CostCurve({ data }: { data: ProblemData['curve'] }) {
  return (
    <figure className="wsoc-curve">
      <svg viewBox="0 0 320 200" role="img" className="wsoc-curve-svg">
        {/* axes */}
        <path d="M40 172 H300" className="wsoc-curve-axis" />
        <path d="M40 172 V20" className="wsoc-curve-axis" />
        {/* traditional: linear, rising */}
        <path d="M40 172 L300 36" className="wsoc-curve-linear" fill="none" />
        {/* autonomous: rises then flattens (leverage) */}
        <path d="M40 172 C 110 112, 180 92, 300 84" className="wsoc-curve-leverage" fill="none" />
        {/* end dots */}
        <circle cx="300" cy="36" r="3.5" className="wsoc-curve-dot-linear" />
        <circle cx="300" cy="84" r="3.5" className="wsoc-curve-dot-leverage" />
        {/* axis labels (mono) */}
        <text x="44" y="16" className="wsoc-curve-axislabel">{data.yAxis}</text>
        <text x="300" y="190" textAnchor="end" className="wsoc-curve-axislabel">{data.xAxis}</text>
      </svg>
      <div className="wsoc-curve-legend">
        <span className="wsoc-curve-legend-item wsoc-curve-legend-item--linear">
          {data.linearLabel}
        </span>
        <span className="wsoc-curve-legend-item wsoc-curve-legend-item--leverage">
          {data.leverageLabel}
        </span>
      </div>
      <figcaption className="wsoc-curve-caption">{data.caption}</figcaption>
    </figure>
  )
}

/**
 * S2 + S3 — the emotional setup. The four pain points become a 2x2 grid with
 * mono category labels (pressure), paired with the cost-curve diagram and the
 * leverage framing line (relief). Copy reuses the existing traditional-models
 * and cost-curve strings.
 */
export function ProblemSection({ data }: ProblemSectionProps) {
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
    <section className="bg-[#121218] py-24 wsoc-problem" aria-labelledby="wsoc-problem-eyebrow">
      <div className="container-sirp">
        <motion.div {...reveal()} className="wsoc-problem-head">
          <Eyebrow id="wsoc-problem-eyebrow">{data.eyebrow}</Eyebrow>
          <h2 className="wsoc-problem-heading">
            {data.heading.line1}
            <br />
            {data.heading.line2}
          </h2>
          <p className="wsoc-problem-intro">{data.intro}</p>
        </motion.div>

        <div className="wsoc-problem-body">
          <div className="wsoc-problem-pains-col">
            <p className="wsoc-problem-lead">{data.lead}</p>
            <div className="wsoc-problem-grid">
              {data.pains.map((pain, index) => (
                <motion.div key={pain.label} {...reveal(index * 0.06)} className="wsoc-pain-card">
                  <span className="wsoc-pain-label">{pain.label}</span>
                  <p className="wsoc-pain-text">{pain.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...reveal(0.1)} className="wsoc-problem-curve-col">
            <CostCurve data={data.curve} />
          </motion.div>
        </div>

        <motion.p {...reveal()} className="wsoc-problem-outro">
          {data.outro}
        </motion.p>
      </div>
    </section>
  )
}
