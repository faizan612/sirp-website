'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export interface TravelingPulseProps {
  /** Number of stations along the rail. */
  stationCount: number
  /** Start the sequence — pass the result of useInViewOnce so it fires once. */
  play: boolean
  direction?: 'horizontal' | 'vertical'
  /** Gap between one station lighting up and the next, in ms. */
  staggerMs?: number
  /** Called every time the pulse arrives at a station (0-indexed). */
  onStationReached?: (index: number) => void
  className?: string
  /**
   * 'edge' spaces stations from 0% to 100% (rail spans the full track — the
   * default, used where a fixed branch marker like GovernancePipeline's gate
   * label depends on that formula). 'center' spaces stations at the center
   * of each equal segment, for callers whose station copy sits in equal-width
   * columns and needs the dot centered under it rather than at the track edge.
   */
  align?: 'edge' | 'center'
}

/**
 * A dot that travels along a thin rail, pausing briefly at each of
 * `stationCount` evenly-spaced stations. Shared by MetricRail (Section 5)
 * and GovernancePipeline (Section 9) so the "things move together" motion
 * language is one implementation, not two.
 *
 * Reduced motion: the rail and station dots still render, the pulse itself
 * doesn't move — `onStationReached` fires for every station immediately so
 * consumers still reveal their per-station content.
 */
export function TravelingPulse({
  stationCount,
  play,
  direction = 'horizontal',
  staggerMs = 500,
  onStationReached,
  className = '',
  align = 'edge',
}: TravelingPulseProps) {
  const reduce = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(-1)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (!play) return

    if (reduce) {
      for (let i = 0; i < stationCount; i++) onStationReached?.(i)
      setActiveIndex(stationCount - 1)
      return
    }

    let cancelled = false
    let i = 0
    const step = () => {
      if (cancelled || i >= stationCount) return
      setActiveIndex(i)
      onStationReached?.(i)
      i += 1
      if (i < stationCount) {
        setTimeout(step, staggerMs)
      } else {
        // The traveling marker has nowhere left to go — fade it out instead
        // of leaving it resting on the final station forever, which would
        // make that station's dot read as permanently brighter than the rest.
        setTimeout(() => {
          if (!cancelled) setSettled(true)
        }, staggerMs)
      }
    }
    step()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, reduce, stationCount, staggerMs])

  const positions = Array.from({ length: stationCount }, (_, i) => {
    if (stationCount === 1) return align === 'center' ? 50 : 0
    return align === 'center' ? ((i + 0.5) / stationCount) * 100 : (i / (stationCount - 1)) * 100
  })

  const isHorizontal = direction === 'horizontal'

  return (
    <div
      className={`relative ${isHorizontal ? 'w-full h-1' : 'h-full w-1'} ${className}`}
      style={{ background: 'var(--color-rail-line, rgba(142, 45, 255, 0.18))' }}
      aria-hidden="true"
    >
      {positions.map((pct, i) => (
        <span
          key={i}
          className="absolute rounded-full transition-colors duration-300"
          style={{
            width: 8,
            height: 8,
            top: isHorizontal ? '50%' : `${pct}%`,
            left: isHorizontal ? `${pct}%` : '50%',
            transform: 'translate(-50%, -50%)',
            background: i <= activeIndex ? '#8e2dff' : 'rgba(142, 45, 255, 0.25)',
            boxShadow: i <= activeIndex ? '0 0 10px rgba(142, 45, 255, 0.65)' : 'none',
          }}
        />
      ))}

      {!reduce && activeIndex >= 0 && (
        <motion.span
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            top: isHorizontal ? '50%' : undefined,
            left: isHorizontal ? undefined : '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            boxShadow: '0 0 8px 2px rgba(142, 45, 255, 0.9)',
          }}
          animate={{
            ...(isHorizontal ? { left: `${positions[activeIndex]}%` } : { top: `${positions[activeIndex]}%` }),
            opacity: settled ? 0 : 1,
          }}
          transition={{
            left: { duration: staggerMs / 1000, ease: 'easeInOut' },
            top: { duration: staggerMs / 1000, ease: 'easeInOut' },
            opacity: { duration: 0.5 },
          }}
        />
      )}
    </div>
  )
}
