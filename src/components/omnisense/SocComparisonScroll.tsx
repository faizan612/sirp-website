'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

export interface SocComparisonStep {
  label: string
  /** Which of the 3 shared sync phases this step belongs to. */
  phase: 0 | 1 | 2
  /** Minutes (human column) or seconds (autonomous column). */
  duration: number
  durationLabel: string
  /** Rendered as an italic note under this step — used to spell out the phase mapping. */
  note?: string
}

export interface SocComparisonColumn {
  label: string
  steps: readonly SocComparisonStep[]
}

export interface SocComparisonScrollProps {
  human: SocComparisonColumn
  autonomous: SocComparisonColumn
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

function total(steps: readonly SocComparisonStep[]) {
  return steps.reduce((sum, s) => sum + s.duration, 0)
}

function formatHuman(minutes: number) {
  return `${(minutes / 60).toFixed(1)} hrs`
}

function formatAutonomous(seconds: number) {
  return `${Math.round(seconds)} sec`
}

/**
 * "The four outcomes of switching to Sirp" lead content — a scroll-driven
 * side-by-side of Human SOC vs Autonomous SOC. The container is ~4 viewport
 * heights tall; scroll position through it (0-1) drives which step group is
 * "active" on both sides at once and both running-time counters, so the
 * speed gap is something felt while scrolling rather than read off a static
 * diagram. Autonomous's 3 steps and Human's 6 steps share 3 sync `phase`s
 * (see SOM_SOC_COMPARISON) so both columns always highlight together.
 *
 * `prefers-reduced-motion` skips the pin/sync entirely: both columns render
 * their resolved final state statically, with the payoff banner already
 * shown, no scroll-jacking and no animated counting.
 */
export function SocComparisonScroll({ human, autonomous }: SocComparisonScrollProps) {
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  // Reduced motion never mounts the tall pinned container, so the ref would
  // never hydrate — omit `target` entirely rather than pass a dead ref.
  const { scrollYProgress } = useScroll(reduce ? {} : { target: containerRef, offset: ['start start', 'end end'] })

  const [phase, setPhase] = useState<0 | 1 | 2>(reduce ? 2 : 0)
  const [showDelta, setShowDelta] = useState(!!reduce)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const nextPhase = Math.min(2, Math.floor(clamp01(v) * 3)) as 0 | 1 | 2
    setPhase((prev) => (prev === nextPhase ? prev : nextPhase))
    const nextShow = v > 0.9
    setShowDelta((prev) => (prev === nextShow ? prev : nextShow))
  })

  const humanTotal = total(human.steps)
  const autonomousTotal = total(autonomous.steps)
  const deltaMultiple = Math.round((humanTotal * 60) / autonomousTotal)

  const humanText = useTransform(scrollYProgress, (v) => formatHuman(humanTotal * clamp01(v)))
  const autonomousText = useTransform(scrollYProgress, (v) => formatAutonomous(autonomousTotal * clamp01(v)))
  const railWidth = useTransform(scrollYProgress, (v) => `${clamp01(v) * 100}%`)

  const summary = `${human.label} total ${formatHuman(humanTotal)}. ${autonomous.label} total ${formatAutonomous(autonomousTotal)}. Same incident, resolved ${deltaMultiple}x faster.`

  const frame = (
    <div className="w-full max-w-[1180px]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
        <Column tone="human" label={human.label} steps={human.steps} phase={phase} />
        <Column tone="autonomous" label={autonomous.label} steps={autonomous.steps} phase={phase} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:mt-7 md:grid-cols-2 md:gap-7">
        <RunningTotal tone="human">
          {reduce ? <span>{formatHuman(humanTotal)}</span> : <motion.span>{humanText}</motion.span>}
        </RunningTotal>
        <RunningTotal tone="autonomous">
          {reduce ? <span>{formatAutonomous(autonomousTotal)}</span> : <motion.span>{autonomousText}</motion.span>}
        </RunningTotal>
      </div>

      <div
        className="mt-8 text-center transition-all duration-500 md:mt-10"
        style={{
          opacity: showDelta ? 1 : 0,
          transform: showDelta ? 'translateY(0)' : 'translateY(8px)',
        }}
        aria-hidden={!showDelta}
      >
        <p className="font-sans text-xl text-white/70 sm:text-2xl">
          Same incident, resolved{' '}
          <span className="font-mono font-black" style={{ color: '#8e2dff', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            {deltaMultiple}x
          </span>{' '}
          faster
        </p>
      </div>

      <span className="sr-only">{summary}</span>
    </div>
  )

  if (reduce) {
    return (
      <div className="flex w-full justify-center">
        <div className="w-full max-w-[1180px] px-1">{frame}</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative h-[560vh] md:h-[440vh]">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-4">
        {frame}

        <div className="absolute inset-x-0 bottom-8 flex justify-center px-4 sm:bottom-10">
          <div className="h-[2px] w-full max-w-[1180px] rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <motion.div className="h-full rounded-full" style={{ width: railWidth, background: '#8e2dff' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function RunningTotal({ tone, children }: { tone: 'human' | 'autonomous'; children: React.ReactNode }) {
  const accent = tone === 'autonomous'
  return (
    <div
      className="flex items-center justify-between rounded-[16px] border px-6 py-4"
      style={{
        borderColor: accent ? 'rgba(142,45,255,0.25)' : '#3a3a4d',
        background: accent ? 'rgba(142,45,255,0.06)' : 'rgba(255,255,255,0.02)',
      }}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/40">Total time</span>
      <span
        className="font-mono font-black tabular-nums"
        style={{ fontSize: 'clamp(1.35rem, 2.6vw, 1.85rem)', color: accent ? '#8e2dff' : '#fff' }}
      >
        {children}
      </span>
    </div>
  )
}

function Column({
  tone,
  label,
  steps,
  phase,
}: {
  tone: 'human' | 'autonomous'
  label: string
  steps: readonly SocComparisonStep[]
  phase: 0 | 1 | 2
}) {
  const accent = tone === 'autonomous'
  return (
    <div
      className="rounded-[20px] border px-6 py-6 md:px-7 md:py-7"
      style={{
        borderColor: accent ? 'rgba(142,45,255,0.25)' : '#3a3a4d',
        background: '#121218',
      }}
    >
      <span
        className="mb-5 block font-mono text-[11px] uppercase tracking-[0.1em]"
        style={{ color: accent ? '#8e2dff' : 'rgba(255,255,255,0.5)' }}
      >
        {label}
      </span>

      <ul className="flex flex-col gap-2">
        {steps.map((step) => {
          const state = step.phase < phase ? 'done' : step.phase === phase ? 'active' : 'upcoming'
          return (
            <li key={step.label}>
              <div
                className="flex items-center justify-between gap-3 rounded-[12px] border px-4 py-3 transition-colors duration-300"
                style={{
                  borderColor:
                    state === 'active'
                      ? accent
                        ? 'rgba(142,45,255,0.5)'
                        : 'rgba(255,255,255,0.3)'
                      : 'rgba(255,255,255,0.08)',
                  background:
                    state === 'active'
                      ? accent
                        ? 'linear-gradient(90deg, rgba(142,45,255,0.14), transparent)'
                        : 'rgba(255,255,255,0.04)'
                      : 'transparent',
                }}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-[7px] w-[7px] flex-shrink-0 rounded-full"
                    style={{
                      background:
                        state === 'active' ? (accent ? '#8e2dff' : '#fff') : 'rgba(255,255,255,0.25)',
                      boxShadow: state === 'active' ? `0 0 0 4px ${accent ? 'rgba(142,45,255,0.2)' : 'rgba(255,255,255,0.08)'}` : 'none',
                    }}
                  />
                  <span
                    className="font-sans text-[15px] sm:text-base"
                    style={{
                      color: state === 'upcoming' ? 'rgba(255,255,255,0.35)' : state === 'done' ? 'rgba(255,255,255,0.6)' : '#fff',
                      fontWeight: state === 'active' ? 700 : 400,
                    }}
                  >
                    {step.label}
                  </span>
                </span>
                <span className="font-mono text-[12px] tabular-nums" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {step.durationLabel}
                </span>
              </div>
              {step.note && (
                <p className="mb-1 mt-1 pl-4 font-sans text-[12px] italic text-white/35">{step.note}</p>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
