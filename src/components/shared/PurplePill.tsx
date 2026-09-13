'use client'

import type { ReactNode } from 'react'
import { useId } from 'react'
import { cn } from '@/lib/utils'
import './PurplePill.css'

function PurplePillSparkleIcon() {
  const raw = useId()
  const gradId = `purple-pill-sparkle-grad-${raw.replace(/:/g, '')}`

  return (
    <svg
      className="purple-pill-sparkle"
      display="block"
      role="presentation"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={true}
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="1"
          x2="0"
          y1="0.4974874371859296"
          y2="0.5025125628140704"
        >
          <stop offset="0" stopColor="rgb(255, 255, 255)" />
          <stop offset="1" stopColor="rgb(185, 138, 255)" />
        </linearGradient>
      </defs>
      <path
        d="M 5.075 1.158 C 5.288 0.769 5.846 0.769 6.059 1.158 L 7.672 4.106 C 7.723 4.2 7.801 4.277 7.895 4.328 L 10.843 5.941 C 11.232 6.154 11.232 6.713 10.843 6.926 L 7.895 8.537 C 7.801 8.589 7.723 8.667 7.672 8.761 L 6.059 11.708 C 5.846 12.097 5.288 12.097 5.075 11.708 L 3.463 8.761 C 3.411 8.667 3.333 8.589 3.239 8.537 L 0.292 6.926 C -0.097 6.713 -0.097 6.154 0.292 5.941 L 3.239 4.328 C 3.333 4.277 3.411 4.2 3.463 4.106 Z M 10.374 0.146 C 10.48 -0.049 10.76 -0.049 10.866 0.146 L 11.176 0.712 C 11.201 0.759 11.241 0.799 11.288 0.824 L 11.854 1.134 C 12.048 1.24 12.048 1.519 11.854 1.626 L 11.288 1.936 C 11.241 1.961 11.201 2.001 11.176 2.048 L 10.866 2.614 C 10.76 2.809 10.48 2.809 10.374 2.614 L 10.064 2.048 C 10.039 2.001 9.999 1.961 9.952 1.936 L 9.386 1.626 C 9.191 1.52 9.191 1.24 9.386 1.134 L 9.952 0.824 C 9.999 0.799 10.039 0.759 10.064 0.712 Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  )
}

export type PurplePillProps = {
  children: ReactNode
  /** When false, the leading sparkle icon is omitted. @default true */
  showSparkle?: boolean
  className?: string
}

export function PurplePill({ children, showSparkle = true, className }: PurplePillProps) {
  return (
    <span className={cn('purple-pill', className)}>
      {showSparkle && <PurplePillSparkleIcon />}
      {children}
    </span>
  )
}
