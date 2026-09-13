import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import './Eyebrow.css'

export type EyebrowProps = {
  children: ReactNode
  /** Optional element id (used to label a section for assistive tech). */
  id?: string
  className?: string
}

/**
 * Mono section eyebrow — IBM Plex Mono, uppercase, letterspaced.
 * The page's quiet "signal" label (definition / process / proof markers).
 * Distinct from `PurplePill`, which is an Inter pill badge.
 */
export function Eyebrow({ children, id, className }: EyebrowProps) {
  return (
    <span id={id} className={cn('wsoc-eyebrow', className)}>
      <span className="wsoc-eyebrow__tick" aria-hidden="true" />
      {children}
    </span>
  )
}
