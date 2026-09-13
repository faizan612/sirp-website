'use client'

import { motion } from 'framer-motion'
import { INTELLIGENCE_DATA } from '@/lib/constants'

/* ─── Types ──────────────────────────────────────────────── */
interface IntelligenceData {
  heading:     string
  description: string
  videoSrc:    string
}

interface IntelligenceSectionProps {
  data?: IntelligenceData
}

/* ─── Component ──────────────────────────────────────────── */
export function IntelligenceSection({ data = INTELLIGENCE_DATA }: IntelligenceSectionProps) {
  const { heading, description } = data

  return (
    <section className="bg-hero-surface py-16 md:py-[100px] overflow-hidden">
      <div className="container-sirp">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2
            className="mb-6 font-sans font-medium text-white"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
            }}
          >
            {heading}
          </h2>
          <p className="font-sans text-base leading-[1.65] text-text-muted max-w-[620px] mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Intelligence dashboard preview — framed as a live app viewport */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[22px]"
          style={{
            border: '1px solid rgba(255,255,255,0.07)',
            backgroundColor: '#141414',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* App-style header */}
          <div
            className="flex items-center gap-2 border-b px-4"
            style={{ height: '44px', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ddc84] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3ddc84]" />
            </span>
            <span className="font-sans text-[13px] font-medium tracking-tight text-white/90">
              OmniSense
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#3ddc84]/80">
              Live
            </span>
          </div>

          {/* Canvas */}
          <div className="relative aspect-[1826/856] bg-black">
            {/* Ambient purple light behind the center */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(142,45,255,0.07) 0%, transparent 70%)',
              }}
            />
            <video
              src="/images/Widget Animation.mp4"
              className="absolute inset-0 h-full w-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
