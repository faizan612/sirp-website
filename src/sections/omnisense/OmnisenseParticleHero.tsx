'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { OMNISENSE_PAGE_DATA } from '@/lib/constants'

const HERO_ENTER = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1] as const,
}

function LearnMoreArrowIcon() {
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

export function OmnisenseParticleHero() {
  const { eyebrow, headline, body, primaryCta, secondaryCta } = OMNISENSE_PAGE_DATA.particleHero

  return (
    <section
      className="relative isolate flex flex-col justify-center overflow-hidden bg-hero-surface"
      style={{ minHeight: 'calc(100dvh - 72px)' }}
    >
      {/* Noise texture — flat dark surface, matches the home hero. */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      <div className="container-sirp relative z-10 py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-[820px] flex-col items-center gap-10 text-center md:gap-14">

          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...HERO_ENTER, delay: 0 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#323232] bg-[#0E0E0E] px-3 py-1.5"
            >
              <span className="font-sans text-sm text-white">{eyebrow}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...HERO_ENTER, delay: 0.02 }}
              className="font-sans font-semibold text-white"
              style={{
                fontSize: 'clamp(1.78rem, 4vw, 3.12rem)',
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                textWrap: 'balance',
              }}
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...HERO_ENTER, delay: 0.03 }}
              className="font-sans text-base leading-[1.65] text-[#b0b0b0] md:text-lg"
            >
              {body}
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
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white py-3 pl-6 pr-5 shadow-[0px_2px_16px_0px_rgba(255,255,255,0.35)] transition-shadow duration-300 hover:shadow-[0px_2px_24px_0px_rgba(255,255,255,0.55)]"
            >
              <span className="font-medium text-base text-black">{primaryCta.label}</span>
              <LearnMoreArrowIcon />
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

        <div className="relative mx-auto mt-16 max-w-6xl px-6">
          <div
            className="relative overflow-hidden rounded-xl border border-white/10"
            style={{
              boxShadow: '0 0 120px rgba(142,45,255,0.15), 0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <Image
              src="/images/omnisense-workbench-execution.webp"
              alt="OmniSense Workbench: agent execution graph showing an 11-step investigation completed in 78 seconds"
              width={2274}
              height={720}
              sizes="(max-width: 768px) 100vw, 1152px"
              className="block h-auto w-full"
              priority
            />
            {/* Fade into hero background */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.65))',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
