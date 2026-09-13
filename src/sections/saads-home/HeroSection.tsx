'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/shared/Button'
import { HERO_DATA } from '@/lib/constants/saads-home'

/* ─── Types ──────────────────────────────────────────────── */
interface HeroBtn {
  label: string
  href: string
}

interface HeroData {
  heading: string
  subheading: string
  primaryBtn: HeroBtn
  secondaryBtn: HeroBtn
  proofLine?: string
  videoSrc: string
}

interface HeroSectionProps {
  data?: HeroData
}

/* ─── Component ──────────────────────────────────────────── *
 * Two stacked regions in normal flow:
 *   1. A near-full-viewport stage holding the video. On load the video
 *      plays alone — it is the hero. The title fades in after a short
 *      beat, or immediately if the user scrolls first.
 *   2. The supporting copy (subhead, CTAs, proof) begins just under the
 *      video on the shared canvas, revealed as you scroll. */
export function HeroSection({ data = HERO_DATA }: HeroSectionProps) {
  const { subheading, primaryBtn, secondaryBtn, proofLine, videoSrc } = data

  /* Let the video play solo, then reveal the title — whichever comes
     first: the timer elapsing or the user scrolling. */
  const [showTitle, setShowTitle] = useState(false)

  useEffect(() => {
    const reveal = () => setShowTitle(true)
    const timer = window.setTimeout(reveal, 2500)
    const onScroll = () => {
      if (window.scrollY > 0) reveal()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section className="relative bg-[#121218] overflow-hidden">

      {/* ── Stage: video fills the viewport, title anchored to the bottom ── */}
      <div className="relative flex flex-col justify-end min-h-[92svh] overflow-hidden">

        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        >
          <source src={videoSrc} type="video/webm" />
        </video>

        {/* Bottom mask — dissolve the video into the canvas so the stage
            and the copy below share one background with no seam. */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-[1]"
          style={{ background: 'linear-gradient(rgba(18,18,24,0) 0%, #121218 92%)' }}
        />

        {/* Eyebrow + title, anchored to the bottom of the stage */}
        <div className="relative z-[2] flex flex-col gap-6 px-5 pb-12 sm:px-10 md:px-14 md:pb-16 lg:pl-[200px] lg:pr-0 lg:pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={showTitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="font-sans font-bold text-white whitespace-nowrap"
            style={{
              // Width-driven so the 26-char title holds one line at every
              // breakpoint: scales down to fit a 375px phone, caps slightly
              // larger than before (was max 4.5rem) on wide screens.
              fontSize: 'clamp(1.5rem, 7vw, 5rem)',
              lineHeight: '1.08',
              letterSpacing: '-0.03em',
            }}
          >
            The SOC that <em>drives&nbsp;itself</em>.
          </motion.h1>
        </div>
      </div>

      {/* ── Supporting copy, in normal flow just below the video ── */}
      <div className="relative z-[2] flex flex-col gap-8 px-5 pb-20 pt-2 sm:px-10 md:px-14 lg:pl-[200px] lg:pr-0 lg:gap-10 lg:pb-28">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans font-medium text-base md:text-xl leading-relaxed text-white"
          style={{ maxWidth: '740px' }}
        >
          {subheading}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <Button href={primaryBtn.href}>
            {primaryBtn.label}
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button href={secondaryBtn.href} variant="secondary">
            {secondaryBtn.label}
          </Button>
        </motion.div>

        {/* Proof strip — TODO: replace with customer logos when available. */}
        {proofLine && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-white/45"
            style={{ maxWidth: '560px' }}
          >
            {proofLine}
          </motion.p>
        )}

      </div>
    </section>
  )
}
