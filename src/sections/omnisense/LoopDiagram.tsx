'use client'

import { useRef } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CAPTION_LEFT, CAPTION_RIGHT, CHECKPOINTS, GATE_TAG, NEW_PLAN_CALLOUT, NEW_PLAN_TAG } from '@/content/omnisense/theLoop'

type Register = 'warm' | 'gate' | 'cool'

function GateIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 1L12.5 4V10L7 13L1.5 10V4L7 1Z"
        stroke="#8e2dff"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M7 4.5V9.5M4.7 7H9.3" stroke="#8e2dff" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

/** Mouse-position-tracked spotlight, adapted for a light card: the radial
 * deepens the card's own tint instead of lightening toward white. Under
 * `prefers-reduced-motion`, the mousemove handler is never attached, so
 * --mouse-x/-y stay at their centered default and hover just fades in a
 * static tint rather than tracking the cursor. */
function useSpotlight(reducedMotion: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  if (reducedMotion) return { ref, onMouseMove: undefined }

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }
  return { ref, onMouseMove }
}

const CARD_STYLE: Record<Register, CSSProperties> = {
  warm: { '--loop-card-bg': 'var(--loop-warm-bg)', '--loop-card-border': 'var(--loop-warm-border)' } as CSSProperties,
  cool: {
    '--loop-card-bg': 'var(--loop-cool-bg)',
    '--loop-card-border': 'var(--loop-cool-border)',
    '--loop-spotlight-color': 'var(--loop-cool-deepen)',
  } as CSSProperties,
  gate: {
    '--loop-card-bg': 'var(--loop-purple-bg)',
    '--loop-card-border': 'var(--loop-purple-border)',
    '--loop-spotlight-color': 'var(--loop-purple-deepen)',
  } as CSSProperties,
}

interface CardProps {
  index: number
  register: Register
  reveal: boolean
  reducedMotion: boolean
  className?: string
}

function Card({ index, register, reveal, reducedMotion, className }: CardProps) {
  const checkpoint = CHECKPOINTS[index]
  const isGate = register === 'gate'
  const hasSpotlight = register !== 'warm' // Planner (tier 1) — deliberately no hover flourish
  const { ref, onMouseMove } = useSpotlight(reducedMotion)

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={reveal ? { opacity: 0, y: 16 } : false}
      whileInView={reveal ? { opacity: 1, y: 0 } : undefined}
      whileHover={{ y: -3 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className={`loop-card ${hasSpotlight ? 'loop-card--spotlight' : ''} rounded-sirp-md p-5 flex flex-col h-full ${className ?? ''}`}
      style={CARD_STYLE[register]}
    >
      {hasSpotlight && <span className="loop-card__spotlight" />}

      <div className="relative flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.08em]" style={{ color: 'var(--loop-text-quiet)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          {isGate && <GateIcon />}
        </div>
        <h3
          className="font-sans font-bold text-[17px] leading-tight"
          style={{ color: 'var(--loop-text-primary)', letterSpacing: '-0.01em' }}
        >
          {checkpoint.label}
        </h3>
        {isGate && (
          <span
            className="font-mono text-[9px] tracking-[0.08em] uppercase"
            style={{ color: 'var(--loop-purple)' }}
          >
            {GATE_TAG}
          </span>
        )}
      </div>

      <div className="relative mt-3 pt-3" style={{ borderTop: '1px solid var(--loop-border-soft)' }}>
        <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--loop-text-secondary)' }}>
          {checkpoint.description}
        </p>
      </div>
    </motion.div>
  )
}

function CaptionLabel({ children }: { children: string }) {
  return (
    <span
      className="block font-mono text-[10px] tracking-[0.1em] uppercase"
      style={{ color: 'var(--loop-text-muted)' }}
    >
      {children}
    </span>
  )
}

function LoopBackBracket() {
  return (
    <div className="relative mt-8 md:mt-10">
      <div aria-hidden="true" className="relative">
        <span className="absolute left-0 -top-3 w-px h-3" style={{ background: 'var(--loop-cool-border)' }} />
        <span className="absolute right-0 -top-3 w-px h-3" style={{ background: 'var(--loop-cool-border)' }} />
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.06em] whitespace-nowrap"
            style={{ color: 'var(--loop-cool-text)' }}
          >
            ◀ {NEW_PLAN_TAG}
          </span>
          <span className="flex-1 h-px" style={{ background: 'var(--loop-cool-border)' }} />
        </div>
      </div>
      <p
        className="mt-3 font-sans text-sm leading-relaxed max-w-[760px]"
        style={{ color: 'var(--loop-text-secondary)' }}
      >
        {NEW_PLAN_CALLOUT}
      </p>
    </div>
  )
}

export function LoopDiagram() {
  const prefersReducedMotion = useReducedMotion()
  const reveal = !prefersReducedMotion
  const reducedMotion = !!prefersReducedMotion

  return (
    <div>
      {/* Desktop — 1fr / 3fr split, vertical divider between column 1 and the rest */}
      <div className="hidden md:grid md:grid-cols-[1fr_3fr] md:gap-x-6">
        <div>
          <CaptionLabel>{CAPTION_LEFT}</CaptionLabel>
          <Card index={0} register="warm" reveal={reveal} reducedMotion={reducedMotion} className="mt-3" />
        </div>
        <div className="pl-6" style={{ borderLeft: '1px solid var(--loop-border)' }}>
          <CaptionLabel>{CAPTION_RIGHT}</CaptionLabel>
          <div className="mt-3 grid grid-cols-3 gap-4">
            <Card index={1} register="gate" reveal={reveal} reducedMotion={reducedMotion} />
            <Card index={2} register="cool" reveal={reveal} reducedMotion={reducedMotion} />
            <Card index={3} register="cool" reveal={reveal} reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>

      {/* Mobile — stacked; the col1/col2 divider becomes a horizontal rule,
          and a continuous left accent marks columns 2-4 as one register. */}
      <div className="flex flex-col gap-4 md:hidden">
        <div>
          <CaptionLabel>{CAPTION_LEFT}</CaptionLabel>
          <Card index={0} register="warm" reveal={reveal} reducedMotion={reducedMotion} className="mt-3" />
        </div>
        <div style={{ borderTop: '1px solid var(--loop-border)' }} />
        <div className="pl-4 flex flex-col gap-4" style={{ borderLeft: '2px solid var(--loop-cool-border)' }}>
          <div>
            <CaptionLabel>{CAPTION_RIGHT}</CaptionLabel>
            <Card index={1} register="gate" reveal={reveal} reducedMotion={reducedMotion} className="mt-3" />
          </div>
          <Card index={2} register="cool" reveal={reveal} reducedMotion={reducedMotion} />
          <Card index={3} register="cool" reveal={reveal} reducedMotion={reducedMotion} />
        </div>
      </div>

      <LoopBackBracket />
    </div>
  )
}
