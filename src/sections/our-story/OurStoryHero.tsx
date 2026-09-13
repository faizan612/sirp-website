'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ourStoryHero } from '@/content/our-story/story'

const HERO_ENTER = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1] as const,
}

export function OurStoryHero() {
  const { eyebrow, headlineSetup, headlinePayoff, subhead, primaryCta, secondaryCta } = ourStoryHero

  return (
    <section
      className="relative isolate flex flex-col items-center justify-center overflow-hidden bg-hero-surface text-center"
      style={{ minHeight: '90dvh' }}
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* SIRP mark watermark, centered behind the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        style={{ width: 'min(60vw, 620px)' }}
      >
        <Image
          src="/images/logos/sirp_favicon.svg"
          alt=""
          width={482}
          height={690}
          className="h-auto w-full"
          priority
        />
      </div>

      <div className="container-sirp relative z-10 flex flex-col items-center gap-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...HERO_ENTER, delay: 0 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#323232] bg-[#0E0E0E] px-3 py-1.5"
        >
          <span className="font-sans text-sm text-white">{eyebrow}</span>
        </motion.div>

        <div className="flex max-w-3xl flex-col items-center gap-5">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...HERO_ENTER, delay: 0.02 }}
            className="flex flex-col font-sans font-semibold text-white"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ display: 'block', textWrap: 'balance' }}>{headlineSetup}</span>
            <span style={{ display: 'block', textWrap: 'balance' }}>{headlinePayoff}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...HERO_ENTER, delay: 0.03 }}
            className="max-w-xl font-sans text-base leading-[1.5] text-[#b0b0b0] md:text-lg"
          >
            {subhead}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...HERO_ENTER, delay: 0.04 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={primaryCta.href}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white py-3 pl-6 pr-6 shadow-[0px_2px_16px_0px_rgba(255,255,255,0.35)] transition-shadow duration-300 hover:shadow-[0px_2px_24px_0px_rgba(255,255,255,0.55)]"
          >
            <span className="font-medium text-base text-black">{primaryCta.label}</span>
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-[-10px] left-1/2 h-3/5 w-3/5 -translate-x-1/2 scale-75 rounded-full opacity-0 blur-[25px] transition-[opacity,transform] duration-300 group-hover:scale-125 group-hover:opacity-100"
              style={{ backgroundColor: 'rgb(184, 137, 255)' }}
            />
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center rounded-2xl border border-[#323232] bg-[#0E0E0E] px-6 py-3 font-medium text-base text-white transition-colors duration-200 hover:border-white/40"
          >
            {secondaryCta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
