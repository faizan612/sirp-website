'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { INTEGRATIONS_PAGE_DATA } from '@/lib/constants/integrations'

/* ─── Hero ───────────────────────────────────────────────── *
 * Static, CSS-only treatment (no media asset). The argument is breadth
 * feeding reasoning, not automation. */
export function IntegrationsHero() {
  const { eyebrow, heading, headingItalic, subhead, primaryCta, secondaryCta } =
    INTEGRATIONS_PAGE_DATA.hero
  const reduce = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24"
      style={{ background: 'linear-gradient(rgb(37, 37, 52) 0%, rgb(18, 18, 24) 60%)' }}
    >
      <div className="container-sirp relative z-[1]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[820px]"
        >
          <span className="inline-flex items-center font-mono text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-md border border-[#8e2dff] text-white bg-[rgba(142,45,255,0.25)]">
            {eyebrow}
          </span>

          <h1
            className="font-sans font-bold text-white mt-5"
            style={{
              fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
              lineHeight: '1.05',
              letterSpacing: '-0.03em',
              textWrap: 'balance',
            }}
          >
            {heading} <em>{headingItalic}</em>
          </h1>

          <p className="font-sans text-white/70 text-base md:text-lg leading-[1.7] mt-6 max-w-[640px]">
            {subhead}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center bg-[#8e2dff] text-white px-6 py-3 md:px-7 md:py-3.5 rounded-full font-sans font-medium text-sm md:text-base hover:bg-[#a855f7] transition-colors duration-200 no-underline"
            >
              {primaryCta.label}
            </Link>
            <a
              href={secondaryCta.href}
              className="inline-flex items-center border border-white/30 text-white px-6 py-3 md:px-7 md:py-3.5 rounded-full font-sans font-medium text-sm md:text-base bg-white/5 hover:bg-white/10 hover:border-white/50 transition-colors duration-200 no-underline"
            >
              {secondaryCta.label}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
