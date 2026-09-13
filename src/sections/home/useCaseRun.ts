'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { IDLE_AUTORUN_MS, RUN_END, T } from '@/content/home/casePanel'

export type Stage = 'idle' | 'investigating' | 'gate' | 'acting' | 'closed'

/** Pure timeline math — kept dependency-free so it's testable without a DOM. */
export function stageFor(elapsedMs: number): Stage {
  if (elapsedMs < T.gate) return 'investigating'
  if (elapsedMs < T.acting) return 'gate'
  if (elapsedMs < T.closed) return 'acting'
  return 'closed'
}

export function evidenceCount(elapsedMs: number): number {
  return T.evidence.filter((t) => elapsedMs >= t).length
}

export function actionCount(elapsedMs: number): number {
  return T.actions.filter((t) => elapsedMs >= t).length
}

export function fmt(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

interface UseCaseRunResult {
  stage: Stage
  elapsedMs: number
  evidenceCount: number
  actionCount: number
  hasRun: boolean
  isRunning: boolean
  run: () => void
  replay: () => void
}

/** Drives the idle → investigating → gate → acting → closed timeline. */
export function useCaseRun(panelRef: RefObject<HTMLElement | null>): UseCaseRunResult {
  const [stage, setStage] = useState<Stage>('idle')
  const [elapsedMs, setElapsedMs] = useState(0)
  const [hasRun, setHasRun] = useState(false)

  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const reducedMotionRef = useRef(false)

  const stopRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (reducedMotionRef.current) return
    stopRaf()
    setHasRun(true)
    setElapsedMs(0)
    setStage('investigating')
    startRef.current = null

    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t
      const elapsed = t - startRef.current
      if (elapsed < RUN_END) {
        setElapsedMs(elapsed)
        setStage(stageFor(elapsed))
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setElapsedMs(RUN_END)
        setStage('closed')
        stopRaf()
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [stopRaf])

  const run = useCallback(() => {
    if (hasRun) return
    start()
  }, [hasRun, start])

  const replay = useCallback(() => {
    start()
  }, [start])

  // Reduced motion: resolve to the closed end state on mount, no animation ever.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reducedMotionRef.current = true
      setHasRun(true)
      setElapsedMs(RUN_END)
      setStage('closed')
    }
  }, [])

  // Auto-run once the panel is actually in view, not on a bare timer.
  useEffect(() => {
    if (reducedMotionRef.current || hasRun) return
    if (typeof IntersectionObserver === 'undefined') return
    const el = panelRef.current
    if (!el) return

    let timer: number | null = null
    const clearTimer = () => {
      if (timer !== null) {
        window.clearTimeout(timer)
        timer = null
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timer === null) timer = window.setTimeout(run, IDLE_AUTORUN_MS)
        } else {
          clearTimer()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      clearTimer()
      observer.disconnect()
    }
  }, [panelRef, hasRun, run])

  useEffect(() => stopRaf, [stopRaf])

  return {
    stage,
    elapsedMs,
    evidenceCount: evidenceCount(elapsedMs),
    actionCount: actionCount(elapsedMs),
    hasRun,
    isRunning: hasRun && stage !== 'closed' && !reducedMotionRef.current,
    run,
    replay,
  }
}
