'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ENTERPRISE_SOC_THREAT } from '@/lib/constants/enterprise-soc'
import './EnterpriseSocThreat.css'

const ICON_MAP = {
  bargraph: '/images/enterprise-soc/bargraph.svg',
  search: '/images/enterprise-soc/search.svg',
  quater: '/images/enterprise-soc/quater.svg',
  current: '/images/enterprise-soc/current.svg',
  download: '/images/enterprise-soc/download.svg',
} as const

export function EnterpriseSocThreat() {
  const { heading, steps } = ENTERPRISE_SOC_THREAT

  return (
    <section className="bg-[#121218] overflow-x-hidden pt-8 md:pt-12 pb-6 md:pb-10">

      {/* ── Centered heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center px-4"
      >
        <h2
          className="esoc-threat-heading text-white mx-auto max-w-[780px]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 500,
          }}
        >
          {heading}
        </h2>
      </motion.div>

      {/* ── Steps bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="threat-steps"
      >
        {steps.map((step, i) => (
          <div key={step.id} className="threat-steps__item">
            {i > 0 && <span className="threat-steps__sep" aria-hidden="true" />}
            <Image
              src={ICON_MAP[step.icon]}
              alt=""
              width={15}
              height={15}
              unoptimized
              className="opacity-60"
            />
            <span>{step.label}</span>
          </div>
        ))}
      </motion.div>

    </section>
  )
}
