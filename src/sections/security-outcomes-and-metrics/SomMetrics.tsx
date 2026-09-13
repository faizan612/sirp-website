'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MetricRail } from '@/components/omnisense/MetricRail'
import { SOM_METRICS } from '@/lib/constants/security-outcomes-and-metrics'

/* The four "deeper numbers" used to be four isolated cards with no visual
 * relationship — now one connected rail, since the argument two sections
 * later (GovernancePipeline) is that these numbers move together because
 * they're downstream of one architectural decision, not four separate ones. */
export function SomMetrics() {
  const { heading, subtext, items } = SOM_METRICS
  const reduce = useReducedMotion()

  return (
    <section className="bg-[#121218] py-16 md:py-[100px] overflow-hidden">
      <div className="container-sirp">

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="esoc-section-heading text-white font-sans font-medium mb-4">{heading}</h2>
          <p className="esoc-section-subtext mx-auto font-sans text-white/60">{subtext}</p>
        </motion.div>

        <MetricRail
          points={items.map((item) => ({ value: item.value, label: item.badge, detail: item.sub }))}
        />

      </div>
    </section>
  )
}
