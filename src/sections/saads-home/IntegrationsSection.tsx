'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { INTEGRATIONS_DATA } from '@/lib/constants/saads-home'
import './IntegrationsSection.css'

/* ─── Types ──────────────────────────────────────────────── */
interface Logo {
  name: string
  src:  string
}

interface IntegrationsData {
  pill:          string
  heading:       string
  headingItalic: string
  headingSuffix: string
  description:   string
  ctaHref?:      string
  logos:         readonly Logo[]
}

interface IntegrationsSectionProps {
  data?: IntegrationsData
}

/* ─── Component ──────────────────────────────────────────── */
export function IntegrationsSection({ data = INTEGRATIONS_DATA }: IntegrationsSectionProps) {
  const {
    pill,
    heading,
    headingItalic,
    headingSuffix,
    description,
    ctaHref,
    logos,
  } = data

  const doubled = [...logos, ...logos]

  return (
    <section
      className="bg-[#121218] pt-[54px] md:pt-[100px] relative z-[20]"
    >
      {/* Top gradient overlay — purely decorative transition from section above */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none z-0"
        style={{
          height: '220px',
          background: 'linear-gradient(rgb(37, 37, 52) 0%, rgba(18, 18, 24, 0) 100%)',
        }}
      />
      <div className="container-sirp relative z-[1]">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-20"
        >
          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-md border border-[#8e2dff] text-white bg-[rgba(142,45,255,0.25)]">
            {pill}
          </span>
          <h2
            className="font-sans font-bold text-white mt-4 mb-4"
            style={{
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
            }}
          >
            {heading}{' '}
            <em>{headingItalic}</em>{' '}
            {headingSuffix}
          </h2>
          <p className="font-sans text-white/70 text-base md:text-lg leading-[1.7] max-w-[680px] mx-auto">
            {description}
          </p>
        </motion.div>

      </div>

      {/* Logo strip — full width */}
      <div className="integrations-strip pb-20 relative z-[10]">
        <div className="integrations-track">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="w-[88px] h-[88px] rounded-[18px] bg-[#1a1a26] border border-[#3a3a4c] flex items-center justify-center flex-shrink-0 p-3 hover:border-[#8e2dff] transition-colors duration-200 overflow-hidden"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const t = e.target as HTMLImageElement
                  t.style.display = 'none'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA — never show the count with no destination. */}
      {ctaHref && (
        <div className="container-sirp relative z-[10] flex justify-center pb-20">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 font-sans font-medium text-white text-base no-underline hover:gap-3 transition-all duration-200"
          >
            View all integrations
            <ArrowRight className="w-4 h-4 text-[#8e2dff]" />
          </Link>
        </div>
      )}

    </section>
  )
}
