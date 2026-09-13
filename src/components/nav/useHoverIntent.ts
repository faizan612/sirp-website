'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const OPEN_DELAY_MS = 100
const CLOSE_GRACE_MS = 180

/**
 * Diagonal-mouse-safe hover open/close: opening is delayed so a pass-through
 * doesn't trigger a panel, closing is delayed so a diagonal path from the
 * trigger into the panel doesn't dismiss it. Once one item is open, switching
 * to another is instant (openImmediate) — no delay while already navigating.
 */
export function useHoverIntent() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = null
    closeTimer.current = null
  }, [])

  const open = useCallback(
    (id: string) => {
      clearTimers()
      if (activeId !== null) {
        setActiveId(id)
        return
      }
      openTimer.current = setTimeout(() => setActiveId(id), OPEN_DELAY_MS)
    },
    [activeId, clearTimers],
  )

  const openImmediate = useCallback(
    (id: string) => {
      clearTimers()
      setActiveId(id)
    },
    [clearTimers],
  )

  const close = useCallback(() => {
    clearTimers()
    closeTimer.current = setTimeout(() => setActiveId(null), CLOSE_GRACE_MS)
  }, [clearTimers])

  const closeImmediate = useCallback(() => {
    clearTimers()
    setActiveId(null)
  }, [clearTimers])

  useEffect(() => clearTimers, [clearTimers])

  return { activeId, open, openImmediate, close, closeImmediate, setActiveId }
}
