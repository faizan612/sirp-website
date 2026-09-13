'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CTA_DATA, INTEGRATIONS_DATA } from '@/lib/constants/saads-home'
import './CtaSection.css'
import './IntegrationsSection.css'

/* ─── Types ──────────────────────────────────────────────── */
interface CtaBtn {
  label: string
  href:  string
}

interface CtaData {
  heading:       string
  headingItalic: string
  primaryBtn:    CtaBtn
  secondaryBtn:  CtaBtn
}

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
  logos:         readonly Logo[]
}

interface CtaSectionProps {
  data?:             CtaData
  integrationsData?: IntegrationsData
  showIntegrations?: boolean
  subtext?:          string
}

/* ─── Component ──────────────────────────────────────── */
export function CtaSection({
  data             = CTA_DATA,
  integrationsData = INTEGRATIONS_DATA,
  showIntegrations = true,
  subtext,
}: CtaSectionProps) {
  const { primaryBtn, secondaryBtn } = data
  const { pill, heading, headingItalic, headingSuffix, description, logos } = integrationsData

  const doubled = [...logos, ...logos]

  return (
    <section className={`bg-[#121218] relative ${showIntegrations ? 'overflow-hidden' : ''}`}>


      {/* ── Integrations heading + logo strip (home page only) ── */}
      {showIntegrations && (
        <>
          <div className="container-sirp relative z-[10] pt-[54px] md:pt-[100px]">
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

          <div className="integrations-strip pb-10 relative z-[10]">
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
        </>
      )}

      {/* ── Dome + CTA area ── */}
      <div className="relative flex flex-col items-center min-h-[520px] sm:min-h-[580px] md:min-h-[700px] pb-20">

        {/* Dome layers */}
        <div className="cta-dome-layers" aria-hidden="true">
          <div className="cta-glow" />
          <div className="cta-dome" />
        </div>

        {/* White outline arc */}
        <div className="cta-dome-outline">
          <Image
            src="/images/whiteoutlinedom.svg"
            alt=""
            width={859}
            height={217}
            unoptimized
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="cta-content relative z-[3] text-center px-4"
          style={{ paddingTop: 'clamp(60px, 12vw, 160px)' }}
        >
          <h2
            className="text-white text-center"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
              fontWeight: 500,
              lineHeight: '120%',
            }}
          >
            Watch your<br />
            Autonomous SOC<br />
            drive <em>itself</em>
          </h2>

          <div className="flex items-center justify-center gap-3 mt-8 md:mt-10">
            <Link
              href={primaryBtn.href}
              className="inline-flex items-center bg-[#8e2dff] text-white px-5 py-3 md:px-8 md:py-3.5 rounded-full font-sans font-medium text-sm md:text-base hover:bg-[#a855f7] transition-all duration-200 no-underline whitespace-nowrap"
            >
              {primaryBtn.label}
            </Link>
            <Link
              href={secondaryBtn.href}
              className="inline-flex items-center border border-white/30 text-white px-5 py-3 md:px-8 md:py-3.5 rounded-full font-sans font-medium text-sm md:text-base hover:bg-white/10 hover:border-white/50 transition-all duration-200 no-underline bg-white/5 whitespace-nowrap"
            >
              {secondaryBtn.label}
            </Link>
          </div>

          {subtext && (
            <p
              className="text-white/40 text-center mx-auto mt-10"
              style={{ fontSize: '13px', lineHeight: '1.6', maxWidth: '480px' }}
            >
              {subtext}
            </p>
          )}

        </motion.div>
      </div>

    </section>
  )
}
