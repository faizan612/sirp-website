import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SocComparisonScroll } from '../SocComparisonScroll'
import { mockMatchMedia } from './testUtils'

/* framer-motion's useReducedMotion lazily initialises a module-level
 * `prefersReducedMotion` singleton the first time any component calls it,
 * then never re-reads matchMedia — so a reduced-motion=true assertion must
 * be the first thing this module observes. Kept in its own file (fresh
 * module registry per test file) rather than alongside
 * SocComparisonScroll.test.tsx, which exercises the non-reduced path. */

const HUMAN = {
  label: 'Human SOC',
  steps: [
    { label: 'Detection', phase: 0 as const, duration: 5, durationLabel: '~5 min' },
    { label: 'Ticket', phase: 1 as const, duration: 15, durationLabel: '~15 min' },
    { label: 'Assignment', phase: 1 as const, duration: 20, durationLabel: '~20 min' },
    { label: 'Investigation', phase: 1 as const, duration: 95, durationLabel: '~95 min' },
    { label: 'Approval', phase: 1 as const, duration: 40, durationLabel: '~40 min' },
    { label: 'Action', phase: 2 as const, duration: 10, durationLabel: '~10 min' },
  ],
}

const AUTONOMOUS = {
  label: 'Autonomous SOC',
  steps: [
    { label: 'Detection', phase: 0 as const, duration: 5, durationLabel: '~5 sec' },
    { label: 'Evaluation', phase: 1 as const, duration: 55, durationLabel: '~55 sec' },
    { label: 'Action', phase: 2 as const, duration: 15, durationLabel: '~15 sec' },
  ],
}

describe('SocComparisonScroll (prefers-reduced-motion)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders statically with final totals and no pinned scroll container', () => {
    mockMatchMedia(true)
    const { container } = render(<SocComparisonScroll human={HUMAN} autonomous={AUTONOMOUS} />)
    expect(container.querySelector('.sticky')).not.toBeInTheDocument()
    expect(screen.getByText('3.1 hrs')).toBeInTheDocument()
    expect(screen.getByText('75 sec')).toBeInTheDocument()
    expect(screen.getByText('148x')).toBeInTheDocument()
  })
})
