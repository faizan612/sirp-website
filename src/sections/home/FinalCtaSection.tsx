'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FINAL_CTA_DATA } from '@/lib/constants/saads-home'
import './CtaSection.css'

/* ─── Types ──────────────────────────────────────────────── */
interface CtaBtn {
  label: string
  href: string
}

interface FinalCtaData {
  heading: string
  headingItalic: string
  headingSuffix: string
  body: string
  primaryBtn: CtaBtn
  secondaryBtn: CtaBtn
}

interface FinalCtaSectionProps {
  data?: FinalCtaData
}

/* ─── Component ──────────────────────────────────────────── *
 * Closing CTA. The secondary CTA exists for the visitor who is
 * interested but not demo-ready, so they leave as a lead, not a bounce. */
export function FinalCtaSection({ data = FINAL_CTA_DATA }: FinalCtaSectionProps) {
  const { heading, headingItalic, headingSuffix, body, primaryBtn, secondaryBtn } = data

  return (
    <section className="bg-[#121218] relative overflow-hidden">
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
            {heading} <em>{headingItalic}</em> {headingSuffix}
          </h2>

          <p
            className="text-white/60 text-center mx-auto mt-5 font-sans"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.125rem)', maxWidth: '440px' }}
          >
            {body}
          </p>

          <div className="flex items-center justify-center gap-3 mt-8 md:mt-10 flex-wrap">
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
        </motion.div>
      </div>
    </section>
  )
}
