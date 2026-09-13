'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState, type CSSProperties } from 'react'
import { TravelingPulse } from '@/components/shared/motion/TravelingPulse'
import { useInViewOnce } from '@/components/shared/motion/useInViewOnce'

export interface MetricRailPoint {
  value: string
  label: string
  detail?: string
}

export interface MetricRailProps {
  points: MetricRailPoint[]
}

/**
 * Four numbers, one rail — a pulse travels through all four points in
 * sequence on scroll-into-view, visually pre-teaching the "these move
 * together" argument made again in GovernancePipeline below it. Desktop:
 * horizontal. Mobile: rotates to vertical, same pulse behavior top to bottom.
 */
export function MetricRail({ points }: MetricRailProps) {
  const reduce = useReducedMotion()
  const { ref, inView } = useInViewOnce<HTMLDivElement>()
  const [revealed, setRevealed] = useState<number[]>(reduce ? points.map((_, i) => i) : [])

  return (
    <div ref={ref}>
      {/* Desktop — horizontal rail */}
      <div
        className="relative hidden md:block px-6 lg:px-10"
        style={{ paddingTop: 88, paddingBottom: 8, '--color-rail-line': 'rgba(142, 45, 255, 0.4)' } as CSSProperties}
      >
        <TravelingPulse
          stationCount={points.length}
          play={inView}
          staggerMs={150}
          align="center"
          onStationReached={(i) => setRevealed((prev) => (prev.includes(i) ? prev : [...prev, i]))}
        />
        <div className="pointer-events-none absolute inset-x-6 lg:inset-x-10 top-0 flex justify-between">
          {points.map((p, i) => (
            <motion.div
              key={p.label}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={revealed.includes(i) ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.35 }}
              className="flex w-[25%] flex-col items-center text-center"
            >
              <span className="font-mono font-semibold text-white tabular-nums" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}>
                {p.value}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-between">
          {points.map((p, i) => (
            <motion.div
              key={p.label}
              initial={reduce ? false : { opacity: 0 }}
              animate={revealed.includes(i) ? { opacity: 1 } : undefined}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="flex w-[25%] flex-col items-center text-center px-2"
            >
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-white/80">{p.label}</span>
              {p.detail && <span className="mt-1 text-[13px] leading-snug text-white/50">{p.detail}</span>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile — vertical rail */}
      <div className="flex md:hidden gap-6">
        <TravelingPulse
          stationCount={points.length}
          play={inView}
          direction="vertical"
          staggerMs={150}
          align="center"
          onStationReached={(i) => setRevealed((prev) => (prev.includes(i) ? prev : [...prev, i]))}
          className="self-stretch"
        />
        <div className="flex flex-1 flex-col justify-between gap-8">
          {points.map((p, i) => (
            <motion.div
              key={p.label}
              initial={reduce ? false : { opacity: 0, x: 8 }}
              animate={revealed.includes(i) ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.35 }}
            >
              <span className="font-mono font-semibold text-white tabular-nums block" style={{ fontSize: '1.75rem' }}>
                {p.value}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-white/80">{p.label}</span>
              {p.detail && <span className="mt-1 block text-[13px] leading-snug text-white/50">{p.detail}</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
