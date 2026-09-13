'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import './HowAutonomousSocWorksSection.css'

type WorkStep = {
  number: string
  title: string
  description: string
  borderIcon: string
}

type HowAutonomousSocWorksSectionProps = {
  heading: string
  intro: string
  lead: string
  steps: readonly WorkStep[]
  notes: readonly string[]
}

export function HowAutonomousSocWorksSection({
  heading,
  intro,
  lead,
  steps,
  notes,
}: HowAutonomousSocWorksSectionProps) {
  return (
    <section className="how-autonomous-works">
      <div className="container-sirp how-autonomous-works-inner">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="how-autonomous-copy"
        >
          <h2 className="how-autonomous-heading">{heading}</h2>
          <p className="how-autonomous-intro">{intro}</p>
          <p className="how-autonomous-lead">{lead}</p>
        </motion.div>

        <div className="how-autonomous-grid">
          {steps.map((step, index) => (
            <motion.article
              key={`${step.number}-${step.title}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="how-autonomous-card"
            >
              <div className="how-autonomous-number-wrap" aria-hidden="true">
                <Image
                  src={step.borderIcon}
                  alt=""
                  width={40}
                  height={80}
                  className="how-autonomous-number-border"
                  unoptimized
                />
                <span className="how-autonomous-number">{step.number}</span>
              </div>

              <h3 className="how-autonomous-card-title">{step.title}</h3>
              <p className="how-autonomous-card-description">{step.description}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="how-autonomous-notes"
        >
          {notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
