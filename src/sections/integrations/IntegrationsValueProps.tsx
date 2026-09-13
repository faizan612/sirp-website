'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { INTEGRATIONS_PAGE_DATA } from '@/lib/constants/integrations'

/* ─── Value props ────────────────────────────────────────── *
 * Three flat columns. Argument: breadth of connection feeds the
 * reasoning layer, not "automate everything". */
export function IntegrationsValueProps() {
  const props = INTEGRATIONS_PAGE_DATA.valueProps
  const reduce = useReducedMotion()

  return (
    <section className="bg-[#121218] py-12 md:py-16 border-t border-[#3a3a4d]/40">
      <div className="container-sirp">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {props.map((p, i) => (
            <motion.div
              key={p.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.08 }}
              className="rounded-[16px] border border-[#3a3a4d] bg-[#1a1a26] p-6 md:p-7"
            >
              <h2 className="font-sans font-semibold text-white text-lg md:text-xl mb-3">
                {p.title}
              </h2>
              <p className="font-sans text-white/70 text-[15px] leading-[1.65]">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
