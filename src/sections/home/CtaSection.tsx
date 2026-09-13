'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PurplePill } from '@/components/shared/PurplePill'
import { CTA_DATA } from '@/lib/constants'
import './CtaSection.css'

/* ─── Exact SVG paths from Framer source ─────────────────────────────────── */
const DOME_PATH    = 'M 532 0 C 238.185 0 0 238.184 0 532 L 1064 532 C 1064 238.185 825.816 0 532 0 Z'
const GLOW_PURPLE  = 'M 275 0 C 123.122 0 0 112.377 0 251 L 550 251 C 550 112.377 426.878 0 275 0 Z'
const GLOW_WHITE   = 'M 312 0 C 139.687 0 0 112.377 0 251 L 624 251 C 624 112.377 484.313 0 312 0 Z'
/* Arc = top-edge stroke of the dome path (open, no fill) */
const ARC_PATH     = 'M 0 532 C 0 238.184 238.185 0 532 0 C 825.816 0 1064 238.185 1064 532'

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface CtaBtn  { label: string; href: string }
interface CtaData { heading?: string; headingItalic?: string; primaryBtn: CtaBtn; secondaryBtn?: CtaBtn }
interface CtaSectionProps {
  data?: CtaData
  /** Override pill text above the heading */
  pill?: ReactNode
  /** Enterprise SOC mobile: omit sparkle so the pill stays thin */
  pillShowSparkle?: boolean
  /** Override heading — accepts JSX so you can mix italic/normal spans */
  heading?: ReactNode
  /** Optional description paragraph shown between heading and buttons */
  description?: string
  /** Optional italic disclaimer text shown below buttons */
  disclaimer?: string
}

/* ─── Reusable inline glow SVGs ──────────────────────────────────────────── */
function PurpleGlow() {
  return (
    <svg viewBox="0 0 550 251" overflow="visible" width="550" height="251" aria-hidden="true">
      <path d={GLOW_PURPLE} fill="rgb(142,45,255)" />
    </svg>
  )
}
function WhiteGlow() {
  return (
    <svg viewBox="0 0 624 251" overflow="visible" width="624" height="251" aria-hidden="true">
      <path d={GLOW_WHITE} fill="rgb(255,255,255)" />
    </svg>
  )
}
function ArcSVG({ strokeWidth = 1.5 }: { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 1064 532"
      overflow="visible"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <path d={ARC_PATH} fill="none" stroke="white" strokeWidth={strokeWidth} />
    </svg>
  )
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export function CtaSection({
  data = CTA_DATA,
  pill,
  heading,
  description,
  disclaimer,
  pillShowSparkle = true,
}: CtaSectionProps) {
  const { primaryBtn, secondaryBtn } = data

  return (
    <section className="cta-section">

      {/* ── Dome component (all visual layers) ──────────────────────────── */}
      <div className="cta-dome-container">

        {/* Glow 1 & 2 — purple, blur(100px), translateY ~15px */}
        <div className="cta-gl cta-gl--p cta-gl--1"><PurpleGlow /></div>
        <div className="cta-gl cta-gl--p cta-gl--2"><PurpleGlow /></div>

        {/* Glow 3 & 4 — white, blur(25px), opacity 0.09 */}
        <div className="cta-gl cta-gl--w cta-gl--3"><WhiteGlow /></div>
        <div className="cta-gl cta-gl--w cta-gl--4"><WhiteGlow /></div>

        {/* Glow 5 & 6 — purple, blur(100px), translateY ~2px */}
        <div className="cta-gl cta-gl--p cta-gl--5"><PurpleGlow /></div>
        <div className="cta-gl cta-gl--p cta-gl--6"><PurpleGlow /></div>

        {/* Main dome — exact Framer SVG path 1064×532, fill #121218 */}
        <div className="cta-dome-svg">
          <svg
            viewBox="0 0 1064 532"
            overflow="visible"
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            aria-hidden="true"
            style={{ display: 'block' }}
          >
            <path d={DOME_PATH} fill="rgb(18,18,24)" />
          </svg>
        </div>

        {/* Arc pair 1 — sharp, mask 37%→100% (×2 matching Framer) */}
        <div className="cta-arc cta-arc--sharp"><ArcSVG strokeWidth={1.5} /></div>
        <div className="cta-arc cta-arc--sharp"><ArcSVG strokeWidth={1.5} /></div>

{/* Arc pair 3 — blur(2px), mask 14%→100% (×2) */}
        <div className="cta-arc cta-arc--blur2"><ArcSVG strokeWidth={1} /></div>
        <div className="cta-arc cta-arc--blur2"><ArcSVG strokeWidth={1} /></div>

      </div>

      {/* ── Content — pill + heading + description + buttons ─────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="cta-content"
      >

        {pill != null && (
          <PurplePill className="cta-pill" showSparkle={pillShowSparkle}>
            {pill}
          </PurplePill>
        )}

        {/* Heading — custom JSX or default */}
        <h3 className="cta-heading">
          {heading ?? (
            <>
              Watch your<br />
              Autonomous SOC<br />
              drive <span className="cta-heading-serif">itself</span>
            </>
          )}
        </h3>

        {/* Optional description */}
        {description && (
          <p className="cta-description">{description}</p>
        )}

        {/* Buttons */}
        <div className="cta-buttons">

          {/* Primary — purple bg */}
          <Link href={primaryBtn.href} className="cta-btn cta-btn--primary">
            <span className="cta-btn-label">{primaryBtn.label}</span>
            <span className="cta-btn-glow" aria-hidden="true" />
          </Link>

          {/* Secondary — white border (optional) */}
          {secondaryBtn && (
            <Link href={secondaryBtn.href} className="cta-btn cta-btn--secondary">
              <span className="cta-btn-label">{secondaryBtn.label}</span>
              <span className="cta-btn-glow" aria-hidden="true" />
            </Link>
          )}

        </div>

        {disclaimer && (
          <p className="cta-disclaimer">{disclaimer}</p>
        )}
      </motion.div>

    </section>
  )
}
