'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PurplePill } from '@/components/shared/PurplePill'
import { ENTERPRISE_SOC_HERO } from '@/lib/constants/enterprise-soc'

export function EnterpriseSocHero() {
  const { badge, heading, description, cta } = ENTERPRISE_SOC_HERO

  return (
    <section className="bg-[#121218] pt-[132px] pb-16 md:pt-[148px] md:pb-24 overflow-hidden relative">

      <div className="container-sirp relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-10 lg:gap-16 lg:items-center">

          {/* Left — badge + heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <div className="mb-5 lg:mb-7">
              <PurplePill className="rounded-lg">{badge}</PurplePill>
            </div>
            <h1 className="esoc-hero-heading font-sans font-bold text-white">
              {heading.prefix}
              <em>{heading.italic}</em>
              {heading.suffix}
            </h1>
          </motion.div>

          {/* Right — description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-7"
          >
            <p className="esoc-hero-desc font-sans text-white">
              {description}
            </p>
            <div>
              <Link
                href={cta.href}
                className="inline-flex items-center bg-[#8e2dff] text-white px-7 py-3.5 rounded-full font-sans font-medium text-sm hover:bg-[#a855f7] transition-all duration-200 no-underline shadow-[0_0_24px_rgba(142,45,255,0.4)]"
              >
                {cta.label}
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
