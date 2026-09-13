'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Eyebrow } from './Eyebrow'
import './HumanMachineSection.css'

export type HumanMachineData = {
  eyebrow: string
  heading: { line1: string; line2: string }
  paragraphs: readonly string[]
  analystDefinesLead: string
  analystDefines: readonly string[]
  operationsParagraph: string
  analystFocusLead: string
  analystFocus: readonly string[]
  closingLines: readonly string[]
  differenceLink: { label: string; href: string }
}

type HumanMachineSectionProps = {
  data: HumanMachineData
}

/**
 * S7 — visible guardrails. Two columns: humans set the boundaries (left),
 * the machine operates inside a literal framed guardrail region (right). The
 * "human-on-the-loop, not human-in-the-loop-per-alert" line is emphasized.
 */
export function HumanMachineSection({ data }: HumanMachineSectionProps) {
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

  const [closingBeforeLink = '', closingAfterLink = ''] = data.closingLines[1].split(
    data.differenceLink.label,
  )

  return (
    <section className="bg-[#121218] py-24 wsoc-hm" aria-labelledby="wsoc-hm-eyebrow">
      <div className="container-sirp">
        <motion.div {...reveal()} className="wsoc-hm-head">
          <Eyebrow id="wsoc-hm-eyebrow">{data.eyebrow}</Eyebrow>
          <h2 className="wsoc-hm-heading">
            {data.heading.line1}
            <br />
            {data.heading.line2}
          </h2>
          <div className="wsoc-hm-intro">
            {data.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </motion.div>

        <div className="wsoc-hm-cols">
          {/* Human side — sets the boundaries */}
          <motion.div {...reveal(0.05)} className="wsoc-hm-human">
            <span className="wsoc-hm-side-label">Humans set the boundaries</span>
            <div className="wsoc-hm-list-group">
              <p className="wsoc-hm-list-lead">{data.analystDefinesLead}</p>
              <ul className="wsoc-hm-list">
                {data.analystDefines.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="wsoc-hm-list-group">
              <p className="wsoc-hm-list-lead">{data.analystFocusLead}</p>
              <ul className="wsoc-hm-list">
                {data.analystFocus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Machine side — operates inside the literal guardrail frame */}
          <motion.div {...reveal(0.12)} className="wsoc-hm-machine">
            <span className="wsoc-hm-side-label wsoc-hm-side-label--machine">
              Machine acts within them
            </span>
            <div className="wsoc-hm-guardrail">
              <span className="wsoc-hm-guardrail-tag">Policy guardrail</span>
              <p className="wsoc-hm-guardrail-text">{data.operationsParagraph}</p>
            </div>
          </motion.div>
        </div>

        {/* Human-on-the-loop emphasis */}
        <motion.div {...reveal()} className="wsoc-hm-closing">
          <p className="wsoc-hm-closing-strike">{data.closingLines[0]}</p>
          <p className="wsoc-hm-closing-accent">
            {closingBeforeLink}
            <Link href={data.differenceLink.href} className="wsoc-hm-link">
              {data.differenceLink.label}
            </Link>
            {closingAfterLink}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
