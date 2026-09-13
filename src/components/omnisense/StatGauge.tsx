'use client'

import { motion, useReducedMotion } from 'framer-motion'
import CountUp from '@/components/ui/CountUp'
import { useInViewOnce } from '@/components/shared/motion/useInViewOnce'

export interface StatGaugeProps {
  value: number
  /** Short, instrumentation-style label, e.g. "MTTD ↓" */
  label: string
  /** Fuller sentence-case phrase shown as a secondary caption. */
  caption?: string
  isPrimary?: boolean
  /** Renders a dashed track + "directional, not measured" caption instead of a solid arc. */
  unverified?: boolean
}

const SIZE = 168
const STROKE = 10
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * A radial gauge instrument — the three headline stats (MTTD / MTTR /
 * Resolved Autonomously) read as dashboard telemetry rather than a
 * marketing stat block. Count-up + arc-sweep both trigger once, together,
 * on scroll into view.
 */
export function StatGauge({ value, label, caption, isPrimary = false, unverified = false }: StatGaugeProps) {
  const reduce = useReducedMotion()
  const { ref, inView } = useInViewOnce<HTMLDivElement>()
  const offset = CIRCUMFERENCE * (1 - value / 100)

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={STROKE}
            strokeDasharray={unverified ? '4 6' : undefined}
          />
          <motion.circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#8e2dff"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={unverified ? `2 8 ${CIRCUMFERENCE}` : CIRCUMFERENCE}
            initial={{ strokeDashoffset: reduce ? offset : CIRCUMFERENCE }}
            animate={inView ? { strokeDashoffset: offset } : undefined}
            transition={{ duration: reduce ? 0 : 1.1, ease: 'easeOut' }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono font-semibold text-[#0a0a0a] tabular-nums"
            style={{ fontSize: 'clamp(1.9rem, 3vw, 2.4rem)', paddingLeft: '0.1em' }}
          >
            {reduce ? value : <CountUp to={value} duration={1.1} />}%
          </span>
        </div>
      </div>

      {isPrimary && (
        <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8e2dff]">
          Primary outcome
        </span>
      )}

      <span className={`font-mono text-xs uppercase tracking-[0.1em] text-[#1a1a1a] ${isPrimary ? 'mt-1' : 'mt-4'}`}>
        {label}
      </span>

      {caption && (
        <span className="mt-1.5 max-w-[180px] font-sans text-[13px] leading-snug text-[#6b6b6b]">
          {caption}
        </span>
      )}

      {unverified && (
        <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#8a8a8a]">
          Directional, not measured
        </span>
      )}
    </div>
  )
}
