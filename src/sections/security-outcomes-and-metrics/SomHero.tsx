'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HeroSignal } from '@/components/omnisense/HeroSignal'
import { SOM_HERO } from '@/lib/constants/security-outcomes-and-metrics'

const HERO_ENTER = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 5.54193C7.5 5.54193 13.2819 5.08966 14.0962 5.90386C14.9103 6.71806 14.458 12.5 14.458 12.5M13.75 6.25L5.41667 14.5833"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* Matches the homepage HeroSection: hero-surface background, noise texture
 * (not a purple grid), plain pill badge, and the white/ghost CTA pair —
 * same visual language as the rest of the site, not a page-local style. */
export function SomHero() {
  const { eyebrow, heading, subtext, cta, secondaryCta } = SOM_HERO

  return (
    <section className="relative isolate flex flex-col justify-center overflow-hidden bg-hero-surface pt-[148px] pb-20">

      {/* Noise texture — matches homepage hero, not a gradient/grid glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      <div className="container-sirp relative z-10 text-center">

        {/* Badge — plain pill, matches HeroSection/AutonomyGovernanceSection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...HERO_ENTER, delay: 0 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#323232] bg-[#0E0E0E] px-3 py-1.5">
            <span className="font-sans text-sm text-white">{eyebrow}</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...HERO_ENTER, delay: 0.02 }}
          className="mx-auto max-w-[820px] font-sans font-semibold text-white"
          style={{
            fontSize: 'clamp(1.85rem, 4.6vw, 3.5rem)',
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            textWrap: 'balance',
          }}
        >
          {heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...HERO_ENTER, delay: 0.03 }}
          className="mx-auto mt-6 max-w-[500px] font-sans text-base leading-[1.5] text-[#b0b0b0] md:text-lg"
        >
          {subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...HERO_ENTER, delay: 0.04 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={cta.href}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white py-3 pl-6 pr-5 shadow-[0px_2px_16px_0px_rgba(255,255,255,0.35)] transition-shadow duration-300 hover:shadow-[0px_2px_24px_0px_rgba(255,255,255,0.55)] no-underline"
          >
            <span className="font-medium text-base text-black">{cta.label}</span>
            <ArrowIcon />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-[-10px] left-1/2 h-3/5 w-3/5 -translate-x-1/2 scale-75 rounded-full opacity-0 blur-[25px] transition-[opacity,transform] duration-300 group-hover:scale-125 group-hover:opacity-100"
              style={{ backgroundColor: 'rgb(184, 137, 255)' }}
            />
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center rounded-2xl border border-[#323232] bg-[#0E0E0E] px-6 py-3 font-medium text-base text-white transition-colors duration-200 hover:border-white/40 no-underline"
          >
            {secondaryCta.label}
          </Link>
        </motion.div>

      </div>

      {/* Signal trace — lower third, purely atmospheric */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 opacity-80">
        <HeroSignal className="h-full w-full" />
      </div>
    </section>
  )
}
