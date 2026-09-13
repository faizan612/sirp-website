'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { DossierCard } from '@/components/omnisense/DossierCard'
import { SOM_AUDIENCE } from '@/lib/constants/security-outcomes-and-metrics'

export function SomAudience() {
  const { badge, items } = SOM_AUDIENCE
  const reduce = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="bg-[#f6f5f8] py-16 md:py-[100px] overflow-hidden">
      <div className="container-sirp">

        {/* Badge */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5">
            <span className="font-sans text-sm text-black">{badge}</span>
          </span>
          <span aria-hidden="true" className="mt-3 h-6 w-px bg-gradient-to-b from-black/20 to-black/0" />
        </motion.div>

        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.1 }}
            >
              <DossierCard
                index={i + 1}
                role={item.role}
                copy={`${item.title}. ${item.description}`}
                isActive={activeIndex === i}
                onSelect={() => setActiveIndex(activeIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
