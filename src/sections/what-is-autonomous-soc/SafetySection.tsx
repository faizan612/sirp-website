'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { Eyebrow } from './Eyebrow'
import './SafetySection.css'

export type SafetyData = {
  eyebrow: string
  heading: { line1: string; line2: string }
  paragraphs: readonly string[]
  points: readonly string[]
  closingLines: readonly string[]
}

type SafetySectionProps = {
  data: SafetyData
}

/**
 * S8 — the trust block. Distinct surface (bordered "vault" panel with a subtle
 * shield motif, no padlock clip-art) so security buyers find it on a scan.
 * Lists the governance controls and emphasizes that governed autonomy is safer
 * than manual response under fatigue.
 */
export function SafetySection({ data }: SafetySectionProps) {
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
    <section className="wsoc-safety" aria-labelledby="wsoc-safety-eyebrow">
      <div className="container-sirp">
        <motion.div {...reveal()} className="wsoc-safety-panel">
          {/* Subtle shield motif (decorative) */}
          <ShieldCheck className="wsoc-safety-motif" aria-hidden="true" strokeWidth={1} />

          <div className="wsoc-safety-head">
            <Eyebrow id="wsoc-safety-eyebrow">{data.eyebrow}</Eyebrow>
            <h2 className="wsoc-safety-heading">
              {data.heading.line1} {data.heading.line2}
            </h2>
            <div className="wsoc-safety-intro">
              {data.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <ul className="wsoc-safety-points">
            {data.points.map((point, index) => (
              <motion.li key={point} {...reveal(index * 0.06)} className="wsoc-safety-point">
                <ShieldCheck size={18} strokeWidth={2} aria-hidden="true" />
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>

          <div className="wsoc-safety-closing">
            <p className="wsoc-safety-closing-muted">{data.closingLines[0]}</p>
            <p className="wsoc-safety-closing-accent">{data.closingLines[1]}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
