'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GovernancePipeline } from '@/components/omnisense/GovernancePipeline'
import { SOM_WHY } from '@/lib/constants/security-outcomes-and-metrics'
import './SomMetricsWhy.css'

export function SomMetricsWhy() {
  const { heading, subtext, stages, keyDifferenceTitle, keyDifferenceBody } = SOM_WHY
  const reduce = useReducedMotion()

  const stations = stages.map((stage) => ({
    key: stage.id,
    label: stage.label,
    copy: stage.body,
    outcomes: stage.id === 'governor' ? ['Close', 'Escalate', 'Return to Planner'] : undefined,
  }))

  return (
    <section className="bg-[#121218] py-16 md:py-[100px]">
      <div className="container-sirp">

        {/* Heading */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="esoc-section-heading text-white font-sans font-medium mb-5">
            {heading}
          </h2>
          <p className="esoc-section-subtext mx-auto font-sans font-semibold text-white">
            {subtext}
          </p>
        </motion.div>

        {/* The Planner / Gate / Executor / Governor loop — same as /omnisense,
            now rendered as a live pipeline instead of four static cards. */}
        <GovernancePipeline stations={stations} />

        {/* Key difference — stays, now visually subordinate to the pipeline */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.2 }}
          className="som-mwhy-key mt-14"
        >
          <h3 className="som-mwhy-key-title">{keyDifferenceTitle}</h3>
          <p className="som-mwhy-key-body">{keyDifferenceBody}</p>
        </motion.div>

      </div>
    </section>
  )
}
