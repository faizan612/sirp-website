'use client'

import { motion } from 'framer-motion'
import { LoopDiagram } from './LoopDiagram'
import { BODY, EYEBROW, HEADLINE } from '@/content/omnisense/theLoop'
import './loop-section.css'

export function TheLoopSection() {
  return (
    <section className="loop-section py-16 md:py-24">
      <div className="container-sirp">

        {/* Eyebrow + headline + body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="max-w-[720px]"
        >
          <span
            className="font-sans text-sm"
            style={{ color: 'var(--loop-text-muted)' }}
          >
            {EYEBROW}
          </span>
          <h2
            className="font-sans font-medium mt-4 mb-5 text-balance"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              color: 'var(--loop-text-primary)',
            }}
          >
            {HEADLINE}
          </h2>
          <p
            className="font-sans leading-[1.65] text-base md:text-lg max-w-[620px]"
            style={{ color: 'var(--loop-text-secondary)' }}
          >
            {BODY}
          </p>
        </motion.div>

        {/* Diagram — this IS the content; no separate card row below it. */}
        <div className="mt-12 md:mt-14">
          <LoopDiagram />
        </div>

      </div>
    </section>
  )
}
