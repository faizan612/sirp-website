'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * Fires once when the element scrolls into view, then stays "true" forever —
 * the shared trigger behind every scroll-triggered sequence on the Security
 * Outcomes & Metrics redesign (GovernancePipeline, MetricRail).
 * Wraps framer-motion's useInView so every consumer gets the same margin/once
 * semantics instead of re-deriving them per component.
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(margin = '-80px 0px') {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, margin: margin as any })
  return { ref, inView } as const
}
