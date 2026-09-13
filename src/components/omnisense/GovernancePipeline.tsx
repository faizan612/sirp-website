'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { TravelingPulse } from '@/components/shared/motion/TravelingPulse'
import { useInViewOnce } from '@/components/shared/motion/useInViewOnce'

export interface GovernanceStation {
  key: string
  label: string
  copy: string
  /** Only the last station (Decision Governor) carries verdict outcomes. */
  outcomes?: string[]
}

export interface GovernancePipelineProps {
  stations: GovernanceStation[]
}

/**
 * The actual system architecture, animated as a live pipeline instead of
 * four identical static cards. A packet travels the rail, pausing at each
 * station to reveal its copy; branches at the Gate (approved vs blocked)
 * and forks at the Governor (Close / Escalate / Return to Planner) make the
 * two decision points in the loop visible, not just described.
 *
 * Plays once per scroll-into-view — this is an explanation, not ambient
 * decoration. Reduced motion renders every station open, unanimated.
 */
export function GovernancePipeline({ stations }: GovernancePipelineProps) {
  const reduce = useReducedMotion()
  const { ref, inView } = useInViewOnce<HTMLDivElement>()
  const [revealed, setRevealed] = useState<number[]>(reduce ? stations.map((_, i) => i) : [])
  const gateIndex = stations.findIndex((s) => s.key === 'gate')

  const reveal = (i: number) => setRevealed((prev) => (prev.includes(i) ? prev : [...prev, i]))

  return (
    <div ref={ref}>
      {/* Desktop — horizontal rail */}
      <div className="relative hidden md:block" style={{ paddingTop: 8 }}>
        <div className="relative" style={{ paddingLeft: '6%', paddingRight: '6%' }}>
          <TravelingPulse
            stationCount={stations.length}
            play={inView}
            staggerMs={700}
            onStationReached={reveal}
          />

          {/* Gate branch — approved continues, blocked dims and fades */}
          {gateIndex >= 0 && (
            <div
              className="pointer-events-none absolute top-3 flex flex-col items-center gap-1"
              style={{ left: `${6 + (gateIndex / (stations.length - 1)) * 88}%`, transform: 'translateX(-50%)' }}
            >
              <motion.span
                className="font-mono text-[9px] uppercase tracking-[0.08em] text-white/30"
                initial={reduce ? false : { opacity: 0 }}
                animate={revealed.includes(gateIndex) ? (reduce ? { opacity: 0.5 } : { opacity: [0, 0.6, 0] }) : undefined}
                transition={{ duration: 1.4, times: [0, 0.3, 1] }}
              >
                blocked
              </motion.span>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-4 gap-6">
          {stations.map((s, i) => (
            <motion.div
              key={s.key}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={revealed.includes(i) ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4 }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8e2dff]">{s.label}</span>
              <p className="mt-2 text-[14px] leading-[1.6] text-white/70">{s.copy}</p>

              {s.outcomes && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.outcomes.map((o) => (
                    <span
                      key={o}
                      className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em]"
                      style={
                        o === 'Escalate'
                          ? { borderColor: 'rgba(142,45,255,0.5)', color: '#fff', background: 'rgba(142,45,255,0.18)' }
                          : { borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }
                      }
                    >
                      {o}
                      {o === 'Escalate' && <span aria-hidden="true">→ human</span>}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile — vertical rail */}
      <div className="flex md:hidden gap-6">
        <TravelingPulse
          stationCount={stations.length}
          play={inView}
          direction="vertical"
          staggerMs={700}
          onStationReached={reveal}
          className="self-stretch"
        />
        <div className="flex flex-1 flex-col justify-between gap-8">
          {stations.map((s, i) => (
            <motion.div
              key={s.key}
              initial={reduce ? false : { opacity: 0, x: 8 }}
              animate={revealed.includes(i) ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.4 }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8e2dff]">{s.label}</span>
              <p className="mt-2 text-[14px] leading-[1.6] text-white/70">{s.copy}</p>
              {s.outcomes && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.outcomes.map((o) => (
                    <span
                      key={o}
                      className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em]"
                      style={
                        o === 'Escalate'
                          ? { borderColor: 'rgba(142,45,255,0.5)', color: '#fff', background: 'rgba(142,45,255,0.18)' }
                          : { borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }
                      }
                    >
                      {o}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
