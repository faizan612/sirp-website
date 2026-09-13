'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Eyebrow } from './Eyebrow'
import './AssistiveVsAutonomousDivider.css'

type DividerState = {
  label: string
  statement: string
}

export type AssistiveVsAutonomousDividerData = {
  eyebrow: string
  assistive: DividerState
  autonomous: DividerState
}

type AssistiveVsAutonomousDividerProps = {
  data: AssistiveVsAutonomousDividerData
}

/**
 * S5 — the page's one "loud" moment. Full-width band placing the two states
 * in visual opposition: assistive (muted, recedes) → autonomous (accent,
 * active). Built to be screenshotted. Copy is the How-it-works notes verbatim.
 */
export function AssistiveVsAutonomousDivider({ data }: AssistiveVsAutonomousDividerProps) {
  const reduce = useReducedMotion()
  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay },
        }

  return (
    <section className="wsoc-divider" aria-labelledby="wsoc-divider-eyebrow">
      <div className="wsoc-divider-glow" aria-hidden="true" />
      <div className="container-sirp wsoc-divider-inner">
        <Eyebrow id="wsoc-divider-eyebrow" className="wsoc-divider-eyebrow">
          {data.eyebrow}
        </Eyebrow>

        <div className="wsoc-divider-grid">
          <motion.div {...reveal(0)} className="wsoc-divider-panel wsoc-divider-panel--assistive">
            <span className="wsoc-divider-label">{data.assistive.label}</span>
            <p className="wsoc-divider-statement">{data.assistive.statement}</p>
          </motion.div>

          <div className="wsoc-divider-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 12h15m0 0-6-6m6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <motion.div {...reveal(0.12)} className="wsoc-divider-panel wsoc-divider-panel--autonomous">
            <span className="wsoc-divider-label">{data.autonomous.label}</span>
            <p className="wsoc-divider-statement">{data.autonomous.statement}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
