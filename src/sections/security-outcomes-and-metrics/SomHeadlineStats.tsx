'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { StatGauge } from '@/components/omnisense/StatGauge'
import { STATS_DATA } from '@/lib/constants/home'
import { SOM_HEADLINE_STATS } from '@/lib/constants/security-outcomes-and-metrics'

const GAUGE_META: Record<string, { short: string; caption?: string }> = {
  'reduction in MTTD': { short: 'MTTD ↓', caption: 'Reduction in mean time to detect' },
  'faster MTTR': { short: 'MTTR ↓', caption: 'Reduction in mean time to respond' },
  'resolved autonomously': { short: 'Autonomous ↑', caption: 'Investigations resolved without a human' },
}

export function SomHeadlineStats() {
  const { heading, subtext } = SOM_HEADLINE_STATS
  const { stats } = STATS_DATA
  const reduce = useReducedMotion()

  return (
    <section className="overflow-hidden bg-[#f6f5f8] py-16 md:py-20">
      <div className="container-sirp flex flex-col items-center">

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-[560px] text-center md:mb-12"
        >
          <h2 className="esoc-section-heading font-sans font-medium text-black">{heading}</h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-black/60">{subtext}</p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.1 }}
          className="w-full max-w-[720px] py-6 md:py-8"
        >
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            {stats.map((item) => {
              const meta = GAUGE_META[item.label] ?? { short: item.label, caption: undefined }
              const isPrimary = item.label === 'resolved autonomously'
              return (
                <div
                  key={item.label}
                  className={isPrimary ? 'sm:border-l sm:border-black/10 sm:pl-6' : ''}
                >
                  <StatGauge
                    value={Number(item.value)}
                    label={meta.short}
                    caption={meta.caption}
                    isPrimary={isPrimary}
                  />
                </div>
              )
            })}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
