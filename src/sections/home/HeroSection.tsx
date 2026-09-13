'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { hero } from '@/content/home/hero'

/* ─── Types ──────────────────────────────────────────────── */
interface HeroSectionProps {
  data?: typeof hero
}

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

/* ─── Component ──────────────────────────────────────────── */
export function HeroSection({ data = hero }: HeroSectionProps) {
  const { eyebrow, headlineSetup, headlinePayoff, subhead, primaryCta, secondaryCta } = data

  return (
    <section
      className="relative isolate flex flex-col justify-center overflow-hidden bg-hero-surface"
      style={{ minHeight: '100dvh' }}
    >
      {/* Noise texture — flat dark surface, not a gradient glow. */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Content */}
      <div className="container-sirp relative z-10 py-24 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 min-[900px]:grid-cols-[1.05fr_1fr] md:gap-16">

          {/* Left column — copy */}
          <div className="flex w-full max-w-[680px] flex-col items-start gap-10 md:gap-14">

            <div className="flex flex-col items-start gap-4">
              {/* Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...HERO_ENTER, delay: 0 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#323232] bg-[#0E0E0E] px-3 py-1.5"
              >
                <span className="font-sans text-sm text-white">{eyebrow}</span>
              </motion.div>

              {/* Heading + subheading */}
              <div className="flex flex-col items-start gap-4 md:gap-5">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...HERO_ENTER, delay: 0.02 }}
                  className="flex flex-col font-sans font-semibold text-white"
                  style={{
                    fontSize: 'clamp(1.78rem, 4vw, 3.12rem)',
                    lineHeight: '1.15',
                    letterSpacing: '-0.02em',
                    gap: '0px',
                  }}
                >
                  <span style={{ display: 'block', textWrap: 'balance' }}>{headlineSetup}</span>
                  <span style={{ display: 'block', textWrap: 'balance' }}>{headlinePayoff}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...HERO_ENTER, delay: 0.03 }}
                  className="font-sans text-base leading-[1.3] text-[#b0b0b0] md:text-lg"
                >
                  {subhead}
                </motion.p>
              </div>
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...HERO_ENTER, delay: 0.04 }}
              className="flex flex-wrap items-center gap-4"
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

          {/* Right column — custom hero animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...HERO_ENTER, delay: 0.05 }}
            className="relative w-full aspect-[1200/1640] max-w-[520px] mx-auto min-[900px]:mx-0"
          >
            <Image
              src="/images/hero/hero-video.gif"
              alt=""
              fill
              priority
              style={{ objectFit: 'contain' }}
              unoptimized
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
