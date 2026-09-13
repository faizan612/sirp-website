'use client'

import { motion } from 'framer-motion'
import { INTEGRATIONS_DATA } from '@/lib/constants'
import { LogoLoop } from '@/components/ui/LogoLoop'

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
  logos:         readonly Logo[]
}

interface IntegrationsSectionProps {
  data?: IntegrationsData
  /** @default 'light' */
  variant?: 'light' | 'dark'
}

/* ─── Component ──────────────────────────────────────────── */
export function IntegrationsSection({ data = INTEGRATIONS_DATA, variant = 'light' }: IntegrationsSectionProps) {
  const {
    pill,
    heading,
    headingItalic,
    headingSuffix,
    description,
    logos,
  } = data

  const items = logos.map(logo => ({ src: logo.src, alt: logo.name }))
  const isDark = variant === 'dark'

  return (
    <section className={`${isDark ? 'bg-[#121218]' : 'bg-white'} pt-[54px] md:pt-[100px] relative z-[20]`}>
      <div className="container-sirp">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-20"
        >
          <div
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5"
            style={
              isDark
                ? { borderColor: 'rgba(255,255,255,0.15)', background: '#18181f' }
                : { borderColor: 'rgba(0,0,0,0.1)', background: '#ffffff' }
            }
          >
            <span className="font-sans text-sm" style={{ color: isDark ? '#ffffff' : '#000000' }}>{pill}</span>
          </div>
          <h2
            className="font-sans font-medium mt-6"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              color: isDark ? '#ffffff' : '#000000',
            }}
          >
            {heading}{' '}
            <em>{headingItalic}</em>{' '}
            {headingSuffix}
          </h2>
          <p
            className="mt-6 font-sans text-base leading-[1.65] max-w-[680px] mx-auto"
            style={{ color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.7)' }}
          >
            {description}
          </p>
        </motion.div>

      </div>

      {/* Logo strip — full width */}
      <div className="pb-10 sm:pb-12 md:pb-16 relative z-[10]">
        <LogoLoop
          logos={items}
          speed={40}
          direction="left"
          gap={16}
          fadeOut
          fadeOutColor={isDark ? '#121218' : '#ffffff'}
          ariaLabel="Integrations"
          renderItem={item => {
            const logo = item as { src: string; alt?: string }
            return (
              <div className="w-[60px] h-[60px] md:w-[88px] md:h-[88px] rounded-[12px] md:rounded-[18px] bg-[#1a1a26] border border-[#3a3a4c] flex items-center justify-center flex-shrink-0 p-2 md:p-3 hover:border-[#8e2dff] transition-colors duration-200 overflow-hidden">
                <img
                  src={logo.src}
                  alt={logo.alt ?? ''}
                  className="w-8 h-8 md:w-12 md:h-12 object-contain"
                  onError={e => {
                    const t = e.target as HTMLImageElement
                    t.style.display = 'none'
                  }}
                />
              </div>
            )
          }}
        />
      </div>

    </section>
  )
}
