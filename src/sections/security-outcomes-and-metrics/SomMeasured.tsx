'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { LedgerList } from '@/components/omnisense/LedgerList'
import { SOM_MEASURED } from '@/lib/constants/security-outcomes-and-metrics'

export function SomMeasured() {
  const { label, excluded, items, trustCenterCta } = SOM_MEASURED
  const reduce = useReducedMotion()

  return (
    <section className="bg-[#121218] py-16 md:py-24 lg:pb-[100px]">
      <div className="container-sirp">

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="esoc-section-subtext text-center mb-8 md:mb-12 font-medium text-white"
        >
          {label}
        </motion.p>

        <LedgerList
          rows={items.map((item) => ({ label: item.value, value: item.label }))}
          excluded={excluded.replace(/^Excluded:\s*/, '')}
          methodologyHref={trustCenterCta.href}
        />

      </div>
    </section>
  )
}
