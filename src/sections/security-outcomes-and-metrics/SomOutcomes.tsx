'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MagicBento, type BentoCardData } from '@/components/ui/MagicBento'
import { SocComparisonScroll } from '@/components/omnisense/SocComparisonScroll'
import { SOM_OUTCOMES, SOM_SOC_COMPARISON } from '@/lib/constants/security-outcomes-and-metrics'
import './SomOutcomes.css'

/* The Human-SOC-vs-Autonomous-SOC comparison used to be a small static
 * image buried inside one bento tile — the best asset on the page, most
 * under-used. It's now the lead content of the section: a scroll-driven
 * side-by-side (SocComparisonScroll) rather than a disconnected slider, so
 * the speed gap is felt while scrolling. The four outcome cards below stay
 * as supporting evidence, all evenly sized (2x2) rather than co-equal with it. */
export function SomOutcomes() {
  const { heading, items } = SOM_OUTCOMES
  const reduce = useReducedMotion()

  const cards: BentoCardData[] = items.map(item => ({
    id: item.id,
    span: 'sm',
    title: item.title,
    label: item.label,
    description: item.description,
  }))

  return (
    <section
      className="py-16 md:py-[100px]"
      style={{ background: 'linear-gradient(#121218 47%, #252534 100%)' }}
    >
      <div className="container-sirp">

        {/* Heading */}
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="esoc-section-heading text-white text-center font-sans font-medium mb-8 md:mb-12"
        >
          {heading}
        </motion.h2>

        {/* Lead content — the scroll-synced comparison. Not wrapped in a
         * whileInView reveal like the rest of the page: it's a ~4-viewport
         * pinned region, not a card that fades in on entry. */}
        <div className="mb-14 flex justify-center md:mb-20">
          <SocComparisonScroll human={SOM_SOC_COMPARISON.human} autonomous={SOM_SOC_COMPARISON.autonomous} />
        </div>

        {/* Supporting evidence — the four outcomes, evenly weighted, 2x2 */}
        <MagicBento cards={cards} className="som-outcomes-bento" />

      </div>
    </section>
  )
}
