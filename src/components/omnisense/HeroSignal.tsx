'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export interface HeroSignalProps {
  idleAmplitude?: number
  gatePositionPct?: number
  className?: string
}

const SESSION_KEY = 'som-hero-signal-intro-played'
const WIDTH = 1200
const HEIGHT = 80
const MID = HEIGHT / 2

function idlePath(t: number, amplitude: number) {
  const amp = amplitude * (HEIGHT / 2)
  const points: string[] = [`M 0 ${MID}`]
  const steps = 48
  for (let i = 1; i <= steps; i++) {
    const x = (i / steps) * WIDTH
    const y = MID + Math.sin(x / 60 + t) * amp
    points.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return points.join(' ')
}

function introPath(progress: number, gatePct: number) {
  // Flat line with a single spike that travels left to right, caught at
  // `gatePct`, then flattens back to a calm baseline.
  const gateX = (gatePct / 100) * WIDTH
  const spikeX = progress * WIDTH
  const spikeHeight = spikeX < gateX ? 26 : 26 * Math.max(0, 1 - (spikeX - gateX) / 80)
  const points: string[] = [`M 0 ${MID}`]
  const steps = 60
  for (let i = 1; i <= steps; i++) {
    const x = (i / steps) * WIDTH
    let y = MID
    const dist = Math.abs(x - spikeX)
    if (dist < 40) y = MID - spikeHeight * (1 - dist / 40)
    points.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return points.join(' ')
}

/**
 * A thin signal-trace line along the lower third of the hero. Plays a
 * one-time intro (a spike travels left to right, gets caught by the gate
 * marker, flattens out) once per browser session, then settles into a
 * slow ambient idle loop. Purely additive — headline/CTAs are untouched.
 *
 * Reduced motion: renders a flat idle line, no animation at all.
 */
export function HeroSignal({ idleAmplitude = 0.08, gatePositionPct = 62, className = '' }: HeroSignalProps) {
  const reduce = useReducedMotion()
  const [playIntro, setPlayIntro] = useState(false)
  const [path, setPath] = useState(() => idlePath(0, idleAmplitude))
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (reduce) return
    try {
      const played = sessionStorage.getItem(SESSION_KEY)
      if (!played) {
        setPlayIntro(true)
        sessionStorage.setItem(SESSION_KEY, '1')
      }
    } catch {
      // sessionStorage unavailable — skip the intro, go straight to idle
    }
  }, [reduce])

  useEffect(() => {
    if (reduce) {
      setPath(idlePath(0, 0))
      return
    }

    let start: number | null = null
    const introDuration = 1600

    const tick = (now: number) => {
      if (start === null) start = now
      const elapsed = now - start

      if (playIntro && elapsed < introDuration) {
        setPath(introPath(elapsed / introDuration, gatePositionPct))
      } else {
        setPath(idlePath(elapsed / 900, idleAmplitude))
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reduce, playIntro, idleAmplitude, gatePositionPct])

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path d={path} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={1.5} />
      {!reduce && (
        <line
          x1={(gatePositionPct / 100) * WIDTH}
          x2={(gatePositionPct / 100) * WIDTH}
          y1={MID - 14}
          y2={MID + 14}
          stroke="#8e2dff"
          strokeWidth={2}
          opacity={0.7}
        />
      )}
    </svg>
  )
}
